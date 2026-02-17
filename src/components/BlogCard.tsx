import Link from "next/link";
import SpotlightCard from "./SpotlightCard";
import { BlogPost } from "@/lib/blog-data";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <SpotlightCard className="h-full bg-card/30 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest rounded-full border border-primary/20">
              {post.category}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              {post.readTime} Read
            </span>
          </div>

          <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-muted-foreground/80 text-sm leading-relaxed mb-8 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-6 border-t border-border/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                <Calendar size={12} className="text-primary/70" />
                {post.date}
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all">
              READ MORE <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
