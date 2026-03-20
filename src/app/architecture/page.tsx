"use client";

import { motion } from "framer-motion";
import { Server, Shield, Globe, Cpu, Activity, Zap, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const layers = [
  {
    id: "LAYER_01",
    title: "GLOBAL_EDGE_NETWORK",
    desc: "Low-latency content delivery via distributed sovereign edge nodes. Zero friction deployment.",
    icon: <Globe size={20} />,
  },
  {
    id: "LAYER_02",
    title: "HARDENED_SECURITY",
    desc: "AES-256 encryption kernels and active multi-vector threat mitigation protocols.",
    icon: <Shield size={20} />,
  },
  {
    id: "LAYER_03",
    title: "COMPUTE_RUNTIME",
    desc: "High-performance serverless functions and auto-scaling container configurations.",
    icon: <Cpu size={20} />,
  },
  {
    id: "LAYER_04",
    title: "DATA_PERSISTENCE",
    desc: "Multi-region database replication with verified eventual consistency. Bulletproof storage.",
    icon: <Server size={20} />,
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 tactical-grid opacity-5 pointer-events-none" />
      
      <Navbar />

      {/* Hero Header */}
      <div className="pt-48 pb-24 border-b border-border relative bg-card/30">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold block mb-6">
              [ CORE_ENGINE_V2_SPEC ]
            </span>
            <h1 className="text-massive leading-[0.8] mb-12">
              SYSTEM<br />
              <span className="italic">ARCHITECTURE</span>
            </h1>
            <p className="font-mono text-xs sm:text-lg uppercase tracking-widest text-muted-foreground max-w-2xl leading-relaxed">
              visualizing the industrial engineering behind our modular saas ecosystems. built for scale, security, and low-latency global operations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-32 container relative z-10">
        <div className="mb-16 font-mono text-[10px] text-primary flex gap-8 uppercase tracking-widest border-b border-border pb-8 font-bold">
          <div className="flex items-center gap-2">
             <Activity size={12} />
             <span>ID: ARCH_v1.0.4</span>
          </div>
          <div className="flex items-center gap-2">
             <Zap size={12} />
             <span>TYPE: NEO_MONOLITH</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
             <Shield size={12} />
             <span>STATUS: OPERATIONAL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-border/20 border border-border">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-brutalist bg-card p-12 group"
            >
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    {layer.icon}
                  </div>
                  <span className="font-mono text-[10px] text-primary/40 font-bold tracking-tighter">{layer.id}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {layer.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Deep-Dive Nodes */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-1 bg-border/20 border border-border p-1">
          {[
            { tag: "01", label: "MODULAR_CORE", text: "unified core with high-performance expansion modules." },
            { tag: "02", label: "AGENT_PROTOCOL", text: "autonomous background processing integrated at the BIOS level." },
            { tag: "03", label: "EDGE_SOVEREIGNTY", text: "deterministic data localized within 30ms proximity." },
          ].map((node, i) => (
            <div key={i} className="bg-card p-10 group hover:bg-primary/5 transition-colors">
               <span className="font-mono text-[10px] text-primary font-bold block mb-4">NODE_{node.tag}</span>
               <h4 className="font-mono text-xl font-black mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors">{node.label}</h4>
               <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight">{node.text}</p>
               <div className="mt-8 pt-8 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity flex justify-between">
                  <Box size={12} className="text-primary" />
                  <span className="font-mono text-[8px] uppercase">READiness_verified</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <ContactFooter />
    </main>
  );
}
