import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import BlogCard from "@/components/BlogCard";
import PageHeader from "@/components/PageHeader";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Enterprise SaaS Development Insights",
  description: "Read the latest insights on SaaS development, custom software, cloud infrastructure, and enterprise technology from Maysan Labs experts.",
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      <PageHeader 
        label="Our Insights"
        title="ARTICLES"
        subtitle="Engineering high-performance enterprise SaaS infrastructure. Research, benchmarks, and details from our elite lab."
      />

      <div className="flex-1 sec-xl relative z-10">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <ContactFooter />

      {/* Background Decor */}
      <div className="radial-blur -bottom-40 -left-40 opacity-10" />
    </main>
  );
}
