-- ============================================================
-- Media storage bucket and policies
-- ============================================================

-- Create the media bucket (public, 10MB limit, common file types)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'video/mp4',
    'video/webm'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can read media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete media" ON storage.objects;

-- Public can read media files (for <img> tags in the rendered sites)
CREATE POLICY "Public can read media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- Authenticated users can upload
CREATE POLICY "Authenticated can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Authenticated users can delete
CREATE POLICY "Authenticated can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
