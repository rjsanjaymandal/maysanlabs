import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <div className="card-brutalist h-full bg-card border border-border flex flex-col group-hover:border-primary transition-all relative overflow-hidden">
        {/* Tactical Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
        
        <div className="p-10 flex flex-col h-full relative z-10">
          <div className="flex items-center gap-6 mb-8 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
            <div className="flex items-center gap-2 text-primary">
              <Tag size={12} />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="font-mono text-xl font-black mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>

          <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground tracking-tight mb-12 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              <Calendar size={12} className="text-primary/40" />
              {post.date}
            </div>
            
            <div className="flex items-center gap-2 font-mono text-[10px] font-black text-primary uppercase tracking-widest group-hover:gap-4 transition-all">
              READ_LOG <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
