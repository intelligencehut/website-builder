#!/usr/bin/env node
/**
 * One-off: seed `sites.metadata.footer` for each site with the values
 * currently hardcoded in the target repo's constants. After this runs,
 * each site's Footer.tsx can read from CMS and existing content stays
 * identical.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY='<key>' \
 *     node packages/database/seed/seed-footer-metadata.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://eevtuonrbvwgfpskergd.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  db: { schema: "website" },
});

const SEVAA_ORG_NAME =
  "Society for Envisioning Vivekananda in Awareness and Action (SEVAA), Kolkata";

const SITES = {
  // sevaa.net (site 005)
  "a0000000-0000-0000-0000-000000000005": {
    description:
      "Society for Envisioning Vivekananda in Awareness and Action - Transforming communities through evidence-based programs inspired by Swami Vivekananda's vision of service to humanity.",
    tagline: "\u201C\u09B6\u09BF\u09AC \u099C\u09CD\u099E\u09BE\u09A8\u09C7 \u099C\u09C0\u09AC \u09B8\u09C7\u09AC\u09BE\u201D",
    contact: {
      email: "infosevaa@gmail.com",
      phone: "+91 98271 93272",
      address: "131/B Sri Ramkrishna Pally,Sonarpur, Kolkata-700150, West Bengal.",
    },
    quickLinks: [
      { title: "Mission", href: "#mission" },
      { title: "Programs", href: "#programs" },
      { title: "News", href: "/news" },
      { title: "Reports", href: "/annual-reports" },
      { title: "Join Us", href: "/join-us" },
      { title: "Contact", href: "/contact" },
      { title: "Support", href: "#support" },
    ],
    legalLinks: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Annual Reports", href: "/reports" },
      { title: "Transparency", href: "/transparency" },
    ],
    socialLinks: [
      { platform: "facebook", href: "https://www.facebook.com/sevaa2023" },
      { platform: "twitter", href: "https://twitter.com/sevaa2023" },
      { platform: "instagram", href: "https://www.instagram.com/sevaa2023" },
      { platform: "linkedin", href: "https://www.linkedin.com/sevaa2023" },
    ],
    newsletter: {
      heading: "Stay Updated",
      description: "Subscribe to our newsletter for latest updates",
      placeholder: "Enter your email",
      ctaLabel: "Subscribe",
    },
    platforms: [
      {
        name: "TMSVV",
        subtitle: "Tilka Murmu Forest School",
        href: "https://tmsvv.sevaa.net/",
        dotColor: "green",
      },
      {
        name: "SEVAA Ukhra",
        subtitle: "Education in Paschim Bardhaman",
        href: "https://ukhra.sevaa.net/",
        dotColor: "orange",
      },
      {
        name: "Internal Operations",
        subtitle: "Financial & School Management",
        href: "https://internal.sevaa.net/",
        dotColor: "blue",
      },
    ],
    bottom: {
      copyrightName: "SEVAA",
      taxId: "ABPAS1880HF20221",
      ngoStatusLabel: "Registered NGO",
    },
  },

  // SEVAA Ukhra (site 003)
  "a0000000-0000-0000-0000-000000000003": {
    description:
      "A comprehensive educational initiative by SEVAA, reaching ~900 children across schools in Ukhra, Paschim Bardhaman through innovative programs.",
    infoLines: [{ label: "Children Reached", value: "~900 children" }],
    contact: {
      address: "Ukhra,\nPaschim Bardhaman,\nWest Bengal",
      email: "infosevaa@gmail.com",
      phone: "+91 98271 93272",
    },
    quickLinks: [
      { title: "About SEVAA", href: "https://sevaa.net/about" },
      { title: "All Projects", href: "https://sevaa.net/" },
      { title: "Publications", href: "/news" },
      { title: "Gallery", href: "/gallery" },
    ],
    programs: [
      { title: "Ukhra Nabadisha", href: "/programs/nabadisha" },
      { title: "SMART Class", href: "/programs/smart-class" },
      { title: "Joy Box Programme", href: "/programs/joy-box" },
      { title: "Health Workshop", href: "/programs/health-workshop" },
      { title: "Environmental Work", href: "/programs/environment" },
    ],
    legalLinks: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms & Conditions", href: "/terms" },
    ],
    donationBanner: {
      title: "Support Education in Ukhra",
      description:
        "Help us bring quality education and digital learning to 900 children",
      ctaLabel: "Donate Now",
      ctaHref: "/donate",
    },
    bottom: {
      copyrightName: "SEVAA Ukhra",
      initiativeNote: "An initiative of",
      initiativeOrgName: SEVAA_ORG_NAME,
      initiativeUrl: "https://sevaa.net/",
    },
  },

  // tmsvv (site 004)
  "a0000000-0000-0000-0000-000000000004": {
    description:
      "A forest school initiative by SEVAA and Birbaba Tilka Murmu Vivekpally, providing nature-based education to children in Ajodhya Hills.",
    infoLines: [
      { label: "Capacity", value: "30 children" },
      { label: "Inauguration", value: "9th & 10th March 2025" },
    ],
    contact: {
      address: "Saparambera,\nAjodhya Hills,\nPurulia, West Bengal",
      email: "contact@sevaaa.org",
      emailNote: "(Placeholder - actual email to be added)",
      phone: "+91 XXXXXXXXXX",
      phoneNote: "(Placeholder - actual phone to be added)",
    },
    quickLinks: [
      { title: "About SEVAA", href: "/about" },
      { title: "Annual Reports", href: "/reports" },
      { title: "Our Causes", href: "/causes" },
      { title: "Publications", href: "/publications" },
    ],
    legalLinks: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms & Conditions", href: "/terms" },
    ],
    donationBanner: {
      title: "Support Our Mission",
      description: "Help us provide quality education to rural children",
      ctaLabel: "Donate Now",
      ctaHref: "/donate",
    },
    bottom: {
      copyrightName: "Tilka Murmu SEVAA Vano Vidyalay",
      initiativeNote: "A joint initiative of",
      initiativeOrgName: SEVAA_ORG_NAME,
      initiativeUrl: "https://sevaa.net/",
    },
  },
};

async function main() {
  for (const [siteId, footer] of Object.entries(SITES)) {
    const { data: existing, error: fetchErr } = await supabase
      .from("sites")
      .select("id, name, metadata")
      .eq("id", siteId)
      .single();
    if (fetchErr || !existing) {
      console.error(`  ! site ${siteId} not found: ${fetchErr?.message}`);
      continue;
    }
    const metadata = {
      ...((existing.metadata ?? {})),
      footer,
    };
    const { error } = await supabase
      .from("sites")
      .update({ metadata, updated_at: new Date().toISOString() })
      .eq("id", siteId);
    if (error) {
      console.error(`  ! ${existing.name}: ${error.message}`);
      continue;
    }
    console.log(`  \u2713 ${existing.name} (${siteId}) footer seeded`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
