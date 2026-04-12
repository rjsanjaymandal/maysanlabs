import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "SaaS Development Services | Custom Software Services",
  description: "Maysan Labs offers comprehensive SaaS development services including online stores, CRM systems, custom software, and cloud infrastructure. Build scalable services with our expert team.",
  keywords: ["SaaS development services", "custom software development", "online store development", "CRM development", "cloud services", "enterprise software services"],
  openGraph: {
    title: "SaaS Development Services | Maysan Labs",
    description: "Comprehensive SaaS development services. Custom software, cloud infrastructure, and scalable web applications.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
