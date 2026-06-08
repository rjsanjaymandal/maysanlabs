import type { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Cloud Architecture | Enterprise Infrastructure",
  description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products. AWS, Azure, GCP, Kubernetes, microservices, and scalable infrastructure.",
  path: "/architecture",
  keywords: [
    "cloud architecture",
    "enterprise infrastructure",
    "AWS architecture",
    "Azure architecture",
    "GCP architecture",
    "kubernetes",
    "microservices",
    "distributed systems",
    "enterprise SaaS architecture"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Architecture", url: "/architecture" }
]);

export default function ArchitecturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Cloud Architecture & Scalable Enterprise Infrastructure | Maysan Labs</span>
        <h2>Enterprise Microservices, Kubernetes Auto-scaling, & AWS Hybrid Clouds</h2>
        <h2>Global Content Delivery Networks (CDN) & Secure Sub-50ms API Latencies</h2>
        <span className="author" rel="author">Written by Maysan Labs Architecture Board</span>
        <span className="contributor">Contributor: Chief Technology Officer</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Cloud Infrastructure refers to the setup of auto-scaling clusters, Docker nodes, and Kubernetes platforms.
          Distributed systems design means creating systems that are highly available, fault-tolerant, and performant.
          According to recent server metrics, our edge networks sustain a 99.99% uptime with sub-50ms regional delivery times.
        </p>
        <ul>
          <li>AWS Cloud Architecture</li>
          <li>Kubernetes Clustering</li>
        </ul>
        <ul>
          <li>Zero-Trust Security</li>
          <li>Sub-100ms API Response</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Edge CDN</td>
              <td>&lt;35ms</td>
            </tr>
            <tr>
              <td>API Gateway</td>
              <td>&lt;100ms</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Cloud Architecture FAQ & Technical Data",
          "author": { "@type": "Person", "name": "Maysan Labs Architecture Board" }
        }) }} />
      </div>

      <ArchitectureClient />
    </>
  );
}
