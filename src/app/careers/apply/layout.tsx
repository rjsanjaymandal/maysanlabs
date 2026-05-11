import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now | Join Maysan Labs - Enterprise Software Development",
  description: "Apply to join Maysan Labs - a leading enterprise SaaS development company. We're looking for talented engineers, developers, and designers to build next-generation software solutions.",
  keywords: ["apply for job", "job application", "software engineer careers", "Maysan Labs application", "join our team", "hiring", "job openings", "career opportunities", "tech jobs"],
  openGraph: {
    title: "Apply Now | Join Maysan Labs",
    description: "Apply to join Maysan Labs - a leading enterprise SaaS development company.",
    url: "https://maysanlabs.com/careers/apply",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Apply to Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/careers/apply",
    languages: {
      en: "https://maysanlabs.com/careers/apply",
    },
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}