"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
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
    answer: "We use modern, battle-tested technologies: Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, and Docker. We choose technologies based on your specific requirements for scalability and performance.",
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
    answer: "We offer flexible engagement models: Fixed Price for well-defined projects, Time & Material for evolving requirements, and Retainer for ongoing partnership.",
  },
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="py-20 border-t border-gray-100 dark:border-white/[0.06]" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="badge-section mb-4 inline-flex gap-2">
            <HelpCircle size={12} /> FAQ
          </span>
          <h2 className="heading-md text-foreground">
            Frequently asked{" "}
            <span className="text-gradient-brand">questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 dark:border-white/[0.06] rounded-xl px-6 py-1 bg-white dark:bg-white/[0.02] data-[open]:border-brand-primary/30 transition-all [&[data-open]]:shadow-sm">
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground/80 hover:text-brand-primary py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/60 leading-relaxed pb-4 pt-2 border-t border-gray-100 dark:border-white/[0.06]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
