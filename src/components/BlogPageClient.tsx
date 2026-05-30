"use client";

import { useState, useMemo } from "react";
import { Globe, Cpu, ChevronRight } from "lucide-react";
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
        <div
          role="tablist"
          aria-label="Blog article source"
          className="p-1.5 rounded-full bg-card/80 border border-border/80 dark:bg-white/[0.03] dark:border-white/[0.08] backdrop-blur-xl flex items-center gap-2 shadow-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "local"}
            onClick={() => handleTabChange("local")}
            className={`relative px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 focus-ring ${
              activeTab === "local"
                ? "bg-brand-primary text-white shadow-[0_0_18px_rgba(26,109,214,0.32)]"
                : "text-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Cpu size={15} />
              <span className="sm:hidden">Lab ({localPosts.length})</span>
              <span className="hidden sm:inline">Lab Insights ({localPosts.length})</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "external"}
            onClick={() => handleTabChange("external")}
            className={`relative px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 focus-ring ${
              activeTab === "external"
                ? "bg-brand-primary text-white shadow-[0_0_18px_rgba(26,109,214,0.32)]"
                : "text-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Globe size={15} />
              <span className="sm:hidden">Global ({externalPosts.length || 0})</span>
              <span className="hidden sm:inline">Global Tech News ({externalPosts.length || 0})</span>
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
              type="button"
              aria-pressed={categoryFilter === cat}
              onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 focus-ring ${
                categoryFilter === cat
                  ? "bg-brand-primary text-white"
                  : "bg-card/70 border border-border/70 text-foreground/55 hover:text-foreground hover:border-brand-primary/30 dark:bg-white/[0.03] dark:border-white/[0.08]"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid listing section */}
      <div className="relative min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border border-border/70 bg-card/70 dark:border-white/[0.06] dark:bg-white/[0.02] rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <Globe size={20} />
              </div>
              <p className="text-foreground/50 text-sm font-semibold">
                {activeTab === "external" ? "Connecting to automated feed. Please check back in a few moments..." : "No posts found in this category."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Load More / Pagination */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            aria-label="Load more blog articles"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-card/75 border border-border/80 rounded-full text-sm font-semibold text-foreground/70 hover:text-foreground hover:border-brand-primary/30 transition-all duration-300 focus-ring dark:bg-white/[0.03] dark:border-white/10"
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
