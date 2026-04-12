import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import { Metadata } from "next";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export const metadata: Metadata = {
  title: "Products | Enterprise Engineering Solutions",
  description: "Explore our range of mission-critical software products, from educational intelligence to enterprise ERP systems.",
};

const products = [
  {
    name: "Edu-Maysan",
    description: "The next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    Icon: GraduationCap,
    className: "md:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/10 to-transparent" />,
    href: "/products/edu-maysan",
    cta: "EXPLORE_SYSTEM",
  },
  {
    name: "Coming Soon",
    description: "We are developing new mission-critical modules for logistics and healthcare. Synchronize for updates.",
    Icon: ArrowUpRight,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-black/20" />,
    href: "/init",
    cta: "IN_DEVELOPMENT",
  },
];

export default function ProductsLandingPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navbar />
      
      <PageHeader
        label="OUR ECOSYSTEM"
        title="BUILT_SOLUTIONS"
        subtitle="Industrial-grade software products engineered for autonomous operations and enterprise scale."
      />

      <section className="sec-xl container-main">
        <BentoGrid>
          {products.map((product) => (
            <BentoCard key={product.name} {...product} />
          ))}
        </BentoGrid>

        <div className="mt-40 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-12 block">Synchronizing Architecture</span>
            <div className="max-w-3xl mx-auto py-20 border-y border-white/5 relative">
                <div className="absolute left-1/2 -top-px -translate-x-1/2 w-40 h-px bg-[var(--brand-primary)]/30" />
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                    Need a custom <br /><span className="text-[var(--brand-primary)] italic uppercase">Build?</span>
                </h2>
                <p className="text-white/70 text-lg font-medium mb-12 max-w-xl mx-auto">
                    We specialize in high-fidelity custom development beyond our standard product ecosystem.
                </p>
                <a href="/init" className="pill-btn pill-btn-primary mx-auto !w-fit px-12">
                    Book a Strategy Call
                </a>
            </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
