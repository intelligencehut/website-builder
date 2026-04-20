-- ============================================================
-- Videos + YouTube OAuth tokens
--
-- Lets admins upload a video file in the admin panel; the server
-- pushes it to YouTube via the Data API (resumable upload) and
-- tracks the resulting youtube_video_id here. Editors then pick
-- from the video library the same way they pick from /media.
--
-- One YouTube channel per site, stored in website.youtube_tokens
-- keyed by site_id. Tokens are service-role-only.
-- ============================================================

CREATE TABLE IF NOT EXISTS website.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,
  original_filename TEXT,
  size_bytes BIGINT,
  duration_seconds INT,

  -- YouTube state
  youtube_video_id TEXT,
  youtube_channel_id TEXT,
  privacy_status TEXT NOT NULL DEFAULT 'unlisted'
    CHECK (privacy_status IN ('private', 'unlisted', 'public')),
  thumbnail_url TEXT,

  -- Upload lifecycle
  status TEXT NOT NULL DEFAULT 'uploading'
    CHECK (status IN ('uploading', 'processing', 'ready', 'failed')),
  error_message TEXT,

  created_by UUID REFERENCES website.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_videos_site_id ON website.videos(site_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON website.videos(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_videos_youtube_video_id
  ON website.videos(youtube_video_id)
  WHERE youtube_video_id IS NOT NULL;

ALTER TABLE website.videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view videos" ON website.videos;
CREATE POLICY "Members can view videos"
  ON website.videos FOR SELECT
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Editors can manage videos" ON website.videos;
CREATE POLICY "Editors can manage videos"
  ON website.videos FOR ALL
  USING (
    site_id IN (
      SELECT site_id FROM website.site_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- ============================================================
-- YouTube OAuth tokens (per site)
-- ============================================================

CREATE TABLE IF NOT EXISTS website.youtube_tokens (
  site_id UUID PRIMARY KEY REFERENCES website.sites(id) ON DELETE CASCADE,

  -- Google OAuth tokens — refresh_token is long-lived, access_token rotates
  refresh_token TEXT NOT NULL,
  access_token TEXT,
  access_token_expires_at TIMESTAMPTZ,
  scopes TEXT,

  -- The channel we're authorized against
  channel_id TEXT,
  channel_title TEXT,

  connected_by UUID REFERENCES website.users(id) ON DELETE SET NULL,
  connected_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE website.youtube_tokens ENABLE ROW LEVEL SECURITY;

-- Tokens are service-role-only. No row-level policies for anon/authenticated;
-- server actions that need them use createAdminClient() (service role bypasses RLS).
-- We still want members to know whether a site is "connected" — expose a view
-- with only non-secret columns.

DROP VIEW IF EXISTS website.youtube_connections;
CREATE VIEW website.youtube_connections AS
  SELECT
    site_id,
    channel_id,
    channel_title,
    connected_by,
    connected_at,
    updated_at
  FROM website.youtube_tokens;

GRANT SELECT ON website.youtube_connections TO authenticated, anon;

-- OAuth state table — short-lived CSRF tokens for the auth start/callback flow.
CREATE TABLE IF NOT EXISTS website.youtube_oauth_states (
  state TEXT PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES website.sites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES website.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_youtube_oauth_states_created_at
  ON website.youtube_oauth_states(created_at);

ALTER TABLE website.youtube_oauth_states ENABLE ROW LEVEL SECURITY;
-- No policies: service-role-only.
