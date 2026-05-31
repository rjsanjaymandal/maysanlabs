"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import RoiCalculator from "@/components/ROICalculator";
import FAQ from "@/components/FAQ";
import { Check, Zap, Rocket, Shield, ArrowRight, IndianRupee } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "2,50,000",
    description: "Perfect for early-stage startups validating their product-market fit.",
    features: [
      "Custom Web Development",
      "Basic SEO Setup",
      "Standard Support (Email)",
      "Secure Hosting Setup",
      "1 Revision Cycle",
    ],
    icon: Zap,
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Growth",
    price: "5,00,000",
    description: "Built for scaling businesses ready to invest in robust infrastructure.",
    features: [
      "Custom Web / Mobile Development",
      "Advanced SEO & Analytics",
      "Priority Support (Email + Chat)",
      "Cloud Infrastructure (AWS/Azure)",
      "API Integrations (up to 3)",
      "Monthly Strategy Calls",
    ],
    icon: Rocket,
    color: "from-brand-primary to-brand-light",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "12,00,000",
    description: "Full-scale engineering partnerships for high-growth enterprises.",
    features: [
      "Custom SaaS / ERP / CRM Development",
      "AI & Automation Integration",
      "24/7 Priority Support",
      "Dedicated Project Manager",
      "Custom Cloud Architecture",
      "Unlimited Revisions",
      "SLA Guarantees",
    ],
    icon: Shield,
    color: "from-[#10b981] to-[#14b8a6]",
  },
];

export default function PricingClient() {
  return (
    <main id="main-content" aria-label="Maysan Labs Pricing" className="bg-background min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      
      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="container-main relative">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <IndianRupee size={12} />
              Pricing
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground mb-6 leading-[1.05]">
              Plans that <span className="text-brand-primary">scale</span> with you
            </h1>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl">
              Transparent monthly pricing. No hidden fees. Start small and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`bg-white/70 dark:bg-white/[0.02] border rounded-2xl p-8 flex flex-col h-full relative transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md ${
                    plan.featured
                      ? "border-brand-primary/40 bg-brand-primary/[0.03] lg:-mt-8 shadow-lg"
                      : "border-gray-100 dark:border-white/[0.06]"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center -mt-3.5">
                      <span className="bg-brand-primary text-white text-[10px] font-extrabold px-4 py-1 rounded-full tracking-widest uppercase shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${plan.color}`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-bold text-brand-primary">₹{plan.price}</span>
                    <span className="text-xs text-foreground/30 font-mono uppercase tracking-widest">/ mo</span>
                  </div>

                  <p className="text-sm text-foreground/50 mb-8 leading-relaxed">{plan.description}</p>

                  <ul className="space-y-3.5 mb-10 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                        <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                          <Check size={10} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/start"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-colors ${
                      plan.featured
                        ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                        : "bg-white/80 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-foreground hover:bg-white dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RoiCalculator />

      <FAQ />
      <ContactFooter />
    </main>
  );
}