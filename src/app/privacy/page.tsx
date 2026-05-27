import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Maysan Labs Privacy Policy — how we collect, use, and protect your data.",
  robots: { index: true, follow: true },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy" }
]);

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/70">
          <p><strong>Last updated:</strong> May 2026</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, phone number, and project details when you fill out our contact form or newsletter.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, provide services, send newsletters (with consent), and improve our website.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">4. Third-Party Services</h2>
          <p>We may use third-party services (e.g., Resend for email, Google Analytics for analytics) that process data under their own privacy policies.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">5. Contact</h2>
          <p>For privacy-related inquiries, contact us at <a href="mailto:business@maysanlabs.com" className="text-brand-primary hover:underline">business@maysanlabs.com</a>.</p>
        </div>
      </div>
    </main>
  );
}