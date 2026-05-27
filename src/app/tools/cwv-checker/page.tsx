import type { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";
import CwvCheckerClient from "./CwvCheckerClient";

export const metadata: Metadata = {
  title: "Core Web Vitals Checker | Free Website Speed Test | Maysan Labs",
  description: "Check your website's Core Web Vitals (LCP, INP, CLS) for free. Get a simplified performance report with actionable optimization tips from Maysan Labs.",
  keywords: ["Core Web Vitals checker", "website speed test", "LCP test", "INP test", "CLS test", "page speed insights", "web performance audit"],
  openGraph: {
    title: "Free Core Web Vitals Checker | Maysan Labs",
    description: "Test your site's speed and Core Web Vitals. Get a free performance report with optimization recommendations.",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Core Web Vitals Checker", url: "/tools/cwv-checker" },
]);

export default function CwvCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CwvCheckerClient />
    </>
  );
}