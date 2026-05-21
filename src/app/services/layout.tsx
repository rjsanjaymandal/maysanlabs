import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Development Services | Custom Software | Maysan Labs",
  description:
    "Maysan Labs offers enterprise SaaS development services - custom software, web development, cloud infrastructure, and AI integration for modern businesses. Contact Maysan Labs for scalable solutions.",
  keywords: ["Maysan Labs services", "maysanlabs development", "SaaS development services", "custom software development", "web development company", "cloud infrastructure", "enterprise software development"],
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
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
            "@type": "Service",
            serviceType: "SaaS Infrastructure Development",
            provider: {
              "@type": "Organization",
              name: "Maysan Labs",
            },
            description:
              "High-performance MERN stack architecture and autonomous operational layers for modern enterprises.",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Enterprise Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Core Infrastructure",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Integration",
                  },
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
