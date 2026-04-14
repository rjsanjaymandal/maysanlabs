"use client";

import { Cpu, ShieldAlert, Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Problem() {
  const architectures = [
    {
      id: "RUNTIME_ZERO",
      label: "NODE_RUNTIME",
      title: "Deterministic AI",
      text: "Eliminate runtime hallucinations. We deploy absolute, deterministic AI models strictly governed by enterprise-grade policies.",
      icon: <Cpu size={24} />,
    },
    {
      id: "SECURITY_MESH",
      label: "SYSTEM_STABLE",
      title: "Digital Sovereignty",
      text: "Absolute isolation of your data. We construct zero-trust networks that grant you 100% ownership and control.",
      icon: <ShieldAlert size={24} />,
    },
    {
      id: "THROUGHPUT_MAX",
      label: "CLUSTER_ACTIVE",
      title: "10x Velocity",
      text: "Stop wasting cycles on technical debt. Our high-concurrency microservices mesh get you to market 10x faster.",
      icon: <Activity size={24} />,
    },
  ];

  return (
    <section id="architecture" className="sec-xl relative overflow-hidden">
      {/* Background Decorative Asset */}
      <div className="radial-blur -top-40 -left-20 opacity-10" />
      
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="announcement-bar !mb-8">
               Architecture Overlay
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
              Execute <br />
              <span className="text-[var(--brand-primary)] italic">Without Fail.</span>
            </h2>
            <p className="text-xl text-white/70 font-medium mb-12">
              Legacy systems are the silent killer of enterprise velocity. We rebuild the foundation.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-xs border-l-2 border-[var(--brand-primary)]/30 pl-8"
          >
            <p className="text-sm font-medium text-white/70 leading-loose">
              We bypass legacy monolithic bottlenecks by building directly on modern, distributed clusters designed for global scale.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {architectures.map((arch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="maysan-card group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                    <div className="w-14 h-14 bg-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 group-hover:bg-[var(--brand-gradient)] group-hover:text-[var(--brand-dark-text)] transition-all duration-500 shadow-lg">
                    {arch.icon}
                  </div>
                  <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--brand-primary)]/40 group-hover:text-[var(--brand-primary)] transition-colors">{arch.label}</span>
                </div>
                
                <h3 className="text-3xl font-black mb-6 tracking-tight uppercase group-hover:text-[var(--brand-primary)] transition-colors duration-500">
                  {arch.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-medium">
                  {arch.text}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                 <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/20 uppercase">{arch.id}</span>
                 <ArrowUpRight size={14} className="text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
