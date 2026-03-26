import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(phone => {
      if (!phone) return true;
      // Basic phone validation - accepts various formats
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }, 'Please enter a valid phone number'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha verification'),
});

// Newsletter subscription validation schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  preferences: z.array(z.string()).default(['newsletter']),
});

// Volunteer application validation schema
export const volunteerFormSchema = z.object({
  personalInfo: z.object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(30, 'First name must be less than 30 characters'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(30, 'Last name must be less than 30 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^[\+]?[1-9][\d]{9,15}$/, 'Please enter a valid phone number'),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter date in YYYY-MM-DD format')
      .refine(date => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 16 && age <= 100;
      }, 'You must be between 16 and 100 years old'),
  }),
  address: z.object({
    street: z
      .string()
      .min(5, 'Street address must be at least 5 characters')
      .max(100, 'Street address must be less than 100 characters'),
    city: z
      .string()
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be less than 50 characters'),
    state: z
      .string()
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State must be less than 50 characters'),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  }),
  interests: z.object({
    areas: z
      .array(
        z.enum([
          'education',
          'healthcare',
          'environment',
          'livelihood',
          'events',
          'fundraising',
        ])
      )
      .min(1, 'Please select at least one area of interest'),
    skills: z.array(z.string()).optional(),
    experience: z
      .string()
      .max(500, 'Experience description must be less than 500 characters')
      .optional(),
  }),
  availability: z.object({
    days: z
      .array(
        z.enum([
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ])
      )
      .min(1, 'Please select at least one day'),
    timeSlots: z
      .array(z.enum(['morning', 'afternoon', 'evening']))
      .min(1, 'Please select at least one time slot'),
    commitment: z
      .enum(['weekly', 'monthly', 'occasional'])
      .refine(val => val !== undefined, 'Please select your commitment level'),
  }),
  consent: z.object({
    backgroundCheck: z
      .boolean()
      .refine(val => val === true, 'Background check consent is required'),
    dataProcessing: z
      .boolean()
      .refine(val => val === true, 'Data processing consent is required'),
    communications: z.boolean().optional().default(false),
  }),
});

// Donation form validation schema (for static UI)
export const donationFormSchema = z.object({
  amount: z
    .number()
    .min(1, 'Minimum donation amount is ₹1')
    .max(1000000, 'Maximum donation amount is ₹10,00,000'),
  frequency: z.enum(['one-time', 'monthly', 'yearly']),
  donorInfo: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(/^[\+]?[1-9][\d]{9,15}$/, 'Please enter a valid phone number'),
    address: z
      .string()
      .min(10, 'Address must be at least 10 characters')
      .max(200, 'Address must be less than 200 characters'),
    panNumber: z
      .string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number')
      .optional(),
  }),
  purpose: z.enum([
    'general',
    'education',
    'healthcare',
    'environment',
    'livelihood',
  ]),
  taxReceipt: z.boolean(),
  anonymous: z.boolean(),
});

// Type exports for TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
export type DonationFormData = z.infer<typeof donationFormSchema>;
