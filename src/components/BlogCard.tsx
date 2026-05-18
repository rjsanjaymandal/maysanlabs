import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag, ExternalLink } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const isExternal = !!post.externalUrl;
  const cardContent = (
    <div className="maysan-card h-full flex flex-col group-hover:border-brand-primary/30 group-hover:bg-white/[0.04] transition-all duration-300">
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center gap-4 mb-5 text-xs font-medium uppercase tracking-wider">
          <div className="flex items-center gap-2 text-brand-primary">
            <Tag size={12} />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Clock size={12} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 group-hover:text-brand-primary transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-300 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="text-xs text-white/30 font-medium">
            {post.date}
          </div>
          
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary group-hover:gap-3 transition-all duration-300">
            <span>{isExternal ? "Read News" : "Read more"}</span>
            {isExternal ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
          </div>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a 
        href={post.externalUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full group"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      {cardContent}
    </Link>
  );
}
