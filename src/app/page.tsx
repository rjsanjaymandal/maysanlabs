import dynamic from "next/dynamic";
import { generateIndividualReviewSchemas } from "@/data/seo-schema";
import { blogPosts } from "@/data/blog";
import { Send } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import ScrollReveal from "@/components/effects/scroll-reveal";
import LatestInsights from "@/components/blog/latest-insights";
import { fetchTechNewsServer } from "@/services/news-fetcher";
import Newsletter from "@/components/marketing/newsletter";
const LogoMarquee = dynamic(() => import("@/components/home/logo-marquee"));
const Problem = dynamic(() => import("@/components/marketing/problem"));
const BuildScaleGrow = dynamic(() => import("@/components/home/build-scale-grow"));
const StatsSection = dynamic(() => import("@/components/home/stats-section"));

const ArchitectureVisualizer = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ArchitectureVisualizer));
const ROICalculator = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ROICalculator));
const MultiStepForm = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.MultiStepForm));
const ScrollTimeline = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ScrollTimeline));
const Testimonials = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.Testimonials));
const Services = dynamic(() => import("@/components/marketing/services"));
const ToolsShowcase = dynamic(() => import("@/components/interactive/tools-showcase"));
const FAQ = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.FAQ));
const ContactFooter = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ContactFooter));
const TechNewsFeed = dynamic(() => import("@/components/blog/tech-news-feed"));
const TrendingTopics = dynamic(() => import("@/components/blog/trending-topics"));

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
    <main id="main-content" tabIndex={-1} aria-label="Maysan Labs Homepage" className="min-h-screen relative overflow-hidden text-foreground">
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
                  cssSelector: [".heading-xl", ".hero-subtitle"],
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

      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <StatsSection />
 
      {/* LogoMarquee Section */}
      <section className="py-8 md:py-12 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="container-main mb-6 md:mb-8 text-center">
          <span className="badge-section">Trusted by fast-growing companies</span>
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
            <span className="badge-section">Why Choose Us</span>
          </div>
          <h2 className="heading-lg sm:heading-xl tracking-[-0.02em] text-foreground text-center">
            <span className="bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(26,109,214,0.2)] dark:drop-shadow-[0_0_20px_rgba(26,109,214,0.4)]">Build</span>.{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">Scale</span>.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">Grow.</span>
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
              <span className="badge-section gap-2">
                <Send size={12} />
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
