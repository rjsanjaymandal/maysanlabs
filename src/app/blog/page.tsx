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
      <Navbar />

      {/* Hero Header */}
      <div className="pt-64 pb-32 relative overflow-hidden">
        <div className="grid-overlay opacity-30" />
        <div className="radial-glow -top-40 -right-40 opacity-30" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-10 inline-block">
              Intelligence Stream
            </span>
            <h1 className="text-massive leading-[1.1] font-bold mb-12">
              Technical <span className="font-accent lowercase text-primary italic">insights</span> and<br />
              System Logs.
            </h1>
            <p className="text-lg font-medium text-foreground/50 max-w-2xl leading-relaxed border-l border-border/50 pl-10">
              Engineering high-performance enterprise SaaS infrastructure and autonomous operational tools. Research, benchmarks, and deployment logs.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-40 container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <ContactFooter />

      {/* Decorative Asset */}
      <img src="/assets/wireframe-sphere.png" alt="" className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-10 pointer-events-none mix-blend-screen mask-radial-fade" />
      <div className="radial-glow bottom-0 right-0 opacity-20" />
    </main>
  );
}
