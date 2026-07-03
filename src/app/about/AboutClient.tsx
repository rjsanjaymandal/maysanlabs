"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import PageHeader from "@/components/PageHeader";
import TeamSection from "@/components/TeamSection";
import { Cpu, Shield, Globe, Target, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Cpu,
    title: "Quality First",
    desc: "We build things right the first time. No technical debt, no shortcuts.",
  },
  {
    icon: Shield,
    title: "Security Focused",
    desc: "Your data stays safe with us. Enterprise-grade security is our standard.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    desc: "We build for globally distributed systems that operate at scale anywhere.",
  },
  {
    icon: Target,
    title: "Result Driven",
    desc: "We focus on outcomes, not just outputs. Every line of code serves a purpose.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Agile methodology with bi-weekly sprints. See progress every 2 weeks.",
  },
  {
    icon: Users,
    title: "Partner Approach",
    desc: "We work as an extension of your team, not just a vendor.",
  },
];

export default function AboutClient() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />

      <Navbar />

      <PageHeader 
        label="About Us"
        title="WHO_WE_ARE"
        subtitle="A team of engineers building scalable software solutions for enterprises and fast-growing startups."
      />

      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-foreground/40 text-sm">What drives us</span>
            <h2 className="heading-md text-foreground mt-2">Our Values</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:border-brand-primary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-foreground/60 mb-4">
                  <value.icon size={18} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/20 border-y border-white/5">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="text-foreground/40 text-sm mb-4 block">Our Story</span>
            <h2 className="heading-md text-foreground mb-6">Built on <span className="text-brand-primary">trust</span></h2>
            <div className="space-y-4 text-foreground/50 text-base leading-relaxed">
              <p>
                We started Maysan Labs to help businesses transform their ideas into scalable software. 
                We saw too many companies struggle with slow development, poor code quality, and lack of technical expertise.
              </p>
              <p>
                Today, we work with enterprises and startups alike, building software that drives real business results. 
                We don&apos;t just write code - we partner with you to achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <ContactFooter />
    </main>
  );
}
