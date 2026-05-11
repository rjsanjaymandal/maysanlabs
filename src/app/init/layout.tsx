import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Project | Contact Maysan Labs - Enterprise Software Development",
  description: "Ready to build your enterprise SaaS solution? Contact Maysan Labs for a free consultation. We specialize in custom software development, cloud infrastructure, and scalable web applications.",
  keywords: ["contact Maysan Labs", "start project", "get quote", "custom software development", "enterprise SaaS development", "consultation", "project inquiry", "request proposal", "contact software company"],
  openGraph: {
    title: "Start Your Project | Contact Maysan Labs",
    description: "Ready to build your enterprise SaaS solution? Contact Maysan Labs for a free consultation.",
    url: "https://maysanlabs.com/init",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Maysan Labs" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/init",
    languages: {
      en: "https://maysanlabs.com/init",
      ar: "https://maysanlabs.com/ar/init",
    },
  },
};

export default function InitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
