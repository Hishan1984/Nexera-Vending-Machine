---
name: security-hardening
description: >-
  Provides security protocols, Supabase Row Level Security (RLS) policies, storage access controls,
  Content Security Policy guidelines, and secret management for the Nexera Smart application.
  Use when creating or auditing database tables, storage buckets, form handlers, or environment configurations.
---

# Web Application Security Hardening Skill

This skill defines mandatory security practices for the Nexera Smart web application, adhering to OWASP Web Security guidelines and Supabase defense-in-depth principles.

## 1. Supabase Row Level Security (RLS) Protocol

Every PostgreSQL table must enable RLS immediately upon creation:

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Policy Rules for Public (Anon) Forms
* **Insert Only**: Anon users may only INSERT into submission tables (e.g. `contact_enquiries`, `location_submissions`).
* **Explicit Columns**: Enforce `WITH CHECK` clauses or trigger validation to ensure required fields (e.g., `consent = true`) are verified.
* **Deny Read by Default**: Anon users must NEVER have `SELECT` permission on visitor-submitted data. Only `authenticated` roles (admin dashboard/service role) can query or export data.

```sql
-- Allow anonymous inserts only
CREATE POLICY "anon_insert_enquiries"
ON contact_enquiries FOR INSERT
TO anon, authenticated WITH CHECK (consent = true);

-- Restrict reads exclusively to authenticated operators
CREATE POLICY "auth_select_enquiries"
ON contact_enquiries FOR SELECT
TO authenticated USING (true);
```

---

## 2. Supabase Storage Bucket Security

Public or form-upload buckets (such as `location-photos`) must enforce strict upload safety:

1. **Bucket Existence**:
   ```sql
   INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
   VALUES (
     'location-photos',
     'location-photos',
     true,
     5242880, -- 5 MB in bytes
     ARRAY['image/jpeg', 'image/png', 'image/webp']
   )
   ON CONFLICT (id) DO UPDATE SET
     file_size_limit = EXCLUDED.file_size_limit,
     allowed_mime_types = EXCLUDED.allowed_mime_types;
   ```
2. **Access Policies**:
   ```sql
   -- Allow anonymous uploads
   CREATE POLICY "anon_upload_location_photos"
   ON storage.objects FOR INSERT
   TO anon, authenticated
   WITH CHECK (
     bucket_id = 'location-photos'
     AND (storage.foldername(name))[1] IS NOT NULL
   );

   -- Allow public read of uploaded photos
   CREATE POLICY "anon_read_location_photos"
   ON storage.objects FOR SELECT
   TO anon, authenticated
   USING (bucket_id = 'location-photos');
   ```

---

## 3. Client-Side Input Sanitization & Secret Hygiene

1. **Environment Variables**:
   * Only variables prefixed with `VITE_` can be bundled into client code.
   * `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are public identifiers.
   * **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` in frontend bundles or client `.env` files.
2. **Input Hygiene**:
   * Trim whitespace from text inputs before transmission (`value.trim()`).
   * Validate email formats using regular expressions before hitting the database.
   * Restrict file uploads in the frontend:
     * Check `file.size <= 5 * 1024 * 1024` (5 MB limit).
     * Check `['image/jpeg', 'image/png', 'image/webp'].includes(file.type)`.
     * Generate non-colliding random filenames (`location-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`).

---

## 4. Verification Checklist
- [ ] `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` executed on all public tables.
- [ ] No `SELECT` policies granted to `anon` on user data tables.
- [ ] Storage bucket `location-photos` created with 5 MB file size limit and MIME restrictions.
- [ ] Zero secret keys stored in source control or client environment files.
- [ ] Form submission endpoints handle errors gracefully without leaking stack traces.
