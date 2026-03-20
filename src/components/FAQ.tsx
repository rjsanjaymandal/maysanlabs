"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Database, Terminal, Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "Q_ARCH_01",
    question: "How is the infrastructure managed post-deployment?",
    answer:
      "Maysan Labs provides continuous technical oversight. You maintain total operational sovereignty while we ensure the system's structural integrity and performance.",
  },
  {
    id: "Q_TIME_01",
    question: "How long does a typical implementation take?",
    answer:
      "Most CRM and ERP systems are deployed within 4-6 weeks, while custom tools can take as little as 2 weeks.",
  },
  {
    id: "Q_SEC_01",
    question: "Is the Cloud Space secure for legal documents?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256) and secure key management to ensure your firm's data is bulletproof.",
  },
  {
    id: "Q_SUPPORT_01",
    question: "Do you provide long-term engineering support?",
    answer:
      "We act as your elite technical division. Our management plans include real-time telemetry, proactive scaling, and continuous refinement of your digital foundations.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-5" />
      
      <div className="container max-w-4xl relative z-10">
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
             <Database size={16} className="text-primary" />
             <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary font-bold block">
               [ KNOWLEDGE_BASE_V1 ]
             </span>
          </div>
          <h2 className="text-massive leading-[0.8] mb-8">
            SYSTEM<br />
            <span className="italic">INTELLIGENCE</span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground leading-relaxed">
            frequently requested diagnostic inquiries regarding our architectural protocols and deployment pipelines.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`card-brutalist bg-card overflow-hidden group transition-all duration-300 ${
                  isOpen ? "border-primary ring-1 ring-primary/20" : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-8 text-left group-hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-[10px] text-primary/40 font-bold hidden sm:block">{faq.id}</span>
                    <span className="font-mono text-sm sm:text-lg font-black uppercase text-foreground pr-4 tracking-tighter">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center gap-4">
                     <span className="font-mono text-[8px] opacity-0 group-hover:opacity-30 hidden sm:block uppercase">DECRYPT_ACTION</span>
                     <div className={`w-8 h-8 flex items-center justify-center border border-border group-hover:border-primary transition-colors ${isOpen ? "bg-primary text-white" : ""}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                     </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 pb-10 pt-0 flex gap-6">
                         <div className="w-px bg-primary/20 shrink-0" />
                         <div className="space-y-4">
                            <div className="flex items-center gap-2">
                               <Terminal size={10} className="text-primary" />
                               <span className="font-mono text-[8px] uppercase tracking-widest text-primary/60">ACCESS_GRANTED: RAW_DATA</span>
                            </div>
                            <p className="font-mono text-xs sm:text-sm uppercase leading-[1.6] text-muted-foreground tracking-tight">
                              {faq.answer}
                            </p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
