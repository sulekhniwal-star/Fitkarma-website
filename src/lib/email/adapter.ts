import { Resend } from "resend";
import { EmailAdapter, SendEmailOptions, SendEmailResult } from "./types";
import { env } from "@/lib/env";

// In-memory test sink for automated integration tests and local verification
export const mockSentEmails: Array<SendEmailOptions & { timestamp: Date; id: string }> = [];

export class ResendEmailAdapter implements EmailAdapter {
  private resend: Resend | null = null;
  private fromAddress: string;

  constructor() {
    this.fromAddress = `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`;

    const apiKey = env.RESEND_API_KEY;
    if (apiKey && apiKey.startsWith("re_") && !apiKey.includes("placeholder")) {
      this.resend = new Resend(apiKey);
    }
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const { to, subject, html, text, idempotencyKey } = options;

    // Local / Test fallback sink
    if (!this.resend || env.NODE_ENV === "test") {
      const mockId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      mockSentEmails.push({
        ...options,
        timestamp: new Date(),
        id: mockId,
      });

      console.log(`[Email Mock Sink] To: ${to} | Subject: "${subject}" | Type: ${options.messageType}`);
      return {
        success: true,
        messageId: mockId,
        isMock: true,
      };
    }

    try {
      const response = await this.resend.emails.send({
        from: this.fromAddress,
        to,
        subject,
        html,
        text,
        headers: idempotencyKey ? { "X-Entity-Ref-ID": idempotencyKey } : undefined,
      });

      if (response.error) {
        console.error("Resend delivery error:", response.error);
        return {
          success: false,
          error: response.error.message,
        };
      }

      return {
        success: true,
        messageId: response.data?.id,
        isMock: false,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown email error";
      console.error("Failed to send email via Resend:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export const emailAdapter = new ResendEmailAdapter();
