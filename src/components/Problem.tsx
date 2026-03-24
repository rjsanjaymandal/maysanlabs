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
      id: "BROKEN",
      title: "Broken Connections",
      text: "Modern systems often rely on too many separate pieces. When one fails, the whole thing stops. We build solid, unified software.",
      icon: <AlertTriangle size={20} />,
    },
    {
      id: "DISCONNECTED",
      title: "Disconnected Tools",
      text: "Using too many different tools creates bottlenecks and missing information. We bring everything together into one simple system.",
      icon: <Users size={20} />,
    },
    {
      id: "OWNERSHIP",
      title: "Own Your Data",
      text: "Stop renting your software and started owning it. We give you full control over your business information and infrastructure.",
      icon: <Database size={20} />,
    },
  ];

  return (
    <section id="problem" className="py-40 bg-background relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-overlay opacity-20" />
        <div className="radial-glow top-1/4 -left-48 opacity-40" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary">
                Technical Diagnostics
              </span>
            </div>
            <h2 className="text-massive leading-[1.1] mb-8 font-bold">
              Fixing the <span className="font-accent lowercase text-primary italic">problems</span> in<br />
              Legacy Systems.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-xs border-l border-primary/20 pl-8"
          >
            <p className="text-sm font-medium text-foreground/50 leading-loose">
              We find the issues in your software before they cause big problems for your business. We check everything, not just how it looks.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground/5 rounded-[3rem] overflow-hidden bg-white/30 backdrop-blur-sm"
        >
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group p-16 hover:bg-white/50 transition-all duration-700 ${
                index !== problems.length - 1 ? "md:border-r border-foreground/5" : ""
              }`}
            >
              <div className="mb-10 w-14 h-14 bg-white shadow-sm border border-foreground/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500">
                {prob.icon}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-foreground">
                  {prob.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/60 font-medium">
                  {prob.text}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-primary/10 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-700">
                 <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{prob.id}</span>
                 <Activity size={14} className="text-primary animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
