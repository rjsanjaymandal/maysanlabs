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
      <div className="container-main mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium mb-4">
            <ArrowRight size={12} className="text-brand-primary" />
            Process
          </span>
          <h2 className="heading-md text-white">
            How we <span className="text-brand-primary">work</span>
          </h2>
        </motion.div>
      </div>

      <div className="container-main">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <div className="space-y-8">
            {stages.map((stage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-4 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex flex-col items-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-brand-primary mb-3" />
                  <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-white/60 rounded-lg">
                    <stage.icon size={14} />
                  </div>
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-brand-primary">0{index + 1}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">
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