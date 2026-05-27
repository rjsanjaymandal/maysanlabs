"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Rocket, 
  ArrowRight,
  Server,
  Activity,
  Globe
} from "lucide-react";
import Link from "next/link";

// ==========================================
// PILLAR 1: BUILD - INTERACTIVE CANVASES
// ==========================================
const BuildCanvas = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const layers = [
    { title: "Client Layer", desc: "Next.js & React Router", color: "from-blue-500 to-cyan-400" },
    { title: "API Gateway", desc: "Edge Nodes & Auth Middleware", color: "from-[#1A6DD6] to-blue-500" },
    { title: "Database Layer", desc: "PostgreSQL & Vector Indexes", color: "from-[#00b0ff] to-[#1A6DD6]" },
  ];

  return (
    <div className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] p-4 flex flex-col justify-end overflow-hidden group/canvas">
      {/* Background wireframe lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,109,214,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,109,214,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 group-hover/canvas:opacity-75 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col gap-2.5">
        {layers.map((layer, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;
          
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: isHovered ? -6 : isAnyHovered ? 2 : 0,
                scale: isHovered ? 1.02 : 1,
                z: isHovered ? 30 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`relative cursor-pointer p-2.5 rounded border transition-all duration-300 ${
                isHovered
                  ? "bg-slate-100 dark:bg-slate-800/80 border-blue-400 dark:border-blue-500/50 shadow-md"
                  : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${layer.color} shadow-sm`} />
                  <span className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-slate-200">{layer.title}</span>
                </div>
                <span className="text-[8px] md:text-[9px] font-medium text-slate-400 dark:text-slate-500">{layer.desc}</span>
              </div>

              {/* Expandable element mock logic */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 pt-1.5 border-t border-slate-200 dark:border-white/5 flex gap-1"
                  >
                    <span className="text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">ACTIVE</span>
                    <span className="text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">Latency: 1ms</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// PILLAR 2: SCALE - INTERACTIVE CANVASES
// ==========================================
const ScaleCanvas = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: "edge", label: "Edge CDN", x: 30, y: 90, color: "rgba(16, 185, 129, 0.8)", icon: Globe },
    { id: "gateway", label: "App Router", x: 120, y: 40, color: "rgba(20, 184, 166, 0.8)", icon: Activity },
    { id: "db", label: "Global DB", x: 210, y: 90, color: "rgba(16, 185, 129, 0.8)", icon: Server },
  ];

  return (
    <div className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] p-4 flex flex-col justify-between overflow-hidden group/canvas">
      {/* Topology Ambient Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 45 90 L 135 40 L 225 90" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" fill="none" />
        <path d="M 45 90 L 225 90" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
        
        {/* Pulsing Edge Particle stream */}
        <motion.circle
          r="3"
          fill="#10b981"
          animate={{
            pathLength: [0, 1],
            cx: [45, 135, 225],
            cy: [90, 40, 90]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.circle
          r="2.5"
          fill="#14b8a6"
          animate={{
            pathLength: [0, 1],
            cx: [225, 135, 45],
            cy: [90, 40, 90]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Topology Nodes */}
      <div className="absolute inset-0 w-full h-full flex justify-between items-center px-6">
        {nodes.map((node) => {
          const NodeIcon = node.icon;
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)"
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="flex flex-col items-center cursor-pointer group/node"
            >
              {/* Outer halo */}
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.4, 1] : 1,
                  opacity: isActive ? 0.4 : 0.15
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 pointer-events-none"
              />

              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 ${
                isActive 
                  ? "bg-slate-100 border-emerald-400 text-emerald-500 dark:bg-slate-800 dark:border-emerald-500" 
                  : "bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-white/10 dark:text-slate-400"
              }`}>
                <NodeIcon size={14} className={isActive ? "animate-pulse" : ""} />
              </div>

              <span className={`text-[8px] md:text-[9px] mt-1.5 font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive ? "text-emerald-500" : "text-slate-400 dark:text-slate-500"
              }`}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Latency Live Telemetry Overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 rounded bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[8px] md:text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Edge Routing</span>
        </div>
        <div className="text-[8px] md:text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
          {activeNode === "edge" && "Latency: 1.8ms • Hit 98.4%"}
          {activeNode === "gateway" && "Routing: edge-optimized"}
          {activeNode === "db" && "Uptime: 99.999% • Sync active"}
          {!activeNode && "Global RTT: 2.1ms • Healthy"}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PILLAR 3: GROW - INTERACTIVE CANVASES
// ==========================================
const GrowCanvas = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] p-4 flex flex-col justify-between overflow-hidden group/canvas cursor-default"
    >
      {/* Analytics Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 group-hover/canvas:opacity-75 transition-opacity duration-500" />

      {/* SVG Path Curve Warper */}
      <div className="relative w-full h-[80px] mt-4">
        <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(249,115,22,0.12)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
          </defs>

          {/* Shaded Area underneath the curve */}
          <motion.path
            d={isHovered ? "M 0 60 Q 75 10 230 4 Z" : "M 0 60 Q 75 45 230 35 Z"}
            fill="url(#areaGradient)"
            animate={{
              d: isHovered 
                ? "M 0 60 Q 75 10 230 4 L 230 80 L 0 80 Z" 
                : "M 0 60 Q 75 45 230 35 L 230 80 L 0 80 Z"
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          />

          {/* Stroke line */}
          <motion.path
            d={isHovered ? "M 0 60 Q 75 10 230 4" : "M 0 60 Q 75 45 230 35"}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            animate={{
              d: isHovered ? "M 0 60 Q 75 10 230 4" : "M 0 60 Q 75 45 230 35"
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          />

          {/* Glowing cursor pointer */}
          <motion.circle
            r="5"
            fill="#facc15"
            stroke="#f97316"
            strokeWidth="2"
            animate={{
              cx: 230,
              cy: isHovered ? 4 : 35
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="shadow-lg"
          />
        </svg>
      </div>

      {/* Analytics Counter metrics */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
        <div>
          <span className="block text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Conversion Boost</span>
          <motion.span className="text-sm md:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
            {isHovered ? "12.4x Growth" : "1.0x Baseline"}
          </motion.span>
        </div>

        <div className="text-right">
          <span className="block text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Sprints Complete</span>
          <span className="text-xs md:text-sm font-black text-slate-700 dark:text-slate-300">
            {isHovered ? "Bi-Weekly (100% On-time)" : "14 Days Dev Cycle"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CORE EXPORT COMPONENT
// ==========================================
export default function BuildScaleGrow() {
  const pillars = [
    {
      id: "build",
      title: "Build",
      gradient: "from-[#1A6DD6] to-[#00d2ff]",
      shadow: "shadow-[0_0_25px_rgba(26,109,214,0.06)] border-blue-500/10 dark:border-blue-500/20",
      accentGlow: "bg-blue-500/5",
      translateY: "md:translate-y-0",
      features: [
        {
          name: "Custom Software",
          description: "Tailored React, Next.js, and Node.js architectures precision-built for your business model.",
          Icon: Cpu,
          href: "/services",
          cta: "Build With Us",
        },
        {
          name: "MVP Engineering",
          description: "From idea to working product in weeks. Lean development with production-grade foundations.",
          Icon: Rocket,
          href: "/start",
          cta: "Start Building",
        }
      ],
      canvas: <BuildCanvas />
    },
    {
      id: "scale",
      title: "Scale",
      gradient: "from-[#10b981] to-[#14b8a6]",
      shadow: "shadow-[0_0_35px_rgba(16,185,129,0.08)] border-emerald-500/15 dark:border-emerald-500/25 scale-[1.01] z-20",
      accentGlow: "bg-emerald-500/10 dark:bg-emerald-500/5",
      translateY: "md:translate-y-6",
      features: [
        {
          name: "Cloud Infrastructure",
          description: "Auto-scaling AWS, Kubernetes, and edge-deployed infrastructure with 99.99% uptime.",
          Icon: Layers,
          href: "/architecture",
          cta: "Scale Up",
        },
        {
          name: "Enterprise Scale",
          description: "Multi-region deployments, read replicas, edge caching — architecture for millions of users.",
          Icon: ShieldCheck,
          href: "/services",
          cta: "Enterprise Plan",
        }
      ],
      canvas: <ScaleCanvas />
    },
    {
      id: "grow",
      title: "Grow",
      gradient: "from-[#f97316] to-[#facc15]",
      shadow: "shadow-[0_0_25px_rgba(249,115,22,0.06)] border-orange-500/10 dark:border-orange-500/20",
      accentGlow: "bg-orange-500/5",
      translateY: "md:-translate-y-4",
      features: [
        {
          name: "Growth Advisory",
          description: "Technical strategy, architecture reviews, and roadmaps to accelerate your product-market fit.",
          Icon: TrendingUp,
          href: "/insights",
          cta: "Grow Faster",
        },
        {
          name: "Fast Delivery",
          description: "Bi-weekly sprints, CI/CD pipelines, and transparent progress tracking. Ship with confidence.",
          Icon: Zap,
          href: "/start",
          cta: "Start Project",
        }
      ],
      canvas: <GrowCanvas />
    }
  ];

  return (
    <div className="relative w-full">
      {/* Floating backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[140px] bg-gradient-to-tr from-blue-500/5 via-emerald-500/5 to-orange-500/5 pointer-events-none opacity-40" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch relative z-10 pt-8 pb-12">
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
            className={`flex flex-col justify-between overflow-hidden rounded-[4px] border ${pillar.shadow} ${pillar.translateY} bg-white dark:bg-[#080d1a] backdrop-blur-xl p-6 hover:shadow-2xl transition-shadow duration-300 relative group`}
          >
            {/* Ambient inner panel highlight */}
            <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl ${pillar.accentGlow}`} />

            <div className="flex flex-col gap-6">
              {/* Header Title */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/5">
                <h3 className={`text-3xl font-black tracking-[-0.03em] font-sans bg-clip-text text-transparent bg-gradient-to-r ${pillar.gradient}`}>
                  {pillar.title}.
                </h3>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
              </div>

              {/* Dynamic Interactive SVG Canvas */}
              <div className="w-full">
                {pillar.canvas}
              </div>

              {/* Two Features Stacked */}
              <div className="flex flex-col gap-5 mt-2">
                {pillar.features.map((feature, fIndex) => {
                  const FeatIcon = feature.Icon;
                  return (
                    <div key={fIndex} className="group/item flex flex-col gap-2 relative">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                          pillar.id === "build" 
                            ? "bg-blue-500/5 border-blue-500/10 text-blue-500 group-hover/item:bg-blue-500/15" 
                            : pillar.id === "scale" 
                            ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500 group-hover/item:bg-emerald-500/15" 
                            : "bg-orange-500/5 border-orange-500/10 text-orange-500 group-hover/item:bg-orange-500/15"
                        }`}>
                          <FeatIcon size={15} className="transition-transform duration-300 group-hover/item:scale-110" />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover/item:text-[var(--brand-primary)]">
                            {feature.name}
                          </h4>
                          <p className="text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start pl-11">
                        <Link
                          href={feature.href}
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 group-hover/item:gap-2.5 ${
                            pillar.id === "build" 
                              ? "text-blue-500" 
                              : pillar.id === "scale" 
                              ? "text-emerald-500" 
                              : "text-orange-500"
                          }`}
                        >
                          <span>{feature.cta}</span>
                          <ArrowRight size={10} className="transition-transform duration-300 group-hover/item:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
