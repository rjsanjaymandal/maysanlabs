"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in EdTech, E-commerce, Fintech, Healthcare, and Enterprise SaaS. Our team has deep expertise in building scalable platforms that handle millions of users with 99.99% uptime.",
  },
  {
    question: "How long does it take to build a custom software solution?",
    answer: "Typical projects range from 8-16 weeks depending on complexity. We use agile methodology with bi-weekly sprints, so you'll see progress every 2 weeks and have regular opportunities to provide feedback.",
  },
  {
    question: "What is your development process?",
    answer: "We follow a structured process: Discovery & Planning → Design & Architecture → Development → Testing & QA → Deployment → Ongoing Support. Each phase has clear deliverables and regular communication.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer flexible maintenance packages tailored to your needs.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, battle-tested technologies: Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, AWS, and Docker. We choose technologies based on your specific requirements for scalability and performance.",
  },
  {
    question: "How do you ensure code quality and security?",
    answer: "We implement rigorous code reviews, automated testing, security audits, and follow OWASP guidelines. Our architectures include SOC2 compliance-ready security measures including encryption, zero-trust design, and regular penetration testing.",
  },
  {
    question: "Can you work with our existing team?",
    answer: "Absolutely! We can work as an extension of your team or lead the entire project. We're experienced in collaborating with in-house teams, integrating with your existing systems, and transitioning knowledge at project end.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible engagement models: Fixed Price for well-defined projects, Time & Material for evolving requirements, and Retainer for ongoing partnership. We provide detailed quotes after understanding your specific needs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate structured FAQPage schema for dynamic rich snippet SEO authority
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="py-20 border-t border-[var(--sec-border)]" id="faq">
      {/* Dynamic SEO JSON-LD FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <HelpCircle size={12} />
              FAQ
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight"
          >
            Frequently Asked <span className="bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(26,109,214,0.2)]">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                id={`faq-button-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                className={`w-full text-left rounded-xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden group border ${
                  openIndex === index 
                    ? "bg-brand-primary/[0.02] border-brand-primary/30 shadow-lg shadow-brand-primary/5" 
                    : "bg-[var(--glass-chip-bg)] border-[var(--glass-chip-border)] hover:border-white/15"
                }`}
              >
                {openIndex === index && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary to-blue-500" />
                )}
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                    openIndex === index ? "text-foreground" : "text-foreground/80 group-hover:text-[#1A6DD6]"
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-all duration-300 flex-shrink-0 ${
                      openIndex === index ? "rotate-180 text-[#1A6DD6]" : "text-foreground/40 group-hover:text-[#1A6DD6]"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-foreground/60 text-sm mt-4 pt-4 border-t border-[var(--sec-border)] leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}