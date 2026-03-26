/**
 * Application constants and configuration
 */

// Contact information
export const CONTACT_INFO = {
  email: 'infosevaa@gmail.com',
  emailSecondary: 'sevaa.narendrapur@gmail.com',
  phone: '+91 98271 93272',
  phoneSecondary: '+91 33 2477 2545',
  address: '131/B Sri Ramkrishna Pally,Sonarpur, Kolkata-700150, West Bengal.',
  officeHours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 9:00 AM - 1:00 PM',
    sunday: 'Sunday: Closed',
  },
  taxId: 'ABPAS1880HF20221',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/sevaa2023',
  twitter: 'https://twitter.com/sevaa2023',
  linkedin: 'https://www.linkedin.com/sevaa2023',
  instagram: 'https://www.instagram.com/sevaa2023',
} as const;

// Navigation menu items - structured to match old site navigation
export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'about-us',
    label: 'About Us',
    href: '/mission-vision',
    dropdown: [
      {
        id: 'mission-vision',
        label: 'Our Mission & Vision',
        href: '/mission-vision',
      },
      {
        id: 'our-genesis',
        label: 'Our Genesis',
        href: '/our-genesis',
        dropdown: [
          {
            id: 'sevaa-karmakanda',
            label: 'সেবা কর্মকাণ্ড',
            href: '/sevaa-karmakanda',
          },
          {
            id: 'blessing-letters',
            label: 'Blessing Letters',
            href: '/blessing-letters',
          },
          {
            id: 'history-of-sevaa',
            label: 'History of SEVAA',
            href: '/formation-of-vivek-pally',
          },
        ],
      },
      {
        id: 'governance',
        label: 'Governance',
        href: '/governance',
        dropdown: [
          {
            id: 'executive-committee',
            label: 'Executive Committee',
            href: '/governance#executive-committee',
          },
          {
            id: 'subcommittees',
            label: 'Subcommittees',
            href: '/governance#subcommittees',
          },
          {
            id: 'land-donors',
            label: 'Land Donors',
            href: '/governance#land-donors',
          },
          {
            id: 'sevaa-members',
            label: 'Sevaa Members',
            href: '/governance#sevaa-members',
          },
          {
            id: 'sevaa-assoc-members',
            label: 'Sevaa Associate Members',
            href: '/governance#sevaa-assoc-members',
          },
          {
            id: 'sevaa-friends',
            label: 'Sevaa Friends',
            href: '/governance#sevaa-friends',
          },
          {
            id: 'sevaa-partners',
            label: 'Sevaa Partners',
            href: '/governance#sevaa-partners',
          },
          {
            id: 'stakeholder',
            label: 'Stakeholder',
            href: '/stakeholder',
          },
        ],
      },
    ],
  },
  {
    id: 'activities',
    label: 'Our Activities',
    href: '/formation-of-vivek-pally',
    dropdown: [
      {
        id: 'evolution-of-sevaa',
        label: 'Evolution of Sevaa',
        href: '/formation-of-vivek-pally',
      },
      {
        id: 'sevaa-projects',
        label: 'Sevaa Projects',
        href: '/projects/saparambera',
        dropdown: [
          {
            id: 'saparambera-project',
            label: 'Saparambera - Birbaba',
            href: '/projects/saparambera',
            dropdown: [
              {
                id: 'tilka-murmu-vivekpally',
                label: 'Tilka Murmu Vivekpally',
                href: '/projects/saparambera',
              },
              {
                id: 'sevaa-livelihood-projects',
                label: 'Sevaa Livelihood Projects',
                href: '/projects/livelihood',
              },
              {
                id: 'sevaa-health-projects',
                label: 'Sevaa Health Projects',
                href: '/projects/health',
              },
            ],
          },
          {
            id: 'ukhra-project',
            label: 'Ukhra Project',
            href: '/projects/ukhra',
          },
          {
            id: 'support-activities',
            label: 'We Support Activities',
            href: '/support-activities',
          },
          {
            id: 'other-activities',
            label: 'Other Activities',
            href: '/publications',
          },
        ],
      },
    ],
  },
  {
    id: 'news-publications',
    label: 'News & Publications',
    href: '/news',
    dropdown: [
      {
        id: 'sevaa-news',
        label: 'Sevaa News',
        href: '/news',
        dropdown: [
          {
            id: 'inauguration-tmsvv',
            label: 'Inauguration of TMSVV',
            href: '/news/tilka-murmu-school',
          },
          {
            id: 'celebration-rakhi',
            label: 'Celebration of Rakhi',
            href: '/news/rakhi-celebration',
          },
          {
            id: 'independence-day',
            label: 'Celebration of Independence Day',
            href: '/news/independence-day',
          },
          {
            id: 'birthday-celebrations',
            label: 'Birthday Celebrations',
            href: '/news/birthday-celebrations',
          },
        ],
      },
      {
        id: 'photo-gallery',
        label: 'Photo Gallery',
        href: '/gallery/photos',
      },
      {
        id: 'video-gallery',
        label: 'Video Gallery',
        href: '/gallery/videos',
      },
      {
        id: 'events',
        label: 'Events',
        href: '/events',
      },
      {
        id: 'sevaa-annual-reports',
        label: 'Sevaa Annual Reports',
        href: '/annual-reports',
      },
      {
        id: 'other-publications',
        label: 'Other Publications',
        href: '/publications',
      },
      {
        id: 'sevaa-sammelan-2023',
        label: 'Sevaa Sammelan- 2023',
        href: '/publications/sevaa-sammelan-2023',
        dropdown: [
          {
            id: 'president-desk',
            label: "From President's Desk",
            href: '/president-desk',
          },
          {
            id: 'secretary-desk',
            label: "From Secretary's Desk",
            href: '/secretary-desk',
          },
        ],
      },
      {
        id: 'sevaa-souvenir-2025',
        label: 'Sevaa - Souvenir - 2025',
        href: '/publications/sevaa-souvenir-2025',
      },
      {
        id: 'nostalgic-narendrapur',
        label: 'Nostalgic Narendrapur',
        href: '/publications/nostalgic-narendrapur',
      },
    ],
  },
  {
    id: 'archives',
    label: 'Archives',
    href: '/archives',
    dropdown: [
      {
        id: 'project-photos',
        label: 'Project wise photos',
        href: '/archives/photos',
      },
      {
        id: 'general-archives',
        label: 'General Archives',
        href: '/archives/general',
      },
      { id: 'videos', label: 'Videos', href: '/archives/videos' },
    ],
  },
  {
    id: 'join-us',
    label: 'Join Us',
    href: '/join-us',
    dropdown: [
      {
        id: 'csr-opportunities',
        label: 'CSR Opportunities',
        href: '/join-us',
      },
      {
        id: 'become-assoc-member',
        label: 'Become a Sevaa Assoc. Member',
        href: '/join-us',
      },
      {
        id: 'become-friend',
        label: 'Become a Sevaa Friend',
        href: '/join-us',
      },
      {
        id: 'become-partner',
        label: 'Become a Sevaa Partner',
        href: '/join-us',
      },
      {
        id: 'sponsor-child',
        label: 'Sponsor a Child',
        href: '/join-us',
      },
      {
        id: 'sponsor-midday-meal',
        label: 'Sponsor Midday Meal',
        href: '/join-us',
      },
    ],
  },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
] as const;

// Simple navigation items for components that need flat structure
export const SIMPLE_NAVIGATION_ITEMS = [
  { id: 'mission', label: 'Mission', href: '#mission' },
  { id: 'programs', label: 'Programs', href: '#programs' },
  { id: 'news', label: 'News', href: '/news' },
  { id: 'reports', label: 'Reports', href: '/annual-reports' },
  { id: 'join-us', label: 'Join Us', href: '/join-us' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'support', label: 'Support', href: '#support' },
] as const;

// Program categories
export const PROGRAM_CATEGORIES = {
  education: {
    id: 'education',
    label: 'Education',
    description: 'Educational initiatives and literacy programs',
    icon: '📚',
    color: '#3B82F6',
  },
  healthcare: {
    id: 'healthcare',
    label: 'Healthcare',
    description: 'Medical assistance and health awareness',
    icon: '🏥',
    color: '#EF4444',
  },
  livelihood: {
    id: 'livelihood',
    label: 'Livelihood',
    description: 'Skill development and employment opportunities',
    icon: '💼',
    color: '#10B981',
  },
  environment: {
    id: 'environment',
    label: 'Environment',
    description: 'Environmental conservation and sustainability',
    icon: '🌱',
    color: '#059669',
  },
} as const;

// Note: Impact statistics removed as they contained unverified data
// Real impact data should be sourced from annual reports and verified records

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  passwordMatch: 'Passwords do not match',
  invalidFile: 'Invalid file type or size',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  volunteer: '/api/volunteer',
  programs: '/api/programs',
  testimonials: '/api/testimonials',
  news: '/api/news',
} as const;

// File upload constraints
export const FILE_CONSTRAINTS = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword'],
  },
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  pageTransition: 0.4,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Common regex patterns
export const REGEX_PATTERNS = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+\..+/,
  indianPhone: /^[\+]?[91]?[6-9]\d{9}$/,
  indianPAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
} as const;

// Date formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  iso: 'yyyy-MM-dd',
  readable: 'MMMM do, yyyy',
  time: 'h:mm a',
  datetime: 'MMM dd, yyyy h:mm a',
} as const;

// Theme colors (matching Tailwind config)
export const THEME_COLORS = {
  primary: {
    50: '#f8f9fa',
    100: '#f1f3f4',
    500: '#000000',
    600: '#1a1a1a',
    900: '#000000',
  },
  secondary: {
    100: '#f5f5f5',
    500: '#666666',
    600: '#4a4a4a',
  },
  accent: {
    100: '#f0f0f0',
    500: '#e0e0e0',
  },
  success: {
    500: '#10b981',
    600: '#059669',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'sevaa-theme',
  language: 'sevaa-language',
  userPreferences: 'sevaa-user-preferences',
  donationData: 'sevaa-donation-data',
} as const;

// Cookie names
export const COOKIE_NAMES = {
  consent: 'sevaa-cookie-consent',
  session: 'sevaa-session',
  preferences: 'sevaa-preferences',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  general: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  contactSubmitted: 'Thank you for your message. We will get back to you soon.',
  newsletterSubscribed: 'Successfully subscribed to our newsletter.',
  volunteerRegistered: 'Thank you for registering as a volunteer.',
  donationCompleted: 'Thank you for your generous donation.',
} as const;
