import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
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
        <h1 key={i} className="text-3xl md:text-4xl font-black mt-12 mb-8 uppercase tracking-tighter italic text-white">
          {line.replace("# ", "")}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-black mt-10 mb-6 uppercase tracking-tight italic text-white/90">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-xl font-black mt-8 mb-4 uppercase tracking-tight text-white/80">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-6 mb-2 text-body-dim list-disc">
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
      <p key={i} className="text-lg text-body-dim leading-relaxed mb-6 font-medium">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="text-white font-bold">
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
    <main className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      <article className="pt-44 pb-32">
        <div className="container-main max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] text-brand-primary font-black uppercase tracking-[0.3em] mb-16 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} /> BACK_TO_LOG
          </Link>

          <header className="mb-20">
            <div className="flex items-center gap-6 mb-10">
              <span className="label-mono !mb-0">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-ghost font-black uppercase tracking-widest">
                <Clock size={14} className="text-brand-primary" />
                {post.readTime} READ
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 leading-[1] uppercase italic text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-12 py-12 border-y border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <User size={20} />
                </div>
                <div>
                  <p className="label-mono !text-[8px] !mb-1">
                    AUTHORED_BY
                  </p>
                  <p className="font-black text-sm tracking-tight uppercase italic">
                    {post.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="label-mono !text-[8px] !mb-1">
                    PUBLISHED_ON
                  </p>
                  <p className="font-black text-sm tracking-tight uppercase italic">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="blog-content prose prose-invert prose-brand max-w-none">
            {formattedContent}
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: `https://maysanlabs.com/og-image.png`, // Generic default for now, could be post-specific
            author: {
              "@type": "Person",
              name: post.author,
              url: "https://maysanlabs.com",
            },
            datePublished: post.date,
            dateModified: post.date,
            publisher: {
              "@type": "Organization",
              name: "Maysan Labs",
              logo: {
                "@type": "ImageObject",
                url: "https://maysanlabs.com/favicon.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://maysanlabs.com/blog/${post.slug}`,
            },
          }),
        }}
      />

      <div className="bg-muted/5 border-t border-border">
        <ContactFooter />
      </div>
    </main>
  );
}
