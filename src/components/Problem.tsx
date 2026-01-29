"use client";

import { AlertTriangle, Users, Database } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      title: "Dependency Fragility",
      text: "Modern systems often rely on a brittle chain of expensive plugins. When one breaks, your entire enterprise stalls.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "Siloed Operations",
      text: "Managing fragmented tools for CRM and ERP creates massive bottlenecks.",
      icon: <Users size={24} />,
    },
    {
      title: "Data Ownership",
      text: "Stop leasing your business intelligence. Own your data infrastructure completely.",
      icon: <Database size={24} />,
    },
  ];

  return (
    <section id="problem" className="py-24 bg-background">
      <div className="container">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
            The Diagnostic
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Systemic Infrastructure Failures
          </h2>
          <p className="text-xl text-muted-foreground">
            We identify the hidden fractures in your digital foundation before
            they become critical failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, index) => (
            <div
              key={index}
              className="p-8 border border-border rounded-lg bg-card/50 hover:bg-card transition-colors"
            >
              <div className="w-12 h-12 bg-destructive/10 text-destructive flex items-center justify-center rounded mb-6">
                {prob.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {prob.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {prob.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
