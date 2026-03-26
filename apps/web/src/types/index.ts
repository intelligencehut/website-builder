/**
 * TypeScript type definitions for the application
 */

import { PROGRAM_CATEGORIES } from '@/constants';

// ===============================
// COMMON TYPES
// ===============================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

// ===============================
// USER TYPES
// ===============================

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'volunteer' | 'donor' | 'user';
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: Date;
  occupation?: string;
  interests?: string[];
  skills?: string[];
}

// ===============================
// PROGRAM TYPES
// ===============================

export type ProgramCategory = keyof typeof PROGRAM_CATEGORIES;

export interface Program extends BaseEntity {
  title: string;
  description: string;
  shortDescription: string;
  category: ProgramCategory;
  location: string;
  beneficiaries: number;
  targetBeneficiaries?: number;
  budget?: number;
  budgetUtilized?: number;
  status: 'active' | 'completed' | 'planned' | 'paused';
  startDate: Date;
  endDate?: Date;
  images: string[];
  featuredImage?: string;
  tags: string[];
  coordinator?: User;
  volunteers?: User[];
  updates?: ProgramUpdate[];
}

export interface ProgramUpdate extends BaseEntity {
  programId: string;
  title: string;
  content: string;
  images?: string[];
  author: User;
  isPublic: boolean;
}

export interface ProgramFilter {
  category?: ProgramCategory;
  status?: Program['status'];
  location?: string;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// ===============================
// DONATION TYPES
// ===============================

export interface Donation extends BaseEntity {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  currency: 'INR' | 'USD';
  frequency: 'one-time' | 'monthly' | 'yearly';
  paymentMethod: 'razorpay' | 'stripe' | 'bank-transfer';
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  programId?: string;
  campaign?: string;
  message?: string;
  isAnonymous: boolean;
  receiptUrl?: string;
  taxDeductible: boolean;
  pan?: string;
}

export interface DonationStats {
  totalAmount: number;
  totalDonations: number;
  averageDonation: number;
  monthlyGrowth: number;
  topPrograms: Array<{
    programId: string;
    programTitle: string;
    amount: number;
    percentage: number;
  }>;
}

// ===============================
// CONTACT & FORM TYPES
// ===============================

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  captchaToken?: string;
}

export interface VolunteerForm {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    address: Address;
  };
  professionalInfo: {
    occupation: string;
    organization?: string;
    experience?: string;
    skills: string[];
    languages: string[];
  };
  volunteerInfo: {
    interests: ProgramCategory[];
    availability: {
      daysPerWeek: number;
      hoursPerDay: number;
      preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
      startDate: Date;
    };
    previousExperience?: string;
    motivation: string;
    commitment: '3-months' | '6-months' | '1-year' | 'long-term';
  };
  agreements: {
    backgroundCheck: boolean;
    codeOfConduct: boolean;
    dataProcessing: boolean;
  };
}

export interface NewsletterSubscription {
  email: string;
  preferences?: string[];
  source?: string;
  gdprConsent: boolean;
}

// ===============================
// CONTENT TYPES
// ===============================

export interface NewsArticle extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: User;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views: number;
  featured: boolean;
  seoMetadata?: SEOMetadata;
}

export interface Event extends BaseEntity {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  capacity?: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featuredImage?: string;
  organizer: User;
  program?: Program;
  registrationRequired: boolean;
  registrationDeadline?: Date;
}

export interface Testimonial extends BaseEntity {
  name: string;
  role?: string;
  organization?: string;
  content: string;
  rating?: number;
  image?: string;
  programId?: string;
  featured: boolean;
  approved: boolean;
  location?: string;
}

export interface Gallery extends BaseEntity {
  title: string;
  description?: string;
  images: GalleryImage[];
  category: 'events' | 'programs' | 'volunteers' | 'general';
  programId?: string;
  eventId?: string;
  featured: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  caption?: string;
  photographer?: string;
  order: number;
}

// ===============================
// UTILITY TYPES
// ===============================

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoClose?: boolean;
  duration?: number;
}

export interface FileUpload {
  file: File;
  url?: string;
  uploadProgress?: number;
  error?: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

// ===============================
// COMPONENT PROP TYPES
// ===============================

export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithClassName {
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormState<T = unknown> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Record<string, boolean>;
}

// ===============================
// API TYPES
// ===============================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: User['role'];
  permissions: string[];
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    page: string;
    views: number;
    percentage: number;
  }>;
  conversionRate: number;
  donationConversionRate: number;
}

// ===============================
// FORM VALIDATION TYPES
// ===============================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

// ===============================
// STATE MANAGEMENT TYPES
// ===============================

export interface AppState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi';
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

export interface GlobalSettings {
  maintenanceMode: boolean;
  donationsEnabled: boolean;
  newsletterEnabled: boolean;
  contactFormEnabled: boolean;
  volunteerRegistrationEnabled: boolean;
}

// ===============================
// EXPORT ALL TYPES
// ===============================

export type {
  // Re-export for convenience
  ComponentWithChildren as WithChildren,
  ComponentWithClassName as WithClassName,
  LoadingState as Loading,
  FormState as Form,
};