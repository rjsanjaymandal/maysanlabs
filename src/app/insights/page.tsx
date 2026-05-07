import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights & Technical Blog | Maysan Labs",
  description: "Explore our latest technical insights, architectural deep dives, and scaling strategies for modern SaaS products. Expert advice on React, Node.js, cloud infrastructure, and enterprise development.",
  keywords: ["tech blog", "technical insights", "software development blog", "SaaS development", "React tutorials", "Node.js tutorials", "cloud architecture", "enterprise software", "scaling strategies", "Maysan Labs blog"],
  openGraph: {
    title: "Insights & Technical Blog | Maysan Labs",
    description: "Explore our latest technical insights, architectural deep dives, and scaling strategies for modern SaaS products.",
    url: "https://maysanlabs.com/insights",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Technical Insights - Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/insights",
    languages: {
      en: "https://maysanlabs.com/insights",
      ar: "https://maysanlabs.com/ar/insights",
    },
  },
};

export default function InsightsPage() {
  return <InsightsClient />;
}
