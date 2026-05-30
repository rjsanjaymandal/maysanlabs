import { Skeleton } from "@/components/ui/Skeleton";

export default function OgGeneratorLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-72 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-10 w-full rounded-lg mb-3" />
            <Skeleton className="h-10 w-full rounded-lg mb-3" />
            <Skeleton className="h-10 w-full rounded-lg mb-3" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    </main>
  );
}
