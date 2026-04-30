"use client";

import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "E-Commerce",
      desc: "Online stores that scale with your sales.",
      icon: Store,
    },
    {
      title: "CRM Systems",
      desc: "Manage customers and automate tasks.",
      icon: TrendingUp,
    },
    {
      title: "Custom Apps",
      desc: "Built for your specific workflow.",
      icon: Cpu,
    },
    {
      title: "Cloud Infrastructure",
      desc: "Scalable hosting that never goes down.",
      icon: ShieldCheck,
    },
    {
      title: "Internal Tools",
      desc: "Dashboards that speed up your team.",
      icon: Layout,
    },
    {
      title: "Growth Engineering",
      desc: "SEO and data strategies that work.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="services" className="sec-xl relative overflow-hidden bg-background blueprint-grid">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 sm:mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <span className="label-mono mb-6 block">Capabilities</span>
            <h2 className="heading-lg sm:heading-xl text-silver-gradient">
               Precision <span className="text-brand-gradient italic">Engineering</span> <br />
               for Modern Business.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm"
          >
<p className="text-white/50 text-base sm:text-lg font-medium leading-relaxed border-l border-brand-primary/20 pl-8">
                 High-performance software at studio precision with enterprise scale.
              </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="maysan-card group flex flex-col justify-between min-h-[350px] sm:min-h-[400px]"
            >
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 shadow-2xl mb-8 sm:mb-12">
                  <service.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase mb-4 sm:mb-6 italic group-hover:text-brand-primary transition-colors duration-700">
                  {service.title}
                </h3>
                <p className="text-white/50 text-lg sm:text-xl font-medium leading-tight tracking-tighter uppercase">
                  {service.desc}
                </p>
              </div>

              <div className="mt-12 flex justify-between items-end">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Studio_0{index + 1}</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-700">
                   <ArrowUpRight size={18} className="group-hover:text-brand-primary transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
