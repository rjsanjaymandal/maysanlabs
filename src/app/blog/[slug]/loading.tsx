import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <main id="main-content" className="pt-24">
      <article className="container-main py-20 max-w-4xl mx-auto">
        <Skeleton className="h-5 w-24 mb-6" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="flex items-center gap-4 mb-10">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-96 w-full mb-10 rounded-xl" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className={`h-4 w-full mb-3 ${i % 3 === 0 ? "w-4/5" : i % 3 === 1 ? "w-3/4" : ""}`} />
        ))}
      </article>
    </main>
  );
}
