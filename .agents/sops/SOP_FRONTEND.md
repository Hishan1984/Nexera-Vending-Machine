# Standard Operating Procedure: Front-End Development

**Document ID**: SOP-FE-002  
**Role Owner**: `frontend-developer`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP dictates the coding standards, component architecture, state management patterns, and asset loading techniques for all front-end code in `src/`.

---

## 2. Component Guidelines & File Structure

```text
src/
├── components/          # Reusable shared UI elements
│   ├── Header.tsx       # Navigation bar & mobile drawer
│   ├── Footer.tsx       # Comprehensive footer with links & downloads
│   ├── Layout.tsx       # Shell with scroll-to-top & WhatsApp float
│   └── SectionHeading.tsx
├── pages/               # Route components (lazy-loaded)
│   ├── Home.tsx
│   ├── HelmetCleaningMachine.tsx
│   └── ...
├── lib/                 # Core utilities, constants & clients
│   ├── constants.ts     # Company info, asset URLs, downloads
│   ├── seo.ts           # useSeo and useJsonLd hooks
│   └── supabase.ts      # Supabase client initialization
└── types/               # TypeScript interfaces & database models
```

---

## 3. Mandatory Implementation Standards

### 1. Route-Level Lazy Loading
All route components must be registered using `React.lazy()` with a `<Suspense>` fallback in `src/App.tsx`. Never import page components synchronously if they add to the initial load footprint.

### 2. Side-Effect Hygiene
* **Prohibited**: Executing `document.createElement`, `document.head.appendChild`, or DOM mutations in the component render body.
* **Mandatory**: Wrap all metadata and schema manipulations inside custom React hooks (`useSeo`, `useJsonLd`) with `useEffect`.

### 3. Accessible Interactive Elements
* All buttons must have an explicit accessible label (`aria-label` or text content).
* Buttons and links must have a minimum touch footprint of `44px × 44px` (`min-h-[44px]`).
* Mobile navigation drawers must manage `document.body.style.overflow = 'hidden'` when open and trap focus.

### 4. Form State & User Feedback
* Form state must be managed cleanly using controlled components.
* Display clear status indicators: `idle`, `submitting`, `success`, `error`.
* On submission success, display an accessible confirmation banner, scroll to view, and reset the form.
* On error, surface user-friendly guidance (never raw network or stack errors).

### 5. Image & Video Handling
* Images must specify `width`, `height`, and modern formats (`.webp`).
* Hero / above-the-fold images: `priority`, `fetchpriority="high"`, `loading="eager"`.
* Below-the-fold images: `loading="lazy"`, `decoding="async"`.
* Video tags must specify `preload="metadata"` and a `poster` image.

---

## 4. Verification & Self-Check
Before submitting code to QA:
1. Run `npm run typecheck` — 0 TypeScript errors.
2. Run `npm run lint` — 0 ESLint warnings.
3. Test locally in Chrome, Safari, and Firefox responsive mode.
