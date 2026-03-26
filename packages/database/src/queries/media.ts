import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Get all media for a site, optionally filtered by folder.
 */
export async function getMedia(
  supabase: SupabaseClient,
  siteId: string,
  folder?: string
) {
  let query = supabase
    .from("media")
    .select("*")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false });

  if (folder) {
    query = query.eq("folder", folder);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Create a media record after uploading a file to Supabase Storage.
 */
export async function createMediaRecord(
  supabase: SupabaseClient,
  record: {
    site_id: string;
    filename: string;
    original_filename: string;
    storage_path: string;
    mime_type: string;
    size_bytes?: number;
    alt_text?: string;
    width?: number;
    height?: number;
    folder?: string;
    created_by?: string;
  }
) {
  const { data, error } = await supabase
    .from("media")
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a media record and its file from storage.
 */
export async function deleteMedia(
  supabase: SupabaseClient,
  mediaId: string,
  storagePath: string
) {
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("media")
    .remove([storagePath]);

  if (storageError) throw storageError;

  // Delete from database
  const { error: dbError } = await supabase
    .from("media")
    .delete()
    .eq("id", mediaId);

  if (dbError) throw dbError;
}
