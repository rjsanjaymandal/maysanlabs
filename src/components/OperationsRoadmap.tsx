"use client";

import React from "react";
import { Search, FileText, Cpu, Rocket, ShieldCheck } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const stages = [
  {
    tag: "01",
    title: "Deep Dive",
    desc: "We check your current systems to find out what needs to change and where we can help you most.",
    icon: <Search size={22} />,
  },
  {
    tag: "02",
    title: "Planning the Core",
    desc: "We design a plan for your new software that is built to be fast, secure, and last for a long time.",
    icon: <FileText size={22} />,
  },
  {
    tag: "03",
    title: "Building & Testing",
    desc: "We build your software in small steps and test it as we go to make sure it works perfectly.",
    icon: <Cpu size={22} />,
  },
  {
    tag: "04",
    title: "Going Live",
    desc: "We move your software to the real world and keep a close eye on it 24/7 to make sure it stays online.",
    icon: <Rocket size={22} />,
  },
  {
    tag: "05",
    title: "Staying Modern",
    desc: "We keep your software updated and help it grow as your business gets bigger.",
    icon: <ShieldCheck size={22} />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

const itemVariantsReverse: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function OperationsRoadmap() {
  return (
    <div className="relative py-40 px-4 bg-background overflow-hidden font-sans">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-overlay opacity-20" />
        <div className="radial-glow top-0 right-0 opacity-30" />
      </div>

      {/* Structural Accent Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-8 inline-block">
            Engineering Lifecycle
          </span>
          <h2 className="text-massive leading-[1.1] font-bold">
            The <span className="font-accent lowercase text-primary italic">roadmap</span> to<br />
            Your Success.
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-40"
        >
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? itemVariantsReverse : itemVariants}
              className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 relative group ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Horizontal Connecting Line */}
              <div className={`hidden md:block absolute top-[5.25rem] w-12 h-px bg-primary/40 ${
                index % 2 === 0 ? "right-[46.5%]" : "left-[46.5%]"
              }`} />

              {/* Stage Marker */}
              <div className="relative shrink-0 z-20">
                 <div className="w-20 h-20 bg-white border border-foreground/5 flex items-center justify-center rounded-3xl shadow-2xl shadow-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-700">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                      {stage.icon}
                    </div>
                 </div>
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-accent text-5xl italic text-primary/5 select-none transition-colors duration-700 group-hover:text-primary/10">
                   {stage.tag}
                 </div>
              </div>

              {/* Content Box */}
              <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? "md:items-end text-center md:text-right" : "md:items-start text-center md:text-left"}`}>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/40 mb-4 group-hover:text-primary transition-colors duration-700">
                  Mission {stage.tag}
                </span>
                <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-700">
                  {stage.title}
                </h3>
                
                <p className="text-base font-medium leading-relaxed text-foreground/50 max-w-md inline-block">
                  {stage.desc}
                </p>

                <div className={`mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ${index % 2 === 0 ? "justify-end translate-x-4 group-hover:translate-x-0" : "justify-start -translate-x-4 group-hover:translate-x-0"}`}>
                   <span className="text-[9px] font-bold tracking-widest text-primary uppercase">Ready for Deployment</span>
                   <div className="w-12 h-px bg-primary/40" />
                </div>
              </div>

              {/* Empty Space for alignment */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
