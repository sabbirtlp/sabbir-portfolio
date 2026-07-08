import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildContactNotificationEmail } from "@/lib/email-templates/contact-notification";
import { getContent } from "@/lib/storage";

function getSmtpCredentials() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  return { user, pass };
}

function getReceivingEmail(content: any) {
  const configuredEmail = content?.contactPage?.receivingEmail?.trim();
  if (configuredEmail) {
    return configuredEmail;
  }

  return (
    content?.contactPage?.email ||
    content?.general?.email ||
    process.env.CONTACT_RECEIVING_EMAIL ||
    process.env.EMAIL_USER ||
    process.env.SMTP_USER ||
    null
  );
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, budget, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const content = await getContent();
    const receivingEmail = getReceivingEmail(content);

    if (!receivingEmail) {
      return NextResponse.json(
        {
          error:
            "Receiving email is not configured. Set it in Admin → General Settings or Contact Page, then click Save Changes.",
        },
        { status: 500 },
      );
    }

    const { user: smtpUser, pass: smtpPass } = getSmtpCredentials();

    if (!smtpUser || !smtpPass) {
      console.warn(
        "SMTP credentials missing. Set SMTP_USER/SMTP_PASS (or EMAIL_USER/EMAIL_PASS) in environment variables.",
      );
      return NextResponse.json(
        {
          error:
            "SMTP credentials are not configured on the server. Add SMTP_USER and SMTP_PASS to your environment variables.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const { html, text } = buildContactNotificationEmail(
      { name, email, subject, budget, message },
      {
        siteName: content?.general?.siteName || "Sabbir Hossain",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sabbir.website",
      },
    );

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      replyTo: `"${name}" <${email}>`,
      to: receivingEmail,
      subject: `New Inquiry: ${subject} — ${name}`,
      text,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);

    const smtpMessage =
      error?.response ||
      error?.message ||
      "Failed to send email. Please try again later.";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Failed to send email: ${smtpMessage}`
            : "Failed to send email. Please try again later.",
      },
      { status: 500 },
    );
  }
}
