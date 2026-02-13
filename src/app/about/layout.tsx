import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Engineering Philosophy",
  description:
    "At Maysan Labs, we engineer digital systems with industrial precision. Learn about our philosophy on scalable architecture, data sovereignty, and edge distribution.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Maysan Labs — Engineering Philosophy",
    description:
      "Digital systems built with industrial precision, designed for maximum resilience and global operational scale.",
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
