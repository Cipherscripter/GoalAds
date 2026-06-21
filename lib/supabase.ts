import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key);
}

export type BrandProfile = {
  id: string;
  user_clerk_id: string;
  name: string;
  product: string;
  tone: string;
  region: string;
  logo_url?: string;
  brand_voice?: string;
  created_at: string;
};

export type GenerationLog = {
  id: string;
  user_clerk_id: string;
  platforms: string[];
  tone: string;
  region: string;
  created_at: string;
};
