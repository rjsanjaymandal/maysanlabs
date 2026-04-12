"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="radial-blur -top-20 -left-20" />
      <div className="radial-blur -bottom-40 -right-20 opacity-20" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* Announcement Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="announcement-bar">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]"></span>
            </span>
            <span>Maysan Labs : Enterprise Engineering 2026</span>
          </div>
        </motion.div>

        {/* Scaled Headlines */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-5xl"
        >
          <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9]">
            We build <em className="text-[#007AFF] not-italic font-medium">high-fidelity</em><br />
            digital infra.
          </h1>
          
          <p className="text-white/40 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Engineering mission-critical SaaS, autonomous operational tools, and custom enterprise software with <span className="text-white">mathematical precision.</span>
          </p>
        </motion.div>

        {/* Multi-CTA Pill Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/init" className="pill-btn pill-btn-primary min-w-[200px]">
             Book a Strategy Call
             <ArrowRight size={18} />
          </Link>
          <Link href="/engineering" className="pill-btn pill-btn-secondary min-w-[200px] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
             <Play size={16} fill="currentColor" />
             Watch Breakdown
          </Link>
        </motion.div>

        {/* Hero Footer / Trust Metrics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
        >
           <div className="flex items-center gap-3">
              <Cpu size={20} />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]">99.9%_Uptime</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Zero_Debt_Engineering</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]">ISO_SaaS_Patterns</span>
           </div>
        </motion.div>
      </div>

      {/* Background Visual Asset (Surgical Frame) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#007AFF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-[#007AFF]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
}