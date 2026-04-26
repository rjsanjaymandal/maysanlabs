"use client";

import React from "react";
import { Search, Package, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Analyze",
    desc: "We look at your current systems to find exactly what needs to be fixed and improved.",
    icon: <Search className="text-brand-primary" size={20} />,
  },
  {
    number: "02",
    title: "Build",
    desc: "We ship new features every week, so you always see progress as we build your product.",
    icon: <Package className="text-brand-primary" size={20} />,
  },
  {
    number: "03",
    title: "Launch",
    desc: "We launch your app and make sure it stays fast and reliable for all your users.",
    icon: <Zap className="text-brand-primary" size={20} />,
  }
];

export default function OperationsRoadmap() {
  return (
    <section className="sec-xl container-main">
      <div className="text-center mb-32">
        <div className="label-mono mb-6 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
          Our process
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          How we <span className="text-brand-primary italic">work.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group maysan-card !rounded-3xl relative h-full flex flex-col justify-between"
          >
            {/* Background Number */}
            <div className="absolute top-0 right-0 font-black text-[120px] leading-none text-white/5 select-none transition-all duration-700 group-hover:text-brand-primary/10 pointer-events-none -translate-y-8 translate-x-4 italic">
              {step.number}
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-lg mb-10">
                {step.icon}
              </div>
              
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase group-hover:text-brand-primary transition-colors duration-500 italic">
                {step.title}
              </h3>
              
              <p className="text-white/40 leading-relaxed font-medium text-lg">
                {step.desc}
              </p>
            </div>

            <div className="mt-12 flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 relative z-10">
              <span>Next Step</span>
              <ArrowRight size={16} />
            </div>

            {/* Connecting line for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-white/5 group-hover:bg-brand-primary/30 transition-colors" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Industrial Footer Line */}
      <div className="mt-40 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
