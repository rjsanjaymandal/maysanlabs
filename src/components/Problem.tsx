"use client";

import { AlertTriangle, Users, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Problem() {
  const problems = [
    {
      title: "Dependency Fragility",
      text: "Modern systems often rely on a brittle chain of expensive plugins. When one breaks, your entire enterprise stalls.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "Siloed Operations",
      text: "Managing fragmented tools for CRM and ERP creates massive bottlenecks and data blind spots.",
      icon: <Users size={24} />,
    },
    {
      title: "Data Ownership",
      text: "Stop leasing your business intelligence. Own your data infrastructure completely.",
      icon: <Database size={24} />,
    },
  ];

  return (
    <section id="problem" className="py-24 bg-background relative noise-bg">
      <div className="container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="section-label">The Diagnostic</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Systemic Infrastructure Failures
          </h2>
          <p className="text-lg text-muted-foreground">
            We identify the hidden fractures in your digital foundation before
            they become critical failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card gradient-border p-8 glow-hover"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-destructive/10 text-destructive flex items-center justify-center rounded-lg mb-6">
                  {prob.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {prob.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {prob.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
