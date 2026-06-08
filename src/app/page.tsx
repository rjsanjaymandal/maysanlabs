import dynamic from "next/dynamic";
import { generateIndividualReviewSchemas } from "@/lib/seo/schema";
import { Zap, Send } from "lucide-react";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Hero = dynamic(() => import("@/components/Hero"));
const ScrollReveal = dynamic(() => import("@/components/ScrollReveal"));
const LogoMarquee = dynamic(() => import("@/components/LogoMarquee"));
const BuildScaleGrow = dynamic(() => import("@/components/BuildScaleGrow"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));

// Client-wrapped dynamic imports with ssr:false for below-fold heavy components
const ArchitectureVisualizer = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ArchitectureVisualizer));
const BrandShowroom = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.BrandShowroom));
const ROICalculator = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ROICalculator));
const MultiStepForm = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.MultiStepForm));
const ScrollTimeline = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ScrollTimeline));
const Testimonials = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.Testimonials));
const Services = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.Services));
const ToolsShowcase = dynamic(() => import("@/components/ToolsShowcase"));
const FAQ = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.FAQ));
const ContactFooter = dynamic(() => import("@/components/dynamic/ClientImports").then(m => m.ContactFooter));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));

export default function Home() {

  return (
    <main id="main-content" aria-label="Maysan Labs Homepage" className="min-h-screen relative overflow-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebPage", "name": "Maysan Labs - Enterprise SaaS Development Company", "description": "Custom software development, cloud infrastructure, and enterprise SaaS solutions.", "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".hero-title-text", ".geo-summary"] } }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateIndividualReviewSchemas())
        }}
      />
      
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Maysan Labs - Custom Software Development Company</span>
        <h2>Custom Software Services & Cloud Hosting Solutions</h2>
        <h2>Modern Web Applications, Business Automation & Digital Tools</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Team</span>
        <span className="contributor">Contributor: Director of Client Solutions</span>
        <time dateTime="2026-06-08" className="pubdate">Last updated: June 8, 2026</time>
        <p className="geo-tldr">
          Maysan Labs is a custom software development studio building websites, mobile apps, and business automation tools for growing companies worldwide.
          Our clients save time and reduce costs with custom digital solutions built for their specific needs.
        </p>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <StatsSection />
 
      {/* Trust Section */}
      <section className="py-8 md:py-12 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="container-main mb-6 md:mb-8 text-center">
           <span className="text-foreground/60 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Trusted by fast-growing companies</span>
        </div>
        <LogoMarquee />
      </section>
 
      {/* Bento Grid Section */}
      <ScrollReveal className="content-auto-wide">
        <section className="sec-xl container-main relative">
          <div className="mb-16">
          <ScrollReveal y={20} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <Zap size={12} />
              Why Choose Us
            </span>
          </ScrollReveal>
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

      <ScrollReveal className="content-auto-wide">
      <ArchitectureVisualizer />
      </ScrollReveal>

      {/* Immersive Panoramic Brand Showroom */}
      <BrandShowroom />

      <ScrollReveal className="content-auto-wide">
      <ScrollTimeline />
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="content-auto-wide">
      <Services />
      </ScrollReveal>

      <ToolsShowcase />

      <ScrollReveal delay={0.1} className="content-auto-wide">
      <ROICalculator />
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="content-auto-wide">
      <Testimonials />
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="content-auto">
      <FAQ />
      </ScrollReveal>

      {/* Start Your Project / Get Started Section */}
      <ScrollReveal className="content-auto-wide">
        <section id="start" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent dark:from-brand-primary/10 dark:via-brand-primary/5 dark:to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full blur-[130px] bg-brand-primary/5 dark:bg-brand-primary/10 pointer-events-none" />
          
          <div className="container-main max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 dark:bg-white/[0.03] border border-brand-primary/20 dark:border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <Send size={12} className="text-brand-primary animate-pulse" />
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

      <ScrollReveal>
      <TrustBadges />
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 border-t border-gray-100 dark:border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-brand-primary/5 dark:bg-brand-primary/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <p className="text-brand-primary/60 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-8">Built With Modern, Trusted Technology</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {["Modern & Fast", "Secure & Reliable", "Mobile-Friendly", "Easy to Update & Manage", "Scales With Your Business", "24/7 Support Ready"].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 text-xs md:text-sm font-semibold text-foreground/60 dark:text-foreground/70 bg-white/60 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-full hover:text-brand-primary hover:border-brand-primary/30 dark:hover:bg-brand-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
      <ContactFooter />
      </ScrollReveal>
    </main>
  );
}
