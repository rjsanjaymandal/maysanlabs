import { Skeleton } from "@/components/ui/Skeleton";

export default function PricingLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
              <Skeleton className="h-5 w-24 mx-auto mb-4" />
              <Skeleton className="h-10 w-32 mx-auto mb-6" />
              <Skeleton className="h-4 w-40 mx-auto mb-8" />
              <div className="space-y-3 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
