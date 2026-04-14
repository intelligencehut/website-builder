-- Seed Heart N Beyond site
INSERT INTO website.sites (id, name, slug, domain, metadata)
VALUES (
  'a0000000-0000-0000-0000-000000000002',
  'Heart N Beyond',
  'heartnbeyond',
  'heartnbeyond.com',
  '{
    "platform": "heartnbeyond",
    "preview_url": "http://localhost:3000",
    "available_slots": ["specialties", "latest-posts", "doctors", "newsletter"],
    "revalidation_url": "https://heartnbeyond.com/api/revalidate"
  }'
) ON CONFLICT (id) DO NOTHING;

-- Seed pages
INSERT INTO website.pages (id, site_id, slug, title, page_type, sort_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', '/', 'Home', 'home', 0),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', '/about', 'About', 'static', 1),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', '/contact', 'Contact', 'static', 2),
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', '/disclaimer', 'Disclaimer', 'static', 3)
ON CONFLICT (id) DO NOTHING;

-- Seed home page content
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at)
VALUES (
  'c0000000-0000-0000-0000-000000000001',
  1,
  'published',
  '{
    "sections": [
      {
        "id": "hero",
        "type": "hero",
        "data": {
          "subtitle": "Trusted Medical Content",
          "heading": "Health knowledge,",
          "headingHighlight": "straight from the experts",
          "description": "Educational articles written by qualified doctors to help you understand your health better. From heart conditions to child care, get reliable information you can trust.",
          "primaryCta": { "label": "Read Articles", "href": "/blog" },
          "secondaryCta": { "label": "Meet Our Doctors", "href": "/about" }
        }
      },
      {
        "id": "specialties",
        "type": "dynamic-slot",
        "data": { "slot": "specialties", "label": "Medical Specialties" }
      },
      {
        "id": "latest-posts",
        "type": "dynamic-slot",
        "data": { "slot": "latest-posts", "label": "Recent Articles", "config": "{\"limit\": 3}" }
      },
      {
        "id": "doctors",
        "type": "dynamic-slot",
        "data": { "slot": "doctors", "label": "Meet the Doctors" }
      },
      {
        "id": "newsletter",
        "type": "dynamic-slot",
        "data": { "slot": "newsletter", "label": "Newsletter Signup" }
      },
      {
        "id": "cta",
        "type": "cta",
        "data": {
          "heading": "Your health journey starts with knowledge",
          "description": "Browse our growing collection of medical articles written by qualified doctors. Whether you are looking for information about heart health, women''s wellness, or child care, we have got you covered.",
          "primaryCta": { "label": "Start Reading", "href": "/blog" }
        }
      }
    ]
  }',
  NOW()
);

-- Seed about page content
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at)
VALUES (
  'c0000000-0000-0000-0000-000000000002',
  1,
  'published',
  '{
    "sections": [
      {
        "id": "header",
        "type": "page-header",
        "data": {
          "title": "About Heart N Beyond",
          "subtitle": "Bridging the gap between medical expertise and everyday health understanding"
        }
      },
      {
        "id": "mission",
        "type": "text",
        "data": {
          "heading": "Our Mission",
          "body": "<p>Heart N Beyond was founded with a simple yet powerful mission: to make reliable medical information accessible to everyone. We believe that understanding your health should not require a medical degree.</p><p>Our team of qualified doctors writes every article with care, ensuring accuracy while keeping the language simple and easy to understand.</p>"
        }
      },
      {
        "id": "vision",
        "type": "text",
        "data": {
          "heading": "Our Vision",
          "body": "<p>We envision a world where every individual has access to trustworthy health information that empowers them to make informed decisions about their well-being. Through our platform, we aim to bridge the gap between medical professionals and the community.</p>"
        }
      },
      {
        "id": "doctors",
        "type": "dynamic-slot",
        "data": { "slot": "doctors", "label": "Our Doctors" }
      }
    ]
  }',
  NOW()
);

-- Seed contact page content
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at)
VALUES (
  'c0000000-0000-0000-0000-000000000003',
  1,
  'published',
  '{
    "sections": [
      {
        "id": "header",
        "type": "page-header",
        "data": {
          "title": "Contact Us",
          "subtitle": "We would love to hear from you"
        }
      },
      {
        "id": "contact-info",
        "type": "contact",
        "data": {
          "heading": "Get in Touch",
          "email": "contact@heartnbeyond.com",
          "phone": "+91 98765 43210",
          "address": "Heart N Beyond Medical Centre\n123 Health Avenue, Sector 15\nMumbai, Maharashtra 400001",
          "body": "<p><strong>Visiting Hours:</strong></p><ul><li>Monday - Friday: 9:00 AM - 6:00 PM</li><li>Saturday: 9:00 AM - 1:00 PM</li><li>Sunday: Closed</li></ul>"
        }
      }
    ]
  }',
  NOW()
);

-- Seed disclaimer page content
INSERT INTO website.content_versions (page_id, version_number, status, content, published_at)
VALUES (
  'c0000000-0000-0000-0000-000000000004',
  1,
  'published',
  '{
    "sections": [
      {
        "id": "header",
        "type": "page-header",
        "data": {
          "title": "Medical Disclaimer",
          "subtitle": "Important information about the content on this website"
        }
      },
      {
        "id": "disclaimer-content",
        "type": "html",
        "data": {
          "body": "<h3>General Information</h3><p>The content on Heart N Beyond is provided for general informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.</p><h3>Not Medical Advice</h3><p>While our articles are written by qualified medical professionals, the information presented should not be used as a basis for making diagnostic or treatment decisions. Every individual''s health situation is unique.</p><h3>No Doctor-Patient Relationship</h3><p>Reading our articles or interacting with our website does not establish a doctor-patient relationship between you and any of our contributing doctors.</p><h3>Emergency Situations</h3><p>If you are experiencing a medical emergency, please call your local emergency number immediately or visit the nearest emergency room. Do not rely on information from this website in emergency situations.</p><h3>Accuracy of Information</h3><p>We strive to keep our content accurate and up-to-date. However, medical knowledge evolves rapidly, and we cannot guarantee that all information reflects the very latest research or guidelines.</p><h3>External Links</h3><p>Our website may contain links to external websites. We are not responsible for the content or privacy practices of those sites.</p><h3>Use at Your Own Risk</h3><p>By using this website, you acknowledge that you have read and understood this disclaimer, and you agree that your use of the information provided is at your own risk.</p>"
        }
      }
    ]
  }',
  NOW()
);
