"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { jobPositions } from "@/lib/careers-data";
import { Users, Target, Rocket, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function CareersClient() {
  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Hero Section with Aceternity Beams */}
      <div className="pt-44 pb-32 relative overflow-hidden">
        <BackgroundBeams />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="announcement-bar">Join the Lab</span>
            <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-8 uppercase mb-8">
              Shape the Future of <br />
              <span className="text-[var(--brand-primary)] italic uppercase">Engineering.</span>
            </h1>
            <p className="text-white/70 max-w-2xl text-xl md:text-2xl font-medium leading-relaxed mb-16">
              We&apos;re looking for radical thinkers and elite engineers to build the mission-critical infrastructure of the modern enterprise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Culture/Values Section */}
      <section className="py-24 border-y border-white/5 bg-black/20 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Rocket size={24} />, title: "Velocity First", desc: "We value speed and decisiveness. We ship early, iterate fast, and maintain absolute quality standards." },
              { icon: <Users size={24} />, title: "Remote Excellence", desc: "Maysan is a globally distributed team. We trust our people to deliver high-fidelity code from anywhere." },
              { icon: <Target size={24} />, title: "Radical Integrity", desc: "We take extreme ownership of our work and its impact. Transparency is our default operational mode." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)] mb-8 border border-[var(--brand-primary)]/20 shadow-lg glow-brand">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{value.title}</h3>
                <p className="text-white/70 leading-relaxed font-medium text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="sec-xl relative">
        <div className="container-main">
          <div className="mb-20">
            <span className="announcement-bar !mb-6">Opportunities</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-4">
              Open <span className="text-[var(--brand-primary)] italic uppercase">Roles.</span>
            </h2>
            <p className="text-white/70 font-medium">
              Join a team engineering the world&apos;s most resilient enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <SpotlightCard className="h-full bg-white/5 border border-white/10 p-10 rounded-[24px] flex flex-col group hover:border-[var(--brand-primary)]/40 transition-colors">
                  <div className="flex items-center justify-between mb-10">
                    <span className="px-4 py-1.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--brand-primary)]/20">
                      {job.category}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight group-hover:text-[var(--brand-primary)] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-10 flex-1 font-medium">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mb-10 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/30">
                      <MapPin size={14} className="text-[var(--brand-primary)]/60" />
                      {job.location}
                    </div>
                  </div>
                  <Link
                    href={`/careers/apply?role=${job.id}`}
                    className="inline-flex items-center gap-4 text-xs font-black text-[var(--brand-primary)] group-hover:gap-6 transition-all uppercase tracking-widest font-black"
                  >
                    APPLY NOW <ArrowRight size={18} />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Opportunistic Hire Section */}
          <div className="mt-32 maysan-card border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 text-center p-16 lg:p-24 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Don&apos;t see a perfect fit?</h3>
              <p className="text-white/70 font-medium max-w-2xl mx-auto mb-12 text-lg">
                We&apos;re always looking for exceptional engineers and architects. If you&apos;re building the future, we want to hear from you.
              </p>
              <Link href="/careers/apply">
                <HoverBorderGradient
                  containerClassName="rounded-full mx-auto w-fit"
                  as="div"
                  className="bg-[var(--brand-gradient)] text-[var(--brand-dark-text)] font-black flex items-center gap-2"
                >
                  <span>OPERATIONAL HIRE</span>
                  <ArrowUpRight size={18} />
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
