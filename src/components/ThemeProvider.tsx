"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div style={{ visibility: "hidden" }} />}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </Suspense>
  );
}
