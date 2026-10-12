---
name: accessibility-wcag
description: >-
  Provides standards and auditing checklists for Web Content Accessibility Guidelines (WCAG 2.1 AA),
  ARIA attributes, keyboard navigation, color contrast, and assistive technology support for Nexera Smart.
  Use when designing or auditing UI components, forms, navigation menus, modals, and buttons.
---

# Accessibility (WCAG 2.1 AA) Standards & Audit Skill

This skill enforces digital accessibility compliance across all components and pages of the Nexera Smart web application.

## 1. Compliance Standard: WCAG 2.1 Level AA

All pages and interactions must satisfy the four core WCAG principles:
* **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
* **Operable**: User interface components and navigation must be operable via keyboard and touch devices.
* **Understandable**: Information and the operation of the user interface must be clear and intuitive.
* **Robust**: Content must be robust enough to be interpreted reliably by assistive technologies (screen readers).

---

## 2. Key Implementation Rules

### I. Semantic Structure & Headings
* Use a single logical `<h1>` per page reflecting the primary topic.
* Maintain sequential heading levels (`<h1>` -> `<h2>` -> `<h3>`) without skipping levels.
* Use native semantic landmark elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

### II. Color Contrast
* **Normal Text (< 18pt / 24px regular)**: Minimum contrast ratio of **4.5:1** against the background.
* **Large Text (≥ 18pt or 14pt bold)**: Minimum contrast ratio of **3:1**.
* **UI Components & Graphical Objects**: Minimum contrast ratio of **3:1** against adjacent background.
* *Nexera Theme Notes*: Navy `#082B59` against white `#FFFFFF` achieves 13.5:1 (Passed). Brand blue `#0876D9` against white achieves 4.7:1 (Passed). Ensure `#00BFD8` (cyan) is only used on dark backgrounds or as decorative accents.

### III. Interactive Controls & Touch Targets
* **Touch Target Size**: Minimum **44 × 44 pixels** for all buttons, links, toggles, and form inputs on mobile.
* **Visible Focus States**: Every interactive element must display an unambiguous outline on keyboard focus:
  ```css
  *:focus-visible {
    outline: none;
    ring: 2px solid var(--color-brand);
    ring-offset: 2px;
  }
  ```
* **Accessible Names**: All icon-only buttons (such as the mobile hamburger toggle, close buttons, WhatsApp floating button) MUST provide an `aria-label` or visually hidden screen reader text:
  ```tsx
  <button aria-label="Open navigation menu" aria-expanded={isOpen} ...>
    <Menu className="h-6 w-6" aria-hidden="true" />
  </button>
  ```

### IV. Forms & Error Announcements
* Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label>` via `htmlFor` or `aria-labelledby`.
* Form validation errors must be linked to the respective field via `aria-describedby="field-error-id"` and have `aria-invalid="true"`.
* Live status messages (submitting, success, error) must use `aria-live="polite"` or `role="alert"`.

---

## 3. Verification Checklist
- [ ] No automated a11y violations in browser audits.
- [ ] Entire page navigable using `Tab` and `Shift+Tab`.
- [ ] Accordion items toggle correctly with `Enter` / `Space` and announce `aria-expanded`.
- [ ] Non-decorative images have informative `alt` text; decorative icons have `aria-hidden="true"`.
- [ ] All touch targets meet or exceed 44 × 44px.
