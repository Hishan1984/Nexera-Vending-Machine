---
name: core-web-vitals-speed
description: >-
  Provides procedures and guidelines for optimizing Google Core Web Vitals, Page Speed Index,
  asset loading, code splitting, and bundle size for the Nexera Smart web application.
  Use when analyzing build outputs, optimizing images, improving LCP/INP/CLS, or refactoring routes.
---

# Core Web Vitals & Page Speed Index Optimization Skill

This skill enforces Google Lighthouse and Core Web Vitals standards for the Nexera Smart platform.

## 1. Core Web Vitals Targets
* **Largest Contentful Paint (LCP)**: < 2.0s (Target: < 1.5s)
* **Interaction to Next Paint (INP)**: < 200ms
* **Cumulative Layout Shift (CLS)**: < 0.05 (Target: 0.00)
* **First Contentful Paint (FCP)**: < 1.2s
* **Time to First Byte (TTFB)**: < 600ms

---

## 2. Route-Level Code Splitting (Vite + React Router)

Do not import all pages statically in `src/App.tsx`. Use dynamic imports with `React.lazy()` and `<Suspense>`:

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';

// Core entrypoint can remain eager or lazy
const Home = lazy(() => import('@/pages/Home'));
const HelmetCleaningMachine = lazy(() => import('@/pages/HelmetCleaningMachine'));
const SubmitLocation = lazy(() => import('@/pages/SubmitLocation'));
// ... remaining routes

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* routes */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 3. Image & Media Optimization

1. **Format**: Deliver assets in modern **WebP** or **AVIF** formats.
2. **Explicit Dimensions**: Always supply `width` and `height` (or CSS aspect-ratio) to reserve browser layout space and eliminate Cumulative Layout Shift (CLS).
3. **LCP Hero Images**:
   * Tag above-the-fold hero images with `priority` / `fetchpriority="high"` and `loading="eager"`.
   * Preload critical hero images in `index.html` if LCP is bound to a remote URL.
4. **Below-the-fold Images**:
   * Always tag with `loading="lazy"` and `decoding="async"`.
5. **Video Embeds**:
   * Use `preload="metadata"` and provide a static `poster` image to prevent massive initial video payload download.

---

## 4. Vite Build & Manual Chunking

Configure `vite.config.ts` to split third-party vendor dependencies cleanly:

```ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
```

---

## 5. Verification Checklist
- [ ] Production build (`npm run build`) produces chunks under 400 kB each.
- [ ] No layout shifts during image or font rendering (CLS = 0).
- [ ] Above-the-fold hero image has `fetchpriority="high"` and `loading="eager"`.
- [ ] Route navigation loads async chunks on-demand with smooth transitions.
