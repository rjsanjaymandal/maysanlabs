declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackCtaClick(label: string) {
  pushDataLayer({ event: "cta_click", label });
}

export function trackPhoneCall(label: string) {
  pushDataLayer({ event: "phone_call_click", label });
}

/**
 * Normalize and push user-provided data (email/phone) for Enhanced Conversions.
 * GTM hashes these client-side and matches them in Google Ads.
 */
export function pushConversionWithUserData(
  event: string,
  extra: Record<string, unknown>,
  userData?: { email?: string; phone?: string }
) {
  const conversion: Record<string, unknown> = {
    event,
    ...extra,
  };

  if (userData?.email) {
    conversion.email = userData.email.trim().toLowerCase();
  }
  if (userData?.phone) {
    conversion.phone = userData.phone.replace(/[\s+\-()]/g, "");
  }

  pushDataLayer(conversion);
}
