import { Skeleton } from "@/components/ui/Skeleton";

export default function PrivacyGeneratorLoading() {
  return (
    <main id="main-content" className="pt-24">
      <div className="container-py-20">
        <Skeleton className="h-10 w-80 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <Skeleton className="h-14 w-full rounded-xl mb-8" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </main>
  );
}
