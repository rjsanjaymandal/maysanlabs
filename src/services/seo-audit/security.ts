import tls from "tls";
import type { CheckedPage, SecurityAudit, SslCertInfo } from "./types";

export async function checkSslCertificate(hostname: string): Promise<SslCertInfo | null> {
  try {
    return await new Promise((resolve) => {
      const socket = tls.connect(443, hostname, {
        servername: hostname,
        rejectUnauthorized: true,
      }, () => {
        const cert = socket.getPeerCertificate();
        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.round((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const tlsVersion = socket.getProtocol() || "";
        socket.end();
        resolve({
          valid: daysRemaining > 0 && socket.authorized,
          issuer: String(cert.issuer?.O || cert.issuer?.CN || "Unknown"),
          subject: String(cert.subject?.CN || "Unknown"),
          validFrom: validFrom.toISOString().split("T")[0],
          validTo: validTo.toISOString().split("T")[0],
          daysRemaining,
          tlsVersion,
        });
      });
      socket.on("error", () => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: "Unknown",
          subject: hostname,
          validFrom: "",
          validTo: "",
          daysRemaining: 0,
          tlsVersion: "",
        });
      });
      setTimeout(() => { socket.destroy(); resolve(null); }, 5000);
    });
  } catch {
    return null;
  }
}

export function calculateSecurityAudit(
  urlsList: CheckedPage[],
  sslCert: SslCertInfo | null
): SecurityAudit {
  const allPagesHttps = urlsList.length > 0 && urlsList.every(p => p.https);
  const totalMixed = urlsList.reduce((s, p) => s + p.mixedContentCount, 0);
  const totalInsecureForms = urlsList.reduce((s, p) => s + p.insecureFormCount, 0);
  const allHsts = urlsList.length > 0 && urlsList.every(p => p.hasHsts && (p.hstsMaxAge ?? 0) >= 31536000);
  const anyCsp = urlsList.some(p => p.hasCsp);
  const allXfo = urlsList.length > 0 && urlsList.every(p => p.hasXFrameOptions && (p.xFrameOptionsValue?.toUpperCase() === "DENY" || p.xFrameOptionsValue?.toUpperCase() === "SAMEORIGIN"));
  const allXcto = urlsList.length > 0 && urlsList.every(p => p.hasXContentTypeOptions);
  const allRp = urlsList.length > 0 && urlsList.every(p => p.hasReferrerPolicy);
  const anyPp = urlsList.some(p => p.hasPermissionsPolicy);

  let securityScore = 0;
  if (allPagesHttps) securityScore += 15;
  if (allHsts) securityScore += 15;
  if (anyCsp) securityScore += 15;
  if (allXfo) securityScore += 10;
  if (allXcto) securityScore += 10;
  if (allRp) securityScore += 10;
  if (totalMixed === 0) securityScore += 10;
  if (anyPp) securityScore += 5;
  if (totalInsecureForms === 0) securityScore += 5;
  if (sslCert?.valid && sslCert.daysRemaining > 30) securityScore += 5;

  const missingHeaders: string[] = [];
  if (!allHsts) missingHeaders.push("Strict-Transport-Security");
  if (!anyCsp) missingHeaders.push("Content-Security-Policy");
  if (!allXfo) missingHeaders.push("X-Frame-Options");
  if (!allXcto) missingHeaders.push("X-Content-Type-Options");
  if (!allRp) missingHeaders.push("Referrer-Policy");
  if (!anyPp) missingHeaders.push("Permissions-Policy");

  const secGrade: "good" | "needs-work" | "poor" = securityScore >= 80 ? "good" : securityScore >= 50 ? "needs-work" : "poor";

  const secSuggestions: string[] = [];
  if (!allPagesHttps) secSuggestions.push("Some pages are still served over HTTP. Migrate all pages to HTTPS to prevent data interception and boost search rankings.");
  if (!allHsts) secSuggestions.push("HTTP Strict-Transport-Security (HSTS) header is missing or has insufficient max-age. Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` to enforce HTTPS.");
  if (!anyCsp) secSuggestions.push("Content-Security-Policy (CSP) header is missing. Implement a CSP to mitigate XSS and data injection attacks. Start with `default-src 'self'` and refine.");
  if (!allXfo) secSuggestions.push("X-Frame-Options header is missing or misconfigured. Set `X-Frame-Options: DENY` (or `SAMEORIGIN` if framing is needed) to prevent clickjacking.");
  if (!allXcto) secSuggestions.push("X-Content-Type-Options: nosniff header is missing. Add it to prevent MIME-type sniffing attacks.");
  if (!allRp) secSuggestions.push("Referrer-Policy header is missing. Set `Referrer-Policy: strict-origin-when-cross-origin` to control referrer information leakage.");
  if (!anyPp) secSuggestions.push("Permissions-Policy header is missing. Restrict browser feature access (camera, microphone, geolocation) by adding a Permissions-Policy header.");
  if (totalMixed > 0) secSuggestions.push(`Found ${totalMixed} mixed content resource(s) on HTTPS pages. Update all http:// resource URLs to https:// to prevent browser warnings and broken functionality.`);
  if (totalInsecureForms > 0) secSuggestions.push(`Found ${totalInsecureForms} form(s) on HTTPS pages submitting to HTTP endpoints. All form actions must use HTTPS to protect user data.`);
  if (!sslCert) secSuggestions.push("Could not validate the SSL certificate. Ensure the server has a valid, trusted certificate installed.");
  else if (!sslCert.valid) secSuggestions.push("SSL certificate validation failed. The certificate may be expired, self-signed, or issued by an untrusted authority.");
  else if (sslCert.daysRemaining <= 30) secSuggestions.push(`SSL certificate expires in ${sslCert.daysRemaining} days (${sslCert.validTo}). Renew before expiry to avoid browser trust warnings.`);

  return {
    score: securityScore,
    grade: secGrade,
    httpsAllPages: allPagesHttps,
    missingHeaders,
    mixedContentCount: totalMixed,
    insecureFormCount: totalInsecureForms,
    sslCert,
    suggestions: secSuggestions,
  };
}
