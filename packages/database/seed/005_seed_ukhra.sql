-- ============================================================
-- Seed SEVAA Ukhra site
-- Adds Ukhra as a third tenant in website-builder
-- ============================================================

INSERT INTO website.sites (id, name, slug, domain, metadata)
VALUES (
  'a0000000-0000-0000-0000-000000000003',
  'SEVAA Ukhra',
  'ukhra',
  'ukhra.sevaa.net',
  '{
    "platform": "ukhra",
    "description": "SEVAA Ukhra Nabadisha — education & community development in Ukhra village",
    "preview_url": "https://ukhra.sevaa.net",
    "stage_domain": "",
    "available_slots": [],
    "revalidation_url": "https://ukhra.sevaa.net/api/revalidate",
    "seo": {
      "title": "SEVAA Ukhra — Education & Community Development",
      "description": "SEVAA Ukhra Nabadisha is a comprehensive educational initiative reaching 900 children across schools in Ukhra, Paschim Bardhaman.",
      "keywords": "SEVAA Ukhra, Ukhra Nabadisha, rural education, West Bengal",
      "og_image": ""
    },
    "contact": {
      "email": "infosevaa@gmail.com",
      "phone": "+91 98271 93272",
      "address": "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal",
      "email_secondary": "",
      "phone_secondary": ""
    },
    "deploy": {
      "prod_hook_url": "",
      "stage_hook_url": ""
    }
  }'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  domain = EXCLUDED.domain,
  metadata = EXCLUDED.metadata;

-- ============================================================
-- Grant sevaa.web@gmail.com owner access to Ukhra site
-- ============================================================

INSERT INTO website.site_members (site_id, user_id, role)
SELECT
  'a0000000-0000-0000-0000-000000000003',
  id,
  'owner'
FROM website.users
WHERE email = 'sevaa.web@gmail.com'
ON CONFLICT (site_id, user_id) DO UPDATE SET role = EXCLUDED.role;

-- ============================================================
-- Seed pages
-- ============================================================

INSERT INTO website.pages (id, site_id, slug, title, page_type, sort_order) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', '/', 'Home', 'home', 0),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', '/about', 'About', 'static', 1),
  ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', '/programs/nabadisha', 'Ukhra Nabadisha', 'project', 2),
  ('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', '/programs/smart-class', 'SMART Class', 'project', 3),
  ('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', '/programs/joy-box', 'Joy Box Programme', 'project', 4),
  ('d0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000003', '/programs/health-workshop', 'Health Workshop', 'project', 5),
  ('d0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000003', '/programs/environment', 'Environmental Work', 'project', 6),
  ('d0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', '/donate', 'Donate', 'static', 7),
  ('d0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000003', '/contact', 'Contact', 'static', 8),
  ('d0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000003', '/gallery', 'Gallery', 'gallery', 9),
  ('d0000000-0000-0000-0000-00000000000b', 'a0000000-0000-0000-0000-000000000003', '/news', 'News & Events', 'news', 10),
  ('d0000000-0000-0000-0000-00000000000c', 'a0000000-0000-0000-0000-000000000003', '/support', 'Support Us', 'static', 11),
  ('d0000000-0000-0000-0000-00000000000d', 'a0000000-0000-0000-0000-000000000003', '/privacy', 'Privacy Policy', 'static', 12),
  ('d0000000-0000-0000-0000-00000000000e', 'a0000000-0000-0000-0000-000000000003', '/terms', 'Terms of Use', 'static', 13)
ON CONFLICT (id) DO NOTHING;

-- Content versions are seeded via the seed-ukhra.mjs Node script,
-- which can express the large JSONB payloads more cleanly than inline SQL.
