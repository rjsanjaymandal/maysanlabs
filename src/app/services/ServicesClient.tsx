"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Web Engineering",
    desc: "Fast, scalable websites that grow with you.",
    icon: <Store size={24} />,
    tag: "SCALE_V1"
  },
  {
    title: "App Development",
    desc: "Mobile apps that work seamlessly everywhere.",
    icon: <Cpu size={24} />,
    tag: "CROSS_PLATFORM"
  },
  {
    title: "E-Commerce",
    desc: "Online stores with automated order management.",
    icon: <TrendingUp size={24} />,
    tag: "RETAIL_STACK"
  },
  {
    title: "Cloud Services",
    desc: "Secure hosting that keeps your data safe.",
    icon: <ShieldCheck size={24} />,
    tag: "SECURE_INFRA"
  },
  {
    title: "Custom Software",
    desc: "Built for your unique business needs.",
    icon: <Layout size={24} />,
    tag: "ENTERPRISE_ERP"
  },
  {
    title: "AI Solutions",
    desc: "Smart AI that follows your rules.",
    icon: <BarChart3 size={24} />,
    tag: "AI_MODELS"
  },
];

export default function ServicesClient() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-20 opacity-10" />

      {/* Hero Section */}
      <section className="sec-xl relative overflow-hidden flex items-center min-h-[60vh]">
        <div className="container-main relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <span className="label-mono mb-8 block">Our Services</span>
            <h1 className="heading-xl mt-8 mb-12">
              Book a <span className="text-brand-primary italic">Call.</span>
            </h1>
            <p className="text-body-dim max-w-2xl mx-auto mt-6 text-xl md:text-2xl font-medium leading-relaxed">
              Software that connects your operations and scales with your business.
            </p>
          </motion.div>
 
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="maysan-card group flex flex-col justify-between"
              >
                <div>
                   <div className="w-14 h-14 bg-brand-primary/10 rounded-[var(--radius-md)] flex items-center justify-center mb-10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-lg">
                     {service.icon}
                   </div>
                   <label className="block label-mono mb-4 text-brand-primary/60">
                      Protocol_{service.tag}
                   </label>
                   <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-brand-primary transition-colors italic"> {service.title}</h3>
                   <p className="text-body-dim text-sm leading-relaxed font-medium">{service.desc}</p>
                </div>
                
                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                   <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">{service.tag}</span>
                   <ArrowUpRight size={14} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-all font-black" />
                </div>
              </motion.div>
            ))}
          </div>
 
          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border-t border-white/5"
          >
            <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] mx-auto group">
              <span>Book a Strategy Call</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
