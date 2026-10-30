export type EmailMessageType =
  | "verification"
  | "phase1_accepted"
  | "phase2_waitlist"
  | "phase2_invite";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey?: string;
  messageType: EmailMessageType;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  isMock?: boolean;
}

export interface EmailAdapter {
  send(options: SendEmailOptions): Promise<SendEmailResult>;
}
