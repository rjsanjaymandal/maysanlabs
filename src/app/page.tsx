"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2
} from "lucide-react";
import Marquee from "@/components/ui/marquee";

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
const Services = dynamic(() => import("@/components/Services"));
const FAQ = dynamic(() => import("@/components/FAQ"));

const trustLogos = [
  "EduMaysan", "Maysan Shop", "TechRetail", "StyleHub", "CloudFirst", "DataSync", "AppFlow", "NexTech", "ScaleUp"
];

const stats = [
  { value: "50+", label: "Enterprise Projects" },
  { value: "EduMaysan", label: "Flagship EdTech LMS" },
  { value: "Maysan Shop", label: "Ecommerce Platform" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

const bentoFeatures = [
  {
    name: "Enterprise Scale",
    description: "Architectures that handle millions of users with zero downtime and optimal performance.",
    className: "md:col-span-2",
    Icon: Cpu,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent" />,
    href: "/services",
    cta: "Learn More",
  },
  {
    name: "Security First",
    description: "Bank-grade security with SOC2 compliance, encryption, and regular penetration testing.",
    className: "md:col-span-1",
    Icon: ShieldCheck,
    background: <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />,
    href: "/services",
    cta: "Our Standards",
  },
  {
    name: "Future-Proof",
    description: "Modern tech stack that's easy to maintain, extend, and scale as your business grows.",
    className: "md:col-span-1",
    Icon: Layers,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />,
    href: "/services",
    cta: "See How",
  },
  {
    name: "Fast Delivery",
    description: "Agile methodology with bi-weekly sprints. See progress every 2 weeks.",
    className: "md:col-span-2",
    Icon: Zap,
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Code2 size={120} className="text-brand-primary" />
      </div>
    ),
    href: "/init",
    cta: "Start Project",
  },
];

export default function Home() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden text-foreground">
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8 bg-black/20 border-y border-white/5">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-2 md:py-4"
              >
                <p className="text-2xl md:text-4xl font-bold text-brand-primary mb-0.5">{stat.value}</p>
                <p className="text-white/40 text-[10px] md:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 md:py-12 border-b border-white/5 bg-black/10">
        <div className="container-main mb-6 md:mb-8 text-center">
           <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">Trusted by fast-growing companies</span>
        </div>
        
        {/* Mobile Grid (2 per row) */}
        <div className="md:hidden container-main grid grid-cols-2 gap-4">
          {trustLogos.slice(0, 6).map((logo) => (
            <div key={logo} className="flex items-center justify-center py-4 bg-white/[0.02] border border-white/5 rounded-xl opacity-40">
              <span className="text-sm font-bold text-white tracking-tight">{logo}</span>
            </div>
          ))}
        </div>

        {/* Desktop Marquee */}
        <div className="hidden md:block">
          <Marquee pauseOnHover className="[--duration:25s]">
            {trustLogos.map((logo) => (
              <span key={logo} className="text-base md:text-lg font-medium tracking-wide mx-8 md:mx-10 opacity-30 hover:opacity-50 transition-opacity cursor-default text-white">
                {logo}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="sec-xl container-main relative">
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <Zap size={12} />
              Why Choose Us
            </span>
          </motion.div>
          <h2 className="heading-lg sm:heading-xl text-white">
            Built for <span className="text-brand-primary italic">scale</span>
          </h2>
        </div>

        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      {/* Process Flow */}
      <OperationsRoadmap />

      {/* Services */}
      <Services />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Tech Stack Section */}
      <section className="py-12 border-t border-white/5 bg-black/5">
        <div className="container-main text-center">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Our Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Supabase"].map((tech) => (
              <span key={tech} className="text-white font-semibold text-sm md:text-base">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
