import { z } from "zod";

// ============================================================
// Enums
// ============================================================

export const ProgramStatusEnum = z.enum([
  "Active",
  "Planned",
  "Development",
  "Annual",
]);

export const ProgramCategoryEnum = z.enum([
  "Education",
  "Healthcare",
  "Livelihood",
  "Environment",
]);

export const EventStatusEnum = z.enum([
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
]);

export const ResourceTypeEnum = z.enum(["pdf", "document", "report"]);

export const TeamCategoryEnum = z.enum(["executive", "general"]);

export const ContentStatusEnum = z.enum([
  "draft",
  "staged",
  "published",
  "archived",
]);

export const PageTypeEnum = z.enum([
  "home",
  "static",
  "news",
  "project",
  "event",
  "gallery",
  "publication",
  "team",
]);

export const SiteMemberRoleEnum = z.enum(["owner", "editor", "viewer"]);

export const DeployEnvironmentEnum = z.enum(["stage", "production"]);

export const DeployStatusEnum = z.enum([
  "pending",
  "building",
  "success",
  "failed",
]);

// ============================================================
// Shared / Base Schemas
// ============================================================

export const SectionHeaderSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
});

export const CtaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

// ============================================================
// Hero Carousel
// ============================================================

export const CarouselSlideSchema = z.object({
  src: z.string(),
  alt: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const HeroContentSchema = z.object({
  slides: z.array(CarouselSlideSchema),
});

// ============================================================
// Impact Section
// ============================================================

export const ImpactAreaSchema = z.object({
  icon: z.string(), // Lucide icon name (e.g., "Users", "Heart")
  label: z.string(),
  description: z.string(),
  color: z.string(), // Tailwind class (e.g., "bg-blue-500")
});

export const ImpactContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(ImpactAreaSchema),
});

// ============================================================
// Stats Section
// ============================================================

export const StatItemSchema = z.object({
  value: z.number(),
  label: z.string(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  decimals: z.number().optional(),
});

export const StatsContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(StatItemSchema),
  layout: z.enum(["horizontal", "grid"]).optional(),
});

// ============================================================
// Programs
// ============================================================

export const ProgramSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  location: z.string(),
  status: ProgramStatusEnum,
  category: ProgramCategoryEnum,
  beneficiaries: z.number().optional(),
  year: z.string().optional(),
});

export const ProgramsContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(ProgramSchema),
});

// ============================================================
// Team / Governance
// ============================================================

export const TeamMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  category: TeamCategoryEnum,
  photo: z.string().optional(),
  bio: z.string().optional(),
});

export const TeamContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  members: z.array(TeamMemberSchema),
});

// ============================================================
// Testimonials
// ============================================================

export const TestimonialSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
});

export const TestimonialsContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(TestimonialSchema),
});

// ============================================================
// Blessing Letters
// ============================================================

export const BlessingLetterSchema = z.object({
  title: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
});

export const BlessingLettersContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(BlessingLetterSchema),
});

// ============================================================
// Gallery
// ============================================================

export const GalleryImageSchema = z.object({
  id: z.number(),
  src: z.string(),
  alt: z.string(),
  title: z.string(),
  category: z.string().optional(),
});

export const GalleryContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  images: z.array(GalleryImageSchema),
});

// ============================================================
// News
// ============================================================

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  image: z.string(),
  date: z.string(),
  category: z.string(),
});

export const NewsSectionContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(NewsItemSchema),
});

export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(), // HTML rich text
  image: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  pdfLink: z.string().optional(),
});

// ============================================================
// Events
// ============================================================

export const UpcomingEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  date: z.string(),
  location: z.string(),
  category: z.string(),
});

export const PastEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  description: z.string(),
  category: z.string(),
  featured: z.boolean(),
  highlights: z.array(z.string()),
});

export const EventsSectionContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  upcoming: z.array(UpcomingEventSchema),
  activities: z.array(z.string()).optional(),
});

export const EventsPageContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  past: z.array(PastEventSchema),
  upcoming: z.array(UpcomingEventSchema).optional(),
});

// ============================================================
// Resources
// ============================================================

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: ResourceTypeEnum,
  url: z.string(),
  size: z.string().optional(),
  date: z.string().optional(),
});

export const ResourcesContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  items: z.array(ResourceSchema),
});

// ============================================================
// Join Us / Donation Options
// ============================================================

export const DonationOptionSchema = z.object({
  id: z.string(),
  icon: z.string(), // Lucide icon name
  title: z.string(),
  description: z.string(),
});

export const JoinUsContentSchema = z.object({
  header: SectionHeaderSchema.optional(),
  donationOptions: z.array(DonationOptionSchema),
  cta: CtaSchema.optional(),
});

// ============================================================
// Navigation
// ============================================================

// Navigation supports one level of nesting (dropdown items don't have further dropdowns)
export const NavigationDropdownItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});

export const NavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  dropdown: z.array(NavigationDropdownItemSchema).optional(),
});

export const NavigationContentSchema = z.object({
  main: z.array(NavigationItemSchema),
  footer: z
    .object({
      quickLinks: z.array(z.object({ label: z.string(), href: z.string() })),
      socialLinks: z.array(
        z.object({
          icon: z.string(), // icon name: "Facebook", "Twitter", etc.
          href: z.string(),
          label: z.string(),
        })
      ),
      platforms: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
            url: z.string(),
            statusColor: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});

// ============================================================
// Page Header
// ============================================================

export const PageHeaderSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
});

// ============================================================
// Static Page (generic sections)
// ============================================================

export const StaticSectionSchema = z.object({
  type: z.enum(["text", "image", "quote", "stats", "html"]),
  content: z.record(z.unknown()),
});

export const StaticPageContentSchema = z.object({
  header: PageHeaderSchema,
  sections: z.array(StaticSectionSchema),
});

// ============================================================
// Home Page (composite)
// ============================================================

export const HomePageContentSchema = z.object({
  hero: HeroContentSchema,
  impact: ImpactContentSchema.optional(),
  stats: StatsContentSchema.optional(),
  programs: ProgramsContentSchema.optional(),
  testimonials: TestimonialsContentSchema.optional(),
  blessingLetters: BlessingLettersContentSchema.optional(),
  gallery: GalleryContentSchema.optional(),
  news: NewsSectionContentSchema.optional(),
  events: EventsSectionContentSchema.optional(),
  resources: ResourcesContentSchema.optional(),
  joinUs: JoinUsContentSchema.optional(),
});

// ============================================================
// Content Version (page content by type)
// ============================================================

export const PageContentSchema = z.discriminatedUnion("_type", [
  z.object({ _type: z.literal("home"), data: HomePageContentSchema }),
  z.object({ _type: z.literal("news"), data: NewsArticleSchema }),
  z.object({ _type: z.literal("project"), data: ProgramSchema }),
  z.object({ _type: z.literal("event"), data: EventsPageContentSchema }),
  z.object({ _type: z.literal("gallery"), data: GalleryContentSchema }),
  z.object({ _type: z.literal("publication"), data: ResourceSchema }),
  z.object({ _type: z.literal("team"), data: TeamContentSchema }),
  z.object({ _type: z.literal("static"), data: StaticPageContentSchema }),
]);

// ============================================================
// Database Row Types
// ============================================================

export const SiteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const SiteMemberSchema = z.object({
  id: z.string().uuid(),
  site_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: SiteMemberRoleEnum,
});

export const PageSchema = z.object({
  id: z.string().uuid(),
  site_id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  page_type: PageTypeEnum,
  template: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ContentVersionSchema = z.object({
  id: z.string().uuid(),
  page_id: z.string().uuid(),
  version_number: z.number(),
  status: ContentStatusEnum,
  content: z.record(z.unknown()), // JSONB — validated by PageContentSchema on write
  created_by: z.string().uuid().optional(),
  published_at: z.string().optional(),
  created_at: z.string(),
});

export const MediaSchema = z.object({
  id: z.string().uuid(),
  site_id: z.string().uuid(),
  filename: z.string(),
  original_filename: z.string(),
  storage_path: z.string(),
  mime_type: z.string(),
  size_bytes: z.number().optional(),
  alt_text: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  folder: z.string().default("/"),
  created_by: z.string().uuid().optional(),
  created_at: z.string(),
});

export const DeploySchema = z.object({
  id: z.string().uuid(),
  site_id: z.string().uuid(),
  environment: DeployEnvironmentEnum,
  content_version_id: z.string().uuid().optional(),
  status: DeployStatusEnum,
  deploy_url: z.string().optional(),
  triggered_by: z.string().uuid().optional(),
  triggered_at: z.string(),
  completed_at: z.string().optional(),
});

// ============================================================
// Inferred TypeScript Types
// ============================================================

export type SectionHeader = z.infer<typeof SectionHeaderSchema>;
export type Cta = z.infer<typeof CtaSchema>;
export type CarouselSlide = z.infer<typeof CarouselSlideSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type ImpactArea = z.infer<typeof ImpactAreaSchema>;
export type ImpactContent = z.infer<typeof ImpactContentSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
export type StatsContent = z.infer<typeof StatsContentSchema>;
export type Program = z.infer<typeof ProgramSchema>;
export type ProgramsContent = z.infer<typeof ProgramsContentSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamContent = z.infer<typeof TeamContentSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type TestimonialsContent = z.infer<typeof TestimonialsContentSchema>;
export type BlessingLetter = z.infer<typeof BlessingLetterSchema>;
export type BlessingLettersContent = z.infer<typeof BlessingLettersContentSchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
export type GalleryContent = z.infer<typeof GalleryContentSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type NewsSectionContent = z.infer<typeof NewsSectionContentSchema>;
export type NewsArticle = z.infer<typeof NewsArticleSchema>;
export type UpcomingEvent = z.infer<typeof UpcomingEventSchema>;
export type PastEvent = z.infer<typeof PastEventSchema>;
export type EventsSectionContent = z.infer<typeof EventsSectionContentSchema>;
export type EventsPageContent = z.infer<typeof EventsPageContentSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type ResourcesContent = z.infer<typeof ResourcesContentSchema>;
export type DonationOption = z.infer<typeof DonationOptionSchema>;
export type JoinUsContent = z.infer<typeof JoinUsContentSchema>;
export type NavigationDropdownItem = z.infer<typeof NavigationDropdownItemSchema>;
export type NavigationItem = z.infer<typeof NavigationItemSchema>;
export type NavigationContent = z.infer<typeof NavigationContentSchema>;
export type PageHeader = z.infer<typeof PageHeaderSchema>;
export type StaticSection = z.infer<typeof StaticSectionSchema>;
export type StaticPageContent = z.infer<typeof StaticPageContentSchema>;
export type HomePageContent = z.infer<typeof HomePageContentSchema>;
export type PageContent = z.infer<typeof PageContentSchema>;

export type ProgramStatus = z.infer<typeof ProgramStatusEnum>;
export type ProgramCategory = z.infer<typeof ProgramCategoryEnum>;
export type EventStatus = z.infer<typeof EventStatusEnum>;
export type ResourceType = z.infer<typeof ResourceTypeEnum>;
export type TeamCategory = z.infer<typeof TeamCategoryEnum>;
export type ContentStatus = z.infer<typeof ContentStatusEnum>;
export type PageType = z.infer<typeof PageTypeEnum>;
export type SiteMemberRole = z.infer<typeof SiteMemberRoleEnum>;
export type DeployEnvironment = z.infer<typeof DeployEnvironmentEnum>;
export type DeployStatus = z.infer<typeof DeployStatusEnum>;

export type Site = z.infer<typeof SiteSchema>;
export type SiteMember = z.infer<typeof SiteMemberSchema>;
export type Page = z.infer<typeof PageSchema>;
export type ContentVersion = z.infer<typeof ContentVersionSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Deploy = z.infer<typeof DeploySchema>;
