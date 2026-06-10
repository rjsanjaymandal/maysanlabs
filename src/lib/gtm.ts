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
