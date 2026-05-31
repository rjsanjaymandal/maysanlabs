import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { generateBlogPostSEO, generateBlogPostJSONLD } from "@/lib/seo/helpers";

export const revalidate = 3600;
export const dynamicParams = true;

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maysanlabs.com";
  const blogJSONLD = generateBlogPostJSONLD(post, siteUrl);

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJSONLD),
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-brand-primary transition-colors mb-8 group"
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
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-2 text-foreground/40 text-sm">
                <Clock size={14} />
                {post.readTime} read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 py-5 border-y border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-xs text-foreground/30 uppercase tracking-wider">Written by</p>
                  <p className="text-sm font-medium text-foreground">
                    {post.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-foreground/30 uppercase tracking-wider">Published</p>
                  <p className="text-sm font-medium text-foreground">
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

      {/* GEO Key Takeaways — optimized for AI search engine extraction */}
      <section className="py-4 geo-tldr" aria-label="Key Takeaways">
        <div className="container-main max-w-3xl">
          <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-5 md:p-6">
            <div className="flex items-start gap-3">
              <Lightbulb size={20} className="text-brand-primary mt-0.5 shrink-0" />
              <div>
                <h2 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-2">
                  Key Takeaways
                </h2>
                <ul className="space-y-2 text-sm md:text-base text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1.5 shrink-0">•</span>
                    <span>{post.excerpt}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1.5 shrink-0">•</span>
                    <span>Category: {post.category} — expert insights from Maysan Labs, a leading enterprise SaaS development company.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1.5 shrink-0">•</span>
                    <span>Reading time: {post.readTime} — written by {post.author}.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-main max-w-3xl">
          <article className="bg-white/60 dark:bg-white/[0.01] border border-gray-200 dark:border-white/[0.04] backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-foreground/70 leading-8 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Inline CTA */}
          <div className="mt-12 bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-8 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Ready to build something great?</h3>
            <p className="text-foreground/60 text-sm mb-6 max-w-md mx-auto">
              Let&apos;s discuss your project. Our team is ready to help you scale.
            </p>
            <Link href="/start" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-primary to-brand-light rounded-full font-bold text-sm text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.45)] hover:scale-[1.02] transition-all duration-300 focus-ring">
              Start Your Project
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-foreground/40 mb-2">Share this article</p>
              <div className="flex gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://maysanlabs.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-lg text-sm text-foreground/50 hover:text-foreground hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all focus-ring">
                  Twitter
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://maysanlabs.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-lg text-sm text-foreground/50 hover:text-foreground hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all focus-ring">
                  LinkedIn
                </a>
              </div>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-medium text-sm text-white hover:shadow-[0_0_20px_rgba(26,109,214,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-ring">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {(prevPost || nextPost) && (
        <section className="py-12 border-t border-white/[0.06]">
          <div className="container-main max-w-3xl">
            <h3 className="text-base font-semibold text-foreground/60 uppercase tracking-wider mb-6">Continue Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group p-5 bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] backdrop-blur-xl rounded-2xl hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs text-foreground/40 mb-2">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Previous Article
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors">
                    {prevPost.title}
                  </h4>
                  <p className="text-xs text-foreground/30 mt-1 line-clamp-1">{prevPost.excerpt}</p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group p-5 bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] backdrop-blur-xl rounded-2xl hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all duration-300 text-left md:text-right">
                  <div className="flex items-center gap-2 text-xs text-foreground/40 mb-2 md:justify-end">
                    Next Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors">
                    {nextPost.title}
                  </h4>
                  <p className="text-xs text-foreground/30 mt-1 line-clamp-1">{nextPost.excerpt}</p>
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
