"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { caseStudies, CaseStudy } from "@/lib/case-studies-data";
import { ArrowLeft, CheckCircle2, Zap, Target, Cpu, ArrowRight, Quote, Clock, Share2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import CaseStudyPerformanceToggle from "@/components/CaseStudyPerformanceToggle";
import ScrollRevealImage from "@/components/ScrollRevealImage";

const beforeAfterData: Record<string, {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
  metrics: { label: string; before: string; after: string }[];
}> = {
  "flash-fashion-ecommerce": {
    before: {
      label: "Legacy Ecommerce Bottlenecks",
      items: [
        "Manual inventory tracking across spreadsheets",
        "No real-time order management — 24hr+ sync delay",
        "Server crashes during flash sale traffic spikes",
        "No integrated payment gateway — manual invoicing",
        "Page load times exceeding 4 seconds on mobile",
      ],
    },
    after: {
      label: "Maysan Full-Stack Ecommerce Solution",
      items: [
        "Automated inventory with real-time sync across all channels",
        "50,000+ orders processed with sub-second confirmation",
        "Auto-scaling architecture handles 10x traffic surges",
        "Stripe + UPI integrated with 99.9% payment success rate",
        "Sub-200ms global page load with edge caching",
      ],
    },
    metrics: [
      { label: "Page Load Time", before: "4.2s", after: "<200ms" },
      { label: "Order Processing", before: "24hr+", after: "Real-time" },
      { label: "Uptime", before: "96%", after: "99.9%" },
    ],
  },
  "retail-modular-erp": {
    before: {
      label: "Legacy ERP Bottlenecks",
      items: [
        "Inventory tracked separately across 400+ stores",
        "80% of procurement done manually via phone/email",
        "No unified view of stock across regions",
        "Stock discrepancies causing 15%+ revenue loss",
        "Week-long reconciliation cycles",
      ],
    },
    after: {
      label: "Maysan Modular ERP Solution",
      items: [
        "Real-time edge sync across all 400+ store locations",
        "Automated procurement with ML-based demand forecasting",
        "Unified dashboard with multi-region inventory visibility",
        "80% fewer procurement errors with automated workflows",
        "Daily auto-reconciliation with audit trail",
      ],
    },
    metrics: [
      { label: "Inventory Accuracy", before: "72%", after: "99.9%" },
      { label: "Procurement Errors", before: "~80% manual", after: "80% fewer" },
      { label: "Reconciliation", before: "7 days", after: "Daily" },
    ],
  },
  "fintech-connectivity-bridge": {
    before: {
      label: "Legacy Fintech Bottlenecks",
      items: [
        "Bank API responses averaging 800ms+ latency",
        "Connection drops during peak trading hours",
        "Manual reconciliation between banking systems",
        "No zero-trust security layer — compliance risk",
        "Limited to 10k concurrent connections",
      ],
    },
    after: {
      label: "Maysan Fintech Bridge Solution",
      items: [
        "API-first architecture with sub-35ms average response",
        "1M+ concurrent connections with zero dropoffs",
        "Automated real-time reconciliation engine",
        "Zero-trust security with end-to-end encryption",
        "12 months of production with zero security incidents",
      ],
    },
    metrics: [
      { label: "Response Time", before: "800ms+", after: "<35ms" },
      { label: "Concurrent Connections", before: "10k", after: "1M+" },
      { label: "Security Incidents", before: "Recurring", after: "Zero (12mo)" },
    ],
  },
  "custom-manufacturing-intelligence": {
    before: {
      label: "Legacy Manufacturing Bottlenecks",
      items: [
        "No visibility into real-time production metrics",
        "Unplanned downtime detected too late — costly delays",
        "OEE tracking done manually on paper logs",
        "No predictive maintenance — reactive only",
        "Siloed data across plant floor systems",
      ],
    },
    after: {
      label: "Maysan Industrial IoT Solution",
      items: [
        "Real-time OEE dashboard with live production visibility",
        "Predictive maintenance alerts 48 hours before failure",
        "65% reduction in unplanned downtime",
        "Automated data pipeline from sensors to analytics",
        "Unified IoT platform accessible by all teams",
      ],
    },
    metrics: [
      { label: "Unplanned Downtime", before: "Frequent", after: "65% less" },
      { label: "Maintenance", before: "Reactive only", after: "48hr predictive" },
      { label: "OEE Tracking", before: "Paper logs", after: "Real-time" },
    ],
  },
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function SocialShare({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-foreground/40 flex items-center gap-1"><Share2 size={12} /> Share</span>
      <button
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`, "_blank")}
        className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all"
        aria-label="Share on Twitter"
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>
      <button
        onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encoded}`, "_blank")}
        className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </button>
      <button
        onClick={() => { navigator.clipboard.writeText(url); }}
        className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all"
        aria-label="Copy link"
      >
        <LinkIcon size={12} />
      </button>
    </div>
  );
}

export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
  const related = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <main id="main-content" className="min-h-screen bg-[var(--bg-dark)]">
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.05] z-50">
        <motion.div
          className="h-full bg-brand-primary"
          style={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
        />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-main relative">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-brand-primary transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Case Studies</span>
            </Link>
            <SocialShare url={`https://maysanlabs.com/case-studies/${study.slug}`} title={study.title} />
          </div>

          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
                {study.category}
              </span>
              <span className="text-foreground/30">&bull;</span>
              <span className="text-foreground/40 text-sm">{study.year}</span>
              <span className="text-foreground/30">&bull;</span>
              <span className="text-foreground/40 text-sm">Client: {study.client}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-tight">
              <ScrollRevealImage direction="up">
                {study.title}
              </ScrollRevealImage>
            </h1>

            <p className="text-xl text-foreground/50 leading-relaxed border-l-4 border-brand-primary pl-6 py-2">
              &ldquo;{study.challenge}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 border-y border-white/[0.06] bg-white/[0.01]"
      >
        <div className="container-main">
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {study.metrics.map((metric, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/40 font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Before vs After Performance Toggle */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16"
      >
        <div className="container-main">
          <motion.div variants={fadeUp}>
            <CaseStudyPerformanceToggle
              title={study.title}
              challenge={study.challenge}
              solution={study.solution}
              data={beforeAfterData[study.slug] || {
                before: { label: "Legacy State", items: ["No baseline data available"] },
                after: { label: "Maysan Solution", items: ["Solution implemented", study.solution] },
                metrics: [{ label: "Metric", before: "—", after: "—" }],
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="container-main">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">

              {/* Challenge */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Target className="text-brand-primary" size={20} />
                  The Challenge
                </h2>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6">
                  <p className="text-foreground/60 text-base leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Cpu className="text-brand-primary" size={20} />
                  Technical Implementation
                </h2>
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6">
                  <p className="text-foreground/60 text-base leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </motion.div>

              {/* Timeline */}
              {study.timeline && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                    <Clock className="text-brand-primary" size={20} />
                    Project Timeline
                  </h2>
                  <div className="relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/[0.06]" />
                    <div className="space-y-6">
                      {study.timeline.map((step, i) => (
                        <motion.div
                          key={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={fadeUp}
                          className="flex gap-5"
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-brand-primary">{i + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
                              <span className="text-[10px] uppercase tracking-wider text-brand-primary/70 bg-brand-primary/10 px-2 py-0.5 rounded-full">{step.duration}</span>
                            </div>
                            <p className="text-sm text-foreground/50 leading-relaxed">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Results Detail */}
              {study.resultsDetail && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="bg-gradient-to-r from-brand-primary/5 to-transparent border border-brand-primary/10 rounded-xl p-6"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Zap size={18} className="text-brand-primary" />
                    Results in Detail
                  </h2>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {study.resultsDetail}
                  </p>
                </motion.div>
              )}

              {/* Impact */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
                  <Zap className="text-brand-primary" size={20} />
                  Operational Impact
                </h2>
                <ul className="space-y-4">
                  {study.impact.map((item, i) => (
                    <motion.li
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl"
                    >
                      <CheckCircle2 className="text-brand-primary shrink-0 mt-0.5" size={18} />
                      <span className="text-foreground/70 font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Testimonial */}
              {study.testimonial && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 relative"
                >
                  <Quote size={32} className="text-brand-primary/20 absolute top-6 left-6" />
                  <div className="relative pl-6">
                    <p className="text-lg text-foreground/70 leading-relaxed italic mb-6">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{study.testimonial.author}</p>
                      <p className="text-xs text-foreground/40">{study.testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-5">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg text-sm text-foreground/60 hover:border-brand-primary/20 hover:text-brand-primary transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {study.testimonial && (
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 lg:hidden">
                    <Quote size={16} className="text-brand-primary/30 mb-3" />
                    <p className="text-sm text-foreground/60 italic mb-3">&ldquo;{study.testimonial.quote.slice(0, 120)}...&rdquo;</p>
                    <p className="text-xs font-semibold text-foreground/70">{study.testimonial.author}</p>
                    <p className="text-[10px] text-foreground/40">{study.testimonial.role}</p>
                  </div>
                )}

                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                    Ready to scale?
                  </h4>
                  <p className="text-xs text-foreground/40 mb-4 leading-relaxed">
                    Have a similar challenge? Let&apos;s discuss how we can help your business.
                  </p>
                  <Link
                    href="/start"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] transition-all duration-200"
                  >
                    <span>Discuss your project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <SocialShare url={`https://maysanlabs.com/case-studies/${study.slug}`} title={study.title} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Case Studies */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/[0.06]">
          <div className="container-main">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-5xl mx-auto"
            >
              <motion.div variants={fadeUp} className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-[10px] font-semibold uppercase tracking-wider mb-4">
                  Explore More
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Related Case Studies
                </h2>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((item) => (
                  <motion.div key={item.slug} variants={fadeUp}>
                    <Link
                      href={`/case-studies/${item.slug}`}
                      className="flex flex-col h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-md group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-medium">
                          {item.category}
                        </span>
                        <ArrowRight size={14} className="text-foreground/30 group-hover:text-brand-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground tracking-tight mb-2 group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/50 leading-relaxed mb-4 flex-1">
                        {item.challenge}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.metrics.slice(0, 2).map((m) => (
                          <span key={m.label} className="text-[10px] uppercase tracking-wider text-foreground/40">
                            {m.label}: <span className="font-semibold text-brand-primary">{m.value}</span>
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <ContactFooter />
    </main>
  );
}
