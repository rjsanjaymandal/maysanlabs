import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Clock, ExternalLink, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

function CardInner({ post, isExternal }: { post: BlogPost; isExternal: boolean }) {
  return (
    <article data-card-surface="flat-dark" className="blog-card h-full">
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider">
          <div className="flex items-center gap-2 text-brand-primary">
            <Tag size={12} aria-hidden="true" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/45">
            <Clock size={12} aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="mb-4 text-xl font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-brand-primary">
          {post.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/60 transition-colors duration-200 group-hover:text-foreground/75">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/70 pt-4 dark:border-white/[0.07]">
          <time className="text-xs font-medium text-foreground/45" dateTime={post.date}>
            {post.date}
          </time>

          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
            {isExternal ? "Read News" : "Read more"}
            {isExternal ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogCard({ post }: BlogCardProps) {
  const isExternal = !!post.externalUrl;

  if (isExternal) {
    return (
      <a
        href={post.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${post.title} - opens external article in a new tab`}
        className="group block h-full rounded-2xl focus-ring"
      >
        <CardInner post={post} isExternal />
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full rounded-2xl focus-ring">
      <CardInner post={post} isExternal={false} />
    </Link>
  );
}
