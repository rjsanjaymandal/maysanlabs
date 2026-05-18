import AboutClient from "./AboutClient";
import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "About Us | Maysan Labs - Enterprise SaaS Development Company",
  description: "Learn about Maysan Labs - a leading enterprise SaaS development company. Our team of experts builds scalable web applications, cloud infrastructure, and custom software solutions for global enterprises.",
  path: "/about",
  keywords: [
    "about Maysan Labs",
    "enterprise software company",
    "team of developers",
    "software company about",
    "Maysan Labs team"
  ]
});

export default function AboutPage() {
  return <AboutClient />;
}
