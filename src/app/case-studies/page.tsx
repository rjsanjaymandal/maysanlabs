import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Enterprise Software Success Stories",
  description: "Explore our case studies showcasing successful enterprise software implementations, SaaS services, and custom development projects by Maysan Labs.",
  keywords: ["case studies", "success stories", "enterprise software examples", "SaaS case studies", "custom software portfolio"],
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-20 opacity-10" />

      <PageHeader
        label="REAL-WORLD IMPACT"
        title="CASE_STUDIES"
        subtitle="Meticulously engineered services for complex enterprise challenges. Explore our portfolio of industrial-grade transformations."
      />

      <section className="sec-xl">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
                <SpotlightCard className="maysan-card !p-10 h-full flex flex-col group-hover:border-[#007AFF]/40 transition-colors">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-[#007AFF] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block">
                        {study.category}
                      </span>
                      <h3 className="text-3xl font-black text-white group-hover:text-[#007AFF] transition-colors uppercase tracking-tight">
                        {study.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center border border-[#007AFF]/20 text-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-all duration-500 shadow-lg">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="text-white/40 mb-12 leading-relaxed text-sm font-medium flex-1">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-2xl p-6 border border-white/5 group-hover:border-[#007AFF]/10 transition-colors"
                      >
                        <div className="text-2xl font-black text-[#007AFF] mb-2 tracking-tighter">
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

          {/* Bottom CTA */}
          <div className="mt-32 text-center py-20 border-t border-white/5">
            <h3 className="text-3xl font-black mb-12 uppercase tracking-tighter">Ready for your transformation?</h3>
            <Link href="/init" className="pill-btn pill-btn-primary mx-auto min-w-[280px]">
              Initialize Architecture Review
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
