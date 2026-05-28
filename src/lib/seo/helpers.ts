import { 
  organizationSchema, 
  websiteSchema, 
  getNavigationSchema,
  localBusinessSchema
} from "./schema";
import type { Metadata } from "next";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

interface CaseStudy {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  client: string;
  industry: string;
  results: string[];
  technologies: string[];
}

interface ProductInfo {
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
}

/**
 * Generate SEO metadata for blog posts
 */
export function generateBlogPostSEO(post: BlogPost, siteUrl: string): Metadata {
  return {
    title: `${post.title} | Maysan Labs Blog`,
    description: post.excerpt,
    keywords: [
      post.title.toLowerCase(),
      post.category.toLowerCase(),
      "Maysan Labs",
      "blog",
      "technology",
      "SaaS",
      "enterprise"
    ].filter(Boolean),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/og-image.png`]
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`
    }
  };
}

/**
 * Generate JSON-LD for blog post
 */
export function generateBlogPostJSONLD(post: BlogPost, siteUrl: string) {
  const personName = post.author;
  const personUrl = `${siteUrl}/authors/${post.author.toLowerCase().replace(/\s+/g, "-")}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [
      `${siteUrl}/og-image.png`
    ],
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: personName,
      url: personUrl,
      sameAs: [
        "https://github.com/maysanlabs",
        "https://in.linkedin.com/company/maysanlabs"
      ],
      knowsAbout: [post.category, "Enterprise SaaS", "Software Development"]
    },
    publisher: {
      "@type": "Organization",
      name: "Maysan Labs",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`
      }
    },
    url: `${siteUrl}/blog/${post.slug}`,
    section: post.category,
    keywords: [
      post.title,
      post.category,
      "Maysan Labs",
      "blog",
      "enterprise software",
      "SaaS"
    ].filter(Boolean),
    mainEntityOfPage: {
      "@type": "WebPage",
      id: `${siteUrl}/blog/${post.slug}`
    },
    about: {
      "@type": "Thing",
      name: post.category
    },
    mentions: [
      { "@type": "Thing", name: "Enterprise SaaS" },
      { "@type": "Thing", name: "Software Development" }
    ]
  };
}

/**
 * Generate SEO metadata for case studies
 */
export function generateCaseStudySEO(study: CaseStudy, siteUrl: string): Metadata {
  return {
    title: `${study.title} | Maysan Labs Case Studies`,
    description: study.excerpt,
    keywords: [
      study.title.toLowerCase(),
      study.industry.toLowerCase(),
      "case study",
      "Maysan Labs",
      study.client.toLowerCase()
    ].filter(Boolean),
    openGraph: {
      title: study.title,
      description: study.excerpt,
      url: `${siteUrl}/case-studies/${study.slug}`,
      type: "article",
      publishedTime: typeof study.date === 'string' ? study.date : undefined,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: study.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.excerpt,
      images: [`/og-image.png`]
    },
    alternates: {
      canonical: `${siteUrl}/case-studies/${study.slug}`
    }
  };
}

/**
 * Generate JSON-LD for case study
 */
export function generateCaseStudyJSONLD(study: CaseStudy, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: study.title,
    description: study.excerpt,
    url: `${siteUrl}/case-studies/${study.slug}`,
    datePublished: study.date,
    author: {
      "@type": "Organization",
      name: "Maysan Labs"
    },
    about: {
      "@type": "Thing",
      name: study.industry
    },
    participant: [
      {
        "@type": "Organization",
        name: study.client
      }
    ],
    result: study.results.map(result => ({
      "@type": "QuantitativeValue",
      value: result
    })),
    keywords: [
      study.title,
      study.industry,
      study.client,
      "case study",
      "Maysan Labs"
    ].filter(Boolean)
  };
}

/**
 * Generate SEO metadata for product pages
 */
export function generateProductSEO(product: ProductInfo, _siteUrl: string): Metadata {
  return {
    title: `${product.name} | Maysan Labs Products`,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      "product",
      "SaaS",
      "software",
      "Maysan Labs"
    ].filter(Boolean),
    openGraph: {
      title: product.name,
      description: product.description,
      url: product.url,
      type: "website",
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [`/og-image.png`]
    },
    alternates: {
      canonical: product.url
    }
  };
}

/**
 * Generate base SEO metadata for site-wide usage
 */
export function generateBaseSEO(siteUrl: string): Metadata {
  return {
    title: "Maysan Labs | Enterprise SaaS Development Company",
    description: "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications.",
    keywords: [
      "SaaS development company",
      "custom software development company",
      "enterprise SaaS development",
      "cloud infrastructure services",
      "custom web application development",
      "MERN stack developers",
      "React development company",
      "Node.js backend development"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Maysan Labs",
      title: "Maysan Labs | Enterprise SaaS Development Company",
      description: "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Maysan Labs - Enterprise SaaS Development Company"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Maysan Labs | Enterprise SaaS Development Company",
      description: "Maysan Labs - Enterprise SaaS development company offering custom software, cloud infrastructure, and scalable web applications.",
      images: ["/og-image.png"],
      creator: "@maysanlabs",
      site: "@maysanlabs"
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        en: `${siteUrl}`,
      }
    }
  };
}

export interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  siteUrl?: string;
}

/**
 * Automatically generate pristine, fully optimized SEO Metadata for any page
 */
export function generatePageSEO({
  title,
  description,
  path,
  keywords = [],
  image = "/og-image.png",
  siteUrl = "https://maysanlabs.com"
}: PageSEOProps): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = cleanPath === "/" ? siteUrl : `${siteUrl}${cleanPath}`;
  
  const baseKeywords = [
    "maysanlabs",
    "Maysan Labs",
    "Maysan Labs Gurgaon",
    "Maysan Labs India",
    "Maysan Labs Sector 44",
    "Maysan Labs Gurugram",
    "Maysan Labs NCR",
    "Maysan Labs careers",
    "Maysan Labs contact",
    "Maysan Labs reviews",
    "Maysan Labs portfolio",
    "Maysan Labs case studies",
    "Maysan Labs products",
    "Maysan Labs services",
    "Maysan Labs blog",
    "Maysan Labs team",
    "Maysan Labs founders",
    "Maysan Labs location",
    "Maysan Labs address",
    "Maysan Software",
    "Maysan Technologies",
    "Maysan Tech",
    "Maysan IT Solutions",
    "SaaS development company India",
    "SaaS development company Gurgaon",
    "enterprise SaaS development company",
    "custom software development company India",
    "custom web application development",
    "software development company Gurgaon",
    "software development company India",
    "MERN stack developers India",
    "React development company India",
    "Node.js backend development India",
    "full stack development services India",
    "cloud infrastructure services India",
    "enterprise software consulting India",
    "cloud-native application development",
    "web development company Gurgaon",
    "web development company India",
    "React Native development company",
    "Next JS development company",
    "TypeScript development services",
    "API development services India",
    "microservices development company",
    "DevOps consulting services India",
    "AWS cloud services India",
    "Azure cloud solutions India",
    "enterprise mobile app development",
    "software product development company",
    "MVP development company India",
    "startup software development India",
    "enterprise digital transformation India",
    "SaaS product development company",
    "ERP software development company",
    "CRM development company India",
    "eCommerce development company India",
    "EdTech software development",
    "FinTech software development",
    "HealthTech software development",
    "AI integration services India",
    "machine learning development company",
    "blockchain development services India",
    "agile software development India",
    "offshore software development India",
    "hire React developers India",
    "hire Node.js developers India",
    "hire full stack developers India",
    "hire MERN stack developers",
    "hire Next.js developers India",
  ];
  
  const combinedKeywords = Array.from(new Set([...keywords, ...baseKeywords]));

  return {
    metadataBase: new URL(siteUrl),
    title: title,
    description,
    keywords: combinedKeywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      siteName: "Maysan Labs",
      title: title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [image],
      creator: "@maysanlabs",
      site: "@maysanlabs"
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: fullUrl,
      }
    },
    icons: {
      icon: [
        { url: "/favicon.png?v=100" },
        { url: "/icon-192x192-v4.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512-v4.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.png?v=100",
      apple: [
        { url: "/icon-rounded-v2.png?v=100" },
        { url: "/icon-192x192-v4.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512-v4.png", sizes: "512x512", type: "image/png" },
      ],
    },
    manifest: "/manifest.json?v=100"
  };
}


/**
 * Generate all JSON-LD scripts for a page
 */
export function generateJSONLDScripts(
  baseData: {
    organization: typeof organizationSchema;
    website: typeof websiteSchema;
    navigation: ReturnType<typeof getNavigationSchema>;
    localBusiness: typeof localBusinessSchema;
  },
  additionalData?: Record<string, unknown>
): { type: string; content: object }[] {
  const scripts: { type: string; content: object }[] = [
    {
      type: "application/ld+json",
      content: baseData.organization
    },
    {
      type: "application/ld+json",
      content: baseData.website
    },
    {
      type: "application/ld+json",
      content: baseData.navigation
    },
    {
      type: "application/ld+json",
      content: baseData.localBusiness
    }
  ];

  // Add additional schemas if provided
  if (additionalData) {
    Object.entries(additionalData).forEach(([_key, value]) => {
      if (value && typeof value === 'object') {
        scripts.push({
          type: "application/ld+json",
          content: value as object
        });
      }
    });
  }

  return scripts;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate HowTo schema for services/process pages
 */
export interface HowToStep {
  name: string;
  text: string;
}

/**
 * Generate JobPosting schema for careers page
 */
export interface JobDetails {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  location: string;
}

export function generateJobPostingSchema(job: JobDetails, siteUrl: string = "https://maysanlabs.com") {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    "validThrough": job.validThrough,
    "employmentType": job.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Maysan Labs",
      "sameAs": siteUrl
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gurgaon",
        "addressRegion": "Haryana",
        "addressCountry": "IN"
      }
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[], siteUrl: string = "https://maysanlabs.com") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  };
}

/**
 * Generate Brand schema for Google rich results
 */
export function generateBrandSchema(siteUrl: string = "https://maysanlabs.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Maysan Labs",
    "alternateName": "Maysan",
    "description": "Maysan Labs is a leading enterprise SaaS development company in Gurgaon, India, specializing in custom software, web applications, and cloud solutions.",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/maysanlabs",
      "https://www.instagram.com/maysanlabs",
      "https://in.linkedin.com/company/maysanlabs",
      "https://x.com/maysanlabs"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Gurgaon, Haryana, India"
    },
    "serviceType": [
      "SaaS Development",
      "Custom Software Development",
      "Web Application Development",
      "Cloud Infrastructure",
      "Mobile App Development"
    ]
  };
}

/**
 * Generate local SEO with proper NAP (Name, Address, Phone)
 */
export function generateLocalSeoSchema(siteUrl: string = "https://maysanlabs.com") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareDevelopment",
    "name": "Maysan Labs",
    "description": "Maysan Labs - Expert software development company in Gurgaon, India. Building scalable web applications, SaaS products, and enterprise solutions.",
    "url": siteUrl,
    "telephone": "+919660641530",
    "email": "business@maysanlabs.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 44",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.4647",
      "longitude": "77.0300"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": [
      "Software Development",
      "Web Development",
      "SaaS Development",
      "Cloud Solutions"
    ]
  };
}