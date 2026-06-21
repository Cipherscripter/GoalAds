# GoalAds — World Cup 2026 Ad Creative Generator

AI-powered marketing copy for small businesses and agencies worldwide. Generate ready-to-use World Cup 2026 themed ad copy for Instagram, WhatsApp, X, Facebook, SMS, and LinkedIn — in 30 seconds.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Clerk** (authentication)
- **Stripe** (payments + webhooks)
- **Supabase** (brand profiles + generation logs)
- **Claude API** (Anthropic — ad copy generation)

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

#### Required services:

**Anthropic (Claude API)**
- Sign up at https://console.anthropic.com
- Create an API key → `ANTHROPIC_API_KEY`

**Clerk (Auth)**
- Create a project at https://dashboard.clerk.com
- Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- In Clerk dashboard: Redirects → set sign-in URL to `/sign-in`, sign-up to `/sign-up`

**Stripe (Payments)**
- Create products in Stripe Dashboard:
  - Pro: $49/month → set `STRIPE_PRO_PRICE_ID`
  - Agency: $149/month → set `STRIPE_AGENCY_PRICE_ID`
  - Enterprise: $499/month → set `STRIPE_ENTERPRISE_PRICE_ID`
  - Pro Annual: $490/year → set `STRIPE_PRO_ANNUAL_PRICE_ID`
  - Agency Annual: $1,490/year → set `STRIPE_AGENCY_ANNUAL_PRICE_ID`
  - Enterprise Annual: $4,990/year → set `STRIPE_ENTERPRISE_ANNUAL_PRICE_ID`
- Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`
- For webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Set `STRIPE_WEBHOOK_SECRET` from the CLI output

**Supabase (Database)**
- Create a project at https://supabase.com
- Run `supabase-schema.sql` in the Supabase SQL editor
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Vercel

```bash
vercel --prod
```

Add all env vars in the Vercel dashboard. Update `NEXT_PUBLIC_APP_URL` to your production domain.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, samples, pricing, FAQ |
| `/generate` | Ad generator form (auth required) |
| `/results` | Generated output cards (auth required) |
| `/dashboard` | Usage stats and brand profiles (auth required) |
| `/blog` | 3 marketing articles |
| `/templates` | 9 industry sample outputs |
| `/affiliates` | Affiliate program landing page |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/generate` | POST | Generate ad copy via Claude API |
| `/api/checkout` | GET | Create Stripe checkout session |
| `/api/billing-portal` | GET | Open Stripe customer portal |
| `/api/webhooks/stripe` | POST | Handle Stripe events (subscription changes) |
| `/api/brands` | GET/POST/DELETE | Brand profile CRUD (Agency+) |
| `/api/stats` | GET | User generation statistics |

## Pricing Tiers

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 3 generations, watermark |
| Pro | $49/mo | Unlimited, no watermark, hashtags |
| Agency | $149/mo | + Brand profiles, PDF export, CSV |
| Enterprise | $499/mo | + Unlimited brands, custom AI tone, API |

Annual pricing: 2 months free (Pro $490/yr, Agency $1,490/yr, Enterprise $4,990/yr)

## Supabase Schema

Run `supabase-schema.sql` to create:
- `brand_profiles` — saved brand info for Agency/Enterprise users
- `generation_logs` — usage tracking for all users

## Free Tier Tracking

Free tier usage (3 generations) is tracked in `localStorage` under `goalads_generation_count`. After 3 uses, a full-screen upgrade modal appears.

## Stripe Webhook Setup

The webhook at `/api/webhooks/stripe` handles:
- `checkout.session.completed` → Updates Clerk user metadata with plan + expiry
- `customer.subscription.deleted` → Downgrades user to free in Clerk metadata
- `invoice.payment_failed` → Logged for monitoring
