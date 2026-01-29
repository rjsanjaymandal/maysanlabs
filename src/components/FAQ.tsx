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
    <section id="faq" className="py-24 bg-background">
      <div className="container max-w-4xl">
        <div className="mb-16 text-center">
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
            Support Database
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            System Intelligence
          </h2>
          <p className="text-xl text-muted-foreground">
            Frequently asked questions about our infrastructure and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg bg-card overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-card/80 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-foreground">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
