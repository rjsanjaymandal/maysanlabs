# Maysan Labs — Site Documentation

## Project Overview

**Maysan Labs** is the corporate website for an enterprise SaaS development studio based in Gurgaon, India. It serves as a lead generation and credibility platform, showcasing the company's services, case studies, blog, pricing (in Indian Rupees), and interactive tools.

- **URL:** https://maysanlabs.com
- **Version:** 0.1.0 (private)
- **Location:** Gurgaon, Sector 44, Haryana, India

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.7 | Framework (App Router) |
| React | 19.2.7 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.19 | Styling |
| Framer Motion | 12.40.0 | Animations |
| Lucide React | 1.17.0 | Icons |
| next-themes | 0.4.6 | Dark/light mode |
| Nodemailer | 8.x | Email sending |
| Resend | 6.x | Email API |
| Critters | 0.0.23 | CSS inlining |

## Getting Started

```bash
# Install dependencies
npm install

# Development server (default: http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API
│   ├── globals.css         # Global styles, CSS variables, utilities
│   ├── layout.tsx          # Root layout (SEO, fonts, analytics, theme)
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── architecture/       # Architecture page
│   ├── authors/[slug]/     # Author pages
│   ├── blog/               # Blog index + [slug]/ articles + rss.xml
│   ├── careers/            # Careers listing + apply/
│   ├── case-studies/       # Case studies index + [slug]/
│   ├── contact/            # Contact form
│   ├── hire/[slug]/        # SEO landing pages
│   ├── insights/           # Insights & analytics
│   ├── pricing/            # Pricing plans (Starter/Growth/Enterprise in ₹)
│   ├── privacy/            # Privacy policy
│   ├── products/           # Products (edu-maysan/, flash-fashion/)
│   ├── services/           # Services (web/, cloud/, ai/)
│   ├── start/              # Start a project form
│   ├── terms/              # Terms of service
│   ├── tools/              # Free tools (headless-roi, scope-estimator, etc.)
│   ├── actions/            # Server actions (email, job application)
│   ├── api/                # API routes (newsletter, OG images, PageSpeed)
│   ├── manifest.ts         # PWA manifest
│   ├── robots.ts           # Robots.txt config
│   └── sitemap.ts          # Auto-generated sitemap
├── components/             # React components
│   ├── dynamic/            # Client-side dynamic imports with SSR disabled
│   ├── ui/                 # Primitive UI components (shadcn-style)
│   └── ...                 # ~50 feature components
├── lib/                    # Utilities & data
│   ├── seo/                # Schema generation, metadata helpers, brand strategy
│   ├── security/           # Sanitization, SSRF protection
│   └── *.ts                # Data files, utility functions
└── hooks/                  # Custom React hooks
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (Hero, Stats, Services, Testimonials, ROI Calculator, FAQ, Contact) |
| `/about` | Company info & values |
| `/architecture` | Architecture visualization |
| `/blog` | Blog index + RSS feed |
| `/blog/[slug]` | Individual blog post |
| `/case-studies` | Case studies portfolio |
| `/case-studies/[slug]` | Individual case study |
| `/careers` | Job openings |
| `/contact` | Contact form |
| `/hire/[slug]` | SEO-targeted landing pages |
| `/insights` | Analytics & insights |
| `/pricing` | Pricing plans (Starter ₹2.5L/mo, Growth ₹5L/mo, Enterprise ₹12L/mo) |
| `/products` | Product showcase (EduMaysan, Flash Fashion) |
| `/services` | Services overview |
| `/services/web` | Web development |
| `/services/cloud` | Cloud services |
| `/services/ai` | AI/ML services |
| `/start` | Project intake form |
| `/tools` | Free tools hub |
| `/tools/headless-roi` | Headless commerce ROI calculator |
| `/tools/scope-estimator` | Project scope & cost estimator |
| `/tools/site-checker` | Website audit tool |
| `/tools/seo-analyzer` | SEO analysis |
| `/tools/image-compressor` | Image optimization |
| `/tools/og-generator` | Open Graph image generator |
| `/tools/privacy-generator` | Privacy policy generator |

## Styling

- **Framework:** Tailwind CSS v3.4 with `tailwindcss-animate`
- **Dark mode:** `class`-based strategy via `next-themes`
- **Brand color:** `#1A6DD6` (accessible as `brand-primary` in Tailwind)
- **Custom tokens:** brand-navy, titanium, protocol-orange, surface, emphasis, dim
- **Border radius:** 2px–9999px scale with `xl: 16px`, `2xl: 24px`
- **Shadows:** glow-sm/md/lg/xl, inner-glow
- **Animations:** marquee, shimmer, border-beam, fade-in, fade-in-up

CSS utilities in `globals.css`:
- `.scrollbar-hide` — hides scrollbar for Apple-style horizontal scroll sections
- `.hero-title` — gradient text effect
- `.container-main` — max-width centered container
- `.heading-xl/lg/md` — typography scale
- `.card-std`, `.maysan-card`, `.blog-card` — card variants
- `.btn-primary`, `.btn-secondary` — button variants
- `.contain-layout` — `contain: layout` for INP optimization

## Conventions

### Currency

All monetary values use the Indian Rupee symbol **₹** (U+20B9). Pricing, ROI calculators, scope estimators, case studies, and blog content all display amounts in ₹ with Indian numbering conventions (Lakhs, Crores).

**Reference files:**
- `src/app/pricing/PricingClient.tsx` — Pricing plans
- `src/components/ROICalculator.tsx` — ROI calculations
- `src/app/tools/scope-estimator/ScopeEstimatorClient.tsx` — Cost estimates
- `src/app/tools/headless-roi/HeadlessRoiClient.tsx` — Headless commerce calculator
- `src/components/MultiStepForm.tsx` — Budget selection
- `src/components/PortfolioShowcase.tsx` — Portfolio pricing
- `src/components/Testimonials.tsx` — Client metrics
- `src/lib/blog-data.ts` & `src/lib/case-studies-data.ts` — Content references

### Components

- **Client components** use `"use client"` directive when they need hooks, state, or browser APIs
- **Server components** are the default
- Dynamic imports with `ssr: false` are collected in `src/components/dynamic/ClientImports.tsx`
- UI primitives follow shadcn/ui conventions with `cva` (class-variance-authority)

### SEO

- Structured data (JSON-LD) is generated in `src/lib/seo/schema.ts`
- Metadata helpers in `src/lib/seo/helpers.ts`
- Brand/GEO strategy in `src/lib/seo/brand-strategy.ts`
- Each page exports `generateMetadata` or `metadata` object

## Key Components

| Component | Description |
|-----------|-------------|
| `Hero.tsx` | Main hero with interactive goal tabs (Build a SaaS, Automate Workflows, Launch Mobile App, Build Website) and horizontally scrollable dashboard mockup (mobile) |
| `Navbar.tsx` | Fixed nav with blur, search (Cmd+K), theme toggle, mobile hamburger |
| `ROICalculator.tsx` | Interactive calculator with scenario presets, sliders, cost comparison |
| `MultiStepForm.tsx` | 4-step project intake form with budget, timeline, description |
| `Pricing.tsx` | Pricing card display |
| `FAQ.tsx` | Accordion FAQ |
| `Testimonials.tsx` | Client testimonial cards |
| `ContactFooter.tsx` | Global footer with CTA, links, contact, social |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server host |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP app password |
| `SMTP_PORT` | SMTP port (default 587) |
| `DISCORD_WEBHOOK_URL` | Discord notification webhook |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |
| `RESEND_API_KEY` | Resend email API key |
| `GOOGLE_PAGESPEED_API_KEY` | Google PageSpeed Insights API key |

## Performance Optimizations

- `next.config.js` enables `optimizeCss: true` and `poweredByHeader: false`
- Static assets get 1-year immutable cache
- HTML gets 60s CDN cache with `stale-while-revalidate=86400`
- Images use AVIF/WebP with 30-day minimum cache
- `content-visibility: auto` on below-fold sections
- CSS critical path inlining via `critters`
- `.contain-layout` isolates heavy sections for INP optimization
- Mobile tap targets enforce 44px minimum
- `prefers-reduced-motion` disables all animations

## Deployment

```bash
npm run build    # Builds + runs indexing script
npm start        # Starts production server
```

The `ping-indexing.js` script runs post-build to notify search engines of updates.

## Analytics & Monitoring

- **Google Analytics 4** (G-W29JP8RY97)
- **Google Tag Manager** (GTM-TJ8X38P8)
- Analytics loads only after cookie consent
- PageSpeed Insights API integration in `/api/pagespeed`