"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  GraduationCap, 
  Bus, 
  ArrowRight,
  ArrowUpRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";

export default function EduMaysanClient() {
  const features = [
    {
      name: "Financial ERP",
      description: "Comprehensive fee management, automated invoicing, and real-time financial auditing for institutions.",
      Icon: CreditCard,
    },
    {
      name: "Academic Hub",
      description: "Advanced gradebooks and exam scheduling with interactive LMS capabilities.",
      Icon: GraduationCap,
    },
    {
      name: "Identity & Auth",
      description: "Biometric and smart tracking integration for secure campus access.",
      Icon: Users,
    },
    {
      name: "Logistics & Fleet",
      description: "Real-time transport tracking and route optimization for institution assets.",
      Icon: Bus,
    }
  ];

  return (
    <main id="main-content" aria-label="Edu-Maysan LMS Product Information" className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-brand-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
                <GraduationCap size={12} />
                Live Product
              </span>
              <span className="text-foreground/30">•</span>
              <span className="text-foreground/40 text-sm">EdTech</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Edu-Maysan
            </h1>
            <p className="text-xl text-foreground/50 mb-8 max-w-xl">
              Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics into one seamless system.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/start" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
                Book a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/case-studies" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-foreground/70 font-semibold text-sm hover:bg-white/[0.08] hover:text-foreground hover:border-white/25 transition-all duration-200">
                View Case Study <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Platform Capabilities</h2>
            <p className="text-foreground/40 max-w-xl mx-auto">A comprehensive school management system designed for modern educational institutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="maysan-card">
                  <div className="w-11 h-11 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4">
                    <feature.Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-foreground/45 text-sm">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Need a similar education platform?</h2>
            <p className="text-foreground/40 mb-8 max-w-xl mx-auto">We build custom educational solutions tailored to your institution&apos;s requirements.</p>
            <Link href="/start" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}