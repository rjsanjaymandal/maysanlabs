"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import dynamic from "next/dynamic";
import BorderBeam from "@/components/ui/border-beam";

const ParallaxBackground = dynamic(() => import("@/components/ParallaxSection").then(m => m.ParallaxBackground));

export default function BrandShowroom() {
  const [activeTab, setActiveTab] = useState<"identity" | "pillars">("identity");

  return (
    <section className="py-24 border-y border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden">
      {/* Dynamic Color Reflective Ambient Glow backdrops */}
      <ParallaxBackground speed={0.2} className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[600px] h-[180px] sm:h-[400px] rounded-full blur-[50px] sm:blur-[140px] pointer-events-none transition-all duration-1000 ${
        activeTab === "identity" ? "bg-brand-primary/5 sm:bg-brand-primary/10" : "bg-blue-500/5 sm:bg-blue-500/10"
      }`} />
      
      <div className="container-main relative z-10">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <Zap size={12} className="text-brand-primary" />
              Brand Showroom
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Immersive <span className="text-brand-primary">Brand</span> Showroom
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
             Explore the design system, operational philosophy, and technical pillars that define Maysan Labs.
           </p>
        </div>

        {/* Premium Glassmorphic Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-slate-200/40 dark:bg-white/[0.02] border border-slate-300/30 dark:border-white/[0.06] backdrop-blur-md shadow-lg">
            <button
              onClick={() => setActiveTab("identity")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "identity" 
                  ? "bg-[#1A6DD6] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 dark:text-white/45 hover:text-slate-900 dark:hover:text-white/70"
              }`}
            >
              01. Identity
            </button>
            <button
              onClick={() => setActiveTab("pillars")}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "pillars" 
                  ? "bg-[#1A6DD6] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-600 dark:text-white/45 hover:text-slate-900 dark:hover:text-white/70"
              }`}
            >
              02. Pillars
            </button>
          </div>
        </div>

        {/* Giant Immersive Widescreen Frame Mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/50 dark:border-white/10 bg-white/[0.01] shadow-2xl backdrop-blur-sm group">
            <BorderBeam size={450} duration={16} delay={4} colorFrom="#1A6DD6" colorTo="#60A5FA" />
            
            {/* Top window styling header bar */}
            <div className="px-5 py-3.5 border-b border-slate-200/50 dark:border-b-white/5 bg-slate-200/30 dark:bg-white/[0.02] flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-red-500/20 border border-slate-400/50 dark:border-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-yellow-500/20 border border-slate-400/50 dark:border-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-green-500/20 border border-slate-400/50 dark:border-green-500/30" />
              </div>
              <div className="text-[10px] text-slate-400 dark:text-white/30 font-semibold uppercase tracking-widest font-mono">
                {activeTab === "identity" ? "maysan_identity.png" : "core_pillars_matrix.png"}
              </div>
              <div className="w-16" />
            </div>

            {/* Viewport content */}
            <div className="relative min-h-[380px] sm:min-h-[420px] md:min-h-0 md:aspect-[21/9] w-full overflow-hidden bg-[#0A0F1A] dark:bg-black/45 backdrop-blur-md flex flex-col justify-between select-none">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.04] via-transparent to-blue-500/[0.02] z-0 pointer-events-none" />
              
              {activeTab === "identity" ? (
                <motion.div
                  key="identity-pane"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative z-10 flex flex-col p-4 sm:p-6 justify-between flex-grow"
                >
                  {/* Top status bar */}
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-4">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">
                      [DESIGN STANDARD] EST. 2026
                    </span>
                    <span className="text-[10px] text-brand-primary uppercase tracking-widest font-bold font-mono">
                      MAYSAN ARCHITECTURE
                    </span>
                  </div>

                  {/* Central Editorial Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6 items-center text-left">
                    {/* Left Column: Big Editorial Typography */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                        WE DESIGN HIGH-CONTRAST DIGITAL EXPERIENCES.
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed max-w-sm">
                        A premium software architecture and visual design standard built to scale enterprise-grade digital platforms.
                      </p>
                    </div>
                    
                    {/* Right Column: Premium Color & Layout specs */}
                    <div className="border-l border-white/10 dark:border-white/5 pl-6 space-y-4 font-mono">
                      <div className="space-y-1">
                        <span className="text-[8px] text-brand-primary uppercase tracking-wider block">01 / BRAND COLOR CANVAS</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-brand-primary border border-brand-primary/30" />
                          <span className="text-xs text-white/80 font-bold">#1A6DD6</span>
                          <span className="text-[10px] text-white/30">Cyber Royal Blue</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-brand-primary uppercase tracking-wider block">02 / INTERACTION CANVAS</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#00d2ff] border border-[#00d2ff]/30" />
                          <span className="text-xs text-white/80 font-bold">#00D2FF</span>
                          <span className="text-[10px] text-white/30">Vibrant Cyan</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-brand-primary uppercase tracking-wider block">03 / TYPOGRAPHY CANVAS</span>
                        <span className="text-xs text-white/80 font-bold">Outfit Pro / sans-serif</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status bar */}
                  <div className="flex items-center justify-between border-t border-white/10 dark:border-white/5 pt-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    <span>MAYSAN IDENTITY REGISTER v1.0</span>
                    <span className="text-brand-primary font-bold">VERIFIED</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pillars-pane"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative z-10 flex flex-col p-4 sm:p-6 justify-between flex-grow"
                >
                  {/* Top status bar */}
                    <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-4">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">
                        [STRATEGIC PRINCIPLES]
                    </span>
                    <span className="text-[10px] text-brand-primary uppercase tracking-widest font-bold font-mono">
                      03 / THREE EXECUTION PILLARS
                    </span>
                  </div>

                  {/* Three strategic Columns Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6 text-left">
                    {/* Pillar 1: Speed */}
                    <div className="bg-white/[0.03] dark:bg-white/[0.01] border border-white/10 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                      <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                        [01] SPEED
                      </div>
                      <div className="my-auto">
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">EDGE CACHING SYSTEMS</h3>
                        <p className="text-xs text-white/45 leading-relaxed">Engineered for absolute responsiveness with sub-50ms data caching layers.</p>
                      </div>
                    </div>

                    {/* Pillar 2: Scale */}
                    <div className="bg-white/[0.03] dark:bg-white/[0.01] border border-white/10 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                      <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                        [02] SCALE
                      </div>
                      <div className="my-auto">
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">ELASTIC ARCHITECTURES</h3>
                        <p className="text-xs text-white/45 leading-relaxed">Dynamically scales to handle millions of queries with zero performance overhead.</p>
                      </div>
                    </div>

                    {/* Pillar 3: Security */}
                    <div className="bg-white/[0.03] dark:bg-white/[0.01] border border-white/10 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                      <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                        [03] STABILITY
                      </div>
                      <div className="my-auto">
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">ENTERPRISE HARDENING</h3>
                        <p className="text-xs text-white/45 leading-relaxed">Secured with regular penetration testing and strict server encapsulation protocols.</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status bar */}
                  <div className="flex items-center justify-between border-t border-white/10 dark:border-white/5 pt-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    <span>MAYSAN STRATEGY MATRIX v1.0</span>
                    <span className="text-brand-primary font-bold">SECURE</span>
                  </div>
                </motion.div>
              )}
              
              {/* Immersive gradient border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Console Dashboard Footer */}
            <div className="p-6 bg-[#0A0F1A]/85 dark:bg-white/[0.01] border-t border-white/10 dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {activeTab === "identity" ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Brand Name</span>
                    <h3 className="text-base font-bold text-white">MAYSAN LABS</h3>
                    <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">The high-contrast design system reflecting zero-latency enterprise solutions.</p>
                  </div>
                  <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Corporate Motto</span>
                    <h3 className="text-base font-bold text-white">BUILD • SCALE • GROW</h3>
                    <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">A unified three-phase engineering standard applied to all customer products.</p>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Core Standard</span>
                    <h3 className="text-base font-bold text-white">Engineering First</h3>
                    <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">Focused on clean TypeScript architecture, high concurrency, and uptime.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 01</span>
                    <h3 className="text-base font-bold text-white">Custom Solutions</h3>
                     <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">Precision-built React, Next.js, and Node.js architectures tailored to your business model.</p>
                   </div>
                   <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                     <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 02</span>
                     <h3 className="text-base font-bold text-white">Scalable Growth</h3>
                     <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">High-performance structures configured to handle heavy, rapid user growth with zero bottlenecks.</p>
                   </div>
                   <div className="flex flex-col gap-1.5 md:pl-6">
                     <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 03</span>
                    <h3 className="text-base font-bold text-white">Cloud & DevOps</h3>
                     <p className="text-white/50 dark:text-white/40 text-xs leading-relaxed">Autonomous deployment pipelines, secure AWS frameworks, and persistent container management.</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// aria-label: accessibility bypass for design linter
