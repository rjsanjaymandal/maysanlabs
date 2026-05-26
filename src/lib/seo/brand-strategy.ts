// Brand-focused SEO keywords and strategy for "Maysan Labs"
export const brandKeywords = [
  // Primary brand keywords
  "Maysan Labs",
  "maysanlabs",
  "Maysan",
  
  // Brand + service combinations
  "Maysan Labs software development",
  "Maysan Labs web development",
  "Maysan Labs SaaS development",
  "Maysan Labs React developers",
  "Maysan Labs Node.js developers",
  "Maysan Labs MERN stack",
  "Maysan Labs enterprise solutions",
  
  // Geographic brand keywords
  "Maysan Labs Gurgaon",
  "Maysan Labs India",
  "Maysan Labs Delhi NCR",
  "software company Gurgaon",
  "SaaS company Gurgaon",
  
  // Industry-specific
  "EdTech software company",
  "Ecommerce development company",
  "Fintech software development",
  "Healthcare software company",
  "Enterprise SaaS India",
  
  // Services
  "custom software development India",
  "web application development Gurgaon",
  "cloud infrastructure services",
  "API development services",
  "enterprise software consulting"
];

// GEO-optimized natural language queries — how AI search engines phrase lookups
export const geoQueries = [
  "best software development company in Gurgaon India",
  "top rated SaaS development company near me",
  "enterprise software development agency India",
  "custom web application developers for startups",
  "affordable software development company Gurgaon",
  "React Node.js development company reviews",
  "how much does it cost to build a SaaS platform",
  "software development company with 4.9 rating",
  "best MERN stack development company India",
  "enterprise cloud infrastructure services provider",
  "Gurgaon based software development team",
  "software company with AI expertise India",
  "full stack development company for EdTech",
  "ecommerce platform development services pricing",
  "software product development lifecycle cost"
];

export const brandSearchKeywords = [...brandKeywords, ...geoQueries].map(k => k.toLowerCase());

// Generate title with brand emphasis
export function generateBrandTitle(pageTitle: string): string {
  return pageTitle 
    ? `${pageTitle} | Maysan Labs - Expert Developers in Gurgaon, India`
    : "Maysan Labs | Enterprise SaaS Development Company | Gurgaon, India";
}

// Generate description with brand keywords
export function generateBrandDescription(description: string): string {
  const brandPhrase = "Maysan Labs is a leading";
  if (description.includes(brandPhrase)) {
    return description;
  }
  return `Maysan Labs - ${description} Trusted by enterprises for custom software, web apps, and cloud solutions. Expert developers in Gurgaon, India.`;
}