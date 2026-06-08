"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesClient() {
  return (
    <main id="main-content" aria-label="Maysan Labs Case Studies" className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="container-main relative">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Briefcase size={12} />
              Real-World Impact
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground mb-6 leading-[1.05]">
              Case Studies
            </h1>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl">
              Explore our portfolio of industrial-grade transformations.
            </p>
            <Link href="/start" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((study) => (
              <div
                key={study.slug}
                className="group"
              >
                <Link 
                  href={`/case-studies/${study.slug}`} 
                  className="flex flex-col h-full bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-6 md:p-8 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-medium">
                        {study.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground tracking-tight leading-tight mt-4 group-hover:text-brand-primary transition-colors">
                        {study.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/50 border border-gray-200 flex items-center justify-center text-foreground/40 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  <p className="text-foreground/60 text-sm leading-relaxed mb-8 flex-1">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/50 rounded-xl p-4 border border-gray-100 group-hover:border-brand-primary/20 transition-all"
                      >
                        <div className="text-xl font-bold text-brand-primary leading-none mb-2">
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs uppercase text-foreground/50 tracking-widest font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {study.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold px-2.5 py-1 bg-brand-primary/10 rounded-full text-foreground/70 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 4 && (
                      <span className="text-[10px] font-semibold px-2 py-1 text-foreground/50 uppercase tracking-wider">
                        +{study.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center py-12 border-t border-gray-100">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Ready for your transformation?</h3>
            <p className="text-foreground/60 mb-8 max-w-lg mx-auto">Let&apos;s discuss how we can help solve your challenges.</p>
            <Link href="/start" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}