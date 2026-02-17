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
    id: "full-stack-genai-developer",
    title: "Full Stack Generative AI (GenAI) Developer",
    category: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Design and implement production-ready GenAI workflows, integrating LLMs with modern web architectures.",
    requirements: [
      "Mastery of TypeScript, Node.js, and React",
      "Proven experience with LLM orchestration (LangChain, LlamaIndex, or custom pipelines)",
      "Expertise in vector databases (Pinecone, Weaviate, or pgvector)",
      "Strong understanding of RAG (Retrieval-Augmented Generation) and prompt engineering",
      "Experience with multimodal AI and fine-tuning is a plus"
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
