"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground text-sm">
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
