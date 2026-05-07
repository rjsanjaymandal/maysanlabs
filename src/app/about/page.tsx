import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Maysan Labs - Enterprise SaaS Development Company",
  description: "Learn about Maysan Labs - a leading enterprise SaaS development company. Our team of experts builds scalable web applications, cloud infrastructure, and custom software solutions for global enterprises.",
  keywords: ["about Maysan Labs", "enterprise software company", "SaaS development company", "custom software development", "team of developers", "software company about", "enterprise solutions", "Maysan Labs team", "software development company"],
  openGraph: {
    title: "About Us | Maysan Labs - Enterprise SaaS Development Company",
    description: "Learn about Maysan Labs - a leading enterprise SaaS development company building scalable web applications and custom software solutions.",
    url: "https://maysanlabs.com/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/about",
    languages: {
      en: "https://maysanlabs.com/about",
      ar: "https://maysanlabs.com/ar/about",
    },
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
