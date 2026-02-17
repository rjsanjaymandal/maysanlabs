import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Blog & Intelligence Stream",
  description:
    "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Research and logs from Maysan Labs.",
  keywords: [
    "SaaS Blog",
    "Technical Insights",
    "Modular Architecture",
    "Tactical Automation",
    "Digital Infrastructure research",
  ],
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="pt-32 pb-16 bg-muted/10 border-b border-border">
        <div className="container">
          <span className="text-sm font-mono text-primary uppercase tracking-wider mb-4 block">
            Intelligence Stream
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Technical Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Engineering high-performance enterprise SaaS infrastructure and
            autonomous operational tools.
          </p>
        </div>
      </div>

      <div className="flex-1 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>

      <ContactFooter />
    </main>
  );
}
