/*
# Create location_submissions table

1. New Tables
- `location_submissions`
  - `id` (uuid, primary key)
  - `property_name` (text, not null) — property or company name
  - `contact_person` (text, not null) — contact person's full name
  - `mobile` (text, not null) — contact mobile number
  - `email` (text, not null) — contact email
  - `location_area` (text, not null) — location or area description
  - `location_type` (text, not null) — category: Delivery Ecosystem, Mobility, Commercial, Logistics, Other
  - `rider_footfall` (text, nullable) — approximate rider footfall per day
  - `available_space` (text, nullable) — available space description
  - `electricity_available` (boolean, nullable) — whether electricity is available on site
  - `preferred_model` (text, nullable) — Revenue Sharing, Rental, Purchase, Not Sure
  - `message` (text, nullable) — free-text message
  - `photo_url` (text, nullable) — public URL of uploaded location photo in Supabase Storage
  - `consent` (boolean, not null default false) — consent checkbox
  - `status` (text, not null default 'pending') — submission status: pending, reviewed, approved, rejected
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `location_submissions`.
- This is a no-auth public form, so INSERT is allowed for anon + authenticated.
- SELECT/UPDATE/DELETE restricted to authenticated (admin-only) so public visitors cannot read others' submissions.

3. Storage
- A public storage bucket `location-photos` is used for location photo uploads.
- Public read access is enabled so submitted photos can be viewed by the Nexera team.
- Upload is handled from the frontend using the anon key.

4. Notes
- The Submit Location form on the dedicated page writes to this table using the anon key.
- Photo files are uploaded to the `location-photos` storage bucket and the resulting public URL is stored in `photo_url`.
- No PII beyond what the form collects is stored.
*/

CREATE TABLE IF NOT EXISTS location_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_name text NOT NULL,
  contact_person text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  location_area text NOT NULL,
  location_type text NOT NULL,
  rider_footfall text,
  available_space text,
  electricity_available boolean,
  preferred_model text,
  message text,
  photo_url text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE location_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) to submit location assessments
DROP POLICY IF EXISTS "anon_insert_location_submissions" ON location_submissions;
CREATE POLICY "anon_insert_location_submissions"
ON location_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can read submissions
DROP POLICY IF EXISTS "auth_select_location_submissions" ON location_submissions;
CREATE POLICY "auth_select_location_submissions"
ON location_submissions FOR SELECT
TO authenticated USING (true);

-- Only authenticated (admin) can update submissions
DROP POLICY IF EXISTS "auth_update_location_submissions" ON location_submissions;
CREATE POLICY "auth_update_location_submissions"
ON location_submissions FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete submissions
DROP POLICY IF EXISTS "auth_delete_location_submissions" ON location_submissions;
CREATE POLICY "auth_delete_location_submissions"
ON location_submissions FOR DELETE
TO authenticated USING (true);

-- Index for sorting by newest
CREATE INDEX IF NOT EXISTS idx_location_submissions_created_at ON location_submissions (created_at DESC);

-- Create the public storage bucket for location photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('location-photos', 'location-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public (anon) to upload photos to the location-photos bucket
DROP POLICY IF EXISTS "anon_upload_location_photos" ON storage.objects;
CREATE POLICY "anon_upload_location_photos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'location-photos');

-- Allow public read of location photos (bucket is public)
DROP POLICY IF EXISTS "anon_read_location_photos" ON storage.objects;
CREATE POLICY "anon_read_location_photos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'location-photos');
