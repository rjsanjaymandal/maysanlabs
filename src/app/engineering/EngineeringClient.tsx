"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Cpu, Zap, Shield, Layers, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Mission Performance",
    desc: "Every system we deploy is optimized for millisecond latency on distributed clusters.",
    icon: <Zap size={24} />,
    tag: "THROUGHPUT_HIGH"
  },
  {
    title: "Zero-Trust Security",
    desc: "Enterprise-grade encryption and isolated data layers built into the core logic.",
    icon: <Shield size={24} />,
    tag: "AUTH_SECURE"
  },
  {
    title: "Linear Scaling",
    desc: "Horizontally scalable architectures that grow seamlessly with your user-base.",
    icon: <Cpu size={24} />,
    tag: "AWS_INFRA"
  },
  {
    title: "Resilient Logic",
    desc: "Self-healing microservices mesh designed for 99.99% operational uptime.",
    icon: <Layers size={24} />,
    tag: "K8S_ORCHESTRA"
  },
];

export default function EngineeringClient() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-20 opacity-10" />

      {/* Hero */}
      <section className="pt-44 pb-20 overflow-hidden">
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <span className="announcement-bar">How We Build</span>
            <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-8 uppercase mb-8">
              Built <span className="text-[var(--brand-primary)] italic uppercase">Right.</span>
            </h1>
            <p className="text-white/85 max-w-2xl mx-auto mt-6 text-xl md:text-2xl font-medium leading-relaxed">
              We leverage deterministic engineering and distributed primitives to build software that operates without fail.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -5 }}
                className="maysan-card group flex flex-col justify-between"
              >
                <div>
                   <div className="w-14 h-14 bg-[var(--brand-primary)]/10 rounded-[var(--radius-md)] flex items-center justify-center mb-10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 group-hover:bg-[var(--brand-gradient)] group-hover:text-[var(--brand-dark-text)] transition-all duration-500">
                     {feature.icon}
                   </div>
                   <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-[var(--brand-primary)] transition-colors">{feature.title}</h3>
                   <p className="text-white/85 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </div>
                
                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                   <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/50">{feature.tag}</span>
                   <ArrowUpRight size={14} className="text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-all font-bold" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scale Section Placeholder */}
          <div className="maysan-card border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 text-center py-24 mb-32 !rounded-[var(--radius-xl)]">
             <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic text-white/80">Performance Metrics</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
                {[
                  { v: "14ms", l: "Speed" },
                  { v: "99.99%", l: "Uptime" },
                  { v: "0", l: "Issues" },
                  { v: "24/7", l: "Support" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-[var(--brand-primary)]">{stat.v}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">{stat.l}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* CTA */}
          <div className="text-center py-20 border-t border-white/5">
            <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] mx-auto">
              Book a Strategy Call <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
