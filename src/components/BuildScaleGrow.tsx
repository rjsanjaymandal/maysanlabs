"use client";

import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Rocket, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// ==========================================
// PILLAR 1: BUILD — SIMPLE LAYERED VISUAL
// ==========================================
const BuildCanvas = () => (
  <div className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(26,109,214,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,109,214,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
    <div className="relative z-10 flex flex-col justify-center h-full gap-2.5 px-4">
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Your Website</span>
      </div>
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-cyan-500" />
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Business Dashboard</span>
      </div>
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-indigo-500" />
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Secure Database</span>
      </div>
    </div>
  </div>
);

// ==========================================
// PILLAR 2: SCALE — SIMPLE NODE VISUAL
// ==========================================
const ScaleCanvas = () => (
  <div className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <polygon points="100,25 30,110 170,110" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
    </svg>
    <div className="absolute inset-0">
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-400/30" />
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1">Smart Traffic</span>
      </div>
      <div className="absolute bottom-5 left-[15%] flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-400/30" />
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1">Fast Worldwide</span>
      </div>
      <div className="absolute bottom-5 right-[15%] flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-400/30" />
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1">Secure Backups</span>
      </div>
    </div>
  </div>
);

// ==========================================
// PILLAR 3: GROW — SIMPLE BAR CHART VISUAL
// ==========================================
const GrowCanvas = () => (
  <div className="relative w-full h-[180px] rounded-lg bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/[0.04] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
    <div className="relative z-10 flex items-end justify-center h-full gap-3 pb-8">
      <div className="w-10 h-[40%] rounded-t-lg bg-gradient-to-t from-orange-500/20 to-orange-400/10 border border-orange-500/10" />
      <div className="w-10 h-[65%] rounded-t-lg bg-gradient-to-t from-orange-500/30 to-orange-400/15 border border-orange-500/15" />
      <div className="w-10 h-[90%] rounded-t-lg bg-gradient-to-t from-orange-500/40 to-orange-400/20 border border-orange-500/20" />
    </div>
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3">
      <span className="text-[8px] text-slate-400 dark:text-slate-500 w-10 text-center font-medium">Start</span>
      <span className="text-[8px] text-slate-400 dark:text-slate-500 w-10 text-center font-medium">Growth</span>
      <span className="text-[8px] text-slate-400 dark:text-slate-500 w-10 text-center font-medium">Scale</span>
    </div>
  </div>
);

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
          description: "Bespoke, premium websites and custom tools designed specifically for your unique business goals.",
          Icon: Cpu,
          href: "/services",
          cta: "Build With Us",
        },
        {
          name: "MVP Engineering",
          description: "Launch your product idea in weeks. We build a simple, working version to test with your real clients.",
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
          description: "Secure, reliable cloud hosting with automatic daily backups. Your website is always open and fast.",
          Icon: Layers,
          href: "/architecture",
          cta: "Scale Up",
        },
        {
          name: "Enterprise Scale",
          description: "Built to handle millions of visitors smoothly. Fast loading times no matter where your customers are.",
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
          description: "Expert strategy, roadmap planning, and reviews to help you scale your business and find more customers.",
          Icon: TrendingUp,
          href: "/insights",
          cta: "Grow Faster",
        },
        {
          name: "Fast Delivery",
          description: "Fast updates, transparent progress tracking, and bi-weekly checkpoints. We keep you involved at every step.",
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
          <div
            key={pillar.id}
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
          </div>
        ))}
      </div>
    </div>
  );
}
