import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Architecture",
  description:
    "Explore the industrial engineering behind Maysan Labs modular SaaS ecosystems. Built for scale, security, and low-latency global operations.",
  alternates: {
    canonical: "/architecture",
  },
  openGraph: {
    title: "System Architecture — Maysan Labs",
    description:
      "Visualizing the Neo-Monolith: modular SaaS ecosystems built for scale and security.",
    url: "/architecture",
  },
};

export default function ArchitectureLayout({
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
            "@type": "TechArticle",
            headline: "System Architecture — Maysan Labs",
            description:
              "Industrial engineering behind modular SaaS ecosystems. Global edge network, security layer, compute engine, and data persistence.",
            author: {
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
