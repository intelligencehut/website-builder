#!/usr/bin/env node
/**
 * Seeds the SEVAA main website (sevaa.net) into the website-builder.
 *
 *  - Inserts site row (with Vercel deploy hook URL placeholder)
 *  - Grants sevaa.web@gmail.com owner role
 *  - Inserts 49 pages
 *  - Seeds initial published content_versions extracted verbatim from the
 *    site's previous hardcoded pages.
 *
 * Run from repo root:
 *   SUPABASE_SERVICE_ROLE_KEY='<key>' node packages/database/seed/seed-sevaa-website.mjs
 *
 * To re-publish all pages with the current seed content as a new version
 * (e.g. after fixing image paths), set FORCE_RESEED=1:
 *   FORCE_RESEED=1 SUPABASE_SERVICE_ROLE_KEY='<key>' node packages/database/seed/seed-sevaa-website.mjs
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

const SEVAA_SITE_ID = "a0000000-0000-0000-0000-000000000005";

const PAGES = [
  { id: "f0000000-0000-0000-0000-000000000001", slug: "/", title: "Home", page_type: "home", sort_order: 0 },
  { id: "f0000000-0000-0000-0000-000000000002", slug: "/mission-vision", title: "Mission & Vision", page_type: "static", sort_order: 1 },
  { id: "f0000000-0000-0000-0000-000000000003", slug: "/governance", title: "Governance", page_type: "team", sort_order: 2 },
  { id: "f0000000-0000-0000-0000-000000000004", slug: "/team", title: "Team SEVAA", page_type: "team", sort_order: 3 },
  { id: "f0000000-0000-0000-0000-000000000005", slug: "/our-genesis", title: "Our Genesis", page_type: "static", sort_order: 4 },
  { id: "f0000000-0000-0000-0000-000000000006", slug: "/president-desk", title: "President's Desk", page_type: "static", sort_order: 5 },
  { id: "f0000000-0000-0000-0000-000000000007", slug: "/secretary-desk", title: "Secretary's Desk", page_type: "static", sort_order: 6 },
  { id: "f0000000-0000-0000-0000-000000000008", slug: "/blessing-letters", title: "Blessing Letters", page_type: "gallery", sort_order: 7 },
  { id: "f0000000-0000-0000-0000-000000000009", slug: "/formation-of-vivek-pally", title: "Formation of Vivek Pally", page_type: "static", sort_order: 8 },
  { id: "f0000000-0000-0000-0000-00000000000a", slug: "/sevaa-karmakanda", title: "সেবা কর্মকাণ্ড", page_type: "static", sort_order: 9 },
  { id: "f0000000-0000-0000-0000-00000000000b", slug: "/legal-financial", title: "Legal & Financial Information", page_type: "static", sort_order: 10 },
  { id: "f0000000-0000-0000-0000-00000000000c", slug: "/stakeholder", title: "Stakeholder", page_type: "static", sort_order: 11 },
  { id: "f0000000-0000-0000-0000-00000000000d", slug: "/contact", title: "Contact Us", page_type: "static", sort_order: 12 },
  { id: "f0000000-0000-0000-0000-00000000000e", slug: "/news", title: "News & Media", page_type: "news", sort_order: 13 },
  { id: "f0000000-0000-0000-0000-00000000000f", slug: "/news/birthday-celebrations", title: "Birthday Celebrations", page_type: "news", sort_order: 14 },
  { id: "f0000000-0000-0000-0000-000000000010", slug: "/news/independence-day", title: "Independence Day Celebration", page_type: "news", sort_order: 15 },
  { id: "f0000000-0000-0000-0000-000000000011", slug: "/news/media", title: "Media Coverage", page_type: "news", sort_order: 16 },
  { id: "f0000000-0000-0000-0000-000000000012", slug: "/news/rakhi-celebration", title: "Rakhi Celebration", page_type: "news", sort_order: 17 },
  { id: "f0000000-0000-0000-0000-000000000013", slug: "/news/tilka-murmu-school", title: "Inauguration of TMSVV", page_type: "news", sort_order: 18 },
  { id: "f0000000-0000-0000-0000-000000000014", slug: "/events", title: "Events", page_type: "static", sort_order: 19 },
  { id: "f0000000-0000-0000-0000-000000000015", slug: "/gallery/photos", title: "Photo Gallery", page_type: "gallery", sort_order: 20 },
  { id: "f0000000-0000-0000-0000-000000000016", slug: "/gallery/videos", title: "Video Gallery", page_type: "gallery", sort_order: 21 },
  { id: "f0000000-0000-0000-0000-000000000017", slug: "/publications", title: "Publications & Campaigns", page_type: "publication", sort_order: 22 },
  { id: "f0000000-0000-0000-0000-000000000018", slug: "/publications/nostalgic-narendrapur", title: "Nostalgic Narendrapur", page_type: "publication", sort_order: 23 },
  { id: "f0000000-0000-0000-0000-000000000019", slug: "/publications/sevaa-sammelan-2023", title: "Sevaa Sammelan 2023", page_type: "publication", sort_order: 24 },
  { id: "f0000000-0000-0000-0000-00000000001a", slug: "/publications/sevaa-souvenir-2025", title: "Sevaa Souvenir 2025", page_type: "publication", sort_order: 25 },
  { id: "f0000000-0000-0000-0000-00000000001b", slug: "/associates", title: "Associates", page_type: "static", sort_order: 26 },
  { id: "f0000000-0000-0000-0000-00000000001c", slug: "/annual-reports", title: "Annual Reports", page_type: "static", sort_order: 27 },
  { id: "f0000000-0000-0000-0000-00000000001d", slug: "/archives", title: "Archives", page_type: "static", sort_order: 28 },
  { id: "f0000000-0000-0000-0000-00000000001e", slug: "/archives/general", title: "General Archives", page_type: "static", sort_order: 29 },
  { id: "f0000000-0000-0000-0000-00000000001f", slug: "/archives/photos", title: "Project-wise Photos", page_type: "gallery", sort_order: 30 },
  { id: "f0000000-0000-0000-0000-000000000020", slug: "/archives/videos", title: "Archive Videos", page_type: "gallery", sort_order: 31 },
  { id: "f0000000-0000-0000-0000-000000000021", slug: "/projects/elachi", title: "Elachi Project", page_type: "project", sort_order: 32 },
  { id: "f0000000-0000-0000-0000-000000000022", slug: "/projects/health", title: "Health Projects", page_type: "project", sort_order: 33 },
  { id: "f0000000-0000-0000-0000-000000000023", slug: "/projects/livelihood", title: "Livelihood Projects", page_type: "project", sort_order: 34 },
  { id: "f0000000-0000-0000-0000-000000000024", slug: "/projects/saparambera", title: "Saparambera - Birbaba", page_type: "project", sort_order: 35 },
  { id: "f0000000-0000-0000-0000-000000000025", slug: "/projects/ukhra", title: "Ukhra Project", page_type: "project", sort_order: 36 },
  { id: "f0000000-0000-0000-0000-000000000026", slug: "/get-involved", title: "Get Involved", page_type: "static", sort_order: 37 },
  { id: "f0000000-0000-0000-0000-000000000027", slug: "/get-involved/become-assoc-member", title: "Become a Sevaa Associate Member", page_type: "static", sort_order: 38 },
  { id: "f0000000-0000-0000-0000-000000000028", slug: "/get-involved/become-friend", title: "Become a Sevaa Friend", page_type: "static", sort_order: 39 },
  { id: "f0000000-0000-0000-0000-000000000029", slug: "/get-involved/become-partner", title: "Become a Sevaa Partner", page_type: "static", sort_order: 40 },
  { id: "f0000000-0000-0000-0000-00000000002a", slug: "/get-involved/csr-opportunities", title: "CSR Opportunities", page_type: "static", sort_order: 41 },
  { id: "f0000000-0000-0000-0000-00000000002b", slug: "/get-involved/sponsor-child", title: "Sponsor a Child", page_type: "static", sort_order: 42 },
  { id: "f0000000-0000-0000-0000-00000000002c", slug: "/get-involved/sponsor-midday-meal", title: "Sponsor Midday Meal", page_type: "static", sort_order: 43 },
  { id: "f0000000-0000-0000-0000-00000000002d", slug: "/join-us", title: "Join Us", page_type: "static", sort_order: 44 },
  { id: "f0000000-0000-0000-0000-00000000002e", slug: "/support", title: "Support", page_type: "static", sort_order: 45 },
  { id: "f0000000-0000-0000-0000-00000000002f", slug: "/support-activities", title: "We Support Activities", page_type: "static", sort_order: 46 },
  { id: "f0000000-0000-0000-0000-000000000030", slug: "/privacy", title: "Privacy Policy", page_type: "static", sort_order: 47 },
  { id: "f0000000-0000-0000-0000-000000000031", slug: "/terms", title: "Terms of Service", page_type: "static", sort_order: 48 },
  { id: "f0000000-0000-0000-0000-000000000032", slug: "/news/sevaa-booklet-2024", title: "SEVAA Annual Booklet 2024 Released", page_type: "news", sort_order: 49 },
  { id: "f0000000-0000-0000-0000-000000000033", slug: "/news/lac-training-program", title: "LAC Training Program Successfully Completed", page_type: "news", sort_order: 50 },
  { id: "f0000000-0000-0000-0000-000000000034", slug: "/news/media-coverage-telegraph", title: "SEVAA Featured in The Telegraph", page_type: "news", sort_order: 51 },
];

// ============================================================
// Coming-soon helper
// ============================================================

function comingSoon({ icon = "Clock", title, subtitle, expected, heroImage, exploreLinks }) {
  const sections = [
    {
      id: "header",
      type: "page-header",
      data: { icon, title, subtitle },
    },
  ];

  if (heroImage) {
    sections.push({
      id: "hero-image",
      type: "text-with-image",
      data: {
        heading: title,
        subtitle: subtitle,
        body: `<p>This section is coming soon${expected ? `, expected <strong>${expected}</strong>` : ""}. Check back later for updates.</p><p>In the meantime, feel free to explore the rest of our site or get in touch using the links below.</p>`,
        image: { src: heroImage, alt: title },
      },
    });
  } else {
    sections.push({
      id: "body",
      type: "text",
      data: {
        heading: "Coming Soon",
        body: `<p>This section is coming soon${expected ? `, expected <strong>${expected}</strong>` : ""}. Check back later for updates.</p><p>In the meantime, feel free to explore the rest of our site or get in touch using the links below.</p>`,
      },
    });
  }

  if (exploreLinks && exploreLinks.length > 0) {
    sections.push({
      id: "explore",
      type: "card-grid",
      data: {
        heading: "Meanwhile, Explore",
        subtitle: "Discover other ways to connect with and support SEVAA",
        columns: exploreLinks.length >= 4 ? 4 : 3,
        items: exploreLinks.map((l) => ({
          title: l.title,
          description: l.description,
          link: l.href,
          ctaLabel: "Explore",
        })),
      },
    });
  }

  sections.push({
    id: "cta",
    type: "cta",
    data: {
      heading: "Stay Connected",
      description: "Want to be notified when this content is live?",
      background: "terracotta",
      primaryCta: { label: "Get Updates", href: "/contact" },
      secondaryCta: { label: "Back to Home", href: "/" },
    },
  });

  return { sections };
}

// ============================================================
// News article helper
// ============================================================

function articleSections({ title, excerpt, content, images = [], date, category, readTime, author, pdfLink }) {
  const highlights = [
    category && { icon: "Tag", text: category },
    date && { icon: "Calendar", text: date },
    readTime && { icon: "Clock", text: readTime },
    author && { icon: "User", text: author },
  ].filter(Boolean);

  const sections = [
    {
      id: "header",
      type: "page-header",
      data: {
        title,
        subtitle: excerpt,
        ...(highlights.length > 0 ? { highlights } : {}),
      },
    },
    {
      id: "content",
      type: "text",
      data: { body: content },
    },
  ];

  if (images.length > 0) {
    sections.push({
      id: "gallery",
      type: "gallery",
      data: {
        images: images.map((src) => ({ src, alt: title })),
      },
    });
  }

  if (pdfLink) {
    sections.push({
      id: "pdf-cta",
      type: "cta",
      data: {
        heading: "Download Full Document",
        background: "terracotta",
        primaryCta: { label: "Download PDF", href: pdfLink, icon: "ExternalLink" },
      },
    });
  }

  sections.push({
    id: "stay-connected",
    type: "cta",
    data: {
      heading: "Stay Connected",
      background: "terracotta",
      primaryCta: { label: "← Back to News", href: "/news" },
      secondaryCta: { label: "Share Article", href: "#share" },
    },
  });

  return { sections };
}

// ============================================================
// Section content (verbatim from sevaa.net)
// ============================================================

// ---- Shared governance data (referenced by home + governance) ----
const EXEC_COMMITTEE_ITEMS = [
  { icon: "Crown", title: "Dibes BERA", description: "President" },
  { icon: "Crown", title: "Dibya Gopal Ghatak", description: "Vice President" },
  { icon: "Crown", title: "Samir Nayak", description: "Vice President" },
  { icon: "Crown", title: "Narayan Tatachari", description: "Secretary" },
  { icon: "Crown", title: "Pradip De", description: "Assistant Secretary" },
  { icon: "Crown", title: "Pradip Mukherjee", description: "Treasurer" },
  { icon: "Crown", title: "Gautam Banerjee", description: "Assistant Treasurer" },
  { icon: "Users", title: "Asoke Punjabi", description: "Executive Member" },
  { icon: "Users", title: "Bikas Baran Ghosh", description: "Executive Member" },
  { icon: "Users", title: "Sajal Das", description: "Executive Member" },
  { icon: "Users", title: "Krishnendu Das", description: "Executive Member" },
];

const GENERAL_MEMBERS_ITEMS = [
  { icon: "Users", title: "Asit Baran Giri", description: "General Member" },
  { icon: "Users", title: "Bikash Ghosh", description: "General Member" },
  { icon: "Users", title: "Buddhadeb Midya", description: "General Member" },
  { icon: "Users", title: "Debashis Bose", description: "General Member" },
  { icon: "Users", title: "Debashis Chakraborty", description: "General Member" },
  { icon: "Users", title: "Dilip Kar", description: "General Member" },
  { icon: "Users", title: "Jyotirmoy Guha", description: "General Member" },
  { icon: "Users", title: "Pralay Chakraborty", description: "General Member" },
  { icon: "Users", title: "Pranab Mukherjee", description: "General Member" },
  { icon: "Users", title: "Somnath Roy", description: "General Member" },
  { icon: "Users", title: "Subrata Dhar", description: "General Member" },
  { icon: "Users", title: "Sushil Mondal", description: "General Member" },
  { icon: "Users", title: "Swaraj Bose", description: "General Member" },
  { icon: "Users", title: "Tapas Samanta", description: "General Member" },
];

// ---- Home (/) ----
const HOME_SECTIONS = {
  sections: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Society for Envisioning Vivekananda",
        headingHighlight: "in Awareness and Action",
        subtitle: "We're a non government philanthropic organisation.",
        description:
          "Inspired by the ideals of Thakur-Maa-Swamiji. Our organisation SEVAA dedicates itself to work among the underprivileged section of our society in the areas of Education, Health, Livelihood, Relief, Culture and Environment in the true spirit of \"Shiv Gyane Jeev Seva\" as espoused by Swamiji.",
        primaryCta: { label: "Explore Our Impact", href: "#impact" },
        secondaryCta: { label: "Our Programs", href: "#programs" },
        images: [
          { src: "/images/about/about-2.jpg", alt: "SEVAA Mission and Values" },
          { src: "/images/gallery/gallery-1.jpg", alt: "SEVAA Gallery Image 1" },
          { src: "/images/gallery/gallery-2.jpg", alt: "SEVAA Gallery Image 2" },
          { src: "/images/events/2.jpg", alt: "SEVAA Events Image 2" },
          { src: "/images/events/3.jpg", alt: "SEVAA Events Image 3" },
        ],
      },
    },
    {
      id: "mission",
      type: "text-with-image",
      data: {
        heading: "Our Mission",
        subtitle: "Empowering communities through service and compassion",
        body: "<p>We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.</p><h4>We are committed to:</h4><ul><li>Equity, Diversity, and Inclusion</li><li>Collaboration & Community Engagement</li><li>Building self confidence within the community</li><li>Shared Commitment</li><li>Responsibility & Accountability</li><li>Respect, Mutual Trust and Compassion</li><li>Integrity in everything we do</li></ul>",
        image: { src: "/images/events/1.jpg", alt: "SEVAA Mission and Values" },
      },
    },
    {
      id: "impact-areas",
      type: "card-grid",
      data: {
        heading: "Our Impact",
        subtitle: "Measuring success through lives transformed, communities empowered, and sustainable change created across West Bengal",
        columns: 4,
        items: [
          {
            icon: "Users",
            title: "Community Development",
            description: "Empowering communities through sustainable development initiatives",
          },
          {
            icon: "BookOpen",
            title: "Education & Awareness",
            description: "Quality education through Adur Pathshala and awareness programs",
          },
          {
            icon: "Heart",
            title: "Healthcare Services",
            description: "Health awareness camps and medical support initiatives",
          },
          {
            icon: "TreePine",
            title: "Environmental Conservation",
            description: "Tree plantation and environmental awareness through Banomahotsab",
          },
        ],
      },
    },
    {
      id: "commitment",
      type: "card-grid",
      data: {
        heading: "Our Commitment",
        subtitle: "Dedicated to creating sustainable change in rural West Bengal",
        columns: 2,
        items: [
          {
            title: "Sustainable Development",
            description: "Creating lasting change through education, healthcare, and environmental initiatives",
          },
          {
            title: "Community Empowerment",
            description: "Working with local communities to build capacity and self-reliance",
          },
        ],
      },
    },
    {
      id: "legacy-projects",
      type: "card-grid",
      data: {
        eyebrow: "Our Programs in Action",
        heading: "Flagship Projects & Initiatives",
        subtitle: "A look at some of the core projects SEVAA has nurtured across communities",
        columns: 3,
        items: [
          { icon: "BookOpen", title: "Adur Pathshala", description: "Primary education for tribal children in Saparambera, combining traditional knowledge and modern pedagogy.", link: "/projects/saparambera", ctaLabel: "Learn more" },
          { icon: "School", title: "Tilka Murmu SEVAA Vano Vidyalay", description: "Our flagship forest school at Saparambera — eco-friendly infrastructure, solar energy, nature-integrated learning.", link: "/news/tilka-murmu-school", ctaLabel: "Read the story" },
          { icon: "Leaf", title: "Lac Cultivation Project", description: "Training tribal families in lac cultivation to create sustainable income, conducted thrice at Saparambera.", link: "/projects/livelihood", ctaLabel: "Explore livelihood" },
          { icon: "Sprout", title: "Organic Kitchen Gardens", description: "Promoting organic farming practices with Kalyan Krishi Vigyan Kendra to boost household nutrition.", link: "/projects/livelihood", ctaLabel: "See programs" },
          { icon: "Stethoscope", title: "Health Awareness Camps", description: "Ayurvedic and allopathic medical camps in tribal villages with specialist doctors from Kolkata.", link: "/projects/health", ctaLabel: "Health projects" },
          { icon: "TreePine", title: "Banomahotsab", description: "Annual tree-plantation festival and environmental awareness programme across villages.", link: "/formation-of-vivek-pally", ctaLabel: "About Vivekpally" },
        ],
      },
    },
    {
      id: "programs-cta",
      type: "cta",
      data: {
        heading: "Want to Support These Programs?",
        description: "Download our programme brochure or reach out to the SEVAA team directly.",
        background: "warm",
        primaryCta: { label: "Download Program Brochure", href: "/documents/Tilka Murmu Forest School.pdf", icon: "ExternalLink" },
        secondaryCta: { label: "Contact Our Team", href: "/contact" },
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "What people say About Sevaa",
        subtitle: "Testimonials",
        background: "cream",
        items: [
          {
            quote:
              "I have been introduced with SEVAA through Pratham Housing Complex where a good number of SEVAA friends stay. I have been associated for last few years and see that the wheel turners who are running SEVAA are genuinely performing activities in the society, particularly for tribals and downtrodden people.",
            author: "Himadri Saha",
            role: "Engineer",
          },
          {
            quote:
              "Wherever SEVAA works, a magical result is seen. It is due to the blessings of Thakur-Maa-Swamiji. SEVAA could converge education with health, health with agriculture, agriculture with environment and finally it promotes well being of the suffering people. This inspired my organisation, Medical Rehabilitation Trust to make a permanent tie with SEVAA. I hope a rapid success of this organisation in future.",
            author: "Dr M M Ghatak",
            role: "MD, Physician, eminent social worker and Chairman of Medical Rehabilitation Trust (MRT), Kolkata",
          },
        ],
      },
    },
    {
      id: "team",
      type: "card-grid",
      data: {
        heading: "Our Leadership",
        subtitle: "Meet the executive committee guiding SEVAA's mission",
        columns: 4,
        items: [
          { icon: "Crown", title: "Dibes BERA", description: "President" },
          { icon: "Crown", title: "Dibya Gopal Ghatak", description: "Vice President" },
          { icon: "Crown", title: "Samir Nayak", description: "Vice President" },
          { icon: "Crown", title: "Narayan Tatachari", description: "Secretary" },
          { icon: "Crown", title: "Pradip De", description: "Assistant Secretary" },
          { icon: "Crown", title: "Pradip Mukherjee", description: "Treasurer" },
          { icon: "Crown", title: "Gautam Banerjee", description: "Assistant Treasurer" },
          { icon: "Users", title: "Asoke Punjabi", description: "Executive Member" },
        ],
      },
    },
    {
      id: "general-members",
      type: "card-grid",
      data: {
        heading: "General Members",
        subtitle: "14 dedicated general members who support SEVAA's mission",
        columns: 4,
        items: GENERAL_MEMBERS_ITEMS,
      },
    },
    {
      id: "blessing-letters",
      type: "gallery",
      data: {
        eyebrow: "Blessings",
        heading: "Blessing Letters",
        subtitle: "Words of encouragement and blessings from spiritual leaders",
        images: [
          { src: "/images/blessing-letter-shivapradananda.jpg", alt: "Blessing letter from Swami Shivapradananda", caption: "Blessing from Swami Shivapradananda" },
          { src: "/images/blessing-letter-suparnanadiji.jpg", alt: "Blessing letter from Swami Suparnanadiji", caption: "Blessing from Swami Suparnanadiji" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        eyebrow: "From the Ground",
        heading: "Media Gallery",
        subtitle: "Moments from our community development programs across India",
        images: [
          { src: "/images/gallery/1.jpg", alt: "Community agriculture discussion", caption: "Community Agriculture Discussion" },
          { src: "/images/gallery/2.jpg", alt: "Agricultural training session", caption: "Agricultural Training Session" },
          { src: "/images/gallery/3.jpg", alt: "Community engagement", caption: "Community Engagement" },
          { src: "/images/events/1.jpg", alt: "SEVAA events", caption: "SEVAA Events" },
        ],
      },
    },
    {
      id: "news",
      type: "card-grid",
      data: {
        heading: "Recent News",
        subtitle: "Stay updated with our latest activities and announcements",
        columns: 3,
        items: [
          {
            title: "Inauguration of Tilka Murmu SEVAA Vano Vidyalay",
            description:
              "A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.",
            image: "/images/userfiles/image/Sevaa Booklet 2024_001.jpg",
            link: "/news/tilka-murmu-school",
            badge: "Education",
          },
          {
            title: "SEVAA Annual Booklet 2024 Released",
            description:
              "Our comprehensive annual booklet showcasing all activities, achievements, and impact of SEVAA throughout 2024.",
            image: "/images/userfiles/image/Sevaa Booklet 2024_002.jpg",
            link: "/news",
            badge: "Publication",
          },
          {
            title: "LAC Training Program Successfully Completed",
            description:
              "Successful completion of Local Area Coordinator training program for community development and capacity building.",
            image: "/images/news_image/org/lac training program-1721231943.jpg",
            link: "/news",
            badge: "Training",
          },
          {
            title: "SEVAA Featured in The Telegraph",
            description:
              "Our organization and impactful work has been featured in The Telegraph newspaper.",
            image: "/images/userfiles/image/the telegraph_001.jpg",
            link: "/news/media",
            badge: "Media Coverage",
          },
        ],
      },
    },
    {
      id: "upcoming-events",
      type: "card-grid",
      data: {
        heading: "Join to our upcoming events and get involved",
        subtitle: "Upcoming Events",
        columns: 4,
        items: [
          {
            title: "Lac Cultivation Training Program",
            description: "Cluster-based lac cultivation training for sustainable livelihood development in Purulia district.",
            image: "/images/events/1.jpg",
            badge: "Livelihood",
            link: "/projects/livelihood",
          },
          {
            title: "Adur Pathshala - Learning Centers",
            description: "Neighbourhood learning centres providing quality education in rural areas of Purulia and Paschim Burdwan.",
            image: "/images/events/2.jpg",
            badge: "Education",
            link: "/projects/saparambera",
          },
          {
            title: "Organic & Kitchen Garden Project",
            description: "Promoting organic farming and kitchen gardens for food security and sustainable agriculture.",
            image: "/images/events/3.jpg",
            badge: "Agriculture",
            link: "/projects/livelihood",
          },
          {
            title: "Health Awareness & Medical Camp",
            description: "Regular health checkups and awareness programs for rural communities in Purulia district.",
            image: "/images/events/2.jpg",
            badge: "Healthcare",
            link: "/projects/health",
          },
        ],
      },
    },
    {
      id: "upcoming-activities",
      type: "list",
      data: {
        heading: "Activities in Progress",
        subtitle: "Ongoing activities led by SEVAA across communities",
        items: [
          "School building under Construction",
          "Health and Well-being Camps",
          "Cluster based Lac cultivation",
          "Organic food production",
          "Audio visual Program at community centres",
        ],
      },
    },
    {
      id: "join-us",
      type: "cta",
      data: {
        heading: "Join Us in Our Mission",
        description:
          "Whether you want to volunteer, donate, sponsor a child, or become a partner — every contribution matters. Help us enable more communities to thrive.",
        background: "dark",
        primaryCta: { label: "Make a Donation", href: "/legal-financial", icon: "Heart" },
        secondaryCta: { label: "Get Involved", href: "/get-involved" },
      },
    },
    {
      id: "resources",
      type: "card-grid",
      data: {
        heading: "Resources & Downloads",
        subtitle: "Access our annual reports, program documentation, and other important resources to learn more about our work and impact.",
        columns: 4,
        items: [
          {
            icon: "FileText",
            title: "Tilka Murmu SEVAA Vano Vidyalay",
            description: "Inauguration details and facilities information for Tilka Murmu Forest School at Saparambera, Ajodhya Hills, Purulia.",
            badge: "March 2025 · 2.1 MB",
            link: "/documents/Tilka Murmu Forest School.pdf",
            ctaLabel: "Download",
          },
          {
            icon: "BookOpen",
            title: "Annual Report 2024",
            description: "Comprehensive overview of our activities, impact, and financial statements for the year 2024.",
            badge: "Coming Soon",
            ctaLabel: "Coming Soon",
          },
          {
            icon: "BookOpen",
            title: "Audited Financial Reports",
            description: "Year-wise audited financial reports showing transparency in our fund utilization.",
            badge: "Yearly · Multiple Files · Coming Soon",
            ctaLabel: "Coming Soon",
          },
          {
            icon: "FileText",
            title: "Program Brochure",
            description: "Detailed information about all our ongoing programs and initiatives.",
            badge: "Coming Soon",
            ctaLabel: "Coming Soon",
          },
        ],
      },
    },
  ],
};

// ---- /mission-vision ----
const MISSION_VISION_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Target",
        title: "Our Mission & Vision",
        subtitle: "Guided by timeless wisdom and inspired by Swami Vivekananda's vision",
      },
    },
    {
      id: "motto",
      type: "text",
      data: {
        heading: "Motto",
        body: "<div class='bg-white border-2 border-primary/20 rounded-md p-6'><h2>आत्मानोमोक्षार्थमजगत्हितायच</h2><p>Atmano Mokshartham JagatHitaya Cha</p><p>\"For the salvation of our individual self and for the wellbeing of all on earth\" - Rig Veda</p></div>",
      },
    },
    {
      id: "vision",
      type: "text",
      data: {
        heading: "Vision of SEVAA",
        body: "<p>The motto \"Atmano Mokshartham JagatHitaya Cha\" (आत्मानोमोक्षार्थमजगत्हितायच), which means \"for the salvation of our individual self and for the wellbeing of all on earth\" (Rig-Veda), once taken by Swami Vivekananda as the motto of Ramakrishna Mission has also been adopted by SEVAA in contextual approaches.</p><p><strong>Do whatever you can for welfare of the suffering community of Bengal as well as India.</strong> And feel happiness as well as enjoy Ananda from observing those dormant possibilities being manifested gradually.</p><p>In the idea of welfare of the suffering community, Swamiji's vision of nation building is reflected. It resonates the sense of equity, peaceful co-existence, fraternity and resilience on one hand and on the other, area-specificity, integration of problems in a holistic action plan and nonstop journey to fulfillment even through failure.</p>",
      },
    },
    {
      id: "mission",
      type: "card-grid",
      data: {
        heading: "Our Mission",
        subtitle: "Transforming communities through evidence-based programs",
        columns: 3,
        items: [
          { title: "Education", description: "Quality education and learning initiatives for underprivileged children through our Adur Pathshala and forest school programs.", icon: "BookOpen" },
          { title: "Healthcare", description: "Community-based health programs, medical camps, and wellness initiatives for rural communities.", icon: "Heart" },
          { title: "Livelihood", description: "Sustainable livelihood programs including lac cultivation, organic farming, and skill development initiatives.", icon: "Users" },
          { title: "Environment", description: "Environmental conservation through tree plantation, climate change mitigation, and sustainable practices.", icon: "Globe" },
          { title: "Culture", description: "Preserving and promoting cultural heritage through publications, events, and community celebrations.", icon: "Lightbulb" },
          { title: "Relief", description: "Emergency relief and support during natural disasters, health crises, and community emergencies.", icon: "Heart" },
        ],
      },
    },
    {
      id: "objectives",
      type: "text",
      data: {
        heading: "Our Objectives",
        body: "<h3>Alumni Platform & Community Building</h3><p>To provide a common platform for the ex-students (1976-79 batch) of \"Ramakrishna Mission Residential College, Narendrapur\" for exchange of views, promote empathetic camaraderie amongst alumni members and extend a helping hand to needy and distressed alumni, teaching and non-teaching members.</p><h3>Community Development & Empowerment</h3><p>We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.</p><h3>Swami Vivekananda's Vision</h3><p>Following the path shown by Swami Vivekananda, we dedicate ourselves to work among the underprivileged section of our society in the true spirit of <strong>\"Shiv Gyane Jeev Seva\"</strong> as espoused by Swamiji.</p>",
      },
    },
    {
      id: "commitments",
      type: "card-grid",
      data: {
        heading: "We are committed to:",
        columns: 2,
        items: [
          { title: "Equity, Diversity, and Inclusion", description: "" },
          { title: "Collaboration & Community Engagement", description: "" },
          { title: "Building self confidence within the community", description: "" },
          { title: "Shared Commitment", description: "" },
          { title: "Responsibility & Accountability", description: "" },
          { title: "Respect, Mutual Trust and Compassion", description: "" },
          { title: "Integrity in everything we do", description: "" },
        ],
      },
    },
  ],
};

// ---- /governance ----
const GOVERNANCE_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Users",
        title: "Governance",
        subtitle: "Our organizational structure and the dedicated individuals who guide SEVAA's mission",
      },
    },
    {
      id: "structure",
      type: "text",
      data: {
        heading: "SEVAA Governance Structure",
        body: "<p>SEVAA operates through a comprehensive governance structure designed to ensure effective leadership, transparent decision-making, and broad community engagement. Our organization is built on the foundation of Swami Vivekananda's ideals of service and social transformation.</p>",
      },
    },
    {
      id: "executive-committee",
      type: "card-grid",
      data: {
        heading: "Executive Committee",
        subtitle: "Our leadership team responsible for day-to-day operations",
        columns: 4,
        items: EXEC_COMMITTEE_ITEMS,
      },
    },
    {
      id: "subcommittees",
      type: "card-grid",
      data: {
        heading: "Subcommittees",
        subtitle: "Specialized committees working on specific areas of our mission",
        columns: 3,
        items: [
          {
            icon: "GraduationCap",
            title: "Education Subcommittee",
            description: "Focuses on educational initiatives and literacy programs. Leader: Dibya Gopal Ghatak. Assistant Leader: Samir Nayak. Members: Ratan Ghosh Dastidar, Swapan Maity, Ahana Bera, Asit Baran Giri, Sudesna Giri, Bina Punjabi, Bisweswar Ghosh.",
          },
          {
            icon: "Heart",
            title: "We Support Sub committee",
            description: "Coordinates support activities and community assistance. Leader: Asoke Punjabi. Assistant Leader: Samir Nayak.",
          },
          {
            icon: "Briefcase",
            title: "Livelihood Sub Committee",
            description: "Develops livelihood programs and skill development initiatives. Leader: Krishnendu Das. Assistant Leader: Pradip De. Members: Siddharth Maity, Tapas Halder.",
          },
          {
            icon: "HeartHandshake",
            title: "Health Sub Committee",
            description: "Manages health programs and medical assistance initiatives. Leader: Bikas Baran Ghosh. Assistant Leader: Saikat Das. Members: Dr. Netai Dutta, Dr. M M Ghatak, Jaydev De, Debasis Chowdhury.",
          },
          {
            icon: "BookOpen",
            title: "Cultural & Publication Sub Committee",
            description: "Oversees cultural activities and publication initiatives. Leader: Gautam Banerjee. Assistant Leader: Swapan Maity. Members: Subrata Dhar, Bikas Baran Ghosh, Saikat Das.",
          },
          {
            icon: "Monitor",
            title: "Tech-Support & Website Sub Committee",
            description: "Manages technical infrastructure and website development. Leader: Sajal Das. Assistant Leader: Ratan Ghosh Dastidar. Members: Ramit Kumar Ray, Aadrita Banerjee, Amit Das, Gautam Banerjee, Samir Nayak.",
          },
        ],
      },
    },
    {
      id: "land-donors",
      type: "card-grid",
      data: {
        heading: "Land Donors",
        subtitle: "Generous individuals who donated land for SEVAA's community development projects",
        columns: 2,
        items: [
          { icon: "MapPin", title: "Ganesh Murmu", description: "S/O Lt. Dhaniram Murmu" },
          { icon: "MapPin", title: "Sudhir Murmu", description: "S/O Lt. Mansaram Murmu" },
          { icon: "MapPin", title: "Joysingh Murmu", description: "S/O Lt. Mansaram Murmu" },
          { icon: "MapPin", title: "Jamiswar Murmu", description: "S/O Lt. Rasik Murmu" },
          { icon: "MapPin", title: "Matal Murmu", description: "S/O Lt. Rasik Murmu" },
          { icon: "MapPin", title: "Buddhadeb Murmu", description: "S/O Lt. Shankar Murmu" },
        ],
      },
    },
    {
      id: "sevaa-members",
      type: "card-grid",
      data: {
        heading: "Sevaa Members",
        subtitle: "14 dedicated general members who support our mission",
        columns: 4,
        items: GENERAL_MEMBERS_ITEMS,
      },
    },
    {
      id: "sevaa-assoc-members",
      type: "card-grid",
      data: {
        heading: "Sevaa Associate Members",
        subtitle: "15 associate members actively supporting our work",
        columns: 4,
        items: [
          { icon: "UserCheck", title: "Adrija Bannerjee", description: "Associate Member" },
          { icon: "UserCheck", title: "Ahana Bera", description: "Associate Member" },
          { icon: "UserCheck", title: "Dipankar Dan", description: "Associate Member" },
          { icon: "UserCheck", title: "Krishnendu Kundu", description: "Associate Member" },
          { icon: "UserCheck", title: "Ranita Ghosh Dastidar", description: "Associate Member" },
          { icon: "UserCheck", title: "Santosh Mandal", description: "Associate Member" },
          { icon: "UserCheck", title: "Tapas Kumar Haldar", description: "Associate Member" },
          { icon: "UserCheck", title: "Tarun Ghatak", description: "Associate Member" },
          { icon: "UserCheck", title: "Dr Tapas Mondal", description: "Associate Member" },
          { icon: "UserCheck", title: "Dr Srishti Nayak", description: "Associate Member" },
          { icon: "UserCheck", title: "Dilip kr Som", description: "Associate Member" },
          { icon: "UserCheck", title: "Maloy Chakraborty", description: "Associate Member" },
          { icon: "UserCheck", title: "Shukdev Das", description: "Associate Member" },
          { icon: "UserCheck", title: "Ushakanta Kundu", description: "Associate Member" },
          { icon: "UserCheck", title: "Jitendranath Jana", description: "Associate Member" },
        ],
      },
    },
    {
      id: "sevaa-friends",
      type: "card-grid",
      data: {
        heading: "Sevaa Friends",
        subtitle: "Our network of friends supporting the cause — list coming soon",
        columns: 3,
        items: [],
      },
    },
    {
      id: "sevaa-partners",
      type: "card-grid",
      data: {
        heading: "Sevaa Partners",
        subtitle: "Partner organizations collaborating with SEVAA — list coming soon",
        columns: 3,
        items: [],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Join Our Governance",
        description: "Become part of our governance structure and contribute to meaningful social change",
        background: "terracotta",
        primaryCta: { label: "Join as Member", href: "/join-us" },
        secondaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};

// ---- /team ----
const TEAM_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Users",
        title: "Team SEVAA",
        subtitle: "Dedicated individuals working together to serve communities and implement our mission",
      },
    },
    {
      id: "moved",
      type: "text",
      data: {
        heading: "Team Information Moved",
        body: "<p>Our comprehensive team and governance information has been moved to our dedicated Governance section for better organization and accessibility.</p><p>You can now find detailed information about our Advisory Body, Executive Committee, Members, Associate Members, Friends, and Partners all in one place.</p>",
      },
    },
    {
      id: "advisory",
      type: "text",
      data: {
        heading: "উপদেষ্টা পরিষদ পুনর্গঠন চলমান",
        body: "<p>SEVAA এর উপদেষ্টা পরিষদ বর্তমানে পুনর্গঠনের প্রক্রিয়াধীন রয়েছে। আমাদের সাংগঠনিক কাঠামো আধুনিকায়ন ও নতুন চ্যালেঞ্জ মোকাবেলার জন্য একটি নতুন উপদেষ্টা পরিষদ গঠনের কাজ চলমান।</p><p>পূর্ববর্তী উপদেষ্টা পরিষদের সদস্যদের অবদানের স্বীকৃতিস্বরূপ তাদের তথ্য আমাদের <a href='/archives/general'>পূর্ববর্তী উপদেষ্টা পরিষদ</a> আর্কাইভে সংরক্ষিত রয়েছে।</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Join Our Mission",
        description: "Become part of our extended community and contribute to meaningful social change",
        background: "terracotta",
        primaryCta: { label: "Join as Volunteer", href: "/join-us" },
        secondaryCta: { label: "View Governance", href: "/governance" },
      },
    },
  ],
};

// ---- /our-genesis ----
const OUR_GENESIS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Sparkles",
        title: "Our Genesis",
        subtitle: "The inspiring story of how SEVAA came to be",
        image: "/images/assets/banner/13.jpg",
      },
    },
    {
      id: "shloka",
      type: "text",
      data: {
        heading: "SEVAA Genesis",
        body: "<p class='text-center'><strong>समानोमन्त्र: समिति: समानी<br/>समानंमन: सहचित्तमेषाम्।<br/>समानीवआकूति: समानाहृदयानिव:<br/>समानमस्तुवोमनोयथाव: सुसहासति ||</strong></p><p class='text-center'><em>samānomantraḥsamitiḥsamānī<br/>samānammanaḥsahachittameṣām |<br/>samānīvaākūti: samānāhradayāniva:।<br/>samānamastuvomanoyathāva: susahāsati॥<br/>(Rig Veda 10.191.3)</em></p><p class='text-center'><em>(May our purpose be the same, may all we be of one mind, May our intention and aspiration be alike, so that a common objective unifies us all.)</em></p>",
      },
    },
    {
      id: "story",
      type: "text",
      data: {
        heading: "",
        body: "<p>This Maitri (fraternity) tune once occasionally chanted in our RKM college days created a deep root into our consciousness and, after a prolonged silence, suddenly became a reality through the inception of the Society for Envisioning Vivekananda in Awareness and Action (SEVAA). It is only by the grace and blessings of the Holy Trio, Thakur-Maa-Swamiji, we believe that we could assemble under the great canopy of \"Service to mankind is service to God.\"</p><p>All of us can fondly remember the day in December 2019 when a few of us discovered each other in a sudden rendezvous at Belur Math while attending the 125th Anniversary Celebration of Swami Vivekananda's Address at the Parliament of World Religions Conference in Chicago. That auspicious event made the unison long lasting by forming a steady group which was subsequently snowballed into a wider virtual network of communication with our friends all over the world. This finally resulted in the formation of SEVAA which was finally registered under West Bengal Societies Registration Act, XXVI of 1961 (Registration noS0017771 of 2020-2021, dtd. March 18, 2021, with the Registrar of Firms, Societies & Non-Trading Corporations, Govt. of West Bengal) and has also been registered under sections 12A and 80G exemptions under Income Tax Act 1961 of Govt. of India.</p><p>At the initial phase before formation of the society, the focus of the members was on Swamiji's call for Nation building through self-awakening from within. Some of the great quotes of Swamiji that inspired us the most are: \"Education is the manifestation of the perfection already in man,\" \"Arise, awake, and stop not till the goal is reached,\" \"Religion is the manifestation of divinity already in man,\" \"Service to mankind is service to God,\" and unending similar messages relating to Practical Vedanta. These powerful messages helped making the backbone of SEVAA. Additionally, the group received invaluable inspiration and support from Swami Suparnananda (our beloved Satyada), Secretary of the Ramakrishna Mission Institute of Culture, Kolkata. This guidance shown by Swamiji helped us figure out the aims and objectives of the society.</p><p>In last four years, SEVAA has tried continuously to translate Swamiji's synergistic ideas and thoughts such as man-making character-building education, wellness and happiness in mental and physical health, self-generating livelihood, creative and local culture, and adherence to values, into action oriented mission. And with these goals SEVAA has been convinced to develop Vivekpally, a platform of local people to integrate different developmental factors in a wholistic way. First Vivekpally was established at Saparambera, a tribal village in Ayodhya Hills, Purulia district in West Bengal.</p>",
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        images: [
          { src: "/images/userfiles/image/Old memories Narendrapur college mates.jpg", alt: "Old memories of Narendrapur college mates", caption: "Old memories of Narendrapur college mates" },
          { src: "/images/userfiles/image/R K M College batch with Satyada.jpg", alt: "RKM College batch with Satyada", caption: "RKM College batch with our beloved Satyada" },
          { src: "/images/userfiles/image/Belur visit SEVAA Initiation.jpg", alt: "Belur Math visit during SEVAA initiation", caption: "Belur Math visit during SEVAA initiation" },
        ],
      },
    },
    {
      id: "foundation",
      type: "text",
      data: {
        heading: "The Foundation of Service",
        body: "<p>From a chance meeting at Belur Math to establishing a registered society dedicated to comprehensive rural development, SEVAA's genesis is rooted in the timeless wisdom of Swami Vivekananda and the spirit of selfless service. Our journey continues as we work towards creating sustainable change in communities across India.</p>",
      },
    },
  ],
};

// ---- /president-desk ----
const PRESIDENT_DESK_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "User",
        title: "From President's Desk",
        subtitle: "Insights and guidance from our leadership",
      },
    },
    {
      id: "message",
      type: "text-with-image",
      data: {
        heading: "From President's Desk",
        image: { src: "/images/president-image.jpg", alt: "Dibya Gopal Ghatak, President SEVAA" },
        body: "<p>Swami Vivekananda, once said: \"Perfect sincerity, holiness, gigantic intellect and all conquering will. Let only a handful of men work with these, and the whole world will be revolutionized.\" We know that the dream has always remained tantalizingly near to fulfillment not only during His lifetime but at our time also. To me, 'Sincerity' and 'Holiness' always remained as the missing threads in the whole fabrics. Rabindranath Tagore in one of his songs confessed on behalf of all mankind: আমার যা আছে আমি সকল দিতে পারিনি তোমারে, নাথ। (I could not sacrifice all that I have, to you, Oh Lord). My firm belief is that to ensure success of an organization for a longer period, three things are of utmost importance– <strong>Sacrifice, Sincerity, and Sacredness</strong>. It is the sincerity and holiness in sacrifice that makes a difference. As we traverse through the era of industrial revolution and strident march of Science and Technology, our world has no doubt sufficiently acquired 'gigantic intellect' and 'all conquering will.' But in a nascent organization like SEVAA, where our goal is to come together for a greater cause, it is our sincere duty to mingle our gigantic intellect and indomitable will with utmost holiness and sense of sacrifice.</p><p>Swamiji always considered an organization as 'means', not as an 'end'. We know how much struggle and hardship Swamiji had to go through to establish the Ramakrishna Math and Mission in 1897 and mobilize resources. It is known that often people who build institutions fall in the trap of the same institutions owning them completely. Many a time such persons lose sight of the objectives and thus get confused. They forget the greater purpose for which the organization is made. In this regard, Swamiji had different outlook. When the plague broke out in the city of Calcutta in 1998, Swamiji immediately started catering an intensive service to the panic-stricken people of the city. This required a lot of money since the situation was getting desperate. One of his brother disciples raised a question on whether the money would come from. Swamiji, a great exponent of out of box thinking replied, \"We are monks. We can sleep under the trees and live on alms. If I can save the lives of millions, I don't mind selling the Math\". To him, service for the suffering people was far higher than the mere existence of the Math.</p><p>Inspired by Swamiji's teachings, the <strong>Society for Envisioning Vivekananda in Awareness and Action (SEVAA)</strong> was created by a group of sexagenarian people. Welfare for the needy and suffering people is the only objective of SEVAA, whoever may be at the helm of this organization in future. We strongly believe that such selfless approach is essential for the growth and stability of SEVAA. In this regard, we fondly remember the inspiring lecture by Swami Suparnanandaji Maharaj (our beloved Satyada), the Secretary of the RKM Institute of Culture Golpark, Kolkata. He stressed the true meaning of 'Sevaa' as serving the mankind as God.</p><p>Swamiji in one of his talks contextually mentioned a challenge frequently faced by organisation members. <strong>\"If two Indians get together, then they will fight over three ideas that they get and fall apart in four minutes.\"</strong> While saying this, almost at the same time in a simplistic, yet profound and practical manner, Swamiji noted the need for three things to make an organization: i) absence of jealousy and suspicion, ii) conviction in the power of goodness, and iii) and helping those who really require.</p><p>To me, the above challenge and its solution clues as envisioned by Swamiji need to be remembered when we are to run SEVAA. Teamwork is truly possible only when the team members will not only have respect and love for each other but also learn to cooperate with a high level of trust, reciprocity and interdependence. This is possible only when there is absence of jealousy and suspicion. Self-doubt can sometimes be dreadful and one may be constantly challenged by a seemingly hopeless situation. The only panacea prescribed by Swamiji here is to believe that good will always triumph. This is not only a truthful reality but also a good motivator to keep the spirit alive in times of extreme crisis. The change we hope to bring about may seem small, insignificant and hopeless, but the spirit of 'doing good and helping' is very important. Swamiji had always been very practical and knew the difficulties faced by the ordinary men. Keeping all His blessings and sayings in heart, we hope SEVAA will step forward to a new possibility and definitely achieve a synergistic goal.</p><p class='bg-accent border-l-4 border-primary p-6 rounded-r-md'><strong>I hereby welcome you all to this website which will give a full picture of SEVAA and moreover help you to get all sorts of updation in details. Please visit us again and make us grateful by collaborating with us.</strong></p><p><em>— Dibya Gopal Ghatak, President, SEVAA</em></p>",
      },
    },
  ],
};

// ---- /secretary-desk ----
const SECRETARY_DESK_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "User",
        title: "From Secretary's Desk",
        subtitle: "Welcome message and insights from our Secretary",
      },
    },
    {
      id: "message",
      type: "text-with-image",
      data: {
        heading: "From Secretary's Desk",
        image: { src: "/images/secretary-image.jpg", alt: "Dr Krishnendu Das, Secretary SEVAA" },
        body: "<p>It is with great pleasure that I welcome you to the website of SEVAA (Society for Envisioning Vivekananda in Awareness and Action), a non-profit organisation dedicated to improving the lives of people in need. Our primary focus lies in three key areas: livelihood upliftment projects, primary education, and healthcare.</p><p>We believe that empowering individuals with sustainable livelihoods is crucial for breaking the cycle of poverty. Our livelihood upliftment projects in remote tribal pockets in Puruliya district of West Bengal provide training, resources, and market access to marginalized communities, enabling them to generate income and support their families.</p><p>Education is the foundation for a brighter future. We work to ensure that children from underserved communities have access to quality primary education. Our programs include building and renovating schools, providing infrastructure, educational materials, and training teachers.</p><p>Good health is essential for a fulfilling life. We offer healthcare services, including medical camps, and health education programs, to communities lacking access to basic healthcare facilities.</p><p>Our team of SEVAA members and volunteers works tirelessly to make a positive impact on the lives of those we serve. We rely on the generosity of donors and supporters like you to continue our work.</p><p>Thank you for visiting our website and learning about our mission. Together, we can create a world where everyone has the opportunity to thrive.</p><p><em>— Dr Krishnendu Das, Secretary, SEVAA</em></p>",
      },
    },
  ],
};

// ---- /blessing-letters ----
const BLESSING_LETTERS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Mail",
        title: "Blessing Letters",
        subtitle: "Words of encouragement and blessings from spiritual leaders",
      },
    },
    {
      id: "letters",
      type: "gallery",
      data: {
        heading: "Blessing Letters",
        subtitle: "Preserved letters of blessings and guidance",
        images: [
          { src: "/images/blessing-letter-shivapradananda.jpg", alt: "Blessing letter from Swami Shivapradananda", caption: "Blessing from Swami Shivapradananda" },
          { src: "/images/blessing-letter-suparnanadiji.jpg", alt: "Blessing letter from Swami Suparnanadiji", caption: "Blessing from Swami Suparnanadiji" },
        ],
      },
    },
  ],
};

// ---- /formation-of-vivek-pally ----
const FORMATION_VP_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Home",
        title: "Formation of Vivek Pally",
        subtitle: "A People's Platform for Comprehensive Rural Development",
      },
    },
    {
      id: "tmsvv",
      type: "cta",
      data: {
        heading: "Tilka Murmu SEVAA Vano Vidyalaya",
        background: "terracotta",
        primaryCta: { label: "Download Brochure", href: "/documents/Tilka Murmu Forest School.pdf", icon: "ExternalLink" },
      },
    },
    {
      id: "platform",
      type: "text",
      data: {
        heading: "Vivekpally: A People's Platform",
        body: "<p>After several months of field and project experience, SEVAA realised that instead of working with single projects, SEVAA should move with a holistic approach of development to get a better and greater impact from the field. Vivekpally is such a people's platform through which they can take decisions, plan the target, make strategies, implement jointly, review from the field and modify themselves accordingly and converge all kinds of support existing, governmental and to be received from SEVAA.</p><p>In this platform, they can identify their gaps and any support they require from outside. Thus with this goal in mind the concept of Vivekpalli took birth in early 2022. SEVAA Vivekpalli is an adopted village by SEVAA to inject all-round development in the village in-line with SEVAA working-areas of Education, Health, Livelihood, Emergency-Relief, Culture and Environment.</p>",
      },
    },
    {
      id: "beginning",
      type: "text",
      data: {
        heading: "The Beginning",
        body: "<p>SEVAA surveyed a few villages in Ajodhya Hills and the first Vivekpalli was established in April 2022 in the \"Village Saparambera\", Ajodhya, Purulia. The village had no school, electricity, proper livelihood and roads.</p><p>The villagers had no adequate money to buy quality seeds for farming. SEVAA started connecting the village with the outside world and governmental facilities, training them how to solve problems through best utilisation of existing resources.</p>",
      },
    },
    {
      id: "impact",
      type: "text",
      data: {
        heading: "The Impact",
        body: "<p>This Vivekpally was named as <strong>Birbaba Tilka Murmu Vivekpalli</strong> (an Unit of SEVAA) which has been executing activities on all 52 families of that village.</p><p>In the last 2 years SEVAA has started projects at Saparambera Vivekpalli mainly in areas of Education, Health, Livelihood, Agriculture, Environment and Culture. A great impact can be seen on the minds of the villagers.</p>",
      },
    },
    {
      id: "working-structure",
      type: "text",
      data: {
        heading: "Working Structure",
        body: "<p>An 11-member Working Committee of the villagers including 2 SEVAA representatives carry out all regular activities in the village under the guidance of SEVAA. This village has already attracted the attention of local administration, people's representatives and officers at Block and District level.</p>",
      },
    },
    {
      id: "key-areas",
      type: "card-grid",
      data: {
        heading: "Key Areas of Development",
        columns: 3,
        items: [
          { title: "Education", description: "Forest school establishment and educational support", icon: "BookOpen" },
          { title: "Health", description: "Medical camps and healthcare facilities", icon: "Heart" },
          { title: "Livelihood", description: "Sustainable income generation programs", icon: "Users" },
          { title: "Agriculture", description: "Modern farming techniques and seed support", icon: "Leaf" },
          { title: "Environment", description: "Environmental conservation and sustainability", icon: "Globe" },
          { title: "Culture", description: "Preservation of indigenous folk culture", icon: "Lightbulb" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        heading: "Life at Saparambera Vivekpally",
        images: [
          { src: "/images/projects/saparambera/saparambera1 - low resolution.jpg", alt: "Saparambera village activities", caption: "Community activities at Saparambera" },
          { src: "/images/projects/saparambera/saparambera 2 - low resolution.jpg", alt: "Educational activities at Vivekpally", caption: "Educational activities at Vivekpally" },
          { src: "/images/projects/saparambera/saparambera 3.jpg", alt: "Development work in progress", caption: "Development work in progress" },
          { src: "/images/projects/saparambera/saparambera 5.jpg", alt: "Agricultural training programs", caption: "Agricultural training programs" },
          { src: "/images/projects/saparambera/saparambera 6 -low resolution.jpg", alt: "Health and wellness activities", caption: "Health and wellness activities" },
          { src: "/images/projects/saparambera/saparabera 8 low resolution.jpg", alt: "Community meetings and planning", caption: "Community meetings and planning" },
        ],
      },
    },
    {
      id: "vision",
      type: "text",
      data: {
        heading: "Vision for the Future",
        body: "<p>The success of Birbaba Tilka Murmu Vivekpalli at Saparambera has become a model for holistic rural development. This people's platform demonstrates how communities can take ownership of their development while receiving strategic support from organizations like SEVAA.</p><p>The transformation of this remote tribal village from having no basic facilities to becoming a center of sustainable development serves as an inspiration for similar initiatives across rural India.</p>",
      },
    },
  ],
};

// ---- /sevaa-karmakanda ----
const SEVAA_KARMAKANDA_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "সেবা কর্মকাণ্ড",
        subtitle: "স্বামী বিবেকানন্দের আদর্শে পরিচালিত সেবামূলক কার্যক্রম",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "সেবা কর্মসূচি (সংক্ষেপে)",
        body: "<p>সময়টা ছিল ২০১৯ সনের ডিসেম্বর মাস। বেলুড়মঠের প্রাঙ্গনে রামকৃষ্ণ মিশন আয়োজিত প্রাক্তন ছাত্র সমাবেশে যোগ দিতে গিয়েছিল নরেন্দ্রপুর আবাসিক মহাবিদ্যালয়ের ১৯৭৬ থেকে ১৯৭৯ বর্ষের স্নাতক চার বন্ধু। সমাবেশ শেষে পড়ন্ত বিকেলে বন্ধুরা মিলে তৈরি করল এক হোয়াটসঅ্যাপ গ্রুপ- যার নাম 'নরেন্দ্রপুর রামকৃষ্ণ মিশন রেসিডেন্সিয়াল কলেজ ১৯৭৬-৭৯ ব্যাচ'।</p><p>ধীরে ধীরে নিজেদের ব্যাচেই অনেককেই এই গ্রুপের মধ্যে আনা সম্ভব হল। গ্রুপের নানান আলাপচারিতায় দেখা গেল যে প্রায় সকলেই অবসরপ্রাপ্ত আর স্বামীজীর 'শিবজ্ঞানে জীবসেবা'র আদর্শে সমাজের জন্য কিছু করতে উন্মুখ। কিন্তু কীভাবে ইচ্ছাকে বাস্তবায়িত করা যায় বিশেষত সামর্থ্য যেখানে সীমিত?</p><p>অতএব সকলে মিলে নরেন্দ্রপুর কলেজের প্রাক্তন অধ্যক্ষ ও বর্তমানে গোলপার্ক রামকৃষ্ণ মিশন ইনস্টিটিউট অব কালচারের সচিব স্বামী সুপর্ণানন্দ যিনি সকলের অতি প্রিয় সত্যদা তাঁর সঙ্গে এক গুগল মিটের মাধ্যমে মিলিত হল। সব শুনে সত্যদা অভয় দিয়ে বললেন \"যত বৃহৎ সংস্থাই হোক না কেন তার কাজও মহাকালের বিচারে এক অতি ক্ষুদ্র আঁচড়ের সমান- আর তাই নিজেদের সামর্থ্যকে সীমিত ভেবে নিরৎসাহ হয়ো না। যত ক্ষুদ্র প্রচেষ্টাই হোক না কেন, সমাজের সামগ্রিক কল্যাণে তার ভূমিকাও অনস্বীকার্য।\"</p><p>এরপর রইল না আর কোনো দ্বিধা বা সংশয়। সবার সম্মতিতে জন্ম হল 'সেবা' সংস্থার, ইংরেজিতে 'SEVAA'-- যার পূর্ণ নাম হল 'Society for Envisioning Vivekananda in Awareness & Action' অর্থাৎ এমন এক সোসাইটি বা সমিতি যা তার চেতনা ও কর্মের মর্মস্থলে স্বামীজীকে রেখে চলে।</p><p>'সেবা' তার সীমিত সামর্থ্যের মধ্যে সদস্য ও অন্যান্য শুভানুধ্যায়ীদের অনুদানকে পাথেয় করে ইতিমধ্যে কয়েকটি প্রকল্প বাস্তবায়িত করেছে ও করে চলেছে।</p>",
      },
    },
    {
      id: "fields",
      type: "text",
      data: {
        heading: "সেবার বিভিন্ন ক্ষেত্র",
        body: "<h4>শিক্ষা ক্ষেত্রে সেবা</h4><p>দরিদ্র অথচ মেধাবী ছাত্রছাত্রীদের উচ্চশিক্ষার ব্যাপারে আর্থিক সহায়তা প্রদান। 'সেবা' বর্তমানে একজন ডাক্তারী (এম বি বি এস) পাঠরত ছাত্র, একজন ইঞ্জিনিয়ারিং (আই টি) ছাত্র ও দুই জন নার্সিংয়ের ছাত্রীকে আর্থিক সহায়তা প্রদান করছে।</p><p>পুরুলিয়া জেলার অযোধ্যাপাহাড় আদিবাসীদের গ্রাম সপরমবেড়ায় উন্মুক্ত অরণ্যপ্রকৃতির মধ্যে একটি প্রাথমিক বিদ্যালয় স্থাপন করতে চলেছে যেখানে প্রথাগত শিক্ষালাভের সঙ্গে সঙ্গে আদিবাসী ছাত্রছাত্রীরা নিজেদের সংস্কৃতির সঙ্গেও নিবিড়ভাবে যুক্ত থাকবে।</p><h4>স্বাস্থ্যসেবা</h4><p>কোভিড-১৯ এর সময় 'সেবা'র পক্ষ থেকে নরেন্দ্রপুর কলেজের গৌরাঙ্গ ভবনে কোভিড রোগীদের শিবির আয়োজনের জন্য আর্থিক সহায়তা প্রদান। এ ছাড়া স্বেচ্ছাসেবী সংস্থা 'জনস্বাস্থ্য সুরক্ষা সমন্বয়'কেও আর্থিক সহায়তা প্রদান করা হয়।</p><p>স্বাস্থ্য সচেতনতা বাড়াতে 'সেবা' সপরমবেড়া গ্রামে আয়ুর্বেদিক ও অ্যালোপ্যাথিক চিকিৎসার একাধিক শিবিরের আয়োজন করেছে। শিবিরে কোলকাতা থেকে স্ত্রীরোগ বিশেষজ্ঞ সহ অন্যান্য বিশেষজ্ঞ চিকিৎসকেরা অংশগ্রহণ করেন।</p><h4>শিক্ষা প্রকল্প</h4><p>'সেবা' ২০২৩ সালের আগস্ট মাস থেকে পশ্চিম বর্ধমান জেলার উখরা গ্রামে 'নবদিশা' নামে একটি শিক্ষা প্রকল্প শুরু করেছে। অঞ্চলের পাঁচখানি প্রাথমিক ও দুইখানি মাধ্যমিক বিদ্যালয়ের প্রথম থেকে পঞ্চম শ্রেণী পর্যন্ত ছাত্রছাত্রীদের নিয়ে স্বামীজীর ভাবধারায় গুণগত মানের শিক্ষা প্রদানের মধ্য দিয়ে প্রকৃত মানুষ গড়ে তোলাই এর লক্ষ্য।</p><p>২০২০ সালে কোভিড অতিমারীর কারণে গ্রামাঞ্চলের বিদ্যালয়গুলি যখন বন্ধ ছিল তখন পশ্চিমবঙ্গের ১২টি জেলার ১৫টি বিদ্যালয়ের নবম ও দশম শ্রেণীর প্রান্তিক পরিবারের ছাত্রছাত্রীদের জন্য অনলাইনে 'সুদূর পাঠশালা'র মাধ্যমে নিয়মিত ক্লাসের আয়োজন।</p>",
      },
    },
    {
      id: "objectives",
      type: "text",
      data: {
        heading: "আমাদের লক্ষ্য ও উদ্দেশ্য",
        body: "<h4>মূল নীতি:</h4><ul><li>শিবজ্ঞানে জীবসেবা</li><li>স্বামীজীর আদর্শে চরিত্র গঠন</li><li>সমাজের সামগ্রিক কল্যাণসাধন</li><li>স্বনির্ভর জীবিকার ব্যবস্থা</li></ul><h4>কর্মপদ্ধতি:</h4><ul><li>সহযোগিতামূলক কাজের পরিবেশ</li><li>স্থানীয় সমাজের সক্রিয় অংশগ্রহণ</li><li>দীর্ঘমেয়াদি টেকসই উন্নয়ন</li><li>পরিবেশ বান্ধব উন্নয়ন কার্যক্রম</li></ul>",
      },
    },
  ],
};

// ---- /legal-financial ----
const LEGAL_FINANCIAL_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "FileText",
        title: "Legal & Financial Information",
        subtitle: "Complete registration and financial details for transparency",
      },
    },
    {
      id: "registration",
      type: "text",
      data: {
        heading: "Organization Registration",
        body: "<p>SEVAA is registered as <strong>\"SOCIETY FOR ENVISIONING VIVEKANANDA IN AWARENESS AND ACTION\"</strong>, a not-for-profit society under West Bengal Societies Registration Act, XXVI of 1961 bearing <strong>Registration No. S0017771 of 2020-2021</strong>, dated March 18, 2021, with the Registrar of Firms, Societies &amp; Non-Trading Corporations, Government of West Bengal.</p>",
      },
    },
    {
      id: "tax-exemption",
      type: "text",
      data: {
        heading: "Tax Exemption Status",
        body: "<p>All donations to SEVAA are exempted from Income Tax under <strong>Section 80G</strong> of the Income Tax Act, 1961, issued by Commissioner of Income Tax, Kolkata – XVIII, Kolkata. <strong>Unique Registration No. ABPAS1880HF20221</strong> dated 28/03/2022 under 12 Clause(iv) of first Proviso to Sub-Section(5) of section 80G.</p>",
      },
    },
    {
      id: "org-details",
      type: "card-grid",
      data: {
        heading: "Organization Details",
        columns: 2,
        items: [
          { icon: "FileText", title: "Permanent Account Number (PAN)", description: "ABPAS1880H" },
          { icon: "MapPin", title: "Registered Address", description: "SEVAA, 131/B Sri Ramakrishna Pally, Sonarpur, Kolkata 700150, West Bengal, India" },
        ],
      },
    },
    {
      id: "bank",
      type: "bank-details",
      data: {
        heading: "Bank Transfer Details",
        beneficiaryName: "SEVAA (Society for Envisioning Vivekananda in Awareness and Action)",
        bankName: "Indian Bank, Tollygunge Branch",
        accountNumber: "7103506260",
        ifscCode: "IDIB000K777",
        accountType: "Savings",
        note: "Please mention the purpose of your donation in the transaction remarks for proper allocation.",
      },
    },
    {
      id: "additional",
      type: "text",
      data: {
        heading: "Additional Information",
        body: "<h3>Transparency Commitment</h3><p>SEVAA is committed to maintaining complete transparency in all our operations. We ensure that all donations are utilized effectively for the intended charitable purposes and maintain proper financial records in accordance with applicable laws and regulations.</p><h3>Financial Queries</h3><p>For any questions regarding our financial operations, donation receipts, or legal documentation, please contact us at infosevaa@gmail.com or +91 98271 93272</p><h3>Annual Reports</h3><p>SEVAA publishes annual reports detailing our activities, financial statements, and impact metrics. These reports are available in our Annual Reports section.</p><h3>Legal Compliance</h3><p><strong>Regulatory Compliance:</strong> West Bengal Societies Registration Act, 1961 | Income Tax Act, 1961 (Section 80G) | Foreign Contribution Regulation Act (FCRA)</p><p><strong>Financial Standards:</strong> Audited Financial Statements | Proper Books of Accounts | Tax Compliance Certificate</p>",
      },
    },
    {
      id: "documents",
      type: "card-grid",
      data: {
        heading: "Download Documents",
        subtitle: "Official documents and certificates are available for download. For additional documentation, please contact our office.",
        columns: 3,
        items: [
          { icon: "FileText", title: "Registration Certificate", description: "West Bengal Societies Registration Act certificate", link: "/documents/registration-certificate.pdf", ctaLabel: "Download" },
          { icon: "FileText", title: "80G Certificate", description: "Tax exemption certificate under Section 80G", link: "/documents/80g-certificate.pdf", ctaLabel: "Download" },
          { icon: "FileText", title: "PAN Card Copy", description: "Organizational PAN card copy", link: "/documents/pan-card.pdf", ctaLabel: "Download" },
        ],
      },
    },
  ],
};

// ---- /stakeholder ----
const STAKEHOLDER_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Users",
        title: "Stakeholder",
        subtitle: "Our network of partners and collaborators supporting our mission",
      },
    },
    {
      id: "partners",
      type: "partners",
      data: {
        heading: "Our Stakeholders",
        subtitle:
          "In the last three years, a network of 'services' was formed by SEVAA with several civil societies and voluntary organizations of the country and abroad.",
        background: "cream",
        items: [
          {
            name: "Service Place",
            description:
              "Operates in America and India. Service Place has taken special steps to help 'SEVAA, Ukhra' in health matters. They are also implementing telemedicine system through 'SEVAA'.",
          },
          {
            name: "Ahead Initiative",
            description:
              "An NGO actively engaged with SEVAA in agricultural development in Saparambera and other tribal areas of Ayodhya Hills of Purulia.",
          },
          {
            name: "Kalyan Krishi Vigyan Kendra, Purulia",
            description:
              "Undertook rural development based schemes under the Ramakrishna Mission and continues to help in the adoption of organic agriculture development programs in Saparambera.",
          },
          {
            name: "Medical Rehabilitation Trust (MRT)",
            description:
              "Provides voluntary services across the state to provide relief from physical disabilities. For the past two years, health related programs have been undertaken with 'SEVAA at Saparambera, Puruliya.",
          },
          {
            name: "Antorik",
            description: "From Texas, America, a Bengali Organization providing active help in construction of school at Purulia.",
          },
          {
            name: "BCAA, Arizona, USA",
            description: "A Bengali organization actively providing monetary support to build a primary school at Saparambera.",
          },
          {
            name: "Sundarban Diganta Dishari",
            description:
              "From Sundarban, Hingalganj, North 24 Parganas, assisted 'SEVAA in various relief distribution programs undertaken during natural calamities.",
          },
        ],
      },
    },
    {
      id: "network",
      type: "text",
      data: {
        heading: "Partnership Network",
        body: "<p>Our stakeholder network spans across multiple countries and sectors, enabling us to create meaningful impact through collaborative efforts. Together, we work towards sustainable development and community empowerment across India and internationally.</p>",
      },
    },
  ],
};

// ---- /contact ----
const CONTACT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Phone",
        title: "Contact SEVAA",
        subtitle:
          "We're here to help and answer any questions you may have. Whether you want to volunteer, donate, or learn more about our work, we'd love to hear from you.",
      },
    },
    {
      id: "info",
      type: "contact",
      data: {
        heading: "Get in Touch",
        body: "<p>Have questions about our programs or want to get involved? We're always excited to connect with like-minded individuals who share our passion for positive change.</p>",
        email: "infosevaa@gmail.com",
        phone: "+91 98271 93272",
        address:
          "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal, India",
        hours:
          "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
      },
    },
    {
      id: "office-hours",
      type: "text",
      data: {
        heading: "Office Hours",
        body: "<ul><li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li><li><strong>Saturday:</strong> 9:00 AM - 1:00 PM</li><li><strong>Sunday:</strong> Closed</li></ul>",
      },
    },
    {
      id: "quick-response",
      type: "text",
      data: {
        heading: "Quick Response Guarantee",
        body: "<p>We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.</p>",
      },
    },
    {
      id: "faq",
      type: "card-grid",
      data: {
        heading: "Frequently Asked Questions",
        columns: 2,
        items: [
          {
            title: "How can I volunteer with SEVAA?",
            description:
              "We welcome volunteers from all backgrounds. You can start by filling out our volunteer form or contacting us directly to discuss available opportunities that match your skills and interests.",
          },
          {
            title: "What programs does SEVAA currently run?",
            description:
              "We focus on education, healthcare, livelihood development, and environmental conservation. Visit our programs page to learn more about our current initiatives and their impact.",
          },
          {
            title: "How are donations used?",
            description:
              "We maintain complete transparency in our financial operations. Detailed reports showing how donations are utilized are available in our annual reports section.",
          },
          {
            title: "Can I visit your office?",
            description:
              "Yes, we welcome visitors during our office hours. However, we recommend calling ahead to ensure someone is available to meet with you and answer your questions.",
          },
        ],
      },
    },
    {
      id: "send-message",
      type: "cta",
      data: {
        heading: "Ready to Reach Out?",
        description: "Have a question, want to volunteer, or explore partnerships? Send us a message and we'll get back to you within 24 hours.",
        background: "terracotta",
        primaryCta: { label: "Send Message", href: "/contact#form" },
        secondaryCta: { label: "Call Us", href: "tel:+919827193272" },
      },
    },
  ],
};

// ---- /news ----
const NEWS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Newspaper",
        title: "News & Media",
        subtitle: "Stay updated with our latest activities, announcements, and media coverage",
      },
    },
    {
      id: "recent-news",
      type: "card-grid",
      data: {
        heading: "Recent News",
        columns: 3,
        items: [
          {
            title: "Inauguration of Tilka Murmu SEVAA Vano Vidyalay",
            description:
              "A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.",
            image: "/images/userfiles/image/Sevaa Booklet 2024_001.jpg",
            link: "/documents/Tilka Murmu Forest School.pdf",
            ctaLabel: "Download PDF",
            badge: "Forest School",
          },
          {
            title: "SEVAA Annual Booklet 2024 Released",
            description:
              "Our comprehensive annual booklet showcasing all activities, achievements, and impact of SEVAA throughout 2024.",
            image: "/images/userfiles/image/Sevaa Booklet 2024_002.jpg",
            link: "/news/sevaa-booklet-2024",
            badge: "Publication",
          },
          {
            title: "LAC Training Program Successfully Completed",
            description:
              "Successful completion of Local Area Coordinator training program for community development and capacity building.",
            image: "/images/news_image/org/lac training program-1721231943.jpg",
            link: "/news/lac-training-program",
            badge: "Training",
          },
          {
            title: "SEVAA Featured in The Telegraph",
            description:
              "Our organization and impactful work has been featured in The Telegraph newspaper, highlighting our community development initiatives.",
            image: "/images/userfiles/image/the telegraph_001.jpg",
            link: "/news/media-coverage-telegraph",
            badge: "Media Coverage",
          },
        ],
      },
    },
  ],
};

// ---- /events ----
const EVENTS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Calendar",
        title: "Events",
        subtitle:
          "Stay connected with our community programs, educational activities, and cultural celebrations",
      },
    },
    {
      id: "recent-events",
      type: "card-grid",
      data: {
        heading: "Recent Events",
        columns: 3,
        items: [
          {
            title: "Inauguration of Tilka Murmu SEVAA Vana Vidyalaya",
            description:
              "State Ministers B. Roychoudhuri, Sandhyarani Tudu, and SP-Purulia inaugurated the school in a grand ceremony.",
            badge: "March 9, 2025",
            link: "/news/tilka-murmu-school",
          },
          {
            title: "Health Camp Inauguration",
            description:
              "ServicePlace USA organized Health Camp arranged by Primary Health Centre was inaugurated.",
            badge: "March 10, 2025",
          },
          {
            title: "Independence Day Celebration",
            description:
              "Independence Day celebrated with great enthusiasm at the school with students and community participation.",
            badge: "August 15, 2025",
            link: "/news/independence-day",
          },
        ],
      },
    },
    {
      id: "tmsvv-details",
      type: "text",
      data: {
        heading: "Inauguration of Tilka Murmu SEVAA Vana Vidyalaya — March 9, 2025",
        body: "<p><strong>Location:</strong> TMSVV School, Saparambera · <strong>Category:</strong> School Event</p><p>State Ministers B. Roychoudhuri, Sandhyarani Tudu, and SP-Purulia inaugurated the school in a grand ceremony.</p><h4>Event Highlights:</h4><ul><li>School building inauguration</li><li>Presence of state ministers and officials</li><li>Community celebration</li><li>Student performances</li></ul>",
      },
    },
    {
      id: "health-camp-details",
      type: "text",
      data: {
        heading: "Health Camp Inauguration — March 10, 2025",
        body: "<p><strong>Location:</strong> Primary Health Centre · <strong>Category:</strong> Health Event</p><p>ServicePlace USA organized Health Camp arranged by Primary Health Centre was inaugurated.</p><h4>Event Highlights:</h4><ul><li>Medical camp setup</li><li>Community health checkups</li><li>Health awareness programs</li><li>Collaboration with ServicePlace USA</li></ul>",
      },
    },
    {
      id: "independence-details",
      type: "text",
      data: {
        heading: "Independence Day Celebration — August 15, 2025",
        body: "<p><strong>Location:</strong> TMSVV School · <strong>Category:</strong> Cultural Event</p><p>Independence Day celebrated with great enthusiasm at the school with students and community participation.</p><h4>Event Highlights:</h4><ul><li>Flag hoisting ceremony</li><li>Student performances</li><li>Patriotic songs and speeches</li><li>Community participation</li></ul>",
      },
    },
    {
      id: "upcoming",
      type: "text",
      data: {
        heading: "More Events Coming Soon",
        body: "<p>We regularly organize community events, educational programs, and cultural celebrations throughout the year.</p><p>Stay connected with us to be informed about upcoming events and opportunities to participate in our community initiatives. Follow our news section for the latest event announcements!</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Join Our Community Events",
        description: "Be part of meaningful community development and cultural celebrations",
        background: "dark",
        primaryCta: { label: "Join Our Team", href: "/join-us" },
        secondaryCta: { label: "Get Involved", href: "/contact" },
      },
    },
  ],
};

// ---- /gallery/photos ----
const GALLERY_PHOTOS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Image",
        title: "Photo Gallery",
        subtitle: "Capturing moments from our community development initiatives",
      },
    },
    {
      id: "agriculture",
      type: "gallery",
      data: {
        heading: "Agriculture Development Meeting",
        subtitle: "Asst. District Agriculture Officer discussed with Saparambera villagers",
        images: [
          { src: "/images/gallery/1.jpg", alt: "Agriculture officer discussing with villagers - Group discussion", caption: "Community Agriculture Discussion" },
          { src: "/images/gallery/2.jpg", alt: "Agriculture officer explaining farming techniques", caption: "Agricultural Training Session" },
          { src: "/images/gallery/3.jpg", alt: "Villagers listening to agriculture guidance", caption: "Community Engagement" },
        ],
      },
    },
    {
      id: "school",
      type: "gallery",
      data: {
        heading: "School Activities",
        subtitle: "TMSVV School Events and Activities",
        images: [
          { src: "/images/events/TMSVV Students are taking Lessons in Classroom.png", alt: "TMSVV students learning in classroom", caption: "Classroom Learning" },
          { src: "/images/events/Students are playing Football at School Campus.png", alt: "Students playing football at school campus", caption: "Sports Activities" },
          { src: "/images/events/Swamijis Felicitated the TMSVV School Teachers.png", alt: "Swamijis felicitating TMSVV school teachers", caption: "Teacher Recognition" },
          { src: "/images/events/SEVAA Members and Guests concluded the School Opening ceremony.png", alt: "SEVAA members and guests at school opening ceremony conclusion", caption: "Opening Ceremony" },
          { src: "/images/events/SP-Purulia and DSP-Jhalda took lunch with School Children.png", alt: "SP-Purulia and DSP-Jhalda having lunch with school children", caption: "Community Bonding" },
        ],
      },
    },
    {
      id: "celebrations",
      type: "gallery",
      data: {
        heading: "Community Celebrations",
        subtitle: "Festivals and Cultural Events",
        images: [
          {
            src: "/images/events/ServicePlace USA organized Health Camp arranged by Primary Health Centre Inaugurated on 10th March,2025.png",
            alt: "Health camp inauguration organized by ServicePlace USA on 10th March, 2025",
            caption: "Health Camp Inauguration",
          },
        ],
      },
    },
  ],
};

// ---- /annual-reports ----
const ANNUAL_REPORTS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "FileBarChart",
        title: "Annual Reports",
        subtitle:
          "Transparency in action - Access our comprehensive annual reports showcasing our impact and activities",
      },
    },
    {
      id: "commitment",
      type: "text",
      data: {
        heading: "Our Commitment to Transparency",
        body: "<p>SEVAA believes in complete transparency and accountability. Our annual reports provide detailed insights into our activities, financial statements, impact assessments, and future plans. These reports demonstrate our commitment to responsible governance and effective utilization of resources.</p>",
      },
    },
    {
      id: "activities-overview",
      type: "text",
      data: {
        heading: "Activities Overview",
        body: "<p>Our annual reports capture the full breadth of SEVAA's work across education, healthcare, livelihood, culture, environment and emergency relief. Each report documents field activities, beneficiary numbers, financial statements, and the evolution of our programs over the year.</p>",
      },
    },
    {
      id: "activities-summary-part-1",
      type: "text",
      data: {
        heading: "Annual Activities Summary - Part 1",
        body: "<p>Overview of our key projects and initiatives throughout the year.</p><h4>Education</h4><p>Forest school operations at Saparambera, Nabadisha programme in Ukhra, scholarships for meritorious students, and classroom initiatives supporting marginalised students.</p><h4>Healthcare</h4><p>Medical camps in tribal villages, specialist camps, and individual healthcare support.</p><h4>Livelihood</h4><p>Lac cultivation training, organic farming, skill development workshops, and agricultural training sessions.</p>",
      },
    },
    {
      id: "activities-summary-part-2",
      type: "text",
      data: {
        heading: "Annual Activities Summary - Part 2",
        body: "<p>Detailed breakdown of community impact and beneficiary statistics.</p><h4>Environment &amp; Culture</h4><p>Tree plantation festivals, preservation of tribal folk culture, Sevaa Sammelan, and community celebrations anchored in local traditions.</p><h4>Emergency Relief</h4><p>Relief activities during natural calamities and COVID-19 support.</p><h4>Publications</h4><p>Nostalgic Narendrapur magazine, annual reports, campaign materials and video documentation.</p>",
      },
    },
    {
      id: "reports",
      type: "card-grid",
      data: {
        heading: "Available Reports",
        columns: 3,
        items: [
          {
            title: "SEVAA Annual Report 2024",
            description:
              "Comprehensive overview of our activities and achievements in 2024 — 42 pages, 2.1 MB",
            badge: "2024",
            link: "/documents/sevaa_annual_report_2024.pdf",
            ctaLabel: "Download PDF",
          },
          {
            title: "SEVAA Annual Report 2023",
            description: "Activities and impact report for the year 2023 — 38 pages, 1.8 MB",
            badge: "2023",
            link: "/documents/sevaa_annual_report_2023.pdf",
            ctaLabel: "Download PDF",
          },
          {
            title: "SEVAA Annual Report 2022",
            description: "Detailed report of projects and initiatives in 2022 — 40 pages, 2.0 MB",
            badge: "2022",
            link: "/documents/sevaa_annual_report_2022.pdf",
            ctaLabel: "Download PDF",
          },
        ],
      },
    },
    {
      id: "more-info",
      type: "text",
      data: {
        heading: "Need More Information?",
        body: "<p>For detailed queries about our reports or specific information, please contact us.</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Explore Further",
        description: "Review our legal and financial information or reach out directly with any questions.",
        background: "terracotta",
        primaryCta: { label: "View Legal & Financial Information", href: "/legal-financial" },
        secondaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};

// ---- /publications ----
const PUBLICATIONS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "Publications & Campaigns",
        subtitle: "Sharing knowledge, preserving memories, and spreading awareness through our publications",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Publication Department",
        body: "<p>SEVAA has a dedicated Publication Department that continuously publishes annual magazines, program-based journals, and leaflets to document our activities and share knowledge with the community.</p>",
      },
    },
    {
      id: "publications",
      type: "card-grid",
      data: {
        heading: "Our Publications",
        columns: 2,
        items: [
          {
            title: "Nostalgic Narendrapur",
            description:
              "An annual e-magazine featuring literary pieces and reports on SEVAA activities. Contains contributions from ex-students of R.K. Mission, external writers, and revered Swamijis. Published: 2 issues in the last 3 years",
            link: "/publications/nostalgic-narendrapur",
          },
          {
            title: "Annual Reports",
            description:
              "Comprehensive annual reports in journal format containing detailed documentation of all SEVAA activities, achievements, and financial information. Latest: Annual Report 2024",
            link: "/annual-reports",
          },
          {
            title: "Campaign Materials",
            description:
              "Educational leaflets and promotional materials designed to raise awareness about our programs and engage community participation.",
            link: "/contact",
          },
          {
            title: "Video Documentation",
            description:
              "Campaign videos showcasing our work and impact, including content uploaded to our YouTube channel with significant community engagement. Content: 3+ campaign videos developed",
            link: "/gallery/videos",
          },
        ],
      },
    },
    {
      id: "training",
      type: "text",
      data: {
        heading: "Training, Festival and Sammelan",
        body: "<p>Each year SEVAA holds several training programmes and Sammelan or Festival for attracting and involving outside people in SEVAA activities.</p><h3>Training Programs</h3><p><strong>Lac Cultivation Training:</strong> Conducted thrice at Saparambera, making huge impact on the local community.</p><p><strong>Teachers' Training:</strong> Held thrice at Ukhra, significantly impacting local educational practices.</p><h3>Program Evaluation Festival (January 2023)</h3><p>A program evaluation team visited Saparambera, Ajodhya Hills, which evolved into a community festival where tribal people performed their traditional rituals, songs, and dances in celebration.</p><h3>First SEVAA Sammelan (January 28, 2024)</h3><p><strong>Venue:</strong> Maa Sarada Hall, Narendrapur R.K. Mission Lokshiksha Parishad</p><p><strong>Participants:</strong> Regular members and families, Associate members, representatives from Saparambera and SEVAA Ukhra, well-wishers, and distinguished guests.</p><p><strong>Inaugurated by:</strong> Hon'ble Principal Maharaj, Swami Ekachittanandaji<br/><strong>Chief Guest:</strong> Dr. Manas Ghosh</p>",
      },
    },
    {
      id: "sammelan-sessions",
      type: "card-grid",
      data: {
        heading: "Sammelan Session Schedule",
        columns: 2,
        items: [
          {
            title: "1. About SEVAA",
            description: "Representatives introduced activities from Kolkata, Saparambera Vivekpally, SEVAA Ukhra, and Sudur Pathshala teachers. Compered by: Dr. Sajal Das and Dr. Swaraj Bose.",
          },
          {
            title: "2. Health Awareness & SEVAA",
            description: "Health-focused discussions and community wellness programs. Compered by: Samir Nayek and Dibes Bera. Participants: Dr. Punyabrata Gun, Dr. Nandini Mukherjee.",
          },
          {
            title: "3. Civil Society Organisation & SEVAA",
            description: "Representatives from 10+ CSOs discussed networking opportunities for field-level program implementation. Compered by: Dibya Gopal Ghatak and Dr. Jaydev De.",
          },
          {
            title: "4. Open Discussion",
            description: "Community dialogue and feedback session for future planning. Compered by: Ratan Ghosh Dastidar.",
          },
        ],
      },
    },
    {
      id: "sammelan-closing",
      type: "text",
      data: {
        heading: "Closing Session",
        body: "<p><strong>Presided by:</strong> Swami Basavananda<br/><strong>Chief Guest:</strong> Justice Rajarshi Bharadwaj<br/><strong>Special Guests:</strong> Dr. Nilendu Moitra and Dr. Mouli Madhab Ghatak</p><p>The event concluded with a beautiful evening cultural programme performed by SEVAA members and tribal participants from Saparambera.</p>",
      },
    },
    {
      id: "categories",
      type: "card-grid",
      data: {
        heading: "Publication Categories",
        columns: 4,
        items: [
          { icon: "BookOpen", title: "Magazines", description: "Annual literary and activity magazines including the flagship \"Nostalgic Narendrapur\".", link: "/publications/nostalgic-narendrapur" },
          { icon: "FileText", title: "Annual Reports", description: "Detailed yearly reports documenting organizational activities, achievements, and financial statements.", link: "/annual-reports" },
          { icon: "FileText", title: "Campaign Materials", description: "Educational leaflets and promotional materials for awareness campaigns and program promotion." },
          { icon: "Video", title: "Video Content", description: "Campaign videos and documentaries showcasing our impact, available on our YouTube channel.", link: "/gallery/videos" },
        ],
      },
    },
    {
      id: "stay-updated",
      type: "cta",
      data: {
        heading: "Stay Updated with Our Publications",
        description: "Subscribe to receive notifications about new publications, reports, and campaign materials.",
        background: "terracotta",
        primaryCta: { label: "Subscribe to Updates", href: "/contact" },
        secondaryCta: { label: "Latest Magazine", href: "/publications/nostalgic-narendrapur" },
      },
    },
  ],
};

// ---- /associates ----
const ASSOCIATES_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Users",
        title: "Associates",
        subtitle: "Our dedicated associate members supporting SEVAA's mission",
      },
    },
    {
      id: "moved",
      type: "text",
      data: {
        heading: "Associate Members Information Moved",
        body: "<p>Our associate members information has been moved to our comprehensive Governance section for better organization and accessibility.</p><p>You can now find detailed information about all our Associate Members along with our complete governance structure including Executive Committee, Members, Friends, and Partners.</p>",
      },
    },
    {
      id: "preview",
      type: "card-grid",
      data: {
        heading: "SEVAA Associate Members",
        subtitle: "15 dedicated associate members supporting our mission",
        columns: 4,
        items: [
          { icon: "UserPlus", title: "Adrija Bannerjee", description: "Associate Member" },
          { icon: "UserPlus", title: "Ahana Bera", description: "Associate Member" },
          { icon: "UserPlus", title: "Dipankar Dan", description: "Associate Member" },
          { icon: "UserPlus", title: "Krishnendu Kundu", description: "Associate Member" },
          { icon: "UserPlus", title: "Ranita Ghosh Dastidar", description: "Associate Member" },
          { icon: "UserPlus", title: "Santosh Mandal", description: "Associate Member" },
          { icon: "UserPlus", title: "Tapas Kumar Haldar", description: "Associate Member" },
          { icon: "UserPlus", title: "Tarun Ghatak", description: "Associate Member" },
          { icon: "UserPlus", title: "Dr Tapas Mondal", description: "Associate Member" },
          { icon: "UserPlus", title: "Dr Srishti Nayak", description: "Associate Member" },
          { icon: "UserPlus", title: "Dilip kr Som", description: "Associate Member" },
          { icon: "UserPlus", title: "Maloy Chakraborty", description: "Associate Member" },
          { icon: "UserPlus", title: "Shukdev Das", description: "Associate Member" },
          { icon: "UserPlus", title: "Ushakanta Kundu", description: "Associate Member" },
          { icon: "UserPlus", title: "Jitendranath Jana", description: "Associate Member" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "View Associate Members",
        description: "See our complete governance structure including all associate members",
        background: "terracotta",
        primaryCta: { label: "View Associate Members", href: "/governance#sevaa-assoc-members" },
        secondaryCta: { label: "View All Associate Members", href: "/governance#sevaa-assoc-members" },
      },
    },
  ],
};

// ============================================================
// Coming-soon pages
// ============================================================

const NEWS_BIRTHDAY_BASE = articleSections({
  title: "Birthday Celebrations",
  excerpt: "Celebrating special moments and strengthening community bonds",
  content: `<p>At SEVAA, we believe in celebrating life's special moments together as one big family. Our birthday celebrations and anniversary commemorations bring joy, strengthen bonds, and create lasting memories within our community.</p><p>These celebrations reflect our core values of unity, compassion, and community spirit. Every birthday and anniversary is an opportunity to express gratitude and strengthen our bonds as the SEVAA family.</p><h3>Our Celebration Categories</h3><ul><li><strong>Community Members:</strong> Celebrating birthdays of SEVAA team members and volunteers.</li><li><strong>Special Anniversaries:</strong> Marking important milestones and organizational anniversaries.</li><li><strong>Cultural Celebrations:</strong> Honoring traditional festivals and cultural occasions.</li></ul><h3>More Than Just Celebrations</h3><h4>Building Relationships</h4><p>Our celebrations foster deeper connections among team members, volunteers, and community partners.</p><h4>Creating Memories</h4><p>These special moments create lasting memories that strengthen our collective identity as the SEVAA family.</p><h4>Spreading Joy</h4><p>Every celebration brings happiness and positive energy to our community, enhancing our work environment.</p><h4>Cultural Values</h4><p>We honor cultural traditions and values through our celebration practices and customs.</p>`,
});

// Override the page-header highlights to use Calendar + MapPin (pre-CMS style)
NEWS_BIRTHDAY_BASE.sections[0].data.highlights = [
  { icon: "Calendar", text: "Year-round Celebrations" },
  { icon: "MapPin", text: "SEVAA Community Centers" },
];

const NEWS_BIRTHDAY_SECTIONS = (() => {
  const sections = [...NEWS_BIRTHDAY_BASE.sections];
  const stayIdx = sections.findIndex((s) => s.id === "stay-connected");
  const closing = {
    id: "celebration-close",
    type: "cta",
    data: {
      heading: "Join Our Celebrating Family",
      description: "Become part of our joyful community and share in our celebrations",
      background: "dark",
      primaryCta: { label: "Join Our Family", href: "/join-us" },
      secondaryCta: { label: "Meet Our Team", href: "/team" },
    },
  };
  if (stayIdx >= 0) sections.splice(stayIdx, 0, closing);
  else sections.push(closing);
  return { sections };
})();

const NEWS_INDEPENDENCE_BASE = articleSections({
  title: "Independence Day Celebration 2025",
  excerpt: "Celebrating freedom and unity at TMSVV School",
  content: `<p>Independence Day was celebrated with great enthusiasm and patriotic fervor at the Tilka Murmu SEVAA Vana Vidyalaya. The celebration brought together students, teachers, and community members in a magnificent display of national pride and unity.</p><p>The celebration exemplified the spirit of freedom and democracy, inspiring the younger generation to appreciate the sacrifices made for our independence and to contribute to nation-building.</p><h3>Celebration Highlights</h3><ul><li><strong>Flag Hoisting Ceremony:</strong> Traditional flag hoisting ceremony conducted with full honors and respect.</li><li><strong>Student Performances:</strong> Students showcased their talents through patriotic songs, dances, and speeches.</li><li><strong>Community Participation:</strong> Local community members joined the celebration, strengthening unity.</li><li><strong>Patriotic Spirit:</strong> The event instilled strong patriotic values in young minds.</li></ul><h3>Building Future Citizens</h3><p>Through such celebrations, we instill strong patriotic values and civic responsibility in our students, preparing them to be responsible citizens of our great nation.</p><p>The Independence Day celebration at TMSVV reflects our commitment to holistic education that includes cultural and national values alongside academic excellence.</p>`,
  images: [
    "/images/events/Independence Day 15th August 2025 Celebrated in School.png",
  ],
});

NEWS_INDEPENDENCE_BASE.sections[0].data.highlights = [
  { icon: "Calendar", text: "August 15, 2025" },
  { icon: "MapPin", text: "TMSVV School, Saparambera" },
];

const NEWS_INDEPENDENCE_SECTIONS = (() => {
  const sections = [...NEWS_INDEPENDENCE_BASE.sections];
  const stayIdx = sections.findIndex((s) => s.id === "stay-connected");
  const closing = {
    id: "celebration-close",
    type: "cta",
    data: {
      heading: "Jai Hind!",
      description: "Independence Day at TMSVV reminded us that nation-building starts with nurturing every child. Join us in shaping tomorrow's citizens.",
      background: "light",
      primaryCta: { label: "Support Our Schools", href: "/get-involved/sponsor-child" },
      secondaryCta: { label: "View More News", href: "/news" },
    },
  };
  if (stayIdx >= 0) sections.splice(stayIdx, 0, closing);
  else sections.push(closing);
  return { sections };
})();

const NEWS_MEDIA_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Newspaper",
        title: "Print and Digital Media",
        subtitle: "Discover how SEVAA's impactful work has been featured in various print and digital media outlets, showcasing our commitment to community development and social service.",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Media Coverage",
        body: "<p>Our work has been recognized and featured in various media outlets, helping us reach a wider audience and inspire more people to join our cause.</p>",
      },
    },
    {
      id: "telegraph-1",
      type: "text-with-image",
      data: {
        heading: "The Telegraph Features SEVAA's Community Work",
        body: "<p><strong>The Telegraph · Print Media · 2024</strong></p><p>SEVAA's impactful work in rural development and education has been highlighted in The Telegraph, showcasing our commitment to community service.</p><p>The Telegraph's comprehensive coverage of SEVAA's work has brought significant attention to our community development initiatives. The article highlights several key aspects of our programs:</p><h4>Educational Initiatives</h4><p>Our innovative approach to education, including the forest school project at Saparambera, has been praised for its unique blend of traditional knowledge and modern pedagogy. The coverage emphasizes how we respect tribal culture while preparing students for contemporary challenges.</p><h4>Healthcare Programs</h4><p>The newspaper featured our medical camps and healthcare initiatives, particularly highlighting our work with tribal communities in remote areas. Our collaborative approach with specialist doctors from Kolkata has been noted as exemplary.</p><h4>Sustainable Development</h4><p>The Telegraph's report emphasized our commitment to environmentally sustainable development practices and our focus on long-term community empowerment rather than short-term aid.</p>",
        image: { src: "/images/userfiles/image/the telegraph_001.jpg", alt: "The Telegraph features SEVAA" },
        primaryCta: { label: "View Coverage", href: "/images/userfiles/image/the telegraph_001.jpg", icon: "ExternalLink" },
      },
    },
    {
      id: "telegraph-2",
      type: "text-with-image",
      data: {
        heading: "SEVAA's Educational Initiatives in Media Spotlight",
        body: "<p><strong>The Telegraph · Print Media · 2024</strong></p><p>Our forest school project and educational programs receive detailed coverage in The Telegraph.</p><p>This detailed coverage focuses specifically on SEVAA's groundbreaking educational initiatives and their impact on rural communities:</p><h4>Forest School Project</h4><p>The Tilka Murmu SEVAA Vano Vidyalay (Forest School) at Saparambera represents a revolutionary approach to education. The Telegraph highlighted how this school integrates environmental learning with traditional curriculum, allowing students to learn in harmony with nature.</p><h4>Navadisha Project</h4><p>Our educational initiative in Ukhra has been recognized for its holistic approach to character development and quality education. The project serves students from multiple primary and secondary schools in the region.</p><h4>Online Learning During Pandemic</h4><p>The coverage praised our quick adaptation during COVID-19, when we launched 'Sudur Pathshala' to serve 15 schools across 12 districts in West Bengal, ensuring continuity of education for marginalized students.</p>",
        image: { src: "/images/userfiles/image/the telegraph_002.jpg", alt: "The Telegraph educational initiatives" },
        primaryCta: { label: "View Coverage", href: "/images/userfiles/image/the telegraph_002.jpg", icon: "ExternalLink" },
      },
    },
    {
      id: "telegraph-3",
      type: "text-with-image",
      data: {
        heading: "Healthcare and Community Development Coverage",
        body: "<p><strong>The Telegraph · Print Media · 2024</strong></p><p>The Telegraph highlights our healthcare initiatives and community development programs.</p><p>The Telegraph's feature on our healthcare and community development work showcased the comprehensive approach SEVAA takes towards holistic community welfare:</p><h4>Medical Camps and Healthcare</h4><p>Our regular medical camps in Saparambera and other remote villages have been highlighted, featuring specialist doctors including gynecologists from Kolkata who volunteer their time to serve tribal communities with limited access to healthcare.</p><h4>COVID-19 Response</h4><p>The coverage praised our rapid response during the pandemic, including financial support for COVID care centers at Narendrapur College and assistance to voluntary organizations working in public health.</p><h4>Community Capacity Building</h4><p>The article emphasized our Local Area Coordinator (LAC) training programs that build local capacity for sustainable community development, ensuring long-term impact beyond direct interventions.</p>",
        image: { src: "/images/userfiles/image/the telegraph_003.jpg", alt: "The Telegraph healthcare coverage" },
        primaryCta: { label: "View Coverage", href: "/images/userfiles/image/the telegraph_003.jpg", icon: "ExternalLink" },
      },
    },
    {
      id: "pabitra-sarkar",
      type: "text-with-image",
      data: {
        heading: "Feature Article on SEVAA by Pabitra Sarkar",
        body: "<p><strong>Print Media · Feature Article · 2024</strong></p><p>An in-depth article about SEVAA's work and impact by renowned writer Pabitra Sarkar.</p><p>Renowned writer Pabitra Sarkar's comprehensive feature article provides an in-depth analysis of SEVAA's philosophy and methodology:</p><h4>Vivekananda's Vision in Action</h4><p>The article explores how SEVAA translates Swami Vivekananda's ideal of \"Shivjnaney Jibsheba\" (service to humanity as worship of the divine) into practical community development programs.</p><h4>Genesis and Growth</h4><p>Sarkar traces SEVAA's origins from a WhatsApp group of Narendrapur college alumni to a registered society making tangible differences in rural Bengal, highlighting the power of collective action.</p><h4>Impact Assessment</h4><p>The article includes testimonials from beneficiaries and provides concrete examples of how SEVAA's interventions have improved lives, from supporting MBBS and engineering students to establishing schools in remote areas.</p><h4>Future Vision</h4><p>Sarkar concludes by examining SEVAA's expansion plans and its commitment to sustainable, community-driven development that respects local culture while embracing progress.</p>",
        image: { src: "/images/userfiles/image/Pabitra Sarkar article on SEVAA.jpg", alt: "Pabitra Sarkar article on SEVAA" },
        primaryCta: { label: "View Coverage", href: "/images/userfiles/image/Pabitra Sarkar article on SEVAA.jpg", icon: "ExternalLink" },
      },
    },
    {
      id: "recognition",
      type: "card-grid",
      data: {
        heading: "Media Recognition",
        subtitle: "The recognition of our work in print and digital media helps us build trust, attract supporters, and inspire more organizations and individuals to contribute to the cause of rural development and community service.",
        columns: 3,
        items: [
          { title: "Print Media", description: "Featured in established newspapers and publications", icon: "Newspaper" },
          { title: "Visibility", description: "Increased awareness of our community programs", icon: "Eye" },
          { title: "Outreach", description: "Connecting with supporters and stakeholders", icon: "ExternalLink" },
        ],
      },
    },
  ],
};

const NEWS_RAKHI_BASE = articleSections({
  title: "Celebration of Rakhi Festival 2025",
  excerpt: "Strengthening bonds of love and protection in our SEVAA family",
  content: `<p>The SEVAA community came together to celebrate the beautiful festival of Rakhi, symbolizing the eternal bond of love, care, and protection that defines our extended family.</p><h3>Community Bond</h3><p>The celebration reinforced the strong bonds within our SEVAA family, bringing together members from different communities.</p><h3>Cultural Preservation</h3><p>Traditional rituals and customs were observed, passing on cultural values to the younger generation.</p><p>Beautiful moments captured during our community Rakhi celebration 2025, showcasing the joy, togetherness, and cultural preservation of the SEVAA family.</p>`,
  images: [
    "/images/news/1.jpg",
    "/images/news/2.jpg",
    "/images/news/3.jpg",
  ],
});

NEWS_RAKHI_BASE.sections[0].data.highlights = [
  { icon: "Calendar", text: "August 2025" },
  { icon: "MapPin", text: "SEVAA Community Centers" },
];

const NEWS_RAKHI_SECTIONS = (() => {
  const sections = [...NEWS_RAKHI_BASE.sections];
  const stayIdx = sections.findIndex((s) => s.id === "stay-connected");
  const closing = {
    id: "celebration-close",
    type: "cta",
    data: {
      heading: "Join Our Community Family",
      description: "Be part of our celebrations and community bonding activities",
      background: "dark",
      primaryCta: { label: "Join Our Family", href: "/join-us" },
      secondaryCta: { label: "View Photo Gallery", href: "/gallery/photos" },
    },
  };
  if (stayIdx >= 0) sections.splice(stayIdx, 0, closing);
  else sections.push(closing);
  return { sections };
})();

const NEWS_TILKA_MURMU_SECTIONS = (() => {
  const title = "Inauguration of Tilka Murmu SEVAA Vana Vidyalaya";
  return {
    sections: [
      {
        id: "header",
        type: "page-header",
        data: {
          title,
          subtitle: "A historic milestone in rural education development",
          highlights: [
            { icon: "Calendar", text: "March 9, 2025" },
            { icon: "MapPin", text: "Saparambera, Ajodhya Hills" },
          ],
        },
      },
      {
        id: "intro",
        type: "text",
        data: {
          body: "<p>State Ministers B. Roychoudhuri, Sandhyarani Tudu, and SP-Purulia inaugurated the Tilka Murmu SEVAA Vana Vidyalaya on March 9th, 2025, marking a significant milestone in rural education development.</p>",
        },
      },
      {
        id: "at-a-glance",
        type: "card-grid",
        data: {
          heading: "At a Glance",
          columns: 2,
          items: [
            { icon: "School", title: "School Infrastructure", description: "Modern educational facility designed to serve tribal communities in the Ajodhya Hills region with focus on preserving local culture." },
            { icon: "Users", title: "Community Impact", description: "Providing quality education to children from far-flung villages around Ajodhya Hills, bridging the education gap in rural areas." },
          ],
        },
      },
      {
        id: "inauguration-gallery",
        type: "gallery",
        data: {
          heading: "School Inauguration & Infrastructure",
          images: [
            {
              src: "/images/events/Picture7.png",
              alt: "State Ministers B.Roychoudhuri, Sandhyarani Tudu, SP-Purulia inaugurating the school on 9th March, 2025",
              caption: "School Inauguration Ceremony — State Ministers and officials inaugurating TMSVV on March 9, 2025",
            },
            {
              src: "/images/events/Picture8.png",
              alt: "Tilka Murmu SEVAA Vana Vidyalaya building as on 9th March, 2025",
              caption: "School Infrastructure — Modern TMSVV building ready for tribal education",
            },
          ],
        },
      },
      {
        id: "csr-funding",
        type: "text",
        data: {
          heading: "CSR Funding Achievement",
          body: "<p>SEVAA has successfully registered itself in the Government of India's CSR (Corporate Social Responsibility) portal and has recently received funding under CSR allotment from the prestigious 'Murugappa Group of Companies' based in Tamil Nadu.</p><h4>Funded Projects Include:</h4><ul><li>Modern kitchen for cooking midday meals</li><li>Library construction</li><li>Preservation of Tribal Art &amp; Culture</li></ul>",
        },
      },
      {
        id: "government-support",
        type: "text",
        data: {
          heading: "Government Support",
          body: "<p>The Government of India's Ministry of Science &amp; Technology, through Indian Institute of Engineering Science and Technology (IIEST), Shibpur (WB) has undertaken the construction of one solar toilet within the school premises, which will be completed soon.</p><h4>Sustainable Infrastructure</h4><p>Focus on eco-friendly solutions including solar-powered facilities to make the school self-reliant in energy consumption.</p>",
        },
      },
      {
        id: "future-plans",
        type: "text",
        data: {
          heading: "Future Development Plans",
          body: "<p>After this initial success, SEVAA now plans to gradually expand the school infrastructure to better serve the community.</p><h4>Planned Infrastructure:</h4><ul><li>Students' hostel for children from far-flung villages</li><li>Guest house for resident teachers and SEVAA members</li><li>Solar panels and energy infrastructure</li></ul><h4>Investment Required:</h4><p><strong>₹20 Lakh</strong> — Estimated cost for hostel and guest house construction.</p>",
        },
      },
      {
        id: "pdf-cta",
        type: "cta",
        data: {
          heading: "Download Full Document",
          background: "terracotta",
          primaryCta: { label: "Download PDF", href: "/documents/Tilka Murmu Forest School.pdf", icon: "ExternalLink" },
        },
      },
      {
        id: "support-cta",
        type: "cta",
        data: {
          heading: "Support Rural Education",
          description: "Help us continue expanding educational opportunities for tribal communities",
          background: "dark",
          primaryCta: { label: "Support Our Mission", href: "/join-us" },
          secondaryCta: { label: "Learn More About the Project", href: "/projects/saparambera" },
        },
      },
      {
        id: "stay-connected",
        type: "cta",
        data: {
          heading: "Stay Connected",
          background: "terracotta",
          primaryCta: { label: "← Back to News", href: "/news" },
          secondaryCta: { label: "Share Article", href: "#share" },
        },
      },
    ],
  };
})();

const NEWS_BOOKLET_2024_SECTIONS = articleSections({
  title: "SEVAA Annual Booklet 2024 Released",
  excerpt:
    "Our comprehensive annual booklet showcasing all activities, achievements, and impact of SEVAA throughout 2024.",
  content: `<p>We are pleased to release our Annual Booklet for 2024, a comprehensive document that showcases the remarkable journey of SEVAA throughout the year.</p><p>The booklet includes:</p><ul><li>Detailed reports on all our educational initiatives</li><li>Healthcare and livelihood programs impact assessment</li><li>Financial transparency and accountability reports</li><li>Stories from beneficiaries and community members</li><li>Future plans and vision for upcoming projects</li></ul><p>This publication reflects our commitment to transparency and community engagement, providing stakeholders with insights into how their support translates into meaningful change.</p><h3>Highlights from 2024</h3><p>The year 2024 has been transformative for SEVAA:</p><ul><li><strong>Education:</strong> Established 3 new learning centers</li><li><strong>Healthcare:</strong> Conducted 12 medical camps serving 2,000+ patients</li><li><strong>Livelihood:</strong> Trained 150 individuals in various skills</li><li><strong>Environment:</strong> Planted 5,000 trees in collaboration with local communities</li></ul>`,
  images: [
    "/images/userfiles/image/Sevaa Booklet 2024_002.jpg",
    "/images/userfiles/image/Sevaa Booklet 2024_003.jpg",
    "/images/userfiles/image/Sevaa Booklet 2024_004.jpg",
  ],
  date: "2024",
  category: "Publication",
  readTime: "8 min read",
  author: "SEVAA Publications Team",
});

const NEWS_LAC_TRAINING_SECTIONS = articleSections({
  title: "LAC Training Program Successfully Completed",
  excerpt:
    "Successful completion of Local Area Coordinator training program for community development and capacity building.",
  content: `<p>Our Local Area Coordinator (LAC) Training Program has been successfully completed, marking a significant milestone in our community development efforts.</p><p>The training program focused on:</p><ul><li>Community mobilization and engagement strategies</li><li>Project management and monitoring techniques</li><li>Local resource mapping and utilization</li><li>Sustainable development practices</li><li>Leadership and communication skills</li></ul><p>The newly trained coordinators will play a crucial role in implementing our grassroots programs and ensuring community ownership of development initiatives.</p><h3>Training Methodology</h3><p>Our comprehensive training approach included:</p><ul><li><strong>Interactive Workshops:</strong> Hands-on learning sessions</li><li><strong>Field Practice:</strong> Real-world application of concepts</li><li><strong>Peer Learning:</strong> Knowledge sharing among participants</li><li><strong>Mentorship:</strong> Guidance from experienced coordinators</li></ul>`,
  images: ["/images/news_image/org/lac training program-1721231943.jpg"],
  date: "July 2024",
  category: "Training",
  readTime: "6 min read",
  author: "Training Department",
});

const NEWS_TELEGRAPH_SECTIONS = articleSections({
  title: "SEVAA Featured in The Telegraph",
  excerpt:
    "Our organization and impactful work has been featured in The Telegraph newspaper, highlighting our community development initiatives.",
  content: `<p>We are honored to be featured in The Telegraph newspaper, which has highlighted our ongoing community development initiatives and their impact on rural communities.</p><p>The coverage includes:</p><ul><li>Our educational programs in remote areas</li><li>Healthcare initiatives and medical camps</li><li>Livelihood generation projects</li><li>Environmental conservation efforts</li><li>Community testimonials and success stories</li></ul><p>This media recognition helps us reach a wider audience and attract more supporters to our cause of serving the underprivileged communities.</p><h3>Media Impact</h3><p>The newspaper coverage has brought significant attention to our work:</p><ul><li><strong>Increased Awareness:</strong> Greater visibility for our cause</li><li><strong>New Partnerships:</strong> Interest from potential collaborators</li><li><strong>Volunteer Engagement:</strong> More people wanting to contribute</li><li><strong>Donor Support:</strong> Enhanced trust and credibility</li></ul>`,
  images: [
    "/images/userfiles/image/the telegraph_001.jpg",
    "/images/userfiles/image/the telegraph_002.jpg",
    "/images/userfiles/image/the telegraph_003.jpg",
  ],
  date: "2024",
  category: "Media Coverage",
  readTime: "4 min read",
  author: "Media Relations Team",
});

const GALLERY_VIDEOS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Video",
        title: "Video Gallery",
        subtitle: "Watch our community development initiatives and educational programs in action",
      },
    },
    {
      id: "categories",
      type: "card-grid",
      data: {
        heading: "Video Categories",
        subtitle: "Our video gallery will feature documentaries, event coverage, project progress reports, and testimonials from community members.",
        columns: 3,
        items: [
          {
            title: "School Activities",
            description: "Videos from Tilka Murmu SEVAA Vana Vidyalaya showcasing educational programs and student activities.",
            icon: "Video",
          },
          {
            title: "Community Events",
            description: "Documentation of community celebrations, cultural events, and developmental meetings.",
            icon: "Video",
          },
          {
            title: "Project Documentation",
            description: "Videos documenting our various projects and their impact on rural communities.",
            icon: "Video",
          },
        ],
      },
    },
    {
      id: "coming-soon",
      type: "text",
      data: {
        heading: "Video Documentation in Progress",
        body: "<p>We are working on creating comprehensive video documentation of our community development work and educational initiatives.</p><p>Our video gallery will feature documentaries, event coverage, project progress reports, and testimonials from community members.</p><p><strong>Check back soon for inspiring videos from our work!</strong></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Help Us Tell Our Story",
        description: "Support our efforts to document and share the impact of community development",
        background: "dark",
        primaryCta: { label: "Support Our Mission", href: "/join-us" },
        secondaryCta: { label: "Join Our Team", href: "/join-us" },
      },
    },
  ],
};

const PUB_NOSTALGIC_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "Nostalgic Narendrapur",
        subtitle: "SEVAA's Annual Literary Magazine",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Publication and Campaign",
        body: "<p>SEVAA has a dedicated Publication Department which keeps on publishing annual magazines, program-based journals and leaflets. Our publications serve as a bridge connecting the past, present, and future of our community while documenting our journey and impact.</p><h3>About Nostalgic Narendrapur</h3><p><strong>Nostalgic Narendrapur</strong> is SEVAA's flagship annual magazine, primarily an e-magazine featuring literary pieces and comprehensive reports on SEVAA activities. The magazine contains literary contributions from former students of Ramakrishna Mission as well as from outside contributors. Revered Swamijis have also contributed to this magazine, making it a valuable repository of wisdom and experiences.</p><p>Over the last 3 years, 2 issues of Nostalgic Narendrapur have been successfully published, each capturing the essence of our collective journey and the spirit of service that defines SEVAA.</p>",
      },
    },
    {
      id: "featured",
      type: "card-grid",
      data: {
        heading: "Featured Content",
        columns: 3,
        items: [
          { icon: "BookOpen", title: "Literary Pieces", description: "Original literary contributions from RK Mission alumni and distinguished writers." },
          { icon: "FileText", title: "Activity Reports", description: "Detailed reports on SEVAA's projects and community development initiatives." },
          { icon: "Sparkles", title: "Spiritual Guidance", description: "Contributions from revered Swamijis sharing wisdom and spiritual insights." },
        ],
      },
    },
    {
      id: "latest-issue",
      type: "gallery",
      data: {
        heading: "Latest Issue — Volume 2.0",
        subtitle: "Browse selected pages from the 105-page magazine. Click any thumbnail to enlarge.",
        images: [
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0001.jpg", alt: "Nostalgic Narendrapur — Page 1", caption: "Page 1" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0010.jpg", alt: "Nostalgic Narendrapur — Page 10", caption: "Page 10" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0025.jpg", alt: "Nostalgic Narendrapur — Page 25", caption: "Page 25" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0050.jpg", alt: "Nostalgic Narendrapur — Page 50", caption: "Page 50" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0075.jpg", alt: "Nostalgic Narendrapur — Page 75", caption: "Page 75" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0100.jpg", alt: "Nostalgic Narendrapur — Page 100", caption: "Page 100" },
          { src: "/images/userfiles/image/Nostalgic Narendrapur 2_0 final (121021)_page-0105.jpg", alt: "Nostalgic Narendrapur — Page 105", caption: "Page 105" },
        ],
      },
    },
    {
      id: "download",
      type: "cta",
      data: {
        heading: "Download Full Magazine",
        description: "Get the complete 105-page Volume 2.0 of Nostalgic Narendrapur as a PDF.",
        background: "terracotta",
        primaryCta: { label: "Download Full Magazine (PDF)", href: "/documents/Nostalgic-Narendrapur-2.0.pdf", icon: "ExternalLink" },
        secondaryCta: { label: "Back to Publications", href: "/publications" },
      },
    },
    {
      id: "contribute",
      type: "cta",
      data: {
        heading: "Contribute to Our Next Issue",
        description: "We welcome contributions from RK Mission alumni, well-wishers, and anyone inspired by the ideals of service. Send your literary pieces, articles, poems, and reflections to infosevaa@gmail.com.",
        background: "dark",
        primaryCta: { label: "Submit a Contribution", href: "mailto:infosevaa@gmail.com" },
        secondaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};
const PUB_SAMMELAN_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "Sevaa Sammelan 2023",
        subtitle: "Annual gathering bringing together our community for reflection, planning, and collaboration",
        highlights: [
          { icon: "Calendar", text: "2023" },
          { icon: "MapPin", text: "SEVAA Community Center" },
        ],
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "A Gathering of Purpose",
        body: "<p>The Sevaa Sammelan 2023 was a significant milestone in our organizational journey, bringing together members, stakeholders, and well-wishers to reflect on our achievements and chart the course for future endeavors.</p><p>This annual conference served as a platform for meaningful dialogue, transparent reporting, and collaborative planning, reinforcing our commitment to community development and sustainable impact.</p>",
      },
    },
    {
      id: "highlights",
      type: "card-grid",
      data: {
        heading: "Sammelan Highlights",
        columns: 3,
        items: [
          { title: "Annual Review", description: "Comprehensive review of SEVAA activities and achievements in 2023.", icon: "BookOpen" },
          { title: "Stakeholder Engagement", description: "Interactive sessions with community members, partners, and supporters.", icon: "Users" },
          { title: "Future Planning", description: "Strategic planning discussions for upcoming projects and initiatives.", icon: "Award" },
        ],
      },
    },
    {
      id: "documentation",
      type: "text",
      data: {
        heading: "Sammelan Documentation Available Soon",
        body: "<p>We are compiling comprehensive documentation from Sevaa Sammelan 2023, including proceedings, presentations, and outcomes.</p><p>The complete report will include participant feedback, strategic decisions, and actionable plans for community development initiatives.</p><p><strong>Check back soon for the complete Sammelan documentation!</strong></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Be Part of Future Sammelans",
        description: "Join our annual gatherings and contribute to community development planning",
        background: "dark",
        primaryCta: { label: "Join SEVAA", href: "/join-us" },
        secondaryCta: { label: "View Annual Reports", href: "/annual-reports" },
      },
    },
  ],
};

const PUB_SOUVENIR_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "Sevaa Souvenir 2025",
        subtitle: "A commemorative journey through our impact, achievements, and community stories",
        highlights: [
          { icon: "Calendar", text: "2025 Edition" },
          { icon: "Gift", text: "Commemorative Publication" },
        ],
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Souvenir Publication in Progress",
        body: "<p>We are currently compiling stories, photographs, and testimonials for our commemorative 2025 souvenir publication.</p><p>This special edition will serve as a lasting testament to our community's journey and the collective impact of our efforts in rural development and social transformation.</p><p><strong>The souvenir will be available soon for our community members and supporters!</strong></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Be Part of Our Story",
        description: "Join our mission and help us create more stories of transformation",
        background: "dark",
        primaryCta: { label: "Join Our Mission", href: "/join-us" },
        secondaryCta: { label: "View Other Publications", href: "/publications" },
      },
    },
  ],
};

const ARCHIVES_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Archive",
        title: "আর্কাইভস",
        subtitle: "SEVAA এর কার্যক্রম ও প্রকল্পসমূহের স্মৃতিসংরক্ষণাগার",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "সংরক্ষণাগারের বিভাগসমূহ",
        body: "<p>SEVAA এর যাত্রা শুরু থেকে আজ পর্যন্ত সকল কার্যক্রম, প্রকল্প ও অনুষ্ঠানের স্মৃতি সংরক্ষিত রয়েছে এই আর্কাইভে।</p>",
      },
    },
    {
      id: "categories",
      type: "card-grid",
      data: {
        heading: "Archive Categories",
        columns: 2,
        items: [
          {
            title: "ছবির সংগ্রহ",
            description: "SEVAA এর বিভিন্ন প্রকল্প ও কার্যক্রমের ছবির সংগ্রহ — প্রকল্প ভিত্তিক ছবি, সাধারণ ছবি, অনুষ্ঠানের ছবি (50+ ছবি)",
            image: "/images/gallery/gallery-1.jpg",
            link: "/archives/photos",
          },
          {
            title: "ভিডিও সংগ্রহ",
            description: "কার্যক্রম ও সাক্ষাৎকারের ভিডিও সংগ্রহ — কার্যক্রমের ভিডিও, সাক্ষাৎকার, প্রশিক্ষণ (10+ ভিডিও)",
            image: "/images/events/2.jpg",
            link: "/archives/videos",
          },
          {
            title: "প্রকাশনা",
            description: "বার্ষিক প্রতিবেদন, নিউজলেটার ও অন্যান্য প্রকাশনা — বার্ষিক প্রতিবেদন, নিউজলেটার, বিশেষ প্রকাশনা (20+ প্রকাশনা)",
            image: "/images/about/about-2.jpg",
            link: "/publications",
          },
          {
            title: "সাধারণ আর্কাইভ",
            description: "পূর্ববর্তী উপদেষ্টা পরিষদ ও অন্যান্য ঐতিহাসিক তথ্য — উপদেষ্টা পরিষদ, প্রাথমিক পর্যায়, সাংগঠনিক ইতিহাস",
            image: "/images/gallery/gallery-1.jpg",
            link: "/archives/general",
          },
        ],
      },
    },
    {
      id: "recent-additions",
      type: "text",
      data: {
        heading: "সাম্প্রতিক সংযোজন",
        body: "<h4>নতুন ছবি সংযোজিত হয়েছে:</h4><ul><li>সপরমবেড়া প্রকল্পের সাম্প্রতিক কার্যক্রম</li><li>উখরা নবদিশা প্রকল্পের ছবি</li><li>স্বাস্থ্য শিবিরের ছবি</li></ul><h4>আসছে শীঘ্রই:</h4><ul><li>বার্ষিক প্রতিবেদন ২০২৪</li><li>প্রকল্প ভিত্তিক ভিডিও ডকুমেন্টারি</li><li>স্বেচ্ছাসেবকদের সাক্ষাৎকার</li></ul>",
      },
    },
  ],
};

const FORMER_ADVISORY_ITEMS = [
  { icon: "Crown", title: "Ashok Punjabi", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Debdas Bhattacharya", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Gautam Bannerjee", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Sajal Kumar Das", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Samir Nayak", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Siddharta Maity", subtitle: "Advisory Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Saikat Das", subtitle: "Advisory Member", description: "(2023-2025)" },
];

const FORMER_EXEC_ITEMS = [
  { icon: "Crown", title: "Dibyagopal Ghatak", subtitle: "President", description: "(2023-2025)" },
  { icon: "Crown", title: "Ratan Ghosh Dastidar", subtitle: "Vice President", description: "(2023-2025)" },
  { icon: "Crown", title: "Pradip Dey", subtitle: "Vice President", description: "(2023-2025)" },
  { icon: "Crown", title: "Krishnendu Das", subtitle: "Secretary", description: "(2023-2025)" },
  { icon: "Crown", title: "Dibes Bera", subtitle: "Assistant Secretary", description: "(2023-2025)" },
  { icon: "Crown", title: "Narayan Tatachari", subtitle: "Treasurer", description: "(2023-2025)" },
  { icon: "Crown", title: "Joydeb De", subtitle: "Assistant Treasurer", description: "(2023-2025)" },
  { icon: "Crown", title: "Pradip De", subtitle: "Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Swapan Maity", subtitle: "Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Manoj Kowar", subtitle: "Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Monishankar Banerjee", subtitle: "Member", description: "(2023-2025)" },
  { icon: "Crown", title: "Pradip Mukhopadhyay", subtitle: "Member", description: "(2023-2025)" },
];

const ARCHIVES_GENERAL_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Archive",
        title: "সাধারণ আর্কাইভ",
        subtitle: "SEVAA এর ঐতিহাসিক তথ্য ও পূর্ববর্তী কাঠামোর সংরক্ষণাগার",
        variant: "light",
      },
    },
    {
      id: "notice",
      type: "feature-highlight",
      data: {
        eyebrow: "আর্কাইভ নোটিশ",
        heading: "ঐতিহাসিক তথ্যের সংরক্ষণাগার",
        description:
          "এই পৃষ্ঠায় SEVAA এর ঐতিহাসিক তথ্য সংরক্ষিত রয়েছে যা বর্তমানে সক্রিয় নয়। বর্তমান সাংগঠনিক কাঠামো ও কার্যকর তথ্যের জন্য অনুগ্রহ করে আমাদের গভর্নেন্স পৃষ্ঠা দেখুন।",
      },
    },
    {
      id: "notice-cta",
      type: "cta",
      data: {
        heading: "বর্তমান গভর্নেন্স দেখুন",
        description: "SEVAA-র বর্তমান সাংগঠনিক কাঠামো ও নেতৃত্বের তথ্য জানতে গভর্নেন্স পৃষ্ঠাটি দেখুন।",
        background: "terracotta",
        primaryCta: { label: "বর্তমান গভর্নেন্স দেখুন", href: "/governance" },
      },
    },
    {
      id: "advisory-body",
      type: "card-grid",
      data: {
        heading: "Advisory Body (2023-2025)",
        subtitle: "The Advisory Body that provided guidance and counsel to SEVAA during 2023-2025, contributing to the organization's strategic direction and policy formulation.",
        columns: 3,
        items: FORMER_ADVISORY_ITEMS,
      },
    },
    {
      id: "advisory-legacy",
      type: "text",
      data: {
        heading: "Advisory Body Legacy (2023-2025)",
        body: "<h4>Key Contributions:</h4><ul><li>Provided strategic guidance during SEVAA's foundational period</li><li>Formulated organizational policies and operational guidelines</li><li>Advised on early project planning and program development</li></ul><h4>Transition:</h4><ul><li>Organizational restructuring and modernization in progress</li><li>New advisory structure planning and formation</li><li>Operations continue under current governance framework</li></ul>",
      },
    },
    {
      id: "exec-committee",
      type: "card-grid",
      data: {
        heading: "Executive Committee (2023-2025)",
        subtitle: "The Executive Committee that served SEVAA during 2023-2025, providing leadership and guidance during a crucial period of organizational development.",
        columns: 3,
        items: FORMER_EXEC_ITEMS,
      },
    },
    {
      id: "exec-legacy",
      type: "text",
      data: {
        heading: "Executive Committee Legacy (2023-2025)",
        body: "<h4>Key Achievements:</h4><ul><li>Established foundational governance structure and policies</li><li>Launched major community development projects</li><li>Strengthened partnerships with local communities</li></ul><h4>Transition Period:</h4><ul><li>Smooth transition to new leadership structure in 2025</li><li>Established specialized subcommittees for focused work</li><li>Enhanced organizational structure for better efficiency</li></ul>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "সংশ্লিষ্ট পৃষ্ঠাসমূহ",
        description: "বর্তমান গভর্নেন্স ও সাংগঠনিক কাঠামো দেখুন",
        background: "terracotta",
        primaryCta: { label: "বর্তমান গভর্নেন্স", href: "/governance" },
        secondaryCta: { label: "আর্কাইভস মূল পৃষ্ঠা", href: "/archives" },
      },
    },
  ],
};

const ARCHIVES_PHOTOS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Image",
        title: "ছবির সংগ্রহ",
        subtitle: "SEVAA এর কার্যক্রম ও প্রকল্পসমূহের স্মৃতি",
      },
    },
    {
      id: "project-wise",
      type: "gallery",
      data: {
        heading: "প্রকল্প ভিত্তিক ছবি",
        subtitle: "বিভিন্ন প্রকল্পের কার্যক্রমের ছবি",
        images: [
          { src: "/images/events/1.jpg", alt: "সপরমবেড়া প্রকল্পের কার্যক্রম", caption: "সপরমবেড়া গ্রামে শিক্ষা কার্যক্রম" },
          { src: "/images/events/2.jpg", alt: "উখরা প্রকল্পের কার্যক্রম", caption: "উখরা নবদিশা প্রকল্প" },
          { src: "/images/events/3.jpg", alt: "এলাচী প্রকল্পের কার্যক্রম", caption: "এলাচী গ্রামে স্বাস্থ্য শিবির" },
          { src: "/images/gallery/gallery-1.jpg", alt: "শিক্ষা সহায়তা প্রদান", caption: "মেধাবী ছাত্রছাত্রীদের শিক্ষা সহায়তা" },
          { src: "/images/gallery/gallery-2.jpg", alt: "স্বাস্থ্য সেবা কার্যক্রম", caption: "গ্রামীণ এলাকায় স্বাস্থ্য সেবা" },
          { src: "/images/gallery/11.jpg", alt: "কমিউনিটি প্রোগ্রাম", caption: "সমাজভিত্তিক উন্নয়ন কর্মসূচি" },
        ],
      },
    },
    {
      id: "general-photos",
      type: "gallery",
      data: {
        heading: "সাধারণ ছবি",
        subtitle: "SEVAA এর নানান অনুষ্ঠান ও সভার ছবি",
        images: [
          { src: "/images/userfiles/image/photo 1.jpg", alt: "বেলুড় মঠে প্রাক্তন ছাত্র সমাবেশ", caption: "বেলুড় মঠে প্রাক্তন ছাত্র সমাবেশ - SEVAA এর সূচনা" },
          { src: "/images/gallery/33.jpg", alt: "SEVAA সদস্যদের সভা", caption: "SEVAA সদস্যদের বার্ষিক সভা" },
          { src: "/images/gallery/44.jpg", alt: "স্বেচ্ছাসেবকদের প্রশিক্ষণ", caption: "স্বেচ্ছাসেবকদের প্রশিক্ষণ কর্মসূচি" },
          { src: "/images/gallery/55.jpg", alt: "সাংস্কৃতিক অনুষ্ঠান", caption: "SEVAA আয়োজিত সাংস্কৃতিক অনুষ্ঠান" },
          { src: "/images/gallery/66.jpg", alt: "পুরস্কার বিতরণী", caption: "মেধাবী ছাত্রছাত্রীদের পুরস্কার বিতরণী" },
          { src: "/images/gallery/77.jpg", alt: "দাতাদের সম্মাননা", caption: "দাতা ও শুভানুধ্যায়ীদের সম্মাননা অনুষ্ঠান" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "আরও ছবি দেখতে চান?",
        description: "SEVAA এর সর্বশেষ কার্যক্রম ও প্রকল্পের আপডেট পেতে আমাদের সোশ্যাল মিডিয়া পেজ ফলো করুন।",
        background: "terracotta",
        primaryCta: { label: "Facebook", href: "https://www.facebook.com/sevaa2023" },
        secondaryCta: { label: "যোগাযোগ করুন", href: "/contact" },
      },
    },
  ],
};

const ARCHIVES_VIDEOS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Video",
        title: "ভিডিও সংগ্রহ",
        subtitle: "SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ভিডিও ডকুমেন্টারি",
      },
    },
    {
      id: "coming-soon",
      type: "text",
      data: {
        heading: "ভিডিও সংগ্রহ শীঘ্রই আসছে",
        body: "<p>SEVAA এর কার্যক্রম ও প্রকল্পসমূহের ভিডিও সংগ্রহ শীঘ্রই এই পাতায় পাওয়া যাবে।</p>",
      },
    },
    {
      id: "updates",
      type: "text",
      data: {
        heading: "আপডেট পেতে চান?",
        body: "<p>SEVAA এর সর্বশেষ আপডেট পেতে আমাদের সোশ্যাল মিডিয়া পেজ ফলো করুন।</p>",
      },
    },
    {
      id: "related-links",
      type: "card-grid",
      data: {
        heading: "এই মুহূর্তে দেখতে পারেন",
        columns: 3,
        items: [
          { icon: "Image", title: "ছবির সংগ্রহ", description: "SEVAA এর বিভিন্ন প্রকল্প ও কার্যক্রমের ছবি", link: "/archives/photos", ctaLabel: "দেখুন" },
          { icon: "BookOpen", title: "প্রকাশনা", description: "বার্ষিক প্রতিবেদন, নিউজলেটার ও অন্যান্য প্রকাশনা", link: "/publications", ctaLabel: "পড়ুন" },
          { icon: "Newspaper", title: "সংবাদ", description: "সাম্প্রতিক সংবাদ ও মিডিয়া কভারেজ", link: "/news", ctaLabel: "দেখুন" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "সংশ্লিষ্ট লিঙ্ক",
        description: "Follow us for updates",
        background: "terracotta",
        primaryCta: { label: "Facebook ফলো করুন", href: "https://www.facebook.com/sevaa2023" },
        secondaryCta: { label: "যোগাযোগ করুন", href: "/contact" },
      },
    },
  ],
};

const PROJ_ELACHI_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Leaf",
        title: "Elachi Project",
        subtitle: "SEVAA's pioneering Communicative English Course initiative in Elachi village, Ramchandrapur",
      },
    },
    {
      id: "overview",
      type: "text-with-image",
      data: {
        heading: "Our First Initiative",
        body: "<p>The Elachi Project was SEVAA's very first initiative, marking the beginning of our journey in community education and development. This groundbreaking program set the foundation for all our subsequent educational endeavors.</p>",
        image: { src: "/images/projects/elachi/capacity-building-program.jpg", alt: "Elachi Project - Capacity Building Program" },
      },
    },
    {
      id: "highlights",
      type: "card-grid",
      data: {
        heading: "Project Highlights",
        columns: 4,
        items: [
          { icon: "Clock", title: "Duration", description: "4-month intensive program" },
          { icon: "Users", title: "Participants", description: "95 students from Class V to Class XII" },
          { icon: "MapPin", title: "Location", description: "Village Elachi, Ramchandrapur (near Narendrapur)" },
          { icon: "GraduationCap", title: "Delivery", description: "Professional trainers and innovative methodologies" },
        ],
      },
    },
    {
      id: "course",
      type: "text",
      data: {
        heading: "Communicative English Course",
        body: "<p>An innovative approach to English language learning combining international methodologies with contextual Indian educational frameworks.</p><h4>Innovative Methodology</h4><p>The course was uniquely designed by amalgamating the 'Dianetics' chapter of Scientology (a UK-based study technology) with the written Indian version of the 'Eclectic method'.</p><h4>Course Features:</h4><ul><li>Professional trainer-led sessions</li><li>Interactive communication methods</li><li>Contextual learning approach</li><li>Progressive skill development</li><li>Practical application focus</li></ul>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        heading: "Program Structure",
        background: "warm",
        items: [
          { icon: "Users", value: "95", label: "Students Enrolled" },
          { icon: "Layers", value: "2", label: "Batches" },
          { icon: "Clock", value: "4", label: "Months Duration" },
          { icon: "GraduationCap", value: "V-XII", label: "Class Range" },
        ],
      },
    },
    {
      id: "impact",
      type: "text",
      data: {
        heading: "Project Impact & Legacy",
        body: "<p>The remarkable success of the Elachi Project became the cornerstone of SEVAA's educational initiatives. This pilot program's achievements inspired us to replicate similar projects across other parts of West Bengal, demonstrating the effectiveness of our innovative teaching methodologies and community-centric approach.</p><p><em>\"This success story continues to guide our educational initiatives across Bengal\"</em></p>",
      },
    },
  ],
};

const PROJ_HEALTH_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Heart",
        title: "Sevaa Health Projects",
        subtitle: "Bringing quality healthcare to underserved communities through comprehensive health initiatives",
      },
    },
    {
      id: "coming-soon",
      type: "text",
      data: {
        heading: "Health Initiatives Coming Soon",
        body: "<p>SEVAA is developing comprehensive health programs to provide accessible, quality healthcare services to rural and marginalized communities.</p><p>Our upcoming health initiatives will focus on preventive care, community health education, and holistic wellness, inspired by Swami Vivekananda's vision of serving humanity.</p><p><strong>Stay tuned for updates on our health projects!</strong></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Support Community Health",
        description: "Help us provide quality healthcare to those who need it most",
        background: "dark",
        primaryCta: { label: "Support Our Mission", href: "/join-us" },
        secondaryCta: { label: "Join Our Team", href: "/join-us" },
      },
    },
  ],
};

const PROJ_LIVELIHOOD_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Sprout",
        title: "Sevaa Livelihood Projects",
        subtitle: "Empowering communities through sustainable livelihood programs and skill development initiatives",
      },
    },
    {
      id: "coming-soon",
      type: "text",
      data: {
        heading: "Livelihood Initiatives Coming Soon",
        body: "<p>SEVAA is developing comprehensive livelihood programs to create sustainable income opportunities for rural and marginalized communities.</p><p>Our upcoming initiatives will focus on skill development, sustainable agriculture, and community empowerment based on Swami Vivekananda's philosophy of self-reliance and community development.</p><p><strong>Stay tuned for updates on our livelihood projects!</strong></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Support Our Livelihood Programs",
        description: "Help us create more sustainable livelihood opportunities for rural communities",
        background: "dark",
        primaryCta: { label: "Support Our Mission", href: "/join-us" },
        secondaryCta: { label: "Join Our Team", href: "/join-us" },
      },
    },
  ],
};

const PROJ_SAPARAMBERA_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Home",
        title: "Saparambera Vivekpally",
        subtitle: "Tilka Murmu SEVAA Vano Vidyalaya - A holistic community development platform in Ajodhya Hills",
      },
    },
    {
      id: "overview",
      type: "text-with-image",
      data: {
        heading: "Vivekpally: A People's Platform",
        body: "<p>After months of field experience, SEVAA realized the need for a holistic approach to development. Vivekpally serves as a people's platform where communities can make decisions, plan targets, develop strategies, and implement solutions jointly.</p><h4>Birbaba Tilka Murmu Vivekpalli</h4><p>Named after the great tribal leader Tilka Murmu, this unit serves all 52 families in Saparambera village, providing comprehensive development across education, health, livelihood, and environmental initiatives.</p><ul><li>No school or formal education before SEVAA's intervention</li><li>No electricity or basic infrastructure in the village</li><li>Limited road connectivity to the outside world</li><li>Inadequate funds to purchase quality farming seeds</li><li>Dependence on seasonal, low-yield farming</li><li>Health services far from the village</li><li>Limited awareness of government entitlements</li><li>Absence of sustainable livelihood options</li><li>Children walking long distances for basic schooling</li><li>Tribal cultural heritage at risk of erosion</li><li>Forest resources under ecological stress</li><li>Limited community-level planning institutions</li></ul>",
        image: { src: "/images/projects/saparambera/saparambera1 - low resolution.jpg", alt: "Saparambera Village Overview" },
      },
    },
    {
      id: "challenges",
      type: "card-grid",
      data: {
        heading: "Challenges We Addressed",
        subtitle: "Saparambera village faced significant infrastructure and livelihood challenges before SEVAA's intervention",
        columns: 4,
        items: [
          { title: "No School", description: "Village had no educational facilities for children", icon: "School" },
          { title: "No Electricity", description: "Basic infrastructure was completely absent", icon: "Zap" },
          { title: "Poor Roads", description: "Limited connectivity to outside world", icon: "Map" },
          { title: "Limited Resources", description: "Lack of funds for quality farming seeds", icon: "Coins" },
        ],
      },
    },
    {
      id: "development",
      type: "card-grid",
      data: {
        heading: "Our Development Approach",
        subtitle: "SEVAA's comprehensive development strategy covers all aspects of community growth and empowerment",
        columns: 3,
        items: [
          { title: "Education & Culture", description: "Tilka Murmu Forest School establishment, Indigenous folk culture preservation, Community learning programs, Educational infrastructure development", icon: "BookOpen" },
          { title: "Health & Livelihood", description: "Community health programs, Sustainable livelihood training, Healthcare awareness campaigns, Nutritional support initiatives", icon: "Heart" },
          { title: "Environment & Agriculture", description: "Forest conservation initiatives, Agricultural support and training, Environmental awareness programs, Sustainable farming practices", icon: "Leaf" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        heading: "Project Gallery",
        subtitle: "Visual journey of transformation in Saparambera village",
        images: [
          { src: "/images/projects/saparambera/saparambera 2 - low resolution.jpg", alt: "Saparambera Development 1" },
          { src: "/images/projects/saparambera/saparambera 3.jpg", alt: "Saparambera Development 2" },
          { src: "/images/projects/saparambera/saparambera 5.jpg", alt: "Saparambera Development 3" },
          { src: "/images/projects/saparambera/saparambera 6 -low resolution.jpg", alt: "Saparambera Development 4" },
          { src: "/images/projects/saparambera/saparabera 8 low resolution.jpg", alt: "Saparambera Development 5" },
          { src: "/images/programs/saparambera-1.jpg", alt: "Saparambera Activities" },
        ],
      },
    },
    {
      id: "impact",
      type: "text",
      data: {
        heading: "Making a Lasting Impact",
        body: "<p>In just 2 years, SEVAA's work at Saparambera has created significant transformation. The village has gained recognition from local administration, people's representatives, and officers at block and district levels.</p><p><em>\"The great impact on the villagers' mindset demonstrates the power of community-driven development and collaborative problem-solving.\"</em></p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Explore the Forest School",
        description: "Learn more about Tilka Murmu SEVAA Vano Vidyalaya and the ongoing transformation",
        background: "terracotta",
        primaryCta: { label: "Visit TMSVV Website", href: "https://tmsvv.sevaa.net", icon: "ExternalLink" },
        secondaryCta: { label: "View School Details (PDF)", href: "/documents/Tilka Murmu Forest School.pdf" },
      },
    },
  ],
};

const PROJ_UKHRA_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "BookOpen",
        title: "Ukhra Project",
        subtitle: "Empowering education and community development in Ukhra village, Paschim Bardhaman",
      },
    },
    {
      id: "overview",
      type: "text-with-image",
      data: {
        heading: "Project Overview",
        body: "<p>Ukhra village is an ancient hamlet of Paschim Bardhaman. Rich in Shaivite-Shakta-Vaishnava akharas and temples, the village is not identified as a poor one, but to SEVAA, this hamlet seems problematic in other ways.</p><h4>Key Challenges Identified</h4><ul><li>50% of children lack proper reading ability despite 15+ primary schools in the area</li><li>80% of children struggle with writing skills</li><li>5 high schools cover the region but learning outcomes remain weak</li><li>Shortage of subject teachers, especially Mathematics and Life Science</li><li>Girls' high school ran without a Mathematics teacher for three years</li><li>Poor foundational listening and speaking skills among primary students</li><li>Limited observation and reasoning skills among children</li><li>Weak independent writing capabilities</li><li>Insufficient creative and co-curricular activities in schools</li><li>Limited access to digital education tools during school hours</li><li>Widespread diabetes and hypertension among adults</li><li>Low general health awareness across the community</li><li>Lack of preventive-care knowledge among residents</li><li>Limited reach of regular medical screenings</li><li>Rapid soil degradation due to nearby coal mining activities</li><li>Progressive deforestation around the village</li><li>Loss of vegetation along water bodies</li><li>Inadequate water management in a century-old semi-urban settlement</li><li>Poor drainage system causing monsoon flooding</li><li>Limited community-level environmental awareness</li><li>Few safe public spaces for backward and girl students</li><li>Shrinking cultural and creative outlets for children outside school</li></ul>",
        image: { src: "/images/projects/ukhra/ukhra 24.jpg", alt: "Ukhra Project Overview" },
      },
    },
    {
      id: "initiatives",
      type: "card-grid",
      data: {
        heading: "SEVAA Ukhra Initiatives",
        subtitle: "Our comprehensive approach to community development through education, health, and environmental initiatives",
        columns: 2,
        items: [
          {
            title: "Ukhra Nabadisha",
            description: "A comprehensive educational project covering 5 primary schools and 1 girls' high school, reaching approximately 900 children in the village. Key objectives: develop quality reading ability among 100% children, enhance listening and speaking skills, foster observation skills and reasoning abilities, develop independent writing capabilities, encourage creativity among students.",
            icon: "BookOpen",
          },
          {
            title: "SMART Class Initiative",
            description: "For the first time, SEVAA introduced digital education during regular school hours. The SMART room in the girls' school was equipped with advanced camera systems for interactive learning, two-way communication capabilities, focus on classes 11 and 12 students, integration with school curriculum.",
            icon: "Monitor",
          },
          {
            title: "Joy Box Programme",
            description: "A portable Audio Visual unit designed to make learning engaging and interactive for children across schools. Activities include story listening sessions, visual problem-solving exercises, mind mapping for concept development, and vocabulary enhancement activities.",
            icon: "Gift",
          },
          {
            title: "Environmental Initiatives",
            description: "Addressing environmental challenges through tree plantation and community awareness programs. Tree plantation festival in 2023, saplings planted along water bodies, community environmental awareness, long-term sustainability focus.",
            icon: "Leaf",
          },
        ],
      },
    },
    {
      id: "winter-festival",
      type: "text-with-image",
      data: {
        heading: "Winter Service Creation Festival",
        body: "<p>In December 2023, when schools were closed, SEVAA organized a creative festival for 100 backward students from Navadisha schools.</p><h4>Festival Activities:</h4><ul><li>Music and dance workshops</li><li>Drawing and painting sessions</li><li>Recitation and drama activities</li><li>10-day intensive program</li><li>Community feast and gift distribution</li></ul>",
        image: { src: "/images/projects/ukhra/ukhra 25.jpg", alt: "Winter Service Creation Festival" },
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        heading: "Project Gallery",
        subtitle: "Moments captured from our various activities and initiatives in Ukhra",
        images: [
          { src: "/images/projects/ukhra/ukhra 20.jpg", alt: "Ukhra Project Activity 1" },
          { src: "/images/projects/ukhra/ukhra 21.jpg", alt: "Ukhra Project Activity 2" },
          { src: "/images/projects/ukhra/ukhra 22.jpg", alt: "Ukhra Project Activity 3" },
          { src: "/images/projects/ukhra/ukhra 23.jpg", alt: "Ukhra Project Activity 4" },
          { src: "/images/projects/ukhra/ukhra 26.jpg", alt: "Ukhra Project Activity 5" },
          { src: "/images/projects/ukhra/ukhra 27.jpg", alt: "Ukhra Project Activity 6" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Learn More About Our Ukhra Work",
        description: "Visit the dedicated Ukhra website to explore our ongoing initiatives",
        background: "terracotta",
        primaryCta: { label: "Visit Ukhra Website", href: "https://ukhra.sevaa.net", icon: "ExternalLink" },
        secondaryCta: { label: "Back to Projects", href: "/" },
      },
    },
  ],
};

const JOIN_US_DONATION_ITEMS = [
  { title: "\"We Support\" Group Scholarships", description: "Provide scholarships to deserving students and help them achieve their educational dreams", icon: "GraduationCap" },
  { title: "Support the School", description: "Rs 1000 per student per month to support school operations and infrastructure", icon: "Building2" },
  { title: "In-Kind Donations", description: "Donate stationery, books, school infrastructure needs, computers, and other essential items", icon: "Heart" },
  { title: "Standby Funds for Natural Calamity", description: "Help us be prepared to provide immediate relief during natural disasters", icon: "AlertTriangle" },
  { title: "Celebrate Special Days", description: "Celebrate birthdays and memorable days of your loved ones with our children - Lumpsum Rs 5000/-", icon: "Cake" },
  { title: "Sponsor a Meal", description: "Sponsor a meal for our children in memory of your loved ones", icon: "Utensils" },
  { title: "Sponsor a Medical Camp", description: "Support health initiatives by sponsoring medical camps for villagers and students", icon: "Stethoscope" },
  { title: "Sponsor Healthcare", description: "Support specific healthcare needs like cataract operations for villagers and students", icon: "HeartPulse" },
  { title: "General Fund for School Operations", description: "Contribute to the general fund to support day-to-day school operations", icon: "Wallet" },
];

const GI_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "HandHeart",
        title: "Join Us",
        subtitle: "Make a lasting impact on the lives of children and communities",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Join Us in Making a Difference",
        body: "<p>We appeal for donations in any of the following account heads. Your contribution, no matter how small, creates a lasting impact on the lives of our children and communities.</p>",
      },
    },
    {
      id: "options",
      type: "card-grid",
      data: {
        heading: "Ways to Contribute",
        columns: 3,
        items: JOIN_US_DONATION_ITEMS,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Ready to Make an Impact?",
        description: "Your support helps us continue our mission of empowering communities through education, healthcare, and sustainable development.",
        background: "dark",
        primaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};
const GI_EXPLORE_LINKS = [
  { title: "Become an Associate Member", href: "/get-involved/become-assoc-member", description: "Join our extended community of associate members" },
  { title: "Become a Friend", href: "/get-involved/become-friend", description: "Support our mission as a SEVAA Friend" },
  { title: "Become a Partner", href: "/get-involved/become-partner", description: "Partner with us as an organization" },
  { title: "CSR Opportunities", href: "/get-involved/csr-opportunities", description: "Corporate social responsibility partnerships" },
  { title: "Sponsor a Child", href: "/get-involved/sponsor-child", description: "Support a child's education and future" },
  { title: "Sponsor Midday Meal", href: "/get-involved/sponsor-midday-meal", description: "Provide nutritious meals to schoolchildren" },
  { title: "Join Us", href: "/join-us", description: "All the ways you can contribute to SEVAA" },
  { title: "Support", href: "/support", description: "Answers to questions about donations, volunteering, and more" },
];

function giExploreLinksExcept(currentHref) {
  return GI_EXPLORE_LINKS.filter((l) => l.href !== currentHref).slice(0, 4);
}

const GI_ASSOC_SECTIONS = comingSoon({
  icon: "UserPlus",
  title: "Become a Sevaa Associate Member",
  subtitle: "Join SEVAA as an associate member and be part of our extended community contributing to meaningful social change.",
  heroImage: "/images/gallery/gallery-1.jpg",
  exploreLinks: giExploreLinksExcept("/get-involved/become-assoc-member"),
});
const GI_FRIEND_SECTIONS = comingSoon({
  icon: "Heart",
  title: "Become a Sevaa Friend",
  subtitle: "Become a Friend of SEVAA — supporting our mission through your goodwill and occasional contributions.",
  heroImage: "/images/gallery/gallery-2.jpg",
  exploreLinks: giExploreLinksExcept("/get-involved/become-friend"),
});
const GI_PARTNER_SECTIONS = comingSoon({
  icon: "Handshake",
  title: "Become a Sevaa Partner",
  subtitle: "Partner with SEVAA as an organization or institution to amplify our collective impact.",
  heroImage: "/images/about/about-2.jpg",
  exploreLinks: giExploreLinksExcept("/get-involved/become-partner"),
});
const GI_CSR_SECTIONS = comingSoon({
  icon: "Building",
  title: "CSR Opportunities",
  subtitle: "Corporate Social Responsibility opportunities with SEVAA — partner with us to create lasting social impact.",
  heroImage: "/images/events/1.jpg",
  exploreLinks: giExploreLinksExcept("/get-involved/csr-opportunities"),
});
const GI_SPONSOR_CHILD_SECTIONS = comingSoon({
  icon: "GraduationCap",
  title: "Sponsor a Child",
  subtitle: "Sponsor the education of a child at Tilka Murmu SEVAA Vano Vidyalay or one of our other schools.",
  heroImage: "/images/userfiles/image/Sevaa Booklet 2024_001.jpg",
  exploreLinks: giExploreLinksExcept("/get-involved/sponsor-child"),
});
const GI_SPONSOR_MEAL_SECTIONS = comingSoon({
  icon: "Utensils",
  title: "Sponsor Midday Meal",
  subtitle: "Sponsor nutritious midday meals for children at our schools and Vivekpally programs.",
  heroImage: "/images/events/3.jpg",
  exploreLinks: GI_EXPLORE_LINKS.filter(
    (l) =>
      l.href !== "/get-involved/sponsor-midday-meal" &&
      l.href !== "/get-involved/become-assoc-member",
  ).slice(0, 4),
});

const JOIN_US_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Users",
        title: "Join Us",
        subtitle: "Make a lasting impact on the lives of children and communities",
      },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "Join Us in Making a Difference",
        body: "<p>We appeal for donations in any of the following account heads. Your contribution, no matter how small, creates a lasting impact on the lives of our children and communities.</p>",
      },
    },
    {
      id: "options",
      type: "card-grid",
      data: {
        heading: "Ways to Contribute",
        columns: 3,
        items: JOIN_US_DONATION_ITEMS,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Ready to Make an Impact?",
        description: "Your support helps us continue our mission of empowering communities through education, healthcare, and sustainable development.",
        background: "dark",
        primaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};

const SUPPORT_FAQ_ITEMS = [
  { title: "How can I make a donation to SEVAA?", description: "You can make donations through our secure online donation form, bank transfer, or by sending a cheque to our registered address. We accept donations via UPI, credit/debit cards, and net banking. All donations are processed securely and you will receive a receipt for tax purposes." },
  { title: "Are donations to SEVAA tax-deductible?", description: "Yes, SEVAA is registered under Section 80G of the Income Tax Act. Donations are eligible for tax deduction up to 50% of the donated amount. We provide official receipts that can be used for claiming tax deductions." },
  { title: "Can I donate specific items instead of money?", description: "Yes, we accept in-kind donations such as books, educational materials, medical supplies, and clothing. Please contact us before sending items to ensure they align with our current needs and programs." },
  { title: "How can I volunteer with SEVAA?", description: "You can join us as a volunteer by filling out our volunteer registration form. We welcome volunteers for various activities including field work, administrative support, event organization, and professional services like medical camps." },
  { title: "Do I need specific qualifications to volunteer?", description: "No specific qualifications are required for general volunteering. However, for specialized roles like medical camps or educational programs, relevant qualifications may be preferred. We value enthusiasm and commitment above all." },
  { title: "How much time commitment is expected from volunteers?", description: "We appreciate any amount of time you can contribute. Whether it's a few hours a month or regular weekly involvement, every contribution helps. We work with your schedule and availability." },
  { title: "What are SEVAA's main focus areas?", description: "SEVAA focuses on rural development through education, healthcare, livelihood support, and environmental conservation. Our key projects include the Saparambera Project, Ukra Project, and Elachi Project, each addressing specific community needs." },
  { title: "How do you select communities for your projects?", description: "We identify communities through field surveys, local partnerships, and needs assessments. Priority is given to remote areas with limited access to basic services and where our intervention can create maximum impact." },
  { title: "Can I visit your project sites?", description: "Yes, we organize regular visits to our project sites for donors, volunteers, and stakeholders. Please contact us in advance to arrange a visit. We also conduct annual meetings where you can meet beneficiaries and see our work firsthand." },
  { title: "What is the meaning of SEVAA?", description: "SEVAA stands for \"Society for Envisioning Vivekananda in Awareness and Action.\" It reflects our commitment to serving society following the ideals and teachings of Swami Vivekananda." },
  { title: "When was SEVAA founded and by whom?", description: "SEVAA was founded by a group of dedicated individuals inspired by Swami Vivekananda's philosophy of service. You can read more about our genesis and founding members in the \"Our Genesis\" section of our website." },
  { title: "How can I stay updated with SEVAA's activities?", description: "You can subscribe to our newsletter, follow us on social media platforms, or regularly visit our website for updates. We also publish annual reports detailing our activities and impact." },
  { title: "Is SEVAA a registered organization?", description: "Yes, SEVAA is a registered non-profit organization. Our registration details, legal documents, and financial information are available on our Legal & Financial Information page for complete transparency." },
  { title: "How can I access SEVAA's financial reports?", description: "Our audited financial reports are published annually and available in the Annual Reports section. We believe in complete financial transparency and make all our financial information publicly accessible." },
  { title: "What is your policy on data privacy?", description: "We strictly adhere to data protection laws and maintain the privacy of all personal information. Our detailed Privacy Policy outlines how we collect, use, and protect your data. We never share personal information with third parties without consent." },
];

const SUPPORT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "HelpCircle",
        title: "How Can We Help You?",
        subtitle: "Find answers to common questions or get in touch with our support team",
      },
    },
    {
      id: "faq",
      type: "card-grid",
      data: {
        heading: "Frequently Asked Questions",
        subtitle: "Common questions about donations, volunteering, programs, and more",
        columns: 2,
        items: SUPPORT_FAQ_ITEMS,
      },
    },
    {
      id: "contact-methods",
      type: "card-grid",
      data: {
        heading: "Contact Support",
        subtitle: "Still need help? Our support team is here to assist you.",
        columns: 3,
        items: [
          { title: "Email Support", description: "Get help via email: infosevaa@gmail.com", icon: "Mail" },
          { title: "Phone Support", description: "Speak with our team: +91 98271 93272", icon: "Phone" },
          { title: "Visit Us", description: "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150", icon: "MapPin" },
        ],
      },
    },
    {
      id: "hours",
      type: "text",
      data: {
        heading: "Office Hours",
        body: "<ul><li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li><li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li><li><strong>Sunday:</strong> Closed</li></ul><p><strong>Note:</strong> We aim to respond to all inquiries within 24 hours during business days.</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Still Need Help?",
        description: "Can't find what you're looking for? Our support team is here to help.",
        background: "terracotta",
        primaryCta: { label: "Contact Support", href: "/contact" },
      },
    },
  ],
};

const SUPPORT_ACTIVITIES_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "HandHeart",
        title: "We Support Activities",
        subtitle: "Beyond our regular projects, extending help to those in need across communities",
      },
    },
    {
      id: "overview",
      type: "text",
      data: {
        heading: "About We Support",
        body: "<p>Whenever SEVAA feels that some sort of support we need to provide to anybody or in any situation beyond normal project based recurring expenditure is termed as <strong>\"We Support\"</strong> activity. Every year we spend more than <strong>10% of our annual expenditure</strong> on these activities.</p>",
      },
    },
    {
      id: "scholarship",
      type: "text",
      data: {
        heading: "SEVAA Scholarship Program",
        body: "<p>Financial support for students undertaking higher education. Selection criteria focus on merit and students from economically disadvantaged families.</p><h4>Current Scholarship Recipients (Last 3 Years):</h4><ul><li><strong>Astham Hembram</strong> — 4th Year MBBS, Sagar Dutta Medical College, Kolkata</li><li><strong>Nabin Roy</strong> — Final Year Engineering, Engineering and Textile Technology, Srirampore</li><li><strong>Moumita Kapat</strong> — Graduate (2023), Nursing, Medinipur Medical College and Hospital</li><li><strong>Moumita Ghosh</strong> — Graduate (2023), Nursing, Burdwan Medical College and Hospital</li></ul><p><strong>2024-25 Session:</strong> Continuing support to Astham and Nabin for their ongoing studies.</p>",
      },
    },
    {
      id: "covid",
      type: "text",
      data: {
        heading: "COVID-19 Support Activities (2020-2022)",
        body: "<p>During the COVID-19 pandemic years, SEVAA continued its support activities to help communities cope with the crisis.</p><h4>COVID Facility Development</h4><p>Supported the development of a short-stay facility for COVID patients at Gouranga Bhawan in R.K.M Residential College, Narendrapur campus. Responded to Mission Authority's call with financial donation for this purpose.</p><h4>Frontline Worker Support</h4><p>Provided support to Janaswasthya Suraksha Samanyay at Barasat, an organization of frontline fighters during the COVID-19 pandemic.</p>",
      },
    },
    {
      id: "alma-mater",
      type: "text",
      data: {
        heading: "Support to Alma Mater",
        body: "<p><strong>Gouranga Bhawan Renovation:</strong> Responding to the call of the then Principal Maharaj Swami Shastrajnananda for renovation of Gouranga Bhawan, which was in dilapidated condition. SEVAA provided financial donation to the authority for this restoration purpose.</p><p><strong>Individual Student Support:</strong> When Kabir, a Physics Honours student at R.K.M.R College, Narendrapur, fell critically ill, SEVAA provided medical support upon the Principal Maharaj's call. Coming from a poor family, his father couldn't manage treatment costs. We're happy that Kabir overcame the crisis and rejoined college.</p>",
      },
    },
    {
      id: "emergency-relief",
      type: "text",
      data: {
        heading: "Emergency Relief Work",
        body: "<h4>Cyclone YAAS Relief (2021)</h4><p>When Cyclone YAAS devastated the lives of lakhs of people across districts, with South and North 24 Parganas being the most affected, SEVAA stood by the victims.</p><p><strong>Areas Supported:</strong> 3 islands of North 24 Parganas</p><ul><li>Kumirmari GP</li><li>Pargumti Kalitala GP</li><li>East Charalkhali-Sabebkhali GP, PS-Hingalganj</li></ul><p><strong>Support Provided:</strong> Rice, potato, oil, soybean, and soap distributed to 300 highly affected families.</p><h4>Flood Relief (2022)</h4><p>When massive flooding inundated islands in the same districts, SEVAA provided essential relief materials including blankets and mosquito nets to affected families.</p>",
      },
    },
    {
      id: "sudur-pathshala",
      type: "text",
      data: {
        heading: "SUDUR PATHSHALA",
        body: "<h4>Sudur Pathshala Version 0.1 (COVID Period)</h4><p>During COVID-19, when schools remained closed for more than two years, SEVAA recognized that meritorious but poor students in rural Bengal were deprived of learning opportunities. We initiated e-classes to bridge this gap.</p><p><strong>Program Scale:</strong></p><ul><li>26 schools across 13 districts</li><li>28 dedicated teachers</li><li>Daily classes except Sunday</li></ul><p><strong>Schedule:</strong></p><ul><li>Evening classes: 6:30 PM - 9:00 PM</li><li>Three class sessions per day</li><li>Eligible students from rural areas</li></ul><p><em>The program successfully concluded in 2022 when schools reopened.</em></p><h4>Sudur Pathshala Version 0.2 (Teacher Shortage Solution)</h4><p>In 2023, we identified a new need: many schools, especially in rural areas, lacked subject teachers due to recruitment difficulties in West Bengal.</p><p><strong>Pilot Project Discovery:</strong> The need was first identified at our projected Girls High School, which had been running without a Mathematics teacher for three years after retirement. We equipped the school with a SMART Room enabling two-way communication for effective teaching.</p><p><strong>Current Implementation:</strong></p><ul><li>10 schools participating</li><li>Classes 9-12 covered</li><li>During regular school hours</li><li>Integrated time scheduling</li></ul><p><strong>Subjects Offered:</strong> Mathematics, Life Science with interactive two-way classes and real-time student participation.</p><p><strong>Vision:</strong> Multiple schools with deficiency of the same subject teacher can be brought under one umbrella for broader service provision.</p>",
      },
    },
    {
      id: "impact",
      type: "stats",
      data: {
        heading: "Support Activities Impact",
        subtitle: "Our commitment extends beyond regular programs to address immediate community needs",
        background: "warm",
        items: [
          { icon: "GraduationCap", value: "4+", label: "Students Supported" },
          { icon: "Shield", value: "300", label: "Families Assisted" },
          { icon: "School", value: "36", label: "Schools Reached" },
          { icon: "Heart", value: "10%", label: "Annual Budget" },
        ],
      },
    },
  ],
};
const PRIVACY_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Shield",
        title: "Privacy Policy",
        subtitle: "Last updated: August 19, 2025",
      },
    },
    {
      id: "body",
      type: "text",
      data: {
        body: "<h3>Introduction</h3><p>Society for Envisioning Vivekananda in Awareness and Action (SEVAA) is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make donations, or interact with our services.</p><h3>Information We Collect</h3><h4>Personal Information</h4><p>We may collect the following personal information:</p><ul><li>Name and contact information (email, phone, address)</li><li>Donation and payment information</li><li>Volunteer application details</li><li>Communication preferences</li><li>Any information you provide when contacting us</li></ul><h4>Automatically Collected Information</h4><p>When you visit our website, we automatically collect:</p><ul><li>IP address and browser information</li><li>Device and operating system details</li><li>Website usage patterns and analytics</li><li>Cookies and similar tracking technologies</li></ul><h3>How We Use Your Information</h3><p>We use collected information for the following purposes:</p><ul><li>Process donations and issue tax receipts</li><li>Communicate about our programs and activities</li><li>Send newsletters and updates (with your consent)</li><li>Coordinate volunteer activities</li><li>Respond to inquiries and provide support</li><li>Improve our website and services</li><li>Comply with legal and regulatory requirements</li><li>Maintain financial records and transparency</li></ul><h3>Information Sharing and Disclosure</h3><p>We do not sell, trade, or rent your personal information. We may share information only in the following circumstances:</p><ul><li><strong>Service Providers:</strong> With trusted third parties who assist in our operations (payment processors, email services)</li><li><strong>Legal Compliance:</strong> When required by law or to protect our rights and safety</li><li><strong>Financial Transparency:</strong> Donor information may be included in annual reports as required by law (with appropriate privacy protections)</li><li><strong>Consent:</strong> With your explicit permission for specific purposes</li></ul><h3>Data Security</h3><p>We implement appropriate security measures to protect your information:</p><ul><li>Encryption of sensitive data in transit and at rest</li><li>Secure payment processing through certified providers</li><li>Regular security audits and updates</li><li>Limited access to personal information on a need-to-know basis</li><li>Staff training on data protection practices</li></ul><h3>Cookies and Tracking Technologies</h3><p>We use cookies and similar technologies to enhance your website experience and analyze usage patterns. You can control cookie settings through your browser preferences. Some website features may not function properly if cookies are disabled.</p><h3>Your Rights and Choices</h3><p>You have the following rights regarding your personal information:</p><ul><li><strong>Access:</strong> Request information about the data we hold about you</li><li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li><li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li><li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li><li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li></ul><p>To exercise these rights, please contact us using the information provided below.</p><h3>Data Retention</h3><p>We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Financial records are maintained according to applicable accounting and tax regulations.</p><h3>Third-Party Links</h3><p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p><h3>Children's Privacy</h3><p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p><h3>International Users</h3><p>SEVAA operates primarily in India and our services are governed by Indian law. If you are accessing our website from outside India, please be aware that your information may be transferred to, stored, and processed in India.</p><h3>Changes to This Privacy Policy</h3><p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the \"Last updated\" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.</p><h3>Contact Us</h3><p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p><p><strong>Society for Envisioning Vivekananda in Awareness and Action (SEVAA)</strong><br/><strong>Address:</strong> 131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal, India<br/><strong>Email:</strong> <a href='mailto:infosevaa@gmail.com'>infosevaa@gmail.com</a><br/><strong>Phone:</strong> <a href='tel:+919827193272'>+91 98271 93272</a></p><p><em>This Privacy Policy complies with applicable Indian privacy laws and regulations, including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</em></p>",
      },
    },
  ],
};

const TERMS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "ScrollText",
        title: "Terms and Conditions",
        subtitle: "Last updated: August 19, 2025",
      },
    },
    {
      id: "body",
      type: "text",
      data: {
        body: "<h3>Introduction</h3><p>Welcome to the Society for Envisioning Vivekananda in Awareness and Action (SEVAA) website. These Terms and Conditions (\"Terms\") govern your use of our website and services. By accessing or using our website, making donations, or participating in our programs, you agree to be bound by these Terms.</p><h3>About SEVAA</h3><p>SEVAA is a registered non-profit organization in India, dedicated to social service and community development through various educational, healthcare, and livelihood programs.</p><p><strong>Registered Address:</strong> 131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal, India<br/><strong>Registration Number:</strong> S0017771 of 2020-2021<br/><strong>PAN:</strong> ABPAS1880H</p><h3>Website Usage</h3><h4>Permitted Use</h4><p>You may use our website for:</p><ul><li>Learning about our organization and programs</li><li>Making donations to support our causes</li><li>Volunteering and participating in our activities</li><li>Accessing educational and informational content</li><li>Contacting us for legitimate purposes</li></ul><h4>Prohibited Use</h4><p>You may not use our website for:</p><ul><li>Any unlawful or fraudulent activities</li><li>Transmitting harmful code, viruses, or malware</li><li>Attempting to gain unauthorized access to our systems</li><li>Interfering with website functionality or security</li><li>Copying, distributing, or modifying our content without permission</li><li>Using the website for commercial purposes without consent</li></ul><h3>Donations and Financial Contributions</h3><h4>Donation Policy</h4><ul><li>All donations are voluntary contributions to support our charitable activities</li><li>Donations are generally non-refundable except in cases of technical errors</li><li>We reserve the right to refuse donations that may compromise our mission</li><li>Donors will receive receipts for tax purposes as per Indian tax regulations</li><li>Donations will be used for the purposes specified or general organizational activities</li></ul><h4>Tax Benefits</h4><p>Donations to SEVAA may be eligible for tax deductions under Section 80G of the Income Tax Act, 1961. Please consult with your tax advisor for specific benefits applicable to your situation.</p><h3>Intellectual Property Rights</h3><h4>Our Content</h4><p>All content on this website, including text, images, logos, videos, and graphics, is owned by SEVAA or used with permission. This content is protected by copyright and other intellectual property laws.</p><h4>User Content</h4><p>By submitting content to our website (such as testimonials, comments, or feedback), you grant SEVAA a non-exclusive right to use, reproduce, and display such content for our organizational purposes.</p><h3>Volunteer and Participation Terms</h3><ul><li>Volunteers must complete our application process and background verification where applicable</li><li>Volunteers are expected to adhere to our code of conduct and organizational values</li><li>Volunteers participate at their own risk and must follow safety guidelines</li><li>Personal information of beneficiaries and other sensitive data must be kept confidential</li></ul><h3>Privacy and Data Protection</h3><p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our website, you consent to our data practices as described in our Privacy Policy.</p><h3>Disclaimers</h3><h4>Website Availability</h4><p>We strive to maintain website availability but cannot guarantee uninterrupted access. We may suspend or modify services for maintenance, updates, or other reasons.</p><h4>Information Accuracy</h4><p>While we make every effort to provide accurate information, we cannot guarantee the completeness or accuracy of all content. Information is subject to change without notice.</p><h4>Third-Party Links</h4><p>Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of these external sites.</p><h3>Limitation of Liability</h3><p>To the maximum extent permitted by law, SEVAA shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:</p><ul><li>Use or inability to use our website or services</li><li>Technical difficulties or system failures</li><li>Loss of data or unauthorized access to information</li><li>Participation in volunteer activities or programs</li><li>Reliance on information provided on the website</li></ul><h3>Indemnification</h3><p>You agree to indemnify and hold harmless SEVAA, its directors, officers, employees, and volunteers from any claims, damages, or expenses arising from your use of our website or violation of these Terms.</p><h3>Governing Law and Jurisdiction</h3><p>These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal, India.</p><h3>Force Majeure</h3><p>SEVAA shall not be liable for any failure to perform obligations due to circumstances beyond our reasonable control, including natural disasters, government actions, strikes, or other unforeseeable events.</p><h3>Modifications to Terms</h3><p>We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with a revised date. Your continued use of our website after changes constitutes acceptance of the modified Terms.</p><h3>Severability</h3><p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p><h3>Contact Information</h3><p>If you have any questions about these Terms and Conditions, please contact us:</p><p><strong>Society for Envisioning Vivekananda in Awareness and Action (SEVAA)</strong><br/><strong>Address:</strong> 131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal, India<br/><strong>Email:</strong> <a href='mailto:infosevaa@gmail.com'>infosevaa@gmail.com</a><br/><strong>Phone:</strong> <a href='tel:+919827193272'>+91 98271 93272</a></p><p><em>By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these Terms, please do not use our website or services.</em></p>",
      },
    },
  ],
};

// ============================================================
// Page content map
// ============================================================

const PAGE_CONTENT = {
  "f0000000-0000-0000-0000-000000000001": HOME_SECTIONS,
  "f0000000-0000-0000-0000-000000000002": MISSION_VISION_SECTIONS,
  "f0000000-0000-0000-0000-000000000003": GOVERNANCE_SECTIONS,
  "f0000000-0000-0000-0000-000000000004": TEAM_SECTIONS,
  "f0000000-0000-0000-0000-000000000005": OUR_GENESIS_SECTIONS,
  "f0000000-0000-0000-0000-000000000006": PRESIDENT_DESK_SECTIONS,
  "f0000000-0000-0000-0000-000000000007": SECRETARY_DESK_SECTIONS,
  "f0000000-0000-0000-0000-000000000008": BLESSING_LETTERS_SECTIONS,
  "f0000000-0000-0000-0000-000000000009": FORMATION_VP_SECTIONS,
  "f0000000-0000-0000-0000-00000000000a": SEVAA_KARMAKANDA_SECTIONS,
  "f0000000-0000-0000-0000-00000000000b": LEGAL_FINANCIAL_SECTIONS,
  "f0000000-0000-0000-0000-00000000000c": STAKEHOLDER_SECTIONS,
  "f0000000-0000-0000-0000-00000000000d": CONTACT_SECTIONS,
  "f0000000-0000-0000-0000-00000000000e": NEWS_SECTIONS,
  "f0000000-0000-0000-0000-00000000000f": NEWS_BIRTHDAY_SECTIONS,
  "f0000000-0000-0000-0000-000000000010": NEWS_INDEPENDENCE_SECTIONS,
  "f0000000-0000-0000-0000-000000000011": NEWS_MEDIA_SECTIONS,
  "f0000000-0000-0000-0000-000000000012": NEWS_RAKHI_SECTIONS,
  "f0000000-0000-0000-0000-000000000013": NEWS_TILKA_MURMU_SECTIONS,
  "f0000000-0000-0000-0000-000000000032": NEWS_BOOKLET_2024_SECTIONS,
  "f0000000-0000-0000-0000-000000000033": NEWS_LAC_TRAINING_SECTIONS,
  "f0000000-0000-0000-0000-000000000034": NEWS_TELEGRAPH_SECTIONS,
  "f0000000-0000-0000-0000-000000000014": EVENTS_SECTIONS,
  "f0000000-0000-0000-0000-000000000015": GALLERY_PHOTOS_SECTIONS,
  "f0000000-0000-0000-0000-000000000016": GALLERY_VIDEOS_SECTIONS,
  "f0000000-0000-0000-0000-000000000017": PUBLICATIONS_SECTIONS,
  "f0000000-0000-0000-0000-000000000018": PUB_NOSTALGIC_SECTIONS,
  "f0000000-0000-0000-0000-000000000019": PUB_SAMMELAN_SECTIONS,
  "f0000000-0000-0000-0000-00000000001a": PUB_SOUVENIR_SECTIONS,
  "f0000000-0000-0000-0000-00000000001b": ASSOCIATES_SECTIONS,
  "f0000000-0000-0000-0000-00000000001c": ANNUAL_REPORTS_SECTIONS,
  "f0000000-0000-0000-0000-00000000001d": ARCHIVES_SECTIONS,
  "f0000000-0000-0000-0000-00000000001e": ARCHIVES_GENERAL_SECTIONS,
  "f0000000-0000-0000-0000-00000000001f": ARCHIVES_PHOTOS_SECTIONS,
  "f0000000-0000-0000-0000-000000000020": ARCHIVES_VIDEOS_SECTIONS,
  "f0000000-0000-0000-0000-000000000021": PROJ_ELACHI_SECTIONS,
  "f0000000-0000-0000-0000-000000000022": PROJ_HEALTH_SECTIONS,
  "f0000000-0000-0000-0000-000000000023": PROJ_LIVELIHOOD_SECTIONS,
  "f0000000-0000-0000-0000-000000000024": PROJ_SAPARAMBERA_SECTIONS,
  "f0000000-0000-0000-0000-000000000025": PROJ_UKHRA_SECTIONS,
  "f0000000-0000-0000-0000-000000000026": GI_SECTIONS,
  "f0000000-0000-0000-0000-000000000027": GI_ASSOC_SECTIONS,
  "f0000000-0000-0000-0000-000000000028": GI_FRIEND_SECTIONS,
  "f0000000-0000-0000-0000-000000000029": GI_PARTNER_SECTIONS,
  "f0000000-0000-0000-0000-00000000002a": GI_CSR_SECTIONS,
  "f0000000-0000-0000-0000-00000000002b": GI_SPONSOR_CHILD_SECTIONS,
  "f0000000-0000-0000-0000-00000000002c": GI_SPONSOR_MEAL_SECTIONS,
  "f0000000-0000-0000-0000-00000000002d": JOIN_US_SECTIONS,
  "f0000000-0000-0000-0000-00000000002e": SUPPORT_SECTIONS,
  "f0000000-0000-0000-0000-00000000002f": SUPPORT_ACTIVITIES_SECTIONS,
  "f0000000-0000-0000-0000-000000000030": PRIVACY_SECTIONS,
  "f0000000-0000-0000-0000-000000000031": TERMS_SECTIONS,
};

// ============================================================
// Runner
// ============================================================

async function upsertSite() {
  const { error } = await supabase.from("sites").upsert(
    {
      id: SEVAA_SITE_ID,
      name: "SEVAA",
      slug: "sevaa-website",
      domain: "sevaa.net",
      metadata: {
        platform: "sevaa-website",
        description:
          "Society for Envisioning Vivekananda in Awareness and Action",
        preview_url: "https://sevaa.net",
        stage_domain: "",
        available_slots: [],
        seo: {
          title: "SEVAA - Society for Envisioning Vivekananda in Awareness and Action",
          description:
            "SEVAA is a non-government philanthropic organisation inspired by the ideals of Thakur-Maa-Swamiji, working in Education, Health, Livelihood, Relief, Culture and Environment.",
          keywords:
            "SEVAA, Society for Envisioning Vivekananda, Swami Vivekananda, non-profit, NGO, Kolkata, West Bengal, Saparambera, Ukhra, Vivekpally, tribal development, forest school",
          og_image: "",
        },
        contact: {
          email: "infosevaa@gmail.com",
          email_secondary: "sevaa.narendrapur@gmail.com",
          phone: "+91 98271 93272",
          phone_secondary: "+91 33 2477 2545",
          address:
            "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal",
        },
        deploy: { prod_hook_url: "", stage_hook_url: "" },
      },
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(`site upsert: ${error.message}`);
  console.log("✓ sevaa-website site upserted");
}

async function grantSevaaWebAccess() {
  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("id")
    .eq("email", "sevaa.web@gmail.com")
    .single();
  if (userErr || !user) {
    throw new Error(
      `sevaa.web@gmail.com not found in website.users: ${userErr?.message}`
    );
  }

  const { error } = await supabase.from("site_members").upsert(
    { site_id: SEVAA_SITE_ID, user_id: user.id, role: "owner" },
    { onConflict: "site_id,user_id" }
  );
  if (error) throw new Error(`site_members upsert: ${error.message}`);
  console.log(`✓ sevaa.web@gmail.com granted owner on sevaa-website (${user.id})`);
}

async function upsertPages() {
  const rows = PAGES.map((p) => ({
    id: p.id,
    site_id: SEVAA_SITE_ID,
    slug: p.slug,
    title: p.title,
    page_type: p.page_type,
    sort_order: p.sort_order,
    is_active: true,
  }));
  const { error } = await supabase.from("pages").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`pages upsert: ${error.message}`);
  console.log(`✓ ${rows.length} pages upserted`);
}

async function seedContent() {
  const force = process.env.FORCE_RESEED === "1";
  for (const page of PAGES) {
    const content = PAGE_CONTENT[page.id];
    if (!content) continue;

    const { data: existing } = await supabase
      .from("content_versions")
      .select("id, version_number")
      .eq("page_id", page.id)
      .order("version_number", { ascending: false })
      .limit(1);

    if (existing && existing.length > 0) {
      if (!force) {
        console.log(`  - ${page.slug}: already has content, skipping`);
        continue;
      }
      const nextVersion = existing[0].version_number + 1;
      const { error } = await supabase.from("content_versions").insert({
        page_id: page.id,
        version_number: nextVersion,
        status: "published",
        content,
        published_at: new Date().toISOString(),
      });
      if (error) throw new Error(`content_versions ${page.slug}: ${error.message}`);
      console.log(`  ↻ ${page.slug}: re-seeded as v${nextVersion}`);
      continue;
    }

    const { error } = await supabase.from("content_versions").insert({
      page_id: page.id,
      version_number: 1,
      status: "published",
      content,
      published_at: new Date().toISOString(),
    });
    if (error) throw new Error(`content_versions ${page.slug}: ${error.message}`);
    console.log(`  + ${page.slug}: seeded v1 (${content.sections.length} sections)`);
  }
}

async function main() {
  console.log("Seeding sevaa-website into website-builder...\n");
  await upsertSite();
  await grantSevaaWebAccess();
  await upsertPages();
  console.log("\nSeeding page content...");
  await seedContent();
  console.log("\n✓ sevaa-website seed complete");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
