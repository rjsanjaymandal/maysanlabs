"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Edu-Maysan",
    description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    icon: GraduationCap,
    status: "Live",
    href: "/products/edu-maysan",
  },
  {
    name: "LogiTrack",
    description: "Supply chain management system for logistics companies. Real-time tracking and optimization.",
    icon: null,
    status: "Coming Soon",
    href: "#",
  },
  {
    name: "HealthSync",
    description: "Healthcare management platform for clinics and hospitals. Patient records and appointments.",
    icon: null,
    status: "Coming Soon",
    href: "#",
  },
];

export default function ProductsClient() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      <PageHeader
        label="Products"
        title="OUR_PRODUCTS"
        subtitle="Built solutions designed to solve real business problems. From education to healthcare."
      />

      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <Link
                key={index}
                href={product.href}
                className="group bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60">
                    {product.icon ? <product.icon size={18} /> : null}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    product.status === "Live" 
                      ? "bg-brand-primary/10 text-brand-primary" 
                      : "bg-white/5 text-white/40"
                  }`}>
                    {product.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 text-brand-primary text-sm font-medium">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 text-center py-12 border-t border-white/5">
            <p className="text-white/40 text-sm mb-4">Need something custom?</p>
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-medium text-sm text-black hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-200">
              Talk to us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
