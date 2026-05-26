"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Cpu,
  Globe,
  Shield,
  ArrowRight,
  Server,
  HardDrive,
  Radio,
  Layers,
  Users,
  Zap,
  RefreshCw,
  GitBranch,
} from "lucide-react";

const layersMvp = [
  {
    id: "cdn",
    label: "CDN",
    sub: "Vercel Edge",
    icon: Globe,
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
  },
  {
    id: "client",
    label: "Client",
    sub: "Next.js SPA",
    icon: Cpu,
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  {
    id: "api",
    label: "API Server",
    sub: "Node.js (1 instance)",
    icon: Server,
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
  },
  {
    id: "cache",
    label: "Cache",
    sub: "In-memory",
    icon: HardDrive,
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  {
    id: "db",
    label: "Database",
    sub: "PostgreSQL (Single)",
    icon: Database,
    color: "text-rose-400",
    border: "border-rose-500/20",
    bg: "bg-rose-500/5",
  },
];

const layersEnterprise = [
  {
    id: "cdn",
    label: "CDN",
    sub: "Multi-region Edge",
    icon: Globe,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  {
    id: "waf",
    label: "WAF + DDoS",
    sub: "Cloudflare Enterprise",
    icon: Shield,
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
  },
  {
    id: "lb",
    label: "Load Balancer",
    sub: "Global (Anycast)",
    icon: Radio,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
  },
  {
    id: "client",
    label: "Client",
    sub: "Next.js ISR + PWA",
    icon: Cpu,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  {
    id: "workers",
    label: "Edge Workers",
    sub: "8 regions (14.8ms)",
    icon: Zap,
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
  },
  {
    id: "api",
    label: "API Cluster",
    sub: "Auto-scaled (x16)",
    icon: Server,
    color: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
  },
  {
    id: "queue",
    label: "Job Queue",
    sub: "Redis + BullMQ",
    icon: RefreshCw,
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
  },
  {
    id: "cache",
    label: "Cache Cluster",
    sub: "Redis (Multi-AZ)",
    icon: HardDrive,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
  {
    id: "db",
    label: "DB Cluster",
    sub: "Multi-region + Read Replicas",
    icon: Database,
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
  },
  {
    id: "replica",
    label: "Analytics DB",
    sub: "ClickHouse (Real-time)",
    icon: Layers,
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
];

const connectionsMvp = [
  { from: "cdn", to: "client" },
  { from: "client", to: "api" },
  { from: "api", to: "cache" },
  { from: "api", to: "db" },
];

const connectionsEnterprise = [
  { from: "cdn", to: "waf" },
  { from: "waf", to: "lb" },
  { from: "lb", to: "client" },
  { from: "lb", to: "workers" },
  { from: "workers", to: "api" },
  { from: "client", to: "api" },
  { from: "api", to: "queue" },
  { from: "api", to: "cache" },
  { from: "api", to: "db" },
  { from: "db", to: "replica" },
];

export default function ArchitectureVisualizer() {
  const [mode, setMode] = useState<"mvp" | "enterprise">("mvp");

  const layers = mode === "mvp" ? layersMvp : layersEnterprise;
  const connections = mode === "mvp" ? connectionsMvp : connectionsEnterprise;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] to-transparent pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers size={12} />
            Architecture Visualizer
          </span>
          <h2 className="heading-lg sm:heading-xl text-[var(--text-on-white)] mb-3">
            Your stack at{" "}
            <span className="text-brand-primary">every stage</span>
          </h2>
          <p className="text-[var(--text-on-white)]/50 max-w-xl mx-auto text-sm">
            See how your infrastructure evolves from MVP to enterprise scale
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
            <button
              onClick={() => setMode("mvp")}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === "mvp"
                  ? "bg-brand-primary text-black shadow-lg"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Users size={14} className="inline mr-1.5 -mt-0.5" />
              MVP (1k users)
            </button>
            <button
              onClick={() => setMode("enterprise")}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === "enterprise"
                  ? "bg-brand-primary text-black shadow-lg"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Globe size={14} className="inline mr-1.5 -mt-0.5" />
              Enterprise (1M+ users)
            </button>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 text-xs text-foreground/30 font-mono border-b border-white/[0.06] pb-4">
                  <GitBranch size={12} />
                  <span>maysan-architecture/{mode === "mvp" ? "mvp" : "enterprise"}.yml</span>
                  <span className="ml-auto text-brand-primary">{mode === "mvp" ? "6 nodes" : "16 nodes"}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {layers.map((layer, i) => {
                    const Icon = layer.icon;
                    return (
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`${layer.bg} ${layer.border} border rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform duration-200`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${layer.bg} border ${layer.border} flex items-center justify-center`}>
                          <Icon size={18} className={layer.color} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{layer.label}</p>
                          <p className="text-[10px] text-foreground/40 mt-0.5">{layer.sub}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] text-foreground/30">
                  {connections.map((conn, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-white/[0.02] rounded-md border border-white/[0.04]">
                      {conn.from}
                      <ArrowRight size={10} className="text-brand-primary/60" />
                      {conn.to}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-foreground/40">
                    <Zap size={12} className="text-brand-primary" />
                    <span>Estimated latency: <strong className="text-foreground/70">{mode === "mvp" ? "<50ms" : "<15ms"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/40">
                    <Database size={12} className="text-brand-primary" />
                    <span>DB config: <strong className="text-foreground/70">{mode === "mvp" ? "Single instance" : "Multi-region cluster"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/40">
                    <Server size={12} className="text-brand-primary" />
                    <span>Auto-scaling: <strong className="text-foreground/70">{mode === "mvp" ? "Manual" : "Kubernetes"}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
