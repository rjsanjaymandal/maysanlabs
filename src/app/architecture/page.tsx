"use client";

import { motion } from "framer-motion";
import { Server, Shield, Globe, Cpu, Layers, Workflow } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const layers = [
  {
    title: "Global Edge Network",
    desc: "Low-latency content delivery via distributed edge nodes.",
    icon: <Globe size={24} />,
  },
  {
    title: "Security Layer",
    desc: "AES-256 encryption and active threat mitigation protocols.",
    icon: <Shield size={24} />,
  },
  {
    title: "Compute Engine",
    desc: "Serverless functions and auto-scaling container configurations.",
    icon: <Cpu size={24} />,
  },
  {
    title: "Data Persistence",
    desc: "Multi-region database replication with eventual consistency.",
    icon: <Server size={24} />,
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Page Header placeholder logic since PageHeader might be complex. Using inline tailwind instead. */}
      <div className="pt-32 pb-16 bg-muted/10 border-b border-border">
        <div className="container">
          <span className="text-sm font-mono text-primary uppercase tracking-wider mb-4 block">
            Core Engine
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            System Architecture
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Visualizing the industrial engineering behind our modular SaaS
            ecosystems. Built for scale, security, and low-latency global
            operations.
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="container">
          <div className="mb-8 font-mono text-xs text-muted-foreground flex gap-4 uppercase tracking-widest border-b border-border pb-4">
            <span>// ARCH_v1.0.4</span>
            <span>// TYPE: NEO_MONOLITH</span>
            <span>// UPTIME: 99.99%</span>
          </div>

          <div className="relative border-l border-border pl-8 md:pl-16 space-y-16">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Connector Line/Dot */}
                <div className="absolute -left-[41px] md:-left-[73px] top-0 w-5 h-5 bg-background border border-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>

                <div className="bg-card border border-border p-8 rounded-lg hover:border-primary/50 transition-colors group">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-muted rounded text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      {layer.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{layer.title}</h3>
                      <p className="text-muted-foreground">{layer.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-border rounded-lg bg-card col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-3">01. Modular Core</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our architecture follows the Neo-Monolith pattern: a unified
                core with high-performance modular extensions.
              </p>
            </div>
            <div className="p-8 border border-border rounded-lg bg-card col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-3">02. Autonomous Agents</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI layers are integrated directly into the event loop, allowing
                for autonomous background processing.
              </p>
            </div>
            <div className="p-8 border border-border rounded-lg bg-card col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-3">03. Edge Sovereignty</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Data is computed as close to the user as possible (under 30ms
                latency) maintaining global consistency.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactFooter />
    </main>
  );
}
