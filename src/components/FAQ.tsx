"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is the infrastructure managed post-deployment?",
    answer:
      "Maysan Labs provides continuous technical oversight. You maintain total operational sovereignty while we ensure the system's structural integrity and performance.",
  },
  {
    question: "How long does a typical implementation take?",
    answer:
      "Most CRM and ERP systems are deployed within 4-6 weeks, while custom tools can take as little as 2 weeks.",
  },
  {
    question: "Is the Cloud Space secure for legal documents?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256) and secure key management to ensure your firm's data is bulletproof.",
  },
  {
    question: "Do you provide long-term engineering support?",
    answer:
      "We act as your elite technical division. Our management plans include real-time telemetry, proactive scaling, and continuous refinement of your digital foundations.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-background relative noise-bg">
      <div className="container max-w-4xl relative z-10">
        <div className="mb-16 text-center">
          <span className="section-label">Support Database</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            System Intelligence
          </h2>
          <p className="text-lg text-muted-foreground">
            Frequently asked questions about our infrastructure and process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-l-2 !border-l-primary" : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-lg text-foreground pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
