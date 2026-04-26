import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <div className="maysan-card h-full flex flex-col group-hover:border-brand-primary/40">
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center gap-6 mb-10 text-[9px] font-black tracking-[0.3em] uppercase text-white/40">
            <div className="flex items-center gap-2 text-brand-primary">
              <Tag size={12} />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-2xl font-black mb-6 tracking-tight group-hover:text-brand-primary transition-colors duration-500 uppercase leading-[1.1]">
            {post.title}
          </h3>

          <p className="text-sm font-medium leading-relaxed text-white/85 group-hover:text-white transition-colors duration-500 mb-12 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="font-mono text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">
              {post.date}
            </div>
            
            <div className="flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
              READ MORE <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
