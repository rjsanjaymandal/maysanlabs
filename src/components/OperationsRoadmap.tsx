"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Layers, 
  Code2, 
  Rocket
} from "lucide-react";

const stages = [
  {
    tag: "Phase_01",
    title: "Discovery",
    desc: "We analyze your needs and build a solid foundation.",
    icon: Search,
  },
  {
    tag: "Phase_02",
    title: "Architecture",
    desc: "Scalable designs that handle growth effortlessly.",
    icon: Layers,
  },
  {
    tag: "Phase_03",
    title: "Development",
    desc: "Fast execution with clean, performant code.",
    icon: Code2,
  },
  {
    tag: "Phase_04",
    title: "Deployment",
    desc: "Seamless launch with monitoring for zero downtime.",
    icon: Rocket,
  },
];

export default function OperationsRoadmap() {
  return (
    <section className="sec-xl relative overflow-hidden bg-background">
      <div className="container-main mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label-mono mb-4 md:mb-6 block">Execution Cycle</span>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Our <span className="text-brand-primary italic">Process</span> <br />
            Flow.
          </h2>
        </motion.div>
      </div>

      <div className="container-main overflow-visible">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent" />
          
          <div className="space-y-8 md:space-y-12">
            {stages.map((stage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex flex-col items-center shrink-0 z-10">
                  <div className="w-3 h-3 bg-brand-primary shadow-[0_0_15px_rgba(163,230,53,0.6)] mb-3" />
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-background border border-brand-primary/30 flex items-center justify-center text-brand-primary backdrop-blur-sm">
                    <stage.icon size={18} className="md:w-5 md:h-5" />
                  </div>
                </div>
                
                <div className={`flex-1 p-4 md:p-6 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl ${
                  index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}>
                  <span className="text-[10px] font-mono text-brand-primary font-bold tracking-widest mb-2 block">
                    {stage.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 italic">
                    {stage.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}