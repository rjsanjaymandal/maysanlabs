import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactFooter from "@/components/ContactFooter";
import Testimonials from "@/components/Testimonials";
import OperationsRoadmap from "@/components/OperationsRoadmap";
import { Metadata } from "next";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ArrowUpRight, 
  Globe, 
  ShieldCheck, 
  Database,
  Code2
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maysan Labs | Custom Software Development",
  description: "We build custom websites, apps, and software that help your business grow.",
};

export default function Home() {
  return (
    <main className="bg-[#0d1117] min-h-screen relative overflow-hidden">
      <Navbar />
      <Hero />
      
      {/* ─── Trust Section: Monochrome Marquee ─── */}
      <section className="py-20 border-y border-white/5 bg-black/20 overflow-hidden relative">
        <div className="container-main mb-10 text-center">
           <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Trusted by Leading Enterprises</span>
        </div>
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap gap-20 items-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-20 items-center">
                <span className="text-2xl font-black tracking-tighter uppercase italic">GlobalBridge</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Apex_Systems</span>
                <span className="text-2xl font-black tracking-tighter uppercase italic">Fortify_Infra</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Quantix_SaaS</span>
                <span className="text-2xl font-black tracking-tighter uppercase italic">Nexus_Labs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bento Grid Section: Maysan Engineering Excellence ─── */}
      <section className="sec-xl container-main">
        <div className="mb-20">
          <span className="announcement-bar !mb-6">Built Right</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Maysan Engineering<br />
            <span className="text-[#007AFF]">Excellence.</span>
          </h2>
        </div>

        <div className="bento-grid">
          {/* Main Large Card */}
          <div className="md:col-span-8 bento-item">
            <div className="maysan-card h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#007AFF]/20">
                  <Cpu className="text-[#007AFF]" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight uppercase">Built for Scale</h3>
                <p className="text-white/40 max-w-md leading-relaxed">
                  We design high-concurrency systems that scale to millions of users without sacrificing performance or reliability.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                 <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/50">Load_Balanced</span>
                 <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#007AFF]">99.99%_Uptime</span>
              </div>
            </div>
          </div>

          {/* Side Card 1 */}
          <div className="md:col-span-4 bento-item">
            <div className="maysan-card h-full bg-gradient-to-br from-white/5 to-transparent">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#007AFF]/20">
                <ShieldCheck className="text-[#007AFF]" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">Enterprise Security</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Modern security layers and safe data handling for maximum protection.
              </p>
            </div>
          </div>

          {/* Side Card 2 */}
          <div className="md:col-span-4 bento-item">
            <div className="maysan-card h-full">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#007AFF]/20">
                <Layers className="text-[#007AFF]" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">Flexible Apps</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Smart architectures that allow your product to grow as your team expands.
              </p>
            </div>
          </div>

          {/* Featured Middle Card */}
          <div className="md:col-span-8 bento-item">
            <div className="maysan-card h-full border-[#007AFF]/20 bg-[#007AFF]/5">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                   <span className="text-[#007AFF] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Our Approach</span>
                   <h3 className="text-4xl font-black mb-6 tracking-tight italic text-white uppercase">Maysan's Solutions.</h3>
                   <p className="text-white/40 text-sm leading-relaxed mb-8">
                     Our process is built for speed. We deliver high-quality work every week, ensuring your product moves at the same pace as your business.
                   </p>
                   <Link href="/services" className="pill-btn pill-btn-primary !w-fit !py-2.5 !px-6 text-xs font-black uppercase tracking-widest">
                     How It Works
                     <ArrowUpRight size={14} />
                   </Link>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-[#0d1117] rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#007AFF]/10 to-transparent" />
                   <Code2 size={64} className="text-[#007AFF]/20" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Zap size={32} className="text-[#007AFF] animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process Flow Redesign: 1-2-3 Stepper ─── */}
      <OperationsRoadmap />

      {/* ─── Final CTA ─── */}
      <section className="sec-xl relative overflow-hidden">
        <div className="radial-blur -top-40 -left-40 opacity-10" />
        <div className="container-main text-center relative z-10">
          <div className="maysan-card border-[#007AFF]/30 bg-[#0d1117]/80 backdrop-blur-2xl py-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Build your<br />
              <span className="text-[#007AFF]">next project.</span>
            </h2>
            <p className="text-white/40 text-xl max-w-xl mx-auto mb-12 font-medium">
              Join leading businesses building their future with Maysan Labs quality standards.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
               <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px]">
                 Book a Strategy Call
                 <ArrowUpRight size={18} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <ContactFooter />
    </main>
  );
}
