import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 }
      );
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let html = `
      <h3>New Contact Form Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    if(service) {
      html = `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service type:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Receiver
      subject: `Consulo Contact Form Message`,
      text: message,
      html: html,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Thanks for contacting us. We'll get back to you as soon as possible." });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
