"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

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
    <section id="faq" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className="system-pulse" />
            <span className={styles.label}>SUPPORT DATABASE</span>
          </div>
          <h2 className={styles.title}>System Intelligence</h2>
          <p className={styles.subtitle}>
            Frequently asked questions about our infrastructure and process.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`${styles.faqItem}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className={styles.chevron} />
                </motion.div>
              </button>

              <AnimatePresence mode="wait">
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.answerWrapper}
                  >
                    <div className={styles.divider} />
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
