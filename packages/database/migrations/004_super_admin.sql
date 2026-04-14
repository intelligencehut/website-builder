-- Add super_admin flag to track users who can access all sites
-- Super admins bypass site_members filtering and can manage all sites.
-- We store this as a simple table rather than modifying site_members,
-- because super admins are not tied to any specific site.

CREATE TABLE IF NOT EXISTS website.super_admins (
  user_id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE website.super_admins ENABLE ROW LEVEL SECURITY;

-- Super admins can view the super_admins table
CREATE POLICY "Super admins can view super_admins"
  ON website.super_admins FOR SELECT
  USING (user_id = auth.uid());

-- Allow service role full access (for admin operations)
-- Note: service_role bypasses RLS by default in Supabase.

-- Update the sites SELECT policy to also allow super admins
DROP POLICY IF EXISTS "Members can view their sites" ON website.sites;
CREATE POLICY "Members and super admins can view sites"
  ON website.sites FOR SELECT
  USING (
    id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM website.super_admins
      WHERE user_id = auth.uid()
    )
  );

-- Update sites UPDATE policy to allow super admins
DROP POLICY IF EXISTS "Owners can update their sites" ON website.sites;
CREATE POLICY "Owners and super admins can update sites"
  ON website.sites FOR UPDATE
  USING (
    id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
    OR EXISTS (
      SELECT 1 FROM website.super_admins
      WHERE user_id = auth.uid()
    )
  );
