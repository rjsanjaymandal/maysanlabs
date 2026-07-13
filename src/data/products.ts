export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  benefits: string[];
  icon: string;
  href: string;
  cta: string;
  live: boolean;
}

export const products: Product[] = [
  {
    id: "maysan-shop",
    name: "Maysan Shop",
    tagline: "Full-stack ecommerce, built for scale",
    description: "Custom ecommerce platform with inventory management, order processing, UPI payments, and customer analytics. Headless architecture for maximum flexibility.",
    category: "E-Commerce",
    features: ["Multi-vendor marketplace", "UPI & Razorpay integration", "Real-time inventory sync", "Customer analytics dashboard"],
    benefits: ["₹1.5Cr+ first-month sales for Flash Fashion", "50,000+ SKUs handled daily"],
    icon: "ShoppingCart",
    href: "/products/flash-fashion",
    cta: "See Flash Fashion case study",
    live: true,
  },
  {
    id: "edu-maysan",
    name: "Edu-Maysan",
    tagline: "Intelligence platform for education",
    description: "AI-powered learning management, attendance tracking, parent communication, and performance analytics for schools and coaching institutes.",
    category: "EdTech",
    features: ["AI-driven assessments", "Parent-teacher communication", "Attendance automation", "Performance dashboards"],
    benefits: ["Used by 15+ institutions", "Real-time progress tracking"],
    icon: "GraduationCap",
    href: "/products/edu-maysan",
    cta: "Explore Edu-Maysan",
    live: true,
  },
  {
    id: "maysanmails",
    name: "MaysanMails",
    tagline: "Scale email marketing infinitely without monthly subscription fees",
    description: "Self-hosted bulk email infrastructure with high-deliverability SMTP routing, campaign automation, and complete data privacy. Pay once, own forever — no per-subscriber fees, no recurring SaaS costs.",
    category: "Marketing Infrastructure",
    features: [
      "Zero recurring subscriber fees",
      "High-deliverability SMTP routing",
      "Advanced campaign automation",
      "Complete data privacy & control",
      "Custom sender reputation management",
      "Real-time delivery analytics",
    ],
    benefits: [
      "Save ₹50,000+ per year vs Mailchimp/ConvertKit",
      "No sending limits or subscriber caps",
      "Full ownership of your email infrastructure",
    ],
    icon: "Mail",
    href: "/products/maysanmails",
    cta: "Set up your bulk email infrastructure",
    live: true,
  },
];
