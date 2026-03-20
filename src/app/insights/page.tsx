"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, BarChart2, PieChart, Zap, Target, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const insights = [
  {
    id: "DATA_01",
    title: "MARKET_VELOCITY",
    value: "+14.5%",
    desc: "Year-over-year growth in digital adoption across target sectors.",
    icon: <TrendingUp size={20} />,
  },
  {
    id: "DATA_02",
    title: "SYSTEM_LATENCY",
    value: "45ms",
    desc: "Average response time for edge-hosted application logic.",
    icon: <Activity size={20} />,
  },
  {
    id: "DATA_03",
    title: "USER_ENGAGEMENT",
    value: "8.2m",
    desc: "Active sessions processed daily on client infrastructure.",
    icon: <BarChart2 size={20} />,
  },
  {
    id: "DATA_04",
    title: "RETENTION_RATE",
    value: "92%",
    desc: "Customer loyalty metrics exceeding industry standards.",
    icon: <PieChart size={20} />,
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 tactical-grid opacity-5 pointer-events-none" />
      
      <Navbar />

      {/* Hero Header */}
      <div className="pt-48 pb-24 border-b border-border relative bg-card/30">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold block mb-6">
              [ ANALYTIC_TELEMETRY_V2 ]
            </span>
            <h1 className="text-massive leading-[0.8] mb-12">
              TECHNICAL<br />
              <span className="italic">INSIGHTS</span>
            </h1>
            <p className="font-mono text-xs sm:text-lg uppercase tracking-widest text-muted-foreground max-w-2xl leading-relaxed">
              deep-dives into modular architecture, tactical automation, and the future of digital platforms. quantified engineering excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-32 container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-border/20 border border-border">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              className="card-brutalist bg-card p-12 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col gap-8 text-center sm:text-left">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[8px] text-primary/40 font-bold tracking-tighter">{item.id}</span>
                </div>

                <div>
                   <h3 className="font-mono text-5xl font-black text-foreground mb-4 tracking-tighter group-hover:text-primary transition-colors">
                     {item.value}
                   </h3>
                   <h4 className="font-mono text-[10px] font-bold text-muted-foreground mb-6 uppercase tracking-[0.3em]">
                     {item.title}
                   </h4>
                   <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground/60 tracking-tight">
                     {item.desc}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-16 border-2 border-primary bg-card relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-2 font-mono text-[8px] text-primary uppercase animate-pulse">
                <Activity size={10} />
                LIVE_FEED_PENDING
             </div>
          </div>

          <h3 className="font-mono text-3xl font-black mb-6 uppercase tracking-tighter">
            LIVE_TELEMETRY_PENDING
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground leading-loose mb-10">
            we are integrating a real-time command dashboard for client-accessible mission metrics. structural synchronization in progress.
          </p>
          
          <div className="flex items-center justify-center gap-12 font-mono text-[10px] text-muted-foreground/30 uppercase tracking-[0.5em]">
             <div className="flex items-center gap-2"><Zap size={12} /> SYNCING</div>
             <div className="flex items-center gap-2"><Target size={12} /> CALIBRATING</div>
             <div className="flex items-center gap-2"><Box size={12} /> CACHING</div>
          </div>
        </div>
      </div>
      
      <ContactFooter />
    </main>
  );
}
