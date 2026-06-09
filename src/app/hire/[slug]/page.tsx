import { notFound } from "next/navigation";
import { seoLandingPages } from "@/lib/seo-landing-data";
import Navbar from "@/components/Navbar";
import { ContactFooter, Testimonials, MultiStepForm } from "@/components/dynamic/ClientImports";
import StatsSection from "@/components/StatsSection";
import { generatePageSEO } from "@/lib/seo/helpers";
import { Metadata } from "next";
import { Zap, CheckCircle2, Star, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export const revalidate = 86400; // Cache for 24 hours
export const dynamicParams = true; // Allow auto-generated location pages (ISR)

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = seoLandingPages.find((p) => p.slug === slug);
  if (!page) return { title: "Page Not Found" };

  return generatePageSEO({
    title: page.title,
    description: page.description,
    path: `/hire/${page.slug}`,
    keywords: [
      page.roleName.toLowerCase(),
      `${page.roleName.toLowerCase()} gurgaon`,
      `hire ${page.roleName.toLowerCase()}`,
      "maysan labs developers",
      "software development company gurgaon"
    ]
  });
}

export async function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export default async function ProgrammaticLandingPage({ params }: LandingPageProps) {
  const { slug } = await params;
  const page = seoLandingPages.find((p) => p.slug === slug);
  if (!page) notFound();

  // Dynamic Schema Markup
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maysanlabs.com" },
      { "@type": "ListItem", "position": 2, "name": "Hire", "item": `https://maysanlabs.com/hire/${page.slug}` }
    ]
  };

  const serviceJSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${page.roleName} Development Services`,
    "description": page.description,
    "provider": {
      "@type": "Organization",
      "name": "Maysan Labs",
      "url": "https://maysanlabs.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": page.location
    }
  };

  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }} />

      <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-primary/[0.04] blur-[130px] rounded-full pointer-events-none" />
          <div className="container-main text-center relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap size={12} className="animate-pulse" />
              Gurgaon Elite Hiring
            </span>
            <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[1.1] tracking-[-0.02em]">
              Hire Top-Tier <span className="bg-gradient-to-r from-brand-primary to-[#00d2ff] bg-clip-text text-transparent">{page.roleName}s</span> in Gurgaon
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              Access curated React, Node.js, and cloud software engineering talent in Sector 44, Gurgaon. Scale your product with developers who build ultra-fast, robust SaaS solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#start" className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(26,109,214,0.3)] transition-all">
                Hire Now <ArrowRight size={14} />
              </Link>
              <Link href="#capabilities" className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] rounded-lg text-sm font-semibold transition-all">
                Our Capabilities
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <StatsSection />

        {/* Core Capabilities & Tech Stack Section */}
        <section id="capabilities" className="py-20 border-t border-gray-100 dark:border-white/[0.05]">
          <div className="container-main max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-4">
                <Cpu size={12} />
                Technical Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Engineered for Performance & Scale
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Skills Card */}
              <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-brand-primary" size={20} />
                  Core Competencies
                </h3>
                <ul className="space-y-4">
                  {page.skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Card */}
              <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <Cpu className="text-brand-primary" size={20} />
                    Verified Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {page.techStack.map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 text-xs font-semibold bg-white/60 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg text-foreground/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-brand-primary/[0.03] border border-brand-primary/10">
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    <strong>Note:</strong> All developers are fully vetted, undergo continuous internal training in Gurgaon, and use state-of-the-art secure equipment.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {page.features.map((feature, index) => (
                <div key={index} className="bg-gradient-to-b from-white/80 to-white/30 dark:from-white/[0.03] dark:to-transparent border border-gray-100 dark:border-white/[0.05] rounded-xl p-5 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                    <Star size={16} />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 border-t border-gray-100 dark:border-white/[0.05]">
          <Testimonials />
        </section>

        {/* Dynamic FAQ */}
        <section className="py-20 border-t border-gray-100 dark:border-white/[0.05]">
          <div className="container-main max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq, index) => (
                <div key={index} className="bg-white/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5 sm:p-6">
                  <h4 className="text-sm font-bold text-foreground mb-2.5">{faq.question}</h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Booking Form */}
        <section id="start" className="py-24 border-t border-gray-100 dark:border-white/[0.05] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-main max-w-2xl mx-auto relative z-10 px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                Start Project
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
                Schedule a Consultation
              </h2>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Describe your requirements, and we will get back to you with a curated proposal and developer profiles within 24 hours.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm">
              <MultiStepForm />
            </div>
          </div>
        </section>

        <ContactFooter />
      </main>
    </>
  );
}
