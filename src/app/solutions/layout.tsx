import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deployment Solutions",
  description:
    "Scalable digital infrastructure engineered for modern SaaS enterprises. Explore our core infrastructure, data operations, and AI integration services.",
  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsLayout({
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
              name: "Enterprise Solutions",
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
