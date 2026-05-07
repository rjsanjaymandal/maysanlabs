import type { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";

export const metadata: Metadata = {
  title: "Cloud Architecture | Enterprise Infrastructure | Maysan Labs",
  description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products. AWS, Azure, GCP, Kubernetes, microservices, and scalable infrastructure.",
  keywords: ["cloud architecture", "enterprise infrastructure", "AWS architecture", "Azure architecture", "GCP architecture", "kubernetes", "microservices", "distributed systems", "cloud infrastructure", "enterprise SaaS architecture"],
  openGraph: {
    title: "Cloud Architecture | Enterprise Infrastructure | Maysan Labs",
    description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products.",
    url: "https://maysanlabs.com/architecture",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cloud Architecture - Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/architecture",
    languages: {
      en: "https://maysanlabs.com/architecture",
      ar: "https://maysanlabs.com/ar/architecture",
    },
  },
};

export default function ArchitecturePage() {
  return <ArchitectureClient />;
}
