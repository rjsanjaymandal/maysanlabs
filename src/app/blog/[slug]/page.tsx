import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { generateBlogPostSEO, generateBlogPostJSONLD } from "@/lib/seo/helpers";

export const revalidate = 3600;
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const categoryAccents: Record<string, { bg: string; text: string; hex: string }> = {
  "Strategy":        { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", hex: "#3b82f6" },
  "Infrastructure":  { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", hex: "#10b981" },
  "Methodology":      { bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", hex: "#a855f7" },
  "AI & ML":          { bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", hex: "#f97316" },
  "Security":         { bg: "bg-red-50 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", hex: "#ef4444" },
  "Performance":      { bg: "bg-cyan-50 dark:bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", hex: "#06b6d4" },
  "Business":         { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", hex: "#f59e0b" },
  "Architecture":     { bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", hex: "#6366f1" },
  "Design":           { bg: "bg-pink-50 dark:bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", hex: "#ec4899" },
  "Transformation":   { bg: "bg-teal-50 dark:bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", hex: "#14b8a6" },
  "Insights":         { bg: "bg-slate-50 dark:bg-slate-500/10", text: "text-slate-600 dark:text-slate-400", hex: "#64748b" },
  "Optimization":     { bg: "bg-lime-50 dark:bg-lime-500/10", text: "text-lime-600 dark:text-lime-400", hex: "#84cc16" },
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";
  return generateBlogPostSEO(post, siteUrl);
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";
  const blogJSONLD = generateBlogPostJSONLD(post, siteUrl);
  const accent = categoryAccents[post.category] || { bg: "bg-gray-50 dark:bg-gray-500/10", text: "text-gray-600 dark:text-gray-400", hex: "#6b7280" };

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJSONLD) }} />
        <Navbar />

        {/* Article header */}
        <section className="pt-32 pb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-primary/[0.04] blur-[100px] rounded-full pointer-events-none" />
          <div className="container-main relative max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground/35 hover:text-brand-primary transition-colors mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to articles
            </Link>

            <header>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${accent.bg} ${accent.text}`}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-foreground/35">
                  <Clock size={12} />
                  {post.readTime} read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight tracking-tight">
                {post.title}
              </h1>

              <p className="text-base md:text-lg text-foreground/50 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-gray-100 dark:border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[9px] font-bold border border-brand-primary/15">
                    {getInitials(post.author)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground/70">{post.author}</p>
                    <time className="text-[10px] text-foreground/35" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </section>

        {/* Article content */}
        <section className="py-6">
          <div className="container-main max-w-3xl mx-auto">
            <div className="flex gap-8">
              {/* Floating share */}
              <div className="hidden lg:flex flex-col items-center gap-2 sticky top-24 self-start pt-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/20 [writing-mode:vertical-lr] mb-2">Share</span>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(siteUrl + "/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all text-[10px] font-bold">
                  X
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(siteUrl + "/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all text-[10px] font-bold">
                  in
                </a>
              </div>

              {/* Content */}
              <article className="flex-1 min-w-0">
                <div className="bg-white/70 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.04] rounded-xl p-6 md:p-10 shadow-sm">
                  <div className="max-w-none">
                    {post.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-[15px] md:text-[17px] text-foreground/70 leading-[1.75] mb-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag} href="/blog" className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/70 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] text-foreground/50 hover:text-brand-primary hover:border-brand-primary/20 transition-colors">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mobile share */}
                <div className="mt-6 lg:hidden">
                  <p className="text-xs text-foreground/30 mb-2">Share this article</p>
                  <div className="flex gap-2">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(siteUrl + "/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 rounded-lg text-sm font-medium text-foreground/50 hover:text-brand-primary hover:border-brand-primary/30 transition-colors">
                      Twitter
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(siteUrl + "/blog/" + post.slug)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 rounded-lg text-sm font-medium text-foreground/50 hover:text-brand-primary hover:border-brand-primary/30 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 rounded-xl p-6 md:p-8 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Ready to build something great?</h3>
                  <p className="text-sm text-foreground/40 mb-5 max-w-sm mx-auto">Let&apos;s discuss your project. Our team is ready to help.</p>
                  <Link href="/start" className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-full text-sm font-semibold hover:bg-brand-primary/90 transition-colors">
                    Start a project <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 border-t border-gray-100 dark:border-white/[0.04]">
            <div className="container-main max-w-5xl mx-auto">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/30 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => {
                  const relAccent = categoryAccents[rp.category] || accent;
                  return (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] rounded-xl p-5 hover:border-brand-primary/20 hover:shadow-sm transition-all">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${relAccent.bg} ${relAccent.text} mb-2`}>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: relAccent.hex }} />
                        {rp.category}
                      </span>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-foreground/35 mt-2 line-clamp-2">{rp.excerpt}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Prev/Next */}
        {(prevPost || nextPost) && (
          <section className="py-10 border-t border-gray-100 dark:border-white/[0.04]">
            <div className="container-main max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] rounded-xl p-5 hover:border-brand-primary/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[10px] text-foreground/30 mb-1.5">
                      <ArrowLeft size={10} className="group-hover:-translate-x-0.5 transition-transform" />
                      Previous
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">{prevPost.title}</p>
                  </Link>
                ) : <div />}
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`} className="group bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] rounded-xl p-5 hover:border-brand-primary/20 transition-all text-right">
                    <div className="flex items-center justify-end gap-1.5 text-[10px] text-foreground/30 mb-1.5">
                      Next
                      <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">{nextPost.title}</p>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        <ContactFooter />
      </main>
    </>
  );
}
