"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Enterprise Projects" },
  { value: "EduMaysan", label: "Flagship EdTech LMS" },
  { value: "FlashFashion", label: "Ecommerce Platform" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

export default function StatsSection() {
  return (
    <section className="content-auto pt-8 pb-6 md:pt-12 md:pb-8 bg-[var(--sec-bg-alt)] border-y border-[var(--sec-border)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.01] to-transparent pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const isMetric = /^[0-9.+%]+$/.test(stat.value.replace(/\s/g, ''));
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col items-center justify-center p-5 bg-[var(--surface-elevated)] hover:bg-[var(--surface-subtle)] dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-[var(--border-subtle)] dark:border-white/10 hover:border-brand-primary/40 dark:hover:border-brand-primary/40 rounded-2xl transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-md dark:shadow-none hover:-translate-y-1 cursor-default backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {isMetric ? (
                  <p className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light dark:from-brand-primary dark:to-[#00d2ff] mb-1 tracking-tight drop-shadow-[0_0_15px_rgba(26,109,214,0.15)] dark:drop-shadow-[0_0_15px_rgba(26,109,214,0.3)]">
                    {stat.value}
                  </p>
                ) : (
                  <p className="text-[10px] md:text-xs font-extrabold text-[var(--text-secondary)] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] dark:text-white dark:bg-white/[0.06] dark:border-white/10 rounded-full mb-1.5 px-3 py-0.5 shadow-inner tracking-wide uppercase">
                    {stat.value}
                  </p>
                )}
                <p className="text-[var(--text-secondary)] dark:text-slate-400 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold text-center group-hover:text-[var(--text-primary)] dark:group-hover:text-white transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
