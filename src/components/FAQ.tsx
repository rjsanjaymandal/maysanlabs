"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "Do I own the code after the project?",
    answer:
      "Yes, $100%. We hand over the full source code and rights. No vendor lock-in, ever.",
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
    question: "Do you provide ongoing support?",
    answer:
      "We offer dedicated maintenance plans, though our goal is to build self-sustaining systems that you can manage yourself.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Support</span>
          <h2 className={styles.title}>Common Questions</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqItem} glass`}>
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.answerWrapper}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
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
