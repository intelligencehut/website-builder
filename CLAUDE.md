# CLAUDE.md

## Project Overview

Multi-tenant website builder. A single admin panel (`apps/admin`) manages content for multiple websites. Each target website is a separate Next.js app that fetches section-based content from a shared Supabase database at build time (SSG) or runtime (ISR).

**Admin panel:** https://websites.intelligencehut.com/  
**Supabase project:** `eevtuonrbvwgfpskergd.supabase.co` (schema: `website`)

## Architecture

```
website-builder/          (this repo — Turborepo monorepo)
├── apps/admin/           Next.js admin panel (port 3001)
├── apps/web/             SEVAA static site generator (port 3000)
├── packages/database/    SQL migrations, seeds, supabase-js client
├── packages/content-schema/  Zod schemas + types
└── packages/ui/          Shared components
```

Target websites live in **separate repos** and connect to the CMS via env vars.

## Current Sites

| Site | ID | Domain | Repo | Mode |
|------|----|--------|------|------|
| SEVAA | `a0000000-...-000000000001` | sevaa.org | apps/web (this repo) | SSG |
| Heart N Beyond | `a0000000-...-000000000002` | heartnbeyond.com | sevaaweb/heartnbeyond | ISR + dynamic-slots |
| SEVAA Ukhra | `a0000000-...-000000000003` | ukhra.sevaa.net | sevaaweb/ukhra | SSG |

## Dev Commands

```bash
# Admin panel (port 3001)
cd apps/admin && npm run dev

# Target sites (run in their own repos)
cd /path/to/heartnbeyond && npm run dev   # port 3000
cd /path/to/ukhra && npm run dev          # port 3002
```

## Registering a New Website

Follow these steps to add a new site to the website builder.

### Step 1: Database — Register the site

Create a seed file at `packages/database/seed/NNN_seed_<slug>.sql` and a runner script `seed-<slug>.mjs`. See `005_seed_ukhra.sql` and `seed-ukhra.mjs` as templates.

Required inserts:
1. **`website.sites`** — new row with:
   - `id`: UUID (use pattern `a0000000-0000-0000-0000-00000000000N`)
   - `slug`, `name`, `domain`
   - `metadata` JSONB with: `preview_url`, `revalidation_url` (ISR only), `platform`, `description`, `seo`, `contact`, `deploy.prod_hook_url`, `deploy.stage_hook_url`, `available_slots` (for dynamic-slot sites)
2. **`website.site_members`** — grant access to users (lookup by email from `website.users`)
3. **`website.pages`** — one row per page with `slug`, `title`, `page_type`, `sort_order`
4. **`website.content_versions`** — seed initial content (sections JSON) for each page, status `published`

Run the seed:
```bash
cd apps/admin
SUPABASE_SERVICE_ROLE_KEY='<key>' node ../../packages/database/seed/seed-<slug>.mjs
```

### Step 2: Target website — Add CMS integration

Copy these files from the Ukhra site as templates:

| File | Purpose |
|------|---------|
| `src/lib/cms.ts` | Fetches sections from Supabase REST API |
| `src/components/HybridRenderer.tsx` | Maps section types to React components |
| `src/components/EditableSection.tsx` | Edit-mode overlay for visual editor |
| `src/components/HideInEditMode.tsx` | Hides header/footer in visual editor iframe |
| `src/components/sections/` | Section components matching the site's design |

**For SSG sites** (like Ukhra):
- `cms.ts`: use `cache: 'force-cache'` (build-time only)
- No `export const revalidate` on pages
- No `/api/revalidate` route needed
- Content updates require a Vercel rebuild via deploy hook

**For ISR sites** (like Heart N Beyond):
- `cms.ts`: use `next: { revalidate: 60 }` (or desired interval)
- Add `export const revalidate = 60` to each page
- Add `src/app/api/revalidate/route.ts` for on-demand revalidation
- Set `metadata.revalidation_url` in the site's DB record

**For dynamic-slot sites** (like Heart N Beyond):
- Register slot components in HybridRenderer's `SLOT_REGISTRY`
- Set `metadata.available_slots` in the site's DB record
- The admin's dynamic-slot editor will show these slots

### Step 3: Page files

Replace each `page.tsx` with the CMS pattern:
```tsx
import { getCmsPageSections } from '@/lib/cms'
import { HybridRenderer } from '@/components/HybridRenderer'

export default async function MyPage() {
  const sections = await getCmsPageSections('/my-slug')
  if (!sections) return <EmptyState />
  return <HybridRenderer sections={sections} />
}
```

### Step 4: Layout — Edit mode support

Wrap Header and Footer in `<HideInEditMode>` so the visual editor iframe doesn't have sticky elements blocking section clicks.

### Step 5: Environment variables

Set these on the target site (`.env.local` for dev, Vercel env vars for prod):
```
CMS_SUPABASE_URL=https://eevtuonrbvwgfpskergd.supabase.co
CMS_SUPABASE_SERVICE_ROLE_KEY=<service role key>
CMS_SITE_ID=<site UUID from step 1>
```

For ISR sites, optionally:
```
REVALIDATION_SECRET=<shared secret>
```

### Step 6: Vercel deploy hook

1. Vercel project → Settings → Git → Deploy Hooks → create hook on `main` branch
2. Copy the hook URL
3. Update the site's `metadata.deploy.prod_hook_url` in Supabase (via admin Settings → Deploy tab, or directly in DB)

### Step 7: Supabase auth (if the admin is freshly deployed)

Add `https://<admin-domain>/auth/callback` to Supabase → Authentication → URL Configuration → Redirect URLs.

### Step 8: Admin editors (if using new section types)

If the new site introduces section types not already in the admin:
1. Add editor components in `apps/admin/src/components/editors/section-editors.tsx`
2. Register them in the `SectionDataEditor` switch
3. Add them to `apps/admin/src/components/editors/add-section-dialog.tsx`

### Step 9: Draft preview in visual editor (SSG sites)

Static sites don't re-render on save, so the admin pushes the editor's working sections into the iframe via `postMessage`. No API route, secret, or env var needed — the handshake is entirely in-memory and gated on `?_edit=1`.

In the target site's `HybridRenderer.tsx`, add a draft-overlay hook and use it to replace the `sections` prop:

```tsx
'use client';
import { useEffect, useState } from 'react';

function useDraftSections<T>(initial: T[]): T[] {
  const [sections, setSections] = useState<T[]>(initial);
  useEffect(() => {
    const isEdit = new URLSearchParams(window.location.search).get('_edit') === '1';
    if (!isEdit) return;
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'draft-content' && Array.isArray(e.data.sections)) {
        setSections(e.data.sections as T[]);
      }
    }
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'editor-ready' }, '*');
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  return sections;
}

export function HybridRenderer({ sections: initialSections }: { sections: Section[] }) {
  const sections = useDraftSections(initialSections);
  // ... existing render logic, using `sections`
}
```

Real visitors never have `?_edit=1` → the effect short-circuits → zero runtime cost, SSG output untouched. Editors see every keystroke reflected in the iframe; Save persists as `draft`; Publish is the only path that rebuilds the static site.

## Available Section Types

Shared (all sites): `hero`, `page-header`, `text`, `text-with-image`, `card-grid`, `gallery`, `testimonials`, `stats`, `cta`, `contact`, `html`, `dynamic-slot`

Ukhra-specific: `cards-grid` (icon+stat), `programs-grid`, `partners`, `feature-highlight`, `bank-details`, `list`

## Access Control

- **Super admins** (`website.users.is_super_admin = true`) see all sites
- **Regular users** see only sites they're members of (`website.site_members`)
- Roles: `owner`, `editor`, `viewer`
- Auth: Google OAuth via Supabase, redirect to `/login` if unauthenticated
