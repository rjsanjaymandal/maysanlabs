import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.titan.email",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log("SMTP connection: SUCCESS");
  const info = await transporter.sendMail({
    from: `"Test" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "SMTP Test from Maysan Labs",
    text: "If you receive this, SMTP is working correctly.",
  });
  console.log("Test email sent:", info.messageId);
} catch (err) {
  console.error("SMTP test FAILED:", err.message);
}
