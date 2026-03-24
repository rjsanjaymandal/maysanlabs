"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Cpu, Zap, Shield, Layers, ArrowUpRight } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function EngineeringPage() {
  const specs = [
    {
      id: "SPEED",
      title: "Extremely Fast",
      text: "We use the latest web technologies to make sure your site loads instantly and runs smoothly.",
      icon: <Zap size={22} />,
    },
    {
      id: "SYSTEM",
      title: "Built to Last",
      text: "Our code is clean, modern, and designed to handle large amounts of traffic without breaking.",
      icon: <Cpu size={22} />,
    },
    {
      id: "SECURITY",
      title: "Bank-Level Security",
      text: "We use top-tier encryption to keep your data safe and protect your business from threats.",
      icon: <Shield size={22} />,
    },
    {
      id: "UPTIME",
      title: "Always Online",
      text: "Our systems are built with backups and global networks to ensure your business never goes down.",
      icon: <Layers size={22} />,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-overlay opacity-30" />
        <div className="radial-glow top-0 right-0 opacity-40" />
        <div className="radial-glow bottom-0 left-0 opacity-20" />
      </div>

      <section className="pt-40 pb-24 relative z-10">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-baseline justify-between mb-32 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary block mb-6 px-4 py-1.5 bg-primary/10 rounded-full w-fit">
                How we build
              </span>
              <h1 className="text-massive leading-[1.1] font-bold">
                 Modern <span className="font-accent lowercase text-primary italic">standards</span> for<br />
                 Large Projects.
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:max-w-sm border-l border-primary/20 pl-8"
            >
              <p className="text-sm font-medium text-foreground/50 leading-loose">
                We don&apos;t just build apps. We build strong digital foundations that stay fast and secure as your business grows.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-12 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-foreground/5 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700"
              >
                <div className="flex flex-col gap-10 h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-white text-primary border border-foreground/5 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-primary/20 transition-all duration-700">
                      {spec.icon}
                    </div>
                    <span className="text-[10px] font-bold text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-700 font-accent italic text-xl">{spec.id}</span>
                  </div>

                  <div className="space-y-4">
                     <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-700">
                       {spec.title}
                     </h2>
                     <p className="text-base font-medium leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors duration-700">
                       {spec.text}
                     </p>
                  </div>

                  <div className="mt-10 pt-10 border-t border-primary/10 flex gap-10">
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-700" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Verified</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-700" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Encrypted</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Decorative Asset */}
      <img src="/assets/wireframe-grid.png" alt="" className="absolute top-1/2 left-0 w-full opacity-15 pointer-events-none mix-blend-screen mask-radial-fade scale-150" />

      <ContactFooter />
    </main>
  );
}
