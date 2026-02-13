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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
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

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
