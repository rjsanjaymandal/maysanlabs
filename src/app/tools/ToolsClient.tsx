"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, BadgePercent, LayoutGrid, ArrowRight, Search, FileText, Share2, FileImage } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const categories = ["All", "Site Checks", "Business Calculators", "Quick Tools"];

const tools = [
  {
    title: "Site Checker",
    desc: "Check your website speed, SEO, and health in one click.",
    href: "/tools/site-checker",
    icon: ShieldAlert,
    category: "Site Checks",
    badge: "Site Health",
    color: "from-emerald-500 to-teal-400",
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
    color: "from-[#10b981] to-[#14b8a6]",
  },
  {
    title: "Link Preview Maker",
    desc: "Design how your website looks when shared on social media.",
    href: "/tools/og-generator",
    icon: Share2,
    category: "Quick Tools",
    badge: "Link Preview",
    color: "from-cyan-500 to-blue-400",
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
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div>
        <Navbar />
        
        <div className="pt-28 pb-20 px-4 relative overflow-hidden">
          <div className="container-main max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Free Tools for <span className="text-brand-primary">Your Business</span>
              </h1>
              <p className="text-foreground/60 max-w-xl mx-auto">
                Check site health, calculate costs, and create legal pages — no signup needed.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-brand-primary text-white"
                        : "bg-white/80 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-foreground hover:bg-gray-100 dark:hover:bg-white/[0.08]"
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
                  className="w-full bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Showcase Grid - Intentional Asymmetry to prevent safe template structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
                  >
                    {/* Glowing Accent */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tool.color} dark:opacity-[0.03] opacity-[0.06] blur-xl group-hover:opacity-10 dark:group-hover:opacity-[0.08] transition-opacity`} />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center`}>
                          <Icon size={20} className="text-brand-primary" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-brand-primary transition-colors">
                        {tool.title}
                      </h3>
                      
                      <p className="text-sm text-foreground/60 mb-6">
                        {tool.desc}
                      </p>
                    </div>

                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3 transition-all"
                    >
                      Open Tool
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-16 bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl">
                <p className="text-foreground/50">No tools found matching your query.</p>
              </div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm"
            >
              <div>
                <h2 className="text-2xl font-bold mb-3">
                  Need custom business software, mobile apps, or automation?
                </h2>
                <p className="text-foreground/60 mb-6">
                  We build high-quality custom systems, mobile apps, WhatsApp automation, and customized business software.
                </p>
                <Link
                  href="/start"
                  className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Get a Free Project Call
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <ContactFooter />
    </main>
  );
}
