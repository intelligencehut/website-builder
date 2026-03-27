-- Seed SEVAA site
INSERT INTO website.sites (id, name, slug, domain, metadata)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'SEVAA',
  'sevaa',
  'sevaa.org',
  '{"description": "Society for Envisioning Vivekananda in Awareness and Action"}'
);

-- Seed pages
INSERT INTO website.pages (id, site_id, slug, title, page_type, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '/', 'Home', 'home', 0),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', '/our-genesis', 'Our Genesis', 'static', 1),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', '/mission-vision', 'Mission & Vision', 'static', 2),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', '/governance', 'Governance', 'team', 3),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', '/news/tilka-murmu-school', 'Tilka Murmu School Inauguration', 'news', 10),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', '/news/sevaa-booklet-2024', 'SEVAA Booklet 2024', 'news', 11),
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', '/projects/saparambera', 'Saparambera Project', 'project', 20),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', '/projects/elachi', 'Elachi Project', 'project', 21),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', '/events', 'Events', 'event', 30),
  ('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', '/gallery/photos', 'Photo Gallery', 'gallery', 40),
  ('b0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', '/publications', 'Publications', 'publication', 50),
  ('b0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', '/contact', 'Contact', 'static', 60),
  ('b0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', '/get-involved', 'Get Involved', 'static', 70);

-- Seed initial published content version for the home page
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  1,
  'published',
  '{
    "_type": "home",
    "hero": {
      "slides": [
        {"src": "/images/about/about-2.jpg", "alt": "SEVAA Mission and Values", "title": "Inspired by Thakur-Maa-Swamiji", "description": "Working among the underprivileged section of society"},
        {"src": "/images/gallery/gallery-1.jpg", "alt": "Education & Awareness", "title": "Education & Awareness", "description": "Quality education to the underprivileged"},
        {"src": "/images/gallery/gallery-2.jpg", "alt": "Community Service", "title": "Community Service", "description": "Serving humanity with compassion and care"}
      ]
    },
    "programs": {
      "items": [
        {"id": "adur-pathshala", "title": "Adur Pathshala", "description": "Neighborhood learning centers providing quality education.", "image": "/images/programs/seva-activities-1.jpg", "location": "West Bengal", "status": "Active", "category": "Education"},
        {"id": "vano-vidyalay", "title": "Tilka Murmu SEVAA Vano Vidyalay", "description": "Forest school initiative.", "image": "/images/programs/saparambera-1.jpg", "location": "Saparambera", "status": "Planned", "category": "Education", "beneficiaries": 52}
      ]
    }
  }'::jsonb,
  now()
);

-- Seed navigation config
INSERT INTO website.site_config (site_id, config_type, content, version_number, status)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'navigation',
  '{
    "main": [
      {"id": "home", "label": "Home", "href": "/"},
      {"id": "about-us", "label": "About Us", "href": "/mission-vision", "dropdown": [
        {"id": "mission-vision", "label": "Our Mission & Vision", "href": "/mission-vision"},
        {"id": "our-genesis", "label": "Our Genesis", "href": "/our-genesis"},
        {"id": "governance", "label": "Governance", "href": "/governance"}
      ]},
      {"id": "news", "label": "News & Publications", "href": "/news"},
      {"id": "join-us", "label": "Join Us", "href": "/get-involved"},
      {"id": "contact", "label": "Contact Us", "href": "/contact"}
    ],
    "footer": {
      "quickLinks": [
        {"label": "Privacy Policy", "href": "/privacy"},
        {"label": "Terms of Service", "href": "/terms"},
        {"label": "Annual Reports", "href": "/annual-reports"}
      ],
      "socialLinks": [
        {"icon": "Facebook", "href": "https://www.facebook.com/sevaa2023", "label": "Facebook"},
        {"icon": "Twitter", "href": "https://twitter.com/sevaa2023", "label": "Twitter"},
        {"icon": "Instagram", "href": "https://www.instagram.com/sevaa2023", "label": "Instagram"}
      ]
    }
  }'::jsonb,
  1,
  'published'
);
