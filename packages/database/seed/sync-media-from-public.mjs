#!/usr/bin/env node
/**
 * Uploads every image under a target site's `/public/images` directory
 * into Supabase Storage (`media` bucket) and registers a row in
 * `website.media`, so the admin Media library lists them.
 *
 * Idempotent: skips files that already have a matching `storage_path`
 * row in the DB.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<key> \
 *     node packages/database/seed/sync-media-from-public.mjs \
 *     <site_id> <path-to-site-public-dir>
 *
 * Example:
 *   node packages/database/seed/sync-media-from-public.mjs \
 *     a0000000-0000-0000-0000-000000000004 \
 *     /Users/amitdas/Workspaces/IntelligenceHut/sevaa/tmsvv/public
 */

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, extname, dirname } from "node:path";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://eevtuonrbvwgfpskergd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
  process.exit(1);
}

const [siteId, publicDir] = process.argv.slice(2);
if (!siteId || !publicDir) {
  console.error(
    "Usage: node sync-media-from-public.mjs <site_id> <public-dir>"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  db: { schema: "website" },
});

const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(p, out);
    } else if (entry.isFile()) {
      out.push(p);
    }
  }
  return out;
}

async function existingStoragePaths() {
  const { data, error } = await supabase
    .from("media")
    .select("storage_path")
    .eq("site_id", siteId);
  if (error) throw new Error(`fetch existing media: ${error.message}`);
  return new Set((data ?? []).map((r) => r.storage_path));
}

async function main() {
  const imagesRoot = join(publicDir, "images");
  try {
    await stat(imagesRoot);
  } catch {
    console.error(`No directory at ${imagesRoot}`);
    process.exit(1);
  }

  const existing = await existingStoragePaths();
  console.log(
    `Scanning ${imagesRoot} — ${existing.size} existing media rows for site\n`
  );

  const files = await walk(imagesRoot);
  const assets = files.filter((f) => MIME_BY_EXT[extname(f).toLowerCase()]);
  console.log(`Found ${assets.length} supported assets.\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const abs of assets) {
    // Keep the original /images/... layout inside the bucket so paths remain human-readable.
    const rel = relative(publicDir, abs).split("\\").join("/"); // e.g. "images/foo/bar.jpg"
    const storagePath = `${siteId}/${rel}`;
    const filename = rel.split("/").pop();
    const folder = "/" + dirname(rel); // e.g. "/images/foo"

    if (existing.has(storagePath)) {
      skipped++;
      continue;
    }

    const ext = extname(abs).toLowerCase();
    const mime = MIME_BY_EXT[ext];
    const buf = await readFile(abs);

    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(storagePath, buf, {
        contentType: mime,
        upsert: true,
      });
    if (upErr) {
      console.error(`  ! upload failed ${rel}: ${upErr.message}`);
      failed++;
      continue;
    }

    const { error: dbErr } = await supabase.from("media").insert({
      site_id: siteId,
      filename,
      original_filename: filename,
      storage_path: storagePath,
      mime_type: mime,
      size_bytes: buf.length,
      folder,
    });
    if (dbErr) {
      console.error(`  ! db insert failed ${rel}: ${dbErr.message}`);
      failed++;
      continue;
    }

    uploaded++;
    if (uploaded % 25 === 0) {
      console.log(`  … uploaded ${uploaded} so far`);
    }
  }

  console.log(
    `\n✓ done — uploaded ${uploaded}, skipped ${skipped} (already present), failed ${failed}`
  );
}

main().catch((err) => {
  console.error("✗ sync failed:", err);
  process.exit(1);
});
