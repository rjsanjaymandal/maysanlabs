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
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function EduMaysanClient() {
  const features = [
    {
      title: "Financial ERP",
      desc: "Comprehensive fee management, automated invoicing, and real-time financial auditing for institutions.",
      icon: <CreditCard className="w-5 h-5" />,
      tag: "CORE_FINANCE"
    },
    {
      title: "Academic Hub",
      desc: "Advanced gradebooks, automated exam scheduling, and dynamic timetable generation.",
      icon: <GraduationCap className="w-5 h-5" />,
      tag: "LMS_V1"
    },
    {
      title: "Identity & Attendance",
      desc: "Biometric integration and smart attendance tracking for students and faculty.",
      icon: <Users className="w-5 h-5" />,
      tag: "SECURE_AUTH"
    },
    {
      title: "Logistics & Fleet",
      desc: "Real-time transport tracking, route optimization, and inventory control for school assets.",
      icon: <Bus className="w-5 h-5" />,
      tag: "OPS_SYNC"
    },
    {
      title: "Digital Library",
      desc: "Full circulation management, cataloging, and digital resource access for students.",
      icon: <Library className="w-5 h-5" />,
      tag: "DATA_NODE"
    },
    {
      title: "Guardian Portal",
      desc: "Encrypted communication channel between parents, teachers, and administration.",
      icon: <ShieldCheck className="w-5 h-5" />,
      tag: "PRIVATE_COMMS"
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 overflow-hidden relative">
      <Navbar />
      
      {/* Premium Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.03),transparent_70%)]" />
        <div className="grid-overlay opacity-20" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">[ EDU_MAYSAN_SHOWCASE_V1 ]</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            The School <span className="font-accent italic font-light text-primary">Intelligence</span> <br />
            Operating System.
          </h1>
          
          <p className="max-w-2xl text-xl text-foreground/60 font-medium leading-relaxed mb-12">
            Built by <span className="text-foreground font-bold italic">Maysan Labs</span>, Edu Maysan is an enterprise-grade ERP designed to unify fragmented school operations into a single, high-performance flow.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              href="/init"
              className="px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase text-xs hover:scale-105 transition-transform flex items-center gap-3 rounded-sm"
            >
              REQUEST A DEMO
              <ArrowRight size={16} />
            </Link>
            <div className="px-8 py-4 border border-foreground/10 hover:border-primary/30 transition-colors font-mono text-[10px] tracking-[0.2em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              STATUS: STABLE_RELEASE_25
            </div>
          </div>
        </div>

        {/* Feature Grid (Surgical Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card-surgical group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-primary/5 text-primary rounded-sm transition-colors group-hover:bg-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/30">{feature.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Depth Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
             <div className="relative z-10 border border-foreground/5 p-1 bg-background/50 backdrop-blur-sm shadow-2xl">
               <div className="bg-foreground/[0.02] p-12 border border-foreground/5">
                 <div className="flex items-center gap-4 mb-8">
                   <Database className="text-primary w-6 h-6" />
                   <span className="font-mono text-[11px] tracking-widest uppercase">Infrastructure_Report</span>
                 </div>
                 <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
                       <span className="text-xs text-foreground/40 font-mono uppercase">Database_Cluster</span>
                       <span className="text-sm font-bold">SUPABASE_POSTGRES</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
                       <span className="text-xs text-foreground/40 font-mono uppercase">Auth_Layer</span>
                       <span className="text-sm font-bold">RSA-2048 / JWT</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
                       <span className="text-xs text-foreground/40 font-mono uppercase">Realtime_Flow</span>
                       <span className="text-sm font-bold">ENABLED</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
                       <span className="text-xs text-foreground/40 font-mono uppercase">System_Uptime</span>
                       <span className="text-sm font-bold text-primary">99.98%</span>
                    </div>
                 </div>
               </div>
             </div>
          </div>
          
          <div>
            <h2 className="text-5xl font-black tracking-tighter leading-none mb-8">
              Built on a <br />
              <span className="font-accent italic font-light text-primary">Secure Foundation.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center font-mono text-xs text-primary">01</div>
                <div>
                  <h4 className="font-bold mb-2">Enterprise Scaling</h4>
                  <p className="text-sm text-foreground/50">Designed to handle over 100,000 students per school cluster without latency degradation.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center font-mono text-xs text-primary">02</div>
                <div>
                  <h4 className="font-bold mb-2">Automated Compliance</h4>
                  <p className="text-sm text-foreground/50">Standardized reporting for educational boards (CBSE, ICSE, International) baked into the core.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center font-mono text-xs text-primary">03</div>
                <div>
                  <h4 className="font-bold mb-2">Realtime Sync</h4>
                  <p className="text-sm text-foreground/50">Every attendance scan, fee payment, and grade update syncs across all devices instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Pitch */}
        <div className="relative py-32 border-y border-foreground/5 text-center overflow-hidden">
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
           <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
           
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12">
             Pitch <span className="font-accent italic font-light text-primary">The Future</span> <br />
             of Education.
           </h2>
           <Link 
            href="/init"
            className="inline-flex items-center gap-4 px-12 py-5 bg-foreground text-background font-bold tracking-[0.2em] uppercase text-xs hover:bg-primary hover:text-white transition-all rounded-full group"
          >
            BECOME A PARTNER
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>

          {/* Background Asset */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/wireframe-nodes.png" 
            alt="Nodes" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-full max-w-[1200px] pointer-events-none mix-blend-screen mask-radial-fade scale-150"
          />
        </div>
      </div>
    </main>
  );
}
