"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { GraduationCap, ArrowRight, ShoppingBag, ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    name: "Maysan Shop",
    tagline: "Commerce without boundaries",
    description: "Full-stack ecommerce solution with inventory, orders, payments, and customer management. Built for scale.",
    icon: ShoppingBag,
    status: "Live",
    href: "/case-studies/flash-fashion-ecommerce",
    category: "Ecommerce",
  },
  {
    name: "Edu-Maysan",
    tagline: "Intelligence for every classroom",
    description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    icon: GraduationCap,
    status: "Live",
    href: "/products/edu-maysan",
    category: "EdTech",
  },
  {
    name: "LogiTrack",
    tagline: "Logistics reimagined",
    description: "Supply chain management system for logistics companies. Real-time tracking and optimization.",
    icon: null,
    status: "Coming Soon",
    href: "#",
    category: "Logistics",
  },
  {
    name: "HealthSync",
    tagline: "Healthcare synchronized",
    description: "Healthcare management platform for clinics and hospitals. Patient records and appointments.",
    icon: null,
    status: "Coming Soon",
    href: "#",
    category: "Healthcare",
  },
];

export default function ProductsClient() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Layers size={12} />
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Built Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl">
              Ready-to-deploy products designed to solve real business problems. From education to healthcare, we've built platforms that scale.
            </p>
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              Start Your Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="group block h-full"
                >
                  <SpotlightCard className="maysan-card h-full group-hover:border-brand-primary/30 group-hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white/[0.03] rounded-xl flex items-center justify-center text-white/40 group-hover:bg-brand-primary/15 group-hover:text-brand-primary transition-all duration-300">
                          {product.icon ? <product.icon size={18} /> : <Layers size={18} />}
                        </div>
                        <span className="text-xs font-medium text-white/30 uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        product.status === "Live" 
                          ? "bg-brand-primary/10 text-brand-primary" 
                          : "bg-white/5 text-white/40"
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.tagline && (
                      <p className="text-brand-primary text-xs font-medium mb-3 italic">
                        {product.tagline}
                      </p>
                    )}
                    <p className="text-white/45 text-sm leading-relaxed mb-5">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 text-brand-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center py-12 border-t border-white/[0.06]">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Need something custom?</h3>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">We also build tailored solutions for unique business requirements.</p>
            <Link href="/init" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              <span>Talk to us</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
