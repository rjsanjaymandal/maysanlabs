import { Skeleton } from "@/components/ui/Skeleton";

export default function PrivacyLoading() {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-32 pb-20">
      <div className="container-main max-w-3xl mx-auto">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-5 w-64 mx-auto mb-12" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
