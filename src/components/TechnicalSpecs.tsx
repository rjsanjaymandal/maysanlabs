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
    <section id="tech-specs" className="section-xl relative overflow-hidden bg-background">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-32 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="badge mb-6">Engineering Standards</span>
            <h2 className="heading-xl">
               Sovereign <span className="font-accent lowercase text-primary italic">standards</span> for<br />
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
            <p className="text-sm font-medium text-foreground/50 leading-loose border-l border-border/50 pl-8">
              We do not build applications. We engineer robust, sovereign digital foundations that withstand the velocity of modern global enterprise.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-xl"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group card-base card-xl"
            >
              <div className="flex flex-col gap-10 h-full">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white text-primary rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {spec.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">{spec.id}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                     {spec.title}
                   </h3>
                   <p className="text-sm font-medium leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors">
                     {spec.text}
                   </p>
                </div>

                <div className="mt-8 pt-10 border-t border-border/50 flex gap-8">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">Synced</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">Authenticated</span>
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
