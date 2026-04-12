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
    <main className="bg-[#0d1117] min-h-screen relative overflow-hidden">
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
              Built <span className="text-[#007AFF] italic uppercase">Right.</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto mt-6 text-xl md:text-2xl font-medium leading-relaxed">
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
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="maysan-card group flex flex-col justify-between"
              >
                <div>
                   <div className="w-14 h-14 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-10 text-[#007AFF] border border-[#007AFF]/20 group-hover:bg-[#007AFF] group-hover:text-white transition-all duration-500">
                     {feature.icon}
                   </div>
                   <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-[#007AFF] transition-colors">{feature.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </div>
                
                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                   <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">{feature.tag}</span>
                   <ArrowUpRight size={14} className="text-[#007AFF] opacity-0 group-hover:opacity-100 transition-all font-bold" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scale Section Placeholder */}
          <div className="maysan-card border-[#007AFF]/20 bg-[#007AFF]/5 text-center py-24 mb-32">
             <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic text-white/40">Performance Metrics</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto opacity-40">
                {[
                  { v: "14ms", l: "Speed" },
                  { v: "99.99%", l: "Uptime" },
                  { v: "0", l: "Issues" },
                  { v: "24/7", l: "Support" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-[#007AFF]">{stat.v}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest">{stat.l}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* CTA */}
          <div className="text-center py-20 border-t border-white/5">
            <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] mx-auto">
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
