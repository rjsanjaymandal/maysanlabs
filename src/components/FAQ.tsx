"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Terminal, Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "Q_ARCH_01",
    question: "Do you help after launch?",
    answer: "Yes. Ongoing support to keep things fast and secure. You own everything.",
  },
  {
    id: "Q_TIME_01",
    question: "How long to build?",
    answer: "4-6 weeks for most projects. Custom builds in as little as 2 weeks.",
  },
  {
    id: "Q_SEC_01",
    question: "Is my data secure?",
    answer: "Bank-level encryption. Your data stays yours, always.",
  },
  {
    id: "Q_SUPPORT_01",
    question: "Ongoing support?",
    answer: "Yes. We keep your software updated as your business grows.",
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
    <section id="faq" className="sec-xl relative overflow-hidden bg-black">
      <div className="container-main max-w-4xl mx-auto">
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="announcement-bar mb-8">Common Questions</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
            Frequently <span className="text-brand-primary italic lowercase">asked</span><br />
            Questions.
          </h2>
          <p className="text-sm font-medium text-white/85 leading-loose max-w-lg">
            Quick answers about working with us.
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
                className={`maysan-card !p-0 transition-all duration-500 ${
                  isOpen ? "border-brand-primary/40 bg-white/[0.08]" : "hover:border-brand-primary/20"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-8 md:p-10 text-left transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-8">
                    <span className="font-mono text-2xl italic text-brand-primary/20 hidden sm:block">0{index+1}</span>
                    <span className="text-lg md:text-xl font-black text-white pr-4 tracking-tighter uppercase">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0">
                     <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center border border-white/10 transition-all duration-300 ${isOpen ? "bg-[var(--brand-primary)] text-[var(--brand-dark-text)] scale-110 font-bold" : "bg-white/5"}`}>
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
                         <div className="w-px bg-brand-primary/30 shrink-0" />
                         <div className="space-y-6">
                            <p className="text-sm sm:text-base font-medium leading-relaxed text-white/85">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-3">
                               <Terminal size={12} className="text-brand-primary/60" />
                               <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-primary/60">Verified Protocol</span>
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
