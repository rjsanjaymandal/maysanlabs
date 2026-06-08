import { Skeleton } from "@/components/ui/Skeleton";

export default function ArchitectureLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <Skeleton className="h-64 w-full mb-10 rounded-xl" />
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-5/6 mb-3" />
          <Skeleton className="h-4 w-4/5 mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-3/4 mb-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <Skeleton className="h-8 w-8 rounded-lg mb-4" />
              <Skeleton className="h-5 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
