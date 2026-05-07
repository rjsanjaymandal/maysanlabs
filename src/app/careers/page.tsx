import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { generateJobPostingSchema } from "@/lib/seo/helpers";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Careers | Join Maysan Labs - Enterprise Software Development",
  description: "Join our team of elite engineers and designers to build next-generation enterprise SaaS services. We offer competitive salaries, remote work, and cutting-edge projects.",
  keywords: ["careers", "jobs", "software engineer jobs", "frontend developer jobs", "backend developer jobs", "full stack developer jobs", "react jobs", "node.js jobs", "remote jobs", "Maysan Labs careers"],
  openGraph: {
    title: "Careers | Join Maysan Labs",
    description: "Join our team of elite engineers and designers to build next-generation enterprise SaaS services.",
    url: "https://maysanlabs.com/careers",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Careers at Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/careers",
    languages: {
      en: "https://maysanlabs.com/careers",
      ar: "https://maysanlabs.com/ar/careers",
    },
  },
};

// Generate JobPosting schema for general positions
const jobPostingSchema = generateJobPostingSchema({
  title: "Software Engineer",
  description: "We're looking for talented software engineers to build next-generation enterprise SaaS products. You'll work with React, Node.js, PostgreSQL, and cloud technologies.",
  datePosted: "2024-01-01",
  validThrough: "2024-12-31",
  employmentType: "FULL_TIME",
  location: "Gurgaon, Haryana, India"
});

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />
      <CareersClient />
    </>
  );
}
