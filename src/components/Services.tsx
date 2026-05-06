"use client";

import {
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight,
  Zap,
  Code2,
  Database,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "SaaS Development",
    desc: "Build recurring revenue with multi-tenant platforms, subscription billing, and user management.",
    icon: Cloud,
    features: ["Multi-tenant architecture", "Stripe/Payment integration", "Role-based access"],
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    title: "Enterprise Platforms",
    desc: "Scalable systems that grow with your business from thousands to millions of users.",
    icon: TrendingUp,
    features: ["Auto-scaling infrastructure", "High availability", "99.99% uptime SLA"],
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    title: "Custom Web Apps",
    desc: "Tailored solutions built for your specific business requirements and workflows.",
    icon: Code2,
    features: ["React/Next.js frontend", "Node.js backend", "REST & GraphQL APIs"],
    color: "from-green-500/20 to-green-600/10",
  },
  {
    title: "Cloud Infrastructure",
    desc: "AWS/Azure managed infrastructure with enterprise-grade security and monitoring.",
    icon: Database,
    features: ["DevOps & CI/CD", "Container orchestration", "24/7 monitoring"],
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    title: "Dashboard & Analytics",
    desc: "Real-time dashboards with custom metrics, reporting, and business intelligence.",
    icon: Layout,
    features: ["Custom visualizations", "Real-time data", "Export & scheduling"],
    color: "from-pink-500/20 to-pink-600/10",
  },
  {
    title: "API Development",
    desc: "Robust APIs that integrate with your existing tools and enable third-party connections.",
    icon: BarChart3,
    features: ["REST & GraphQL", "Webhooks", "Developer docs"],
    color: "from-cyan-500/20 to-cyan-600/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-brand-primary/10 to-transparent blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-gradient-to-l from-brand-primary/8 to-transparent blur-[60px] rounded-full pointer-events-none" />
      
      <div className="container-main relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <Zap size={12} />
              Services
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
          >
            Build with <span className="text-brand-primary">confidence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            End-to-end development for building scalable, enterprise-grade software that performs under pressure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group relative bg-white/[0.015] border border-white/[0.04] rounded-2xl p-6 hover:border-brand-primary/20 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-11 h-11 bg-white/[0.03] rounded-xl flex items-center justify-center text-white/40 mb-5 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all duration-300">
                  <service.icon size={20} />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {service.title}
                </h3>
                <p className="text-white/45 text-sm mb-4 leading-relaxed">
                  {service.desc}
                </p>
                
                <ul className="space-y-1.5 mb-5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/35 text-xs">
                      <div className="w-1 h-1 rounded-full bg-brand-primary/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-semibold group-hover:gap-2 transition-all"
                >
                  Learn more <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
