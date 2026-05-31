"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowRight, ArrowUpRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CaseStudiesClient() {
  return (
    <main id="main-content" aria-label="Maysan Labs Case Studies" className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Maysan Labs Case Studies - Enterprise Software Implementation Records</span>
        <h2>Successful Implementation Records: E-commerce Engines, Custom ERPs</h2>
        <h2>Real-world Performance Metrics: Low Latencies, High Concurrent Users</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Team</span>
        <span className="contributor">Contributor: Technical Director</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Maysan Labs Case Studies refer to verified proof-of-work project records detailing enterprise software development outcomes. 
          Case Study Analysis is defined as compiling quantitative research outcomes showing exact business performance gains.
        </p>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Briefcase size={12} />
              Real-World Impact
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground mb-6 leading-[1.05]">
              Case Studies
            </h1>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl font-medium">
              Meticulously engineered services for complex enterprise challenges. Explore our portfolio of industrial-grade transformations.
            </p>
            <Link href="/start" className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A6DD6] rounded-full font-bold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start Your Project</span>
              <ArrowUpRight size={16} className="relative z-10" />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                  <SpotlightCard className="maysan-card h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 pr-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/8 border border-brand-primary/15 text-brand-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                          {study.category}
                        </span>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors leading-tight">
                          {study.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/[0.06] text-foreground/30 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary group-hover:shadow-[0_0_16px_rgba(26,109,214,0.3)] transition-all duration-500 shrink-0">
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    <p className="text-foreground/50 text-sm leading-relaxed mb-6 flex-1">
                      {study.challenge}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                      {study.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.02] rounded-xl p-3.5 border border-white/[0.05] group-hover:border-brand-primary/20 group-hover:bg-brand-primary/[0.03] transition-all duration-500"
                        >
                          <div className="text-lg font-bold text-brand-primary leading-none mb-1 group-hover:scale-110 group-hover:origin-left transition-transform duration-500">
                            {metric.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-foreground/35 font-semibold leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-semibold px-2.5 py-1 bg-white/[0.02] rounded-full border border-white/[0.05] text-foreground/35 uppercase tracking-wider group-hover:border-brand-primary/15 group-hover:text-foreground/50 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 4 && (
                        <span className="text-[10px] font-semibold px-2 py-1 text-foreground/20 uppercase">
                          +{study.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center py-12 border-t border-white/[0.06]">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Ready for your transformation?</h3>
            <p className="text-foreground/40 mb-8 max-w-lg mx-auto">Let&apos;s discuss how we can help solve your most complex challenges.</p>
            <Link href="/start" className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A6DD6] rounded-full font-bold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Book a Strategy Call</span>
              <ArrowUpRight size={16} className="relative z-10" />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
