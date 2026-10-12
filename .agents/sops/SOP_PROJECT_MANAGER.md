# Standard Operating Procedure: Project Management & Governance

**Document ID**: SOP-PM-008  
**Role Owner**: `project-manager`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP establishes sprint planning rituals, task delegation protocols, quality gate enforcement, and release sign-offs across all subagents.

---

## 2. Core Governance Responsibilities

### 1. Task Delegation & Agent Workflow
When a new initiative or bug fix begins:
1. `project-manager` reviews the request against project objectives and assigns tasks to the appropriate subagent:
   * **UI, layout, styling, responsiveness, performance chunking**: `frontend-developer`
   * **Supabase tables, RLS, storage buckets, database migrations**: `backend-developer`
   * **Verification, test matrix, regression check, a11y audit**: `qa-engineer`
   * **Structured data, geotargeting, sitemap, meta tags, indexability**: `seo-geo-specialist`
2. All assigned subagents must adhere to their respective role SOP.

### 2. Quality Gate Enforcement
No pull request, feature, or release can proceed to production without passing the 4 Quality Gates:
* **Gate 1 (Build & Types)**: `npm run typecheck` and `npm run lint` pass with 0 errors.
* **Gate 2 (Security)**: RLS enabled, zero secret leaks, bucket permissions active.
* **Gate 3 (QA & Testing)**: Functional test matrix executed, cross-device verification passed, WCAG 2.1 AA a11y audited.
* **Gate 4 (SEO & Speed)**: Metadata verified, JSON-LD validated, no bundle chunk > 500 kB, LCP < 2.2s.

---

## 3. Communication & Handoff Standard
When handing off between subagents:
* Include:
  * Explicit file paths (`file:///...`)
  * Commit/change description
  * Testing instructions
  * Relevant verification output or logs

---

## 4. Release Checklist
- [ ] Automated tests, build, and lint pass.
- [ ] QA Engineer provides sign-off report.
- [ ] SEO & GEO Specialist provides metadata audit.
- [ ] Project Manager authorizes production deployment.
