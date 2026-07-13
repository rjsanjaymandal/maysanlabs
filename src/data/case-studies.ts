export interface TimelineStep {
  title: string;
  description: string;
  duration: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  clientLogo?: string;
  category: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  testimonial?: Testimonial;
  timeline?: TimelineStep[];
  resultsDetail?: string;
  coverImage?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "flash-fashion-ecommerce",
    title: "Full-Stack Ecommerce Platform",
    client: "FlashFashion",
    category: "Ecommerce",
    year: "2024",
    challenge: "Needed a complete ecommerce platform built from scratch with inventory, orders, payments, and customer management.",
    solution: "Built a full-stack ecommerce platform with Next.js frontend, Node.js backend, PostgreSQL database, and Stripe integration.",
    impact: [
      "10,000+ products managed seamlessly.",
      "50,000+ orders processed successfully.",
      "3x revenue growth in first 6 months.",
      "99.9% uptime maintained.",
    ],
    metrics: [
      { label: "Products", value: "10K+" },
      { label: "Orders", value: "50K+" },
      { label: "Revenue Growth", value: "3x" },
      { label: "Uptime", value: "99.9%" },
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS", "TypeScript"],
    testimonial: {
      quote: "Maysan Labs delivered a platform that scaled effortlessly from day one. Our flash sales used to crash the server — now we handle 10x traffic without breaking a sweat.",
      author: "Priya Sharma",
      role: "CTO, FlashFashion",
    },
    timeline: [
      { title: "Discovery & Architecture", description: "Mapped 200+ SKU catalog, designed event-driven inventory system", duration: "2 weeks" },
      { title: "Core Platform Build", description: "Next.js storefront, Node.js API gateway, PostgreSQL with read replicas", duration: "8 weeks" },
      { title: "Payment & Checkout", description: "Stripe integration with UPI, cards, and wallet support", duration: "3 weeks" },
      { title: "Performance Tuning", description: "Edge caching, CDN, auto-scaling groups, load testing", duration: "2 weeks" },
      { title: "Go-Live & Migration", description: "Phased rollout, data migration from legacy system, zero-downtime cutover", duration: "2 weeks" },
    ],
    resultsDetail: "Within 90 days of launch, FlashFashion processed over 50,000 orders with zero downtime during peak traffic. The platform's auto-scaling infrastructure handled a 10x traffic surge during a flash sale without any performance degradation. Revenue grew 3x in the first six months, driven by a 40% improvement in conversion rate from the sub-200ms page loads.",
  },
  {
    slug: "retail-modular-erp",
    title: "Global Retail ERP",
    client: "Acme Retail Global",
    category: "ERP & Operations",
    year: "2024",
    challenge: "Inventory chaos across 400+ stores causing stock issues.",
    solution: "Modular ERP with real-time edge sync for instant inventory updates.",
    impact: [
      "Fixed inventory across 400+ stores.",
      "Automated procurement, 80% fewer errors.",
      "Unified data across all regions.",
    ],
    metrics: [
      { label: "Inventory Accuracy", value: "99.9%" },
      { label: "Speed Increase", value: "40%" },
      { label: "Annual Savings", value: "₹10 Crores" },
    ],
    technologies: ["Next.js", "Rust", "PostgreSQL", "Kafka", "AWS Edge"],
    testimonial: {
      quote: "We went from spreadsheets and phone calls to a unified, real-time view of our entire retail operation. The ROI was evident within the first quarter.",
      author: "Rajesh Mehta",
      role: "COO, Acme Retail Global",
    },
    timeline: [
      { title: "Audit & Requirements", description: "Visited 12 stores, interviewed 50+ staff, identified 200+ pain points", duration: "3 weeks" },
      { title: "Modular Architecture", description: "Designed microservices for inventory, procurement, finance, HR", duration: "6 weeks" },
      { title: "Edge Sync Engine", description: "Built Rust-based edge nodes with offline-first sync protocol", duration: "5 weeks" },
      { title: "Dashboard & Analytics", description: "Real-time OEE dashboards with role-based access", duration: "3 weeks" },
      { title: "Phased Rollout", description: "Deployed to 50 pilot stores, iterated, then full rollout", duration: "4 weeks" },
    ],
    resultsDetail: "The modular ERP system transformed Acme Retail's operations from fragmented, manual processes to a unified real-time operation. Inventory accuracy jumped from 72% to 99.9%, procurement errors dropped by 80%, and the company saved ₹10 Crores annually through automated workflows and reduced waste.",
  },
  {
    slug: "fintech-connectivity-bridge",
    title: "Fintech Connectivity",
    client: "Apex Wealth Management",
    category: "Fintech Infrastructure",
    year: "2023",
    challenge: "Slow connections between banking systems and trading apps.",
    solution: "API-first bridge with sub-35ms response times and zero-trust security.",
    impact: [
      "32ms average response time.",
      "1M+ concurrent connections handled.",
      "Zero security issues in 12 months.",
    ],
    metrics: [
      { label: "Response Time", value: "<35ms" },
      { label: "Uptime", value: "99.999%" },
      { label: "Throughput", value: "10x" },
    ],
    technologies: ["Node.js", "Redis", "Go", "Docker", "Google Cloud"],
    testimonial: {
      quote: "The connectivity bridge eliminated our latency bottleneck entirely. Our traders now execute in milliseconds, and we haven't had a single security incident since deployment.",
      author: "Anika Patel",
      role: "VP of Engineering, Apex Wealth Management",
    },
    timeline: [
      { title: "Protocol Analysis", description: "Mapped existing banking APIs, identified 15+ integration points", duration: "2 weeks" },
      { title: "API Gateway Build", description: "Go-based gateway with connection pooling, circuit breakers, retry logic", duration: "6 weeks" },
      { title: "Zero-Trust Security", description: "End-to-end encryption, certificate pinning, audit logging", duration: "3 weeks" },
      { title: "Load Testing", description: "Simulated 1M+ concurrent connections across global regions", duration: "2 weeks" },
      { title: "Production Deploy", description: "Canary release, monitoring, 30-day burn-in period", duration: "2 weeks" },
    ],
    resultsDetail: "Apex Wealth Management's trading infrastructure was transformed from a latency bottleneck to a competitive advantage. The bridge handles over 1 million concurrent connections with sub-35ms response times, enabling real-time trading across global markets. The zero-trust security architecture has maintained a perfect security record over 12 months of production operation.",
  },
  {
    slug: "custom-manufacturing-intelligence",
    title: "Manufacturing Intelligence",
    client: "TechnoBuilt Industrial",
    category: "Industrial IoT",
    year: "2024",
    challenge: "No visibility into production metrics, unpredictable downtime.",
    solution: "IoT platform with predictive maintenance 48 hours ahead.",
    impact: [
      "65% less unplanned downtime.",
      "Real-time OEE tracking for leadership.",
      "Simple dashboard for all teams.",
    ],
    metrics: [
      { label: "Downtime Cut", value: "65%" },
      { label: "ROI Timeline", value: "4 Months" },
      { label: "Efficiency Gain", value: "22%" },
    ],
    technologies: ["TypeScript", "Python", "MQTT", "MongoDB", "Azure"],
    testimonial: {
      quote: "For the first time, we have complete visibility into our production floor. The predictive maintenance alone has saved us millions in avoided downtime.",
      author: "Vikram Singh",
      role: "Director of Manufacturing, TechnoBuilt Industrial",
    },
    timeline: [
      { title: "Sensor Audit", description: "Assessed 500+ machines, identified data sources and integration points", duration: "3 weeks" },
      { title: "IoT Pipeline", description: "MQTT broker cluster, real-time stream processing with Python", duration: "5 weeks" },
      { title: "ML Models", description: "Trained predictive maintenance models on 2 years of historical data", duration: "4 weeks" },
      { title: "OEE Dashboards", description: "Real-time dashboards for plant managers, supervisors, and operators", duration: "3 weeks" },
      { title: "Full Deployment", description: "Rolled out across 3 plants, integrated with existing MES and SCADA", duration: "3 weeks" },
    ],
    resultsDetail: "TechnoBuilt Industrial gained complete visibility into its manufacturing operations. The predictive maintenance models now provide 48-hour advance warning of equipment failures, reducing unplanned downtime by 65%. Overall Equipment Effectiveness (OEE) improved by 22%, and the system paid for itself within 4 months through avoided downtime and increased production throughput.",
  },
];

export const categories = Array.from(new Set(caseStudies.map((s) => s.category)));
export const allTechnologies = Array.from(new Set(caseStudies.flatMap((s) => s.technologies)));

export const aggregateStats = {
  totalProjects: caseStudies.length,
  totalClients: new Set(caseStudies.map((s) => s.client)).size,
  uptime: "99.9%",
  avgResponseTime: "<35ms",
};
