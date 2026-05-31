import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import ContactFooter from "@/components/ContactFooter";
import BlogPageClient from "@/components/BlogPageClient";
import { blogPosts } from "@/lib/blog-data";
import { fetchExternalTechBlogs } from "@/lib/devto";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Enterprise SaaS Development Insights | Maysan Labs",
  description: "Read the latest insights on SaaS development, custom software, cloud infrastructure, and enterprise technology from Maysan Labs experts. Maysan Labs blog covers React, Node.js, and cloud architecture.",
  keywords: ["Maysan Labs blog", "maysanlabs blog", "SaaS development insights", "enterprise technology blog", "React tutorials", "Node.js insights", "cloud architecture tips"],
  openGraph: {
    title: "Blog | Enterprise SaaS Development Insights",
    description: "Read the latest insights on SaaS development and enterprise technology from Maysan Labs experts.",
    url: "https://maysanlabs.com/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Maysan Labs Blog" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/blog",
    languages: {
      en: "https://maysanlabs.com/blog",
    },
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" }
]);

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Maysan Labs Blog",
  description: "Enterprise SaaS development insights, technical guides, and best practices from Maysan Labs experts",
  url: "https://maysanlabs.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Maysan Labs",
    url: "https://maysanlabs.com"
  },
  blogPost: blogPosts.slice(0, 6).map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://maysanlabs.com/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author
    }
  }))
};

export default async function BlogListingPage() {
  // Fetch real-time tech news automatically on the server!
  const externalPosts = await fetchExternalTechBlogs();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
                Articles
              </h1>
              <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl">
                Engineering high-performance enterprise SaaS infrastructure. Research, benchmarks, and details from our elite lab.
              </p>
              <Link href="/start" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-semibold text-sm text-white hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 focus-ring">
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16 content-auto-wide">
          <div className="container-main">
            <BlogPageClient localPosts={blogPosts} externalPosts={externalPosts} />
          </div>
        </section>

        <Newsletter />

        <ContactFooter />
      </main>
    </>
  );
}
