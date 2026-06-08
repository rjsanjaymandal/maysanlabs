"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Smartphone, BarChart3, Workflow, Shield } from "lucide-react";

const offerings = [
  {
    icon: Code,
    title: "Custom Web Apps",
    description: "React, Next.js, Node.js — full-stack applications built for scale",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS, Azure, GCP — secure, auto-scaling architecture",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Engineering",
    description: "React Native, Flutter — cross-platform apps with native performance",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description: "Custom workflows, CRM integration, ERP modernization",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: BarChart3,
    title: "Data & Dashboards",
    description: "Real-time analytics, BI tools, reporting pipelines",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "SOC2, GDPR, HIPAA — enterprise-grade security baked in",
    color: "from-indigo-500 to-blue-400",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 md:py-20 border-t border-gray-100 dark:border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.01] to-transparent pointer-events-none" />
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            What <span className="text-brand-primary">We Deliver</span>
          </h2>
          <p className="text-foreground/50 mt-3 max-w-xl mx-auto text-sm md:text-base">
            End-to-end software engineering for ambitious teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offerings.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-brand-primary/30 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                <item.icon size={18} className="text-white" />
              </div>
              <h3 className="text-foreground font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-foreground/40 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
