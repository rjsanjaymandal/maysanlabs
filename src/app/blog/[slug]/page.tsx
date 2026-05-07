import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { generateBlogPostSEO } from "@/lib/seo/helpers";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";
  return generateBlogPostSEO(post, siteUrl);
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-brand-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to Articles</span>
          </Link>

          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
                <Tag size={12} />
                {post.category}
              </span>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Clock size={14} />
                {post.readTime} read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 py-5 border-y border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Written by</p>
                  <p className="text-sm font-medium text-white">
                    {post.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Published</p>
                  <p className="text-sm font-medium text-white">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-main max-w-3xl">
          <article className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-white/70 leading-8 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/40 mb-2">Share this article</p>
              <div className="flex gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://maysanlabs.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-lg text-sm text-white/50 hover:text-white hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all">
                  Twitter
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://maysanlabs.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-lg text-sm text-white/50 hover:text-white hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all">
                  LinkedIn
                </a>
              </div>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-medium text-sm text-black hover:shadow-[0_0_20px_rgba(26,109,214,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {(prevPost || nextPost) && (
        <section className="py-12 border-t border-white/[0.06]">
          <div className="container-main max-w-3xl">
            <h3 className="text-base font-semibold text-white/60 uppercase tracking-wider mb-6">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Previous Article
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                    {prevPost.title}
                  </h4>
                  <p className="text-xs text-white/30 mt-1 line-clamp-1">{prevPost.excerpt}</p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300 text-left md:text-right">
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-2 md:justify-end">
                    Next Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">
                    {nextPost.title}
                  </h4>
                  <p className="text-xs text-white/30 mt-1 line-clamp-1">{nextPost.excerpt}</p>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <ContactFooter />
    </main>
  );
}