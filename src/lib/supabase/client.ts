import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { env } from "@/lib/env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_anon_key";

export const supabaseBrowserClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

