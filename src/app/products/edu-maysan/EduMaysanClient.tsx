"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  GraduationCap, 
  Bus, 
  Library, 
  ShieldCheck, 
  ArrowRight,
  Database,
  ArrowUpRight,
  Lock,
  Zap
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function EduMaysanClient() {
  const features = [
    {
      title: "Financial ERP",
      desc: "Comprehensive fee management, automated invoicing, and real-time financial auditing for institutions.",
      icon: <CreditCard size={24} />,
      tag: "CORE_FINANCE",
      span: "md:col-span-8"
    },
    {
      title: "Academic Hub",
      desc: "Advanced gradebooks and exam scheduling.",
      icon: <GraduationCap size={24} />,
      tag: "LMS_V1",
      span: "md:col-span-4"
    },
    {
      title: "Identity & Auth",
      desc: "Biometric and smart tracking.",
      icon: <Users size={24} />,
      tag: "SECURE_AUTH",
      span: "md:col-span-4"
    },
    {
      title: "Logistics & Fleet",
      desc: "Real-time transport tracking and route optimization for school assets.",
      icon: <Bus size={24} />,
      tag: "OPS_SYNC",
      span: "md:col-span-8"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-40 opacity-10" />
      <div className="radial-blur -bottom-40 -right-40 opacity-5" />

      <div className="container-main pt-44 pb-32 relative z-10">
        {/* Header Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="announcement-bar">Our Solutions</span>
            <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
              The School <br />
              <span className="text-[#007AFF] italic">Intelligence.</span>
            </h1>
            
            <p className="max-w-2xl text-xl md:text-2xl text-white/40 font-medium leading-relaxed mb-16">
              Built on mission-critical architecture, Edu Maysan unifies fragmented operations into a high-performance enterprise flow.
            </p>

            <div className="flex flex-wrap gap-6 font-mono">
              <Link 
                href="/init"
                className="pill-btn pill-btn-primary min-w-[240px]"
              >
                BOOK A STRATEGY CALL
                <ArrowRight size={18} />
              </Link>
              <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]"></span>
                </span>
                STATUS: STABLE_V2.1
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Bento Grid */}
        <div className="bento-grid mb-40">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`${feature.span} group`}
            >
              <div className="maysan-card h-full flex flex-col justify-between group-hover:border-[#007AFF]/40">
                <div>
                  <div className="w-12 h-12 bg-[#007AFF]/10 rounded-xl flex items-center justify-center mb-10 border border-[#007AFF]/20 text-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-12 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity">
                   <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#007AFF]">{feature.tag}</span>
                   <ArrowUpRight size={14} className="text-[#007AFF]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Stack Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="maysan-card border-[#007AFF]/10 bg-black/20 backdrop-blur-3xl p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-10 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-lg flex items-center justify-center text-[#007AFF]">
                    <Database size={20} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50">Technical_Specs</span>
                </div>
                
                <div className="space-y-8">
                   {[
                     { l: "Runtime", v: "NODE_STABLE_EXT" },
                     { l: "Database", v: "POSTGRES_SCALABLE" },
                     { l: "Auth", v: "OIDC_SECURE" },
                     { l: "Status", v: "ENCRYPTED", c: "text-[#007AFF]" }
                   ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                         <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">{item.l}</span>
                         <span className={`text-sm font-black uppercase ${item.c || "text-white/60"}`}>{item.v}</span>
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-10 uppercase">
              Secure <br /><span className="text-[#007AFF] italic">Deployment.</span>
            </h2>
            <div className="space-y-12">
              {[
                { i: <Users />, t: "Enterprise Scaling", d: "Built for massive school clusters without throughput degradation." },
                { i: <Lock />, t: "Data Sovereignty", d: "Zero-trust networks that grant institutions 100% control." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="shrink-0 w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#007AFF] group-hover:border-[#007AFF]/30 transition-all duration-500">
                    {item.i}
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-4 tracking-tight uppercase">{item.t}</h4>
                    <p className="text-sm text-white/40 font-medium leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing Pitch */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative py-40 border-y border-white/5 text-center overflow-hidden"
        >
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#007AFF]/20 to-transparent" />
           <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#007AFF]/20 to-transparent" />
           
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.9] uppercase">
             Pitch <span className="text-[#007AFF] italic">The Future</span> <br />
             of infra.
           </h2>
           <Link 
            href="/init"
            className="pill-btn pill-btn-primary mx-auto min-w-[280px]"
          >
            BECOME A PARTNER
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
