import { Resend } from 'resend';

export interface EmailDispatchPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  headers?: Record<string, string>;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  errorCode?: string;
  isMock?: boolean;
}

// In-memory sink for testing and local dev when API key is missing
export const mockEmailSink: Array<EmailDispatchPayload & { timestamp: number; id: string }> = [];

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export const defaultFromEmail = process.env.RESEND_FROM_EMAIL || 'FitKarma Beta <onboarding@resend.dev>';

/**
 * Dispatches an email using Resend, or records it to mockEmailSink if no API key is configured.
 */
export async function sendEmail(payload: EmailDispatchPayload): Promise<EmailDispatchResult> {
  const client = getResendClient();
  const from = payload.from || defaultFromEmail;

  if (!client) {
    // Development / Test mode mock delivery
    const mockId = `mock_msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    mockEmailSink.push({
      ...payload,
      from,
      id: mockId,
      timestamp: Date.now(),
    });

    return {
      success: true,
      messageId: mockId,
      isMock: true,
    };
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      headers: payload.headers,
    });

    if (error) {
      return {
        success: false,
        errorCode: error.name || 'resend_error',
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.name : 'unknown_network_error';
    return {
      success: false,
      errorCode: errorMessage,
    };
  }
}

