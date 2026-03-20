"use client";

import { motion, Variants, Transition } from "framer-motion";
import { Terminal, Activity, Zap, ArrowRight, Shield, Globe, Box } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function Hero() {
  const [bootStatus, setBootStatus] = useState("INIT_SYSTEM");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const statuses = ["ALLOCATING_RESOURCES", "ESTABLISHING_UPLINK", "CALIBRATING_ENGINE", "SYSTEM_READY"];
    let i = 0;
    const interval = setInterval(() => {
       if (i < statuses.length) {
          setBootStatus(statuses[i]);
          i++;
       } else {
          clearInterval(interval);
       }
    }, 800);
    
    setTimestamp(new Date().toISOString().split('T')[1].split('.')[0]);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Architectural Elements */}
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-10 pointer-events-none" />
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-[2px] bg-primary/20 pointer-events-none z-10" 
      />
      
      <div className="container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Main Typographic Core */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-9"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
               <div className="w-12 h-[2px] bg-primary" />
               <span className="font-mono text-[10px] sm:text-xs tracking-[0.5em] text-primary font-bold uppercase">
                 [ STATUS_{bootStatus} ]
               </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-massive leading-[0.8] mb-12 tracking-tighter">
              WE_BUILD<br />
              MODULAR<br />
              <span className="text-primary italic">EMPIRES</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-mono text-sm sm:text-lg uppercase tracking-widest text-muted-foreground mb-16 max-w-2xl leading-relaxed">
               high-performance infrastructure for global enterprises. engineering digital architecture that scales beyond the tactical limit.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/init"
                className="btn-brutalist bg-primary text-white py-6 px-12 text-center uppercase font-mono font-black tracking-widest flex items-center justify-center gap-3 group"
              >
                <Terminal size={18} />
                <span>INIT_PROJECT</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/#solution"
                className="btn-brutalist border-2 border-border py-6 px-12 text-center uppercase font-mono font-black tracking-widest flex items-center justify-center gap-3 group hover:border-primary transition-colors"
              >
                <span>VIEW_SPECIFICATIONS</span>
                <Activity size={18} className="group-hover:animate-pulse" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Asymmetric Side Sidebar (90/10 Tension) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="lg:col-span-3 border-l-2 border-border pl-8 pt-8 lg:pt-0 hidden lg:block"
          >
            <div className="space-y-12">
               {[
                 { label: "NODE_01", status: "ACTIVE", icon: <Globe size={14} /> },
                 { label: "LATENCY", status: "14ms", icon: <Zap size={14} /> },
                 { label: "ENCRYPT", status: "SSL_V3", icon: <Shield size={14} /> },
                 { label: "TIME", status: timestamp, icon: <Activity size={14} /> }
               ].map((node, i) => (
                 <div key={i} className="group cursor-default">
                    <div className="flex items-center gap-3 mb-2 font-mono text-[9px] text-primary/40 group-hover:text-primary transition-colors">
                       {node.icon}
                       <span>{node.label}</span>
                    </div>
                    <div className="font-mono text-lg font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
                       {node.status}
                    </div>
                 </div>
               ))}
               
               <div className="pt-12 mt-12 border-t border-border/50">
                  <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/30 leading-loose">
                    [ SYSTEM_METADATA ]<br />
                    MYSAN_LABS_CORE_V8.4<br />
                    GURGAON_UPLINK_STABLE<br />
                    ALL_MODULES_NOMINAL
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Technical Floor Markers */}
      <div className="absolute bottom-10 left-0 w-full px-12 hidden sm:flex justify-between items-end pointer-events-none">
          <div className="flex gap-16 font-mono text-[9px] text-muted-foreground opacity-30">
             <div className="space-y-1">
                <p>COORD_X: 28.4595° N</p>
                <p>COORD_Y: 77.0266° E</p>
             </div>
             <div className="space-y-1">
                <p>OS: MAY_KERNEL_PRO</p>
                <p>ENV: PRODUCTION</p>
             </div>
          </div>
          <div className="font-mono text-[10px] text-primary flex items-center gap-4">
             <span className="font-bold tracking-[0.4em]">DEPLOYMENT_READY</span>
             <Box size={14} />
          </div>
      </div>
    </section>
  );
}
