"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Enterprise Projects", subtitle: "Delivered on time & on budget" },
  { value: "99.9%", label: "Uptime Guaranteed", subtitle: "Enterprise SLA across all deployments" },
  { value: "12+", label: "Years Experience", subtitle: "Building production-grade software" },
  { value: "100%", label: "Client Satisfaction", subtitle: "Long-term partnerships since day one" },
];

export default function StatsSection() {
  return (
    <section className="py-10 md:py-14 border-y border-gray-100 dark:border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] to-transparent pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 dark:bg-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-white dark:bg-[#0c1125] text-center"
            >
              <p className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light mb-1 tracking-tight">
                {stat.value}
              </p>
              <p className="text-foreground/80 text-sm md:text-base font-semibold mb-0.5">
                {stat.label}
              </p>
              <p className="text-foreground/40 text-[11px] md:text-xs leading-relaxed max-w-[180px]">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
