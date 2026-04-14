"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  GraduationCap, 
  Bus, 
  ArrowRight,
  Database,
  Lock,
  Zap
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BackgroundBeams from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export default function EduMaysanClient() {
  const features = [
    {
      name: "Financial ERP",
      description: "Comprehensive fee management, automated invoicing, and real-time financial auditing for institutions.",
      Icon: CreditCard,
      className: "md:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/10 to-transparent" />,
      href: "/init",
      cta: "CORE_FINANCE"
    },
    {
      name: "Academic Hub",
      description: "Advanced gradebooks and exam scheduling with interactive LMS capabilities.",
      Icon: GraduationCap,
      className: "md:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent" />,
      href: "/init",
      cta: "LMS_V1"
    },
    {
      name: "Identity & Auth",
      description: "Biometric and smart tracking integration for secure campus access.",
      Icon: Users,
      className: "md:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />,
      href: "/init",
      cta: "SECURE_AUTH"
    },
    {
      name: "Logistics & Fleet",
      description: "Real-time transport tracking and route optimization for institution assets.",
      Icon: Bus,
      className: "md:col-span-2",
      background: <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Zap size={120} className="text-[var(--brand-primary)]" />
      </div>,
      href: "/init",
      cta: "OPS_SYNC"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navbar />
      
      {/* Background Beams Effect (Aceternity) */}
      <BackgroundBeams />

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
              <span className="text-[var(--brand-primary)] italic uppercase">Intelligence.</span>
            </h1>
            
            <p className="max-w-2xl text-xl md:text-2xl text-white/70 font-medium leading-relaxed mb-16">
              Built on mission-critical architecture, Edu Maysan unifies fragmented operations into a high-performance enterprise flow.
            </p>

            <div className="flex flex-wrap gap-6 font-mono">
              <Link href="/init">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="div"
                  className="bg-black text-white flex items-center gap-2"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight size={18} />
                </HoverBorderGradient>
              </Link>
              <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-light)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-primary)]"></span>
                </span>
                STATUS: STABLE_V2.1
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Bento Grid (Magic UI) */}
        <BentoGrid className="mb-40">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>

        {/* Technical Stack Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="maysan-card border-[var(--brand-primary)]/10 bg-black/20 backdrop-blur-3xl p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-10 bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 rounded-lg flex items-center justify-center text-[var(--brand-primary)]">
                    <Database size={20} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50">Technical_Specs</span>
                </div>
                
                <div className="space-y-8">
                   {[
                     { l: "Runtime", v: "NODE_STABLE_EXT" },
                     { l: "Database", v: "POSTGRES_SCALABLE" },
                     { l: "Auth", v: "OIDC_SECURE" },
                     { l: "Status", v: "ENCRYPTED", c: "text-[var(--brand-primary)]" }
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
              Secure <br /><span className="text-[var(--brand-primary)] italic uppercase">Deployment.</span>
            </h2>
            <div className="space-y-12">
              {[
                { i: <Users />, t: "Enterprise Scaling", d: "Built for massive school clusters without throughput degradation." },
                { i: <Lock />, t: "Data Sovereignty", d: "Zero-trust networks that grant institutions 100% control." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="shrink-0 w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)]/30 transition-all duration-500">
                    {item.i}
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-4 tracking-tight uppercase">{item.t}</h4>
                    <p className="text-sm text-white/70 font-medium leading-relaxed">{item.d}</p>
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
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/20 to-transparent" />
           <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/20 to-transparent" />
           
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.9] uppercase">
             Pitch <span className="text-[var(--brand-primary)] italic uppercase">The Future</span> <br />
             of infra.
           </h2>
           <Link href="/init">
             <HoverBorderGradient
                containerClassName="rounded-full mx-auto"
                as="div"
                className="bg-black text-white flex items-center gap-2"
              >
                <span>BECOME A PARTNER</span>
                <ArrowRight size={20} />
              </HoverBorderGradient>
           </Link>
        </motion.div>
      </div>
    </main>
  );
}
