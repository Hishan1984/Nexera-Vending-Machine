# Standard Operating Procedure: Web Application Security

**Document ID**: SOP-SEC-006  
**Role Owner**: `backend-developer` + `frontend-developer`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP defines security protocols covering database authorization, secret protection, injection defense, storage access, and Content Security Policy (CSP).

---

## 2. Core Security Protocols

### 1. Zero-Trust Database Access
* Row Level Security (RLS) is enabled on all tables in Supabase.
* Anonymous callers may ONLY insert data via explicit `INSERT` policies.
* Anonymous callers are strictly forbidden from reading (`SELECT`), modifying (`UPDATE`), or deleting (`DELETE`) records.
* Never use the Supabase `service_role` key on the client or in client-accessible environment files.

### 2. Client File Upload Hardening
* Before uploading any file to Supabase Storage:
  * Validate MIME types: whitelist `image/jpeg`, `image/png`, `image/webp`.
  * Validate size: reject any file over `5 MB` (`5 * 1024 * 1024` bytes).
  * Generate cryptographically random, sanitized file names. Do not preserve unvalidated client filenames.

### 3. Secret Management
* Client environment variables in `.env` must strictly contain only public identifiers (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
* Secrets, API tokens, and webhook signing keys must be stored in serverless environment variables or secret vaults.

### 4. Input Sanitization & XSS Defense
* Do not use `dangerouslySetInnerHTML` unless rendering sanitized static markdown.
* Always bind form values via controlled React state.
* Sanitize all text inputs by trimming and verifying types before database inserts.

---

## 3. Security Audit Checklist
- [ ] RLS policies verified on all tables using Supabase SQL editor or automated tests.
- [ ] No secret keys exposed in git history or client bundles.
- [ ] Form submission endpoints reject payloads exceeding expected limits.
- [ ] Storage bucket permissions restrict anonymous users to authorized buckets.
