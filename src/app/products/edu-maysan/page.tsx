import type { Metadata } from "next";
import EduMaysanClient from "./EduMaysanClient";

export const metadata: Metadata = {
  title: "EduMaysan - School Management Software & ERP | Maysan Labs",
  description: "EduMaysan is a comprehensive school management software and ERP system. Manage admissions, fees, examinations, and more with our cloud-based EdTech platform.",
  keywords: ["school management software", "education ERP", "school management system", "admission management", "fee management software", "EdTech platform", "LMS", "learning management system"],
  openGraph: {
    title: "EduMaysan - School Management ERP | Maysan Labs",
    description: "Comprehensive school management software and ERP system for modern educational institutions.",
    url: "https://maysanlabs.com/products/edu-maysan",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "EduMaysan - School Management Software" }],
  },
  alternates: {
    canonical: "https://maysanlabs.com/products/edu-maysan",
    languages: {
      en: "https://maysanlabs.com/products/edu-maysan",
      ar: "https://maysanlabs.com/ar/products/edu-maysan",
    },
  },
};

export default function EduMaysanPage() {
  return <EduMaysanClient />;
}
