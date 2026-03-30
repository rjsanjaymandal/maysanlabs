const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  additionalType: "https://schema.org/SoftwareApplication",
  name: "Maysan Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Architecting high-performance enterprise SaaS infrastructure and autonomous operational tools for modern enterprises.",
  priceRange: "$$$",
  telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-XXXXXXXXXX",
  contactPoint: {
    "@type": "ContactPoint",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "business@maysanlabs.com",
    contactType: "sales",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: process.env.NEXT_PUBLIC_ADDRESS_LOCALITY || "Gurgaon",
    addressRegion: process.env.NEXT_PUBLIC_ADDRESS_REGION || "Haryana",
    postalCode: process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE || "122001",
    addressCountry: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "IN",
  },
  areaServed: "Global",
  sameAs: [
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/maysanlabs",
    process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/maysanlabs",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maysan Labs",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const navigationSchema = [
  { name: "Home", url: SITE_URL },
  { name: "Solutions", url: `${SITE_URL}/solutions` },
  { name: "Architecture", url: `${SITE_URL}/architecture` },
  { name: "Intelligence Stream", url: `${SITE_URL}/blog` },
  { name: "Careers", url: `${SITE_URL}/careers` },
  { name: "About", url: `${SITE_URL}/about` },
];

export function getNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Main Navigation",
    itemListElement: navigationSchema.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
