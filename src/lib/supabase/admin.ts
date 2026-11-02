import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let adminClient: SupabaseClient<Database> | null = null;

export function getSupabaseAdminClient(): SupabaseClient<Database> {
  if (typeof window !== 'undefined') {
    throw new Error('Supabase admin client cannot be instantiated in a browser context.');
  }

  if (adminClient) return adminClient;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Provide a mocked/inert client in local/test environments
    return createClient<Database>(
      supabaseUrl || 'https://mock.supabase.co',
      serviceRoleKey || 'mock-service-role-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return adminClient;
}

export const supabaseAdmin = getSupabaseAdminClient();

