import { Metadata } from "next";
import { jobPositions } from "@/lib/careers-data";

export const metadata: Metadata = {
  title: "Careers | Join Maysan Labs | SaaS Engineering Jobs Gurgaon",
  description:
    "Join Maysan Labs and build high-performance enterprise SaaS infrastructure. Explore open roles in engineering, design, and marketing at Maysan Labs in Gurgaon, India.",
  keywords: [
    "Maysan Labs careers",
    "maysanlabs jobs",
    "Maysan Labs hiring",
    "SaaS careers Gurgaon",
    "software engineering jobs Gurgaon",
    "remote engineering jobs",
    "Maysan Labs Gurgaon careers",
  ],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobPostingSchema = jobPositions.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: "2024-03-20", // Ideally this comes from data
    validThrough: "2025-03-20",
    employmentType:
      job.type === "Full-time"
        ? "FULL_TIME"
        : job.type === "Internship"
          ? "INTERN"
          : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "Maysan Labs",
      sameAs: "https://maysanlabs.com",
      logo: "https://maysanlabs.com/favicon.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.includes("Gurgaon")
          ? "Gurgaon"
          : "Remote",
        addressCountry: "IN",
      },
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <h1>Maysan Labs Careers, Software Developer Jobs, and Hiring in Gurgaon</h1>
        <h2>Frontend Architect Openings, Cloud Systems Engineers, and Designer Opportunities</h2>
        <h2>Full-Time Technical Careers, Internship Programs, and Collaborative Workspace Culture</h2>
        <span className="author" rel="author">Written by Maysan Labs People & Culture Team</span>
        <span className="contributor">Contributor: Lead Recruiter</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Maysan Labs Careers refers to professional employment and internship opportunities at our physical studio in Gurgaon, India.
          Workplace growth is defined as structural professional progression featuring competitive benefits, continuous learning, and state-of-the-art workstations.
          According to standard onboarding tracks, our developers undergo continuous coaching to master type-safe modern systems.
        </p>
        <ul>
          <li>Open Frontend Engineering Roles</li>
          <li>Cloud DevOps Positions</li>
        </ul>
        <ul>
          <li>Product Design Openings</li>
          <li>System Internships</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Role Type</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React/Next.js Engineer</td>
              <td>Gurgaon, India / Hybrid</td>
            </tr>
            <tr>
              <td>Cloud Systems Architect</td>
              <td>Gurgaon, India / Onsite</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Career Board Openings & Hiring Statistics",
          "author": { "@type": "Person", "name": "Maysan Labs Talent Acquisition" }
        }) }} />
      </div>
      {children}
    </>
  );
}
