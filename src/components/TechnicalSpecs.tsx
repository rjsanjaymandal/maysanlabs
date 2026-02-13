"use client";

import { Cpu, Zap, Shield, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

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
    <section id="tech-specs" className="py-24 relative noise-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10">
        <div className="mb-16">
          <span className="section-label">System Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            The Engineering Standard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We don&apos;t just build apps. We engineer robust, enterprise-grade
            digital foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SpotlightCard
                className={`glass-card gradient-border p-8 glow-hover group ${
                  index < 2 ? "md:p-10" : ""
                }`}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center rounded-lg group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {spec.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {spec.text}
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
