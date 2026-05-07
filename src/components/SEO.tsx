import { 
  organizationSchema, 
  websiteSchema, 
  getNavigationSchema,
  localBusinessSchema
} from "@/lib/seo/schema";
import {
  generateBlogPostSEO,
  generateBlogPostJSONLD,
  generateCaseStudySEO,
  generateCaseStudyJSONLD,
  generateProductSEO,
  generateBaseSEO,
  generateJSONLDScripts
} from "@/lib/seo/helpers";
import type { Metadata } from "next";

interface SEOProps {
  type: "page" | "blog" | "case-study" | "product";
  data?: any;
  overrideTitle?: string;
  overrideDescription?: string;
}

/**
 * SEO component that automatically generates appropriate meta tags and JSON-LD
 * based on the page type and data provided
 */
export default function SEO({
  type = "page",
  data,
  overrideTitle,
  overrideDescription
}: SEOProps) {
  // This component doesn't render anything visible
  // It's used for its side effects in generateMetadata in page components
  return null;
}

/**
 * Helper function to generate metadata for different page types
 * This should be used in page.tsx files' generateMetadata function
 */
export function generateSEOMetadata({
  type = "page",
  data,
  overrideTitle,
  overrideDescription
}: SEOProps): Metadata {
  const baseSEO = generateBaseSEO(process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
  
  let metadata: Metadata = { ...baseSEO };
  
  // Override title and description if provided
  if (overrideTitle) {
    metadata.title = overrideTitle;
  }
  
  if (overrideDescription) {
    metadata.description = overrideDescription;
  }
  
  // Generate type-specific metadata
  switch (type) {
    case "blog":
      if (data) {
        const blogSEO = generateBlogPostSEO(data, process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
        metadata = { ...metadata, ...blogSEO };
      }
      break;
      
    case "case-study":
      if (data) {
        const caseStudySEO = generateCaseStudySEO(data, process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
        metadata = { ...metadata, ...caseStudySEO };
      }
      break;
      
    case "product":
      if (data) {
        const productSEO = generateProductSEO(data, process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
        metadata = { ...metadata, ...productSEO };
      }
      break;
      
    default:
      // Regular page - use base SEO
      break;
  }
  
  return metadata;
}

/**
 * Helper function to generate JSON-LD scripts for different page types
 * This should be used in page.tsx files' head section
 */
export function generateSEOJSONLD({
  type = "page",
  data
}: SEOProps) {
  const baseData = {
    organization: organizationSchema,
    website: websiteSchema,
    navigation: getNavigationSchema(),
    localBusiness: localBusinessSchema
  };
  
  let additionalData: Record<string, any> = {};
  
  // Add type-specific schemas
  switch (type) {
    case "blog":
      if (data) {
        additionalData.blogPost = generateBlogPostJSONLD(data, process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
      }
      break;
      
    case "case-study":
      if (data) {
        additionalData.caseStudy = generateCaseStudyJSONLD(data, process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com");
      }
      break;
      
    case "product":
      if (data) {
        // For products, we might want to use the product schema from schema.ts
        // or create a more specific one
        // For now, we'll skip adding additional data since product schema is already handled elsewhere
      }
      break;
      
    default:
      // Regular page - no additional data
      break;
  }
  
  return generateJSONLDScripts(baseData, additionalData);
}