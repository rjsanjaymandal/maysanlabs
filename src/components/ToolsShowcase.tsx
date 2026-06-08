"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, FileImage, LayoutGrid, ArrowRight, Search, Sparkles, Wrench, BadgePercent, FileText, Share2 } from "lucide-react";

const tools = [
  {
    icon: ShieldAlert,
    title: "Site Checker",
    desc: "Check speed, SEO, and health — just enter a URL.",
    href: "/tools/site-checker",
    gradient: "from-emerald-500 to-teal-400",
    badge: "Site Health",
  },
  {
    icon: FileImage,
    title: "Image Compressor",
    desc: "Shrink images right in your browser. No uploads needed.",
    href: "/tools/image-compressor",
    gradient: "from-teal-500 to-emerald-400",
    badge: "Compress",
  },
  {
    icon: LayoutGrid,
    title: "App Cost Estimator",
    desc: "Get an instant budget and timeline for your custom app.",
    href: "/tools/scope-estimator",
    gradient: "from-rose-500 to-pink-400",
    badge: "Cost Finder",
  },
  {
    icon: BadgePercent,
    title: "Profit Calculator",
    desc: "See how much more your store could earn with a faster site.",
    href: "/tools/headless-roi",
    gradient: "from-amber-500 to-orange-400",
    badge: "Profit Check",
  },
  {
    icon: FileText,
    title: "Policy Generator",
    desc: "Create privacy policy & terms for your website in seconds.",
    href: "/tools/privacy-generator",
    gradient: "from-emerald-500 to-teal-400",
    badge: "Legal Docs",
  },
  {
    icon: Share2,
    title: "Link Preview Maker",
    desc: "Design how your website looks when shared on social media.",
    href: "/tools/og-generator",
    gradient: "from-cyan-500 to-blue-400",
    badge: "Link Preview",
  },
];

export default function ToolsShowcase() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (cleanUrl) {
      router.push(`/tools/site-checker?url=${encodeURIComponent(cleanUrl)}`);
    }
  };

  const sideTools = tools.slice(1, 3);
  const bottomTools = tools.slice(3, 6);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5 border border-brand-primary/20 dark:border-brand-primary/10 text-brand-primary text-xs font-medium mb-4">
            <Wrench size={12} />
            Free Tools
          </span>

          <h2 className="heading-md text-foreground mb-3">
            Tools that <span className="text-brand-primary">actually help</span>
          </h2>
          <p className="text-foreground/60 text-sm md:text-base max-w-lg mx-auto">
            No signups, no gates — just fast tools that solve real problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero Card — Site Checker with inline input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
            <div className="relative bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-6 md:p-8 h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-teal-400/5 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <ShieldAlert size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Site Checker</h3>
                    <p className="text-xs text-foreground/50">Speed &bull; SEO &bull; Health</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full shrink-0">
                  Instant Check
                </span>
              </div>

              <p className="text-sm text-foreground/60 mb-5 leading-relaxed">
                Check Core Web Vitals, SEO issues, action items, and India-market insights for any website.
              </p>

              <form onSubmit={handleCheck} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="yoursite.com"
                      aria-label="Enter a website URL to check"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-foreground/25"
                    />
                  </div>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shrink-0"
                >
                  <Sparkles size={14} className="hidden sm:block" />
                  Check
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/30">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Free &bull; 60s scan &bull; No signup
                </div>
                <Link
                  href="/tools/site-checker"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:gap-2 transition-all"
                >
                  Full Report <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            {sideTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative group flex-1"
                >
                  <div className="relative bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-5 h-full hover:-translate-y-0.5 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                        <Icon size={16} className="text-brand-primary" />
                      </div>
                      <span className="text-[9px] font-semibold text-foreground/40 bg-foreground/5 px-2 py-0.5 rounded-full">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground mb-1">{tool.title}</h3>
                    <p className="text-xs text-foreground/60 mb-4 leading-relaxed">{tool.desc}</p>

                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:gap-2 transition-all"
                    >
                      Open Tool <ArrowRight size={10} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom row — remaining 3 tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6"
        >
          {bottomTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className="relative group"
              >
                <div className="relative bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-5 h-full hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Icon size={16} className="text-brand-primary" />
                    </div>
                    <span className="text-[9px] font-semibold text-foreground/40 bg-foreground/5 px-2 py-0.5 rounded-full">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-foreground/60 mb-4 leading-relaxed">{tool.desc}</p>

                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:gap-2 transition-all"
                  >
                    Open Tool <ArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-8 text-center"
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-brand-primary bg-white/30 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] px-6 py-3 rounded-full hover:border-brand-primary/30 transition-all"
          >
            View All Tools <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
