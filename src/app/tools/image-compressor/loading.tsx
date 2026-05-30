import { Skeleton } from "@/components/ui/Skeleton";

export default function ImageCompressorLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-80 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <Skeleton className="h-40 w-full rounded-lg mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </main>
  );
}
