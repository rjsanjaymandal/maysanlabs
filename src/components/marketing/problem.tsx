"use client";

import { Cpu, ShieldCheck, Rocket, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const architectures = [
  {
    id: "AUTOMATED_SYSTEMS",
    title: "Manual Spreadsheets to Automated Systems",
    text: "Stop copying details between Excel sheets. We replace manual tasks with custom software, linking automated WhatsApp alerts, email billing, and inventory tracking.",
    icon: Cpu,
    href: "/services",
  },
  {
    id: "MODERN_WEB_APPS",
    title: "Legacy Software to Modern Websites & Portals",
    text: "Refactor old, slow legacy systems. We build lightning-fast, secure Next.js websites and web applications featuring role-based logins, custom dashboards, and encrypted cloud storage.",
    icon: ShieldCheck,
    href: "/services/web",
  },
  {
    id: "STARTUP_MVPS",
    title: "Unfinished Ideas to Working MVPs & Sites",
    text: "Launch your custom website or app in weeks, not months. We engineer lightweight, high-performance MVPs so you can gather real feedback and scale securely.",
    icon: Rocket,
    href: "/start",
  },
  {
    id: "MOBILE_APPS",
    title: "Websites to Cross-Platform Mobile Apps",
    text: "Extend your web presence with native iOS and Android apps. We build cross-platform mobile apps that sync seamlessly with your website and backend systems.",
    icon: Smartphone,
    href: "/services",
  },
];

export default function Problem() {
  return (
    <section id="architecture" className="py-16 md:py-20 border-t border-gray-100 dark:border-white/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.01] to-transparent pointer-events-none" />
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="badge-section mb-5">
            What We Solve
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4">
            Outdated websites, spreadsheets & old code <span className="text-brand-primary">slow you down</span>
          </h2>
          <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-2xl">
            We design and build custom websites, internal tools, and full-scale applications that replace outdated systems and launch new ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {architectures.map((arch, index) => {
            const Icon = arch.icon;
            return (
              <motion.div
                key={arch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={arch.href}
                  className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-brand-primary/30 rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-5 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors duration-300">
                    {arch.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed flex-1 group-hover:text-foreground/70 transition-colors duration-300">
                    {arch.text}
                  </p>

                  <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-brand-primary/50 group-hover:text-brand-primary transition-colors duration-300">
                    <span>Learn more</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
