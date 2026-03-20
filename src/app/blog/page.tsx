import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence Stream | Blog | Maysan Labs",
  description:
    "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Research and logs from Maysan Labs.",
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 tactical-grid opacity-5 pointer-events-none" />
      
      <Navbar />

      {/* Hero Header */}
      <div className="pt-48 pb-24 border-b border-border relative bg-card/30">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold block mb-6">
              [ INTELLIGENCE_STREAM ]
            </span>
            <h1 className="text-massive leading-[0.8] mb-12">
              TECHNICAL<br />
              <span className="italic">BLOG_LOGS</span>
            </h1>
            <p className="font-mono text-xs sm:text-lg uppercase tracking-widest text-muted-foreground max-w-2xl leading-relaxed">
              engineering high-performance enterprise saas infrastructure and autonomous operational tools. research, benchmarks, and deployment logs.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-32 container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border/20 border border-border">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <ContactFooter />
    </main>
  );
}
