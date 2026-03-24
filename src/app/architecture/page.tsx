"use client";

import { motion } from "framer-motion";
import { Server, Shield, Globe, Cpu, Activity, Zap, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const layers = [
  {
    id: "SPEED",
    title: "Fast Delivery",
    desc: "We deliver your content instantly using our global network of fast servers.",
    icon: <Globe size={20} />,
  },
  {
    id: "SECURITY",
    title: "Secure Core",
    desc: "Bank-level encryption and active protection to keep your data safe from any threat.",
    icon: <Shield size={20} />,
  },
  {
    id: "POWER",
    title: "Powerful Processing",
    desc: "High-performance servers that automatically grow as your business gets bigger.",
    icon: <Cpu size={20} />,
  },
  {
    id: "STORAGE",
    title: "Reliable Storage",
    desc: "Safe and secure databases that ensure you never lose a single byte of information.",
    icon: <Server size={20} />,
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Header */}
      <div className="pt-64 pb-32 relative overflow-hidden">
        <div className="grid-overlay opacity-40" />
        <div className="radial-glow -top-40 -right-40 opacity-30" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-10 inline-block">
              How we build
            </span>
            <h1 className="text-massive leading-[1.1] font-bold mb-12">
              Modern <span className="font-accent lowercase text-primary italic">architecture</span> for<br />
              Large Projects.
            </h1>
            <p className="text-lg font-medium text-foreground/50 max-w-2xl leading-relaxed border-l border-border/50 pl-10">
              A look at the strong engineering that keeps your software fast and secure across the world.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-40 container relative z-10">
        <div className="mb-20 flex flex-wrap gap-12 border-b border-border/50 pb-12">
          <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] bg-secondary/30 px-4 py-2 rounded-full">
             <Activity size={14} className="text-primary" />
             <span>ID: SYSTEM_v1.0</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] bg-secondary/30 px-4 py-2 rounded-full">
             <Zap size={14} className="text-primary" />
             <span>Type: High Speed</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
             <Shield size={14} className="text-primary" />
             <span className="text-primary">Status: Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-surgical p-12 group !bg-secondary/30 !rounded-[2.5rem]"
            >
              <div className="flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white text-primary flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-all duration-500">
                    {layer.icon}
                  </div>
                  <span className="text-[10px] text-primary/30 font-bold uppercase tracking-widest">{layer.id}</span>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-500">
                    {layer.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-foreground/50 tracking-tight max-w-sm">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Deep-Dive Nodes */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "01", label: "Building Blocks", text: "A modular system that allows us to add new features quickly as you grow." },
            { tag: "02", label: "Smart Automation", text: "Background tools that handle daily tasks automatically so you don't have to." },
            { tag: "03", label: "Close to You", text: "Data stored in your region for the fastest possible loading speeds." },
          ].map((node, i) => (
            <div key={i} className="bg-secondary/20 p-12 rounded-[2.5rem] border border-transparent hover:border-primary/10 transition-all duration-500 group">
               <span className="font-bold text-[10px] text-primary/40 block mb-6 uppercase tracking-widest">Node {node.tag}</span>
               <h4 className="text-xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-500">{node.label}</h4>
               <p className="text-sm font-medium leading-relaxed text-foreground/50 tracking-tight">{node.text}</p>
               <div className="mt-10 pt-10 border-t border-border/50 flex justify-between items-center">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Box size={14} className="text-primary" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40">Verified Ready</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <ContactFooter />

      {/* Decorative Asset */}
      <img src="/assets/wireframe-nodes.png" alt="" className="absolute top-1/2 -left-40 w-[600px] h-[600px] opacity-10 pointer-events-none mix-blend-screen mask-radial-fade scale-125 rotate-12" />
      <div className="radial-glow bottom-0 right-0 opacity-20" />
    </main>
  );
}
