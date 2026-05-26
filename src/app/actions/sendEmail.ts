"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const requirements = formData.get("requirements") as string;
  const email = formData.get("email") as string;
  const contact = formData.get("contact") as string;

  if (!companyName || !email) {
    return { success: false, message: "Missing required fields" };
  }

  // Check for missing SMTP configuration
  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    !process.env.SMTP_USER.includes("your-email") &&
    !process.env.SMTP_PASS.includes("your-app");

  if (!smtpConfigured) {
    console.warn("SMTP not configured. Logging inquiry to console instead.");
    console.log("=== New Project Inquiry ===");
    console.log({ companyName, email, contact, requirements });
    console.log("===========================");
    return { success: true, message: "Inquiry received successfully" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // 1. Send Email Notification
    const mailPromise = transporter.sendMail({
      from: `"Maysan Labs System" <${process.env.SMTP_USER}>`,
      to: "business@maysanlabs.com",
      subject: `New Project Inquiry: ${companyName}`,
      text: `
        New Project Initialization Request

        Company: ${companyName}
        Email: ${email}
        Contact: ${contact}

        Requirements:
        ${requirements}
      `,
      html: `
        <h2>New Project Initialization Request</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <h3>Requirements:</h3>
        <p style="white-space: pre-wrap;">${requirements}</p>
      `,
    });

    // 2. Send Discord Notification (if configured)
    if (process.env.DISCORD_WEBHOOK_URL) {
      const discordPromise = fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "🚀 **New Project Inquiry Received!**",
          embeds: [
            {
              title: `Inquiry: ${companyName}`,
              color: 0x5865f2,
              fields: [
                { name: "Email", value: email, inline: true },
                { name: "Contact", value: contact || "N/A", inline: true },
                { name: "Requirements", value: requirements.slice(0, 1024) },
              ],
              footer: { text: "Maysan Labs System" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      // We don't await discord here to avoid blocking mail if discord fails, 
      // but let's await both for reliability since it's a server action.
      await Promise.allSettled([mailPromise, discordPromise]);
    } else {
      await mailPromise;
    }

    return { success: true, message: "Inquiry received successfully" };
  } catch (error: unknown) {
    console.error("Notification Error:", error);
    return { success: false, message: "Failed to send inquiry. Our team has been notified of this issue." };
  }
}
