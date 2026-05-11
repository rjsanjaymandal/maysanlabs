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
    <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/[0.015] to-transparent" />
      
      <div className="container-main relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium">
              <Zap size={12} />
              Services
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-white mb-3"
          >
            Build with <span className="text-brand-primary">confidence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-sm md:text-base max-w-lg mx-auto"
          >
            End-to-end development for building scalable, enterprise-grade software.
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
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-brand-primary/20 hover:bg-brand-primary/[0.02] transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary/70 mb-4 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all duration-300">
                  <service.icon size={18} />
                </div>
                
                <h3 className="text-base font-medium text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm mb-3.5 leading-relaxed">
                  {service.desc}
                </p>
                
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/40 text-xs">
                      <div className="w-0.5 h-0.5 rounded-full bg-brand-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-1 text-brand-primary text-xs font-medium group-hover:gap-1.5 transition-all"
                >
                  Learn more <ArrowUpRight size={10} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
