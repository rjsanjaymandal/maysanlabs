import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { generateBreadcrumbSchema, generateJobPostingSchema, generatePageSEO } from "@/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Careers | Join the Engineering Team at Maysan Labs",
  description: "Join our team of elite engineers and designers to build next-generation enterprise SaaS services. We offer competitive salaries, remote work, and cutting-edge projects.",
  path: "/careers",
  keywords: [
    "careers",
    "jobs",
    "software engineer jobs",
    "frontend developer jobs",
    "backend developer jobs",
    "full stack developer jobs",
    "react jobs",
    "node.js jobs",
    "remote jobs",
    "Maysan Labs careers"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Careers", url: "/careers" }
]);

// Generate JobPosting schema for general positions
const today = new Date();
const ninetyDaysLater = new Date(today);
ninetyDaysLater.setDate(today.getDate() + 90);

const jobPostingSchema = generateJobPostingSchema({
  title: "Software Engineer",
  description: "We're looking for talented software engineers to build next-generation enterprise SaaS products. You'll work with React, Node.js, PostgreSQL, and cloud technologies.",
  datePosted: today.toISOString().split("T")[0],
  validThrough: ninetyDaysLater.toISOString().split("T")[0],
  employmentType: "FULL_TIME",
  location: "Gurgaon, Haryana, India"
});

export default function CareersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />

      <CareersClient />
    </>
  );
}
