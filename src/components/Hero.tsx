"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ArrowDown,
  Activity,
  TrendingUp,
  Terminal,
  Globe,
  Server,
  Database,
  Sparkles
} from "lucide-react";
import BorderBeam from "@/components/ui/border-beam";

const SparklesCore = dynamic(() => import("@/components/ui/sparkles").then(m => m.SparklesCore));

const benefits = [
  "100% Custom Software (No Templates)",
  "Highly Secure & Reliable",
  "Easy for Anyone to Use"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-20 md:pt-24 overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#3B82F6"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-brand-primary/4 sm:bg-brand-primary/8 blur-[50px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] bg-brand-primary/3 sm:bg-brand-primary/5 blur-[30px] sm:blur-[60px] rounded-full pointer-events-none" />
      <div className="container-main relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 md:mb-6 animate-fade-in-up [animation-duration:0.5s]">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/3 border border-white/8 text-foreground/60 text-xs sm:text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="hidden sm:inline">Trusted by 50+ companies worldwide</span>
            <span className="sm:hidden">50+ companies</span>
          </span>
        </div>

        <div className="mb-5 md:mb-6 animate-fade-in-up-lg [animation-duration:0.4s] [animation-delay:50ms]">
          <h1 className="heading-xl text-foreground max-w-4xl">
            Get <span className="text-brand-primary">Custom Software & AI tools</span> <br className="hidden md:block" />
            built to grow <span className="text-brand-primary">your business</span>
          </h1>
        </div>

        <div className="mt-3 md:mt-4 max-w-xl md:max-w-2xl mx-auto animate-fade-in-up [animation-duration:0.5s] [animation-delay:150ms]">
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed">
            We build custom software, mobile apps, and smart AI tools that save you time, reduce your staffing costs, and automate daily business tasks. No tech background required — we handle everything from design to launch.
          </p>
        </div>

        <div className="mt-5 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8 animate-fade-in-up [animation-duration:0.5s] [animation-delay:250ms]">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-1.5 md:gap-2 text-foreground/60 text-[11.5px] sm:text-xs md:text-sm px-3 py-1.5 bg-white/2 rounded-full">
              <CheckCircle2 size={12} className="text-brand-primary shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
 
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-3 sm:px-0 animate-fade-in-up [animation-duration:0.5s] [animation-delay:350ms]">
          <Link href="/start" className="group relative w-full sm:w-auto px-5 sm:px-8 py-4 bg-[#1A6DD6] rounded-full font-bold text-[9px] xs:text-[10px] uppercase tracking-wider sm:tracking-widest text-white shadow-xl shadow-blue-500/25 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] flex items-center justify-center gap-2">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-center">Book a free 30-min discovery call</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
          
          <Link href="/products" className="group relative w-full sm:w-auto px-5 sm:px-8 py-4 rounded-full border border-white/20 text-foreground/50 font-bold text-[9px] xs:text-[10px] uppercase tracking-wider sm:tracking-widest transition-all duration-300 hover:text-foreground hover:border-white/40 hover:bg-white/2 flex items-center justify-center gap-2">
              <Play size={11} fill="currentColor" className="shrink-0" />
              <span>View Our Work</span>
          </Link>
        </div>

        {/* Floating Glassmorphic Dashboard Showcase */}
        <div className="w-full max-w-5xl mt-12 md:mt-24 mb-6 relative group px-3 sm:px-6 md:px-0 animate-fade-in-up [animation-duration:0.8s] [animation-delay:500ms] [content-visibility:auto]">
          {/* Neon Ambient Background Glows */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-blue-500/10 rounded-[32px] blur-2xl opacity-45 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 pointer-events-none animate-pulse" />
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-20 pointer-events-none" />

          {/* Gentle Floating Frame */}
          <div className="animate-float backdrop-blur-xl bg-black/60 border border-white/10 rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500 relative"
          >
            <BorderBeam size={350} duration={12} delay={0} colorFrom="#1A6DD6" colorTo="#60A5FA" />
            {/* Browser Chrome Header Wrapper */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-white/4 border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/2 border border-white/5 rounded-lg text-[9px] sm:text-[10px] text-white/40 font-mono w-44 sm:w-64 justify-center truncate">
                <Globe size={10} className="text-brand-primary animate-pulse shrink-0" />
                <span>portal.maysanlabs.com/automation</span>
              </div>
              <div className="w-8 sm:w-12 h-3" />
            </div>

            {/* Main Dashboard Panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 bg-gradient-to-b from-white/1 to-transparent text-left">
              
              {/* Left Panel: Terminal Operations Control (Span 4) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                {/* Mini Terminal Window */}
                <div className="bg-black/50 border border-white/8 rounded-2xl p-4 font-mono text-[10px] md:text-[11px] text-brand-primary flex flex-col gap-2 shadow-inner overflow-hidden">
                  <div className="flex items-center gap-2 text-white/50 text-[10px] border-b border-white/8 pb-2">
                    <Terminal size={12} className="shrink-0" />
                    <span>maysan-labs-automation-bot.log</span>
                  </div>
                  <div className="flex gap-2 text-green-400 whitespace-pre-wrap break-all">
                    <span className="text-white/30 shrink-0">#</span>
                    <span>WhatsApp GST Billing Active</span>
                  </div>
                  <div className="text-white/60 whitespace-pre-wrap break-all">✓ Automated 120 billing invoices in 0.08s</div>
                  <div className="text-blue-400/80 whitespace-pre-wrap break-all">ℹ Generated monthly GST report successfully</div>
                  <div className="text-cyan-400/80 whitespace-pre-wrap break-all">ℹ AI Agent resolved customer support ticket #1480</div>
                  <div className="flex items-center gap-1.5 text-white/40 text-[9px] animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                    <span>WhatsApp notification sent to 45 clients...</span>
                  </div>
                </div>
                
                {/* Metric 1: Business Hours Saved */}
                <div className="bg-white/1 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-24 hover:bg-white/3 transition-colors shadow-lg">
                  <div className="flex items-center justify-between text-white/40 text-xs">
                    <span>Daily Hours Saved</span>
                    <Server size={14} className="text-brand-primary shrink-0" />
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-xl md:text-2xl font-bold text-white tracking-tight">14.5 Hours</span>
                    <span className="text-[9px] md:text-[10px] text-green-400 font-semibold px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20 shrink-0">Saves Lakhs!</span>
                  </div>
                </div>
              </div>

              {/* Center Panel: Primary Analytics & Graph (Span 5) */}
              <div className="md:col-span-5 bg-white/1 border border-white/5 rounded-3xl p-5 flex flex-col justify-between min-h-[180px] md:min-h-[220px] hover:bg-white/3 transition-all shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-2xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Automated Tasks Done</p>
                    <h3 className="text-base md:text-lg font-bold text-white mt-0.5">Business Productivity</h3>
                  </div>
                  <TrendingUp size={16} className="text-brand-primary shrink-0" />
                </div>
                
                {/* Sparkline Graphic */}
                <div className="h-24 w-full flex items-end gap-1.5 md:gap-2 mt-2">
                  {[20, 35, 25, 45, 30, 55, 40, 70, 60, 85, 75, 95].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        i === 11 
                          ? "bg-gradient-to-t from-brand-primary to-[#00d2ff] shadow-[0_0_12px_rgba(26,109,214,0.6)]" 
                          : "bg-white/8 hover:bg-brand-primary/50 hover:shadow-[0_0_8px_rgba(26,109,214,0.3)]"
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-white/30 border-t border-white/8 pt-3 mt-4">
                  <span>May 12 - May 18</span>
                  <span className="flex items-center gap-1 text-green-400 font-semibold font-mono">
                    <Activity size={10} className="shrink-0" />
                    <span>+95% efficiency boost</span>
                  </span>
                </div>
              </div>

              {/* Right Panel: Infrastructure Telemetry & Services (Span 3) */}
              <div className="md:col-span-3 flex flex-col gap-4">
                {/* Automated Systems Status */}
                <div className="bg-white/1 border border-white/5 rounded-2xl p-4 flex flex-col gap-3 hover:bg-white/3 transition-colors shadow-lg">
                  <div className="flex items-center justify-between text-white/40 text-xs">
                    <span>Automated Operations</span>
                    <Database size={14} className="text-brand-primary shrink-0" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/60">WhatsApp Chatbot</span>
                      <span className="text-green-400 font-medium">99.99%</span>
                    </div>
                    <div className="w-full bg-white/6 h-1 rounded-full overflow-hidden">
                      <div className="bg-brand-primary h-full w-[99.99%]" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] mt-1">
                      <span className="text-white/60">Billing Automation</span>
                      <span className="text-green-400 font-medium">99.98%</span>
                    </div>
                    <div className="w-full bg-white/6 h-1 rounded-full overflow-hidden">
                      <div className="bg-brand-primary h-full w-[99.98%]" />
                    </div>
                  </div>
                </div>

                {/* Custom Business App Card */}
                <div className="bg-gradient-to-tr from-[#1A6DD6]/20 to-blue-500/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-28 hover:border-white/20 transition-all shadow-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between text-[9px] text-brand-primary font-bold uppercase tracking-wider">
                    <span>Custom Business App</span>
                    <Sparkles size={12} className="text-brand-primary shrink-0" />
                  </div>
                  <div className="mt-1">
                    <p className="text-[10px] text-white/40">Accounts & GST App</p>
                    <h4 className="text-sm md:text-base font-bold text-white tracking-tight mt-0.5">Live Business Terminal</h4>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-white/35 border-t border-white/5 pt-2 mt-2">
                    <span>Server: Gurgaon, India</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-16 animate-fade-in [animation-duration:0.8s] [animation-delay:700ms]">
          <Link href="#services" className="text-foreground/25 text-xs sm:text-sm hover:text-foreground/40 transition-colors flex flex-col items-center gap-1.5">
            <span>Explore services</span>
            <ArrowDown size={12} className="animate-bounce" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}