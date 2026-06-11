import dynamic from "next/dynamic";
import { generateIndividualReviewSchemas } from "@/lib/seo/schema";
import { blogPosts } from "@/lib/blog-data";
import { Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import LatestInsights from "@/components/LatestInsights";
import { fetchTechNewsServer } from "@/lib/news-fetcher";
import Newsletter from "@/components/Newsletter";
const LogoMarquee = dynamic(() => import("@/components/LogoMarquee"));
const Problem = dynamic(() => import("@/components/Problem"));
const BuildScaleGrow = dynamic(() => import("@/components/BuildScaleGrow"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));

const ArchitectureVisualizer = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ArchitectureVisualizer));
const ROICalculator = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ROICalculator));
const MultiStepForm = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.MultiStepForm));
const ScrollTimeline = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ScrollTimeline));
const Testimonials = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.Testimonials));
const Services = dynamic(() => import("@/components/Services"));
const ToolsShowcase = dynamic(() => import("@/components/ToolsShowcase"));
const FAQ = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.FAQ));
const ContactFooter = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ContactFooter));
const TechNewsFeed = dynamic(() => import("@/components/TechNewsFeed"));
const TrendingTopics = dynamic(() => import("@/components/TrendingTopics"));

export const revalidate = 3600;

export default async function Home() {
  const news = await fetchTechNewsServer();
  const today = new Date().toISOString().split("T")[0];
  const visibleBlogPosts = blogPosts.filter(
    (post) => process.env.NODE_ENV !== "production" || !post.draft
  );
  const latestPosts = visibleBlogPosts.slice(0, 3).map((post, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://maysanlabs.com/blog/${post.slug}`,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
    },
  }));

  return (
    <main id="main-content" aria-label="Maysan Labs Homepage" className="min-h-screen relative overflow-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://maysanlabs.com/#webpage",
                "url": "https://maysanlabs.com/",
                "name": "Maysan Labs - Enterprise SaaS Development Company",
                "description": "Custom software development, cloud infrastructure, and enterprise SaaS solutions.",
                dateModified: today,
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: [".hero-title-text", ".geo-summary"],
                },
                about: { "@type": "Organization", name: "Maysan Labs" },
              },
              {
                "@type": "ItemList",
                itemListElement: latestPosts,
              },
            ],
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateIndividualReviewSchemas())
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <StatsSection />
 
      {/* LogoMarquee Section */}
      <section className="py-8 md:py-12 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="container-main mb-6 md:mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Trusted by fast-growing companies
          </span>
        </div>
        <LogoMarquee />
      </section>

      {/* Problem Section */}
      <ScrollReveal className="content-auto-wide">
        <Problem />
      </ScrollReveal>

      {/* Services Section */}
      <ScrollReveal className="content-auto-wide">
        <Services />
      </ScrollReveal>

      {/* Trending Topics - auto-rotates hourly */}
      <TrendingTopics />

      {/* Why Choose Us - Build Scale Grow */}
      <ScrollReveal className="content-auto-wide">
        <section className="sec-xl container-main relative">
          <div className="mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          <h2 className="heading-lg sm:heading-xl tracking-[-0.02em] text-foreground text-center">
            <span className="bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(26,109,214,0.2)] dark:drop-shadow-[0_0_20px_rgba(26,109,214,0.4)]">Build</span>.{" "}
            <span className="bg-gradient-to-r from-[#10b981] to-[#14b8a6] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">Scale</span>.{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#facc15] bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">Grow.</span>
          </h2>
          <p className="text-foreground/60 text-sm md:text-base max-w-2xl mx-auto mt-6 leading-relaxed font-medium text-center">
            Three simple steps to take your business from idea to launch to growth.
          </p>
        </div>

        <BuildScaleGrow />
      </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal delay={0.1} className="content-auto-wide">
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal className="content-auto-wide">
        <ArchitectureVisualizer />
      </ScrollReveal>

      <ScrollReveal className="content-auto-wide">
        <ScrollTimeline />
      </ScrollReveal>

      {/* Latest Insights - auto-updates with new blog posts */}
      <ScrollReveal className="content-auto-wide">
        <LatestInsights />
      </ScrollReveal>

      <ToolsShowcase />

      <ScrollReveal delay={0.1} className="content-auto-wide">
        <ROICalculator />
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="content-auto">
        <FAQ />
      </ScrollReveal>

      {/* Start Your Project */}
      <ScrollReveal>
        <section id="start" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent dark:from-brand-primary/10 dark:via-brand-primary/5 dark:to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full blur-[130px] bg-brand-primary/5 dark:bg-brand-primary/10 pointer-events-none" />
          <div className="container-main max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 dark:bg-white/[0.03] border border-brand-primary/20 dark:border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <Send size={12} className="text-brand-primary" />
                Let&apos;s Build
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.02em] text-foreground mb-4">
                Start Your <span className="text-brand-primary">Project</span>
              </h2>
              <p className="text-foreground/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
                Answer a few quick questions about what you need, and we&apos;ll get back to you within 24 hours with a clear plan and price.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm">
              <MultiStepForm />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <TechNewsFeed initialNews={news} />

      <Newsletter />

      <ScrollReveal delay={0.2}>
        <ContactFooter />
      </ScrollReveal>
    </main>
  );
}
