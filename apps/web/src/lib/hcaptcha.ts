/**
 * hCaptcha verification utility
 * Handles server-side verification of hCaptcha tokens
 */

export interface HCaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  credit?: boolean;
  'error-codes'?: string[];
  score?: number;
  score_reason?: string[];
}

/**
 * Verify hCaptcha token with hCaptcha API
 */
export async function verifyHCaptcha(
  token: string,
  remoteip?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if secret key is configured
    if (!process.env.HCAPTCHA_SECRET_KEY) {
      // HCAPTCHA_SECRET_KEY environment variable is not set
      return {
        success: false,
        error: 'hCaptcha verification is not properly configured',
      };
    }

    // Prepare verification request
    const verificationUrl = 'https://hcaptcha.com/siteverify';
    const params = new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET_KEY,
      response: token,
    });

    // Add remote IP if provided
    if (remoteip) {
      params.append('remoteip', remoteip);
    }

    // Send verification request
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      // hCaptcha API returned error status
      return {
        success: false,
        error: 'Failed to verify captcha with hCaptcha service',
      };
    }

    const result: HCaptchaVerificationResponse = await response.json();

    if (!result.success) {
      const errorCodes = result['error-codes'] || [];
      // hCaptcha verification failed

      // Map common error codes to user-friendly messages
      const errorMessages: { [key: string]: string } = {
        'missing-input-secret': 'hCaptcha configuration error',
        'invalid-input-secret': 'hCaptcha configuration error',
        'missing-input-response': 'Missing captcha token',
        'invalid-input-response': 'Invalid captcha token',
        'bad-request': 'Invalid captcha request',
        'timeout-or-duplicate':
          'Captcha token has expired or been used already',
        'invalid-or-already-seen-response':
          'Captcha token has expired or been used already',
      };

      const errorMessage = errorCodes
        .map(code => errorMessages[code] || 'Captcha verification failed')
        .join(', ');

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Additional validation checks
    if (result.hostname && !isValidHostname(result.hostname)) {
      // hCaptcha hostname validation failed
      return {
        success: false,
        error: 'Captcha verification failed - invalid hostname',
      };
    }

    // Check score if available (hCaptcha Enterprise)
    if (result.score !== undefined && result.score < 0.5) {
      // hCaptcha score below threshold
      return {
        success: false,
        error: 'Captcha verification failed - security score too low',
      };
    }

    return { success: true };
  } catch {
    // Error verifying hCaptcha
    return {
      success: false,
      error: 'Failed to verify captcha - please try again',
    };
  }
}

/**
 * Validate hostname against allowed domains
 */
function isValidHostname(hostname: string): boolean {
  const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'sevaaa.org',
    'www.sevaaa.org',
    process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, ''),
  ].filter(Boolean);

  return allowedDomains.some(
    domain => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

/**
 * Test hCaptcha configuration
 */
export async function testHCaptchaConfiguration(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!process.env.HCAPTCHA_SECRET_KEY) {
      return {
        success: false,
        error: 'HCAPTCHA_SECRET_KEY environment variable is not set',
      };
    }

    if (!process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY) {
      return {
        success: false,
        error: 'NEXT_PUBLIC_HCAPTCHA_SITE_KEY environment variable is not set',
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
