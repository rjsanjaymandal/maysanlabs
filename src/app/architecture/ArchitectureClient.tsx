"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Cpu, Zap, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import ContactFooter from "@/components/layout/footer";
import Link from "next/link";

export default function ArchitectureClient() {
  const layers = [
    {
      id: "EDGE_01",
      title: "Edge Distribution",
      desc: "Content delivered from 200+ global edge nodes ensuring sub-50ms latency worldwide.",
      icon: <Globe size={22} />,
    },
    {
      id: "SECURE_02",
      title: "Military-Grade Security",
      desc: "AES-256 encryption, zero-trust architecture, and continuous penetration testing.",
      icon: <Shield size={22} />,
    },
    {
      id: "SCALE_03",
      title: "Auto-Scaling Infrastructure",
      desc: "Kubernetes clusters that automatically scale from 100 to 10M daily active users.",
      icon: <Cpu size={22} />,
    },
    {
      id: "PERF_04",
      title: "Sub-100ms API Response",
      desc: "Optimized GraphQL queries and Redis caching for instant data retrieval.",
      icon: <Zap size={22} />,
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      {/* Brand Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] max-sm:w-[300px] max-sm:h-[200px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Cpu size={12} />
              How we build
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground mb-6 leading-[1.05]">
              Modern <span className="bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(26,109,214,0.2)]">architecture</span> for<br />
              Large Projects.
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl font-medium">
              A look at the strong engineering that keeps your software fast and secure across the world.
            </p>
            <Link href="/start" className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-brand-primary to-brand-light rounded-full font-extrabold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] hover:brightness-110 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section className="py-20">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-12 text-left">
            Core Architecture Principles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group card-glass rounded-2xl p-8 card-hover hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[var(--glass-chip-bg)] flex items-center justify-center text-foreground/40 rounded-xl group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:border group-hover:border-brand-primary/20 transition-all duration-300">
                    {layer.icon}
                  </div>
                  <span className="text-xs text-foreground/20 font-bold uppercase tracking-widest">{layer.id}</span>
                </div>

                <h3 className="text-xl font-bold tracking-[-0.015em] text-foreground mb-3 group-hover:text-brand-primary transition-colors">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/50 font-medium">
                  {layer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Nodes */}
      <section className="py-16 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-12 text-left">
            Infrastructure & Scaling Nodes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "01", label: "Building Blocks", text: "A modular system that allows us to add new features quickly as you grow." },
              { tag: "02", label: "Smart Automation", text: "Background tools that handle daily tasks automatically so you don't have to." },
              { tag: "03", label: "Close to You", text: "Data stored in your region for the fastest possible loading speeds." },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-2xl p-6 card-hover group hover:scale-[1.01]"
              >
                <span className="text-xs text-brand-primary/60 font-bold block mb-4 uppercase tracking-widest">Node {node.tag}</span>
                <h3 className="text-lg font-bold tracking-[-0.015em] text-foreground mb-3 group-hover:text-brand-primary transition-colors">{node.label}</h3>
                <p className="text-sm leading-relaxed text-foreground/50 font-medium">{node.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
