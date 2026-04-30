"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function CaseStudiesClient() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      <PageHeader
        label="REAL-WORLD IMPACT"
        title="CASE_STUDIES"
        subtitle="Meticulously engineered services for complex enterprise challenges. Explore our portfolio of industrial-grade transformations."
      />

      <section className="sec-lg relative">
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
                <SpotlightCard className="maysan-card h-full flex flex-col group-hover:border-brand-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="label-mono mb-4 block">
                        {study.category}
                      </span>
                      <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors uppercase tracking-tight italic">
                        {study.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-lg">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="text-body-dim mb-12 leading-relaxed text-sm font-medium flex-1">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-2xl p-6 border border-white/5 group-hover:border-brand-primary/10 transition-colors"
                      >
                        <div className="text-2xl font-black text-brand-primary mb-2 tracking-tighter">
                          {metric.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-mono font-bold">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-10 border-t border-white/5">
                    {study.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] uppercase font-mono tracking-widest px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-white/30 font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 4 && (
                      <span className="text-[10px] uppercase font-mono px-2 py-1 text-white/10 italic">
                        +{study.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>

          <div className="mt-32 text-center py-24 border-t border-white/5 relative overflow-hidden rounded-[40px] bg-black/20">
            <h3 className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter italic">Ready for your transformation?</h3>
            <Link href="/init">
              <HoverBorderGradient
                containerClassName="rounded-full mx-auto w-fit"
                as="div"
                className="bg-brand-primary text-black font-black flex items-center gap-2"
              >
                <span>BOOK_A_STRATEGY_CALL</span>
                <ArrowUpRight size={18} />
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
