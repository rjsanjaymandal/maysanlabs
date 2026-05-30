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
        <h1>Maysan Labs Case Studies - Enterprise Software Implementation Records</h1>
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
                  <SpotlightCard className="maysan-card h-full group-hover:border-brand-primary/30 group-hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                          {study.category}
                        </span>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                          {study.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.05] text-foreground/40 group-hover:bg-brand-primary group-hover:text-black group-hover:border-brand-primary transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    <p className="text-foreground/45 text-sm leading-relaxed mb-5">
                      {study.challenge}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {study.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04] group-hover:border-brand-primary/10 transition-colors"
                        >
                          <div className="text-lg font-bold text-brand-primary mb-0.5">
                            {metric.value}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-medium">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2.5 py-1 bg-white/[0.02] rounded-full border border-white/[0.04] text-foreground/40"
                        >
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 4 && (
                        <span className="text-xs font-medium px-2 py-1 text-foreground/20">
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
