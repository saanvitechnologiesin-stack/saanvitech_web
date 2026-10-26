import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { createCareerApplication, getExistingApplication } from "@/libs/db";
import { checkRateLimit, getClientIp } from "@/libs/rateLimit";
import { PRIVATE_STORAGE_DIR, ensureStorageDir, cleanupOldResumes } from "@/libs/storage";

/**
 * Helper to get internal notification emails for new job applications
 */
function getAdminNotificationEmails(): string[] {
  const envRecipients =
    process.env.CAREERS_NOTIFICATION_EMAILS ||
    process.env.APPOINTMENT_NOTIFICATION_EMAILS ||
    process.env.CONTACT_NOTIFICATION_EMAILS ||
    process.env.EMAIL_USER ||
    "";

  if (!envRecipients) return [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return envRecipients
    .split(/[,;]+/)
    .map((e) => e.trim())
    .filter((e) => emailRegex.test(e));
}

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

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, "").slice(0, 10);
    const cleanRoleTitle = roleTitle.trim();

    if (!cleanName) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // 10-digit mobile number validation
    if (!cleanPhone || cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!cleanRoleTitle) {
      return NextResponse.json({ error: "Job role is required." }, { status: 400 });
    }

    // Duplicate Spam Prevention: Verify if candidate already applied for this role
    const existing = await getExistingApplication(cleanEmail, roleId, cleanRoleTitle);
    if (existing) {
      return NextResponse.json(
        {
          error: `You have already submitted an application for "${cleanRoleTitle}". Our recruitment team is currently reviewing your profile and will contact you directly if shortlisted.`,
          alreadyApplied: true,
        },
        { status: 409 }
      );
    }

    // Process uploaded file if present
    let savedResumeRelativePath = "";
    let resumeBuffer: Buffer | null = null;

    if (resumeFile && resumeFile.size > 0) {
      // Validate file size (10MB max)
      const MAX_SIZE = 10 * 1024 * 1024;
      if (resumeFile.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Resume file size must be under 10MB." },
          { status: 400 }
        );
      }

      // Check allowed extensions (PDF, DOC, DOCX)
      const fileExt = path.extname(resumeFile.name).toLowerCase();
      const allowedExts = [".pdf", ".doc", ".docx"];
      if (!allowedExts.includes(fileExt)) {
        return NextResponse.json(
          { error: "Only PDF, DOC, or DOCX resume documents are permitted." },
          { status: 400 }
        );
      }

      const bytes = await resumeFile.arrayBuffer();
      resumeBuffer = Buffer.from(bytes);

      // Save to private storage (outside public/)
      ensureStorageDir();

      const sanitizedFilename = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
      const filePath = path.join(PRIVATE_STORAGE_DIR, uniqueFilename);
      fs.writeFileSync(filePath, resumeBuffer);

      // Point link to authenticated admin resume streaming route
      savedResumeRelativePath = `/api/admin/resumes/${uniqueFilename}`;

      // Automatically clean up old resumes older than 30 days
      try {
        cleanupOldResumes(30);
      } catch (cleanupErr) {
        console.error("Resume retention cleanup notice:", cleanupErr);
      }
    }

    // Save application to database
    let savedApp = null;
    try {
      savedApp = await createCareerApplication({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        roleId: roleId || undefined,
        roleTitle: cleanRoleTitle,
        linkedin: linkedin ? linkedin.trim() : undefined,
        portfolio: portfolio ? portfolio.trim() : undefined,
        coverLetter: coverLetter ? coverLetter.trim() : undefined,
        resumeUrl: resumeUrl ? resumeUrl.trim() : undefined,
        resumeFilePath: savedResumeRelativePath || undefined,
        status: "new",
      });
    } catch (dbErr) {
      console.error("[Career Apply API] Failed to save application to database:", dbErr);
    }

    // Dispatch Automated Emails if SMTP is configured
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const fromName = process.env.EMAIL_FROM_NAME || "Saanvi Technologies Careers";

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        const formattedDate = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
        });

        const logoPath = path.join(process.cwd(), "public", "img", "logo-white.png");
        const hasLogo = fs.existsSync(logoPath);
        const logoAttachment = hasLogo
          ? [
            {
              filename: "logo-white.png",
              path: logoPath,
              cid: "saanvi-logo",
            },
          ]
          : [];

        // 1. CONFIRMATION EMAIL TO THE APPLICANT
        const candidateEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Received - Saanvi Technologies</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
              
              <!-- Top Gradient Brand Accent Line -->
              <div style="height: 4px; background: linear-gradient(90deg, #093d64 0%, #2563eb 50%, #f98e55 100%);"></div>

              <!-- Header with Crisp White Background (Perfect Logo Contrast) -->
              <div style="background: #ffffff; padding: 28px 24px 20px; border-bottom: 1px solid #f1f5f9;">
                ${hasLogo ? `
                  <div style="margin-bottom: 18px;">
                    <img src="cid:saanvi-logo" alt="Saanvi Technologies" width="145" style="display: block; width: 145px; height: auto; border: 0;" />
                  </div>
                ` : ''}
                <div style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #093d64; background: rgba(9, 61, 100, 0.08); padding: 4px 10px; border-radius: 6px; margin-bottom: 10px;">
                  Careers & Talent Acquisition
                </div>
                <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em;">
                  Application Received!
                </h1>
                <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                  We have received your application for <strong style="color: #093d64;">${cleanRoleTitle}</strong>
                </p>
              </div>

              <!-- Body -->
              <div style="padding: 26px 24px;">
                <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin: 0 0 16px;">
                  Dear <strong>${cleanName}</strong>,
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px;">
                  Thank you for your interest in joining <strong>Saanvi Technologies</strong>! We have received your application and your resume has been forwarded to our talent acquisition team.
                </p>

                <!-- Summary Card -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #093d64; margin-bottom: 12px;">
                    Application Summary
                  </div>
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; width: 40%;">Position Applied:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${cleanRoleTitle}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b;">Mobile Number:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">+91 ${cleanPhone}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b;">Applicant Email:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${cleanEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b;">Submitted Date:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${formattedDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Next Steps Timeline -->
                <div style="margin-bottom: 24px;">
                  <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">
                    What Happens Next?
                  </div>
                  <div style="font-size: 13px; line-height: 1.6; color: #475569;">
                    <p style="margin: 0 0 8px;"><strong>1. Profile Review:</strong> Our technical recruiting leads will review your experience against our role requirements within 2 to 3 business days.</p>
                    <p style="margin: 0 0 8px;"><strong>2. Discovery Conversation:</strong> If your qualifications align with our current opening, a member of our team will reach out directly to schedule a brief introductory chat.</p>
                    <p style="margin: 0;"><strong>3. Stay in Touch:</strong> Feel free to reply directly to this email if you have any questions or additional materials you'd like to share.</p>
                  </div>
                </div>

                <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 13px; color: #475569; line-height: 1.5;">
                  Best regards,<br>
                  <strong style="color: #093d64;">Talent Acquisition Team</strong><br>
                  Saanvi Technologies<br>
                  <a href="https://saanvitechin.com" style="color: #2563eb; text-decoration: none;">www.saanvitechin.com</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #f8fafc; padding: 14px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
                Saanvi Technologies • Saligrama, Brahmavara, Udupi - 576225
              </div>

            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"${fromName}" <${user}>`,
          to: cleanEmail,
          replyTo: user,
          subject: `Application Received: ${cleanRoleTitle} - Saanvi Technologies`,
          html: candidateEmailHtml,
          text: `Dear ${cleanName},\n\nThank you for applying for the ${cleanRoleTitle} position at Saanvi Technologies.\n\nWe have received your application and our recruitment team will review your qualifications within 2-3 business days. If shortlisted, we will reach out to you directly at ${cleanEmail} or +91 ${cleanPhone}.\n\nBest regards,\nTalent Acquisition Team\nSaanvi Technologies\nhttps://saanvitechin.com`,
          attachments: logoAttachment,
        });
        console.log(`[Career Apply API] Confirmation email sent to applicant: ${cleanEmail}`);

        // Determine base URL for email links (so they are valid absolute URLs, not relative paths)
        const hostHeader = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
        const protoHeader = req.headers.get("x-forwarded-proto") || (hostHeader.includes("localhost") ? "http" : "https");
        const siteUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || (hostHeader ? `${protoHeader}://${hostHeader}` : "https://saanvitechin.com");
        const adminSecret = process.env.ADMIN_SECRET_KEY || "saanvi-admin-2026";

        const absoluteResumeUrl = savedResumeRelativePath
          ? `${siteUrl}${savedResumeRelativePath}?key=${adminSecret}`
          : (resumeUrl ? resumeUrl.trim() : "");

        // 2. INTERNAL NOTIFICATION TO SAANVI HIRING TEAM
        const adminRecipients = getAdminNotificationEmails();
        if (adminRecipients.length > 0) {
          const adminEmailHtml = `
            <!DOCTYPE html>
            <html>
            <body style="font-family: sans-serif; background: #f8fafc; padding: 20px; color: #1e293b;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
                <div style="height: 4px; background: linear-gradient(90deg, #093d64 0%, #2563eb 50%, #f98e55 100%);"></div>
                <div style="background: #ffffff; padding: 22px 24px 16px; border-bottom: 1px solid #f1f5f9;">
                  ${hasLogo ? `
                    <div style="margin-bottom: 14px;">
                      <img src="cid:saanvi-logo" alt="Saanvi Technologies" width="135" style="display: block; width: 135px; height: auto; border: 0;" />
                    </div>
                  ` : ''}
                  <div style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #093d64; background: rgba(9, 61, 100, 0.08); padding: 3px 8px; border-radius: 6px; margin-bottom: 8px;">
                    Admin Alert
                  </div>
                  <h2 style="margin: 0 0 4px 0; font-size: 19px; color: #0f172a; font-weight: 700;">New Job Application Received</h2>
                  <p style="margin: 0; font-size: 13px; color: #64748b;">Role: <strong style="color: #093d64;">${cleanRoleTitle}</strong></p>
                </div>
                <div style="padding: 20px 24px;">
                  <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Candidate:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${cleanName}</td></tr>
                    <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #2563eb; text-decoration: none;">${cleanEmail}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${cleanPhone}" style="color: #2563eb; text-decoration: none;">+91 ${cleanPhone}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #64748b;">LinkedIn:</td><td style="padding: 8px 0;">${linkedin ? `<a href="${linkedin}" target="_blank" style="color: #2563eb; text-decoration: none;">${linkedin}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #64748b;">Portfolio:</td><td style="padding: 8px 0;">${portfolio ? `<a href="${portfolio}" target="_blank" style="color: #2563eb; text-decoration: none;">${portfolio}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #64748b;">Resume File:</td><td style="padding: 8px 0;">${savedResumeRelativePath ? `<a href="${absoluteResumeUrl}" target="_blank" style="color: #2563eb; font-weight: 600;">Download Resume</a> (also attached)` : (resumeUrl ? `<a href="${resumeUrl}" target="_blank" style="color: #2563eb; font-weight: 600;">View Cloud Link</a>` : '<span style="color:#94a3b8;">None</span>')}</td></tr>
                  </table>
                  ${coverLetter ? `
                    <div style="margin-top: 18px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.5; color: #334155;">
                      <strong style="color: #0f172a;">Cover Note:</strong><br>${coverLetter}
                    </div>
                  ` : ''}
                </div>
              </div>
            </body>
            </html>
          `;

          const adminAttachments = [
            ...logoAttachment,
            ...(resumeFile && resumeBuffer ? [{
              filename: resumeFile.name,
              content: resumeBuffer,
              contentType: resumeFile.type || "application/pdf",
            }] : []),
          ];

          await transporter.sendMail({
            from: `"${fromName}" <${user}>`,
            to: adminRecipients.join(", "),
            replyTo: `"${cleanName}" <${cleanEmail}>`,
            subject: `[New Candidate Application] ${cleanName} - ${cleanRoleTitle}`,
            html: adminEmailHtml,
            text: `New applicant for ${cleanRoleTitle}:\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: +91 ${cleanPhone}\n\nResume: ${absoluteResumeUrl || resumeUrl || "Attached"}\n\nView details in /admin/careers portal.`,
            attachments: adminAttachments,
          });
          console.log(`[Career Apply API] Internal notification sent to: ${adminRecipients.join(", ")}`);
        }
      } catch (mailErr) {
        console.error("[Career Apply API] Automated email dispatch notice:", mailErr);
      }
    } else {
      console.log(`[Career Apply API] SMTP credentials not set. Application saved to DB for candidate: ${cleanEmail}`);
    }

    return NextResponse.json({
      success: true,
      applicationId: savedApp?.id,
      message: "Application submitted successfully! A confirmation email has been sent to your email address.",
    });
  } catch (err: any) {
    console.error("Job application submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
