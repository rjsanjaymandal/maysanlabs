"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Layers, 
  Code2, 
  Rocket,
  ArrowRight
} from "lucide-react";

const stages = [
  {
    title: "Discovery",
    desc: "We analyze your needs and build a solid foundation for your project.",
    icon: Search,
  },
  {
    title: "Architecture",
    desc: "Scalable designs that handle growth effortlessly from day one.",
    icon: Layers,
  },
  {
    title: "Development",
    desc: "Fast execution with clean, performant code and regular updates.",
    icon: Code2,
  },
  {
    title: "Launch",
    desc: "Seamless deployment with monitoring for zero downtime.",
    icon: Rocket,
  },
];

export default function OperationsRoadmap() {
  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Decorative ambient gradient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <ArrowRight size={12} className="text-brand-primary" />
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            How <span className="text-brand-primary">Maysan Labs</span> delivers success
          </h2>
        </motion.div>
      </div>

      <div className="container-main">
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing central timeline indicator line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1A6DD6]/0 via-[#1A6DD6]/20 to-[#1A6DD6]/0 shadow-[0_0_10px_rgba(26,109,214,0.15)] -translate-x-1/2" />
          
          <div className="space-y-10">
            {stages.map((stage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex items-start gap-6 md:gap-0 group`}
              >
                {/* Centered Timeline absolute icon (Desktop only) */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10 hidden md:flex flex-col items-center">
                  <div className="w-11 h-11 bg-[var(--bg-dark)] border border-white/10 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 flex items-center justify-center text-white/50 group-hover:text-brand-primary rounded-full transition-all duration-300 shadow-md">
                    <stage.icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Mobile left line icon connector */}
                <div className="md:hidden flex flex-col items-center shrink-0 z-10 pt-5">
                  <div className="w-2 h-2 rounded-full bg-brand-primary mb-3" />
                  <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-white/60 rounded-lg">
                    <stage.icon size={14} />
                  </div>
                </div>
                
                {/* Symmetrical Alternating Content Card */}
                <div className={`flex-1 md:w-[calc(50%-2rem)] md:flex-initial bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 md:p-6 transition-all duration-500 hover:border-brand-primary/20 hover:bg-brand-primary/[0.01] hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-brand-primary/5 ${
                  index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                }`}>
                  <div className={`flex items-center gap-3 mb-3 ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    {index % 2 === 0 ? (
                      <>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
                          {stage.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary uppercase tracking-wider">0{index + 1}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary uppercase tracking-wider">0{index + 1}</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
                          {stage.title}
                        </h3>
                      </>
                    )}
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}