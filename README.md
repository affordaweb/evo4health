# evo4health

A modern Next.js 14 website for Evolution4Health — functional medicine practice led by Erin.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database + Auth**: Supabase
- **Payments**: Stripe
- **Scheduling**: Cal.com embed
- **Deployment**: Vercel

## Getting Started

1. Copy `.env.local.example` to `.env.local` and fill in your values
2. Run `npm install`
3. Set up your Supabase project and run `supabase/schema.sql`
4. Run `npm run dev`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_BASE_URL` | Your deployed URL |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (optional) |

## Stripe Webhook

Set up a Stripe webhook pointing to `https://your-domain.com/api/stripe/webhook` with event `payment_intent.succeeded`.

## Admin Access

Set a user's `role` to `'admin'` in the Supabase `profiles` table to grant admin access.
