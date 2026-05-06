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
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform mobile applications that work seamlessly on iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "E-Commerce",
    desc: "Online stores with automated order management, payments, and inventory.",
    icon: ShoppingCart,
  },
  {
    title: "Cloud Infrastructure",
    desc: "Secure, scalable hosting on AWS/Azure with enterprise-grade security.",
    icon: Cloud,
  },
  {
    title: "Custom Software",
    desc: "Tailored solutions built for your unique business requirements.",
    icon: Workflow,
  },
  {
    title: "AI & Automation",
    desc: "Smart automation and AI integration to streamline your operations.",
    icon: Sparkles,
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              What we <span className="text-brand-primary">do</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl">
              We build scalable, high-performance software solutions for enterprises and fast-growing startups.
            </p>
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-primary/85 rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              Start a Project <ArrowRight size={16} />
            </Link>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-11 h-11 bg-white/5 rounded-lg flex items-center justify-center text-white/60 mb-4 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all duration-200">
                  <service.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
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
