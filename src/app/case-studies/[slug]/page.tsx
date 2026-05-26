import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowLeft, CheckCircle2, Zap, Target, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateCaseStudySEO, generateCaseStudyJSONLD } from "@/lib/seo/helpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study Not Found" };

  // Use automated SEO helper
  return generateCaseStudySEO(
    {
      title: study.title,
      slug: study.slug,
      excerpt: study.challenge,
      content: study.solution,
      date: study.year,
      client: study.client,
      industry: study.category,
      results: study.impact,
      technologies: study.technologies
    },
    "https://maysanlabs.com"
  );
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const studyJSONLD = generateCaseStudyJSONLD(
    {
      title: study.title,
      slug: study.slug,
      excerpt: study.challenge,
      content: study.solution,
      date: study.year,
      client: study.client,
      industry: study.category,
      results: study.impact,
      technologies: study.technologies
    },
    "https://maysanlabs.com"
  );

  return (
    <main className="min-h-screen bg-[var(--bg-dark)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(studyJSONLD),
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-brand-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Case Studies</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
                {study.category}
              </span>
              <span className="text-foreground/30">•</span>
              <span className="text-foreground/40 text-sm">{study.year}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-tight">
              {study.title}
            </h1>
            
            <p className="text-xl text-foreground/50 leading-relaxed border-l-4 border-brand-primary pl-6 py-2">
              &ldquo;{study.challenge}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-y border-white/[0.06] bg-white/[0.01]">
        <div className="container-main">
          <div className="grid grid-cols-3 gap-8">
            {study.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/40 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-main">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Target className="text-brand-primary" size={20} />
                  The Challenge
                </h2>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6">
                  <p className="text-foreground/60 text-base leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Cpu className="text-brand-primary" size={20} />
                  Technical Implementation
                </h2>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6">
                  <p className="text-foreground/60 text-base leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Zap className="text-brand-primary" size={20} />
                  Operational Impact
                </h2>
                <ul className="space-y-4">
                  {study.impact.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl"
                    >
                      <CheckCircle2
                        className="text-brand-primary shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-foreground/70 font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-5">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg text-sm text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                    Ready to scale?
                  </h4>
                  <Link
                    href="/init"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] transition-all duration-200"
                  >
                    <span>Discuss your project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
