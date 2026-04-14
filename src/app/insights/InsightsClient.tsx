"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Target, Box, Database, TrendingUp, Shield, BarChart3 } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const insights = [
  {
    id: "01",
    title: "Market Analysis",
    value: "24/7",
    desc: "Real-time monitoring of market trends and competitor movements.",
    icon: <BarChart3 size={24} />,
  },
  {
    id: "02",
    title: "Operational Efficiency",
    value: "+40%",
    desc: "Average increase in speed after implementing our custom services.",
    icon: <TrendingUp size={24} />,
  },
  {
    id: "03",
    title: "Data Sovereignty",
    value: "100%",
    desc: "Your data remains yours. No third-party sharing or leakage.",
    icon: <Shield size={24} />,
  },
  {
    id: "04",
    title: "Runtime Latency",
    value: "<35ms",
    desc: "Ultra-low latency bridges ensuring seamless digital scaling.",
    icon: <Database size={24} />,
  },
];

export default function InsightsClient() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Header */}
      <div className="pt-64 pb-32 relative overflow-hidden">
        <div className="grid-overlay opacity-30" />
        <div className="radial-glow -top-40 -left-40 opacity-20" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-10 inline-block">
              Business Data
            </span>
            <h1 className="text-massive leading-[1.1] font-bold mb-12">
              Data & <span className="font-accent lowercase text-primary italic">insights</span> for<br />
              Your Business.
            </h1>
            <p className="text-lg font-medium text-foreground/50 max-w-2xl leading-relaxed border-l border-border/50 pl-10">
              We provide clear data and insights to help you make better decisions for your company and grow your business.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-40 container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              className="card-surgical p-12 group !bg-secondary/30 !rounded-[2.5rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white text-primary flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-primary/30 font-bold uppercase tracking-widest">{item.id}</span>
                </div>

                <div>
                   <h3 className="text-5xl font-bold text-foreground mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500">
                     {item.value}
                   </h3>
                   <h4 className="text-[10px] font-bold text-foreground/40 mb-6 uppercase tracking-[0.3em]">
                     {item.title}
                   </h4>
                   <p className="text-[10px] font-bold uppercase leading-relaxed text-foreground/30 tracking-tight">
                     {item.desc}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 p-20 bg-secondary/20 rounded-[3rem] border border-primary/5 relative overflow-hidden text-center max-w-4xl mx-auto group hover:border-primary/20 transition-all duration-700">
          <div className="absolute top-0 right-0 p-8">
             <div className="flex items-center gap-3 font-bold text-[10px] text-primary uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full shadow-sm">
                <Activity size={12} className="animate-pulse" />
                Coming Soon
             </div>
          </div>

          <h3 className="text-3xl font-bold mb-8 tracking-tight">
            Your Business Dashboard
          </h3>
          <p className="text-sm font-medium text-foreground/50 leading-loose mb-12 max-w-2xl mx-auto">
            We are building a simple dashboard so you can see how your software is performing and track your growth in real-time.
          </p>
          
          <div className="flex items-center justify-center gap-16 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em]">
             <div className="flex items-center gap-3 group-hover:text-primary/40 transition-colors"><Zap size={14} /> Syncing</div>
             <div className="flex items-center gap-3 group-hover:text-primary/40 transition-colors"><Target size={14} /> Calibrating</div>
             <div className="flex items-center gap-3 group-hover:text-primary/40 transition-colors"><Box size={14} /> Caching</div>
          </div>
        </div>
      </div>
      
      <ContactFooter />

      {/* Decorative Asset */}
      <div className="absolute top-1/2 -right-40 w-full h-[600px] opacity-10 pointer-events-none mix-blend-screen mask-radial-fade scale-110">
        <Image src="/assets/wireframe-grid.png" alt="" fill className="object-contain" priority />
      </div>
      <div className="radial-glow bottom-0 left-0 opacity-15" />
    </main>
  );
}
