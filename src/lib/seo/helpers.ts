import { 
  organizationSchema, 
  websiteSchema, 
  getNavigationSchema,
  localBusinessSchema,
  reviewSchema,
  softwareAppSchema,
  breadcrumbSchema
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
    author: {
      "@type": "Person",
      name: post.author
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
      "blog"
    ].filter(Boolean),
    mainEntityOfPage: {
      "@type": "WebPage",
      id: `${siteUrl}/blog/${post.slug}`
    }
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
      type: "website",
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
export function generateProductSEO(product: ProductInfo, siteUrl: string): Metadata {
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
      type: "product",
      product: {
        price: product.price,
        priceCurrency: product.currency,
        availability: "http://schema.org/InStock"
      },
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
        ar: `${siteUrl}/ar`
      }
    }
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
  additionalData?: Record<string, any>
) {
  const scripts = [
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
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value) {
        scripts.push({
          type: "application/ld+json",
          content: value
        });
      }
    });
  }

  return scripts;
}

export default {
  generateBlogPostSEO,
  generateBlogPostJSONLD,
  generateCaseStudySEO,
  generateCaseStudyJSONLD,
  generateProductSEO,
  generateBaseSEO,
  generateJSONLDScripts
};