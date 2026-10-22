import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveContactInquiry } from "@/libs/db";

/**
 * Extracts notification recipient emails from environment variables.
 * Multiple emails can be specified separated by comma or semicolon in:
 * APPOINTMENT_NOTIFICATION_EMAILS or CONTACT_NOTIFICATION_EMAILS
 */
function getRecipientEmails(): string[] {
  const envRecipients =
    process.env.APPOINTMENT_NOTIFICATION_EMAILS ||
    process.env.CONTACT_NOTIFICATION_EMAILS ||
    process.env.EMAIL_USER ||
    "info@saanvitechin.com,chinmaya@saanvitechin.com";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emails = envRecipients
    .split(/[,;]+/)
    .map((e) => e.trim())
    .filter((e) => emailRegex.test(e));

  return emails.length > 0 ? emails : ["info@saanvitechin.com"];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Please provide your message or inquiry details." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone && typeof phone === "string" ? phone.trim() : "";
    const cleanService = service && typeof service === "string" ? service.trim() : "General Consultation / Service";
    const cleanMessage = message.trim();

    // 1. Persist to PostgreSQL database (ensures no customer inquiry is ever lost)
    let inquiryId: number | null = null;
    try {
      const saved = await saveContactInquiry({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone || undefined,
        service: cleanService,
        message: cleanMessage,
      });
      inquiryId = saved.id;
    } catch (dbErr) {
      console.error("[Contact API] Database save notice (proceeding with email dispatch):", dbErr);
    }

    // 2. Resolve recipient email(s) from .env
    const recipients = getRecipientEmails();
    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 3. Dispatch notification email if SMTP credentials are provided in .env
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const fromName = process.env.EMAIL_FROM_NAME || "Saanvi Technologies";

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // true for port 465, false for 587/25
          auth: { user, pass },
        });

        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Appointment Request</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a8a 100%); padding: 28px 24px; color: #ffffff;">
                <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                  New Appointment Request
                </h1>
                <p style="margin: 0; font-size: 14px; opacity: 0.85;">
                  Received via Saanvi Technologies Website Contact Form
                </p>
              </div>

              <!-- Content Body -->
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tbody>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; width: 35%; font-weight: 600; color: #64748b;">Full Name</td>
                      <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${cleanName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; font-weight: 600; color: #64748b;">Email Address</td>
                      <td style="padding: 12px 8px;">
                        <a href="mailto:${cleanEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                          ${cleanEmail}
                        </a>
                      </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; font-weight: 600; color: #64748b;">Phone Number</td>
                      <td style="padding: 12px 8px; color: #0f172a;">
                        ${cleanPhone ? `<a href="tel:${cleanPhone}" style="color: #2563eb; text-decoration: none;">${cleanPhone}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                      </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; font-weight: 600; color: #64748b;">Service / Interest</td>
                      <td style="padding: 12px 8px; color: #0f172a; font-weight: 500;">${cleanService}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; font-weight: 600; color: #64748b;">Received At</td>
                      <td style="padding: 12px 8px; color: #475569; font-size: 13px;">${formattedDate} (IST)</td>
                    </tr>
                    ${inquiryId ? `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 12px 8px; font-weight: 600; color: #64748b;">Inquiry Reference #</td>
                      <td style="padding: 12px 8px; color: #475569; font-size: 13px; font-family: monospace;">#INQ-${inquiryId}</td>
                    </tr>
                    ` : ''}
                  </tbody>
                </table>

                <!-- Message Box -->
                <div style="margin-top: 20px;">
                  <div style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px;">
                    Client Message / Notes
                  </div>
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${cleanMessage}</div>
                </div>

                <!-- Action Footer -->
                <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; display: flex; align-items: center; justify-content: space-between;">
                  <span>Tip: You can hit <strong>Reply</strong> in your email client to respond directly to ${cleanName}.</span>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
                This notification was sent to: ${recipients.join(", ")}<br />
                Configured via <code style="background: #e2e8f0; padding: 2px 4px; border-radius: 4px;">APPOINTMENT_NOTIFICATION_EMAILS</code> in .env
              </div>

            </div>
          </body>
          </html>
        `;

        const mailOptions = {
          from: `"${fromName}" <${user}>`,
          to: recipients.join(", "),
          replyTo: `"${cleanName}" <${cleanEmail}>`,
          subject: `[New Appointment Request] ${cleanName} - ${cleanService}`,
          text: `New Appointment / Contact Form Message\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone || "N/A"}\nService: ${cleanService}\nDate: ${formattedDate}\n\nMessage:\n${cleanMessage}`,
          html: html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Contact API] Appointment email successfully sent to: ${recipients.join(", ")}`);
      } catch (mailErr) {
        console.error("[Contact API] Nodemailer email dispatch failed:", mailErr);
        // We do not fail the request if the inquiry was saved in DB
      }
    } else {
      console.log(
        `[Contact API] SMTP credentials not set (EMAIL_HOST/EMAIL_USER/EMAIL_PASS). Inquiry saved to DB. Notification targets: ${recipients.join(", ")}`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your appointment request has been submitted successfully. Our team will contact you shortly.",
    });
  } catch (error: any) {
    console.error("[Contact API] Request error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or reach out to us directly via phone or email." },
      { status: 500 }
    );
  }
}
