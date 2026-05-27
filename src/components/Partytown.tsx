"use client";

import Script from "next/script";

declare global {
  interface Window {
    partytown?: { forward?: string[]; lib?: string };
  }
}

export default function Partytown() {
  return (
    <Script
      id="partytown-config"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: [
          "window.partytown = {",
          "  forward: ['dataLayer.push', 'gtag'],",
          "  lib: '/~partytown/'",
          "};",
        ].join("\n"),
      }}
    />
  );
}