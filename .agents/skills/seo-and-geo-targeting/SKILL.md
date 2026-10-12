---
name: seo-and-geo-targeting
description: >-
  Provides procedures and guidelines for Technical SEO, Dubai/UAE local GEO-targeting,
  Schema.org JSON-LD microdata, sitemaps, canonicals, and rich snippet optimization for Nexera Smart.
  Use when adding new pages, updating metadata, injecting structured data, or auditing search rankings.
---

# Technical SEO & Dubai / UAE GEO-Targeting Skill

This skill defines the technical search engine optimization and regional geotargeting standards for the Nexera Smart web application in Dubai and the UAE.

## 1. Regional GEO-Targeting (Dubai, UAE)

* **Target Geographic Entity**: Dubai, United Arab Emirates (UAE).
* **Language & Locale**: `en_AE` (English, UAE) and `ar_AE` (Arabic, UAE for future multilingual expansion).
* **Country Targeting**: `meta name="geo.region" content="AE-DU"` and `meta name="geo.placename" content="Dubai"`.
* **Coordinates**: `meta name="geo.position" content="25.2697;55.2974"` (Al Shindagha / Deira, Dubai).
* **ICBM**: `meta name="ICBM" content="25.2697, 55.2974"`.
* **Primary High-Intent Keywords**:
  * "helmet cleaning machine dubai"
  * "automated helmet sanitizer uae"
  * "motorcycle helmet cleaning delivery riders dubai"
  * "smart vending machine dubai"
  * "helmet sanitization driving schools dubai"
  * "delivery hub rider amenities dubai"

---

## 2. Schema.org Structured Data Protocol (JSON-LD)

### Anti-Pattern Warning: Never Mutate DOM During Component Render
In React, DOM mutations inside the render body trigger repeatedly on every keystroke/state update.
**Rule**: Always inject or update JSON-LD schemas inside a `useEffect` hook!

```tsx
// Inside src/lib/seo.ts
export function useJsonLd(id: string, data: unknown) {
  useEffect(() => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.setAttribute('type', 'application/ld+json');
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      // Optional cleanup on unmount
    };
  }, [id, JSON.stringify(data)]);
}
```

### Standard Schema Definitions
1. **LocalBusiness / Store / AutomatedVending**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C",
     "alternateName": "Nexera Smart",
     "url": "https://www.nexerasmart.ae",
     "telephone": "+971505721028",
     "email": "info@nexeravendingmachine.ae",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "C-03, Al Shindagha, Deira",
       "addressLocality": "Dubai",
       "addressCountry": "AE"
     },
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": 25.2697,
       "longitude": 55.2974
     },
     "areaServed": {
       "@type": "AdministrativeArea",
       "name": "Dubai, United Arab Emirates"
     }
   }
   ```
2. **Product Schema**: On CXH01 product pages (`/helmet-cleaning-machine`).
3. **BreadcrumbList Schema**: On all secondary routes.
4. **FAQPage Schema**: On `/faq`.

---

## 3. Crawlability & Internal Linking Protocol

1. **No Orphaned Pages**:
   * Every landing page must have active inbound internal links.
   * Programmatic SEO pages (e.g. `/helmet-cleaning-machine-for-driving-schools`) must be linked in the site footer under "Solutions" or inside the `/locations` hub.
2. **Sitemap & Robots**:
   * Maintain 1:1 mapping between `src/App.tsx` routes, `public/sitemap.xml`, and `public/robots.txt`.
   * Include `<lastmod>` tags when pages are updated.
3. **Canonical Tags**:
   * Every page must have a single absolute canonical tag (`https://www.nexerasmart.ae/path`).

---

## 4. Verification Checklist
- [ ] Valid JSON-LD schemas validated via Google Rich Results Test tool.
- [ ] Canonical URLs match live production URL scheme.
- [ ] OpenGraph (`og:image`, `og:title`, `og:description`) and Twitter cards test valid.
- [ ] Geo-meta tags set for Dubai, UAE (`en_AE`).
- [ ] All 20 routes linked and verified in `sitemap.xml`.
