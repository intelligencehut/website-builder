-- ============================================================
-- Raise the media bucket's file-size cap to accommodate video
-- uploads staged here before being pushed to YouTube.
--
-- Original cap (10 MB from migration 006) was fine for images
-- and PDFs but not for videos. Limit bumped to 50 MB — the max
-- this Supabase project supports; to go higher you'd need to
-- upgrade the plan (Supabase Pro supports up to 5 GB per file).
--
-- After a successful YouTube push, the server deletes the
-- staging file, so the bucket doesn't accumulate content.
--
-- Also adds video MIME types beyond the initial mp4/webm pair.
-- ============================================================

UPDATE storage.buckets
SET
  file_size_limit = 52428800, -- 50 MB (project plan cap)
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska'
  ]
WHERE id = 'media';
