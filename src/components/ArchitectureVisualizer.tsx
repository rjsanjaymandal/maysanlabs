"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Database, Globe } from "lucide-react";

const layers = [
  {
    id: "edge",
    name: "Global Edge Network",
    icon: <Globe className="w-6 h-6" />,
    color: "hsl(var(--primary))",
    desc: "Distributed CDN and edge compute nodes localized for <30ms latency across 40+ global zones.",
    specs: [
      "Anycast Routing",
      "Edge-side Validation",
      "DDoS Mitigation",
      "Cloudflare/AWS Integrated",
    ],
    logs: [
      "[Edge] Initializing handoff...",
      "[Edge] Node localized: Mumbai-ENT-1",
      "[Edge] Latency optimized: 12ms",
    ],
  },
  {
    id: "security",
    name: "Zero-Trust Security Layer",
    icon: <Shield className="w-6 h-6" />,
    color: "hsl(var(--primary))",
    desc: "Autonomous security protocol applying biometric validation and intent-based access control.",
    specs: [
      "AES-256 Encryption",
      "JWT-based Auth",
      "Dynamic Firewalling",
      "Audit Trail logging",
    ],
    logs: [
      "[Auth] Biometric match detected",
      "[Sec] Session rotation complete",
      "[Firewall] 0 threats in 24h",
    ],
  },
  {
    id: "compute",
    name: "Modular Compute Engine",
    icon: <Cpu className="w-6 h-6" />,
    color: "hsl(var(--primary))",
    desc: "Virtual machine orchestration optimized for heavy ERP workloads and high-concurrency CRM modules.",
    specs: [
      "Auto-scaling Groups",
      "V8 Isolation",
      "Cold-start: <100ms",
      "Rust-optimized core",
    ],
    logs: [
      "[Compute] Worker scaled: +2",
      "[VM] Memory optimized: 0.2MB",
      "[Job] Pipeline sync: Done",
    ],
  },
  {
    id: "data",
    name: "Sovereign Persistence",
    icon: <Database className="w-6 h-6" />,
    color: "hsl(var(--primary))",
    desc: "Distributed database architecture ensuring 100% client data ownership and regional compliance.",
    specs: [
      "PostgreSQL Clusters",
      "Real-time Replication",
      "GDPR/DPDP Compliant",
      "Point-in-time recovery",
    ],
    logs: [
      "[Data] Transaction committed",
      "[Replica] Sync complete: 2ms",
      "[Vault] Keys rotated",
    ],
  },
];

export default function ArchitectureVisualizer() {
  const [activeLayer, setActiveLayer] = useState(layers[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 3D-ish Stack View */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center justify-center py-12 px-4 bg-secondary/20 rounded-3xl border border-border/50 overflow-hidden relative min-h-[500px]">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative w-full max-w-lg perspective-1000">
          <div className="flex flex-col-reverse -space-y-32">
            {layers.map((layer, idx) => {
              const isActive = activeLayer.id === layer.id;
              return (
                <motion.div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  initial={false}
                  animate={{
                    y: isActive ? -40 : 0,
                    rotateX: 45,
                    rotateZ: -10,
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.6,
                    z: isActive ? 100 : 0,
                  }}
                  whileHover={{
                    scale: 1.05,
                    opacity: 1,
                    y: -20,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`relative p-8 rounded-2xl border-2 transition-colors cursor-pointer preserve-3d glass-card ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-2xl"
                      : "border-border/50 bg-card/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        {layer.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold font-mono tracking-tighter ${isActive ? "text-primary" : "text-foreground"}`}
                        >
                          {layer.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                          Layer {layers.length - idx}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 min-h-[500px] flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                {activeLayer.icon}
              </div>
              <h2 className="text-3xl font-black tracking-tighter">
                {activeLayer.name}
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {activeLayer.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activeLayer.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-foreground/80 font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {spec}
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-black/90 dark:bg-black p-4 rounded-xl border border-border font-mono text-xs overflow-hidden h-32">
                <div className="text-primary/40 uppercase mb-2 tracking-widest text-[9px]">
                  Live System Stream
                </div>
                <div className="space-y-1">
                  {activeLayer.logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-primary/80"
                    >
                      {log}
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-1 h-3 bg-primary/50 ml-0.5"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
