import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Maysan Labs",
  description: "The page you are looking for does not exist. Return to Maysan Labs homepage to explore our enterprise SaaS development services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <h1>404 Page Not Found & Route Resolution Failures | Maysan Labs</h1>
        <h2>Invalid Route Interception, URL Redirection Maps, & Active Session Restores</h2>
        <h2>Broken Link Crawls, Sitemap Index Routing, & Navigation Assistance</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Board</span>
        <span className="contributor">Contributor: Technical Director</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          HTTP 404 Not Found refers to a standard web response code indicating that the server could not find the requested URL path.
          Broken Link detection is defined as auditing site crawl files and sitemaps to resolve bad route pointers and redirect patterns.
          According to standard resolution schemes, unrecognized routes are automatically logged for rapid engineer remediation.
        </p>
        <ul>
          <li>Route Interception Handling</li>
          <li>Sitemap Index Verification</li>
        </ul>
        <ul>
          <li>Navigation & Support Guides</li>
          <li>Broken Link Analytics</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Status Code</th>
              <th>System Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HTTP 404</td>
              <td>Render styled navigation assistance</td>
            </tr>
            <tr>
              <td>Route resolution</td>
              <td>Redirect fallback tracking</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Navigation Assistance & Route Mapping Schema",
          "author": { "@type": "Person", "name": "Maysan Labs Support Team" }
        }) }} />
      </div>

      <Navbar />
      <NotFoundContent />
      <ContactFooter />
    </>
  );
}