"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import OperationsRoadmap from "@/components/OperationsRoadmap";
import { Layers, Code, Zap, Store, TrendingUp, BarChart3 } from "lucide-react";

export default function SolutionsPage() {
  const offerings = [
    {
      icon: <Store size={24} />,
      title: "Enterprise Commerce Architecture",
      description:
        "End-to-end e-commerce solutions including design, development, and deployment of secure, scalable platforms with integrated payment systems.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Customer Relationship Module",
      description:
        "Comprehensive CRM designed to manage customer interactions, centralized data, and automation to improve satisfaction and retention.",
    },
    {
      icon: <Code size={24} />,
      title: "Customized Software Solutions",
      description:
        "Tailor-made applications designed to align with organizational workflows and enhance operational performance and long-term growth.",
    },
    {
      icon: <Layers size={24} />,
      title: "Cloud Solutions",
      description:
        "Secure storage and high-redundancy processing on scalable cloud infrastructure, including migration and ongoing management.",
    },
    {
      icon: <Zap size={24} />,
      title: "Employee Management Module",
      description:
        "Streamlined human resource operations including attendance, performance tracking, payroll integration, and reporting.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Digital & Performance Marketing",
      description:
        "Measurable brand visibility and audience engagement across digital channels. *Marketing shoots conducted in Jaipur and Chandigarh.*",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        label="OPS READY"
        title="DEPLOYMENT SOLUTIONS"
        subtitle="Scalable digital infrastructure engineered for the modern SaaS enterprise. We build the infrastructure, you dominate the market."
      />

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, i) => (
              <div
                key={i}
                className="p-8 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {offering.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-muted/5">
        <div className="container">
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
              Core Mapping
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              Technical Infrastructure
            </h2>
          </div>
          {/* BlueprintGrid simplified text placeholder */}
          <div className="p-12 border border-border border-dashed rounded-lg text-center bg-card/50">
            <p className="text-muted-foreground">
              Infrastructure Blueprint Visualization
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Rendered via Edge Compute
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
              Execution Protocol
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              The Operations Roadmap
            </h2>
          </div>
          <OperationsRoadmap />
        </div>
      </section>

      <TechnicalSpecs />

      <ContactFooter />
    </main>
  );
}
