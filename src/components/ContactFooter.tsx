"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Terminal, Globe, Command } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    } as Transition,
  },
};

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-background">
      {/* Massive CTA Section */}
      <div className="py-40 relative border-t border-border">
        <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-5" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container relative z-10"
        >
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="mb-12">
               <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-primary font-bold block mb-8">
                 [ INITIALIZE_CONNECTION ]
               </span>
               <h2 className="text-massive leading-[0.8] mb-0">
                 ENGINEERING<br />
                 THE NEXT<br />
                 <span className="text-primary italic">EMPIRE</span>
               </h2>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="font-mono text-xs sm:text-lg uppercase tracking-widest text-muted-foreground mb-16 max-w-2xl leading-relaxed">
              we build the infrastructure. you lead the global expansion. no compromise on velocity.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md"
            >
              <Link
                href="/init"
                className="btn-brutalist bg-primary text-white py-6 px-12 text-center uppercase font-mono font-black tracking-widest flex items-center justify-center gap-3 group"
              >
                <Terminal size={18} />
                <span>INIT_PROTOCOL</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="mailto:business@maysanlabs.com"
                className="btn-brutalist border-2 border-border py-6 px-12 text-center uppercase font-mono font-black tracking-widest flex items-center justify-center gap-3 group hover:border-primary transition-colors"
              >
                <span>SEND_COMMAND</span>
                <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Industrial Footer Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
        className="border-t-4 border-primary bg-card/50 py-24 relative overflow-hidden"
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            
            <div className="md:col-span-6 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-primary flex items-center justify-center text-white">
                    <Command size={20} />
                 </div>
                 <h4 className="font-mono text-3xl font-black uppercase tracking-tighter">
                   MAYSAN_LABS
                 </h4>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground max-w-sm leading-relaxed">
                architects of modern, high-concurrency enterprise ecosystems. engineering digital infrastructure that scales at the speed of thought.
              </p>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                CHANNELS
              </h4>
              <div className="flex flex-col gap-4">
                <Link
                  href="mailto:business@maysanlabs.com"
                  className="font-mono text-xs uppercase tracking-tight text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <div className="w-6 h-[1px] bg-border group-hover:bg-primary transition-colors" />
                  BUSINESS@MAY_LABS
                </Link>
                <Link
                  href="#"
                  className="font-mono text-xs uppercase tracking-tight text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <div className="w-6 h-[1px] bg-border group-hover:bg-primary transition-colors" />
                  X_TERMINAL
                </Link>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                LOCATION_ID
              </h4>
              <div className="flex items-center gap-3 text-muted-foreground">
                 <Globe size={14} className="text-primary" />
                 <p className="font-mono text-xs uppercase tracking-tight">
                    GURGAON_SEC_44 / INDIA
                 </p>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 font-mono text-[8px] uppercase tracking-widest text-muted-foreground/30">
               <p>© {new Date().getFullYear()} MAYSAN_LABS_ENGINEERING</p>
               <div className="w-1 h-1 bg-border rounded-full" />
               <p>STATUS: OPERATIONAL</p>
            </div>
            
            <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.3em] text-primary/40">
               <span className="italic">BUILT_FOR_THE_FUTURE_VELOCITY</span>
               <div className="w-8 h-[2px] bg-primary/20" />
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
