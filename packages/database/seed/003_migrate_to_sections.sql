-- ============================================================
-- Migrate all content to sections[] format
-- ============================================================

-- Update Home page to sections format
UPDATE website.content_versions SET content = '{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "data": {
        "heading": "Society for Envisioning Vivekananda",
        "headingHighlight": "in Awareness and Action",
        "subtitle": "We are a non government philanthropic organisation.",
        "description": "Inspired by the ideals of Thakur-Maa-Swamiji. Our organisation SEVAA dedicates itself to work among the underprivileged section of our society in the areas of Education, Health, Livelihood, Relief, Culture and Environment.",
        "image": "/images/about/about-2.jpg",
        "primaryCta": {"label": "Explore Our Impact", "href": "#mission"},
        "secondaryCta": {"label": "Our Programs", "href": "#programs"}
      }
    },
    {
      "id": "mission",
      "type": "text-with-image",
      "data": {
        "heading": "Our Mission",
        "subtitle": "Empowering communities through service and compassion",
        "body": "We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.",
        "items": ["Equity, Diversity, and Inclusion", "Collaboration & Community Engagement", "Building self confidence within the community", "Shared Commitment", "Responsibility & Accountability", "Respect, Mutual Trust and Compassion", "Integrity in everything we do"],
        "itemsHeading": "We are committed to:",
        "image": "/images/events/1.jpg"
      }
    },
    {
      "id": "programs",
      "type": "card-grid",
      "data": {
        "heading": "Our Programs",
        "subtitle": "Serving communities across West Bengal",
        "items": [
          {"title": "Adur Pathshala", "description": "Neighborhood learning centers providing quality education in Purulia and Paschim Burdwan districts.", "image": "/images/programs/seva-activities-1.jpg", "badge": "Active"},
          {"title": "Tilka Murmu SEVAA Vano Vidyalay", "description": "Forest school initiative connecting children with nature through experiential learning.", "image": "/images/programs/saparambera-1.jpg", "badge": "Planned"},
          {"title": "Lac Cultivation", "description": "Cluster-based lac cultivation training for sustainable livelihood development.", "badge": "Active"},
          {"title": "Health Camps", "description": "Regular health checkups and awareness programs for rural communities.", "badge": "Active"}
        ]
      }
    },
    {
      "id": "stats",
      "type": "stats",
      "data": {
        "heading": "Our Impact",
        "items": [
          {"value": "1000", "label": "Beneficiaries", "suffix": "+"},
          {"value": "50", "label": "Volunteers", "suffix": "+"},
          {"value": "6", "label": "Programs"},
          {"value": "3", "label": "Districts"}
        ]
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "data": {
        "heading": "Join Us in Making a Difference",
        "description": "Support our mission to empower underprivileged communities through education, health, and sustainable livelihoods.",
        "primaryCta": {"label": "Get Involved", "href": "/get-involved"},
        "secondaryCta": {"label": "Contact Us", "href": "/contact"},
        "background": "dark"
      }
    }
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000001';

-- Update Mission & Vision
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Mission & Vision", "subtitle": "Our guiding principles and aspirations"}},
    {"id": "mission", "type": "text-with-image", "data": {
      "heading": "Our Mission",
      "body": "We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.",
      "image": "/images/events/1.jpg"
    }},
    {"id": "vision", "type": "text", "data": {
      "heading": "Our Vision",
      "body": "<p>A society where every individual has access to quality education, healthcare, and sustainable livelihood opportunities, inspired by the ideals of Swami Vivekananda.</p>"
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000010';

-- Update Our Genesis
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Our Genesis", "subtitle": "The story of how SEVAA began"}},
    {"id": "content", "type": "text", "data": {
      "body": "<p>SEVAA was born from the shared vision of a group of like-minded individuals inspired by the teachings of Thakur-Maa-Swamiji. What started as informal community service in the neighborhoods of Narendrapur has grown into a structured organization dedicated to serving the underprivileged sections of society.</p><p>The organization was formally registered and has since been working in the areas of Education, Health, Livelihood, Relief, Culture and Environment.</p>"
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000011';

-- Update Governance
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Governance", "subtitle": "Our leadership and organizational structure"}},
    {"id": "team", "type": "card-grid", "data": {
      "heading": "Executive Committee",
      "columns": 3,
      "items": [
        {"title": "Dibes BERA", "badge": "President"},
        {"title": "Dibya Gopal Ghatak", "badge": "Vice President"},
        {"title": "Samir Nayak", "badge": "Vice President"},
        {"title": "Narayan Tatachari", "badge": "Secretary"},
        {"title": "Pradip De", "badge": "Asst. Secretary"},
        {"title": "Pradip Mukherjee", "badge": "Treasurer"},
        {"title": "Gautam Banerjee", "badge": "Asst. Treasurer"}
      ]
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000012';

-- Update Contact
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Contact Us", "subtitle": "Get in touch with SEVAA"}},
    {"id": "contact", "type": "contact", "data": {
      "heading": "Reach Out",
      "email": "infosevaa@gmail.com",
      "phone": "+91 98271 93272",
      "address": "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal."
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000080';

-- Update Get Involved
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Get Involved", "subtitle": "Join us in making a difference"}},
    {"id": "intro", "type": "text", "data": {
      "body": "<p>There are many ways you can contribute to SEVAA''s mission. Whether through volunteering, donations, or partnerships, your support makes a real difference.</p>"
    }},
    {"id": "options", "type": "card-grid", "data": {
      "heading": "Ways to Support",
      "columns": 3,
      "items": [
        {"title": "Sponsor a Child", "description": "Provide scholarships to deserving students and help them achieve their educational dreams.", "link": "/get-involved/sponsor-child"},
        {"title": "Support the School", "description": "Rs 1000 per student per month to support school operations.", "link": "/get-involved/become-friend"},
        {"title": "CSR Opportunities", "description": "Corporate partnerships for social responsibility initiatives.", "link": "/get-involved/csr-opportunities"},
        {"title": "In-Kind Donations", "description": "Donate stationery, books, and school infrastructure needs.", "link": "/get-involved/become-friend"},
        {"title": "Sponsor a Meal", "description": "Sponsor a meal for our children.", "link": "/get-involved/sponsor-midday-meal"},
        {"title": "Sponsor Healthcare", "description": "Support health initiatives for villagers and students.", "link": "/get-involved/become-partner"}
      ]
    }},
    {"id": "cta", "type": "cta", "data": {
      "heading": "Ready to Make a Difference?",
      "description": "Contact us to learn more about how you can contribute.",
      "primaryCta": {"label": "Contact Us", "href": "/contact"},
      "background": "accent"
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000070';

-- Update News article (Tilka Murmu School)
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Inauguration of Tilka Murmu School", "subtitle": "March 9-10, 2025 · Education"}},
    {"id": "image", "type": "gallery", "data": {"images": [{"src": "/images/userfiles/image/Sevaa Booklet 2024_001.jpg", "alt": "Tilka Murmu School Inauguration"}]}},
    {"id": "content", "type": "text", "data": {
      "body": "<p>We are proud to announce the inauguration of Tilka Murmu SEVAA Vano Vidyalay, our forest school initiative at Saparambera, Ajodhya Hills, Purulia. The school was inaugurated by State Ministers and local officials in a grand ceremony attended by the community.</p><p>A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.</p>"
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000031';

-- Update Saparambera Project
UPDATE website.content_versions SET content = '{
  "sections": [
    {"id": "header", "type": "page-header", "data": {"title": "Saparambera Project", "subtitle": "Community development at Ajodhya Hills, Purulia"}},
    {"id": "content", "type": "text-with-image", "data": {
      "heading": "About the Project",
      "body": "The Saparambera project is SEVAA''s flagship initiative located in the Ajodhya Hills of Purulia district. The project encompasses the Tilka Murmu SEVAA Vano Vidyalay (forest school), community health programs, and sustainable livelihood initiatives for the tribal communities in the area.",
      "image": "/images/programs/saparambera-1.jpg",
      "items": ["52 families in Saparambera village", "Forest school with allied facilities", "Health and livelihood programs", "Sustainable agriculture initiatives"],
      "itemsHeading": "Key Highlights"
    }}
  ]
}'::jsonb
WHERE page_id = 'b0000000-0000-0000-0000-000000000020';
