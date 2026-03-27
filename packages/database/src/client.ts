import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client for server-side operations (build time, API routes, server actions).
 * Uses the service role key — never expose this to the browser.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: 'website' },
  });
}

/**
 * Create a Supabase client for browser-side operations (admin panel).
 * Uses the anon key — safe for client-side usage with RLS.
 */
export function createBrowserClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
    );
  }

  return createClient(url, key);
}
