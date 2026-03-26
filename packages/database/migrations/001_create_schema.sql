-- Create the website schema
CREATE SCHEMA IF NOT EXISTS website;

-- ============================================================
-- Sites (tenants)
-- ============================================================
CREATE TABLE website.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Site Members (multi-tenant access control)
-- ============================================================
CREATE TABLE website.site_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(site_id, user_id)
);

-- ============================================================
-- Pages
-- ============================================================
CREATE TABLE website.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  page_type TEXT NOT NULL CHECK (page_type IN ('home', 'static', 'news', 'project', 'event', 'gallery', 'publication', 'team')),
  template TEXT,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(site_id, slug)
);

-- ============================================================
-- Content Versions
-- ============================================================
CREATE TABLE website.content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES website.pages(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'staged', 'published', 'archived')),
  content JSONB NOT NULL,
  created_by UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_id, version_number)
);

-- ============================================================
-- Media Library
-- ============================================================
CREATE TABLE website.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INT,
  alt_text TEXT,
  width INT,
  height INT,
  folder TEXT DEFAULT '/',
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Deploy Log
-- ============================================================
CREATE TABLE website.deploys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  environment TEXT NOT NULL CHECK (environment IN ('stage', 'production')),
  content_version_id UUID REFERENCES website.content_versions(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'building', 'success', 'failed')),
  deploy_url TEXT,
  triggered_by UUID,
  triggered_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- ============================================================
-- Site Configuration (navigation, footer, theme, SEO)
-- ============================================================
CREATE TABLE website.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  config_type TEXT NOT NULL CHECK (config_type IN ('navigation', 'footer', 'theme', 'seo')),
  content JSONB NOT NULL,
  version_number INT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'staged', 'published')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(site_id, config_type, version_number)
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX idx_pages_site_id ON website.pages(site_id);
CREATE INDEX idx_content_versions_page_status ON website.content_versions(page_id, status);
CREATE INDEX idx_media_site_id ON website.media(site_id);
CREATE INDEX idx_deploys_site_id ON website.deploys(site_id);
CREATE INDEX idx_site_config_lookup ON website.site_config(site_id, config_type, status);
CREATE INDEX idx_site_members_user ON website.site_members(user_id);
