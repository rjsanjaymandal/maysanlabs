import { Skeleton } from "@/components/ui/Skeleton";

export default function SiteCheckerLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-main py-20">
        <Skeleton className="h-10 w-72 mx-auto mb-4" />
        <Skeleton className="h-5 w-80 mx-auto mb-12" />
        <Skeleton className="h-14 w-full rounded-xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl mt-6" />
      </div>
    </main>
  );
}
