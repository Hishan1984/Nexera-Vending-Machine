---
name: code-quality-standards
description: >-
  Provides modern React, TypeScript, Tailwind CSS, and code organization rules for the Nexera Smart codebase.
  Use when writing, refactoring, or reviewing components, utilities, hooks, or pages.
---

# Code Quality & Modern Engineering Standards Skill

This skill enforces TypeScript rigor, React architectural patterns, and Tailwind CSS maintainability for Nexera Smart.

## 1. TypeScript Strictness
* **No `any`**: Explicitly type all component props, function returns, form states, and API responses.
* **Database Models**: Maintain centralized TypeScript types matching Supabase database table definitions in `src/types/database.ts` or `src/lib/types.ts`.
* **Zero Compilation Warnings**: Always ensure `npm run typecheck` passes with zero errors.

---

## 2. React Architectural Rules

1. **Pure Render Bodies**:
   * Never execute side effects (DOM mutations, analytics pings, timer creations, fetch calls) directly inside the component render function.
   * Encapsulate all side-effects inside `useEffect` or event handlers.
2. **State Management**:
   * Keep state as local as possible.
   * Avoid derived state that can be computed during render.
   * Reset form states properly upon successful submission.
3. **Component Decomposition**:
   * Keep components focused (Single Responsibility Principle).
   * Extract reusable UI patterns into `src/components/` (e.g. `SectionHeading`, `CtaBanner`, `MachineImage`).

---

## 3. Tailwind CSS & Styling Guidelines

1. **Design Tokens**:
   * Use configured theme colors: `brand` (`#0876D9`), `navy` (`#082B59`), `cyan` (`#00BFD8`), `cloud` grays.
   * Avoid arbitrary magic color hexes in utility classes; leverage Tailwind color definitions from `tailwind.config.js`.
2. **Component Utilities**:
   * Leverage `@layer components` in `src/index.css` for recurrent button styles (`btn-primary`, `btn-whatsapp`, `card`, `card-hover`, `input-field`).
3. **Responsive Breakpoints**:
   * Mobile-first: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px).

---

## 4. Verification Commands
```bash
# Typecheck
npm run typecheck

# Linting
npm run lint

# Production Build
npm run build
```
