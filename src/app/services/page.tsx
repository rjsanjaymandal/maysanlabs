import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "SaaS Development Services | Custom Software Development | Maysan Labs",
  description: "Maysan Labs offers comprehensive SaaS development services including web development, mobile apps, e-commerce, cloud infrastructure, custom software, and AI automation. Build scalable enterprise solutions.",
  keywords: ["SaaS development services", "custom software development", "web development company", "mobile app development", "e-commerce development", "cloud infrastructure services", "enterprise software", "React development", "Node.js development", "API development"],
  openGraph: {
    title: "SaaS Development Services | Maysan Labs",
    description: "Comprehensive SaaS development services. Custom software, cloud infrastructure, and scalable web applications.",
    url: "https://maysanlabs.com/services",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SaaS Development Services - Maysan Labs" }],
  },
  alternates: { canonical: "https://maysanlabs.com/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
