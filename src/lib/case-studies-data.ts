export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
}

export const caseStudies: CaseStudy[] = [
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
      { label: "Annual Savings", value: "$1.2M" },
    ],
    technologies: ["Next.js", "Rust", "PostgreSQL", "Kafka", "AWS Edge"],
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
  },
];