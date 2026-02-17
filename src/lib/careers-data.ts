export interface JobPosition {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const jobPositions: JobPosition[] = [
  {
    id: "sr-frontend-engineer",
    title: "Senior Frontend Engineer",
    category: "Engineering",
    location: "Gurgaon / Remote",
    type: "Full-time",
    description: "Lead the development of our high-performance SaaS interfaces using Next.js and Framer Motion.",
    requirements: [
      "5+ years of experience with React/Next.js",
      "Expertise in CSS/Tailwind and motion design",
      "Deep understanding of web performance optimization",
      "Experience with TypeScript and modern state management"
    ]
  },
  {
    id: "backend-architect",
    title: "Backend Infrastructure Architect",
    category: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Design and scale autonomous operational tools and serverless infrastructure.",
    requirements: [
      "7+ years in backend engineering",
      "Expertise in Node.js, Go, or Rust",
      "Strong experience with AWS/GCP and IaC (Terraform)",
      "Background in distributed systems and micro-architectures"
    ]
  },
  {
    id: "product-designer",
    title: "Product Designer (Industrial UI)",
    category: "Design",
    location: "Gurgaon",
    type: "Full-time",
    description: "Help us define the 'Cinema Noir' industrial aesthetic for our enterprise suite.",
    requirements: [
      "Strong portfolio of SaaS/B2B product design",
      "Expertise in Figma and design systems",
      "Understanding of frontend development constraints",
      "Aeye for typography and minimal, high-impact aesthetics"
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Implementation Engineer",
    category: "Engineering",
    location: "Remote",
    type: "Contract / Full-time",
    description: "Integrate large language models and predictive engines into core SaaS operations.",
    requirements: [
      "Experience with OpenAI/Anthropic APIs and RAG architectures",
      "Proficiency in Python and TypeScript",
      "Background in data engineering or machine learning",
      "Ability to ship production-ready AI features fast"
    ]
  },
  {
    id: "marketing-intern",
    title: "Growth & Marketing Intern",
    category: "Marketing",
    location: "Gurgaon / Remote",
    type: "Internship",
    description: "Support our growth initiatives and help communicate the value of autonomous SaaS to a global audience.",
    requirements: [
      "Current student or recent graduate in Marketing, Communications, or related field",
      "Strong writing and storytelling skills",
      "Familiarity with SaaS trends and digital marketing tools",
      "Proactive attitude and willingness to learn in a high-velocity environment"
    ]
  }
];
