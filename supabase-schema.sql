-- GoalAds Supabase Schema
-- Run this in your Supabase SQL editor to set up the database

-- Brand profiles (Agency/Enterprise users)
CREATE TABLE IF NOT EXISTS brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_clerk_id TEXT NOT NULL,
  name TEXT NOT NULL,
  product TEXT NOT NULL,
  tone TEXT NOT NULL DEFAULT 'hype',
  region TEXT NOT NULL DEFAULT 'Global',
  logo_url TEXT,
  brand_voice TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_brand_profiles_user ON brand_profiles(user_clerk_id);

-- Generation logs (all users)
CREATE TABLE IF NOT EXISTS generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_clerk_id TEXT NOT NULL,
  business_name TEXT,
  platforms TEXT[] NOT NULL,
  tone TEXT,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_generation_logs_user ON generation_logs(user_clerk_id);

-- Row Level Security (enable for production)
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;

-- For server-side access via service role key, RLS policies are optional.
-- If using anon key from client side, add policies:
-- CREATE POLICY "Users manage own brands" ON brand_profiles
--   FOR ALL USING (auth.uid()::text = user_clerk_id);
