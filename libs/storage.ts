import fs from "fs";
import path from "path";

/**
 * Directory for private resume storage (outside of public/)
 */
export const PRIVATE_STORAGE_DIR = path.join(process.cwd(), "storage", "resumes");

/**
 * Ensure private storage directory exists
 */
export function ensureStorageDir(): void {
  if (!fs.existsSync(PRIVATE_STORAGE_DIR)) {
    fs.mkdirSync(PRIVATE_STORAGE_DIR, { recursive: true });
  }
}

/**
 * Clean up resume files older than maxAgeDays (default: 30 days)
 * Can be called during background jobs, new uploads, or periodic admin checks.
 */
export function cleanupOldResumes(maxAgeDays = 30): { deleted: number; scanned: number } {
  try {
    ensureStorageDir();
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
