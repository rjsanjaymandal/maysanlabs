import { Skeleton } from "@/components/ui/Skeleton";

export default function EduMaysanLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <Skeleton className="h-80 w-full mb-10 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <Skeleton className="h-12 w-12 rounded-lg mb-4" />
              <Skeleton className="h-5 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-5/6 mb-3" />
        <Skeleton className="h-4 w-3/4 mb-3" />
      </div>
    </main>
  );
}
