import { Resend } from 'resend';
import { getAccessRequestAdminHTML } from './templates/access-request-admin';
import { getAccessApprovedHTML } from './templates/access-approved-user';
import { getAccessDeniedHTML } from './templates/access-denied-user';

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  if (!resendClient) {
    throw new Error('Resend client not initialized: RESEND_API_KEY is missing');
  }
  return resendClient;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@intelligencehut.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://websites.intelligencehut.com';

interface SendEmailResult {
  success: boolean;
  emailId?: string;
  error?: string;
}

/**
 * Notify admins when a user requests access to a site.
 */
export async function sendAccessRequestNotification(
  adminEmails: string[],
  userData: { name: string; email: string },
  siteName: string
): Promise<SendEmailResult> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email notification skipped.');
      return { success: false, error: 'Email service not configured' };
    }

    if (!adminEmails || adminEmails.length === 0) {
      console.warn('No admin emails provided. Skipping notification.');
      return { success: false, error: 'No admin emails available' };
    }

    const reviewUrl = `${APP_URL}`;
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmails,
      subject: `Access Request: ${userData.name || userData.email} → ${siteName}`,
      html: getAccessRequestAdminHTML(userData.name, userData.email, siteName, reviewUrl),
    });

    if (error) {
      console.error('Failed to send access request email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending access request email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Notify user when their access request is approved.
 */
export async function sendAccessApprovedNotification(
  userEmail: string,
  userName: string,
  siteName: string,
  role: string
): Promise<SendEmailResult> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: 'Email service not configured' };
    }

    const loginUrl = `${APP_URL}`;
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Access Approved — ${siteName}`,
      html: getAccessApprovedHTML(userName, siteName, role, loginUrl),
    });

    if (error) {
      console.error('Failed to send approval email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending approval email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Notify user when their access request is denied.
 */
export async function sendAccessDeniedNotification(
  userEmail: string,
  userName: string,
  siteName: string
): Promise<SendEmailResult> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: 'Email service not configured' };
    }

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Access Request Update — ${siteName}`,
      html: getAccessDeniedHTML(userName, siteName),
    });

    if (error) {
      console.error('Failed to send denial email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending denial email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
