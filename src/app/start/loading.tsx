import { Skeleton } from "@/components/ui/Skeleton";

export default function StartLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-56 mx-auto mb-4" />
        <Skeleton className="h-5 w-80 mx-auto mb-12" />
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            ))}
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-full mt-4" />
          </div>
        </div>
      </div>
    </main>
  );
}
