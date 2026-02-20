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
    title: "Global Retail Modular ERP Transformation",
    client: "Acme Retail Global",
    category: "ERP & Operations",
    year: "2024",
    challenge: "A multi-billion dollar retail chain struggled with fragmented inventory management across 400+ locations, leading to 15% stock leakage and operational delays.",
    solution: "We engineered a modular 'Neo-Monolith' ERP system with a real-time edge synchronization layer. The system utilized a distributed compute architecture to ensure zero-latency inventory tracking even in low-connectivity zones.",
    impact: [
      "Eliminated inventory desync across 400+ stores.",
      "Automated procurement cycles reducing human error by 80%.",
      "Unified the multi-region data sovereignty requirements under a single security protocol.",
    ],
    metrics: [
      { label: "Inventory Accuracy", value: "99.9%" },
      { label: "Operational Speedup", value: "40%" },
      { label: "Cost Reduction", value: "$1.2M/yr" },
    ],
    technologies: ["Next.js", "Rust", "PostgreSQL", "Kafka", "AWS Edge"],
  },
  {
    slug: "fintech-connectivity-bridge",
    title: "Ultra-Low Latency Fintech Connectivity Bridge",
    client: "Apex Wealth Management",
    category: "Fintech Infrastructure",
    year: "2023",
    challenge: "Apex required a secure, high-throughput bridge between their legacy banking cores and modern mobile trading applications, with a strict <50ms response time requirement.",
    solution: "Maysan Labs built a custom API-first connectivity layer with 'Hot-Path' optimization. We implemented a Zero-Trust security layer that performed biometric and device-level validation without adding measurable latency.",
    impact: [
      "Achieved average response times of 32ms.",
      "Scaled to handle 1M+ concurrent socket connections.",
      "Zero security breaches in 12 months of operations.",
    ],
    metrics: [
      { label: "Response Time", value: "<35ms" },
      { label: "Uptime", value: "99.999%" },
      { label: "Throughput Increase", value: "10x" },
    ],
    technologies: ["Node.js", "Redis", "Go", "Docker", "Google Cloud"],
  },
  {
    slug: "custom-manufacturing-intelligence",
    title: "SME Manufacturing Intelligence & Automation",
    client: "TechnoBuilt Industrial",
    category: "Industrial IoT",
    year: "2024",
    challenge: "TechnoBuilt had zero visibility into real-time production metrics, leading to unpredictable downtime and high maintenance overhead.",
    solution: "We deployed an autonomous operational layer that integrated with existing shop-floor hardware. The system used predictive models to anticipate maintenance needs 48 hours in advance.",
    impact: [
      "Reduced unplanned downtime by 65%.",
      "Enabled real-time OEE (Overall Equipment Effectiveness) tracking for the CEO.",
      "Simplified resource allocation through an intuitive dashboard.",
    ],
    metrics: [
      { label: "Downtime Reduction", value: "65%" },
      { label: "ROI Achieved", value: "4 Months" },
      { label: "Efficiency Boost", value: "22%" },
    ],
    technologies: ["TypeScript", "Python", "MQTT", "MongoDB", "Azure"],
  },
];
