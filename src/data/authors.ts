export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export const authors: Author[] = [
  {
    slug: "sanjay-mandal",
    name: "Sanjay Mandal",
    role: "Technical Director",
    bio: "Sanjay leads engineering at Maysan Labs, specializing in cloud infrastructure, DevOps, and scalable system architecture. He has 15+ years of experience building enterprise software for startups and Fortune 500 companies alike.",
    linkedin: "https://in.linkedin.com/company/maysanlabs",
    twitter: "https://x.com/maysanlabs",
  },
  {
    slug: "maysan-engineering-team",
    name: "Maysan Engineering Team",
    role: "Engineering",
    bio: "The Maysan Labs engineering team brings together experts in full-stack development, AI/ML, cloud architecture, and enterprise security. Together they ship production-grade software for global clients.",
  },
  {
    slug: "maysan-architecture",
    name: "Maysan Architecture",
    role: "Architecture Team",
    bio: "The architecture team at Maysan Labs designs scalable, resilient systems for enterprise clients. Their expertise spans microservices, event-driven architecture, cloud-native design, and system optimization.",
  },
  {
    slug: "maysan-insights",
    name: "Maysan Insights",
    role: "Strategy & Research",
    bio: "The Maysan Insights team researches technology trends, market shifts, and business strategy to help clients make informed decisions about their software investments.",
  },
  {
    slug: "design-team",
    name: "Design Team",
    role: "UX & Product Design",
    bio: "The Maysan Labs design team creates intuitive, accessible, and beautiful interfaces for enterprise applications. They believe powerful software should also be a pleasure to use.",
  },
  {
    slug: "infrastructure-team",
    name: "Infrastructure Team",
    role: "Cloud & DevOps",
    bio: "The infrastructure team manages cloud deployments, CI/CD pipelines, and system reliability for Maysan Labs clients. They ensure every application is performant, secure, and highly available.",
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    role: "Data & Analytics",
    bio: "The data engineering team builds real-time data pipelines, analytics platforms, and ML infrastructure that turns raw data into actionable business intelligence.",
  },
  {
    slug: "security-operations",
    name: "Security Operations",
    role: "Security",
    bio: "The security operations team ensures every system built at Maysan Labs follows zero-trust principles, secure-by-design patterns, and industry compliance standards.",
  },
  {
    slug: "ai-implementation-team",
    name: "AI Implementation Team",
    role: "AI & ML Engineering",
    bio: "The AI implementation team helps businesses integrate machine learning and AI capabilities into production systems, focusing on measurable business outcomes rather than experimental demos.",
  },
  {
    slug: "growth-strategy",
    name: "Growth Strategy",
    role: "Business Strategy",
    bio: "The growth strategy team combines business acumen with technical knowledge to help clients make build-vs-buy decisions, plan digital transformations, and maximize ROI on software investments.",
  },
  {
    slug: "tech-consulting",
    name: "Tech Consulting",
    role: "Technology Consulting",
    bio: "The technology consulting team guides businesses through digital transformation, technology selection, and implementation planning with a focus on practical, results-oriented strategies.",
  },
  {
    slug: "maysan-strategic-team",
    name: "Maysan Strategic Team",
    role: "Strategic Consulting",
    bio: "The Maysan Strategic Team partners with leadership to align technology investments with business goals, helping enterprises navigate digital transformation with confidence.",
  },
];

export function getAuthorData(authorName: string): Author | undefined {
  const slug = authorName.toLowerCase().replace(/\s+/g, "-");
  return authors.find(a => a.slug === slug);
}
