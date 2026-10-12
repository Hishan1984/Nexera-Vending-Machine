/*
# Create contact_enquiries table

1. New Tables
- `contact_enquiries`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — submitter's full name
  - `company_name` (text, nullable) — optional company
  - `email` (text, not null) — submitter's email
  - `phone` (text, nullable) — submitter's phone
  - `location` (text, nullable) — location/area description
  - `property_type` (text, nullable) — type of property (dropdown)
  - `rider_footfall` (text, nullable) — expected rider/motorcycle footfall
  - `partnership_interest` (text, nullable) — revenue sharing / space rental / machine supply / not sure
  - `message` (text, nullable) — free-text message
  - `consent` (boolean, not null default false) — consent checkbox
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_enquiries`.
- This is a no-auth public contact form, so INSERT is allowed for anon + authenticated.
- SELECT/UPDATE/DELETE restricted to authenticated (admin-only) so public visitors cannot read others' enquiries.

3. Notes
- The contact form on the Contact page writes to this table using the anon key.
- No PII beyond what the form collects is stored.
*/

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company_name text,
  email text NOT NULL,
  phone text,
  location text,
  property_type text,
  rider_footfall text,
  partnership_interest text,
  message text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) to submit enquiries
DROP POLICY IF EXISTS "anon_insert_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_enquiries"
ON contact_enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can read enquiries
DROP POLICY IF EXISTS "auth_select_enquiries" ON contact_enquiries;
CREATE POLICY "auth_select_enquiries"
ON contact_enquiries FOR SELECT
TO authenticated USING (true);

-- Only authenticated (admin) can update enquiries
DROP POLICY IF EXISTS "auth_update_enquiries" ON contact_enquiries;
CREATE POLICY "auth_update_enquiries"
ON contact_enquiries FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete enquiries
DROP POLICY IF EXISTS "auth_delete_enquiries" ON contact_enquiries;
CREATE POLICY "auth_delete_enquiries"
ON contact_enquiries FOR DELETE
TO authenticated USING (true);

-- Index for sorting by newest
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON contact_enquiries (created_at DESC);
