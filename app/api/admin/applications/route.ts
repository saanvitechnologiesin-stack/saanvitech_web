import { NextRequest, NextResponse } from "next/server";
import {
  getAllCareerApplications,
  updateCareerApplicationStatus,
  deleteCareerApplication,
} from "@/libs/db";
import { verifySessionToken } from "@/libs/auth";
import { ApplicationStatus } from "@/types/career";
import { cleanupOldResumes } from "@/libs/storage";

export const dynamic = 'force-dynamic';

function checkAdmin(req: NextRequest): boolean {
  const token =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    req.headers.get("x-admin-key") ||
    req.cookies.get("admin_session")?.value;

  if (!token) return false;

  const session = verifySessionToken(token);
  if (session) return true;

  const expectedKey = process.env.ADMIN_SECRET_KEY || "saanvi-admin-2026";
  return token === expectedKey;
}

export async function GET(req: NextRequest) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const applications = await getAllCareerApplications();

    // Background retention check: purge any resumes older than 30 days
    try {
      cleanupOldResumes(30);
    } catch (e) { }

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (err: any) {
    console.error("Fetch applications error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Application ID and new status are required." },
        { status: 400 }
      );
    }

    const validStatuses: ApplicationStatus[] = ["new", "reviewed", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid application status." },
        { status: 400 }
      );
    }


    const updated = await updateCareerApplicationStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application: updated,
      message: `Status updated to ${status}`,
    });
  } catch (err: any) {
    console.error("Update application status error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update application status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Application ID is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteCareerApplication(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (err: any) {
    console.error("Delete application error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}
