import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-56 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <Skeleton className="h-12 w-12 rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
