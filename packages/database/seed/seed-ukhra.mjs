#!/usr/bin/env node
/**
 * Seeds the SEVAA Ukhra site into website-builder.
 * - Inserts site row
 * - Grants sevaa.web@gmail.com owner role
 * - Inserts all pages
 * - Inserts initial content_versions for each page (rich section data)
 *
 * Run from repo root:
 *   cd apps/admin && node ../../packages/database/seed/seed-ukhra.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const UKHRA_SITE_ID = "a0000000-0000-0000-0000-000000000003";

const PAGES = [
  { id: "d0000000-0000-0000-0000-000000000001", slug: "/", title: "Home", page_type: "home", sort_order: 0 },
  { id: "d0000000-0000-0000-0000-000000000002", slug: "/about", title: "About", page_type: "static", sort_order: 1 },
  { id: "d0000000-0000-0000-0000-000000000003", slug: "/programs/nabadisha", title: "Ukhra Nabadisha", page_type: "project", sort_order: 2 },
  { id: "d0000000-0000-0000-0000-000000000004", slug: "/programs/smart-class", title: "SMART Class", page_type: "project", sort_order: 3 },
  { id: "d0000000-0000-0000-0000-000000000005", slug: "/programs/joy-box", title: "Joy Box Programme", page_type: "project", sort_order: 4 },
  { id: "d0000000-0000-0000-0000-000000000006", slug: "/programs/health-workshop", title: "Health Workshop", page_type: "project", sort_order: 5 },
  { id: "d0000000-0000-0000-0000-000000000007", slug: "/programs/environment", title: "Environmental Work", page_type: "project", sort_order: 6 },
  { id: "d0000000-0000-0000-0000-000000000008", slug: "/donate", title: "Donate", page_type: "static", sort_order: 7 },
  { id: "d0000000-0000-0000-0000-000000000009", slug: "/contact", title: "Contact", page_type: "static", sort_order: 8 },
  { id: "d0000000-0000-0000-0000-00000000000a", slug: "/gallery", title: "Gallery", page_type: "gallery", sort_order: 9 },
  { id: "d0000000-0000-0000-0000-00000000000b", slug: "/news", title: "News & Events", page_type: "news", sort_order: 10 },
  { id: "d0000000-0000-0000-0000-00000000000c", slug: "/support", title: "Support Us", page_type: "static", sort_order: 11 },
  { id: "d0000000-0000-0000-0000-00000000000d", slug: "/privacy", title: "Privacy Policy", page_type: "static", sort_order: 12 },
  { id: "d0000000-0000-0000-0000-00000000000e", slug: "/terms", title: "Terms of Use", page_type: "static", sort_order: 13 },
];

// ============================================================
// Section content authored from sevaa/ukhra/src
// ============================================================

const GALLERY_IMAGES = [
  { src: "/images/projects/ukhra 20.jpg", alt: "Ukhra educational activity", caption: "Educational activities at Ukhra" },
  { src: "/images/projects/ukhra 21.jpg", alt: "Ukhra community program", caption: "Community development program" },
  { src: "/images/projects/ukhra 22.jpg", alt: "Ukhra school session", caption: "Learning sessions at Ukhra schools" },
  { src: "/images/projects/ukhra 23.jpg", alt: "Students at Ukhra", caption: "Students participating in activities" },
  { src: "/images/projects/ukhra 24.jpg", alt: "Ukhra classroom activities", caption: "Classroom activities in progress" },
  { src: "/images/projects/ukhra 25.jpg", alt: "Community engagement at Ukhra", caption: "Community engagement and events" },
  { src: "/images/projects/ukhra 26.jpg", alt: "Ukhra program activities", caption: "Program activities at Ukhra" },
  { src: "/images/projects/ukhra 27.jpg", alt: "Ukhra students learning", caption: "Students engaged in learning" },
  { src: "/images/projects/ukhra 28.jpg", alt: "Ukhra community event", caption: "Community event at Ukhra" },
  { src: "/images/projects/ukhra 30.jpg", alt: "Ukhra development activities", caption: "Development activities in Ukhra" },
  { src: "/images/projects/ukhra 32.jpg", alt: "Ukhra educational initiative", caption: "Educational initiatives at Ukhra" },
  { src: "/images/projects/ukhra 33.jpg", alt: "Ukhra school program", caption: "School program activities" },
  { src: "/images/projects/ukhra 34.jpg", alt: "Ukhra project activities", caption: "Project activities in Ukhra village" },
];

const HOME_SECTIONS = {
  sections: [
    {
      id: "hero",
      type: "hero",
      data: {
        eyebrow: "A SEVAA Initiative in Paschim Bardhaman",
        heading: "Transforming Education",
        headingHighlight: "in Ukhra",
        description: "Empowering education and community development in Ukhra village, Paschim Bardhaman",
        primaryCta: { label: "Explore Our Programs", href: "/programs/nabadisha" },
        secondaryCta: { label: "Learn More", href: "/about" },
        highlights: [
          { icon: "MapPin", text: "Ukhra, Paschim Bardhaman" },
          { icon: "Users", text: "~900 children" },
          { icon: "BookOpen", text: "5 primary schools and 1 girls' high school" },
        ],
        images: [
          { src: "/images/projects/ukhra 20.jpg", alt: "Students at Ukhra school" },
          { src: "/images/projects/ukhra 26.jpg", alt: "Community program in Ukhra" },
          { src: "/images/projects/ukhra 24.jpg", alt: "Educational activities in Ukhra" },
          { src: "/images/projects/ukhra 25.jpg", alt: "Ukhra community engagement" },
        ],
      },
    },
    {
      id: "challenges",
      type: "cards-grid",
      data: {
        eyebrow: "Why We Work Here",
        heading: "Challenges in Ukhra",
        subtitle: "Despite its rich cultural heritage with ancient akharas and temples, Ukhra faces critical developmental challenges",
        columns: 4,
        items: [
          { icon: "BookOpen", iconColor: "primary", title: "Education Quality", stat: "50%", description: "children lack proper reading ability" },
          { icon: "Activity", iconColor: "red", title: "Health Awareness", stat: "Limited", description: "preventive care knowledge among residents" },
          { icon: "TreePine", iconColor: "secondary", title: "Environmental", stat: "Coal Mining", description: "causing soil degradation and deforestation" },
          { icon: "Droplets", iconColor: "blue", title: "Infrastructure", stat: "Flooding", description: "poor drainage in this century-old settlement" },
        ],
      },
    },
    {
      id: "programs",
      type: "programs-grid",
      data: {
        eyebrow: "Our Response",
        heading: "SEVAA Ukhra Initiatives",
        subtitle: "A comprehensive approach to community development through education, health, and environmental initiatives",
        background: "warm",
        items: [
          {
            href: "/programs/nabadisha",
            icon: "BookOpen",
            iconColor: "primary",
            title: "Ukhra Nabadisha",
            description: "A comprehensive educational project covering 5 primary schools and 1 girls' high school, reaching approximately 900 children in the village.",
            image: "/images/projects/ukhra 21.jpg",
          },
          {
            href: "/programs/smart-class",
            icon: "Monitor",
            iconColor: "gold",
            title: "SMART Class",
            description: "For the first time, SEVAA introduced digital education during regular school hours. The SMART room in the girls' school was equipped with new technology.",
            image: "/images/projects/ukhra 33.jpg",
          },
          {
            href: "/programs/joy-box",
            icon: "Music",
            iconColor: "copper",
            title: "Joy Box Programme",
            description: "A portable Audio Visual unit designed to make learning engaging and interactive for children across schools.",
            image: "/images/projects/ukhra 27.jpg",
          },
          {
            href: "/programs/health-workshop",
            icon: "Activity",
            iconColor: "red",
            title: "Health Workshop",
            description: "Free health workshops organized in Ukhra in partnership with Service Place, bringing preventive care, vision screening, and basic health checkups directly to schoolchildren and the community.",
            image: "/images/projects/health-workshop-1.jpeg",
          },
          {
            href: "/programs/environment",
            icon: "TreePine",
            iconColor: "secondary",
            title: "Environmental Work",
            description: "Addressing environmental challenges through tree plantation and community awareness programs.",
            image: "/images/projects/ukhra 34.jpg",
          },
        ],
      },
    },
    {
      id: "impact",
      type: "stats",
      data: {
        heading: "Our Impact in Numbers",
        subtitle: "Measurable outcomes driving real change in the community",
        background: "dark",
        items: [
          { icon: "Users", value: "~900", label: "Children Reached" },
          { icon: "GraduationCap", value: "6", label: "Schools Covered" },
          { icon: "Lightbulb", value: "5", label: "Ongoing Initiatives" },
          { icon: "Music", value: "100", label: "Festival Participants" },
        ],
      },
    },
    {
      id: "winter-festival",
      type: "feature-highlight",
      data: {
        eyebrow: "Special Event",
        heading: "Winter Service Creation Festival",
        description: "In December 2023, when schools were closed, SEVAA organized a creative festival for 100 backward students from Nabadisha schools.",
        items: [
          "Music and dance workshops",
          "Drawing and painting sessions",
          "Recitation and drama activities",
          "10-day intensive program",
          "Community feast and gift distribution",
        ],
        image: "/images/projects/ukhra 32.jpg",
        imageCaption: "100 Students — 10-day intensive creative program · December 2023",
      },
    },
    {
      id: "partners",
      type: "partners",
      data: {
        heading: "Our Partners",
        subtitle: "Collaborative efforts driving community transformation",
        background: "cream",
        items: [
          { name: "SEVAA", description: "Society for Envisioning Vivekananda in Awareness and Action (SEVAA), Kolkata" },
          { name: "Service Place", description: "Service Place has taken special steps to help SEVAA Ukhra in health matters and is implementing a telemedicine system through SEVAA." },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        eyebrow: "From the Ground",
        heading: "Glimpses from Ukhra",
        subtitle: "Moments from our educational programs and community activities",
        limit: 8,
        images: GALLERY_IMAGES.slice(0, 8),
        cta: { label: "View Full Gallery", href: "/gallery" },
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Support Our Mission",
        description: "Your generous support helps SEVAA continue its educational initiatives, SMART class programs, and community development work in Ukhra village.",
        background: "terracotta",
        primaryCta: { label: "Make a Donation", href: "/donate", icon: "Heart" },
        secondaryCta: { label: "Get Involved", href: "/contact" },
      },
    },
  ],
};

const ABOUT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "GraduationCap",
        title: "About SEVAA Ukhra",
        subtitle: "Empowering education and community development in Ukhra village, Paschim Bardhaman",
        highlights: [
          { icon: "MapPin", text: "Ukhra, Paschim Bardhaman" },
          { icon: "Users", text: "~900 children" },
        ],
      },
    },
    {
      id: "overview",
      type: "text",
      data: {
        heading: "About the Ukhra Project",
        body: "<p>Ukhra village is an ancient hamlet of Paschim Bardhaman. Rich in Shaivite-Shakta-Vaishnava akharas and temples, the village is not identified as a poor one, but SEVAA identified specific developmental challenges that needed to be addressed.</p><p>SEVAA's comprehensive survey found that despite the presence of more than 15 primary schools and 5 high schools, 50% of children lack proper reading ability and 80% struggle with writing skills. This alarming gap in educational quality became the catalyst for SEVAA's intervention.</p>",
        callout: {
          icon: "BookOpen",
          heading: "Our Approach",
          body: "SEVAA works across existing schools in Ukhra — 5 primary schools and 1 girls' high school — through innovative teaching methods, digital tools, creative programs, and community engagement, reaching approximately 900 children in the village.",
        },
      },
    },
    {
      id: "challenges",
      type: "cards-grid",
      data: {
        heading: "Challenges We Address",
        subtitle: "Understanding the unique developmental needs of this century-old semi-urban settlement",
        background: "cream",
        columns: 2,
        items: [
          { icon: "BookOpen", iconColor: "primary", title: "Education Quality", description: "Although there are more than 15 primary schools and 5 high schools, 50% of children lack proper reading ability and 80% struggle with writing skills." },
          { icon: "Activity", iconColor: "red", title: "Health Awareness", description: "Limited health awareness among residents, with common diseases like diabetes and hypertension being prevalent due to lack of preventive care knowledge." },
          { icon: "TreePine", iconColor: "secondary", title: "Environmental Challenges", description: "Rapid soil degradation and deforestation due to coal mining activities in the area, affecting the quality of life." },
          { icon: "Droplets", iconColor: "blue", title: "Infrastructure", description: "Poor drainage system causing flooding during monsoons due to inadequate water management in this century-old semi-urban settlement." },
        ],
      },
    },
    {
      id: "heritage",
      type: "text",
      data: {
        heading: "Cultural Heritage of Ukhra",
        subtitle: "An ancient hamlet with deep spiritual and cultural roots",
        body: "<p>Ukhra is an ancient hamlet rich in Shaivite-Shakta-Vaishnava akharas and temples. While the village is not identified as a poor one, SEVAA recognized that this cultural wealth was not translating into educational and developmental outcomes for its children.</p><p>The coal mining activities in the surrounding area have caused environmental degradation, while the century-old infrastructure struggles to meet modern needs. SEVAA's mission is to preserve this heritage while building a brighter future through education and community empowerment.</p>",
        style: "callout-warm",
      },
    },
    {
      id: "partners",
      type: "partners",
      data: {
        icon: "HeartHandshake",
        heading: "Our Partners",
        background: "cream",
        items: [
          { name: "SEVAA", description: "Society for Envisioning Vivekananda in Awareness and Action (SEVAA), Kolkata" },
          { name: "Service Place", description: "Service Place has taken special steps to help SEVAA Ukhra in health matters and is implementing a telemedicine system through SEVAA." },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Join Our Educational Mission",
        description: "Be part of transforming education for 900 children in Ukhra village.",
        background: "terracotta",
        primaryCta: { label: "Learn How to Get Involved", href: "/contact" },
        secondaryCta: { label: "Support Our Mission", href: "/donate", icon: "Heart" },
      },
    },
  ],
};

const programSections = (title, subtitle, description, objectives, objectivesHeading = "Program Objectives") => ({
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { icon: "GraduationCap", title, subtitle },
    },
    {
      id: "overview",
      type: "text",
      data: {
        heading: `About ${title}`,
        body: `<p>${description}</p>`,
      },
    },
    {
      id: "objectives",
      type: "list",
      data: {
        heading: objectivesHeading,
        items: objectives,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Support This Initiative",
        description: "Your support helps us reach more children through this programme.",
        background: "terracotta",
        primaryCta: { label: "Donate", href: "/donate", icon: "Heart" },
        secondaryCta: { label: "Get in Touch", href: "/contact" },
      },
    },
  ],
});

const NABADISHA_SECTIONS = programSections(
  "Ukhra Nabadisha",
  "A comprehensive educational project reaching ~900 children across 5 primary schools and 1 girls' high school",
  "Ukhra Nabadisha is a comprehensive educational project covering 5 primary schools and 1 girls' high school, reaching approximately 900 children in the village. Through innovative teaching methods and close collaboration with existing school structures, we are working to bridge the learning gap that leaves 50% of children struggling with reading and 80% with writing.",
  [
    "Develop quality reading ability among 100% children",
    "Enhance listening and speaking skills",
    "Foster observation skills and reasoning abilities",
    "Develop independent writing capabilities",
    "Encourage creativity among students",
  ]
);

const SMART_CLASS_SECTIONS = programSections(
  "SMART Class Initiative",
  "Digital education arrives in Ukhra schools",
  "For the first time, SEVAA introduced digital education during regular school hours. The SMART room in the girls' school was equipped with new technology to support interactive, tech-enabled learning for classes 11 and 12.",
  [
    "Advanced camera systems for interactive learning",
    "Two-way communication capabilities",
    "Focus on classes 11 and 12 students",
    "Integration with school curriculum",
  ],
  "Features"
);

const JOY_BOX_SECTIONS = programSections(
  "Joy Box Programme",
  "Portable Audio Visual learning for every classroom",
  "A portable Audio Visual unit designed to make learning engaging and interactive for children across schools. The Joy Box brings stories, puzzles, and vocabulary activities to students wherever they are.",
  [
    "Story listening sessions",
    "Visual problem-solving exercises",
    "Mind mapping for concept development",
    "Vocabulary enhancement activities",
  ],
  "Activities"
);

const HEALTH_WORKSHOP_SECTIONS = programSections(
  "Health Workshop",
  "Preventive care and vision screening for schoolchildren",
  "Free health workshops organized in Ukhra in partnership with Service Place, bringing preventive care, vision screening, and basic health checkups directly to schoolchildren and the community. A recurring initiative — repeated at intervals based on need.",
  [
    "Vision screening with standardized eye charts",
    "General health checkups and vital signs monitoring",
    "Student registration and medical records",
    "Health awareness for children and parents",
    "Distribution of basic medical essentials",
  ],
  "Activities"
);

const ENVIRONMENT_SECTIONS = programSections(
  "Environmental Initiatives",
  "Tree plantation and awareness for a greener Ukhra",
  "Addressing environmental challenges through tree plantation and community awareness programs. SEVAA's long-term sustainability focus includes restoring green cover around water bodies impacted by coal mining in the area.",
  [
    "Tree plantation festival in 2023",
    "Saplings planted along water bodies",
    "Community environmental awareness",
    "Long-term sustainability focus",
  ],
  "Actions"
);

const DONATE_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: {
        icon: "Heart",
        title: "Support SEVAA Ukhra",
        subtitle: "Your generous support helps us continue educational initiatives, SMART class programs, and community development work in Ukhra village.",
      },
    },
    {
      id: "bank",
      type: "bank-details",
      data: {
        heading: "Donate via Bank Transfer",
        beneficiaryName: "SEVAA",
        bankName: "INDIAN BANK",
        accountNumber: "7103506260",
        ifscCode: "IDIB000K777",
        note: "Please mention 'Ukhra' in the transfer remarks so we can route your contribution to the Ukhra initiative.",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Other Ways to Help",
        description: "Reach out to discuss volunteer opportunities, in-kind donations, or partnerships.",
        background: "terracotta",
        primaryCta: { label: "Contact Us", href: "/contact" },
      },
    },
  ],
};

const CONTACT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { icon: "Heart", title: "Contact Us", subtitle: "Get in touch with the SEVAA Ukhra team" },
    },
    {
      id: "info",
      type: "contact",
      data: {
        heading: "SEVAA Headquarters",
        email: "infosevaa@gmail.com",
        phone: "+91 98271 93272",
        address: "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal",
      },
    },
  ],
};

const GALLERY_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { icon: "BookOpen", title: "Gallery", subtitle: "Moments from SEVAA Ukhra programmes and events" },
    },
    {
      id: "grid",
      type: "gallery",
      data: {
        images: GALLERY_IMAGES,
      },
    },
  ],
};

const NEWS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { icon: "BookOpen", title: "News & Events", subtitle: "Updates from SEVAA Ukhra" },
    },
    {
      id: "coming-soon",
      type: "text",
      data: {
        heading: "Coming Soon",
        body: "<p>News and events updates from SEVAA Ukhra will appear here shortly. Check back soon for stories from the field.</p>",
      },
    },
  ],
};

const SUPPORT_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { icon: "Heart", title: "Support Us", subtitle: "Multiple ways to support SEVAA Ukhra" },
    },
    {
      id: "intro",
      type: "text",
      data: {
        heading: "How You Can Help",
        body: "<p>Whether through financial contributions, volunteering your time, or sharing our work with your network — every form of support helps us reach more children.</p>",
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Make a Donation",
        description: "Your contribution directly funds educational initiatives at Ukhra.",
        background: "terracotta",
        primaryCta: { label: "Donate Now", href: "/donate", icon: "Heart" },
        secondaryCta: { label: "Get in Touch", href: "/contact" },
      },
    },
  ],
};

const PRIVACY_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { title: "Privacy Policy", subtitle: "How we handle your information" },
    },
    {
      id: "body",
      type: "html",
      data: {
        body: "<p>SEVAA Ukhra respects your privacy. We only collect personal information that you voluntarily provide (for example, when contacting us or making a donation), and we use it solely to communicate with you and process your contribution.</p><h3>Information We Collect</h3><p>Name, email address, phone number, and any message you choose to include when using our contact form.</p><h3>How We Use It</h3><p>To respond to your inquiries, send updates about SEVAA Ukhra's work, and acknowledge donations.</p><h3>Sharing</h3><p>We do not sell or share your personal information with third parties.</p><h3>Contact</h3><p>For any privacy-related questions, please email infosevaa@gmail.com.</p>",
      },
    },
  ],
};

const TERMS_SECTIONS = {
  sections: [
    {
      id: "header",
      type: "page-header",
      data: { title: "Terms of Use", subtitle: "Terms governing your use of this website" },
    },
    {
      id: "body",
      type: "html",
      data: {
        body: "<p>By accessing the SEVAA Ukhra website, you agree to the terms below.</p><h3>Use of Content</h3><p>All text, images, and materials on this site are the property of SEVAA unless otherwise noted. You may share content with attribution; commercial reuse requires permission.</p><h3>Donations</h3><p>Donations are routed to the SEVAA bank account listed on the Donate page. Please ensure you enter correct details when transferring funds.</p><h3>External Links</h3><p>This site may link to third-party websites. SEVAA is not responsible for their content or privacy practices.</p><h3>Changes</h3><p>We may update these terms at any time. Continued use of the website after changes constitutes acceptance.</p>",
      },
    },
  ],
};

const PAGE_CONTENT = {
  "d0000000-0000-0000-0000-000000000001": HOME_SECTIONS,
  "d0000000-0000-0000-0000-000000000002": ABOUT_SECTIONS,
  "d0000000-0000-0000-0000-000000000003": NABADISHA_SECTIONS,
  "d0000000-0000-0000-0000-000000000004": SMART_CLASS_SECTIONS,
  "d0000000-0000-0000-0000-000000000005": JOY_BOX_SECTIONS,
  "d0000000-0000-0000-0000-000000000006": HEALTH_WORKSHOP_SECTIONS,
  "d0000000-0000-0000-0000-000000000007": ENVIRONMENT_SECTIONS,
  "d0000000-0000-0000-0000-000000000008": DONATE_SECTIONS,
  "d0000000-0000-0000-0000-000000000009": CONTACT_SECTIONS,
  "d0000000-0000-0000-0000-00000000000a": GALLERY_SECTIONS,
  "d0000000-0000-0000-0000-00000000000b": NEWS_SECTIONS,
  "d0000000-0000-0000-0000-00000000000c": SUPPORT_SECTIONS,
  "d0000000-0000-0000-0000-00000000000d": PRIVACY_SECTIONS,
  "d0000000-0000-0000-0000-00000000000e": TERMS_SECTIONS,
};

// ============================================================
// Runner
// ============================================================

async function upsertSite() {
  const sql = readFileSync(join(__dirname, "005_seed_ukhra.sql"), "utf-8");
  // We skip running the raw SQL here because the service role via PostgREST
  // can't execute arbitrary SQL. Instead we re-implement the same inserts.

  const { error } = await supabase.from("sites").upsert(
    {
      id: UKHRA_SITE_ID,
      name: "SEVAA Ukhra",
      slug: "ukhra",
      domain: "ukhra.sevaa.net",
      metadata: {
        platform: "ukhra",
        description: "SEVAA Ukhra Nabadisha — education & community development in Ukhra village",
        preview_url: "http://localhost:3002",
        stage_domain: "",
        available_slots: [],
        revalidation_url: "http://localhost:3002/api/revalidate",
        seo: {
          title: "SEVAA Ukhra — Education & Community Development",
          description:
            "SEVAA Ukhra Nabadisha is a comprehensive educational initiative reaching 900 children across schools in Ukhra, Paschim Bardhaman.",
          keywords: "SEVAA Ukhra, Ukhra Nabadisha, rural education, West Bengal",
          og_image: "",
        },
        contact: {
          email: "infosevaa@gmail.com",
          phone: "+91 98271 93272",
          address:
            "131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal",
          email_secondary: "",
          phone_secondary: "",
        },
        deploy: { prod_hook_url: "", stage_hook_url: "" },
      },
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(`site upsert: ${error.message}`);
  console.log("✓ Ukhra site upserted");
  void sql;
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

  const { error } = await supabase
    .from("site_members")
    .upsert(
      { site_id: UKHRA_SITE_ID, user_id: user.id, role: "owner" },
      { onConflict: "site_id,user_id" }
    );
  if (error) throw new Error(`site_members upsert: ${error.message}`);
  console.log(`✓ sevaa.web@gmail.com granted owner on Ukhra (${user.id})`);
}

async function upsertPages() {
  const rows = PAGES.map((p) => ({
    id: p.id,
    site_id: UKHRA_SITE_ID,
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
  console.log("Seeding SEVAA Ukhra into website-builder...\n");
  await upsertSite();
  await grantSevaaWebAccess();
  await upsertPages();
  console.log("\nSeeding page content...");
  await seedContent();
  console.log("\n✓ Ukhra seed complete");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err);
  process.exit(1);
});
