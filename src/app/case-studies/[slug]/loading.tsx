import { Skeleton } from "@/components/ui/Skeleton";

export default function CaseStudyLoading() {
  return (
    <main id="main-content" className="pt-24">
      <article className="container-main py-20 max-w-4xl mx-auto">
        <Skeleton className="h-5 w-32 mb-6" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-2/3 mb-8" />
        <Skeleton className="h-5 w-48 mb-10" />
        <Skeleton className="h-80 w-full mb-10 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className={`h-4 w-full mb-3 ${i % 3 === 0 ? "w-5/6" : ""}`} />
        ))}
      </article>
    </main>
  );
}
