"use client";

import { Cpu, Zap, Shield, Layers } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function TechnicalSpecs() {
  const specs = [
    {
      id: "MERN_V8",
      title: "Ultra-Low Latency",
      text: "Industrial-grade React & Node.js kernels for high-concurrency enterprise workloads.",
      icon: <Cpu size={22} />,
    },
    {
      id: "NEXT_ENGINE",
      title: "Optimized Engine",
      text: "Cutting-edge SSR and partial pre-rendering. Non-stop performance and zero-TBT interfaces.",
      icon: <Zap size={22} />,
    },
    {
      id: "AES_256",
      title: "Hardened Protocol",
      text: "Bank-level AES-256 encryption layers integrated at the system level for military-grade security.",
      icon: <Shield size={22} />,
    },
    {
      id: "EDGE_NODE",
      title: "Global Resilience",
      text: "High-availability edge networks ensuring 99.99% operational sovereignty and zero downtime.",
      icon: <Layers size={22} />,
    },
  ];

  return (
    <section id="tech-specs" className="sec-xl relative overflow-hidden bg-black">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-32 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="announcement-bar mb-6">Engineering Standards</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
               Sovereign <span className="text-brand-primary italic lowercase">standards</span> for<br />
               Digital Scale.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-sm"
          >
            <p className="text-sm font-medium text-white/85 leading-loose border-l border-white/10 pl-8">
              We do not build applications. We engineer robust, sovereign digital foundations that withstand the velocity of modern global enterprise.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group maysan-card"
            >
              <div className="flex flex-col gap-10 h-full">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-[var(--radius-md)] flex items-center justify-center border border-brand-primary/20 shadow-sm group-hover:bg-[var(--brand-gradient)] group-hover:text-[var(--brand-dark-text)] transition-all duration-500">
                    {spec.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">{spec.id}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-brand-primary transition-colors">
                     {spec.title}
                   </h3>
                   <p className="text-sm font-medium leading-relaxed text-white/85 group-hover:text-white transition-colors">
                     {spec.text}
                   </p>
                </div>

                <div className="mt-8 pt-10 border-t border-white/5 flex gap-8">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-sm bg-brand-primary/60 group-hover:bg-brand-primary transition-colors duration-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Synced</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-sm bg-brand-primary/60 group-hover:bg-brand-primary transition-colors duration-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Authenticated</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
