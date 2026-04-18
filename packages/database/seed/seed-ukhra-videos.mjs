#!/usr/bin/env node
/**
 * Re-adds the YouTube videos that were orphaned during the Ukhra CMS migration.
 *
 * For each target page: fetches the latest content_version, appends a video
 * section (inserted before any trailing 'cta' section), and writes a new
 * published content_version. Idempotent — if a video section already exists
 * it is skipped.
 *
 * Run from repo root:
 *   SUPABASE_SERVICE_ROLE_KEY='<key>' node packages/database/seed/seed-ukhra-videos.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://eevtuonrbvwgfpskergd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  db: { schema: "website" },
});

const V = {
  healthWorkshop: { youtubeId: "3t2I3WL8GhA", title: "Health Workshop held in Ukhra", caption: "A Health Workshop at Ukhra in partnership with Service Place" },
  namtaPath: { youtubeId: "h2R58x9VBnA", title: "Namta Path — Multiplication tables in the classroom", caption: "Students reciting multiplication tables ('namta path') in a classroom" },
  hattiMatimTim: { youtubeId: "wiw-Gdxlc30", title: "Hatti Matim Tim (Part 2)", caption: "Classroom recitation — Hatti Matim Tim (Part 2)" },
  headmasterTeaching1: { youtubeId: "dtqH_LMtxQA", title: "Headmaster teaching in a school", caption: "A headmaster teaching in a school at Ukhra" },
  headmasterTeaching2: { youtubeId: "ip6A-r5PFww", title: "Headmaster teaching in a school", caption: "Another moment of a headmaster teaching in a school at Ukhra" },
  laptopHandover: { youtubeId: "CYHUiLOi0HQ", title: "Students receive a laptop from SEVAA", caption: "A laptop handed over by SEVAA at Ukhra" },
  studentUsingLaptop: { youtubeId: "OgQvIHcXyTw", title: "Student using a laptop", caption: "A student using a laptop at Ukhra" },
  learningFromVideo: { youtubeId: "sXFCxJXGOjw", title: "Students learning from a video", caption: "Students learning from a video at Ukhra" },
  puzzleSolving: { youtubeId: "PzcAPmI3rYI", title: "Students solving puzzles", caption: "Students solving puzzles at Ukhra" },
};

const PAGE_VIDEOS = [
  {
    slug: "/programs/health-workshop",
    section: {
      id: "videos",
      type: "video",
      data: {
        eyebrow: "From the Ground",
        heading: "Watch the Workshop",
        items: [V.healthWorkshop],
      },
    },
  },
  {
    slug: "/programs/nabadisha",
    section: {
      id: "videos",
      type: "video",
      data: {
        eyebrow: "Moments from the Classroom",
        heading: "Learning in Action",
        subtitle: "Glimpses of students and teachers at Ukhra schools",
        items: [V.namtaPath, V.hattiMatimTim, V.headmasterTeaching1, V.headmasterTeaching2],
      },
    },
  },
  {
    slug: "/programs/smart-class",
    section: {
      id: "videos",
      type: "video",
      data: {
        eyebrow: "In the SMART Room",
        heading: "Digital Learning at Ukhra",
        items: [V.laptopHandover, V.studentUsingLaptop, V.learningFromVideo],
      },
    },
  },
  {
    slug: "/programs/joy-box",
    section: {
      id: "videos",
      type: "video",
      data: {
        eyebrow: "Watch the Joy Box in Action",
        heading: "Students at Play",
        items: [V.puzzleSolving],
      },
    },
  },
  {
    slug: "/gallery",
    section: {
      id: "videos",
      type: "video",
      data: {
        eyebrow: "Watch",
        heading: "Videos from Ukhra",
        subtitle: "Moments captured across our education programs",
        items: [
          V.healthWorkshop,
          V.namtaPath,
          V.hattiMatimTim,
          V.headmasterTeaching1,
          V.headmasterTeaching2,
          V.laptopHandover,
          V.studentUsingLaptop,
          V.learningFromVideo,
          V.puzzleSolving,
        ],
      },
    },
  },
];

const UKHRA_SITE_ID = "a0000000-0000-0000-0000-000000000003";

function insertBeforeCta(sections, videoSection) {
  const sanitized = sections.filter((s) => s?.id !== videoSection.id);
  const ctaIdx = sanitized.findIndex((s) => s?.type === "cta");
  if (ctaIdx === -1) return [...sanitized, videoSection];
  return [...sanitized.slice(0, ctaIdx), videoSection, ...sanitized.slice(ctaIdx)];
}

async function processPage({ slug, section }) {
  const { data: page, error: pageErr } = await supabase
    .from("pages")
    .select("id")
    .eq("site_id", UKHRA_SITE_ID)
    .eq("slug", slug)
    .single();

  if (pageErr || !page) {
    console.log(`  ? ${slug}: page not found, skipping`);
    return;
  }

  const { data: latest, error: versionErr } = await supabase
    .from("content_versions")
    .select("id, version_number, content")
    .eq("page_id", page.id)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();

  if (versionErr || !latest) {
    console.log(`  ? ${slug}: no content_version found, skipping`);
    return;
  }

  const content = latest.content ?? {};
  const sections = Array.isArray(content.sections) ? content.sections : [];

  const hasVideoSection = sections.some((s) => s?.type === "video");
  if (hasVideoSection) {
    console.log(`  - ${slug}: already has a video section, skipping`);
    return;
  }

  const updatedSections = insertBeforeCta(sections, section);
  const nextContent = { ...content, sections: updatedSections };
  const nextVersion = (latest.version_number ?? 0) + 1;

  const { error: insertErr } = await supabase.from("content_versions").insert({
    page_id: page.id,
    version_number: nextVersion,
    status: "published",
    content: nextContent,
    published_at: new Date().toISOString(),
  });

  if (insertErr) {
    throw new Error(`insert v${nextVersion} for ${slug}: ${insertErr.message}`);
  }
  console.log(`  + ${slug}: v${nextVersion} published with video (${section.data.items.length} videos)`);
}

async function main() {
  console.log("Appending video sections to Ukhra pages...\n");
  for (const page of PAGE_VIDEOS) {
    await processPage(page);
  }
  console.log("\n✓ Done. Trigger a Vercel rebuild to see the videos on the live site.");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
