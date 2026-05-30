"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Zap, CheckCircle } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "SSL Secured",
    description: "256-bit encryption for all data",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical assistance",
    color: "from-blue-500 to-[#00d2ff]",
  },
  {
    icon: Zap,
    title: "99.9% Uptime",
    description: "Guaranteed service availability",
    color: "from-orange-500 to-amber-600",
  },
];

const stats = [
  { value: "50+", label: "Enterprise Projects" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function TrustBadges() {
  return (
    <section className="py-16 border-t border-[var(--sec-border)] bg-[var(--sec-bg)]">
      <div className="container-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <CheckCircle size={12} />
            Trusted & Certified
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Why Businesses <span className="text-brand-primary">Trust Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-xl p-4 sm:p-5 hover:border-white/10 transition-all group text-center"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg mx-auto`}>
                <badge.icon size={18} className="text-white" />
              </div>
              <h3 className="text-foreground font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-foreground/40 text-xs">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[var(--sec-border)]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary mb-1">
                {stat.value}
              </div>
              <div className="text-foreground/40 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
