"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-TJ8X38P8";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-W29JP8RY97";
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID || "AW-18150150835";

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
      if (stored === "accepted" || window.__cookieConsent === "accepted") {
        setConsented(true);
      }
    };

    checkConsent();

    const handleChange = () => checkConsent();
    window.addEventListener("cookieConsentChanged", handleChange);
    return () => window.removeEventListener("cookieConsentChanged", handleChange);
  }, []);

  if (!consented) return null;

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height={0}
          width={0}
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}')`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}