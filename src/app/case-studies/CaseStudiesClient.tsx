"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
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
                className="group"
              >
                <Link 
                  href={`/case-studies/${study.slug}`} 
                  className="flex flex-col h-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/[0.1] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-medium tracking-wide">
                        {study.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-50 tracking-tight leading-tight mt-4 group-hover:text-blue-400 transition-colors duration-300">
                        {study.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {study.challenge}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] group-hover:border-blue-500/20 group-hover:bg-blue-500/[0.03] transition-all duration-300"
                      >
                        <div className="text-xl font-bold text-blue-400 leading-none mb-2 group-hover:scale-105 group-hover:origin-left transition-transform duration-300">
                          {metric.value}
                        </div>
                        <div className="text-[10px] uppercase text-gray-500 tracking-widest font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    {study.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold px-2.5 py-1 bg-white/[0.02] rounded-full border border-white/[0.06] text-gray-400 uppercase tracking-wider group-hover:border-blue-500/20 group-hover:text-gray-300 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 4 && (
                      <span className="text-[10px] font-semibold px-2 py-1 text-gray-500 uppercase tracking-wider">
                        +{study.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center py-12 border-t border-white/[0.06]">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-50 mb-4">Ready for your transformation?</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Let&apos;s discuss how we can help solve your most complex challenges.</p>
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