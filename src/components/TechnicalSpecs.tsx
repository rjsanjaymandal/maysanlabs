"use client";

import { Cpu, Zap, Shield, Smartphone, Box, Layers } from "lucide-react";
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
      id: "CORE_MERN_V8",
      title: "MERN_ULTRA_LOW_LATENCY",
      text: "Industrial-grade React & Node.js kernels for high-concurrency enterprise workloads.",
      icon: <Cpu size={20} />,
    },
    {
      id: "NEXT_ENGINE_15",
      title: "NEXT_PRO_MAX_ENGINE",
      text: "Cutting-edge SSR and partial pre-rendering. Non-stop SEO performance and zero-TBT interfaces.",
      icon: <Zap size={20} />,
    },
    {
      id: "ENCRYPT_AES_256",
      title: "HARDENED_PROTOCOL",
      text: "Bank-level AES-256 encryption layers integrated at the system BIOS level.",
      icon: <Shield size={20} />,
    },
    {
      id: "EDGE_DIST_NODE",
      title: "GLOBAL_RESILIENCE",
      text: "High-availability edge networks ensuring 99.99% operational sovereignty. Zero downtime.",
      icon: <Smartphone size={20} />,
    },
  ];

  return (
    <section id="tech-specs" className="py-32 relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-10" />
      
      <div className="container relative z-10">
        <div className="border-l-4 border-primary pl-10 mb-20">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold block mb-4">
            [ SYSTEM_ARCHITECTURE_V3 ]
          </span>
          <h2 className="text-massive leading-[0.8] mb-8">
            ENGINEERING<br />
            <span className="italic">STANDARDS</span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground max-w-xl leading-relaxed">
            we do not build applications. we engineer robust, sovereign digital foundations that withstand the velocity of modern global enterprise.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 border border-border"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-brutalist bg-card p-12 group transition-all shadow-[8px_8px_0px_rgba(255,69,0,0.05)] hover:shadow-[12px_12px_0px_rgba(255,69,0,0.1)]"
            >
              <div className="flex flex-col gap-8 h-full">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    {spec.icon}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[8px] opacity-30 block">HARDWARE_SPEC</span>
                    <span className="font-mono text-[10px] text-primary">{spec.id}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="font-mono text-xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                     {spec.title}
                   </h3>
                   <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight">
                     {spec.text}
                   </p>
                </div>

                <div className="mt-auto pt-8 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity flex gap-4">
                   <div className="flex items-center gap-1">
                      <Layers size={10} className="text-primary" />
                      <span className="font-mono text-[8px]">LAYER_SYNCED</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Box size={10} className="text-primary" />
                      <span className="font-mono text-[8px]">PACKAGE_READY</span>
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
