import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifySessionToken } from "@/libs/auth";
import { PRIVATE_STORAGE_DIR, ensureStorageDir } from "@/libs/storage";

export const dynamic = "force-dynamic";

function checkAdmin(req: NextRequest): boolean {
  const token =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    req.headers.get("x-admin-key") ||
    req.nextUrl.searchParams.get("key") ||
    req.cookies.get("admin_session")?.value;

  if (!token) return false;

  const session = verifySessionToken(token);
  if (session) return true;

  const expectedKey = process.env.ADMIN_SECRET_KEY || "saanvi-admin-2026";
  return token === expectedKey;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    // 1. Enforce admin authentication
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { error: "Unauthorized access to candidate documents." },
        { status: 401 }
      );
    }

    const { filename } = await params;
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // 2. Prevent directory traversal attacks
    const sanitizedFilename = path.basename(filename);
    ensureStorageDir();
    let filePath = path.join(PRIVATE_STORAGE_DIR, sanitizedFilename);

    // Fallback to old public path for backwards compatibility if file was not yet moved
    if (!fs.existsSync(filePath)) {
      const legacyPath = path.join(process.cwd(), "public", "uploads", "resumes", sanitizedFilename);
      if (fs.existsSync(legacyPath)) {
        filePath = legacyPath;
      } else {
        return NextResponse.json({ error: "File not found or expired." }, { status: 404 });
      }
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(sanitizedFilename).toLowerCase();

    // 3. Set content type appropriately
    let contentType = "application/octet-stream";
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".doc") contentType = "application/msword";
    else if (ext === ".docx") contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${sanitizedFilename}"`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: any) {
    console.error("Resume download error:", err);
    return NextResponse.json(
      { error: "Internal server error reading document." },
      { status: 500 }
    );
  }
}
