'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUserId } from '@/lib/site-context';

export interface MediaItem {
  id: string;
  site_id: string;
  filename: string;
  original_filename: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number | null;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  folder: string;
  created_at: string;
}

/**
 * Get the Supabase storage URL prefix for public files.
 */
function getStorageBaseUrl(): string {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return `${url}/storage/v1/object/public/media`;
}

/**
 * Storage uses the public schema (not the "website" schema).
 * We need a separate client without the schema override.
 */
function createStorageClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createSupabaseClient(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * List all media files for a site.
 */
export async function listMediaForSite(siteId: string): Promise<MediaItem[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('site_id', siteId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  const baseUrl = getStorageBaseUrl();
  return data.map((item) => ({
    ...item,
    public_url: `${baseUrl}/${item.storage_path}`,
  }));
}

/**
 * Total number of media items for a site.
 */
export async function getMediaCount(siteId: string): Promise<number> {
  const supabase = createAdminClient();
  if (!supabase) return 0;
  const { count } = await supabase
    .from('media')
    .select('id', { count: 'exact', head: true })
    .eq('site_id', siteId);
  return count ?? 0;
}

/**
 * Upload a media file to storage and create the DB row.
 * Accepts FormData so the server action can receive the file.
 */
export async function uploadMediaFile(formData: FormData): Promise<MediaItem> {
  const file = formData.get('file') as File | null;
  const siteId = formData.get('siteId') as string | null;
  const folder = (formData.get('folder') as string) || '/';

  if (!file || !siteId) throw new Error('Missing file or siteId');

  const db = createAdminClient();
  const storage = createStorageClient();
  if (!db || !storage) throw new Error('Supabase not configured');

  const userId = await getCurrentUserId();

  // Generate unique filename: {siteId}/{uuid}.{ext}
  const ext = file.name.includes('.') ? file.name.split('.').pop() : '';
  const uniqueName = ext ? `${crypto.randomUUID()}.${ext}` : crypto.randomUUID();
  const storagePath = `${siteId}/${uniqueName}`;

  // Upload the file to storage
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await storage.storage
    .from('media')
    .upload(storagePath, new Uint8Array(arrayBuffer), {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  // Insert the DB row
  const { data, error: dbError } = await db
    .from('media')
    .insert({
      site_id: siteId,
      filename: uniqueName,
      original_filename: file.name,
      storage_path: storagePath,
      mime_type: file.type,
      size_bytes: file.size,
      folder,
      created_by: userId,
    })
    .select()
    .single();

  if (dbError || !data) {
    // Rollback: remove the uploaded file
    await storage.storage.from('media').remove([storagePath]);
    throw new Error(`DB insert failed: ${dbError?.message || 'unknown error'}`);
  }

  const baseUrl = getStorageBaseUrl();
  return {
    ...data,
    public_url: `${baseUrl}/${data.storage_path}`,
  };
}

/**
 * Delete a media file from storage and its DB row.
 */
export async function deleteMediaFile(mediaId: string): Promise<void> {
  const db = createAdminClient();
  const storage = createStorageClient();
  if (!db || !storage) throw new Error('Supabase not configured');

  // Fetch the storage path
  const { data: media, error: fetchError } = await db
    .from('media')
    .select('storage_path')
    .eq('id', mediaId)
    .single();

  if (fetchError || !media) throw new Error('Media not found');

  // Remove from storage (best-effort; continue even if it fails)
  await storage.storage.from('media').remove([media.storage_path]).catch(() => {});

  // Delete DB row
  const { error } = await db.from('media').delete().eq('id', mediaId);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}
