import fs from "fs";
import path from "path";

const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  (process.env.NODE_ENV === "production" && !fs.existsSync(path.join(process.cwd(), "storage")))
);

/**
 * Directory for private resume storage (outside of public/).
 * On Vercel / serverless, uses /tmp which is the writable directory.
 */
export const PRIVATE_STORAGE_DIR = isServerless
  ? path.join("/tmp", "resumes")
  : path.join(process.cwd(), "storage", "resumes");

/**
 * Ensure private storage directory exists safely (never throws)
 */
export function ensureStorageDir(): boolean {
  try {
    if (!fs.existsSync(PRIVATE_STORAGE_DIR)) {
      fs.mkdirSync(PRIVATE_STORAGE_DIR, { recursive: true });
    }
    return true;
  } catch (err) {
    console.warn("[Storage] Local filesystem not writable in this environment:", err);
    return false;
  }
}

/**
 * Supabase Storage configuration
 */
export function getSupabaseConfig(): { url: string; key: string } | null {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    getSupabaseUrlFromDbUrl();

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY;

  if (url && key) {
    return {
      url: url.replace(/\/$/, ""),
      key: key.trim(),
    };
  }
  return null;
}

function getSupabaseUrlFromDbUrl(): string | undefined {
  const dbUrl = process.env.DATABASE_URL || "";
  const match = dbUrl.match(/postgres\.([a-z0-9]+):|db\.([a-z0-9]+)\.supabase\.co/i);
  const projectRef = match ? match[1] || match[2] : null;
  if (projectRef) {
    return `https://${projectRef}.supabase.co`;
  }
  return undefined;
}

/**
 * Upload a resume to Supabase Storage bucket 'resumes'
 */
export async function uploadToSupabaseStorage(
  filename: string,
  buffer: Buffer,
  contentType = "application/pdf"
): Promise<{ success: boolean; path?: string; error?: string }> {
  const config = getSupabaseConfig();
  if (!config) {
    return { success: false, error: "Supabase storage credentials not configured" };
  }

  try {
    const uploadUrl = `${config.url}/storage/v1/object/resumes/${encodeURIComponent(filename)}`;
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.key}`,
        apikey: config.key,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: new Uint8Array(buffer),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Supabase Storage] Upload error:", res.status, errText);
      return { success: false, error: errText };
    }

    return { success: true, path: filename };
  } catch (err: any) {
    console.error("[Supabase Storage] Network upload error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Download a resume from Supabase Storage
 */
export async function downloadFromSupabaseStorage(
  filename: string
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  try {
    const downloadUrl = `${config.url}/storage/v1/object/authenticated/resumes/${encodeURIComponent(filename)}`;
    const res = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.key}`,
        apikey: config.key,
      },
    });

    if (!res.ok) {
      // Fallback: try public bucket endpoint if authenticated request fails
      const publicUrl = `${config.url}/storage/v1/object/public/resumes/${encodeURIComponent(filename)}`;
      const pubRes = await fetch(publicUrl);
      if (!pubRes.ok) return null;
      const arrayBuf = await pubRes.arrayBuffer();
      return {
        buffer: Buffer.from(arrayBuf),
        contentType: pubRes.headers.get("content-type") || "application/pdf",
      };
    }

    const arrayBuf = await res.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuf),
      contentType: res.headers.get("content-type") || "application/pdf",
    };
  } catch (err) {
    console.error("[Supabase Storage] Download error:", err);
    return null;
  }
}

/**
 * Delete a resume from Supabase Storage
 */
export async function deleteFromSupabaseStorage(filename: string): Promise<boolean> {
  const config = getSupabaseConfig();
  if (!config) return false;

  try {
    const deleteUrl = `${config.url}/storage/v1/object/resumes`;
    const res = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.key}`,
        apikey: config.key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: [filename] }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Supabase Storage] Delete error:", err);
    return false;
  }
}

/**
 * Clean up resume files older than maxAgeDays (default: 30 days) from local disk
 */
export function cleanupOldResumes(maxAgeDays = 30): { deleted: number; scanned: number } {
  try {
    if (!ensureStorageDir()) return { deleted: 0, scanned: 0 };
    if (!fs.existsSync(PRIVATE_STORAGE_DIR)) return { deleted: 0, scanned: 0 };
    const files = fs.readdirSync(PRIVATE_STORAGE_DIR);
    const now = Date.now();
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    let deleted = 0;

    for (const file of files) {
      if (file.startsWith(".")) continue; // skip hidden files
      const filePath = path.join(PRIVATE_STORAGE_DIR, file);

      try {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          const age = now - stats.mtimeMs;
          if (age > maxAgeMs) {
            fs.unlinkSync(filePath);
            deleted++;
            console.log(`[Storage Cleanup] Deleted resume file older than ${maxAgeDays} days: ${file}`);
          }
        }
      } catch (fileErr) {
        console.error(`[Storage Cleanup] Error checking file ${file}:`, fileErr);
      }
    }

    return { deleted, scanned: files.length };
  } catch (err) {
    console.error("[Storage Cleanup] Failed to run resume cleanup:", err);
    return { deleted: 0, scanned: 0 };
  }
}
