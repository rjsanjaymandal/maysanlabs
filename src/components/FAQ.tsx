"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Database, Terminal, Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "Q_ARCH_01",
    question: "Do you help after the site is live?",
    answer:
      "Yes. We provide ongoing technical support to make sure your systems stay fast and secure. You own everything, but we are here to help whenever you need us.",
  },
  {
    id: "Q_TIME_01",
    question: "How long does it take to build?",
    answer:
      "Most online stores and customer management systems are ready in 4-6 weeks. Custom tools can often be built in as little as 2 weeks.",
  },
  {
    id: "Q_SEC_01",
    question: "Is my data secure?",
    answer:
      "Yes. We use high-level encryption (the same kind used by banks) to keep your business information safe and private.",
  },
  {
    id: "Q_SUPPORT_01",
    question: "Do you offer ongoing support?",
    answer:
      "Yes. We can act as your technical partner, keeping your software updated and helping you grow as your needs change.",
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
    <section id="faq" className="py-40 relative overflow-hidden bg-background">
      <div className="container max-w-4xl relative z-10">
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-8 inline-block">
            Common Questions
          </span>
          <h2 className="text-massive leading-[1.1] font-bold mb-8">
            Frequently <span className="font-accent lowercase text-primary italic">asked</span><br />
            Questions.
          </h2>
          <p className="text-sm font-medium text-foreground/50 leading-loose max-w-lg">
            Answers to common questions about how we work, our security, and how we help your business.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-secondary/30 rounded-3xl overflow-hidden transition-all duration-500 border border-transparent hover:border-primary/10 ${
                  isOpen ? "bg-secondary/50 border-primary/20" : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-10 text-left transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-8">
                    <span className="font-accent text-2xl italic text-primary/20 hidden sm:block">0{index+1}</span>
                    <span className="text-lg font-bold text-foreground pr-4 tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0">
                     <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-border group-hover:border-primary transition-all duration-300 ${isOpen ? "bg-primary text-white scale-110" : "bg-white"}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                     </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 pb-12 pt-2 flex gap-10">
                         <div className="w-px bg-primary/20 shrink-0" />
                         <div className="space-y-6">
                            <p className="text-sm sm:text-base font-medium leading-relaxed text-foreground/60">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-3">
                               <Terminal size={12} className="text-primary/40" />
                               <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40">Verified Protocol</span>
                            </div>
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
