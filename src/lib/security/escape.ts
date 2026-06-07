const HTML_ESCAPES: Readonly<Record<string, string>> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

const SAFE_HREF_PROTOCOLS = new Set(["https:", "mailto:"]);

export function safeHref(raw: unknown, fallback: string = "#"): string {
  if (typeof raw !== "string" || raw.trim() === "") return fallback;
  const trimmed = raw.trim();
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return fallback;
  }
  if (!SAFE_HREF_PROTOCOLS.has(url.protocol.toLowerCase())) {
    return fallback;
  }
  return url.toString();
}

const EMAIL_TEXT_CAP = 5000;

export function textForEmail(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/\r\n/g, "\n")
    .slice(0, EMAIL_TEXT_CAP);
}

export function multilineHtml(value: unknown): string {
  return escapeHtml(textForEmail(value))
    .replace(/\n/g, "<br />");
}
