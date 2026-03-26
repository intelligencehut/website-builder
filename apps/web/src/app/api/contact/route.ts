import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import {
  sendContactNotification,
  sendContactConfirmation,
  type ContactEmailData,
} from '@/lib/email';
import { verifyHCaptcha } from '@/lib/hcaptcha';
import { z } from 'zod';

// Rate limiting - simple in-memory store (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(ip);

  if (!clientData || now > clientData.resetTime) {
    // Reset or create new entry
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  if (clientData.count >= RATE_LIMIT) {
    return true;
  }

  // Increment count
  clientData.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            'Too many requests. Please wait before submitting another message.',
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Validate the data against our schema
    const validatedData: ContactFormData = contactFormSchema.parse(body);

    // Verify hCaptcha token
    const captchaVerification = await verifyHCaptcha(
      validatedData.hcaptchaToken,
      clientIp
    );

    if (!captchaVerification.success) {
      return NextResponse.json(
        {
          error: captchaVerification.error || 'Captcha verification failed',
          code: 'CAPTCHA_FAILED',
        },
        { status: 400 }
      );
    }

    // Sanitize the data (basic HTML/script injection prevention)
    // Exclude hcaptchaToken from sanitized data as it's only needed for verification
    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.trim().toLowerCase(),
      phone: validatedData.phone?.trim() || '',
      subject: validatedData.subject.trim(),
      message: validatedData.message.trim(),
    };

    // Additional security checks
    const forbiddenPatterns = [
      /<script/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /javascript:/i,
      /onclick/i,
      /onerror/i,
    ];

    const allFields = Object.values(sanitizedData).join(' ');
    if (forbiddenPatterns.some(pattern => pattern.test(allFields))) {
      return NextResponse.json(
        {
          error:
            'Invalid content detected. Please remove any HTML or script content.',
          code: 'INVALID_CONTENT',
        },
        { status: 400 }
      );
    }

    // Log the submission (in production, save to database)
    const submissionData = {
      ...sanitizedData,
      submittedAt: new Date().toISOString(),
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // TODO: In a real implementation, you would also:
    // 1. Save to database
    // 2. Add to CRM system

    // Contact form submission received

    // Prepare email data
    const emailData: ContactEmailData = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      submittedAt: submissionData.submittedAt,
      ipAddress: submissionData.ipAddress,
      userAgent: submissionData.userAgent,
    };

    // Send admin notification email
    const adminEmailResult = await sendContactNotification(emailData);
    if (!adminEmailResult.success) {
      // Failed to send admin notification
      // Continue processing - don't fail the request if admin email fails
    } else {
      // Admin notification sent successfully
    }

    // Send user confirmation email
    const userEmailResult = await sendContactConfirmation(emailData);
    if (!userEmailResult.success) {
      // Failed to send user confirmation
      // Continue processing - don't fail the request if user email fails
    } else {
      // User confirmation sent successfully
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been received. We'll get back to you within 24 hours.",
        submissionId: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    // Contact form API error occurred

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid request format',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      {
        error: 'An internal server error occurred. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for API documentation or health check)
export async function GET() {
  return NextResponse.json(
    {
      message: 'SEVAA Contact Form API',
      version: '1.0.0',
      methods: ['POST'],
      documentation: {
        endpoint: '/api/contact',
        method: 'POST',
        contentType: 'application/json',
        rateLimit: `${RATE_LIMIT} requests per hour`,
        requiredFields: ['name', 'email', 'subject', 'message'],
        optionalFields: ['phone'],
      },
    },
    { status: 200 }
  );
}

// Disable other HTTP methods
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
