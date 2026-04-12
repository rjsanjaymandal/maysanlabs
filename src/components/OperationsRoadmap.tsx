"use client";

import React from "react";
import { Search, Package, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "System Review",
    desc: "Deep reconnaissance of your legacy architecture, identifying bottlenecks, technical debt, and zero-trust vulnerabilities.",
    icon: <Search className="text-[var(--brand-primary)]" size={20} />,
    color: "var(--brand-primary)"
  },
  {
    number: "02",
    title: "Weekly Delivery",
    desc: "Iterative deployment cycles. Production-grade code is shipped every 7 days, maintaining absolute momentum.",
    icon: <Package className="text-[var(--brand-primary)]" size={20} />,
    color: "var(--brand-primary)"
  },
  {
    number: "03",
    title: "Production",
    desc: "High-concurrency mission-critical launch. We oversee the final cut-over with zero-downtime guarantees.",
    icon: <Zap className="text-[var(--brand-primary)]" size={20} />,
    color: "var(--brand-primary)"
  }
];

export default function OperationsRoadmap() {
  return (
    <section className="sec-xl container-main">
      <div className="text-center mb-32">
        <span className="announcement-bar">The Workflow</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white/10">Process_Flow</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="relative group p-10 maysan-card border-none !bg-transparent"
          >
            {/* Background Number */}
            <div className="absolute top-0 right-0 font-black text-[150px] leading-none text-white/5 select-none transition-all duration-700 group-hover:text-[var(--brand-primary)]/10 pointer-events-none -translate-y-12 translate-x-8 italic">
              {step.number}
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 group-hover:bg-[var(--brand-gradient)] group-hover:text-[var(--brand-dark-text)] transition-all duration-500 shadow-lg">
                <div className="group-hover:text-[var(--brand-dark-text)] text-[var(--brand-primary)] transition-colors">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-3xl font-black mb-6 tracking-tight uppercase group-hover:text-[var(--brand-primary)] transition-colors duration-500 italic">
                {step.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-8 flex-1 font-medium">
                {step.desc}
              </p>

              <div className="flex items-center gap-2 text-[var(--brand-primary)] font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                <span>Phase_Complete</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Connecting line for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-white/5 group-hover:bg-[var(--brand-primary)]/30 transition-colors" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Industrial Footer Line */}
      <div className="mt-40 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
