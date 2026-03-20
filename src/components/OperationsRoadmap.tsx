"use client";

import React from "react";
import { Search, FileText, Cpu, Rocket, ShieldCheck, Activity } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const stages = [
  {
    tag: "STG_01",
    title: "AUDIT_&_EXTRACT",
    desc: "Comprehensive diagnostic of existing digital clusters and infrastructure friction points.",
    icon: <Search size={18} />,
  },
  {
    tag: "STG_02",
    title: "BLUEPRINT_ARCH",
    desc: "Architecting modular solutions tailored for technical dominance and scale.",
    icon: <FileText size={18} />,
  },
  {
    tag: "STG_03",
    title: "CORE_CONSTRUCTION",
    desc: "Agile build cycles with deep-tech integration and real-time system telemetry.",
    icon: <Cpu size={18} />,
  },
  {
    tag: "STG_04",
    title: "DEPLOY_ORBIT",
    desc: "Seamless transition to live environments with 24/7 autonomous monitoring.",
    icon: <Rocket size={18} />,
  },
  {
    tag: "STG_05",
    title: "ELITE_MAINTENANCE",
    desc: "Ongoing optimization and scaling for sustained enterprise growth vectors.",
    icon: <ShieldCheck size={18} />,
  },
];

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

const itemVariantsReverse: Variants = {
  hidden: { opacity: 0, x: 20 },
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

export default function OperationsRoadmap() {
  return (
    <div className="relative py-20 px-4">
      {/* Tactical Pipeline Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-border/30 hidden md:block">
         <motion.div 
           className="w-full bg-primary origin-top"
           initial={{ scaleY: 0 }}
           whileInView={{ scaleY: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 2, ease: "easeInOut" }}
         />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-24 relative z-10"
      >
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            variants={index % 2 === 0 ? itemVariantsReverse : itemVariants}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Stage Gate (Marker) */}
            <div className="relative shrink-0">
               <div className="w-16 h-16 bg-card border-2 border-border flex items-center justify-center group hover:border-primary transition-colors transform rotate-45">
                  <div className="-rotate-45 text-primary group-hover:scale-110 transition-transform">
                    {stage.icon}
                  </div>
               </div>
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-muted-foreground whitespace-nowrap">
                 SYNC_POINT_0{index + 1}
               </div>
            </div>

            {/* Content Spacer for standard layout */}
            <div className="hidden md:block w-1/2" />

            {/* Content Box (Brutalist Data Block) */}
            <div className={`w-full md:w-1/2 p-10 bg-card border border-border relative overflow-hidden group hover:border-primary/40 transition-all ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              {/* Corner Accent */}
              <div className={`absolute top-0 w-8 h-8 border-t-2 border-primary/20 group-hover:border-primary transition-colors ${index % 2 === 0 ? "right-0 border-r-2" : "left-0 border-l-2"}`} />
              
              <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <span className="font-mono text-xs text-primary font-bold tracking-widest">{stage.tag}</span>
                <div className="w-8 h-[1px] bg-border" />
              </div>

              <h3 className="font-mono text-2xl font-black mb-4 tracking-tighter uppercase group-hover:text-primary transition-colors">
                {stage.title}
              </h3>
              
              <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight max-w-md inline-block">
                {stage.desc}
              </p>

              <div className={`mt-8 flex items-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                 <Activity size={12} className="text-primary" />
                 <span className="font-mono text-[8px]">ACTIVE_PROTOCOL_PENDING</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
