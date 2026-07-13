import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import Navbar from "@/components/layout/navbar";
import ContactFooter from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, Code2, Globe, Smartphone, Palette } from "lucide-react";

export const metadata: Metadata = generatePageSEO({
  title: "Web Development Services | React, Next.js, Node.js",
  description: "Custom web development services for global businesses. React, Next.js, Node.js, TypeScript, and cloud-native architectures. From startups to enterprises — we build scalable, performant web applications.",
  path: "/services/web",
  keywords: [
    "web development services",
    "React development company",
    "Next.js development",
    "Node.js backend development",
    "custom web application development",
    "frontend development services",
    "full stack development company",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Web Development", url: "/services/web" },
]);

const services = [
  { icon: Code2, title: "React & Next.js Frontends", desc: "High-performance, SEO-optimized frontends with server-side rendering, static generation, and edge delivery." },
  { icon: Smartphone, title: "Progressive Web Apps", desc: "App-like experiences that work offline, load instantly, and engage users across every device." },
  { icon: Globe, title: "API & Backend Development", desc: "RESTful and GraphQL APIs built with Node.js, TypeScript, and PostgreSQL — designed for scale." },
  { icon: Palette, title: "Design Systems & UI", desc: "Consistent, accessible component libraries that speed up development and ensure brand coherence." },
];

export default function WebDevPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
        <Navbar />

        <section className="pt-32 pb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />
          <div className="container-main relative">
            <div className="max-w-2xl">
              <Link href="/services" className="text-sm text-foreground/30 hover:text-brand-primary transition-colors mb-4 inline-block">&larr; All Services</Link>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight tracking-tight">Web Development</h1>
              <p className="text-base md:text-lg text-foreground/50 leading-relaxed">React, Next.js, Node.js, TypeScript — modern stack for modern businesses. We build web applications that load fast, rank well, and scale globally.</p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <div key={s.title} className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-6">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-3">
                    <s.icon size={16} />
                  </div>
                  <h2 className="text-base font-semibold text-foreground mb-1.5">{s.title}</h2>
                  <p className="text-sm text-foreground/50 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 rounded-xl p-6 md:p-8 text-center">
              <h2 className="text-lg font-semibold text-foreground mb-2">Need a web application?</h2>
              <p className="text-sm text-foreground/40 mb-5 max-w-sm mx-auto">Let&apos;s discuss your project requirements and timeline.</p>
              <Link href="/start" className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-brand-primary/90 transition-all">
                Start your project <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <ContactFooter />
      </main>
    </>
  );
}
