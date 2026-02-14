"use client";

import { Check, Zap, Rocket, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49,999",
    description: "Perfect for agile startups and department-level pilots.",
    features: [
      "Custom Web Development",
      "Basic SEO Setup",
      "Standard Support",
      "Secure Hosting",
    ],
    icon: <Zap size={24} />,
    color: "hsl(var(--muted))",
  },
  {
    name: "Enterprise",
    price: "1,49,999",
    description: "Full-scale solutions for growing businesses.",
    features: [
      "Custom CRM/ERP",
      "Advanced AI Tools",
      "24/7 Priority Support",
      "Cloud Space Setup",
      "Dedicated Project Manager",
    ],
    icon: <Rocket size={24} />,
    color: "hsl(var(--primary))",
    featured: true,
  },
  {
    name: "Secure Cloud",
    price: "24,999",
    description: "Specialized for CA and Legal firms.",
    features: [
      "Bank-level Encryption",
      "Document Management",
      "Automatic Backups",
      "Client Sharing Portal",
    ],
    icon: <Shield size={24} />,
    color: "hsl(var(--accent))",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container">
        <div className="mb-16 text-center">
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
            Pricing Plans
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Scalable Solutions for Every Goal
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the package that fits your business needs. Transparent
            pricing, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Starter Plan */}
          <div className="p-8 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-muted rounded text-muted-foreground">
                {plans[0].icon}
              </div>
              <h3 className="text-2xl font-bold">{plans[0].name}</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-lg text-muted-foreground">₹</span>
              <span className="text-4xl font-bold">{plans[0].price}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plans[0].features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="p-0.5 rounded-full bg-muted-foreground/20 text-muted-foreground">
                    <Check size={12} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-border rounded font-semibold hover:bg-muted transition-colors">
              Select Plan
            </button>
          </div>

          {/* Enterprise Plan (Featured) */}
          <div className="p-8 border-2 border-primary rounded-lg bg-card relative shadow-2xl lg:-mt-8 lg:z-10 bg-gradient-to-b from-card to-primary/5">
            <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                Most Popular
              </span>
            </div>
            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="p-3 bg-primary rounded text-primary-foreground">
                {plans[1].icon}
              </div>
              <h3 className="text-2xl font-bold">{plans[1].name}</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-lg text-muted-foreground">₹</span>
              <span className="text-5xl font-bold text-primary">
                {plans[1].price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              {plans[1].description}
            </p>

            <ul className="space-y-4 mb-8">
              {plans[1].features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <div className="p-0.5 rounded-full bg-primary text-primary-foreground">
                    <Check size={12} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-primary text-primary-foreground rounded font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Implement This Stack
            </button>
          </div>

          {/* Secure Cloud Plan */}
          <div className="p-8 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-muted rounded text-muted-foreground">
                {plans[2].icon}
              </div>
              <h3 className="text-2xl font-bold">{plans[2].name}</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-lg text-muted-foreground">₹</span>
              <span className="text-4xl font-bold">{plans[2].price}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plans[2].features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="p-0.5 rounded-full bg-muted-foreground/20 text-muted-foreground">
                    <Check size={12} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-border rounded font-semibold hover:bg-muted transition-colors">
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
