const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Maysan Labs",
  image: `${SITE_URL}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 44",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.4647",
    longitude: "77.0300"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  priceRange: "$$$",
  telephone: "+919660641530",
  email: "business@maysanlabs.com",
  url: SITE_URL,
  areaServed: {
    "@type": "Place",
    name: "Worldwide"
  },
  serviceType: ["SaaS Development", "Custom Software Development", "Web Development"]
};

export const productSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Maysan Shop",
    description: "Full-stack ecommerce solution with inventory, orders, payments, and customer management. Built for scale.",
    brand: {
      "@type": "Brand",
      name: "Maysan Labs"
    },
    provider: {
      "@type": "Organization",
      name: "Maysan Labs",
      url: SITE_URL
    },
    url: `${SITE_URL}/products`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "5000",
      availability: "https://schema.org/InStock"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Edu-Maysan",
    description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    brand: {
      "@type": "Brand",
      name: "Maysan Labs"
    },
    provider: {
      "@type": "Organization",
      name: "Maysan Labs",
      url: SITE_URL
    },
    url: `${SITE_URL}/products/edu-maysan`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "8000",
      availability: "https://schema.org/InStock"
    }
  }
];

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: {
    "@type": "Organization",
    name: "Maysan Labs"
  },
  ratingValue: "4.9",
  reviewCount: "50",
  bestRating: "5",
  worstRating: "1"
};

export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Maysan Shop",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  provider: {
    "@type": "Organization",
    name: "Maysan Labs",
    url: SITE_URL
  },
  offers: {
    "@type": "Offer",
    price: "5000",
    priceCurrency: "USD"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "25"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Maysan Labs",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications using MERN stack, React, and Node.js.",
  "foundingDate": "2020",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 50
  },
  "areaServed": "Worldwide",
  "serviceType": ["SaaS Development", "Custom Software Development", "Cloud Infrastructure", "Web Application Development"],
  "priceRange": "$$$",
  "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "+919660641530",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": process.env.NEXT_PUBLIC_CONTACT_EMAIL || "business@maysanlabs.com",
    "contactType": "sales",
    "availableLanguage": ["English", "Arabic", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": process.env.NEXT_PUBLIC_ADDRESS_LOCALITY || "Gurgaon",
    "addressRegion": process.env.NEXT_PUBLIC_ADDRESS_REGION || "Haryana",
    "postalCode": process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE || "122001",
    "addressCountry": process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "IN"
  },
  "sameAs": [
    "https://www.facebook.com/maysanlabs",
    "https://www.instagram.com/maysanlabs",
    "https://in.linkedin.com/company/maysanlabs",
    "https://x.com/maysanlabs"
  ],
  "potentialAction": {
    "@type": "ContactAction",
    "name": "Contact Maysan Labs",
    "target": `${SITE_URL}/init`
  }
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
  { name: "Services", url: `${SITE_URL}/services` },
  { name: "Architecture", url: `${SITE_URL}/architecture` },
  { name: "Insights", url: `${SITE_URL}/insights` },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: "Case Studies", url: `${SITE_URL}/case-studies` },
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
