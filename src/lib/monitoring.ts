/**
 * FitKarma Operational Monitoring & PII Redaction Utility
 * Enforces zero personal data leakage in telemetry, logs, and error monitors.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "secret",
  "key",
  "apikey",
  "authorization",
  "cookie",
  "honeypot",
  "websiteurl",
  "fullname",
  "name",
  "email",
  "normalizedemail",
  "p_verified_email",
]);

/**
 * Masks an email address to a safe representation (e.g., "a***v@example.com").
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "[INVALID_EMAIL]";
  const [local, domain] = email.split("@");
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Recursively sanitizes any object, array, or string to strip sensitive values and emails.
 */
export function redactPII<T>(input: T): T {
  if (input === null || input === undefined) {
    return input;
  }

  if (typeof input === "string") {
    // Replace all email matches with [REDACTED_EMAIL]
    return input.replace(EMAIL_REGEX, "[REDACTED_EMAIL]") as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => redactPII(item)) as unknown as T;
  }

  if (typeof input === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      const lowerKey = key.toLowerCase().replace(/[-_]/g, "");
      if (SENSITIVE_KEYS.has(lowerKey)) {
        if (typeof value === "string" && value.includes("@")) {
          sanitized[key] = maskEmail(value);
        } else {
          sanitized[key] = "[REDACTED]";
        }
      } else {
        sanitized[key] = redactPII(value);
      }
    }
    return sanitized as unknown as T;
  }

  return input;
}

/**
 * Safely logs an application error with redacted context and metadata.
 */
export function logSafeError(
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>
): void {
  const safeMeta = metadata ? redactPII(metadata) : {};
  const errorMessage = error instanceof Error ? error.message : String(error);
  const safeMessage = errorMessage.replace(EMAIL_REGEX, "[REDACTED_EMAIL]");

  console.error(`[FitKarma][${context}]`, {
    error: safeMessage,
    ...(error instanceof Error && error.stack
      ? { stack: error.stack.replace(EMAIL_REGEX, "[REDACTED_EMAIL]") }
      : {}),
    metadata: safeMeta,
    timestamp: new Date().toISOString(),
  });
}
