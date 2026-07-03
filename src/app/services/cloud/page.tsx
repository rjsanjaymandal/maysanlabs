import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import Link from "next/link";
import { ArrowRight, Cloud, Shield, Server, GitBranch } from "lucide-react";

export const metadata: Metadata = generatePageSEO({
  title: "Cloud Infrastructure Services | AWS, DevOps, Kubernetes",
  description: "Cloud infrastructure, DevOps, and Kubernetes consulting for global enterprises. AWS, Azure, GCP, CI/CD pipelines, auto-scaling, and zero-downtime deployments.",
  path: "/services/cloud",
  keywords: [
    "cloud infrastructure services",
    "DevOps consulting",
    "AWS cloud services",
    "Kubernetes consulting",
    "CI/CD pipeline setup",
    "cloud migration services",
    "infrastructure as code",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Cloud Infrastructure", url: "/services/cloud" },
]);

const services = [
  { icon: Cloud, title: "Cloud Architecture & Migration", desc: "Design and migrate to AWS, Azure, or GCP with minimal downtime. Lift-and-shift or full re-architecture." },
  { icon: Server, title: "Kubernetes & Container Orchestration", desc: "Production-grade Kubernetes clusters with auto-scaling, service mesh, and observability built-in." },
  { icon: GitBranch, title: "CI/CD & DevOps Pipelines", desc: "Automated build, test, and deploy pipelines that ship code safely — multiple times a day." },
  { icon: Shield, title: "Security & Compliance", desc: "Zero-trust architectures, SOC 2 readiness, encryption at rest and in transit, and regular penetration testing." },
];

export default function CloudPage() {
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
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight tracking-tight">Cloud Infrastructure</h1>
              <p className="text-base md:text-lg text-foreground/50 leading-relaxed">AWS, Kubernetes, CI/CD, and zero-trust security. We build cloud infrastructure that scales reliably from day one.</p>
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
              <h2 className="text-lg font-semibold text-foreground mb-2">Need cloud infrastructure?</h2>
              <p className="text-sm text-foreground/40 mb-5 max-w-sm mx-auto">Let&apos;s design your cloud architecture together.</p>
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
