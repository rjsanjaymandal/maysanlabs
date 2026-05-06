"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
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
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium mb-6">
              Services
            </span>
            <h1 className="heading-lg text-white mb-6">
              What we <span className="text-brand-primary">do</span>
            </h1>
            <p className="text-white/45 max-w-xl mx-auto text-base">
              We build scalable, high-performance software solutions for enterprises and fast-growing startups.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
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
 
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-medium text-sm text-black hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-200">
              Start a Project
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
