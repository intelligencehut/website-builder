-- ============================================================
-- Access requests — lets users request access to sites
-- ============================================================

CREATE TABLE IF NOT EXISTS website.access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES website.users(id) ON DELETE CASCADE,
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'denied')) DEFAULT 'pending',
  message TEXT,
  reviewed_by UUID REFERENCES website.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_access_requests_status
  ON website.access_requests(status);

CREATE INDEX IF NOT EXISTS idx_access_requests_user
  ON website.access_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_access_requests_site
  ON website.access_requests(site_id);
