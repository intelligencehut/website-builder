-- ============================================================
-- Unified users table
-- Replaces super_admins with a single users table that stores
-- profile info synced from auth and a super_admin flag.
-- ============================================================

CREATE TABLE IF NOT EXISTS website.users (
  id UUID PRIMARY KEY,  -- matches auth.users.id
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON website.users(email);

ALTER TABLE website.users ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view website.users (needed to display team member info)
CREATE POLICY "Authenticated users can view users"
  ON website.users FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON website.users FOR UPDATE
  USING (id = auth.uid());

-- Service role can insert/update any user (for auto-sync on login)
-- Note: service_role bypasses RLS by default.

-- ============================================================
-- Migrate existing data
-- ============================================================

-- Insert all auth users into website.users
INSERT INTO website.users (id, email, name, avatar_url)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  u.raw_user_meta_data->>'avatar_url'
FROM auth.users u
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  avatar_url = EXCLUDED.avatar_url;

-- Migrate super_admin status from old table
UPDATE website.users
SET is_super_admin = true
WHERE id IN (SELECT user_id FROM website.super_admins);

-- Add FK from site_members to website.users
-- (only if it doesn't already exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'site_members_user_id_fkey'
    AND table_schema = 'website'
  ) THEN
    ALTER TABLE website.site_members
      ADD CONSTRAINT site_members_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES website.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Drop the old super_admins table
DROP TABLE IF EXISTS website.super_admins;
