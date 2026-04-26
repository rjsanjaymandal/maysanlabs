"use client";

import { Cpu, ShieldAlert, Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Problem() {
  const architectures = [
    {
      id: "AI_RELIABLE",
      title: "Reliable AI",
      text: "We build AI that works every time, without mistakes, following your specific business rules.",
      icon: <Cpu size={24} />,
    },
    {
      id: "DATA_SECURE",
      title: "Safe Data",
      text: "You own your data. We keep it safe and private in systems only you control.",
      icon: <ShieldAlert size={24} />,
    },
    {
      id: "SPEED_SCALE",
      title: "Build Faster",
      text: "Don't let old code slow you down. We build modern apps that get you results faster.",
      icon: <Activity size={24} />,
    },
  ];

  return (
    <section id="architecture" className="sec-xl relative overflow-hidden bg-background">
      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row items-baseline justify-between mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="label-mono !mb-8 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              What we solve
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-12 uppercase">
              Old software <br />
              <span className="text-brand-primary italic">holds you back.</span>
            </h2>
            <p className="text-2xl text-white/40 font-medium mb-12 tracking-tight">
              Slow systems shouldn't stop your business. <br className="hidden md:block" /> 
              We build fast, modern apps that help your team do more.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:max-w-xs border-l border-white/5 pl-8"
          >
            <p className="text-sm font-medium text-white/20 leading-loose uppercase tracking-widest">
              We help you move faster by building reliable systems that are ready for the future.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {architectures.map((arch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="maysan-card group flex flex-col justify-between !p-12 hover:bg-white/[0.04] transition-all duration-700"
            >
              <div>
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 shadow-2xl">
                    {arch.icon}
                  </div>
                </div>
                
                <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase leading-none text-white group-hover:text-brand-primary transition-colors duration-700 italic">
                  {arch.title}
                </h3>
                <p className="text-white/40 text-lg leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-700">
                  {arch.text}
                </p>
              </div>

              <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
                 <ArrowUpRight size={24} className="text-brand-primary/20 group-hover:text-brand-primary transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
