import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Industrial Proof",
  description:
    "Explore how Maysan Labs engineers high-performance digital systems for global enterprises. Real-world solutions, measurable impact.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        label="REAL-WORLD IMPACT"
        title="CASE STUDIES"
        subtitle="Meticulously engineered solutions for complex enterprise challenges. Explore our portfolio of industrial-grade digital transformations."
      />

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                <SpotlightCard className="glass-card p-10 group h-full cursor-pointer overflow-hidden relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">
                        {study.category}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-lg p-4 border border-border/50"
                      >
                        <div className="text-xl font-bold text-primary mb-1">
                          {metric.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase font-mono px-2 py-1 bg-secondary/50 rounded border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 3 && (
                      <span className="text-[10px] uppercase font-mono px-2 py-1 text-muted-foreground/50">
                        +{study.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
