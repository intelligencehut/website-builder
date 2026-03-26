import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// Create instance only when needed to avoid build-time errors
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
}

export interface EmailTemplate {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      throw new Error('CONTACT_EMAIL_TO environment variable is not set');
    }

    // Create admin notification email
    const adminEmail = createAdminNotificationEmail(data);

    const result = await getResendClient().emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'contact@sevaaa.org',
      to: process.env.CONTACT_EMAIL_TO.split(',').map(email => email.trim()),
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
      replyTo: data.email,
    });

    if (result.error) {
      // Failed to send admin notification
      return {
        success: false,
        error: result.error.message || 'Failed to send notification email',
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    // Error sending contact notification
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send confirmation email to user
 */
export async function sendContactConfirmation(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    // Create user confirmation email
    const confirmationEmail = createUserConfirmationEmail(data);

    const result = await getResendClient().emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'contact@sevaaa.org',
      to: [data.email],
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text,
    });

    if (result.error) {
      // Failed to send confirmation email
      return {
        success: false,
        error: result.error.message || 'Failed to send confirmation email',
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    // Error sending confirmation email
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Create admin notification email template
 */
function createAdminNotificationEmail(data: ContactEmailData): EmailTemplate {
  const subject = `[SEVAA Contact] ${data.subject}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FF6B35; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
        .value { background: white; padding: 12px; border-radius: 4px; border: 1px solid #ddd; }
        .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; white-space: pre-wrap; }
        .meta { background: #f0f0f0; padding: 15px; border-radius: 4px; font-size: 0.9em; color: #666; }
        .footer { text-align: center; padding: 20px; color: #888; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">SEVAA Website Contact Form</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">Name:</span>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          
          <div class="field">
            <span class="label">Email:</span>
            <div class="value">
              <a href="mailto:${escapeHtml(data.email)}" style="color: #FF6B35; text-decoration: none;">
                ${escapeHtml(data.email)}
              </a>
            </div>
          </div>
          
          ${
            data.phone
              ? `
            <div class="field">
              <span class="label">Phone:</span>
              <div class="value">
                <a href="tel:${escapeHtml(data.phone)}" style="color: #FF6B35; text-decoration: none;">
                  ${escapeHtml(data.phone)}
                </a>
              </div>
            </div>
          `
              : ''
          }
          
          <div class="field">
            <span class="label">Subject:</span>
            <div class="value">${escapeHtml(data.subject)}</div>
          </div>
          
          <div class="field">
            <span class="label">Message:</span>
            <div class="message-box">${escapeHtml(data.message)}</div>
          </div>
          
          <div class="meta">
            <strong>Submission Details:</strong><br>
            <strong>Time:</strong> ${data.submittedAt}<br>
            <strong>IP Address:</strong> ${data.ipAddress}<br>
            <strong>User Agent:</strong> ${data.userAgent}
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent automatically from the SEVAA website contact form.</p>
          <p>Reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    New Contact Form Submission - SEVAA Website
    
    Name: ${data.name}
    Email: ${data.email}
    ${data.phone ? `Phone: ${data.phone}` : ''}
    Subject: ${data.subject}
    
    Message:
    ${data.message}
    
    Submission Details:
    Time: ${data.submittedAt}
    IP Address: ${data.ipAddress}
    User Agent: ${data.userAgent}
    
    ---
    Reply directly to this email to respond to ${data.name}.
  `;

  return {
    to:
      process.env.CONTACT_EMAIL_TO?.split(',').map(email => email.trim()) || [],
    subject,
    html,
    text,
  };
}

/**
 * Create user confirmation email template
 */
function createUserConfirmationEmail(data: ContactEmailData): EmailTemplate {
  const subject = "Thank you for contacting SEVAA - We'll be in touch soon";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting SEVAA</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FF6B35; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .message-summary { background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #FF6B35; margin: 20px 0; }
        .cta { text-align: center; margin: 30px 0; }
        .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #888; font-size: 0.9em; }
        .contact-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
          <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 18px;">
            We've received your message
          </p>
        </div>
        
        <div class="content">
          <p>Dear ${escapeHtml(data.name)},</p>
          
          <p>
            Thank you for reaching out to SEVAA (Society for Envisioning Vivekananda in Awareness and Action). 
            We have successfully received your message and our team will review it carefully.
          </p>
          
          <div class="message-summary">
            <h3 style="margin-top: 0; color: #FF6B35;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
            <p><strong>Submitted:</strong> ${new Date(
              data.submittedAt
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
          </div>
          
          <p>
            <strong>What happens next?</strong><br>
            Our team typically responds to inquiries within 24-48 hours during business days. 
            We'll get back to you at ${escapeHtml(data.email)} with a personalized response.
          </p>
          
          <div class="cta">
            <a href="https://sevaaa.org" class="button" style="color: white;">
              Visit Our Website
            </a>
          </div>
          
          <div class="contact-info">
            <h4 style="color: #FF6B35; margin-top: 0;">Contact Information</h4>
            <p>
              <strong>Email:</strong> contact@sevaaa.org<br>
              <strong>Phone:</strong> +91 98271 93272<br>
              <strong>Address:</strong> 131/B Sri Ramkrishna Pally, Sonarpur, Kolkata-700150, West Bengal
            </p>
          </div>
          
          <p>
            Thank you for your interest in our work. Together, we can make a meaningful difference 
            in our communities through awareness and action.
          </p>
          
          <p>
            With gratitude,<br>
            <strong>The SEVAA Team</strong>
          </p>
        </div>
        
        <div class="footer">
          <p>This is an automated confirmation email. Please do not reply to this message.</p>
          <p>If you need immediate assistance, please contact us directly at contact@sevaaa.org</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Thank you for contacting SEVAA!
    
    Dear ${data.name},
    
    Thank you for reaching out to SEVAA (Society for Envisioning Vivekananda in Awareness and Action).
    We have successfully received your message and our team will review it carefully.
    
    Your Message Summary:
    Subject: ${data.subject}
    Submitted: ${new Date(data.submittedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}
    
    What happens next?
    Our team typically responds to inquiries within 24-48 hours during business days.
    We'll get back to you at ${data.email} with a personalized response.
    
    Contact Information:
    Email: contact@sevaaa.org
    Phone: +91 98271 93272
    Website: https://sevaaa.org
    
    Thank you for your interest in our work. Together, we can make a meaningful 
    difference in our communities through awareness and action.
    
    With gratitude,
    The SEVAA Team
    
    ---
    This is an automated confirmation email. Please do not reply to this message.
    If you need immediate assistance, please contact us directly at contact@sevaaa.org
  `;

  return {
    to: [data.email],
    subject,
    html,
    text,
  };
}

/**
 * Escape HTML to prevent injection attacks
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'RESEND_API_KEY environment variable is not set',
      };
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      return {
        success: false,
        error: 'CONTACT_EMAIL_TO environment variable is not set',
      };
    }

    // Try to send a test email (you can comment this out in production)
    // const result = await resend.emails.send({
    //   from: process.env.CONTACT_EMAIL_FROM || 'contact@sevaaa.org',
    //   to: ['test@example.com'],
    //   subject: 'Test Email Configuration',
    //   html: '<p>This is a test email to verify configuration.</p>',
    // });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
