"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import {
  Code2,
  Smartphone,
  ShoppingCart,
  Cloud,
  Workflow,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    desc: "Fast, scalable websites built with modern frameworks that grow with your business.",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform mobile applications that work seamlessly on iOS and Android.",
    icon: Smartphone,
    color: "from-purple-500 to-indigo-400",
  },
  {
    title: "E-Commerce",
    desc: "Online stores with automated order management, payments, and inventory.",
    icon: ShoppingCart,
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "Cloud Infrastructure",
    desc: "Secure, scalable hosting on AWS/Azure with enterprise-grade security.",
    icon: Cloud,
    color: "from-cyan-500 to-blue-400",
  },
  {
    title: "Custom Software",
    desc: "Tailored solutions built for your unique business requirements.",
    icon: Workflow,
    color: "from-orange-500 to-yellow-400",
  },
  {
    title: "AI & Automation",
    desc: "Smart automation and AI integration to streamline your operations.",
    icon: Sparkles,
    color: "from-green-500 to-emerald-400",
  },
];

export default function ServicesClient() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Code2 size={12} />
              Services
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white mb-6 leading-[1.05]">
              What we <span className="text-brand-primary">do</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl font-medium">
              We build scalable, high-performance software solutions for enterprises and fast-growing startups.
            </p>
            <Link href="/init" className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A6DD6] rounded-full font-bold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden text-left"
              >
                {/* Custom Gradient Neon Border on card hover */}
                <div className={`absolute -inset-px bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10`} />
                <div className="absolute inset-[1px] bg-[var(--bg-dark)] rounded-2xl -z-10" />

                <div className="w-12 h-12 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center text-white/50 mb-5 group-hover:bg-brand-primary/15 group-hover:text-brand-primary transition-all duration-300">
                  <service.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 group-hover:text-white/60 transition-colors duration-300">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1.5 text-brand-primary text-xs font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  <span>Learn more</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <ContactFooter />
    </main>
  );
}
