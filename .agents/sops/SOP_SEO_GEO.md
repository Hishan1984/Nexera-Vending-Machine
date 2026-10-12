# Standard Operating Procedure: SEO & Dubai GEO-Targeting

**Document ID**: SOP-SEO-005  
**Role Owner**: `seo-geo-specialist`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP defines the technical requirements, metadata governance, Schema.org JSON-LD microdata, and regional Dubai/UAE geotargeting protocols for Nexera Smart.

---

## 2. Technical SEO Requirements

### 1. Route-to-Sitemap Synchronization
* Every route defined in `src/App.tsx` must be present in:
  1. `public/sitemap.xml`
  2. `src/pages/Sitemap.tsx` (human-readable sitemap)
* Whenever a new route is introduced, `sitemap.xml` must be updated with the route path, `<changefreq>`, and `<priority>`.

### 2. Elimination of Orphaned Pages
* Any programmatic landing page (such as industry-specific pages) must be contextually linked:
  * In the site footer under a "Solutions" or "Applications" navigation column.
  * In contextual callout cards on the `/locations` and `/partner-with-us` pages.

### 3. Canonical URLs
* Every page component must declare an explicit canonical URL matching `https://www.nexerasmart.ae/path`.
* Query parameters and tracking tokens (`?utm_*`) must not alter canonical tags.

---

## 3. Dubai / UAE GEO-Targeting Standards

1. **Regional HTML Tags in `index.html`**:
   ```html
   <meta name="geo.region" content="AE-DU" />
   <meta name="geo.placename" content="Dubai" />
   <meta name="geo.position" content="25.2697;55.2974" />
   <meta name="ICBM" content="25.2697, 55.2974" />
   <meta property="og:locale" content="en_AE" />
   ```
2. **Local Business NAP Consistency**:
   Ensure exact Name, Address, and Phone matching across all pages:
   * **Name**: Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C
   * **Address**: C-03, Al Shindagha, Deira, Dubai, UAE
   * **Phone**: +971 50 572 1028
   * **Email**: info@nexeravendingmachine.ae

---

## 4. Structured Data (Schema.org) Protocol

* Use React hooks (`useJsonLd` / `useSeo`) inside `useEffect` to safely manage JSON-LD scripts without DOM thrashing.
* Mandatory Schemas:
  * **Organization**: Root brand and company credentials.
  * **LocalBusiness**: Dubai physical location and service areas.
  * **Product**: On CXH01 machine details pages.
  * **BreadcrumbList**: On all nested routes.
  * **FAQPage**: On the `/faq` page.

---

## 5. Verification Checklist
- [ ] Google Rich Results Test passes with 0 structured data errors.
- [ ] No broken links (HTTP 404) or redirects on internal navigation.
- [ ] Canonical URLs resolve to live www HTTPS endpoints.
- [ ] OpenGraph image and titles display correctly in social preview tools.
