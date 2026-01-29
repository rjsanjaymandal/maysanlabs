"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground text-sm max-w-[400px]">
        We encountered an unexpected error. Usually this is temporary.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
