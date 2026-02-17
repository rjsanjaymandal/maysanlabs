import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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

  // Pre-process content to handle markdown headers and bold text
  const formattedContent = post.content.split("\n").map((line, i) => {
    if (line.startsWith("# ")) {
      return (
        <h1 key={i} className="text-3xl md:text-4xl font-bold mt-12 mb-8">
          {line.replace("# ", "")}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-bold mt-10 mb-6">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-xl font-bold mt-8 mb-4">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-6 mb-2 text-muted-foreground list-disc">
          {line.replace("- ", "")}
        </li>
      );
    }
    if (line.trim() === "") {
      return <br key={i} />;
    }

    // Handle bold text **...**
    const parts = line.split(/(\*\*.*?\*\*)/);
    return (
      <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-6">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="text-foreground font-bold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary font-mono uppercase tracking-widest mb-12 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest rounded-full border border-primary/20">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <Clock size={14} className="text-primary/70" />
                {post.readTime} Read
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                    Authored by
                  </p>
                  <p className="font-bold text-sm tracking-tight">
                    {post.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                    Published on
                  </p>
                  <p className="font-bold text-sm tracking-tight">
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

          <div className="blog-content">{formattedContent}</div>
        </div>
      </article>

      <div className="bg-muted/5 border-t border-border">
        <ContactFooter />
      </div>
    </main>
  );
}
