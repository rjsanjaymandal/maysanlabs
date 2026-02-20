import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Insights",
  description:
    "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Access our technical logs and research.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsLayout({
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
            "@type": "CollectionPage",
            name: "Technical Insights — Maysan Labs Intelligence Stream",
            description:
              "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms.",
            url: "https://maysanlabs.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Maysan Labs",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
