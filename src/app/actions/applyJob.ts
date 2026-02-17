"use server";

import nodemailer from "nodemailer";

export async function applyJob(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const jobId = formData.get("jobId") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const linkedIn = formData.get("linkedIn") as string;
  const portfolio = formData.get("portfolio") as string;
  const message = formData.get("message") as string;
  const resume = formData.get("resume") as File;

  if (!name || !email || !resume) {
    return { success: false, message: "Missing required fields (Name, Email, Resume)" };
  }

  // Check for missing SMTP configuration
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.error("Missing SMTP Configuration for Careers System.");
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
    // Convert resume to Buffer for Nodemailer attachment
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Send Email Notification to Team
    const mailPromise = transporter.sendMail({
      from: `"Maysan Labs Talent" <${process.env.SMTP_USER}>`,
      to: "business@maysanlabs.com",
      subject: `New Application: ${jobTitle} - ${name}`,
      text: `
        New Job Application Received
        
        Position: ${jobTitle} (${jobId})
        Candidate: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        LinkedIn: ${linkedIn || "N/A"}
        Portfolio: ${portfolio || "N/A"}
        
        Cover Letter / Message:
        ${message || "No message provided."}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6;">
          <h2 style="color: #000;">New Job Application Received</h2>
          <p><strong>Position:</strong> ${jobTitle} (${jobId})</p>
          <p><strong>Candidate:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>LinkedIn:</strong> <a href="${linkedIn}">${linkedIn || "N/A"}</a></p>
          <p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio || "N/A"}</a></p>
          <hr />
          <h3>Cover Letter / Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message || "No message provided."}</p>
          <hr />
          <p><small>Resume is attached to this email.</small></p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        }
      ]
    });

    // 2. Send Discord Notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      const discordPromise = fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "🎯 **New Job Application Alert!**",
          embeds: [
            {
              title: `Position: ${jobTitle}`,
              color: 0x00ff00,
              fields: [
                { name: "Candidate", value: name, inline: true },
                { name: "Email", value: email, inline: true },
                { name: "LinkedIn", value: linkedIn || "N/A" },
                { name: "Message Snippet", value: message ? (message.length > 500 ? message.slice(0, 500) + "..." : message) : "N/A" },
              ],
              footer: { text: "Maysan Labs Talent Portal" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      await Promise.allSettled([mailPromise, discordPromise]);
    } else {
      await mailPromise;
    }

    return { success: true, message: "Application submitted successfully" };
  } catch (error) {
    console.error("Application processing error:", error);
    return { success: false, message: "Failed to process application" };
  }
}
