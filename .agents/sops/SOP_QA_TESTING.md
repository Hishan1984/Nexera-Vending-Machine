# Standard Operating Procedure: Quality Assurance & Testing

**Document ID**: SOP-QA-004  
**Role Owner**: `qa-engineer`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP defines the quality gates, test execution matrix, automated checks, and sign-off criteria for all releases of the Nexera Smart web application.

---

## 2. Mandatory Automated Quality Gate
Before any manual or functional testing begins, the codebase must pass all 3 automated checks:

```powershell
# 1. Typecheck
npm run typecheck

# 2. Linting
npm run lint

# 3. Production Build
npm run build
```

*Criteria for Pass*: Exit code 0, zero TypeScript errors, zero linter errors.

---

## 3. Functional Testing Matrix

| Test Scenario | Steps | Expected Outcome | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **Contact Form Submission** | Fill all required fields on `/contact` and submit. | Status transitions to submitting, success alert appears, record saved in Supabase `contact_enquiries`, form resets. | [ ] |
| **Location Submission with Photo** | Attach JPG/PNG image (< 5MB) on `/submit-location` and submit. | Image uploads to `location-photos` bucket, public URL generated, record inserted into `location_submissions`, success banner displays. | [ ] |
| **Location Submission without Photo** | Fill required fields without image and submit. | Record saved with `photo_url = null`, form succeeds. | [ ] |
| **File Size Limit Enforcement** | Attempt to attach image > 5MB. | Inline validation error: "Photo must be 5 MB or smaller", upload prevented. | [ ] |
| **Mobile Navigation Drawer** | Open menu on mobile viewport (< 768px), navigate to route. | Drawer opens smoothly, page scroll locked, clicking link navigates and closes drawer. | [ ] |
| **WhatsApp Direct Deeplink** | Click WhatsApp floating icon or button. | Opens `wa.me` with prefilled message containing location/product context. | [ ] |
| **Downloadable Assets** | Click brochure & profile download links. | Real PDF document initiates download; no HTML file served. | [ ] |

---

## 4. Cross-Device & Responsive Verification Matrix
Test key layouts at these breakpoints:
* **Mobile Small**: 375 × 667px (iPhone SE)
* **Mobile Standard**: 390 × 844px (iPhone 14/15)
* **Tablet**: 768 × 1024px (iPad)
* **Desktop Laptop**: 1366 × 768px / 1440 × 900px
* **Wide Display**: 1920 × 1080px

*Verification Points*:
1. Zero horizontal scrollbar (`overflow-x: hidden` honored).
2. All typography legible with balanced text wrapping.
3. Touch targets ≥ 44 × 44px.

---

## 5. Accessibility (WCAG 2.1 AA) Audit
* Keyboard tab order follows logical visual hierarchy.
* Focus rings visible on all active links, buttons, and inputs (`focus-visible`).
* Color contrast matches or exceeds 4.5:1.
* All informative images feature accurate `alt` tags; decorative icons feature `aria-hidden="true"`.

---

## 6. QA Sign-Off Protocol
A release is ONLY approved when all matrix items pass. If any item fails, the `qa-engineer` logs a bug ticket with reproduction steps, expected vs actual behavior, and blocks release until resolved.
