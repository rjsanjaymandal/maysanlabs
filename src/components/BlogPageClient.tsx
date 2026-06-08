"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ExternalLink, Clock, User, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

const POSTS_PER_PAGE = 9;

interface BlogPageClientProps {
  localPosts: BlogPost[];
  externalPosts: BlogPost[];
}

const categoryAccents: Record<string, { bg: string; text: string; border: string; hex: string }> = {
  "Strategy":        { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-400/30", hex: "#3b82f6" },
  "Infrastructure":  { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-400/30", hex: "#10b981" },
  "Methodology":      { bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-400/30", hex: "#a855f7" },
  "AI & ML":          { bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-400/30", hex: "#f97316" },
  "Security":         { bg: "bg-red-50 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-400/30", hex: "#ef4444" },
  "Performance":      { bg: "bg-cyan-50 dark:bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-400/30", hex: "#06b6d4" },
  "Business":         { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-400/30", hex: "#f59e0b" },
  "Architecture":     { bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-400/30", hex: "#6366f1" },
  "Design":           { bg: "bg-pink-50 dark:bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-400/30", hex: "#ec4899" },
  "Transformation":   { bg: "bg-teal-50 dark:bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "border-teal-400/30", hex: "#14b8a6" },
  "Insights":         { bg: "bg-slate-50 dark:bg-slate-500/10", text: "text-slate-600 dark:text-slate-400", border: "border-slate-400/30", hex: "#64748b" },
  "Optimization":     { bg: "bg-lime-50 dark:bg-lime-500/10", text: "text-lime-600 dark:text-lime-400", border: "border-lime-400/30", hex: "#84cc16" },
};

function getAccent(category: string) {
  return categoryAccents[category] || { bg: "bg-gray-50 dark:bg-gray-500/10", text: "text-gray-600 dark:text-gray-400", border: "border-gray-400/30", hex: "#6b7280" };
}

function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function getCategories(posts: BlogPost[]) {
  const cats = new Set(posts.map(p => p.category));
  return ["all", ...Array.from(cats)];
}

function getRecentPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
}

function wrapCard(post: BlogPost, children: React.ReactNode) {
  if (post.externalUrl) {
    return <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">{children}</a>;
  }
  return <Link href={`/blog/${post.slug}`} className="group block h-full">{children}</Link>;
}

function PostCard({ post }: { post: BlogPost }) {
  const isExternal = !!post.externalUrl;
  const accent = getAccent(post.category);

  return wrapCard(post, (
    <article className={`h-full bg-white/70 dark:bg-white/[0.02] border ${accent.border} dark:border-white/[0.06] rounded-xl overflow-hidden hover:shadow-md hover:brightness-[1.02] transition-all duration-300 flex flex-col border-l-2`}>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${accent.bg} ${accent.text}`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
              {post.category}
            </span>
            {isExternal && (
              <span className="flex items-center gap-1 text-[10px] text-foreground/30 font-medium">
                <ExternalLink size={10} />
                External
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-brand-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[8px] font-bold">
                {getInitials(post.author)}
              </div>
              <span className="text-xs text-foreground/40 truncate max-w-[120px]">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-foreground/30">
              <Clock size={10} />
              {post.readTime}
            </div>
          </div>
        </div>
      </article>
    ));
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const accent = getAccent(post.category);
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-primary/5 via-brand-primary/[0.02] to-transparent border border-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/[0.04] rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${accent.bg} ${accent.text}`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-foreground/30">
                <Sparkles size={10} />
                Featured
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-foreground/50 leading-relaxed mb-3 max-w-lg">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground/35">
              <span className="flex items-center gap-1.5"><User size={11} />{post.author}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-full text-sm font-semibold group-hover:bg-brand-primary/90 transition-colors">
            Read
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPageClient({ localPosts, externalPosts }: BlogPageClientProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const allPosts = useMemo(() => {
    const merged = [...localPosts];
    externalPosts.forEach((ep) => {
      if (!merged.find((p) => p.slug === ep.slug)) {
        merged.push(ep);
      }
    });
    return merged;
  }, [localPosts, externalPosts]);

  const featuredPost = useMemo(() => localPosts.find((p) => p.featured), [localPosts]);
  const categories = useMemo(() => getCategories(allPosts), [allPosts]);
  const recentPosts = useMemo(() => getRecentPosts(localPosts), [localPosts]);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (categoryFilter !== "all") {
      posts = posts.filter((p) => p.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [allPosts, categoryFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(0, currentPage * POSTS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Featured */}
        {featuredPost && categoryFilter === "all" && (
          <div className="mb-8">
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full bg-white/80 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === cat
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-white/60 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] text-foreground/50 hover:text-foreground hover:border-brand-primary/20"
              }`}
            >
              {cat === "all" ? "All Posts" : cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-foreground/40 text-sm">
              {searchQuery.trim()
                ? `No articles match "${searchQuery}"`
                : "No posts found for this category."}
            </p>
            </div>
          )}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-2.5 bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 rounded-full text-sm font-medium text-foreground/60 hover:text-foreground hover:border-brand-primary/30 transition-all"
            >
              Load more articles
            </button>
          </div>
        )}
        {!hasMore && filteredPosts.length > POSTS_PER_PAGE && (
          <p className="mt-5 text-xs text-foreground/25 text-center">Showing all {filteredPosts.length} articles</p>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 space-y-6">
        {/* Recent posts */}
        <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">Recent Articles</h3>
          <div className="space-y-3">
            {recentPosts.map((post) => {
              const accent = getAccent(post.category);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <span className="w-0.5 shrink-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: accent.hex }} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/70 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-[10px] text-foreground/30 mt-1">{post.readTime} · {post.author}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">Topics</h3>
          <div className="flex flex-wrap gap-1.5">
            {categories.filter(c => c !== "all").map((cat) => {
              const accent = getAccent(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-brand-primary text-white"
                      : `${accent.bg} ${accent.text} hover:opacity-80`
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 rounded-xl p-5 text-center">
          <h3 className="text-sm font-semibold text-foreground mb-2">Have a project in mind?</h3>
          <p className="text-xs text-foreground/40 mb-4">Let&apos;s talk about how we can help you grow.</p>
          <Link
            href="/start"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white rounded-full text-xs font-semibold hover:bg-brand-primary/90 transition-colors"
          >
            Get in touch <ChevronRight size={12} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
