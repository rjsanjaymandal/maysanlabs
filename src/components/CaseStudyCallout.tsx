import { caseStudies } from "@/lib/case-studies-data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categoryMapping: Record<string, string[]> = {
  "Ecommerce": ["Strategy", "Business", "Performance"],
  "ERP & Operations": ["Infrastructure", "Architecture", "Methodology"],
  "Fintech Infrastructure": ["Security", "Architecture", "Performance"],
  "Industrial IoT": ["AI & ML", "Performance", "Infrastructure"],
};

interface Props {
  blogCategory: string;
  currentSlug: string;
}

export default function CaseStudyCallout({ blogCategory, currentSlug }: Props) {
  const matched = caseStudies.filter(cs => {
    const blogCats = categoryMapping[cs.category] || [];
    return blogCats.includes(blogCategory);
  });

  if (matched.length === 0) return null;

  const study = matched[0];

  return (
    <div className="mt-8 bg-gradient-to-br from-brand-primary/[0.05] to-transparent border border-brand-primary/15 rounded-xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60 mb-1.5 block">Related Case Study</span>
          <h4 className="text-sm font-semibold text-foreground mb-1">{study.title}</h4>
          <p className="text-xs text-foreground/45 line-clamp-2">{study.challenge}</p>
        </div>
        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:bg-brand-primary/90 transition-all shrink-0 self-start sm:self-center"
        >
          View case study
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}
