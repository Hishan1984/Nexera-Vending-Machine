# Standard Operating Procedure: Back-End & Supabase Management

**Document ID**: SOP-BE-003  
**Role Owner**: `backend-developer`  
**Version**: 1.0.0  
**Effective Date**: 2026-10-12  

---

## 1. Scope & Objective
This SOP dictates the database architecture, SQL migration process, Row Level Security (RLS) enforcement, and Supabase Storage bucket management for Nexera Smart.

---

## 2. Database Standards & Conventions

### 1. Naming & Keys
* Tables: snake_case, pluralized (`contact_enquiries`, `location_submissions`).
* Primary Keys: `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`.
* Timestamps: `created_at timestamptz DEFAULT now()`.

### 2. Migration Protocol
* All database changes must be versioned inside `supabase/migrations/` using timestamped filenames: `YYYYMMDDHHMMSS_description.sql`.
* Migrations must be idempotent (`CREATE TABLE IF NOT EXISTS`, `DROP POLICY IF EXISTS`).

---

## 3. Row Level Security (RLS) Standards

* **Zero Exception Rule**: RLS is strictly required on every table:
  ```sql
  ALTER TABLE location_submissions ENABLE ROW LEVEL SECURITY;
  ```
* **Anonymous Ingestion**:
  ```sql
  CREATE POLICY "anon_insert_location_submissions"
  ON location_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
  ```
* **Admin Read/Write Only**:
  ```sql
  CREATE POLICY "auth_select_location_submissions"
  ON location_submissions FOR SELECT
  TO authenticated USING (true);
  ```

---

## 4. Storage Bucket Configuration & Sync

### Bucket Provisioning Checklist
When frontend features require photo/asset uploads (e.g., location submissions):
1. **Declare Bucket**:
   ```sql
   INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
   VALUES (
     'location-photos',
     'location-photos',
     true,
     5242880,
     ARRAY['image/jpeg', 'image/png', 'image/webp']
   ) ON CONFLICT (id) DO NOTHING;
   ```
2. **Apply Storage Policies**:
   ```sql
   CREATE POLICY "anon_upload_location_photos"
   ON storage.objects FOR INSERT
   TO anon, authenticated
   WITH CHECK (bucket_id = 'location-photos');

   CREATE POLICY "anon_read_location_photos"
   ON storage.objects FOR SELECT
   TO anon, authenticated
   USING (bucket_id = 'location-photos');
   ```
3. **Verify Bucket Existence**:
   Query `storage.buckets` endpoint or check Supabase dashboard to verify bucket creation prior to UI testing.

---

## 5. Verification Checklist
- [ ] Table migrations written and stored in `supabase/migrations/`.
- [ ] RLS enabled and validated with both anonymous and authenticated tokens.
- [ ] Storage buckets created with appropriate MIME and size constraints.
- [ ] Frontend Supabase client error responses handled safely without raw database details.
