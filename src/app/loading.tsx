import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen" aria-label="Loading Maysan Labs">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[var(--bg-dark)] py-2 md:py-3 shadow-lg shadow-black/20">
        <div className="container-main flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
          <Skeleton className="lg:hidden h-11 w-11 rounded-full" />
        </div>
      </div>

      <main id="main-content" className="pt-24">
        <div className="container-main py-20">
          <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-5 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>
    </div>
  );
}
