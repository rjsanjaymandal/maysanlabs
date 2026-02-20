import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { caseStudies } from "@/lib/case-studies-data";
import { ArrowLeft, CheckCircle2, Zap, Target, Cpu } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

  return {
    title: `${study.title} — Case Study`,
    description: study.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-20" />
        <div className="container relative z-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            <span className="section-label">
              {study.category} — {study.year}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              {study.title}
            </h1>
            <p className="text-2xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">
              &quot;{study.challenge}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary/30 border-b border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {study.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-16">
              {/* Challenge */}
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="text-primary" />
                  The Challenge
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Cpu className="text-primary" />
                  Technical Solution
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="text-primary" />
                  Operational Impact
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {study.impact.map((item, i) => (
                    <li
                      key={i}
                      className="glass-card p-6 flex items-start gap-4"
                    >
                      <CheckCircle2
                        className="text-primary shrink-0 mt-1"
                        size={24}
                      />
                      <span className="text-foreground/90 font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-8 sticky top-32">
                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">
                  Project Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-mono text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-border">
                  <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">
                    Ready to scale?
                  </h4>
                  <Link
                    href="/init"
                    className="btn btn-primary w-full text-center py-4 rounded-xl"
                  >
                    Discuss your project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
