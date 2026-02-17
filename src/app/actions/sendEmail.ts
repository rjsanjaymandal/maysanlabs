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
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.error("Missing SMTP Configuration. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local");
    return { success: false, message: "Server configuration error" };
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
  } catch (error) {
    console.error("Notification Error:", error);
    return { success: false, message: "Failed to process inquiry" };
  }
}
