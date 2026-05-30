"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import { ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const liveProducts = [
  {
    name: "Maysan Shop",
    category: "E-Commerce",
    tagline: "Commerce without boundaries",
    description: "Full-stack enterprise e-commerce engine designed for absolute horizontal scale. Unifying high-performance transactional rails, automated inventory tracking, and deep user acquisition analytics in a single unified interface.",
    benefits: [
      "High-performance payment gateway integrations",
      "Real-time multi-warehouse inventory automation",
      "Precision-tuned responsive mobile checkout flow",
      "Autonomous dispatch and logistics pipeline"
    ],
    imageUrl: "/banner-centered-v4.webp",
    iframeUrl: "https://flashhfashion.in/",
    ctaHref: "/case-studies/flash-fashion-ecommerce",
    ctaText: "Explore Case Study",
    secondaryCtaText: "Launch Live Site",
    secondaryCtaHref: "https://flashhfashion.in/",
    scrollPercentage: "80%"
  },
  {
    name: "Edu-Maysan",
    category: "EdTech & Analytics",
    tagline: "Intelligence for every classroom",
    description: "Next-generation management and analytics operating system for modern educational institutions. Seamlessly consolidates financial accounting, student logistics, multi-role academic registries, and dynamic attendance reporting.",
    benefits: [
      "Unified institutional operations control center",
      "Multi-role administrator, teacher, and student dashboards",
      "Real-time academic performance analytics",
      "Advanced biometric and dynamic attendance tracking"
    ],
    imageUrl: "/og-image.png",
    iframeUrl: "https://edumaysan.maysanlabs.com/",
    ctaHref: "/products/edu-maysan",
    ctaText: "Explore Product Details",
    secondaryCtaText: "Launch Live Site",
    secondaryCtaHref: "https://edumaysan.maysanlabs.com/",
    scrollPercentage: "50%"
  }
];

const comingSoonProducts = [
  {
    name: "LogiTrack",
    tagline: "Logistics reimagined",
    description: "Supply chain management system for logistics companies. Real-time tracking and optimization.",
    status: "Coming Soon",
    category: "Logistics",
  },
  {
    name: "HealthSync",
    tagline: "Healthcare synchronized",
    description: "Healthcare management platform for clinics and hospitals. Patient records and appointments.",
    status: "Coming Soon",
    category: "Healthcare",
  },
];

export default function ProductsClient() {
  return (
    <main id="main-content" aria-label="Maysan Labs Flagship Products" className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Layers size={12} />
              Our Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Flagship Products
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl">
              Ready-to-deploy products designed to solve real business problems. From education to healthcare, we&apos;ve built platforms that scale.
            </p>
            <Link href="/start" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-200">
              Start Your Project <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Showcases Section */}
      <section className="py-8 border-t border-white/[0.05]">
        <div className="container-main flex flex-col gap-16 md:gap-24">
          {liveProducts.map((product, index) => (
            <PortfolioShowcase
              key={product.name}
              title={product.name}
              category={product.category}
              tagline={product.tagline}
              description={product.description}
              benefits={product.benefits}
              imageUrl={product.imageUrl}
              iframeUrl={product.iframeUrl}
              ctaHref={product.ctaHref}
              ctaText={product.ctaText}
              secondaryCtaText={product.secondaryCtaText}
              secondaryCtaHref={product.secondaryCtaHref}
              scrollPercentage={product.scrollPercentage}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Grid */}
      <section className="py-16 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="container-main">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#1A6DD6] uppercase mb-3 block">
              Innovation Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              In Active Development
            </h2>
            <p className="text-foreground/40 text-sm mt-3">
              We constantly iterate on new enterprise paradigms. Here are the solutions entering beta testing soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="maysan-card h-full hover:border-[#1A6DD6]/30 hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-medium text-foreground/30 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 text-foreground/40">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  {product.tagline && (
                    <p className="text-[#1A6DD6] text-xs font-medium mb-3 italic">
                      {product.tagline}
                    </p>
                  )}
                  <p className="text-foreground/45 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center py-12 border-t border-white/[0.06]">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Need something custom?</h3>
            <p className="text-foreground/40 mb-8 max-w-lg mx-auto">We also build tailored solutions for unique business requirements.</p>
            <Link href="/start" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary rounded-full font-semibold text-sm text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-200">
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
