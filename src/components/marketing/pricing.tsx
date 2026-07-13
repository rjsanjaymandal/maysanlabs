"use client";

import { Check, Zap, Rocket, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BorderBeam from "@/components/ui/border-beam";

const plans = [
  {
    name: "Starter",
    price: "₹49,999",
    description: "Custom web apps, automation tools, and dashboards — perfect for startups and small teams.",
    features: [
      "Custom Web Development",
      "Business Automation Tools",
      "Standard Support",
      "Secure Cloud Hosting",
    ],
    icon: <Zap size={20} />,
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "₹1,49,999",
    description: "Full-scale engineering for growing businesses — CRM, AI tools, mobile apps, and more.",
    features: [
      "Custom CRM / ERP Systems",
      "AI & Machine Learning",
      "Mobile Apps (iOS + Android)",
      "24/7 Priority Support",
      "Dedicated Project Manager",
    ],
    icon: <Rocket size={20} />,
    featured: true,
    cta: "Book a Strategy Call",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="sec-xl relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className="mb-16 sm:mb-20 text-center">
          <span className="badge-section mb-6 inline-flex">Pricing</span>
          <h2 className="heading-lg text-foreground mt-4">
            Transparent,{" "}
            <span className="text-gradient-brand">scalable</span> pricing
          </h2>
          <p className="text-foreground/60 text-sm md:text-base max-w-xl mx-auto mt-4 font-medium">
            Enterprise-grade engineering. No hidden costs. All prices in INR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`maysan-card group flex flex-col h-full relative overflow-hidden ${
                plan.featured ? "border-brand-primary/40 bg-brand-primary/5 shadow-xl z-10" : ""
              }`}
            >
              {plan.featured && (
                <>
                  <BorderBeam size={250} duration={12} delay={9} />
                  <div className="absolute top-0 right-0 left-0 -mt-3.5 flex justify-center">
                    <span className="bg-gradient-to-r from-brand-primary to-brand-light text-white text-xs font-bold px-4 py-1 rounded-lg tracking-wide uppercase shadow-lg shadow-brand-primary/30 z-10">
                      Most Popular
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  plan.featured
                    ? "bg-brand-primary text-white border-brand-primary/20"
                    : "bg-brand-primary/10 text-brand-primary border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-white"
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black tracking-tight text-foreground">{plan.price}</span>
                <span className="text-xs text-foreground/40 font-medium uppercase tracking-wider ml-1">per project</span>
              </div>

              <p className="text-sm text-foreground/60 mb-8 leading-relaxed font-medium">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                    <Check size={14} className="text-brand-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/start"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all ${
                  plan.featured
                    ? "bg-gradient-to-r from-brand-primary to-brand-light text-white hover:shadow-lg hover:shadow-brand-primary/25"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {plan.cta}
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


