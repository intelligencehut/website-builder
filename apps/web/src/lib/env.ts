/**
 * Environment configuration and validation
 * Centralizes all environment variable access with type safety
 */

import { z } from 'zod';

// Environment validation schema
const envSchema = z.object({
  // Application settings
  NEXT_PUBLIC_APP_NAME: z.string().default('SEVAA'),
  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .default('Society for Envisioning Vivekananda in Awareness and Action'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),

  // Feature flags
  NEXT_PUBLIC_ENABLE_DONATIONS: z
    .string()
    .default('true')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_NEWSLETTER: z
    .string()
    .default('true')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_CONTACT_FORM: z
    .string()
    .default('true')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_VOLUNTEER_REGISTRATION: z
    .string()
    .default('true')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_MAINTENANCE_MODE: z
    .string()
    .default('false')
    .transform(val => val === 'true'),

  // Analytics (optional in development)
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().optional(),

  // Social media
  NEXT_PUBLIC_FACEBOOK_PAGE_ID: z.string().optional(),
  NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
  NEXT_PUBLIC_LINKEDIN_PAGE: z.string().optional(),
  NEXT_PUBLIC_INSTAGRAM_HANDLE: z.string().optional(),

  // Captcha
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY: z.string().optional(),

  // Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// Server-side only environment schema
const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().optional(),
  DATABASE_POOL_SIZE: z
    .string()
    .default('10')
    .transform(val => parseInt(val, 10)),

  // Authentication
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  JWT_SECRET: z.string().optional(),

  // Email service (Resend)
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL_FROM: z.string().email().optional(),
  CONTACT_EMAIL_TO: z.string().optional(),
  EMAIL_FROM_NAME: z.string().optional(),

  // Payment gateway
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // Alternative payment (Stripe)
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Monitoring
  SENTRY_DSN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Storage
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_REGION: z.string().optional(),
  STORAGE_ACCESS_KEY_ID: z.string().optional(),
  STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
  STORAGE_ENDPOINT: z.string().optional(),

  // Captcha server key
  HCAPTCHA_SECRET_KEY: z.string().optional(),

  // CMS
  CMS_API_URL: z.string().url().optional(),
  CMS_API_TOKEN: z.string().optional(),

  // Debugging
  DEBUG: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

// Parse and validate client environment
const parseClientEnv = () => {
  const clientEnv = {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_ENABLE_DONATIONS: process.env.NEXT_PUBLIC_ENABLE_DONATIONS,
    NEXT_PUBLIC_ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER,
    NEXT_PUBLIC_ENABLE_CONTACT_FORM:
      process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM,
    NEXT_PUBLIC_ENABLE_VOLUNTEER_REGISTRATION:
      process.env.NEXT_PUBLIC_ENABLE_VOLUNTEER_REGISTRATION,
    NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_FACEBOOK_PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID,
    NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    NEXT_PUBLIC_LINKEDIN_PAGE: process.env.NEXT_PUBLIC_LINKEDIN_PAGE,
    NEXT_PUBLIC_INSTAGRAM_HANDLE: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE,
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  const parsed = envSchema.safeParse(clientEnv);

  if (!parsed.success) {
    throw new Error('Invalid client environment variables');
  }

  return parsed.data;
};

// Parse and validate server environment (server-side only)
const parseServerEnv = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Server environment should not be accessed on client side');
  }

  const serverEnv = {
    ...process.env,
  };

  const parsed = serverEnvSchema.safeParse(serverEnv);

  if (!parsed.success) {
    throw new Error('Invalid server environment variables');
  }

  return parsed.data;
};

// Export validated environment variables
export const env = parseClientEnv();

// Export server environment getter
export const getServerEnv = parseServerEnv;

// Environment helpers
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Feature flags helpers
export const features = {
  donations: env.NEXT_PUBLIC_ENABLE_DONATIONS,
  newsletter: env.NEXT_PUBLIC_ENABLE_NEWSLETTER,
  contactForm: env.NEXT_PUBLIC_ENABLE_CONTACT_FORM,
  volunteerRegistration: env.NEXT_PUBLIC_ENABLE_VOLUNTEER_REGISTRATION,
  maintenanceMode: env.NEXT_PUBLIC_MAINTENANCE_MODE,
} as const;

// App configuration
export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
  url: env.NEXT_PUBLIC_APP_URL,
  apiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
} as const;

// Social media configuration
export const socialMedia = {
  facebook: env.NEXT_PUBLIC_FACEBOOK_PAGE_ID
    ? `https://facebook.com/${env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}`
    : undefined,
  twitter: env.NEXT_PUBLIC_TWITTER_HANDLE
    ? `https://twitter.com/${env.NEXT_PUBLIC_TWITTER_HANDLE}`
    : undefined,
  linkedin: env.NEXT_PUBLIC_LINKEDIN_PAGE
    ? `https://linkedin.com/company/${env.NEXT_PUBLIC_LINKEDIN_PAGE}`
    : undefined,
  instagram: env.NEXT_PUBLIC_INSTAGRAM_HANDLE
    ? `https://instagram.com/${env.NEXT_PUBLIC_INSTAGRAM_HANDLE}`
    : undefined,
} as const;

// Analytics configuration
export const analytics = {
  googleAnalyticsId: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  googleTagManagerId: env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
} as const;

// Type exports for better TypeScript support
export type ClientEnv = typeof env;
export type Features = typeof features;
export type AppConfig = typeof appConfig;
