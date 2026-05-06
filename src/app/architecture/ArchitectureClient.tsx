"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Cpu, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
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
    <main className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Cpu size={12} />
              How we build
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Modern <span className="text-brand-primary">architecture</span> for<br />
              Large Projects.
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl">
              A look at the strong engineering that keeps your software fast and secure across the world.
            </p>
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-primary/85 rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              Start Your Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section className="py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/[0.03] flex items-center justify-center text-white/40 rounded-xl group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all duration-300">
                    {layer.icon}
                  </div>
                  <span className="text-xs text-white/20 font-bold uppercase tracking-widest">{layer.id}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                  {layer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Nodes */}
      <section className="py-16 border-t border-white/5">
        <div className="container-main">
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
                className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-brand-primary/10 transition-all duration-300 group"
              >
                <span className="text-xs text-brand-primary/40 font-bold block mb-4 uppercase tracking-widest">Node {node.tag}</span>
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-primary transition-colors">{node.label}</h4>
                <p className="text-sm leading-relaxed text-white/45">{node.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
