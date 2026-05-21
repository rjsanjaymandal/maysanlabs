import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Maysan Labs | Enterprise SaaS Development Company | Gurgaon, India",
  description:
    "Learn about Maysan Labs - a leading enterprise SaaS development company in Gurgaon, India. Our team builds scalable web applications, cloud infrastructure, and custom software for global enterprises. Contact Maysan Labs.",
  keywords: ["about Maysan Labs", "maysanlabs about", "Maysan Labs team", "Maysan Labs Gurgaon", "enterprise software company", "SaaS development company", "custom software development", "Maysan Labs founders"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Maysan Labs — Enterprise SaaS Development Company",
    description:
      "Learn about Maysan Labs - enterprise SaaS development company in Gurgaon, India building scalable software solutions for global enterprises.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Maysan Labs",
            description:
              "Engineering philosophy focused on precision stacks, data sovereignty, and edge distribution.",
            mainEntity: {
              "@type": "Organization",
              name: "Maysan Labs",
              url: "https://maysanlabs.com",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
