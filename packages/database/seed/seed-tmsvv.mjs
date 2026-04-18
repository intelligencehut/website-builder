#!/usr/bin/env node
/**
 * Seeds the Tilka Murmu SEVAA Vano Vidyalay (tmsvv.sevaa.net) site into
 * the website-builder.
 *
 *  - Inserts site row (with Vercel deploy hook URL placeholder)
 *  - Grants sevaa.web@gmail.com owner role
 *  - Inserts 22 pages
 *  - Seeds initial published content_versions extracted verbatim from the
 *    site's previous hardcoded pages.
 *
 * Run from repo root:
 *   SUPABASE_SERVICE_ROLE_KEY='<key>' node packages/database/seed/seed-tmsvv.mjs
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

const TMSVV_SITE_ID = "a0000000-0000-0000-0000-000000000004";

const PAGES = [
  { id: "e0000000-0000-0000-0000-000000000001", slug: "/", title: "Home", page_type: "home", sort_order: 0 },
  { id: "e0000000-0000-0000-0000-000000000002", slug: "/about", title: "About", page_type: "static", sort_order: 1 },
  { id: "e0000000-0000-0000-0000-000000000003", slug: "/about/genesis", title: "Our Genesis", page_type: "static", sort_order: 2 },
  { id: "e0000000-0000-0000-0000-000000000004", slug: "/about/mission", title: "Mission & Vision", page_type: "static", sort_order: 3 },
  { id: "e0000000-0000-0000-0000-000000000005", slug: "/about/team", title: "Our Team", page_type: "team", sort_order: 4 },
  { id: "e0000000-0000-0000-0000-000000000006", slug: "/about/vivekpally", title: "Vivekpally", page_type: "static", sort_order: 5 },
  { id: "e0000000-0000-0000-0000-000000000007", slug: "/academics", title: "Academics", page_type: "static", sort_order: 6 },
  { id: "e0000000-0000-0000-0000-000000000008", slug: "/admissions", title: "Admissions", page_type: "static", sort_order: 7 },
  { id: "e0000000-0000-0000-0000-000000000009", slug: "/admissions/apply", title: "Apply for Admission", page_type: "static", sort_order: 8 },
  { id: "e0000000-0000-0000-0000-00000000000a", slug: "/admissions/process", title: "Admission Process", page_type: "static", sort_order: 9 },
  { id: "e0000000-0000-0000-0000-00000000000b", slug: "/causes", title: "Our Causes", page_type: "static", sort_order: 10 },
  { id: "e0000000-0000-0000-0000-00000000000c", slug: "/contact", title: "Contact", page_type: "static", sort_order: 11 },
  { id: "e0000000-0000-0000-0000-00000000000d", slug: "/donate", title: "Donate", page_type: "static", sort_order: 12 },
  { id: "e0000000-0000-0000-0000-00000000000e", slug: "/gallery", title: "Gallery", page_type: "gallery", sort_order: 13 },
  { id: "e0000000-0000-0000-0000-00000000000f", slug: "/news", title: "News & Events", page_type: "news", sort_order: 14 },
  { id: "e0000000-0000-0000-0000-000000000010", slug: "/privacy", title: "Privacy Policy", page_type: "static", sort_order: 15 },
  { id: "e0000000-0000-0000-0000-000000000011", slug: "/projects/elachi", title: "Elachi Project", page_type: "project", sort_order: 16 },
  { id: "e0000000-0000-0000-0000-000000000012", slug: "/projects/ukra", title: "Ukra Project", page_type: "project", sort_order: 17 },
  { id: "e0000000-0000-0000-0000-000000000013", slug: "/publications", title: "Publications", page_type: "publication", sort_order: 18 },
  { id: "e0000000-0000-0000-0000-000000000014", slug: "/reports", title: "Annual Reports", page_type: "static", sort_order: 19 },
  { id: "e0000000-0000-0000-0000-000000000015", slug: "/support", title: "Support Us", page_type: "static", sort_order: 20 },
  { id: "e0000000-0000-0000-0000-000000000016", slug: "/terms", title: "Terms of Service", page_type: "static", sort_order: 21 },
];

// ============================================================
// Section content (verbatim from previous hardcoded pages)
// ============================================================

const GALLERY_IMAGES = [
  {
    src: "/images/gallery/community-meeting.jpg",
    alt: "SEVAA community meeting in Saparambera village with villagers gathered for awareness programs",
    caption: "Community Awareness Programs",
  },
  {
    src: "/images/gallery/training-program.jpg",
    alt: "Children and villagers participating in SEVAA's livelihood development training programs",
    caption: "Livelihood Development Training",
  },
  {
    src: "/images/gallery/indoor-meeting.jpg",
    alt: "SEVAA team and community members in planning and discussion meetings",
    caption: "Community Planning Sessions",
  },
  {
    src: "/images/gallery/group-photo.jpg",
    alt: "SEVAA team with community members including spiritual leaders and village representatives",
    caption: "Community Partnership",
  },
];

// ---- Home (/) ----
const HOME_SECTIONS = {
  sections: [
    {
      id: "hero",
      type: "hero",
      data: {
        eyebrow: "Inaugurating on 9th & 10th March 2025",
        heading: "Welcome to",
        headingHighlight: "Tilka Murmu SEVAA Vano Vidyalay",
        subtitle: "Forest School at Saparambera, Ajodhya Hills, Purulia",
        description:
          "A forest school where children learn through nature, play, and discovery.",
        primaryCta: { label: "Apply for Admission", href: "/admissions/apply" },
        secondaryCta: { label: "Learn More", href: "/about" },
      },
    },
    {
      id: "unique-approach",
      type: "cards-grid",
      data: {
        eyebrow: "What Makes Us Unique",
        heading: "Our Forest School Approach",
        subtitle:
          "Combining traditional knowledge with modern education in the heart of nature",
        columns: 3,
        items: [
          {
            icon: "BookOpen",
            iconColor: "primary",
            title: "Local-Language Curriculum",
            description:
              "Forest school with local language and knowledge-based curriculum.",
          },
          {
            icon: "Leaf",
            iconColor: "secondary",
            title: "Nature & Culture",
            description:
              "Nature study, gardening, and cultural exploration.",
          },
          {
            icon: "Trees",
            iconColor: "primary",
            title: "Open Classes Under Trees",
            description:
              "Open classes under trees and modern learning with AV tools.",
          },
          {
            icon: "Monitor",
            iconColor: "gold",
            title: "Digital Classrooms",
            description: "Digital classroom facilities for interactive learning.",
          },
          {
            icon: "Activity",
            iconColor: "red",
            title: "Community Health Center",
            description:
              "On-site health center serving students and the village.",
          },
          {
            icon: "PartyPopper",
            iconColor: "copper",
            title: "Children's Park",
            description:
              "A dedicated play space for children to learn through play.",
          },
        ],
      },
    },
    {
      id: "vivekpally",
      type: "feature-highlight",
      data: {
        eyebrow: "Birbaba Tilka Murmu Vivekpalli",
        heading: "Empowering the community since April 2022",
        description:
          "The school is part of SEVAA's holistic village development approach in Saparambera. Vivekpally serves all 52 families in the village with comprehensive programs. Before SEVAA's intervention, Saparambera had no school, electricity, proper livelihood, or roads.",
        items: [
          "Education",
          "Health",
          "Livelihood",
          "Emergency Relief",
          "Culture",
          "Environment",
        ],
      },
    },
    {
      id: "community-work",
      type: "gallery",
      data: {
        eyebrow: "From the Ground",
        heading: "SEVAA's Work in Saparambera",
        subtitle:
          "Authentic photos from our community development programs in Saparambera village, where Tilka Murmu SEVAA Vano Vidyalay is being established.",
        images: GALLERY_IMAGES,
      },
    },
    {
      id: "inauguration",
      type: "cta",
      data: {
        heading: "Grand Inauguration Event",
        description:
          "9th & 10th March 2025 at Saparambera, Ajodhya Hills, Purulia. Chief Guests: Sri Biplab Roy Chowdhury, Hon'ble MoS, Govt. of West Bengal and Smt. Sandhyarani Tudu, Hon'ble MoS, Govt. of West Bengal.",
        background: "terracotta",
        primaryCta: { label: "View Event Details", href: "/news" },
      },
    },
    {
      id: "partners",
      type: "partners",
      data: {
        heading: "Our Partners in Education",
        subtitle:
          "A collaborative effort to bring quality education to rural Bengal",
        background: "cream",
        items: [
          {
            name: "SEVAA",
            description:
              "Society for Envisioning Vivekananda in Awareness and Action (SEVAA), Kolkata",
          },
          {
            name: "BTMV",
            description:
              "Birbaba Tilka Murmu Vivekpally (BTMV), Saparambera, Purulia",
          },
        ],
      },
    },
    {
      id: "support",
      type: "cta",
      data: {
        heading: "Support Our Mission",
        description:
          "Your generous support can help us enhance learning opportunities, improve facilities, and provide essential resources to ensure every child reaches their full potential.",
        background: "dark",
        primaryCta: { label: "Make a Donation", href: "/donate", icon: "Heart" },
        secondaryCta: { label: "Get Involved", href: "/contact" },
      },
    },
  ],
};

// ---- About (/about) ----
const ABOUT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Trees",
        title: "About Tilka Murmu SEVAA Vano Vidyalay",
        subtitle:
          "A forest school where children learn through nature, play, and discovery",
        highlights: [
          { icon: "MapPin", text: "Saparambera, Ajodhya Hills" },
          { icon: "Calendar", text: "Inaugurating 9th & 10th March 2025" },
        ],
      },
    },
    {
      id: "vision",
      type: "text",
      data: {
        heading: "Our Forest School Vision",
        body: "<p>Tilka Murmu SEVAA Vano Vidyalay represents a revolutionary approach to education in rural West Bengal. Located in the pristine Ajodhya Hills of Saparambera village, our forest school combines the wisdom of nature with modern educational practices.</p><p>Named after the great tribal leader Tilka Murmu, our school honors the indigenous knowledge systems while preparing children for the contemporary world. We believe that learning happens best when children are connected to their environment, community, and cultural roots.</p><p><em>Our Core Philosophy:</em> \"Education should be a natural process carried out by the child within the community, drawing from the environment and cultural heritage, not by listening to words but by experiences upon the environment.\"</p>",
      },
    },
    {
      id: "approach",
      type: "cards-grid",
      data: {
        heading: "Our Educational Approach",
        subtitle:
          "A holistic methodology that integrates nature, culture, and modern learning",
        background: "cream",
        columns: 3,
        items: [
          {
            icon: "BookOpen",
            iconColor: "primary",
            title: "Local-Language Curriculum",
            description:
              "Forest school with local language and knowledge-based curriculum.",
          },
          {
            icon: "Leaf",
            iconColor: "secondary",
            title: "Nature & Culture",
            description: "Nature study, gardening, and cultural exploration.",
          },
          {
            icon: "Trees",
            iconColor: "primary",
            title: "Open Classes Under Trees",
            description: "Open classes under trees and modern learning with AV tools.",
          },
          {
            icon: "Monitor",
            iconColor: "gold",
            title: "Digital Classrooms",
            description: "Digital classroom facilities for interactive learning.",
          },
          {
            icon: "Activity",
            iconColor: "red",
            title: "Community Health Center",
            description:
              "On-site health center serving students and the village.",
          },
          {
            icon: "PartyPopper",
            iconColor: "copper",
            title: "Children's Park",
            description:
              "A dedicated play space for children to learn through play.",
          },
        ],
      },
    },
    {
      id: "community-impact",
      type: "feature-highlight",
      data: {
        eyebrow: "Community Impact in Saparambera",
        heading: "Our school is part of SEVAA's comprehensive village development initiative",
        description:
          "Birbaba Tilka Murmu Vivekpalli. Established in April 2022, serving all 52 families in Saparambera village through comprehensive development programs. Before SEVAA's intervention, Saparambera had no school, electricity, proper livelihood opportunities, or roads. Today, it's a model for sustainable rural development.",
        items: [
          "Education",
          "Health",
          "Livelihood",
          "Emergency Relief",
          "Culture",
          "Environment",
        ],
      },
    },
    {
      id: "land-donors",
      type: "text",
      data: {
        heading: "Community Generosity",
        body: "<p>The school stands on land generously donated by eight families from Saparambera village, demonstrating the community's commitment to education and progress.</p><p><strong>Land Donors:</strong> Nimai Sing Sardar, Mahen Sing Sardar, Pratima Sardar, Duti Sardar, Laxman Sardar, Sukanti Sardar, Ranjit Sardar, Sagar Sardar.</p><p>We are deeply grateful to these families for their generous contribution to education and community development.</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Join Our Educational Mission",
        description:
          "Be part of transforming education in rural Bengal through our innovative forest school approach.",
        background: "terracotta",
        primaryCta: { label: "Learn How to Get Involved", href: "/contact" },
        secondaryCta: { label: "Support Our Mission", href: "/donate", icon: "Heart" },
      },
    },
  ],
};

// ---- Contact (/contact) ----
const CONTACT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Phone",
        title: "Contact Us",
        subtitle:
          "We'd love to hear from you. Reach out for admissions, donations, or general inquiries.",
      },
    },
    {
      id: "info",
      type: "contact",
      data: {
        heading: "Get in Touch",
        email: "contact@sevaaa.org",
        phone: "+91 XXXXXXXXXX",
        address:
          "Tilka Murmu SEVAA Vano Vidyalay, Village Saparambera, Ajodhya Hills, District Purulia, West Bengal, India",
        body: "<p><strong>Office Hours:</strong> Monday – Saturday, 9:00 AM – 5:00 PM</p><p><strong>How to Reach:</strong> The school is located in the scenic Ajodhya Hills area of Purulia district. The nearest major town is Purulia, which is well-connected by road and rail.</p><p><em>Note:</em> Please contact us before visiting to arrange for local transportation from Purulia as the village is in a remote forest area.</p>",
      },
    },
    {
      id: "partners",
      type: "partners",
      data: {
        heading: "Partner Organizations",
        background: "cream",
        items: [
          {
            name: "SEVAA (Primary Organization)",
            description:
              "Society for Envisioning Vivekananda in Awareness and Action (SEVAA), Kolkata. Website: https://sevaaa.org",
          },
          {
            name: "BTMV (Local Partner)",
            description:
              "Birbaba Tilka Murmu Vivekpally (BTMV), Saparambera, Purulia — village organization managing local operations.",
          },
        ],
      },
    },
    {
      id: "inauguration",
      type: "cta",
      data: {
        heading: "Grand Inauguration Event",
        description:
          "9th & 10th March 2025 — Join us for the inaugural ceremony at our campus. Chief Guests: Sri Biplab Roy Chowdhury, Hon'ble MoS, Govt. of West Bengal and Smt. Sandhyarani Tudu, Hon'ble MoS, Govt. of West Bengal.",
        background: "terracotta",
        primaryCta: { label: "View Event Details", href: "/news" },
      },
    },
  ],
};

// ---- Donate (/donate) ----
const DONATE_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Heart",
        title: "Support Our Mission",
        subtitle:
          "Help us provide quality forest-based education to children in Saparambera",
      },
    },
    {
      id: "appeal",
      type: "text",
      data: {
        heading: "An Appeal to Donate",
        body: "<p>Your generous support can help us enhance learning opportunities, improve facilities, and provide essential resources to ensure every child reaches their full potential.</p><p>Every contribution, big or small, makes a difference in shaping young minds and building a brighter future. Join us in this mission by making a donation today.</p><p>Thank you for your kindness and generosity!</p><p><em>With gratitude,<br/>SEVAA &amp; BTMV</em></p>",
      },
    },
    {
      id: "bank",
      type: "bank-details",
      data: {
        heading: "Bank Transfer Details",
        beneficiaryName: "SEVAA",
        bankName: "INDIAN BANK",
        accountNumber: "7103506260",
        ifscCode: "IDIB000K777",
        note:
          "Please mention 'Tilka Murmu School Donation' in the transaction remarks for proper allocation of your contribution.",
      },
    },
    {
      id: "impact",
      type: "list",
      data: {
        heading: "Your Impact",
        subtitle: "How your donation helps",
        items: [
          "Provide educational materials for 30 children",
          "Maintain digital classroom facilities",
          "Support teacher salaries and training",
          "Develop forest-based curriculum",
          "Provide nutritious meals for students",
          "Maintain health center facilities",
        ],
      },
    },
    {
      id: "supporters",
      type: "partners",
      data: {
        heading: "Our Supporters",
        subtitle: "Organizations supporting our cause",
        background: "cream",
        items: [
          {
            name: "BOGD – Antorik",
            description: "Bengali Organisation of Greater Dallas, TX, USA",
          },
          {
            name: "BCAA",
            description: "Bengali Cultural Association of Arizona, USA",
          },
          {
            name: "Service Place of Arizona",
            description: "Non-profit organization partner",
          },
          {
            name: "Pratham Housing Complex",
            description: "Kolkata",
          },
        ],
      },
    },
    {
      id: "land-donors",
      type: "list",
      data: {
        heading: "Land Donors",
        subtitle: "We are grateful to these 8 villagers who generously donated their land",
        items: [
          "Shri Ganesh Murmu",
          "Shri Sudhir Murmu",
          "Shri Joysing Murmu",
          "Shri Jamiswar Murmu",
          "Shri Matal Murmu",
          "Shri Buddhadeb Murmu",
          "Shri Laldeb Murmu",
          "Shri Maheswar Murmu",
        ],
      },
    },
    {
      id: "help",
      type: "text",
      data: {
        heading: "Need Help with Donation?",
        body: "<p>For any queries regarding donations or to confirm your contribution, please contact us:</p><p><strong>Email:</strong> contact@sevaaa.org<br/><strong>Call:</strong> [Phone number to be added]</p><p><em>Note: Contact details are placeholder and will be updated with actual information.</em></p>",
      },
    },
  ],
};

// ---- Coming-soon page helper ----
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

const GENESIS_SECTIONS = comingSoon({ icon: "Sparkles", title: "Our Genesis", subtitle: "Discover the inspiring story behind the founding of our forest school and how our journey began in the heart of Ajodhya Hills.", expected: "April 2025" });
const MISSION_SECTIONS = comingSoon({ icon: "Target", title: "Mission & Vision", subtitle: "Our mission to provide quality forest-based education and our vision for empowering tribal communities through nature-centered learning.", expected: "April 2025" });
const TEAM_SECTIONS = comingSoon({ icon: "Users", title: "Our Team", subtitle: "Meet the passionate educators, administrators, and community leaders who are making our forest school vision a reality.", expected: "May 2025" });
const VIVEKPALLY_SECTIONS = comingSoon({ icon: "Home", title: "Birbaba Tilka Murmu Vivekpally", subtitle: "Our comprehensive community development program serving all 52 families in Saparambera village through education, health, livelihood, and cultural initiatives.", expected: "April 2025" });
const ACADEMICS_SECTIONS = comingSoon({ icon: "GraduationCap", title: "Academic Programs", subtitle: "Our unique forest school approach combining traditional knowledge with modern education in the heart of nature.", expected: "February 2025" });
const ADMISSIONS_SECTIONS = comingSoon({ icon: "FileText", title: "Admissions", subtitle: "Information about our admission process, requirements, and how to apply for the upcoming academic year at our forest school.", expected: "January 2025" });
const ADMISSIONS_APPLY_SECTIONS = comingSoon({ icon: "Edit", title: "Apply for Admission", subtitle: "The online application form will be available here. Submit your child's application for admission to our forest school.", expected: "January 2025" });
const ADMISSIONS_PROCESS_SECTIONS = comingSoon({ icon: "ListChecks", title: "Admission Process", subtitle: "Step-by-step admission process, requirements, timeline, and how to successfully enroll your child in our forest school program.", expected: "January 2025" });
const CAUSES_SECTIONS = comingSoon({ icon: "Heart", title: "Our Causes", subtitle: "The environmental and educational causes that inspire our work in creating a sustainable forest school for tribal communities.", expected: "March 2025" });
const GALLERY_SECTIONS = comingSoon({ icon: "ImageIcon", title: "Photo Gallery", subtitle: "Browse through our collection of photos capturing the vibrant life and learning experiences at our forest school.", expected: "February 2025" });
const NEWS_SECTIONS = comingSoon({ icon: "Newspaper", title: "News & Events", subtitle: "Stay connected with the latest updates, announcements, and upcoming events related to our forest school and community programs.", expected: "March 2025" });
const PRIVACY_SECTIONS = comingSoon({ icon: "Shield", title: "Privacy Policy", subtitle: "Our comprehensive privacy policy outlining how we collect, use, and protect your personal information when you interact with our website and services.", expected: "February 2025" });
const ELACHI_SECTIONS = comingSoon({ icon: "Leaf", title: "Elachi Project", subtitle: "Our sustainable Elachi (cardamom) cultivation initiative that combines traditional farming knowledge with modern techniques for community development.", expected: "June 2025" });
const UKRA_SECTIONS = comingSoon({ icon: "Leaf", title: "Ukra Project", subtitle: "Our sustainable Ukra cultivation initiative that promotes organic farming practices and provides nutritional support to our forest school community.", expected: "June 2025" });
const PUBLICATIONS_SECTIONS = comingSoon({ icon: "BookOpen", title: "Publications & Research", subtitle: "Our research papers, educational materials, and publications related to forest-based education and tribal community development.", expected: "May 2025" });
const REPORTS_SECTIONS = comingSoon({ icon: "FileBarChart", title: "Reports & Documentation", subtitle: "Our annual reports, progress updates, and other important documentation related to our forest school initiative.", expected: "April 2025" });
const SUPPORT_SECTIONS = comingSoon({ icon: "HandHeart", title: "Support Our Mission", subtitle: "Discover various ways to support our forest school initiative and help us provide quality education to tribal communities.", expected: "March 2025" });
const TERMS_SECTIONS = comingSoon({ icon: "ScrollText", title: "Terms of Service", subtitle: "Our terms and conditions that govern your use of our website and services. Please review these terms carefully.", expected: "February 2025" });

const PAGE_CONTENT = {
  "e0000000-0000-0000-0000-000000000001": HOME_SECTIONS,
  "e0000000-0000-0000-0000-000000000002": ABOUT_SECTIONS,
  "e0000000-0000-0000-0000-000000000003": GENESIS_SECTIONS,
  "e0000000-0000-0000-0000-000000000004": MISSION_SECTIONS,
  "e0000000-0000-0000-0000-000000000005": TEAM_SECTIONS,
  "e0000000-0000-0000-0000-000000000006": VIVEKPALLY_SECTIONS,
  "e0000000-0000-0000-0000-000000000007": ACADEMICS_SECTIONS,
  "e0000000-0000-0000-0000-000000000008": ADMISSIONS_SECTIONS,
  "e0000000-0000-0000-0000-000000000009": ADMISSIONS_APPLY_SECTIONS,
  "e0000000-0000-0000-0000-00000000000a": ADMISSIONS_PROCESS_SECTIONS,
  "e0000000-0000-0000-0000-00000000000b": CAUSES_SECTIONS,
  "e0000000-0000-0000-0000-00000000000c": CONTACT_SECTIONS,
  "e0000000-0000-0000-0000-00000000000d": DONATE_SECTIONS,
  "e0000000-0000-0000-0000-00000000000e": GALLERY_SECTIONS,
  "e0000000-0000-0000-0000-00000000000f": NEWS_SECTIONS,
  "e0000000-0000-0000-0000-000000000010": PRIVACY_SECTIONS,
  "e0000000-0000-0000-0000-000000000011": ELACHI_SECTIONS,
  "e0000000-0000-0000-0000-000000000012": UKRA_SECTIONS,
  "e0000000-0000-0000-0000-000000000013": PUBLICATIONS_SECTIONS,
  "e0000000-0000-0000-0000-000000000014": REPORTS_SECTIONS,
  "e0000000-0000-0000-0000-000000000015": SUPPORT_SECTIONS,
  "e0000000-0000-0000-0000-000000000016": TERMS_SECTIONS,
};

// ============================================================
// Runner
// ============================================================

async function upsertSite() {
  const { error } = await supabase.from("sites").upsert(
    {
      id: TMSVV_SITE_ID,
      name: "Tilka Murmu SEVAA Vano Vidyalay",
      slug: "tmsvv",
      domain: "tmsvv.sevaa.net",
      metadata: {
        platform: "tmsvv",
        description:
          "Forest school at Saparambera, Ajodhya Hills, Purulia — a SEVAA & BTMV initiative.",
        preview_url: "https://tmsvv.sevaa.net",
        stage_domain: "",
        available_slots: [],
        seo: {
          title: "Tilka Murmu SEVAA Vano Vidyalay",
          description:
            "Tilka Murmu SEVAA Vano Vidyalay is a forest school at Saparambera, Ajodhya Hills, Purulia, offering nature-based education for children with modern facilities and traditional knowledge.",
          keywords:
            "Tilka Murmu, SEVAA, Vano Vidyalay, Forest School, Saparambera, Ajodhya Hills, Purulia, tribal education, West Bengal",
          og_image: "",
        },
        contact: {
          email: "contact@sevaaa.org",
          phone: "+91 XXXXXXXXXX",
          address:
            "Village Saparambera, Ajodhya Hills, District Purulia, West Bengal, India",
          email_secondary: "",
          phone_secondary: "",
        },
        deploy: { prod_hook_url: "", stage_hook_url: "" },
      },
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(`site upsert: ${error.message}`);
  console.log("✓ tmsvv site upserted");
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
    { site_id: TMSVV_SITE_ID, user_id: user.id, role: "owner" },
    { onConflict: "site_id,user_id" }
  );
  if (error) throw new Error(`site_members upsert: ${error.message}`);
  console.log(`✓ sevaa.web@gmail.com granted owner on tmsvv (${user.id})`);
}

async function upsertPages() {
  const rows = PAGES.map((p) => ({
    id: p.id,
    site_id: TMSVV_SITE_ID,
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
  console.log("Seeding tmsvv into website-builder...\n");
  await upsertSite();
  await grantSevaaWebAccess();
  await upsertPages();
  console.log("\nSeeding page content...");
  await seedContent();
  console.log("\n✓ tmsvv seed complete");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
