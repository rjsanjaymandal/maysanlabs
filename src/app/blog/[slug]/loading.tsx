import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <main id="main-content" className="min-h-screen pt-28">
      <div className="container-main max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <Skeleton className="h-4 w-24 mb-6" />
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="flex items-center gap-3 mb-10">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="rounded-xl border border-white/5 p-6 sm:p-8 md:p-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className={`h-4 w-full mb-4 ${i % 3 === 0 ? "w-4/5" : i % 3 === 1 ? "w-3/4" : ""}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
