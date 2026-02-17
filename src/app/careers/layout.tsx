import { Metadata } from "next";
import { jobPositions } from "@/lib/careers-data";

export const metadata: Metadata = {
  title: "Careers | Join the Future of SaaS",
  description:
    "Join Maysan Labs and help us build high-performance enterprise SaaS infrastructure. Explore open roles in engineering, design, and marketing.",
  keywords: [
    "SaaS Careers",
    "Software Engineering Jobs",
    "Product Design Jobs",
    "Remote Engineering Jobs",
    "Maysan Labs Careers",
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
      {children}
    </>
  );
}
