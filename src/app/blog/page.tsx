import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import ContactFooter from "@/components/ContactFooter";
import BlogCard from "@/components/BlogCard";
import PageHeader from "@/components/PageHeader";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Enterprise SaaS Development Insights",
  description: "Read the latest insights on SaaS development, custom software, cloud infrastructure, and enterprise technology from Maysan Labs experts.",
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <BookOpen size={12} />
              Our Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Articles
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl">
              Engineering high-performance enterprise SaaS infrastructure. Research, benchmarks, and details from our elite lab.
            </p>
            <Link href="/init" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <ContactFooter />
    </main>
  );
}
