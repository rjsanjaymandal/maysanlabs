"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Cpu } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/blog-data";

interface BlogPageClientProps {
  localPosts: BlogPost[];
  externalPosts: BlogPost[];
}

export default function BlogPageClient({ localPosts, externalPosts }: BlogPageClientProps) {
  const [activeTab, setActiveTab] = useState<"local" | "external">("local");

  const displayedPosts = activeTab === "local" ? localPosts : externalPosts;

  return (
    <div className="flex flex-col w-full">
      {/* Premium Tab Selector */}
      <div className="flex justify-center mb-16 relative z-20">
        <div className="p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center gap-2 shadow-2xl">
          {/* Lab Insights Tab */}
          <button
            onClick={() => setActiveTab("local")}
            className={`relative px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 ${
              activeTab === "local"
                ? "text-black font-black"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {activeTab === "local" && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(26,109,214,0.4)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Cpu size={15} />
              Lab Insights ({localPosts.length})
            </span>
          </button>

          {/* Tech News Feed Tab */}
          <button
            onClick={() => setActiveTab("external")}
            className={`relative px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 ${
              activeTab === "external"
                ? "text-black font-black"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {activeTab === "external" && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(26,109,214,0.4)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Globe size={15} />
              Global Tech News ({externalPosts.length || 0})
            </span>
          </button>
        </div>
      </div>

      {/* Grid listing section */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border border-white/[0.04] bg-white/[0.01] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center text-foreground/30 mb-4 animate-pulse">
                  <Globe size={20} />
                </div>
                <p className="text-foreground/40 text-sm font-semibold">
                  Connecting to automated feed. Please check back in a few moments...
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
