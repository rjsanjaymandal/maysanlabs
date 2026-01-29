"use client";

import { Cpu, Zap, Shield, Smartphone } from "lucide-react";

export default function TechnicalSpecs() {
  const specs = [
    {
      title: "Core Stack",
      text: "MERN Framework (React, Node.js) for ultra-low latency operations.",
      icon: <Cpu size={24} />,
    },
    {
      title: "Next.js 15 Engine",
      text: "Cutting-edge SSR and partial pre-rendering for unmatched speed and SEO dominance.",
      icon: <Zap size={24} />,
    },
    {
      title: "Encrypted Protocol",
      text: "Bank-level security layers integrated at the core of every transaction.",
      icon: <Shield size={24} />,
    },
    {
      title: "Cloud Distribution",
      text: "High-availability edge network ensuring your tools are always online.",
      icon: <Smartphone size={24} />,
    },
  ];

  return (
    <section
      id="tech-specs"
      className="py-24 bg-secondary/20 border-t border-border"
    >
      <div className="container">
        <div className="mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-2 block">
            System Architecture
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            The Engineering Standard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We don&apos;t just build apps. We engineer robust, enterprise-grade
            digital foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded mb-6">
                {spec.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {spec.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {spec.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
