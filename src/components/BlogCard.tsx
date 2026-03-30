import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <div className="card-base card-lg flex flex-col h-full group-hover:border-primary/10 relative overflow-hidden rounded-[2.5rem]">
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center gap-6 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
            <div className="flex items-center gap-2 text-primary/60">
              <Tag size={12} />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-500 leading-tight">
            {post.title}
          </h3>

          <p className="text-sm font-medium leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors duration-500 mb-10 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/30 uppercase tracking-[0.15em]">
              <Calendar size={12} className="text-primary/20" />
              {post.date}
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500">
              Read <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
