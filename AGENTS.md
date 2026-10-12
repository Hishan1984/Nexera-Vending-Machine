# Nexera Smart — Repository Agent Rules & Standards

This document establishes the mandatory engineering standards, team roles, and development governance for all AI agents and engineers contributing to the **Nexera Smart** web application.

---

## 1. Project Overview & Tech Stack
* **Application**: Nexera Smart commercial vending & automated helmet cleaning platform.
* **Location & Market**: Dubai, United Arab Emirates (UAE).
* **Front-End**: React 18, TypeScript, Vite, Tailwind CSS, React Router v7, Lucide React.
* **Back-End**: Supabase (PostgreSQL 15+, PostgREST, Supabase Storage, Row Level Security).
* **Hosting / Delivery**: Cloudflare Pages / Vercel / Netlify with SPA fallback (`_redirects`).

---

## 2. Specialized Roles & Responsibility Matrix
When delegating or executing tasks, adhere to the assigned role boundaries:

| Role / Subagent | Scope & Domain | Primary Mandate |
| :--- | :--- | :--- |
| **Project Manager** (`project-manager`) | Workflow Governance & Sprints | Ensures compliance with SOPs, quality gates, sprint tracking, and milestone reviews. |
| **Front-End Developer** (`frontend-developer`) | UI, Component Architecture, Vite/React | Delivers responsive, accessible, modular UI with optimal bundle splitting and Web Vitals. |
| **Back-End Developer** (`backend-developer`) | Supabase, PostgreSQL, Storage, RLS | Secures data persistence with zero-trust RLS policies, storage bucket configs, and migrations. |
| **QA Engineer** (`qa-engineer`) | Quality Assurance, Testing, Auditing | Verifies builds, type safety, linting, form submissions, cross-device responsiveness, and WCAG a11y. |
| **SEO & GEO Specialist** (`seo-geo-specialist`) | Search, Schema, Dubai/UAE Local SEO | Manages JSON-LD, localized metadata (`en_AE`), sitemaps, internal linking, and rich snippets. |

---

## 3. Five Pillars of Industry Excellence

### I. Security (Zero-Trust Standard)
1. **Row Level Security (RLS)**: Must be enabled on EVERY Supabase table without exception. Public tables must explicitly define `anon` INSERT policies with strict column constraints. Authenticated policies must protect admin queries.
2. **Storage Bucket Hardening**: Public uploads must enforce MIME type filtering (`image/jpeg`, `image/png`, `image/webp`) and a maximum file size of 5 MB.
3. **Secret Hygiene**: Never commit service role keys or sensitive credentials. Only `VITE_SUPABASE_ANON_KEY` and public project URLs are permitted in client environment files.
4. **Input Sanitization**: All user inputs in forms must be trimmed, validated, and sanitized to prevent injection attacks or malformed payload crashes.

### II. Page Speed Index & Core Web Vitals
1. **Target Benchmarks**:
   * **Largest Contentful Paint (LCP)**: ≤ 2.2 seconds.
   * **Interaction to Next Paint (INP)**: ≤ 200 ms.
   * **Cumulative Layout Shift (CLS)**: ≤ 0.05 (Target 0.0).
2. **Bundle Chunking**: All routes in `App.tsx` must use `React.lazy()` dynamic imports to eliminate monolithic JS chunks.
3. **Asset Optimization**: High-resolution images must be WebP/AVIF formatted, with explicit width/height dimensions to eliminate layout shifts.

### III. SEO & GEO Standards (Dubai, UAE Focus)
1. **Geotargeting**: All public pages must specify UAE locale tags (`en_AE`), correct business coordinates in Al Shindagha, Deira, Dubai, and localized commercial metadata.
2. **Structured Data (Schema.org)**: Maintain valid JSON-LD schemas (`LocalBusiness`, `Organization`, `Product`, `BreadcrumbList`, `FAQPage`). Schema injection must occur inside `useEffect` hooks, never directly within the component render body.
3. **Link Equity**: Every programmatic landing page must have active internal links from site navigation, footer, or hub pages (zero orphaned pages).

### IV. Accessibility (WCAG 2.1 AA Compliance)
1. **Color Contrast**: Minimum contrast ratio of 4.5:1 for standard text and 3:0 for large text against background colors.
2. **Keyboard Navigation**: All interactive elements (buttons, links, accordions, mobile drawer) must be reachable and operable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
3. **Touch Targets**: All mobile touch targets must meet the minimum 44 × 44px threshold.

### V. Code Quality & React Best Practices
1. **TypeScript Integrity**: Strict typing required. Zero usage of `any`.
2. **Clean Builds**: `npm run typecheck`, `npm run lint`, and `npm run build` must pass with zero errors before any branch or release is approved.
3. **Preserve Documentation**: Retain all existing comments, docstrings, and context unless explicitly directed to modify them.

---

## 4. Pipeline & SOP References
Detailed execution workflows and SOPs are located in:
* [Engineering Pipeline](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_PIPELINE.md)
* [Front-End SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_FRONTEND.md)
* [Back-End SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_BACKEND.md)
* [QA & Testing SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_QA_TESTING.md)
* [SEO & GEO SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_SEO_GEO.md)
* [Security SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_SECURITY.md)
* [Performance SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_PERFORMANCE.md)
* [Project Manager SOP](file:///c:/Users/marke/Videos/Nexera%20Website/.agents/sops/SOP_PROJECT_MANAGER.md)
