"use client";

import React from "react";
import { Search, FileText, Cpu, Rocket, ShieldCheck } from "lucide-react";

const stages = [
  {
    tag: "STG_01",
    title: "AUDIT & EXTRACT",
    desc: "Comprehensive diagnostic of existing digital infrastructure and pain points.",
    icon: <Search size={24} />,
  },
  {
    tag: "STG_02",
    title: "BLUEPRINT PHASE",
    desc: "Architecting modular solutions tailored for technical dominance.",
    icon: <FileText size={24} />,
  },
  {
    tag: "STG_03",
    title: "CORE CONSTRUCTION",
    desc: "Agile build cycles with deep-tech integration and real-time testing.",
    icon: <Cpu size={24} />,
  },
  {
    tag: "STG_04",
    title: "DEPLOY ORBIT",
    desc: "Seamless transition to live environments with 24/7 telemetry monitoring.",
    icon: <Rocket size={24} />,
  },
  {
    tag: "STG_05",
    title: "ELITE MAINTENANCE",
    desc: "Ongoing optimization and scaling for sustained enterprise growth.",
    icon: <ShieldCheck size={24} />,
  },
];

export default function OperationsRoadmap() {
  return (
    <div className="relative py-12">
      <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-ml-px" />
      <div className="space-y-12">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`relative flex items-center md:justify-between ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Dot/Marker */}
            <div className="absolute left-0 w-14 h-14 flex items-center justify-center bg-background border border-border rounded-full z-10 md:left-1/2 md:-ml-7">
              <div className="text-primary">{stage.icon}</div>
            </div>

            {/* Content Spacer for standard layout */}
            <div className="hidden md:block w-5/12" />

            {/* Content Box */}
            <div className="ml-20 md:ml-0 w-full md:w-5/12 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
              <span className="text-xs font-mono text-primary uppercase tracking-wider mb-2 block">
                {stage.tag}
              </span>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {stage.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stage.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
