import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import ContactFooter from "@/components/ContactFooter";
import BlogPageClient from "@/components/BlogPageClient";
import { blogPosts } from "@/lib/blog-data";
import { fetchExternalTechBlogs } from "@/lib/devto";
import { Metadata } from "next";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Business Growth & Digital Strategy | Maysan Labs",
  description: "Practical insights on custom software, digital transformation, and business growth from Maysan Labs. Learn how modern technology helps businesses of all sizes compete and win.",
  keywords: ["Maysan Labs blog", "business technology", "digital transformation", "custom software insights", "SME technology", "business growth strategy"],
  openGraph: {
    title: "Blog | Business Growth & Digital Strategy",
    description: "Practical insights on custom software, digital transformation, and business growth.",
    url: "https://maysanlabs.com/blog",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Maysan Labs Blog" }],
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
  description: "Practical insights on custom software, digital transformation, and business growth",
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
  const externalPosts = await fetchExternalTechBlogs();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-12 md:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.03] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-primary/[0.05] blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-10 right-0 w-64 h-64 bg-brand-primary/[0.02] blur-[80px] rounded-full pointer-events-none" />
          <div className="container-main relative">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-[11px] font-semibold uppercase tracking-widest mb-5">
                Insights & Strategy
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 leading-tight">
                Articles
              </h1>
              <p className="text-lg text-foreground/50 leading-relaxed max-w-xl">
                Practical insights on custom software, digital growth, and building technology that works for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="pb-16 md:pb-24">
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
