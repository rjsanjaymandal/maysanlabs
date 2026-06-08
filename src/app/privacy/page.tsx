import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

const ogImage = (t: string, d?: string) =>
  `/api/og?title=${encodeURIComponent(t.slice(0, 100))}${d ? `&description=${encodeURIComponent(d.slice(0, 160))}` : ""}`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Maysan Labs Privacy Policy — how we collect, use, and protect your data.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy",
    description: "Maysan Labs Privacy Policy — how we collect, use, and protect your data.",
    url: "https://maysanlabs.com/privacy",
    type: "website",
    siteName: "Maysan Labs",
    images: [{ url: ogImage("Privacy Policy | Maysan Labs", "How we collect, use, and protect your data."), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Maysan Labs Privacy Policy — how we collect, use, and protect your data.",
    images: [ogImage("Privacy Policy | Maysan Labs", "How we collect, use, and protect your data.")],
  },
  alternates: {
    canonical: "https://maysanlabs.com/privacy",
    languages: { en: "https://maysanlabs.com/privacy" },
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy" }
]);

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      {/* Brand Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container-main max-w-3xl relative">
        <div className="bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-sm">
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
      </div>
    </main>
  );
}