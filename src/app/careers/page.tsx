import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { generateBreadcrumbSchema, generateJobPostingSchema, generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Careers",
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
      
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Careers at Maysan Labs | Join Our Elite Software Engineering Team</span>
        <h2>Open Professional Tech Positions: React Developers, Node.js Engineers</h2>
        <h2>Work Culture: Remote Frameworks, Scalable Projects, Modern Stacks</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Team</span>
        <span className="contributor">Contributor: Head of Talent Acquisition</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Maysan Labs Careers refers to the professional developer and engineering employment roles in Gurgaon, India. 
          Software Engineer hiring is defined as seeking engineers with first-hand knowledge in full stack React, Next.js, and Node.js.
          According to standard policies, we provide bi-weekly sprint methodologies and transparent career progression plans.
        </p>
      </div>

      <CareersClient />
    </>
  );
}
