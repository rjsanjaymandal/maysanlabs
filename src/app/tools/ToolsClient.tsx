"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, BadgePercent, LayoutGrid, Sparkles, ArrowRight, Search, FileText, Share2, Hammer, FileImage } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const categories = ["All", "Site Checks", "Business Calculators", "Quick Tools"];

const tools = [
  {
    title: "Site Checker",
    desc: "Check your website speed, SEO, and health in one click.",
    href: "/tools/seo-analyzer",
    icon: ShieldAlert,
    category: "Site Checks",
    badge: "Site Health",
    color: "from-emerald-500 to-teal-400",
  },
  {
    title: "Profit Calculator",
    desc: "See how much more your store could earn with a faster website.",
    href: "/tools/headless-roi",
    icon: BadgePercent,
    category: "Business Calculators",
    badge: "Profit Check",
    color: "from-amber-500 to-orange-400",
  },
  {
    title: "App Cost Calculator",
    desc: "Get an instant budget and timeline for your custom app idea.",
    href: "/tools/scope-estimator",
    icon: LayoutGrid,
    category: "Business Calculators",
    badge: "Cost Finder",
    color: "from-rose-500 to-pink-400",
  },
  {
    title: "Policy Generator",
    desc: "Create privacy policy & terms for your website in seconds.",
    href: "/tools/privacy-generator",
    icon: FileText,
    category: "Quick Tools",
    badge: "Legal Docs",
    color: "from-violet-500 to-indigo-400",
  },
  {
    title: "Link Preview Maker",
    desc: "Design how your website looks when shared on social media.",
    href: "/tools/og-generator",
    icon: Share2,
    category: "Quick Tools",
    badge: "Link Preview",
    color: "from-fuchsia-500 to-purple-400",
  },
  {
    title: "Image Compressor",
    desc: "Shrink images right in your browser — no uploads needed.",
    href: "/tools/image-compressor",
    icon: FileImage,
    category: "Quick Tools",
    badge: "Compress",
    color: "from-teal-500 to-emerald-400",
  },
];

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col justify-between">
      <div>
        <Navbar />
        
        <div className="pt-36 pb-24 px-4 relative overflow-hidden">
          {/* Ambient light grids */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-main max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <Hammer size={12} className="animate-pulse" />
                Free Tools
              </span>
              <h1 className="text-4xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6">
                Tools to grow <span className="bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] bg-clip-text text-transparent">your business</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Free, simple tools to check your site health, calculate costs, and create legal pages — no signup needed.
              </p>
            </motion.div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-brand-primary text-white shadow-[0_0_20px_rgba(26,109,214,0.3)]"
                        : "bg-white/[0.03] text-foreground/50 hover:bg-white/[0.08] hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  aria-label="Search tools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-foreground/40"
                />
              </div>
            </div>

            {/* Showcase Grid - Intentional Asymmetry to prevent safe template structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map((tool, idx) => {
                const Icon = tool.icon;
                const isOddRow = Math.floor(idx / 2) % 2 === 1;
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`glass-strong border border-white/[0.06] rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-brand-primary/30 transition-all duration-500 relative group overflow-hidden ${
                      isOddRow && idx % 2 === 0 ? "md:translate-y-4" : ""
                    }`}
                  >
                    {/* Glowing Accent */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tool.color} opacity-[0.03] blur-xl group-hover:opacity-[0.08] transition-opacity`} />
                    
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center`}>
                          <Icon size={22} className="text-brand-primary" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase bg-brand-primary/5 border border-brand-primary/10 px-3 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-brand-primary transition-colors">
                        {tool.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-foreground/50 leading-relaxed mb-8">
                        {tool.desc}
                      </p>
                    </div>

                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:text-brand-primary transition-colors group/btn"
                    >
                      Open Tool
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
                <p className="text-foreground/40 text-sm">No tools found matching your query.</p>
              </div>
            )}
            
            {/* Enterprise CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 glass-strong border border-brand-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 blur-[120px] pointer-events-none" />
              <div className="max-w-xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={10} />
                  Custom Solutions
                </span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                  Need custom business software, mobile apps, or automation?
                </h2>
                <p className="text-xs md:text-sm text-foreground/50 leading-relaxed mb-6">
                  We build high-quality custom systems, mobile apps, WhatsApp automation, and customized business software. Talk to the experts at Maysan Labs to scale up your business operations.
                </p>
                <Link
                  href="/start"
                  className="px-6 py-3.5 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.3)] shadow-[0_0_15px_rgba(26,109,214,0.15)] rounded-full font-bold uppercase text-[10px] tracking-wider transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02]"
                >
                  Get a Free Project Call
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <ContactFooter />
    </div>
  );
}
