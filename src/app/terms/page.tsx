import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Maysan Labs Terms of Service — terms and conditions for using our website and services.",
  robots: { index: true, follow: true },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Terms of Service", url: "/terms" }
]);

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/70">
          <p><strong>Last updated:</strong> May 2026</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>By accessing or using the Maysan Labs website and services, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">2. Services</h2>
          <p>Maysan Labs provides software development, consulting, and related services. Specific terms are outlined in individual service agreements.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">3. Intellectual Property</h2>
          <p>All content, trademarks, and intellectual property on this website are owned by Maysan Labs unless otherwise stated.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">4. Limitation of Liability</h2>
          <p>Maysan Labs shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">5. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:business@maysanlabs.com" className="text-brand-primary hover:underline">business@maysanlabs.com</a>.</p>
        </div>
      </div>
    </main>
  );
}