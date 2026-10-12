# Standard Operating Procedure: Performance & Page Speed Index

**Document ID**: SOP-PERF-007  
**Role Owner**: `frontend-developer`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP defines performance thresholds, asset optimization practices, and bundle chunking standards to achieve top-tier Google PageSpeed Insights and Lighthouse scores (≥ 95).

---

## 2. Quantitative Performance Benchmarks

| Metric | Target (Good) | Maximum Acceptable |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | < 1.8s | 2.5s |
| **Interaction to Next Paint (INP)** | < 100ms | 200ms |
| **Cumulative Layout Shift (CLS)** | 0.00 | 0.05 |
| **Total Blocking Time (TBT)** | < 150ms | 200ms |
| **Speed Index** | < 2.0s | 2.8s |
| **JavaScript Chunk Size** | < 350 kB per chunk | 500 kB |

---

## 3. Mandatory Optimization Techniques

### 1. Route-Level Code Splitting
* Split all 20+ routes in `src/App.tsx` with dynamic `lazy()` imports.
* Wrap routes with a fallback `<Suspense>` spinner to ensure the initial download is minimal (< 150 kB gzipped).

### 2. Image Optimization Rules
* All raster images must use WebP or AVIF formats.
* Always supply explicit `width` and `height` attributes on `<img>` tags or set fixed aspect ratios via Tailwind (`aspect-video`, `aspect-[4/3]`) to prevent layout shifts.
* **Hero Image Rule**: Mark above-the-fold hero images with `priority`, `loading="eager"`, and `fetchpriority="high"`.
* **Below-Fold Rule**: All non-hero images must use `loading="lazy"` and `decoding="async"`.

### 3. Font Loading
* Preconnect to Google Fonts in `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```
* Ensure `font-display: swap` is included in Google Font stylesheet URLs.

### 4. Third-Party Script Hygiene
* Defer non-critical scripts.
* Do not import heavy libraries when native alternatives or lightweight micro-libraries suffice.

---

## 4. Verification Checklist
- [ ] Production build (`npm run build`) generates zero chunks exceeding 500 kB.
- [ ] Lighthouse Performance score ≥ 95 on mobile and desktop.
- [ ] No Cumulative Layout Shift detected during page load.
