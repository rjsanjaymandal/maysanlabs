import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Project | Contact Maysan Labs - Enterprise Software Development",
  description: "Ready to build your enterprise SaaS solution? Contact Maysan Labs for a free consultation. We specialize in custom software development, cloud infrastructure, and scalable web applications.",
  keywords: ["contact Maysan Labs", "maysanlabs contact", "Maysan Labs consultation", "start project", "get quote", "custom software development", "enterprise SaaS development", "consultation", "project inquiry", "request proposal", "contact software company India"],
  openGraph: {
    title: "Start Your Project | Contact Maysan Labs",
    description: "Ready to build your enterprise SaaS solution? Contact Maysan Labs for a free consultation.",
    url: "https://maysanlabs.com/start",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Contact Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/start",
    languages: {
      en: "https://maysanlabs.com/start",
      ar: "https://maysanlabs.com/ar/start",
    },
  },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
