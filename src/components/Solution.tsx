"use client";

import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function Solution() {
  const solutions = [
    {
      id: "COMMERCE_ARCH",
      title: "ENTERPRISE_COMMERCE",
      desc: "End-to-end architecture to establish and scale digital commerce systems.",
      icon: <Store size={20} />,
      features: [
        "L1_PAYMENT_GATEWAYS",
        "INVENTORY_SYNC_V4",
        "UX_FRICTION_OFFLOAD",
      ],
    },
    {
      id: "CRM_CORE",
      title: "CRM_MODULAR_CORE",
      desc: "Centralized relationship management with automated operational layers.",
      icon: <TrendingUp size={20} />,
      features: [
        "DATA_CENTRALIZATION",
        "AUTO_COMMS_PROTOCOL",
        "RETENTION_LOGIC",
      ],
    },
    {
      id: "CUSTOM_ENGINE",
      title: "ENGINEERED_SOFTWARE",
      desc: "Tailored applications aligned with complex organizational workflows.",
      icon: <Cpu size={20} />,
      features: [
        "SCALABLE_KERNELS",
        "SECURE_DEV_OPS",
        "PERF_OPTIMIZATION",
      ],
    },
    {
      id: "CLOUD_INFRA",
      title: "CLOUD_SOLUTIONS",
      desc: "High-performance processing on sovereign cloud infrastructure.",
      icon: <ShieldCheck size={20} />,
      features: ["CLOUD_MIGRATION", "LOAD_BALANCING", "HIGH_AVAILABILITY"],
    },
    {
      id: "HR_MGMT",
      title: "SYSTEM_LEVEL_HR",
      desc: "Streamlined human resource operations for high-output engineering teams.",
      icon: <Layout size={20} />,
      features: [
        "ATTENDANCE_V3",
        "PERF_TELEMETRY",
        "PAYROLL_TRANSIT",
      ],
    },
    {
      id: "PERF_MARKETING",
      title: "GROWTH_ALGORITHMS",
      desc: "Measurable business growth through data-driven visibility campaigns.",
      icon: <BarChart3 size={20} />,
      features: [
        "CAMPAIGN_STRATEGY",
        "CONTENT_ENGINE",
        "AUDIENCE_VECTORS",
      ],
    },
  ];

  return (
    <section id="solution" className="py-32 relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-5 pointer-events-none" />
      
      {/* Structural Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-primary opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary font-bold block mb-6">
              [ SOLUTIONS_CATALOG_V2.0 ]
            </span>
            <h2 className="text-massive leading-[0.8] mb-0">
               ENGINEERED<br />
               <span className="text-primary italic">MODULES</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-sm"
          >
             <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed border-b border-border pb-6">
                industrial-grade architectural layers designed for the expansion of the modern digital empire. no safe harbor layouts.
             </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border/20 border border-border p-1"
        >
          {solutions.map((sol, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-brutalist group p-10 flex flex-col h-full bg-card relative overflow-hidden transition-all shadow-[8px_8px_0px_rgba(255,69,0,0.05)] hover:shadow-[12px_12px_0px_rgba(255,69,0,0.1)]"
            >
              {/* Module Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  {sol.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="font-mono text-[8px] opacity-30">TYPE: MODULE</span>
                   <span className="font-mono text-[10px] text-primary font-bold">0{index + 1}</span>
                </div>
              </div>

              {/* Module Info */}
              <div className="flex-1">
                <h3 className="font-mono text-xl font-black mb-4 tracking-tighter uppercase group-hover:text-primary transition-colors">
                  {sol.title}
                </h3>
                <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight mb-8">
                  {sol.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-border">
                  {sol.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center gap-3 font-mono text-[9px] tracking-widest text-foreground/70 group-hover:text-foreground transition-colors"
                    >
                      <div className="w-1 h-1 bg-primary/40 group-hover:bg-primary transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Action Decorator */}
              <div className="mt-12 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                 <span className="font-mono text-[8px] uppercase">STATUS: AVAILABLE</span>
                 <ArrowUpRight size={14} className="text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
