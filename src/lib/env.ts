import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .default("https://placeholder-project-id.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .default("placeholder-anon-key-min-length-for-local-development"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1)
    .default("placeholder-service-role-key-for-admin-and-allocation"),
  RESEND_API_KEY: z
    .string()
    .default("re_placeholder_api_key_resend"),
  EMAIL_DEV_SINK: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1" || val === undefined),
  EMAIL_FROM: z
    .string()
    .default("FitKarma VIP Beta <beta@fitkarma.in>"),
  ADMIN_EMAIL_ALLOWLIST: z
    .string()
    .default("sulekhniwal@gmail.com,admin@fitkarma.in"),
  BETA_REGISTRATION_PAUSED: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1"),
});

function parseEnv() {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_DEV_SINK: process.env.EMAIL_DEV_SINK,
    EMAIL_FROM: process.env.EMAIL_FROM,
    ADMIN_EMAIL_ALLOWLIST: process.env.ADMIN_EMAIL_ALLOWLIST,
    BETA_REGISTRATION_PAUSED: process.env.BETA_REGISTRATION_PAUSED,
  });

  if (!result.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(result.error.format(), null, 2)
    );
    throw new Error("Invalid environment configuration. Check your .env setup.");
  }

  return result.data;
}

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;

