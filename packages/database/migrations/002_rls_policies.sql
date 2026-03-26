-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE website.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.site_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.deploys ENABLE ROW LEVEL SECURITY;
ALTER TABLE website.site_config ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Sites: members can view their sites
-- ============================================================
CREATE POLICY "Members can view their sites"
  ON website.sites FOR SELECT
  USING (
    id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update their sites"
  ON website.sites FOR UPDATE
  USING (
    id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

-- ============================================================
-- Site Members: members can view other members of their sites
-- ============================================================
CREATE POLICY "Members can view site members"
  ON website.site_members FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can manage site members"
  ON website.site_members FOR ALL
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

-- ============================================================
-- Pages: members can view, editors/owners can modify
-- ============================================================
CREATE POLICY "Members can view pages"
  ON website.pages FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Editors can manage pages"
  ON website.pages FOR ALL
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- Content Versions: members can view, editors can modify
-- ============================================================
CREATE POLICY "Members can view content versions"
  ON website.content_versions FOR SELECT
  USING (
    page_id IN (
      SELECT p.id FROM website.pages p
      JOIN website.site_members sm ON sm.site_id = p.site_id
      WHERE sm.user_id = auth.uid()
    )
  );

CREATE POLICY "Editors can manage content versions"
  ON website.content_versions FOR ALL
  USING (
    page_id IN (
      SELECT p.id FROM website.pages p
      JOIN website.site_members sm ON sm.site_id = p.site_id
      WHERE sm.user_id = auth.uid() AND sm.role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- Media: members can view, editors can modify
-- ============================================================
CREATE POLICY "Members can view media"
  ON website.media FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Editors can manage media"
  ON website.media FOR ALL
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- Deploys: members can view, editors can create
-- ============================================================
CREATE POLICY "Members can view deploys"
  ON website.deploys FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Editors can create deploys"
  ON website.deploys FOR INSERT
  WITH CHECK (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- Site Config: members can view, editors can modify
-- ============================================================
CREATE POLICY "Members can view site config"
  ON website.site_config FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Editors can manage site config"
  ON website.site_config FOR ALL
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- Service role bypass: allow the service role key to access all data
-- (used at build time by the web app for static generation)
-- ============================================================
-- Note: The service role key bypasses RLS by default in Supabase.
-- No additional policy needed.
