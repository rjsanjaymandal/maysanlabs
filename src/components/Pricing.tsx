"use client";

import { Check, Zap, Rocket, Shield, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

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
    icon: <Zap size={20} />,
  },
  {
    name: "Enterprise",
    price: "1,49,999",
    description: "Full-scale services for growing businesses with complex needs.",
    features: [
      "Custom CRM/ERP",
      "Advanced AI Tools",
      "24/7 Priority Support",
      "Cloud Space Setup",
      "Dedicated Project Manager",
    ],
    icon: <Rocket size={20} />,
    featured: true,
  },
  {
    name: "Secure Cloud",
    price: "24,999",
    description: "Specialized for CA, Legal firms, and data-sensitive entities.",
    features: [
      "Bank-level Encryption",
      "Document Management",
      "Automatic Backups",
      "Client Sharing Portal",
    ],
    icon: <Shield size={20} />,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="sec-xl bg-[#0d1117] relative overflow-hidden">
      {/* Background Accents */}
      <div className="radial-blur -top-40 -left-40 opacity-10" />
      
      <div className="container-main">
        <div className="mb-20 text-center">
          <span className="announcement-bar">Transparent Pricing</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mt-6">
            Scalable <span className="text-[#007AFF] italic">Solutions.</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto mt-6 font-medium">
            Transparent pricing models designed for enterprise precision and long-term stability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`maysan-card group flex flex-col h-full ${
                plan.featured ? "border-[#007AFF]/40 bg-[#007AFF]/5 lg:-mt-8 shadow-2xl relative z-10" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 left-0 -mt-3.5 flex justify-center">
                  <span className="bg-[#007AFF] text-white text-[10px] font-black px-4 py-1 rounded-full tracking-widest uppercase shadow-lg">
                    Highest_Priority
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                  plan.featured 
                  ? "bg-[#007AFF] text-white border-[#007AFF]/20 shadow-[0_0_20px_rgba(0,122,255,0.4)]" 
                  : "bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20 group-hover:bg-[#007AFF] group-hover:text-white"
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight uppercase">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-lg text-white/30 font-mono italic">₹</span>
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-xs text-white/30 font-mono uppercase tracking-widest ml-2">/ start</span>
              </div>

              <p className="text-sm text-white/40 mb-10 leading-relaxed font-medium">
                {plan.description}
              </p>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center text-[#007AFF]">
                      <Check size={12} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href="/init"
                className={`pill-btn w-full ${
                  plan.featured 
                  ? "pill-btn-primary" 
                  : "pill-btn-secondary"
                }`}
              >
                Book a Call
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
