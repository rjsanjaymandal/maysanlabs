import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";
import { GridPattern } from "@/components/ui/grid-pattern";
import { FloatingParticles } from "@/components/ui/particles";

// Dynamic Imports for performance hardening
const BentoGrid = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoGrid), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-white/5 rounded-3xl" />
});
const BentoCard = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoCard));

const OperationsRoadmap = dynamic(() => import("@/components/OperationsRoadmap"), {
  loading: () => <div className="min-h-[400px] bg-transparent" />
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[300px] bg-transparent" />
});

const ContactFooter = dynamic(() => import("@/components/ContactFooter"));

export const metadata: Metadata = {
  title: "Maysan Labs | Custom Software Development",
  description: "We build custom websites, apps, and software that help your business grow.",
};

const trustLogos = [
  "GlobalBridge", "Apex_Systems", "Fortify_Infra", "Quantix_SaaS", "Nexus_Labs", "Cyber_Sync", "Logic_Flow"
];

const bentoFeatures = [
  {
    name: "Built for Scale",
    description: "High-concurrency systems that scale to millions of users without sacrificing performance.",
    className: "md:col-span-2",
    Icon: Cpu,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/10 to-transparent" />,
    href: "/engineering",
    cta: "Learn More",
  },
  {
    name: "Enterprise Security",
    description: "Modern security layers and safe data handling for maximum protection.",
    className: "md:col-span-1",
    Icon: ShieldCheck,
    background: <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent" />,
    href: "/services",
    cta: "Our Standards",
  },
  {
    name: "Flexible Apps",
    description: "Smart architectures that allow your product to grow as your team expands.",
    className: "md:col-span-1",
    Icon: Layers,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />,
    href: "/services",
    cta: "Explore Flow",
  },
  {
    name: "Outcome Driven",
    description: "Our process is built for speed. We deliver high-quality work every week.",
    className: "md:col-span-2",
    Icon: Zap,
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Code2 size={120} className="text-[var(--brand-primary)]" />
      </div>
    ),
    href: "/init",
    cta: "Work With Us",
  },
];

export default function Home() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />
      <Hero />
      
      {/* ─── Trust Section: Magic UI Marquee ─── */}
      <section className="py-20 border-y border-white/5 bg-black/20 overflow-hidden relative">
        <GridPattern className="opacity-50" />
        <div className="container-main mb-10 text-center relative z-10">
           <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/60">Trusted by Leading Enterprises</span>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {trustLogos.map((logo) => (
            <span key={logo} className="text-2xl font-black tracking-tighter uppercase italic mx-8 opacity-30 hover:opacity-100 transition-opacity cursor-default text-white">
              {logo}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── Bento Grid Section: Maysan Engineering Excellence ─── */}
      <section className="sec-xl container-main relative">
        <FloatingParticles count={15} color="var(--brand-primary)" className="opacity-30" />
        <div className="mb-20">
          <span className="announcement-bar !mb-6">Built Right</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
            Maysan Engineering<br />
            <span className="text-[var(--brand-primary)] italic">Excellence.</span>
          </h2>
        </div>

        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      {/* ─── Process Flow Redesign ─── */}
      <OperationsRoadmap />

      {/* ─── Final CTA ─── */}
      <section className="sec-xl relative overflow-hidden">
        <GridPattern className="opacity-30" />
        <FloatingParticles count={25} className="opacity-20" />
        <div className="container-main text-center relative z-10">
          <div className="maysan-card border-[var(--brand-primary)]/30 bg-[var(--bg-dark)]/80 backdrop-blur-2xl py-24 group hover:border-[var(--brand-primary)]/60 transition-all duration-500">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Build your<br />
              <span className="text-[var(--brand-primary)] italic">next project.</span>
            </h2>
            <p className="text-white/90 text-xl max-w-xl mx-auto mb-12 font-medium">
              Join leading businesses building their future with Maysan Labs quality standards.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
               <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)]">
                 Book a Strategy Call
                 <ArrowUpRight size={18} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <ContactFooter />
    </main>
  );
}
