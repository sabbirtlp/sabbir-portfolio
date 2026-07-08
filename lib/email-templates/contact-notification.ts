type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  budget?: string;
  message: string;
};

type ContactEmailOptions = {
  siteName?: string;
  siteUrl?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function fieldRow(label: string, value: string, href?: string) {
  const safeValue = escapeHtml(value);

  return `
    <tr>
      <td style="padding: 0 0 14px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #111111; border: 1px solid #262626; border-radius: 16px;">
          <tr>
            <td style="padding: 16px 18px;">
              <p style="margin: 0 0 6px 0; font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.4; letter-spacing: 0.14em; text-transform: uppercase; color: #737373; font-weight: 700;">
                ${label}
              </p>
              ${
                href
                  ? `<a href="${href}" style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.5; color: #ffffff; text-decoration: none; font-weight: 600;">${safeValue}</a>`
                  : `<p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.5; color: #ffffff; font-weight: 600;">${safeValue}</p>`
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

export function buildContactNotificationEmail(
  data: ContactFormData,
  options: ContactEmailOptions = {},
) {
  const siteName = options.siteName || "Sabbir Hossain";
  const siteUrl = options.siteUrl || "https://sabbir.website";
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");
  const initials = escapeHtml(getInitials(data.name));
  const timestamp = escapeHtml(formatTimestamp());
  const mailtoReply = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0a0a0a; -webkit-text-size-adjust: 100%;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
      New inquiry from ${safeName}: ${safeSubject}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; width: 100%;">
            <!-- Header -->
            <tr>
              <td style="padding: 0 0 24px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, #141414 0%, #0a0a0a 100%); border: 1px solid #262626; border-radius: 24px; overflow: hidden;">
                  <tr>
                    <td style="padding: 28px 28px 24px 28px; background: radial-gradient(circle at top right, rgba(234, 88, 12, 0.18), transparent 55%);">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; color: #ea580c; font-weight: 700;">
                              Portfolio Notification
                            </p>
                            <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 1.1; color: #ffffff; font-weight: 700;">
                              <span style="color: #ea580c;">S</span>abbir
                            </p>
                          </td>
                          <td align="right" valign="top">
                            <div style="width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; line-height: 48px; text-align: center;">
                              ${initials}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <div style="height: 2px; width: 64px; background: linear-gradient(90deg, #ea580c 0%, #fb923c 100%); border-radius: 999px; margin: 20px 0 18px 0;"></div>

                      <p style="margin: 0 0 8px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.15; color: #ffffff; font-weight: 700;">
                        New Contact Inquiry
                      </p>
                      <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                        Someone just submitted your contact form on
                        <a href="${siteUrl}" style="color: #fb923c; text-decoration: none; font-weight: 600;">${escapeHtml(siteName)}</a>.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Subject highlight -->
            <tr>
              <td style="padding: 0 0 18px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(234, 88, 12, 0.12) 0%, rgba(251, 146, 60, 0.06) 100%); border: 1px solid rgba(234, 88, 12, 0.28); border-radius: 18px;">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <p style="margin: 0 0 6px 0; font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.4; letter-spacing: 0.14em; text-transform: uppercase; color: #fb923c; font-weight: 700;">
                        Project Subject
                      </p>
                      <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; line-height: 1.3; color: #ffffff; font-weight: 700;">
                        ${safeSubject}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${fieldRow("Client Name", data.name)}
                  ${fieldRow("Email Address", data.email, `mailto:${safeEmail}`)}
                  ${fieldRow("Budget Range", data.budget?.trim() || "Not specified")}
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding: 8px 0 24px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #111111; border: 1px solid #262626; border-radius: 20px;">
                  <tr>
                    <td style="padding: 22px 22px 8px 22px;">
                      <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.4; letter-spacing: 0.14em; text-transform: uppercase; color: #737373; font-weight: 700;">
                        Message
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 22px 22px 22px;">
                      <div style="background-color: #1a1a1a; border: 1px solid #262626; border-radius: 16px; padding: 18px 18px;">
                        <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.75; color: #d4d4d4;">
                          ${safeMessage}
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding: 0 0 28px 0;">
                <a href="${mailtoReply}" style="display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; line-height: 1; padding: 16px 28px; border-radius: 999px; box-shadow: 0 10px 30px rgba(234, 88, 12, 0.28);">
                  Reply to ${safeName}
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top: 8px; border-top: 1px solid #262626;">
                <p style="margin: 0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color: #737373; text-align: center;">
                  Received on ${timestamp}
                </p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color: #525252; text-align: center;">
                  Sent from your portfolio contact form ·
                  <a href="${siteUrl}/contact" style="color: #fb923c; text-decoration: none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const text = [
    "NEW CONTACT FORM SUBMISSION",
    "===========================",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    `Budget: ${data.budget?.trim() || "Not specified"}`,
    "",
    "Message:",
    data.message,
    "",
    `Reply: mailto:${data.email}`,
    `Received: ${formatTimestamp()}`,
    `Site: ${siteUrl}`,
  ].join("\n");

  return { html, text };
}
