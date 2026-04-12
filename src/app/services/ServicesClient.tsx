"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Web Engineering",
    desc: "Fast, resilient infrastructures that anchor your business growth.",
    icon: <Store size={24} />,
    tag: "SCALE_V1"
  },
  {
    title: "App Development",
    desc: "Mission-critical mobile apps that work smoothly across all clusters.",
    icon: <Cpu size={24} />,
    tag: "CROSS_PLATFORM"
  },
  {
    title: "E-Commerce",
    desc: "High-concurrency online stores with automated order flows.",
    icon: <TrendingUp size={24} />,
    tag: "RETAIL_STACK"
  },
  {
    title: "Cloud Services",
    desc: "Zero-trust hosting that keeps your data secure and globally available.",
    icon: <ShieldCheck size={24} />,
    tag: "SECURE_INFRA"
  },
  {
    title: "Custom Software",
    desc: "Architecture specifically engineered for your unique business logic.",
    icon: <Layout size={24} />,
    tag: "ENTERPRISE_ERP"
  },
  {
    title: "Gen Intelligence",
    desc: "Deterministic AI models governed by enterprise-grade safety policies.",
    icon: <BarChart3 size={24} />,
    tag: "AI_MODELS"
  },
];

export default function ServicesClient() {
  return (
    <main className="bg-[#0d1117] min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-20 opacity-10" />

      {/* Hero Section */}
      <section className="pt-44 pb-20 overflow-hidden">
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <span className="announcement-bar">Our Services</span>
            <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-8 uppercase mb-8">
              Book a <span className="text-[var(--brand-primary)] italic uppercase">Call.</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto mt-6 text-xl md:text-2xl font-medium leading-relaxed">
              We engineer the software that connects your complex operations into a high-fidelity enterprise logic.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {services.map((service, index) => (
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
                className="maysan-card border-[var(--brand-primary)]/10 bg-black/20 backdrop-blur-3xl p-10 md:p-16 group flex flex-col justify-between"
              >
                <div>
                   <div className="w-14 h-14 bg-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center mb-10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 group-hover:bg-[var(--brand-gradient)] group-hover:text-[var(--brand-dark-text)] transition-all duration-500">
                     {service.icon}
                   </div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-primary)] mb-4">
                     <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-[var(--brand-primary)] transition-colors"> {service.title}</h3>
                   </label>
                   <p className="text-white/70 text-sm leading-relaxed font-medium">{service.desc}</p>
                </div>
                
                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                   <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">{service.tag}</span>
                   <ArrowUpRight size={14} className="text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-all font-black" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border-t border-white/5"
          >
            <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] mx-auto">
              Book a Strategy Call <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
