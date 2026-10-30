import { z } from "zod";

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z.string().optional().default(""),

  // Server-only secrets
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  RESEND_API_KEY: z.string().optional().default(""),
  EMAIL_FROM_ADDRESS: z.string().email().default("beta@fitkarma.in"),
  EMAIL_FROM_NAME: z.string().default("FitKarma"),
  SUPPORT_EMAIL: z.string().email().default("sulekhniwal@gmail.com"),
  ADMIN_EMAIL_ALLOWLIST: z.string().default("sulekhniwal@gmail.com"),

  // Bot Protection
  TURNSTILE_SITE_KEY: z.string().optional().default(""),
  TURNSTILE_SECRET_KEY: z.string().optional().default(""),

  // Error Monitoring
  SENTRY_DSN: z.string().optional().default(""),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    // In development or CI build, fallback to defaults to prevent hard build crash
    return envSchema.parse({});
  }
  return result.data;
}

export const env = parseEnv();

/**
 * Validates that production-critical secrets exist before performing privileged operations.
 */
export function assertServerSecret(
  key: keyof Pick<Env, "SUPABASE_SERVICE_ROLE_KEY" | "RESEND_API_KEY">,
  contextMessage?: string
): string {
  const value = env[key];
  if (!value || value.startsWith("placeholder")) {
    throw new Error(
      `Missing required server secret: ${key}. ${contextMessage ?? ""}`
    );
  }
  return value;
}

