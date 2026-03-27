import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase admin client using the service role key.
 * Bypasses RLS — use only for server-side admin operations.
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createSupabaseClient(url, key, {
    auth: { persistSession: false },
    db: { schema: 'website' },
  });
}
