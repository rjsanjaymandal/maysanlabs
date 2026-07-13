# AGENTS.md — Maysan Labs

> AI-readable codebase reference. Keep this file updated as the project evolves.

---

## Overview

**Maysan Labs** is a Next.js 16 (App Router) marketing and content website for an enterprise SaaS/software development agency. The site serves landing pages, blog, case studies, interactive tools, and programmatic SEO hire pages.

- **URL**: `https://maysanlabs.com`
- **Framework**: Next.js 16 (Turbopack), React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3 + `tailwind-merge` + `clsx`
- **Animation**: Framer Motion 12
- **Components**: shadcn/ui (manual), Lucide icons, Base UI
- **Content**: Static TypeScript data files (no CMS)
- **Email**: Resend (transactional), Nodemailer (contact form)

---

## Commands

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build + SEO ping
npm run start            # Start production server
npm run lint             # ESLint
npm run generate-content # AI blog generation (OpenAI)
npm run generate-blog    # AI blog generation (Gemini)
npm run generate-seo     # Generate hire landing pages
npm run generate-all     # Run all generators sequentially
```

---

## Directory Structure

```
src/
├── app/                      # Next.js App Router — routes only
│   ├── layout.tsx            # Root layout (metadata, JSON-LD, providers)
│   ├── page.tsx              # Home page
│   ├── actions/              # Server Actions (forms, file upload)
│   ├── api/                  # Route handlers (/api/*)
│   ├── blog/  case-studies/  products/  services/  tools/  ...
│   └── [route]/              # Each route: page.tsx + *Client.tsx pattern
│
├── components/               # UI components organized by domain
│   ├── ui/                   # Base primitives (button, skeleton, beams, etc.)
│   ├── layout/               # Shell: Navbar, Footer, PageHeader, CommandDock
│   ├── home/                 # Landing page sections
│   ├── blog/                 # Blog listing, search, share, news feed
│   ├── marketing/            # Services, Pricing, Problem, Team, Newsletter
│   ├── interactive/          # ROI Calculator, Tools Showcase, MultiStepForm
│   ├── effects/              # Scroll reveals, glitch, parallax, spotlight
│   ├── error/                # Error boundary fallbacks, 404 content
│   ├── tracking/             # Analytics, cookie consent, progress bars
│   ├── search/               # Full-site fuzzy search (Fuse.js)
│   ├── visuals/              # Architecture diagrams, blueprint grid
│   └── dynamic/              # Client-only lazy import hub
│
├── data/                     # Static content — single source of truth
│   ├── blog.ts               # Blog posts (markdown content, tags, metadata)
│   ├── case-studies.ts       # Case studies (challenge, solution, metrics)
│   ├── careers.ts            # Job listings
│   ├── authors.ts            # Author profiles + lookup function
│   ├── seo-landing.ts        # Programmatic hire pages (~155 entries)
│   └── seo-schema.ts         # JSON-LD structured data schemas (18+)
│
├── services/                 # Business logic & external API integrations
│   ├── devto.ts              # Fetch Dev.to articles (ISR cached)
│   ├── news-fetcher.ts       # Aggregate HN + Dev.to news
│   └── seo-audit/            # Full SEO audit pipeline
│       ├── types.ts          # Interfaces (CheckedPage, SeoAuditResult, etc.)
│       ├── parser.ts         # HTML parsing, sitemap discovery
│       ├── scoring.ts        # SEO scoring engine
│       ├── security.ts       # SSL cert + security header audit
│       ├── telemetry.ts      # India geo/CDN/UPI/DPDP analysis
│       └── orchestrator.ts   # "use server" entry point (Server Action)
│
├── core/                     # Infrastructure — framework-agnostic
│   ├── security/             # SSRF protection, XSS sanitization, file validation
│   ├── analytics/            # GTM/dataLayer helpers
│   ├── ppt/                  # PowerPoint generation (pptxgenjs)
│   └── rate-limit.ts         # In-memory rate limiter
│
├── seo/                      # SEO metadata & brand strategy
│   ├── helpers.ts            # generateBlogPostSEO(), generatePageSEO(), etc.
│   └── brand-strategy.ts     # Brand keywords, GEO queries, title generators
│
├── hooks/                    # Shared React hooks
│   └── useScramble.ts        # Text scramble animation hook
│
├── utils/                    # Pure utility functions
│   ├── cn.ts                 # clsx + tailwind-merge helper
│   └── motion-variants.ts    # Framer Motion animation presets
│
├── types/                    # Shared TypeScript interfaces
│   └── pagespeed.ts          # PageSpeed/WebVitals result types
│
└── styles/                   # Global styles
    └── globals.css           # Tailwind directives + CSS custom properties
```

---

## Conventions

### Component Pattern

Every component file exports a single default component. File names use kebab-case. Component names use PascalCase.

```tsx
// src/components/home/hero.tsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return <section>...</section>;
}
```

### Route Pattern

Every route follows a consistent pattern: `page.tsx` (server component) + `*Client.tsx` ("use client" component with the actual UI):

```
about/
├── page.tsx           # Server component — imports AboutClient
├── AboutClient.tsx    # "use client" — actual page UI
├── layout.tsx         # Optional route layout
├── loading.tsx        # Suspense fallback
└── error.tsx          # Error boundary
```

### Import Paths

Always use the `@/` path alias. Never use relative imports across directories:

```tsx
// Correct
import Hero from "@/components/home/hero";
import { cn } from "@/utils/cn";
import { blogPosts } from "@/data/blog";

// Wrong
import Hero from "../../components/home/hero";
```

### Barrel Exports

Every directory has an `index.ts` that re-exports its contents. Use barrel imports for cleaner code:

```tsx
// Preferred (single import)
import { Hero, Testimonials, FAQ } from "@/components/home";

// Also valid (direct import)
import Hero from "@/components/home/hero";
```

### Lazy Loading

Heavy client components are lazy-loaded via `next/dynamic`. The `src/components/dynamic/ClientImports.tsx` hub centralizes client-only imports used across multiple pages:

```tsx
const Hero = dynamic(() => import("@/components/home/hero"), {
  loading: () => <Skeleton />
});
```

### CSS

- Tailwind utility classes for all styling
- `cn()` helper for conditional/merged classes
- CSS modules (`*.module.css`) only for complex effects (CRT overlay, blueprint grid, data markers)
- Custom properties on `:root` for theme tokens (defined in `globals.css`)

---

## Adding a New Feature

### 1. New page route

```
src/app/my-feature/
├── page.tsx              # import { MyFeatureClient } from "./MyFeatureClient"
├── MyFeatureClient.tsx   # "use client"
├── loading.tsx           # Suspense skeleton
└── error.tsx             # Error boundary
```

### 2. New component

```
src/components/<domain>/my-component.tsx
src/components/<domain>/index.ts     # Add export
```

### 3. New data file

```
src/data/my-data.ts       # Static dataset
src/data/index.ts         # Add export
```

### 4. New service / business logic

```
src/services/my-service.ts
src/services/index.ts     # Add export
```

### 5. New API route

```
src/app/api/my-endpoint/route.ts     # GET/POST handler
```

---

## Key Patterns

### Server Actions (forms)

Server actions live in `src/app/actions/` and are imported directly into client components:

```tsx
// src/app/actions/sendEmail.ts
"use server";
export async function sendEmail(formData: FormData) { ... }
```

### JSON-LD / Structured Data

All schemas are pre-built objects in `src/data/seo-schema.ts`. They are injected into the root layout via a single `<script type="application/ld+json">` tag using `@graph`.

### SEO Metadata

Use `src/seo/helpers.ts` generators for consistent meta tags:

```tsx
// In page.tsx
export const metadata = generatePageSEO({
  title: "My Page",
  description: "...",
  ogImage: "/my-image.webp",
});
```

### Rate Limiting

Import from `@/core/rate-limit`:

```tsx
import { checkRateLimit } from "@/core/rate-limit";

const { allowed } = checkRateLimit(ip, 10, 60_000); // 10 req/min
if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
```

### Security (SSRF Protection)

All outbound HTTP requests in server code must go through the SSRF protection layer:

```tsx
import { assertSafeFetchUrl, safeFetch } from "@/core/security/ssrf";

assertSafeFetchUrl(targetUrl);
const response = await safeFetch(targetUrl);
```

### PowerPoint Generation

`src/core/ppt/` provides three layers:
- `parser.ts` — Parse JSON/CSV/Markdown/KV text into slide data
- `compiler.ts` — Simple table-based slides
- `engine.ts` — Advanced layouts (KPI grids, feature columns, data matrices)

---

## Scripts

Scripts in `scripts/` are standalone Node.js utilities run via `npm run`. They directly read/write data files:

| Script | Purpose | Reads/Writes |
|--------|---------|-------------|
| `content-generator.mjs` | Generate blog posts via OpenAI | `src/data/blog.ts` |
| `generate-blog.ts` | Generate blog posts via Gemini | `src/data/blog.ts` |
| `generate-seo-pages.mjs` | Generate hire landing pages | `src/data/seo-landing.ts` |
| `ping-indexing.js` | Ping Google/IndexNow | N/A |
| `run-all.mjs` | Orchestrate all generators | `src/data/blog.ts`, `src/data/seo-landing.ts` |

---

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `AI_API_KEY` / `OPENAI_API_KEY` | OpenAI key for blog generation |
| `GEMINI_API_KEY` | Gemini key for blog generation |
| `RESEND_API_KEY` | Resend transactional email |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification |
| `INDEXNOW_KEY` | IndexNow API key for search pings |

---

## Architecture Decisions

1. **No CMS** — All content is static TypeScript. This eliminates database dependencies, enables full type safety, and allows ISR caching. Content updates happen via scripts or direct file edits.

2. **Server/Client split** — Every route page is a server component. Client interactivity is isolated in `*Client.tsx` files with `"use client"` directive. This maximizes server-side rendering and SEO.

3. **SSRF-first security** — All outbound server-side HTTP goes through `core/security/ssrf.ts` which blocks internal IP ranges, limits redirects, caps response size, and enforces timeouts.

4. **Feature-based components** — Components are grouped by domain (home, blog, marketing, etc.) rather than by type (atoms, molecules, organisms). This scales better as features grow independently.

5. **Barrel exports everywhere** — Every directory exports its contents via `index.ts`. This prevents import path sprawl and enables easy refactoring.

6. **Data layer separation** — Static content (`data/`), business logic (`services/`), infrastructure (`core/`), and presentation (`components/`) are strictly separated. No component imports a service. No data file imports a component.
