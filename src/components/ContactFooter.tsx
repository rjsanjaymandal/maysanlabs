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
      <div className="py-40 relative border-t border-border/50">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container relative z-10"
        >
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="mb-12">
               <span className="font-bold text-[10px] tracking-[0.5em] uppercase text-primary block mb-8">
                 Strategic Partnership
               </span>
               <h2 className="text-massive leading-[1.1] mb-0 font-bold">
                 Engineering the future<br />
                 of digital <span className="font-accent lowercase text-primary italic">sovereignty.</span>
               </h2>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-foreground/60 mb-16 max-w-2xl leading-relaxed font-medium">
              We build the infrastructure for enterprises ready to scale. No compromise on velocity, security, or <span className="text-foreground">deterministic architecture.</span>
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md"
            >
              <Link
                href="/init"
                className="px-10 py-5 bg-foreground text-background font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all rounded-full flex items-center justify-center gap-3 group"
              >
                INITIALIZE PROJECT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="mailto:business@maysanlabs.com"
                className="px-10 py-5 border border-foreground/10 text-foreground font-bold text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-all rounded-full flex items-center justify-center gap-3"
              >
                SEND INQUIRY
                <ArrowUpRight size={18} />
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
        className="border-t border-border/50 bg-secondary/30 py-24 relative overflow-hidden"
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            
            <div className="md:col-span-6 space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-primary flex items-center justify-center text-white rounded-sm font-bold">
                    M
                 </div>
                 <h4 className="text-2xl font-bold uppercase tracking-tight">
                   MAYSAN<span className="font-accent lowercase ml-1">labs</span>
                 </h4>
              </div>
              <p className="text-xs uppercase tracking-widest text-foreground/50 max-w-sm leading-loose font-medium">
                architects of modern, high-concurrency enterprise ecosystems. engineering digital infrastructure that scales at the speed of thought.
              </p>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                DIRECTORY
              </h4>
              <div className="flex flex-col gap-4">
                {["Solutions", "Engineering", "Architecture", "Insights", "Blog"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-[11px] font-bold uppercase tracking-wider text-foreground/40 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                GLOBAL_ACCESS
              </h4>
              <div className="flex items-center gap-3 text-foreground/60 font-medium">
                 <Globe size={14} className="text-primary" />
                 <p className="text-[11px] uppercase tracking-wider">
                    GURGAON / HARYANA / INDIA
                 </p>
              </div>
              <Link
                href="mailto:business@maysanlabs.com"
                className="block text-[11px] font-bold uppercase tracking-wider text-foreground/40 hover:text-primary transition-colors"
              >
                business@maysanlabs.com
              </Link>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/20">
               <p>© {new Date().getFullYear()} MAYSAN LABS</p>
               <div className="w-1 h-1 bg-border rounded-full" />
               <p>STATUS: OPERATIONAL</p>
            </div>
            
            <Link 
              href="https://sanjaymandal.me"
              target="_blank"
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/20 hover:text-primary transition-colors"
            >
               DESIGN BY SANJAY MANDAL
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
