import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createCareerApplication, getExistingApplication } from "@/libs/db";
import { checkRateLimit, getClientIp } from "@/libs/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting: Max 5 applications per 10 minutes per IP
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`apply:${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      const waitMins = Math.max(1, Math.ceil(rateCheck.retryAfterSec / 60));
      return NextResponse.json(
        {
          error: `Too many application requests from your network. Please wait ${waitMins} minute(s) before submitting again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec),
          },
        }
      );
    }
    let name = "";
    let email = "";
    let phone = "";
    let roleTitle = "";
    let roleId = "";
    let linkedin = "";
    let portfolio = "";
    let coverLetter = "";
    let resumeUrl = "";
    let resumeFile: File | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = formData.get("name")?.toString() || "";
      email = formData.get("email")?.toString() || "";
      phone = formData.get("phone")?.toString() || "";
      roleTitle = formData.get("roleTitle")?.toString() || "";
      roleId = formData.get("roleId")?.toString() || "";
      linkedin = formData.get("linkedin")?.toString() || "";
      portfolio = formData.get("portfolio")?.toString() || "";
      coverLetter = formData.get("coverLetter")?.toString() || "";
      resumeUrl = formData.get("resumeUrl")?.toString() || "";

      const file = formData.get("resumeFile");
      if (file && typeof file !== "string") {
        resumeFile = file as File;
      }
    } else {
      const body = await req.json();
      name = body.name || "";
      email = body.email || "";
      phone = body.phone || "";
      roleTitle = body.roleTitle || "";
      roleId = body.roleId || "";
      linkedin = body.linkedin || "";
      portfolio = body.portfolio || "";
      coverLetter = body.coverLetter || "";
      resumeUrl = body.resumeUrl || "";
    }

    if (!name || !email || !phone || !roleTitle) {
      return NextResponse.json(
        { error: "Name, email, phone, and role are required." },
        { status: 400 }
      );
    }

    // Duplicate Spam Prevention: Verify if candidate already applied for this role
    const existing = await getExistingApplication(email, roleId, roleTitle);
    if (existing) {
      return NextResponse.json(
        {
          error: `You have already submitted an application for "${roleTitle}". Our recruitment team is currently reviewing your profile and will contact you directly if shortlisted.`,
          alreadyApplied: true,
        },
        { status: 409 }
      );
    }

    // Process uploaded file if present
    let savedResumeRelativePath = "";

    if (resumeFile && resumeFile.size > 0) {
      // Validate file size (10MB max)
      const MAX_SIZE = 10 * 1024 * 1024;
      if (resumeFile.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Resume file size must be under 10MB." },
          { status: 400 }
        );
      }

      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save to public/uploads/resumes
      const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const sanitizedFilename = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);

      savedResumeRelativePath = `/uploads/resumes/${uniqueFilename}`;
    }

    // Save application to database
    let savedApp = null;
    try {
      savedApp = await createCareerApplication({
        name,
        email,
        phone,
        roleId: roleId || undefined,
        roleTitle,
        linkedin: linkedin || undefined,
        portfolio: portfolio || undefined,
        coverLetter: coverLetter || undefined,
        resumeUrl: resumeUrl || undefined,
        resumeFilePath: savedResumeRelativePath || undefined,
        status: "new",
      });
    } catch (dbErr) {
      console.error("Failed to save application to database:", dbErr);
    }

    return NextResponse.json({
      success: true,
      applicationId: savedApp?.id,
      message: "Application submitted successfully! Our talent team will review your profile and reach out.",
    });
  } catch (err: any) {
    console.error("Job application submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}

