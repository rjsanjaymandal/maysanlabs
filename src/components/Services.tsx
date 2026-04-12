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

export default function Services() {
  const services = [
    {
      id: "COMMERCE_ARCH",
      title: "Enterprise Commerce",
      desc: "End-to-end architecture to establish and scale digital commerce systems with high-concurrency handling.",
      icon: <Store size={20} />,
      features: [
        "L1 Payment Gateways",
        "Inventory Sync V4",
        "Conversion Optimization",
      ],
    },
    {
      id: "CRM_CORE",
      title: "Modular CRM Core",
      desc: "Centralized relationship management with automated operational layers and predictive analytics.",
      icon: <TrendingUp size={20} />,
      features: [
        "Data Centralization",
        "Automated Workflows",
        "Retention Logic",
      ],
    },
    {
      id: "CUSTOM_ENGINE",
      title: "Engineered Software",
      desc: "Tailored applications aligned with complex organizational workflows and system-level performance.",
      icon: <Cpu size={20} />,
      features: [
        "Scalable Kernels",
        "Secure DevOps",
        "Performance Tuning",
      ],
    },
    {
      id: "CLOUD_INFRA",
      title: "Cloud Infrastructure",
      desc: "High-performance processing on sovereign cloud infrastructure with near-instant scalability.",
      icon: <ShieldCheck size={20} />,
      features: ["Cloud Migration", "Load Balancing", "High Availability"],
    },
    {
      id: "HR_MGMT",
      title: "Operational Tooling",
      desc: "Streamlined resource operations and internal tools for high-output engineering teams.",
      icon: <Layout size={20} />,
      features: [
        "Resource Allocation",
        "Performance Telemetry",
        "Automated Payroll",
      ],
    },
    {
      id: "PERF_MARKETING",
      title: "Growth Engineering",
      desc: "Measurable business growth through data-driven visibility campaigns and technical SEO.",
      icon: <BarChart3 size={20} />,
      features: [
        "Campaign Strategy",
        "Content Engineering",
        "Audience Mapping",
      ],
    },
  ];

  return (
    <section id="services" className="section-xl relative overflow-hidden bg-background">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="label-mono mb-4 block">SYSTEM_MODULES</span>
            <h2 className="heading-xl mb-0 text-foreground">
               Deterministic <span className="text-primary">AI</span> Services<br />
               for Enterprise Scale.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-sm"
          >
             <p className="text-sm font-medium text-foreground/60 leading-loose border-l border-primary/20 pl-6">
                AI-native engineering delivering 10x production speed with digital sovereignty and full operational control.
             </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((sol, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group card-bento flex flex-col h-full relative overflow-hidden"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-300 rounded-xl" />
              
              {/* Technical label */}
              <div className="absolute top-4 left-4">
                <span className="label-system">SYSTEM_STABLE</span>
              </div>

              {/* Module Header */}
              <div className="flex justify-between items-start pt-12 mb-8">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {sol.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-primary font-mono opacity-60">NODE_0{index + 1}</span>
                </div>
              </div>

              {/* Module Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {sol.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/60 font-medium mb-6">
                  {sol.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  {sol.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-foreground/50 group-hover:text-primary/80 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-sm bg-primary/40 group-hover:bg-primary transition-colors duration-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Action Decorator */}
              <div className="mt-12 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <ArrowUpRight size={18} className="text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
