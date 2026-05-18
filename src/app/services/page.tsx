import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "SaaS Development Services | Custom Software Development | Maysan Labs",
  description: "Maysan Labs offers comprehensive SaaS development services including web development, mobile apps, e-commerce, cloud infrastructure, custom software, and AI automation. Build scalable enterprise solutions.",
  path: "/services",
  keywords: [
    "SaaS development services",
    "web development company",
    "mobile app development",
    "e-commerce development",
    "React development",
    "Node.js development",
    "API development"
  ]
});

export default function ServicesPage() {
  return <ServicesClient />;
}
