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
];

// ============================================================
// Coming-soon helper
// ============================================================

function comingSoon({ icon = "Clock", title, subtitle, expected }) {
  return {
    sections: [
      {
        id: "header",
        type: "page-header",
        data: { icon, title, subtitle },
      },
      {
        id: "body",
        type: "text",
        data: {
          heading: "Coming Soon",
          body: `<p>This section is coming soon${expected ? `, expected <strong>${expected}</strong>` : ""}. Check back later for updates.</p><p>In the meantime, feel free to explore the rest of our site or get in touch using the links below.</p>`,
        },
      },
      {
        id: "cta",
        type: "cta",
        data: {
          heading: "Stay Connected",
          description: "Want to be notified when this content is live?",
          background: "terracotta",
          primaryCta: { label: "Get Updates", href: "/contact" },
          secondaryCta: { label: "Back to Home", href: "/" },
        },
      },
    ],
  };
}

// ============================================================
// Section content (verbatim from sevaa.net)
// ============================================================

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
      },
    },
    {
      id: "mission",
      type: "text-with-image",
      data: {
        heading: "Our Mission",
        body: "<p>We believe that we can save the deprived mankind and error in our environment along with you by enabling people to ensure quality of living through innovative socio-economic community collaboration, education, cultural activities and philanthropic services.</p><h4>We are committed to:</h4><ul><li>Equity, Diversity, and Inclusion</li><li>Collaboration & Community Engagement</li><li>Building self confidence within the community</li><li>Shared Commitment</li><li>Responsibility & Accountability</li><li>Respect, Mutual Trust and Compassion</li><li>Integrity in everything we do</li></ul>",
        image: { src: "/images/events/1.jpg", alt: "SEVAA Mission and Values" },
      },
    },
    {
      id: "impact",
      type: "stats",
      data: {
        eyebrow: "Our Impact",
        heading: "Serving Communities Across India",
        subtitle: "Measurable outcomes from our work in education, health, livelihood, and culture",
        background: "dark",
        items: [
          { icon: "Users", value: "900+", label: "Children Reached" },
          { icon: "GraduationCap", value: "6", label: "Schools Supported" },
          { icon: "Home", value: "52", label: "Families in Vivekpally" },
          { icon: "Heart", value: "4+", label: "Years of Service" },
        ],
      },
    },
    {
      id: "programs",
      type: "programs-grid",
      data: {
        eyebrow: "Our Programs",
        heading: "Areas of Intervention",
        subtitle: "Holistic community development through six interconnected programs",
        background: "warm",
        items: [
          {
            icon: "BookOpen",
            iconColor: "primary",
            title: "Education",
            description: "Forest school, Nabadisha, and scholarships for underprivileged students.",
            href: "/projects/saparambera",
          },
          {
            icon: "Heart",
            iconColor: "red",
            title: "Healthcare",
            description: "Medical camps, telemedicine, and health awareness in rural villages.",
            href: "/projects/health",
          },
          {
            icon: "Users",
            iconColor: "secondary",
            title: "Livelihood",
            description: "Lac cultivation, organic farming, and skill development for sustainable income.",
            href: "/projects/livelihood",
          },
          {
            icon: "Globe",
            iconColor: "gold",
            title: "Environment",
            description: "Tree plantation, climate mitigation, and sustainable village practices.",
            href: "/formation-of-vivek-pally",
          },
          {
            icon: "Lightbulb",
            iconColor: "copper",
            title: "Culture",
            description: "Preserving tribal heritage through publications, events, and community celebrations.",
            href: "/publications",
          },
          {
            icon: "Shield",
            iconColor: "primary",
            title: "Relief",
            description: "Emergency relief during natural disasters and health crises.",
            href: "/support-activities",
          },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Voices from the Community",
        subtitle: "What our partners and beneficiaries say about SEVAA's work",
        background: "cream",
        items: [
          {
            quote:
              "SEVAA has transformed our village. From having no school, electricity, or proper livelihood, Saparambera today is a model for sustainable rural development.",
            author: "Villager",
            role: "Saparambera, Ajodhya Hills",
          },
          {
            quote:
              "The dedication of SEVAA members in bringing quality education, healthcare, and livelihood opportunities to our tribal community is truly inspirational.",
            author: "Community Leader",
            role: "Purulia District",
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
          { title: "Dibes BERA", description: "President" },
          { title: "Dibya Gopal Ghatak", description: "Vice President" },
          { title: "Samir Nayak", description: "Vice President" },
          { title: "Narayan Tatachari", description: "Secretary" },
          { title: "Pradip De", description: "Assistant Secretary" },
          { title: "Pradip Mukherjee", description: "Treasurer" },
          { title: "Gautam Banerjee", description: "Assistant Treasurer" },
          { title: "Asoke Punjabi", description: "Executive Member" },
        ],
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
          { src: "/images/userfiles/image/blessing-1.jpg", alt: "Blessing letter", caption: "Blessing from Satyada" },
          { src: "/images/userfiles/image/blessing-2.jpg", alt: "Blessing letter", caption: "Blessing from Ramakrishna Mission" },
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
        heading: "Upcoming Events",
        subtitle: "Join us at our community programs and cultural celebrations",
        columns: 3,
        items: [
          {
            title: "Inauguration of TMSVV",
            description: "State Ministers and SP-Purulia inaugurated the school in a grand ceremony.",
            badge: "March 9, 2025",
            link: "/events",
          },
          {
            title: "Health Camp Inauguration",
            description: "ServicePlace USA organized Health Camp at Primary Health Centre.",
            badge: "March 10, 2025",
            link: "/events",
          },
          {
            title: "Independence Day Celebration",
            description: "Independence Day celebrated with great enthusiasm at the TMSVV school.",
            badge: "August 15, 2025",
            link: "/events",
          },
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
      type: "list",
      data: {
        heading: "Downloadable Resources",
        subtitle: "Access our publications, reports, and awareness materials",
        items: [
          "SEVAA Annual Report 2024",
          "Tilka Murmu Forest School Brochure",
          "Nostalgic Narendrapur E-Magazine",
          "Sevaa Sammelan 2023 Proceedings",
          "Campaign Videos and Documentation",
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
const EXEC_COMMITTEE_ITEMS = [
  { title: "Dibes BERA", description: "President" },
  { title: "Dibya Gopal Ghatak", description: "Vice President" },
  { title: "Samir Nayak", description: "Vice President" },
  { title: "Narayan Tatachari", description: "Secretary" },
  { title: "Pradip De", description: "Assistant Secretary" },
  { title: "Pradip Mukherjee", description: "Treasurer" },
  { title: "Gautam Banerjee", description: "Assistant Treasurer" },
  { title: "Asoke Punjabi", description: "Executive Member" },
  { title: "Bikas Baran Ghosh", description: "Executive Member" },
  { title: "Sajal Das", description: "Executive Member" },
  { title: "Krishnendu Das", description: "Executive Member" },
];

const GENERAL_MEMBERS_ITEMS = [
  { title: "Asit Baran Giri", description: "General Member" },
  { title: "Bikash Ghosh", description: "General Member" },
  { title: "Buddhadeb Midya", description: "General Member" },
  { title: "Debashis Bose", description: "General Member" },
  { title: "Debashis Chakraborty", description: "General Member" },
  { title: "Dilip Kar", description: "General Member" },
  { title: "Jyotirmoy Guha", description: "General Member" },
  { title: "Pralay Chakraborty", description: "General Member" },
  { title: "Pranab Mukherjee", description: "General Member" },
  { title: "Somnath Roy", description: "General Member" },
  { title: "Subrata Dhar", description: "General Member" },
  { title: "Sushil Mondal", description: "General Member" },
  { title: "Swaraj Bose", description: "General Member" },
  { title: "Tapas Samanta", description: "General Member" },
];

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
          { title: "Education Subcommittee", description: "Oversees forest school, Nabadisha and scholarships." },
          { title: "Health Subcommittee", description: "Coordinates medical camps and telemedicine services." },
          { title: "Livelihood Subcommittee", description: "Guides lac cultivation and skill development programs." },
          { title: "Publication Subcommittee", description: "Manages annual reports and e-magazines." },
          { title: "Finance Subcommittee", description: "Ensures transparency, audits and financial compliance." },
          { title: "Cultural Subcommittee", description: "Organizes Sammelan, festivals and cultural outreach." },
        ],
      },
    },
    {
      id: "land-donors",
      type: "card-grid",
      data: {
        heading: "Land Donors",
        subtitle: "Families who generously donated land for SEVAA projects",
        columns: 3,
        items: [
          { title: "Nimai Sing Sardar", description: "Saparambera Village" },
          { title: "Mahen Sing Sardar", description: "Saparambera Village" },
          { title: "Pratima Sardar", description: "Saparambera Village" },
          { title: "Duti Sardar", description: "Saparambera Village" },
          { title: "Laxman Sardar", description: "Saparambera Village" },
          { title: "Sukanti Sardar", description: "Saparambera Village" },
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
          { title: "Associate Member 1", description: "Associate Member" },
          { title: "Associate Member 2", description: "Associate Member" },
          { title: "Associate Member 3", description: "Associate Member" },
          { title: "Associate Member 4", description: "Associate Member" },
          { title: "Associate Member 5", description: "Associate Member" },
          { title: "Associate Member 6", description: "Associate Member" },
          { title: "Associate Member 7", description: "Associate Member" },
          { title: "Associate Member 8", description: "Associate Member" },
          { title: "Associate Member 9", description: "Associate Member" },
          { title: "Associate Member 10", description: "Associate Member" },
          { title: "Associate Member 11", description: "Associate Member" },
          { title: "Associate Member 12", description: "Associate Member" },
          { title: "Associate Member 13", description: "Associate Member" },
          { title: "Associate Member 14", description: "Associate Member" },
          { title: "Associate Member 15", description: "Associate Member" },
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
        body: "<p>SEVAA এর উপদেষ্টা পরিষদ বর্তমানে পুনর্গঠনের প্রক্রিয়াধীন রয়েছে। আমাদের সাংগঠনিক কাঠামো আধুনিকায়ন ও নতুন চ্যালেঞ্জ মোকাবেলার জন্য একটি নতুন উপদেষ্টা পরিষদ গঠনের কাজ চলমান।</p><p>পূর্ববর্তী উপদেষ্টা পরিষদের সদস্যদের অবদানের স্বীকৃতিস্বরূপ তাদের তথ্য আমাদের আর্কাইভে সংরক্ষিত রয়েছে।</p>",
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
        heading: "Moments from the Journey",
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
      type: "text",
      data: {
        heading: "From President's Desk",
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
      type: "text",
      data: {
        heading: "From Secretary's Desk",
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
          { src: "/images/userfiles/image/blessing-1.jpg", alt: "Blessing letter 1", caption: "Blessing from Satyada" },
          { src: "/images/userfiles/image/blessing-2.jpg", alt: "Blessing letter 2", caption: "Blessing from Ramakrishna Mission" },
          { src: "/images/userfiles/image/blessing-3.jpg", alt: "Blessing letter 3", caption: "Blessing letter" },
          { src: "/images/userfiles/image/blessing-4.jpg", alt: "Blessing letter 4", caption: "Blessing letter" },
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
      type: "text",
      data: {
        heading: "Tilka Murmu SEVAA Vano Vidyalaya",
        body: "<p><em>Download Brochure</em></p>",
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
      id: "beginning-impact",
      type: "card-grid",
      data: {
        heading: "From Beginning to Impact",
        columns: 2,
        items: [
          {
            title: "The Beginning",
            description:
              "SEVAA surveyed a few villages in Ajodhya Hills and the first Vivekpalli was established in April 2022 in the \"Village Saparambera\", Ajodhya, Purulia. The village had no school, electricity, proper livelihood and roads. The villagers had no adequate money to buy quality seeds for farming. SEVAA started connecting the village with the outside world and governmental facilities, training them how to solve problems through best utilisation of existing resources.",
          },
          {
            title: "The Impact",
            description:
              "This Vivekpally was named as Birbaba Tilka Murmu Vivekpalli (an Unit of SEVAA) which has been executing activities on all 52 families of that village. In the last 2 years SEVAA has started projects at Saparambera Vivekpalli mainly in areas of Education, Health, Livelihood, Agriculture, Environment and Culture. A great impact can be seen on the minds of the villagers.",
          },
        ],
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
          { src: "/images/userfiles/image/saparambera1 - low resolution.jpg", alt: "Saparambera village activities", caption: "Community activities at Saparambera" },
          { src: "/images/userfiles/image/saparambera 2 - low resolution.jpg", alt: "Educational activities at Vivekpally", caption: "Educational activities at Vivekpally" },
          { src: "/images/userfiles/image/saparambera 3.jpg", alt: "Development work in progress", caption: "Development work in progress" },
          { src: "/images/userfiles/image/saparambera 5.jpg", alt: "Agricultural training programs", caption: "Agricultural training programs" },
          { src: "/images/userfiles/image/saparambera 6 -low resolution.jpg", alt: "Health and wellness activities", caption: "Health and wellness activities" },
          { src: "/images/userfiles/image/saparabera 8 low resolution.jpg", alt: "Community meetings and planning", caption: "Community meetings and planning" },
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
        heading: "Registration & Tax Exemption",
        body: "<p><strong>Registration:</strong> SEVAA is registered as \"SOCIETY FOR ENVISIONING VIVEKANANDA IN AWARENESS AND ACTION\", a not-for-profit society under West Bengal Societies Registration Act, XXVI of 1961 bearing Registration No. S0017771 of 2020-2021, dated March 18, 2021.</p><p><strong>Tax Exemption:</strong> All donations to SEVAA are exempted from Income Tax under Section 80G of the Income Tax Act, 1961. Unique Registration No. ABPAS1880HF20221 dated 28/03/2022.</p><p><strong>PAN:</strong> ABPAS1880H</p><p><strong>Address:</strong> SEVAA, 131/B Sri Ramakrishna Pally, Sonarpur, Kolkata 700150, West Bengal, India</p>",
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
              "Our organization and impactful work has been featured in The Telegraph newspaper, highlighting our community development initiatives.",
            image: "/images/userfiles/image/the telegraph_001.jpg",
            link: "/news/media",
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
            link: "/events",
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
            link: "/documents/Tilka_Murmu_Forest_School.pdf",
          },
          {
            title: "SEVAA Annual Report 2023",
            description: "Activities and impact report for the year 2023 — 38 pages, 1.8 MB",
            badge: "2023",
          },
          {
            title: "SEVAA Annual Report 2022",
            description: "Detailed report of projects and initiatives in 2022 — 40 pages, 2.0 MB",
            badge: "2022",
          },
        ],
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
            link: "/",
          },
        ],
      },
    },
    {
      id: "training",
      type: "text",
      data: {
        heading: "Training, Festival and Sammelan",
        body: "<p>Each year SEVAA holds several training programmes and Sammelan or Festival for attracting and involving outside people in SEVAA activities.</p><h3>Training Programs</h3><p><strong>Lac Cultivation Training:</strong> Conducted thrice at Saparambera, making huge impact on the local community.</p><p><strong>Teachers' Training:</strong> Held thrice at Ukhra, significantly impacting local educational practices.</p><h3>Program Evaluation Festival (January 2023)</h3><p>A program evaluation team visited Saparambera, Ajodhya Hills, which evolved into a community festival where tribal people performed their traditional rituals, songs, and dances in celebration.</p><h3>First SEVAA Sammelan (January 28, 2024)</h3><p><strong>Venue:</strong> Maa Sarada Hall, Narendrapur R.K. Mission Lokshiksha Parishad<br/><strong>Inaugurated by:</strong> Hon'ble Principal Maharaj, Swami Ekachittanandaji<br/><strong>Chief Guest:</strong> Dr. Manas Ghosh<br/><strong>Sessions:</strong> About SEVAA, Health Awareness & SEVAA, Civil Society Organisation & SEVAA, Open Discussion<br/><strong>Closing:</strong> Presided by Swami Basavananda, Chief Guest Justice Rajarshi Bharadwaj</p>",
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
        heading: "SEVAA Associate Members Preview",
        subtitle: "15 dedicated associate members supporting our mission",
        columns: 4,
        items: [
          { title: "Associate Member 1", description: "Associate Member" },
          { title: "Associate Member 2", description: "Associate Member" },
          { title: "Associate Member 3", description: "Associate Member" },
          { title: "Associate Member 4", description: "Associate Member" },
          { title: "Associate Member 5", description: "Associate Member" },
          { title: "Associate Member 6", description: "Associate Member" },
          { title: "Associate Member 7", description: "Associate Member" },
          { title: "Associate Member 8", description: "Associate Member" },
          { title: "And 7 more...", description: "See Governance page for full list" },
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
      },
    },
  ],
};

// ============================================================
// Coming-soon pages
// ============================================================

const NEWS_BIRTHDAY_SECTIONS = comingSoon({ icon: "Cake", title: "Birthday Celebrations", subtitle: "Celebrating birthdays with children, staff and community at our schools and Vivekpally." });
const NEWS_INDEPENDENCE_SECTIONS = comingSoon({ icon: "Flag", title: "Independence Day Celebration", subtitle: "Independence Day celebrated with great enthusiasm at the TMSVV school with students and community participation." });
const NEWS_MEDIA_SECTIONS = comingSoon({ icon: "Newspaper", title: "Media Coverage", subtitle: "Press features, newspaper articles, and television coverage of SEVAA's work." });
const NEWS_RAKHI_SECTIONS = comingSoon({ icon: "Heart", title: "Rakhi Celebration", subtitle: "Celebrating Rakhi with children across our projects and Vivekpally village." });
const NEWS_TILKA_MURMU_SECTIONS = comingSoon({ icon: "School", title: "Inauguration of TMSVV", subtitle: "Historic inauguration of Tilka Murmu SEVAA Vano Vidyalay at Saparambera, Ajodhya Hills, Purulia on 9th-10th March 2025." });

const GALLERY_VIDEOS_SECTIONS = comingSoon({ icon: "Video", title: "Video Gallery", subtitle: "Videos from our community programs, school events, and cultural celebrations." });

const PUB_NOSTALGIC_SECTIONS = comingSoon({ icon: "BookOpen", title: "Nostalgic Narendrapur", subtitle: "An annual e-magazine featuring literary pieces and reports on SEVAA activities." });
const PUB_SAMMELAN_SECTIONS = comingSoon({ icon: "BookOpen", title: "Sevaa Sammelan 2023", subtitle: "Proceedings from the First SEVAA Sammelan held on 28th January 2024 at Maa Sarada Hall, Narendrapur." });
const PUB_SOUVENIR_SECTIONS = comingSoon({ icon: "BookOpen", title: "Sevaa Souvenir 2025", subtitle: "A commemorative souvenir documenting our journey, milestones, and achievements in 2025." });

const ARCHIVES_SECTIONS = comingSoon({ icon: "Archive", title: "Archives", subtitle: "Historical records and documentation from SEVAA's journey over the years." });
const ARCHIVES_GENERAL_SECTIONS = comingSoon({ icon: "Archive", title: "General Archives", subtitle: "General archival documents, reports, and records from SEVAA's activities." });
const ARCHIVES_PHOTOS_SECTIONS = comingSoon({ icon: "Image", title: "Project-wise Photos", subtitle: "Photo archives organized by project and location from SEVAA's community development work." });
const ARCHIVES_VIDEOS_SECTIONS = comingSoon({ icon: "Video", title: "Archive Videos", subtitle: "Video archives from SEVAA's events, programs, and community initiatives." });

const PROJ_ELACHI_SECTIONS = comingSoon({ icon: "Leaf", title: "Elachi Project", subtitle: "Our sustainable Elachi (cardamom) cultivation initiative combining traditional knowledge with modern farming for community livelihood." });
const PROJ_HEALTH_SECTIONS = comingSoon({ icon: "Heart", title: "Health Projects", subtitle: "Medical camps, telemedicine services, and health awareness programs for rural and tribal communities." });
const PROJ_LIVELIHOOD_SECTIONS = comingSoon({ icon: "Users", title: "Livelihood Projects", subtitle: "Sustainable livelihood programs including lac cultivation, organic farming, and skill development in Saparambera and other tribal areas." });
const PROJ_SAPARAMBERA_SECTIONS = comingSoon({ icon: "Home", title: "Saparambera - Birbaba", subtitle: "Birbaba Tilka Murmu Vivekpalli — a holistic village development model covering 52 families in Saparambera." });
const PROJ_UKHRA_SECTIONS = comingSoon({ icon: "BookOpen", title: "Ukhra Project", subtitle: "Ukhra Nabadisha — educational and community development project in West Burdwan's Ukhra village." });

const GI_SECTIONS = comingSoon({ icon: "HandHeart", title: "Get Involved", subtitle: "Discover various ways to contribute to SEVAA's mission — as a volunteer, member, friend, partner, or sponsor." });
const GI_ASSOC_SECTIONS = comingSoon({ icon: "UserPlus", title: "Become a Sevaa Associate Member", subtitle: "Join SEVAA as an associate member and be part of our extended community contributing to meaningful social change." });
const GI_FRIEND_SECTIONS = comingSoon({ icon: "Heart", title: "Become a Sevaa Friend", subtitle: "Become a Friend of SEVAA — supporting our mission through your goodwill and occasional contributions." });
const GI_PARTNER_SECTIONS = comingSoon({ icon: "Handshake", title: "Become a Sevaa Partner", subtitle: "Partner with SEVAA as an organization or institution to amplify our collective impact." });
const GI_CSR_SECTIONS = comingSoon({ icon: "Building", title: "CSR Opportunities", subtitle: "Corporate Social Responsibility opportunities with SEVAA — partner with us to create lasting social impact." });
const GI_SPONSOR_CHILD_SECTIONS = comingSoon({ icon: "GraduationCap", title: "Sponsor a Child", subtitle: "Sponsor the education of a child at Tilka Murmu SEVAA Vano Vidyalay or one of our other schools." });
const GI_SPONSOR_MEAL_SECTIONS = comingSoon({ icon: "Utensils", title: "Sponsor Midday Meal", subtitle: "Sponsor nutritious midday meals for children at our schools and Vivekpally programs." });

const JOIN_US_SECTIONS = comingSoon({ icon: "Users", title: "Join Us", subtitle: "Join the SEVAA family — as a member, volunteer, sponsor, or partner. Together, we make a difference." });
const SUPPORT_SECTIONS = comingSoon({ icon: "HelpCircle", title: "How Can We Help You?", subtitle: "Find answers to common questions or get in touch with our support team." });
const SUPPORT_ACTIVITIES_SECTIONS = comingSoon({ icon: "HandHeart", title: "We Support Activities", subtitle: "SEVAA supports various community activities, relief efforts, and development initiatives." });
const PRIVACY_SECTIONS = comingSoon({ icon: "Shield", title: "Privacy Policy", subtitle: "Our privacy policy outlining how we collect, use, and protect your personal information." });
const TERMS_SECTIONS = comingSoon({ icon: "ScrollText", title: "Terms of Service", subtitle: "Our terms and conditions that govern your use of our website and services." });

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
      console.log(`  - ${page.slug}: already has content, skipping`);
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
