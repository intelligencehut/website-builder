-- ============================================================
-- Seed ALL pages for SEVAA website
-- Site ID: a0000000-0000-0000-0000-000000000001
-- ============================================================

-- Clean existing data
DELETE FROM website.content_versions WHERE page_id IN (SELECT id FROM website.pages WHERE site_id = 'a0000000-0000-0000-0000-000000000001');
DELETE FROM website.pages WHERE site_id = 'a0000000-0000-0000-0000-000000000001';

-- ============================================================
-- INSERT ALL PAGES
-- ============================================================

INSERT INTO website.pages (id, site_id, slug, title, page_type, sort_order) VALUES
-- Home
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '/', 'Home', 'home', 0),

-- About section
('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', '/mission-vision', 'Mission & Vision', 'static', 10),
('b0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', '/our-genesis', 'Our Genesis', 'static', 11),
('b0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', '/governance', 'Governance', 'team', 12),
('b0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', '/president-desk', 'From President''s Desk', 'static', 13),
('b0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', '/secretary-desk', 'From Secretary''s Desk', 'static', 14),
('b0000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', '/formation-of-vivek-pally', 'Formation of Vivek Pally', 'static', 15),
('b0000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000001', '/sevaa-karmakanda', 'সেবা কর্মকাণ্ড', 'static', 16),
('b0000000-0000-0000-0000-000000000017', 'a0000000-0000-0000-0000-000000000001', '/blessing-letters', 'Blessing Letters', 'static', 17),
('b0000000-0000-0000-0000-000000000018', 'a0000000-0000-0000-0000-000000000001', '/stakeholder', 'Stakeholders', 'static', 18),
('b0000000-0000-0000-0000-000000000019', 'a0000000-0000-0000-0000-000000000001', '/associates', 'Associate Members', 'static', 19),

-- Projects
('b0000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000001', '/projects/saparambera', 'Saparambera Project', 'project', 20),
('b0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000001', '/projects/ukhra', 'Ukhra Project', 'project', 21),
('b0000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000001', '/projects/elachi', 'Elachi Project', 'project', 22),
('b0000000-0000-0000-0000-000000000023', 'a0000000-0000-0000-0000-000000000001', '/projects/health', 'Health Programs', 'project', 23),
('b0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000001', '/projects/livelihood', 'Livelihood Programs', 'project', 24),
('b0000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000001', '/support-activities', 'Support Activities', 'static', 25),

-- News
('b0000000-0000-0000-0000-000000000030', 'a0000000-0000-0000-0000-000000000001', '/news', 'News & Media', 'static', 30),
('b0000000-0000-0000-0000-000000000031', 'a0000000-0000-0000-0000-000000000001', '/news/tilka-murmu-school', 'Inauguration of Tilka Murmu School', 'news', 31),
('b0000000-0000-0000-0000-000000000032', 'a0000000-0000-0000-0000-000000000001', '/news/rakhi-celebration', 'Rakhi Celebration', 'news', 32),
('b0000000-0000-0000-0000-000000000033', 'a0000000-0000-0000-0000-000000000001', '/news/independence-day', 'Independence Day Celebration', 'news', 33),
('b0000000-0000-0000-0000-000000000034', 'a0000000-0000-0000-0000-000000000001', '/news/birthday-celebrations', 'Birthday Celebrations', 'news', 34),
('b0000000-0000-0000-0000-000000000035', 'a0000000-0000-0000-0000-000000000001', '/news/media', 'Media Coverage', 'news', 35),

-- Gallery & Archives
('b0000000-0000-0000-0000-000000000040', 'a0000000-0000-0000-0000-000000000001', '/gallery/photos', 'Photo Gallery', 'gallery', 40),
('b0000000-0000-0000-0000-000000000041', 'a0000000-0000-0000-0000-000000000001', '/gallery/videos', 'Video Gallery', 'gallery', 41),
('b0000000-0000-0000-0000-000000000042', 'a0000000-0000-0000-0000-000000000001', '/archives', 'Archives', 'static', 42),
('b0000000-0000-0000-0000-000000000043', 'a0000000-0000-0000-0000-000000000001', '/archives/photos', 'Project Photos', 'gallery', 43),
('b0000000-0000-0000-0000-000000000044', 'a0000000-0000-0000-0000-000000000001', '/archives/general', 'General Archives', 'gallery', 44),
('b0000000-0000-0000-0000-000000000045', 'a0000000-0000-0000-0000-000000000001', '/archives/videos', 'Video Archives', 'gallery', 45),

-- Publications
('b0000000-0000-0000-0000-000000000050', 'a0000000-0000-0000-0000-000000000001', '/publications', 'Publications', 'publication', 50),
('b0000000-0000-0000-0000-000000000051', 'a0000000-0000-0000-0000-000000000001', '/publications/sevaa-souvenir-2025', 'SEVAA Souvenir 2025', 'publication', 51),
('b0000000-0000-0000-0000-000000000052', 'a0000000-0000-0000-0000-000000000001', '/publications/sevaa-sammelan-2023', 'SEVAA Sammelan 2023', 'publication', 52),
('b0000000-0000-0000-0000-000000000053', 'a0000000-0000-0000-0000-000000000001', '/publications/nostalgic-narendrapur', 'Nostalgic Narendrapur', 'publication', 53),
('b0000000-0000-0000-0000-000000000054', 'a0000000-0000-0000-0000-000000000001', '/annual-reports', 'Annual Reports', 'publication', 54),

-- Events
('b0000000-0000-0000-0000-000000000060', 'a0000000-0000-0000-0000-000000000001', '/events', 'Events', 'event', 60),

-- Engagement
('b0000000-0000-0000-0000-000000000070', 'a0000000-0000-0000-0000-000000000001', '/get-involved', 'Get Involved', 'static', 70),
('b0000000-0000-0000-0000-000000000071', 'a0000000-0000-0000-0000-000000000001', '/get-involved/become-friend', 'Become a SEVAA Friend', 'static', 71),
('b0000000-0000-0000-0000-000000000072', 'a0000000-0000-0000-0000-000000000001', '/get-involved/become-assoc-member', 'Become Associate Member', 'static', 72),
('b0000000-0000-0000-0000-000000000073', 'a0000000-0000-0000-0000-000000000001', '/get-involved/become-partner', 'Become a Partner', 'static', 73),
('b0000000-0000-0000-0000-000000000074', 'a0000000-0000-0000-0000-000000000001', '/get-involved/sponsor-child', 'Sponsor a Child', 'static', 74),
('b0000000-0000-0000-0000-000000000075', 'a0000000-0000-0000-0000-000000000001', '/get-involved/sponsor-midday-meal', 'Sponsor Midday Meal', 'static', 75),
('b0000000-0000-0000-0000-000000000076', 'a0000000-0000-0000-0000-000000000001', '/get-involved/csr-opportunities', 'CSR Opportunities', 'static', 76),
('b0000000-0000-0000-0000-000000000077', 'a0000000-0000-0000-0000-000000000001', '/join-us', 'Join Us', 'static', 77),
('b0000000-0000-0000-0000-000000000078', 'a0000000-0000-0000-0000-000000000001', '/support', 'Support SEVAA', 'static', 78),

-- Contact & Legal
('b0000000-0000-0000-0000-000000000080', 'a0000000-0000-0000-0000-000000000001', '/contact', 'Contact Us', 'static', 80),
('b0000000-0000-0000-0000-000000000081', 'a0000000-0000-0000-0000-000000000001', '/privacy', 'Privacy Policy', 'static', 81),
('b0000000-0000-0000-0000-000000000082', 'a0000000-0000-0000-0000-000000000001', '/terms', 'Terms of Service', 'static', 82),
('b0000000-0000-0000-0000-000000000083', 'a0000000-0000-0000-0000-000000000001', '/legal-financial', 'Legal & Financial', 'static', 83),

-- Team
('b0000000-0000-0000-0000-000000000090', 'a0000000-0000-0000-0000-000000000001', '/team', 'Our Team', 'team', 90);


-- ============================================================
-- INSERT CONTENT VERSIONS (published) for key pages
-- ============================================================

-- Home page
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at) VALUES
('b0000000-0000-0000-0000-000000000001', 1, 'published', '{
  "heroText": {
    "heading": "Society for Envisioning Vivekananda",
    "headingHighlight": "in Awareness and Action",
    "subtitle": "We are a non government philanthropic organisation.",
    "description": "Inspired by the ideals of Thakur-Maa-Swamiji. Our organisation SEVAA dedicates itself to work among the underprivileged section of our society in the areas of Education, Health, Livelihood, Relief, Culture and Environment in the true spirit of \"Shiv Gyane Jeev Seva\" as espoused by Swamiji.",
    "primaryCtaLabel": "Explore Our Impact",
    "primaryCtaTarget": "impact",
    "secondaryCtaLabel": "Our Programs",
    "secondaryCtaTarget": "programs"
  },
  "mission": {
    "heading": "Our Mission",
    "subtitle": "Empowering communities through service and compassion",
    "description": "We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.",
    "commitments": ["Equity, Diversity, and Inclusion", "Collaboration & Community Engagement", "Building self confidence within the community", "Shared Commitment", "Responsibility & Accountability", "Respect, Mutual Trust and Compassion", "Integrity in everything we do"],
    "image": "/images/events/1.jpg"
  },
  "hero": {
    "slides": [
      {"src": "/images/about/about-2.jpg", "alt": "SEVAA Mission", "title": "Inspired by Thakur-Maa-Swamiji", "description": "Working among the underprivileged section of society"},
      {"src": "/images/gallery/gallery-1.jpg", "alt": "Education", "title": "Education & Awareness", "description": "Quality education to the underprivileged"},
      {"src": "/images/gallery/gallery-2.jpg", "alt": "Service", "title": "Community Service", "description": "Serving humanity with compassion and care"}
    ]
  },
  "programs": {"items": [
    {"id": "adur-pathshala", "title": "Adur Pathshala", "description": "Neighborhood learning centers providing quality education in Purulia and Paschim Burdwan districts.", "image": "/images/programs/seva-activities-1.jpg", "location": "West Bengal", "status": "Active", "category": "Education"},
    {"id": "vano-vidyalay", "title": "Tilka Murmu SEVAA Vano Vidyalay", "description": "Forest school initiative connecting children with nature through experiential learning.", "image": "/images/programs/saparambera-1.jpg", "location": "Saparambera, Ajodhya Hills", "status": "Planned", "category": "Education", "beneficiaries": 52}
  ]},
  "impact": {"items": []},
  "stats": {"items": []},
  "testimonials": {"items": []},
  "team": {"members": []},
  "blessingLetters": {"items": []},
  "gallery": {"images": []},
  "news": {"items": []},
  "events": {"upcoming": [], "activities": []},
  "joinUs": {"donationOptions": []},
  "resources": {"items": []}
}'::jsonb, now()),

-- Mission & Vision
('b0000000-0000-0000-0000-000000000010', 1, 'published', '{"header": {"title": "Mission & Vision", "subtitle": "Our guiding principles and aspirations"}, "body": "<h3>Our Mission</h3><p>We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.</p><h3>Our Vision</h3><p>A society where every individual has access to quality education, healthcare, and sustainable livelihood opportunities, inspired by the ideals of Swami Vivekananda.</p>"}'::jsonb, now()),

-- Our Genesis
('b0000000-0000-0000-0000-000000000011', 1, 'published', '{"header": {"title": "Our Genesis", "subtitle": "The story of how SEVAA began"}, "body": "<p>SEVAA was born from the shared vision of a group of like-minded individuals inspired by the teachings of Thakur-Maa-Swamiji. What started as informal community service in the neighborhoods of Narendrapur has grown into a structured organization dedicated to serving the underprivileged sections of society.</p><p>The organization was formally registered and has since been working in the areas of Education, Health, Livelihood, Relief, Culture and Environment.</p>"}'::jsonb, now()),

-- Governance
('b0000000-0000-0000-0000-000000000012', 1, 'published', '{"header": {"title": "Governance", "subtitle": "Our leadership and organizational structure"}, "body": "<h3>Executive Committee</h3><ul><li>Dibes BERA - President</li><li>Dibya Gopal Ghatak - Vice President</li><li>Samir Nayak - Vice President</li><li>Narayan Tatachari - Secretary</li><li>Pradip De - Assistant Secretary</li><li>Pradip Mukherjee - Treasurer</li><li>Gautam Banerjee - Assistant Treasurer</li></ul>"}'::jsonb, now()),

-- President''s Desk
('b0000000-0000-0000-0000-000000000013', 1, 'published', '{"header": {"title": "From President''s Desk", "subtitle": "A message from our President"}, "body": "<p>Dear friends and well-wishers, it gives me immense pleasure to share the journey of SEVAA with you. Our organization continues to grow and serve the community with dedication and compassion.</p>"}'::jsonb, now()),

-- Secretary''s Desk
('b0000000-0000-0000-0000-000000000014', 1, 'published', '{"header": {"title": "From Secretary''s Desk", "subtitle": "A message from our Secretary"}, "body": "<p>SEVAA has been steadily expanding its activities and impact across the communities we serve. Our dedicated team of volunteers continues to make a difference in the lives of those who need it most.</p>"}'::jsonb, now()),

-- News articles
('b0000000-0000-0000-0000-000000000031', 1, 'published', '{"title": "Inauguration of Tilka Murmu SEVAA Vano Vidyalay", "excerpt": "A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.", "content": "<p>We are proud to announce the inauguration of Tilka Murmu SEVAA Vano Vidyalay, our forest school initiative at Saparambera, Ajodhya Hills, Purulia. The school was inaugurated by State Ministers and local officials in a grand ceremony attended by the community.</p>", "image": "/images/userfiles/image/Sevaa Booklet 2024_001.jpg", "date": "March 9-10, 2025", "category": "Education", "tags": ["Forest School", "Education", "Community Development"]}'::jsonb, now()),

('b0000000-0000-0000-0000-000000000032', 1, 'published', '{"title": "Rakhi Celebration", "excerpt": "Celebration of Rakhi festival with the school children.", "content": "<p>SEVAA organized a beautiful Rakhi celebration with the children of our schools, fostering bonds of love and brotherhood.</p>", "image": "/images/events/2.jpg", "date": "August 2025", "category": "Cultural Event", "tags": ["Rakhi", "Cultural", "Celebration"]}'::jsonb, now()),

('b0000000-0000-0000-0000-000000000033', 1, 'published', '{"title": "Independence Day Celebration", "excerpt": "Independence Day celebrated with great enthusiasm at TMSVV School.", "content": "<p>Independence Day was celebrated with great enthusiasm at the Tilka Murmu SEVAA Vano Vidyalay with flag hoisting, student performances, and community participation.</p>", "image": "/images/events/3.jpg", "date": "August 15, 2025", "category": "Cultural Event", "tags": ["Independence Day", "Cultural"]}'::jsonb, now()),

-- Projects
('b0000000-0000-0000-0000-000000000020', 1, 'published', '{"header": {"title": "Saparambera Project", "subtitle": "Community development at Ajodhya Hills, Purulia"}, "body": "<p>The Saparambera project is SEVAA''s flagship initiative located in the Ajodhya Hills of Purulia district. The project encompasses the Tilka Murmu SEVAA Vano Vidyalay (forest school), community health programs, and sustainable livelihood initiatives for the tribal communities in the area.</p><p>With 52 families in the Saparambera village, our goal is to provide comprehensive support covering education, healthcare, and economic empowerment.</p>"}'::jsonb, now()),

-- Contact
('b0000000-0000-0000-0000-000000000080', 1, 'published', '{"header": {"title": "Contact Us", "subtitle": "Get in touch with SEVAA"}, "body": "<h3>Email</h3><p>infosevaa@gmail.com<br>sevaa.narendrapur@gmail.com</p><h3>Phone</h3><p>+91 98271 93272<br>+91 33 2477 2545</p><h3>Address</h3><p>131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal.</p>"}'::jsonb, now()),

-- Get Involved
('b0000000-0000-0000-0000-000000000070', 1, 'published', '{"header": {"title": "Get Involved", "subtitle": "Join us in making a difference"}, "body": "<p>There are many ways you can contribute to SEVAA''s mission. Whether through volunteering, donations, or partnerships, your support makes a real difference in the lives of underprivileged communities.</p><h3>Ways to Support</h3><ul><li>Sponsor a child''s education</li><li>Sponsor a midday meal</li><li>Become a SEVAA Friend</li><li>Become an Associate Member</li><li>Corporate CSR Partnership</li><li>In-kind donations</li></ul>"}'::jsonb, now()),

-- Privacy
('b0000000-0000-0000-0000-000000000081', 1, 'published', '{"header": {"title": "Privacy Policy", "subtitle": "How we handle your data"}, "body": "<p>SEVAA is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or interact with our services.</p><h3>Information We Collect</h3><p>We may collect personal information such as name, email, and phone number when you submit forms on our website.</p><h3>How We Use Information</h3><p>Your information is used solely for communication purposes related to SEVAA''s activities and is never shared with third parties.</p>"}'::jsonb, now()),

-- Terms
('b0000000-0000-0000-0000-000000000082', 1, 'published', '{"header": {"title": "Terms of Service", "subtitle": "Terms and conditions for using our website"}, "body": "<p>By using the SEVAA website, you agree to these terms of service. The content on this website is for informational purposes about SEVAA''s activities and initiatives.</p>"}'::jsonb, now());

-- ============================================================
-- Update site_config with navigation
-- ============================================================

DELETE FROM website.site_config WHERE site_id = 'a0000000-0000-0000-0000-000000000001';

INSERT INTO website.site_config (site_id, config_type, content, version_number, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'navigation', '{
  "main": [
    {"id": "home", "label": "Home", "href": "/"},
    {"id": "about-us", "label": "About Us", "href": "/mission-vision", "dropdown": [
      {"id": "mission-vision", "label": "Our Mission & Vision", "href": "/mission-vision"},
      {"id": "our-genesis", "label": "Our Genesis", "href": "/our-genesis"},
      {"id": "governance", "label": "Governance", "href": "/governance"}
    ]},
    {"id": "activities", "label": "Our Activities", "href": "/projects/saparambera", "dropdown": [
      {"id": "saparambera", "label": "Saparambera Project", "href": "/projects/saparambera"},
      {"id": "ukhra", "label": "Ukhra Project", "href": "/projects/ukhra"},
      {"id": "support", "label": "Support Activities", "href": "/support-activities"}
    ]},
    {"id": "news", "label": "News & Publications", "href": "/news", "dropdown": [
      {"id": "news-list", "label": "News", "href": "/news"},
      {"id": "gallery", "label": "Photo Gallery", "href": "/gallery/photos"},
      {"id": "events", "label": "Events", "href": "/events"},
      {"id": "publications", "label": "Publications", "href": "/publications"}
    ]},
    {"id": "archives", "label": "Archives", "href": "/archives", "dropdown": [
      {"id": "photos", "label": "Project Photos", "href": "/archives/photos"},
      {"id": "general", "label": "General Archives", "href": "/archives/general"},
      {"id": "videos", "label": "Videos", "href": "/archives/videos"}
    ]},
    {"id": "join-us", "label": "Join Us", "href": "/get-involved", "dropdown": [
      {"id": "csr", "label": "CSR Opportunities", "href": "/get-involved/csr-opportunities"},
      {"id": "member", "label": "Become Member", "href": "/get-involved/become-assoc-member"},
      {"id": "friend", "label": "Become Friend", "href": "/get-involved/become-friend"},
      {"id": "sponsor", "label": "Sponsor a Child", "href": "/get-involved/sponsor-child"}
    ]},
    {"id": "contact", "label": "Contact Us", "href": "/contact"}
  ],
  "footer": {
    "quickLinks": [
      {"label": "Privacy Policy", "href": "/privacy"},
      {"label": "Terms of Service", "href": "/terms"},
      {"label": "Annual Reports", "href": "/annual-reports"},
      {"label": "Legal & Financial", "href": "/legal-financial"}
    ],
    "socialLinks": [
      {"icon": "Facebook", "href": "https://www.facebook.com/sevaa2023", "label": "Facebook"},
      {"icon": "Twitter", "href": "https://twitter.com/sevaa2023", "label": "Twitter"},
      {"icon": "Linkedin", "href": "https://www.linkedin.com/sevaa2023", "label": "LinkedIn"},
      {"icon": "Instagram", "href": "https://www.instagram.com/sevaa2023", "label": "Instagram"}
    ]
  }
}'::jsonb, 1, 'published'),

('a0000000-0000-0000-0000-000000000001', 'seo', '{
  "title": "SEVAA - Society for Envisioning Vivekananda in Awareness and Action",
  "description": "Non-government philanthropic organisation inspired by the ideals of Swami Vivekananda, working in Education, Health, Livelihood, and Environment.",
  "keywords": "SEVAA, NGO, education, healthcare, livelihood, Purulia, West Bengal, Vivekananda"
}'::jsonb, 1, 'published'),

('a0000000-0000-0000-0000-000000000001', 'theme', '{
  "logo": "/sevaa_logo.png",
  "siteName": "SEVAA",
  "primaryColor": "#f59e0b",
  "accentColor": "#ea580c",
  "contactEmail": "infosevaa@gmail.com",
  "contactPhone": "+91 98271 93272",
  "address": "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal."
}'::jsonb, 1, 'published');
