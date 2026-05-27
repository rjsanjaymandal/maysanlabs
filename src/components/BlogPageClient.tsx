"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Globe, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/blog-data";

const POSTS_PER_PAGE = 6;

interface BlogPageClientProps {
  localPosts: BlogPost[];
  externalPosts: BlogPost[];
}

export default function BlogPageClient({ localPosts, externalPosts }: BlogPageClientProps) {
  const [activeTab, setActiveTab] = useState<"local" | "external">("local");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const posts = activeTab === "local" ? localPosts : externalPosts;

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (categoryFilter === "all") return posts;
    return posts.filter((p) => p.category === categoryFilter);
  }, [posts, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(0, currentPage * POSTS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  const handleTabChange = (tab: "local" | "external") => {
    setActiveTab(tab);
    setCategoryFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Premium Tab Selector */}
      <div className="flex justify-center mb-10 relative z-20">
        <div className="p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center gap-2 shadow-2xl">
          <button
            onClick={() => handleTabChange("local")}
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

          <button
            onClick={() => handleTabChange("external")}
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

      {/* Category Filter Pills */}
      {posts.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                categoryFilter === cat
                  ? "bg-brand-primary text-black"
                  : "bg-white/[0.03] border border-white/[0.06] text-foreground/50 hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid listing section */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${categoryFilter}-${currentPage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border border-white/[0.04] bg-white/[0.01] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center text-foreground/30 mb-4 animate-pulse">
                  <Globe size={20} />
                </div>
                <p className="text-foreground/40 text-sm font-semibold">
                  {activeTab === "external" ? "Connecting to automated feed. Please check back in a few moments..." : "No posts found in this category."}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Load More / Pagination */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.03] border border-white/10 rounded-full text-sm font-semibold text-foreground/70 hover:text-foreground hover:border-white/20 transition-all duration-300"
          >
            Load More Articles
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {!hasMore && filteredPosts.length > POSTS_PER_PAGE && (
        <div className="mt-8 text-center">
          <p className="text-xs text-foreground/30 font-medium">
            Showing all {filteredPosts.length} articles
          </p>
        </div>
      )}
    </div>
  );
}
