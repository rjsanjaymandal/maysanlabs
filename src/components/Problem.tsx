"use client";

import { AlertTriangle, Users, Database, Activity } from "lucide-react";
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
  hidden: { opacity: 0, y: 30 },
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

export default function Problem() {
  const problems = [
    {
      id: "DEP_FRAGILITY",
      title: "DEPENDENCY_FRAGILITY",
      text: "Modern systems rely on brittle plugin chains. When one node fails, the entire enterprise stalls.",
      icon: <AlertTriangle size={20} />,
    },
    {
      id: "SILO_OPS",
      title: "SILOED_OPERATIONS",
      text: "Fragmented tools for CRM and ERP creating massive bottlenecks and data blind spots.",
      icon: <Users size={20} />,
    },
    {
      id: "DATA_SOVEREIGNTY",
      title: "DATA_OWNERSHIP",
      text: "Stop leasing intelligence. Own your infrastructure. Absolute sovereignty over every byte.",
      icon: <Database size={20} />,
    },
  ];

  return (
    <section id="problem" className="py-32 bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-10" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-primary animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                SYSTEM_DIAGNOSTIC_V2
              </span>
            </div>
            <h2 className="text-massive leading-[0.85] mb-8">
              CRITICAL<br />
              <span className="text-primary">FRACTURES</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-md pb-4"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground leading-relaxed border-l-2 border-border pl-6">
              identifying hidden infra failures before they become mission-critical catastrophes. we audit the foundation, not just the surface.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border/20 border border-border p-1"
        >
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-brutalist group h-full flex flex-col justify-between aspect-square md:aspect-[4/5] lg:aspect-square"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                  {prob.icon}
                </div>
                <span className="font-mono text-[8px] opacity-30 text-right uppercase">
                  STATUS: DETECTED<br />
                  ID: {prob.id}
                </span>
              </div>
              
              <div>
                <h3 className="font-mono text-lg font-black mb-4 tracking-tighter uppercase group-hover:text-primary transition-colors">
                  {prob.title}
                </h3>
                <p className="font-mono text-[10px] leading-relaxed text-muted-foreground uppercase tracking-tight">
                  {prob.text}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Activity size={10} className="text-primary" />
                 <span className="font-mono text-[8px] text-primary">SCANNING_FOR_SOLUTIONS...</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
