import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <main id="main-content" className="pt-32">
      <div className="container-main pb-24">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-56 mb-3" />
        <Skeleton className="h-5 w-96 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden p-5">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
