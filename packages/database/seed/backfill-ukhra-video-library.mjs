#!/usr/bin/env node
/**
 * Scan Ukhra's content for every YouTube video referenced in a `video`
 * section, pull fresh metadata from the YouTube Data API, and register
 * each video in `website.videos` so they appear in Media → Videos and
 * the video picker in the page editor.
 *
 * Idempotent — re-running only updates existing rows.
 *
 * Run from repo root (env auto-loads from apps/admin/.env.local):
 *   SUPABASE_SERVICE_ROLE_KEY='<key>' node packages/database/seed/backfill-ukhra-video-library.mjs
 *
 * (If GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET aren't in your env, the script
 * reads apps/admin/.env.local for them.)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// ── Load env from apps/admin/.env.local if keys not already in env ───────
try {
  const lines = readFileSync(join(process.cwd(), "apps/admin/.env.local"), "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
} catch { /* non-fatal */ }

const SUPABASE_URL = process.env.SUPABASE_URL || "https://eevtuonrbvwgfpskergd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!SUPABASE_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error(
    "Missing env. Need SUPABASE_SERVICE_ROLE_KEY + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET."
  );
  process.exit(1);
}

const UKHRA_SITE_ID = "a0000000-0000-0000-0000-000000000003";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  db: { schema: "website" },
});

// ── Fetch (refreshing if needed) the Ukhra YouTube access token ──────────
async function getAccessToken() {
  const { data: row, error } = await supabase
    .from("youtube_tokens")
    .select("refresh_token, access_token, access_token_expires_at, channel_id")
    .eq("site_id", UKHRA_SITE_ID)
    .single();
  if (error || !row) {
    throw new Error(`No youtube_tokens for Ukhra (${error?.message}). Connect YouTube in Settings first.`);
  }

  const exp = row.access_token_expires_at ? new Date(row.access_token_expires_at).getTime() : 0;
  if (row.access_token && exp > Date.now() + 60_000) {
    return { accessToken: row.access_token, channelId: row.channel_id };
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: row.refresh_token,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  const fresh = await res.json();

  await supabase
    .from("youtube_tokens")
    .update({
      access_token: fresh.access_token,
      access_token_expires_at: new Date(Date.now() + fresh.expires_in * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("site_id", UKHRA_SITE_ID);

  return { accessToken: fresh.access_token, channelId: row.channel_id };
}

// ── Walk Ukhra's pages, collect every (youtubeId, title, caption) ────────
async function collectVideoReferences() {
  const { data: pages, error: pagesErr } = await supabase
    .from("pages")
    .select("id, slug")
    .eq("site_id", UKHRA_SITE_ID);
  if (pagesErr) throw new Error(`Loading pages: ${pagesErr.message}`);
  if (!pages?.length) return [];

  const refs = new Map();
  for (const page of pages) {
    const { data: version } = await supabase
      .from("content_versions")
      .select("content")
      .eq("page_id", page.id)
      .order("version_number", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!version) continue;
    const sections = version.content?.sections ?? [];
    for (const s of sections) {
      if (s?.type !== "video") continue;
      for (const item of s?.data?.items ?? []) {
        if (!item?.youtubeId) continue;
        if (!refs.has(item.youtubeId)) {
          refs.set(item.youtubeId, {
            title: item.title ?? "",
            caption: item.caption ?? "",
            firstSeenOn: page.slug,
          });
        }
      }
    }
  }
  return Array.from(refs.entries()).map(([youtubeId, info]) => ({ youtubeId, ...info }));
}

// ── Batch-fetch metadata from YouTube Data API ──────────────────────────
async function fetchYoutubeDetails(accessToken, youtubeIds) {
  const results = new Map();
  for (let i = 0; i < youtubeIds.length; i += 50) {
    const batch = youtubeIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status,contentDetails&id=${batch.join(",")}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) throw new Error(`YouTube API ${res.status}: ${await res.text()}`);
    const body = await res.json();
    for (const item of body.items ?? []) {
      const thumbs = item.snippet?.thumbnails ?? {};
      const thumbnailUrl = thumbs.high?.url ?? thumbs.medium?.url ?? thumbs.default?.url ?? null;
      const iso = item.contentDetails?.duration;
      const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const durationSeconds = m ? (+(m[1] || 0) * 3600 + +(m[2] || 0) * 60 + +(m[3] || 0)) : null;
      results.set(item.id, {
        title: item.snippet?.title ?? "",
        description: item.snippet?.description ?? "",
        thumbnailUrl,
        durationSeconds,
        privacyStatus: item.status?.privacyStatus ?? "unlisted",
        channelId: item.snippet?.channelId ?? null,
      });
    }
  }
  return results;
}

// ── Upsert one row (partial unique index doesn't play well with PostgREST
//    upsert, so check-then-insert-or-update) ──────────────────────────────
async function upsertVideo(row) {
  const { data: existing } = await supabase
    .from("videos")
    .select("id")
    .eq("site_id", row.site_id)
    .eq("youtube_video_id", row.youtube_video_id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("videos")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    return { action: "updated", error };
  }
  const { error } = await supabase.from("videos").insert(row);
  return { action: "inserted", error };
}

async function main() {
  console.log("Collecting video references from Ukhra pages...");
  const refs = await collectVideoReferences();
  console.log(`Found ${refs.length} unique YouTube IDs in content.\n`);
  if (refs.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  const { accessToken, channelId: ownedChannelId } = await getAccessToken();
  console.log(`Using YouTube channel ${ownedChannelId} for Ukhra.\n`);

  console.log("Fetching metadata from YouTube API...");
  const ytDetails = await fetchYoutubeDetails(
    accessToken,
    refs.map((r) => r.youtubeId)
  );
  console.log(`Got metadata for ${ytDetails.size}/${refs.length} videos.\n`);

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let mismatchedChannels = 0;

  for (const ref of refs) {
    const yt = ytDetails.get(ref.youtubeId);
    if (!yt) {
      console.log(`  ? ${ref.youtubeId} (${ref.firstSeenOn}) — not found on YouTube (private/deleted?), skipping`);
      skipped++;
      continue;
    }
    const row = {
      site_id: UKHRA_SITE_ID,
      title: ref.title || yt.title,
      description: ref.caption || yt.description || null,
      youtube_video_id: ref.youtubeId,
      youtube_channel_id: yt.channelId,
      privacy_status: yt.privacyStatus,
      thumbnail_url: yt.thumbnailUrl,
      duration_seconds: yt.durationSeconds,
      status: "ready",
    };
    const { action, error } = await upsertVideo(row);
    if (error) {
      console.log(`  ✗ ${ref.youtubeId}: ${error.message}`);
      continue;
    }
    const mismatchNote = ownedChannelId && yt.channelId !== ownedChannelId ? " [on a different channel]" : "";
    if (ownedChannelId && yt.channelId !== ownedChannelId) mismatchedChannels++;
    console.log(`  ${action === "inserted" ? "+" : "~"} ${ref.youtubeId}: ${row.title}${mismatchNote}`);
    if (action === "inserted") inserted++;
    else updated++;
  }

  console.log(`\n✓ Done. ${inserted} inserted, ${updated} updated, ${skipped} skipped.`);
  if (mismatchedChannels > 0) {
    console.log(
      `  Note: ${mismatchedChannels} video(s) live on a YouTube channel other than the one connected to Ukhra.`
    );
    console.log(`  They're still registered so editors can use them, just can't be deleted through the admin.`);
  }
}

main().catch((err) => {
  console.error("\n✗ Backfill failed:", err);
  process.exit(1);
});
