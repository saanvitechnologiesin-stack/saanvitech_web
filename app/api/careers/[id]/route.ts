import { NextRequest, NextResponse } from "next/server";
import { updateCareer, deleteCareer } from "@/libs/db";
import { verifySessionToken } from "@/libs/auth";

function checkAdmin(req: NextRequest): boolean {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ||
                req.headers.get("x-admin-key") ||
                req.cookies.get("admin_session")?.value;

  if (!token) return false;

  const session = verifySessionToken(token);
  if (session) return true;

  const expectedKey = process.env.ADMIN_SECRET_KEY || "saanvi-admin-2026";
  return token === expectedKey;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin passcode required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await updateCareer(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, career: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update career" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin passcode required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    await deleteCareer(id);
    return NextResponse.json({ success: true, message: "Career deleted successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete career" },
      { status: 500 }
    );
  }
}
