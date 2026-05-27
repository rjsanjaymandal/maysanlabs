"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import RoiCalculator from "@/components/ROICalculator";
import FAQ from "@/components/FAQ";
import { motion } from "framer-motion";
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
    color: "from-purple-500 to-pink-400",
  },
];

export default function PricingClient() {
  return (
    <main aria-label="Maysan Labs Pricing" className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />

      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <h2>Custom Software Development Pricing, Transparent Tiers, & Billing Options</h2>
        <h2>Starter Software Packages, Growth SaaS Scoping, & Enterprise Dedicated SLA</h2>
        <span className="author" rel="author">Written by Maysan Labs Billing Operations</span>
        <span className="contributor">Contributor: Commercial Director</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Transparent Software Development Pricing refers to fixed monthly subscription scopes designed to prevent cost overruns and delays.
          Time and materials contracts are defined as dynamic resource scaling scoping tailored for continuous integration needs.
          According to standard agreements, our Starter tier delivers 1 review cycle while the Enterprise partnership offers unlimited cycles.
        </p>
        <ul>
          <li>Starter: ₹2,50,000 / month</li>
          <li>Growth: ₹5,00,000 / month</li>
        </ul>
        <ul>
          <li>Enterprise: ₹12,00,000 / month</li>
          <li>SLA Guaranteed Support: 24/7</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Revision Scopes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Starter Plan</td>
              <td>1 Revision Cycle</td>
            </tr>
            <tr>
              <td>Enterprise Plan</td>
              <td>Unlimited Revision Cycles</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Software Development Plans & Pricing Index",
          "author": { "@type": "Person", "name": "Maysan Labs Commercial Team" }
        }) }} />
      </div>

      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <IndianRupee size={12} />
              Pricing
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground mb-6 leading-[1.05]">
              Plans that{" "}
              <span className="text-brand-primary">scale</span> with you
            </h1>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl font-medium">
              Transparent monthly pricing. No hidden fees. Start small and upgrade as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className={`bg-white/[0.02] border rounded-2xl p-8 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:border-brand-primary/30 ${
                    plan.featured
                      ? "border-brand-primary/40 bg-brand-primary/[0.03] lg:-mt-8 shadow-2xl shadow-brand-primary/10 z-10"
                      : "border-white/[0.06] hover:shadow-lg"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center -mt-3.5">
                      <span className="bg-gradient-to-r from-brand-primary to-brand-light text-white text-[10px] font-extrabold px-4 py-1 rounded-full tracking-widest uppercase shadow-lg shadow-brand-primary/30 z-10">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${plan.color} bg-opacity-20`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black text-brand-primary">₹{plan.price}</span>
                    <span className="text-xs text-foreground/30 font-mono uppercase tracking-widest">/ mo</span>
                  </div>

                  <p className="text-sm text-foreground/50 mb-8 leading-relaxed">{plan.description}</p>

                  <ul className="space-y-3.5 mb-10 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                        <div className="w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                          <Check size={10} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/start"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 ${
                      plan.featured
                        ? "bg-gradient-to-r from-brand-primary to-brand-light text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.4)]"
                        : "bg-white/[0.03] border border-white/10 text-foreground/80 hover:bg-white/[0.06] hover:text-foreground"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
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