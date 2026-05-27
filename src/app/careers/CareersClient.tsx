"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { jobPositions } from "@/lib/careers-data";
import { Users, Target, Rocket, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CareersClient() {
  return (
    <main aria-label="Careers at Maysan Labs" className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden flex flex-col">
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <h1>Careers at Maysan Labs - Join Our Elite Engineering Team</h1>
        <h2>Open Professional Tech Positions: React Developers, Node.js Engineers</h2>
        <h2>Work Culture: Velocity First, Remote Excellence, and Radical Integrity</h2>
        <span className="author" rel="author">Written by Maysan Labs Careers Team</span>
        <span className="contributor">Contributor: Technical Recruiter</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Maysan Labs Careers refers to the professional developer and engineering employment roles in Gurgaon, India. 
          Software Engineer hiring is defined as seeking engineers with first-hand knowledge in full stack React, Next.js, and Node.js.
        </p>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
        
        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Rocket size={12} />
              Join the Lab
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Shape the Future of <span className="text-brand-primary">Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl">
              We&apos;re looking for radical thinkers and elite engineers to build the mission-critical infrastructure of the modern enterprise.
            </p>
            <Link href="#openings" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              View Open Roles <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Culture/Values Section */}
      <section className="py-16 border-y border-white/5">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Rocket size={20} />, title: "Velocity First", desc: "We value speed and decisiveness. We ship early, iterate fast, and maintain absolute quality standards." },
              { icon: <Users size={20} />, title: "Remote Excellence", desc: "Maysan is a globally distributed team. We trust our people to deliver high-fidelity code from anywhere." },
              { icon: <Target size={20} />, title: "Radical Integrity", desc: "We take extreme ownership of our work and its impact. Transparency is our default operational mode." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 border border-brand-primary/20">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="py-20">
        <div className="container-main">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Target size={12} />
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Open <span className="text-brand-primary">Roles</span>
            </h2>
            <p className="text-foreground/40 text-lg">
              Join a team engineering the world&apos;s most resilient enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/careers/apply?role=${job.id}`} className="group block h-full">
                  <SpotlightCard className="maysan-card h-full group-hover:border-brand-primary/30 group-hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary">
                        {job.category}
                      </span>
                      <span className="text-xs text-foreground/30 font-medium uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-brand-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-foreground/45 text-sm leading-relaxed mb-5">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-2 mb-5 pt-4 border-t border-white/5">
                      <MapPin size={14} className="text-foreground/30" />
                      <span className="text-sm text-foreground/40">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      Apply now <ArrowRight size={14} />
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Opportunistic Hire Section */}
          <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Don&apos;t see a perfect fit?</h3>
            <p className="text-foreground/40 max-w-xl mx-auto mb-8">
              We&apos;re always looking for exceptional engineers and architects. If you&apos;re building the future, we want to hear from you.
            </p>
            <Link href="/careers/apply" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              <span>Apply for Future Roles</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
