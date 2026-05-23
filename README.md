# MenopauseDirectory.co

The modern directory for women navigating menopause. Find HRT-prescribing doctors, MSCP-certified practitioners, pelvic floor therapists, and menopause coaches.

**Domain:** menopausedirectory.co  
**Stack:** Next.js 14 + Supabase + Stripe + Vercel  
**Design:** Warm plum/rose/sage palette — built for the audience, not the algorithm

---

## Local Setup

### 1. Clone and install

```bash
cd builds/menopause-directory
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings  
- `SUPABASE_SERVICE_KEY` — service role key (not public)
- `STRIPE_SECRET_KEY` — from Stripe dashboard (sk_live_... or sk_test_...)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Stripe dashboard (pk_live_...)
- `STRIPE_WEBHOOK_SECRET` — from Stripe webhook endpoint (whsec_...)
- `NEXT_PUBLIC_SITE_URL` — full URL (https://menopausedirectory.co)

### 3. Run locally

```bash
npm run dev
```

---

## Supabase Setup

### Create a dedicated Supabase project

Go to [supabase.com](https://supabase.com) and create a **new project** specifically for menopausedirectory.co. Do not share with any existing project.

### Run the migration

```bash
# Using Supabase CLI
supabase db push --db-url "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Or paste the contents of supabase/migrations/001_initial_schema.sql
# directly into the Supabase SQL editor
```

### Seed the database

```bash
npm run seed
```

This seeds 10 representative listings. For production, follow the NPI bulk import instructions in `scripts/seed.ts`.

### Create an admin user

1. Go to Supabase Auth → Users → Invite user (use your email)
2. After confirming your email, go to Auth → Users → find your user
3. Click the user → Edit user metadata → add: `{"is_admin": true}`
4. Sign in at `/admin/login`

---

## Stripe Setup

### 1. Create a Stripe account (or use existing)

### 2. Set up a webhook endpoint

In Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://menopausedirectory.co/api/webhooks/stripe`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

### 3. Test with Stripe CLI (local dev)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Vercel Deployment

### 1. Create a Vercel project

- Go to [vercel.com](https://vercel.com)
- Import repository
- Framework preset: **Next.js**
- Root directory: `builds/menopause-directory` (if deploying from the Aidam monorepo)

### 2. Set environment variables in Vercel

Add all variables from `.env.example` to your Vercel project settings.

### 3. Set custom domain

In Vercel project → Domains → Add `menopausedirectory.co`

Point your domain's DNS:
- A record: `76.76.21.21` (Vercel)
- CNAME `www`: `cname.vercel-dns.com`

---

## Production Seeding (300-500 listings)

For a proper launch inventory:

### NPI Bulk Download
1. Download the NPI dissemination file: https://npiregistry.cms.hhs.gov/api-page
2. Filter taxonomy codes:
   - `207V00000X` — OB-GYN (Obstetrics & Gynecology)
   - `207VX0201X` — Gynecology specialty
   - `363LW0102X` — Women's Health NP
   - `207RE0101X` — Endocrinology
   - `225100000X` — Physical Therapist
3. Limit to top 30 US metros by population
4. Import ~400-600 records as unclaimed listing stubs

### MSCP Directory Scrape
Use Firecrawl to scrape portal.menopause.org by state. Mark all records `mscp_certified: true`. Deduplicate against NPI import.

### Geocoding
Run all addresses through Mapbox Geocoding API to populate `lat` and `lng` fields:
```
GET https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json?access_token={token}
```

---

## Revenue Model

| Tier | Price | Features |
|------|-------|---------|
| Unclaimed | Free | Name, type, location, phone only |
| Claimed (Free) | Free | + Bio, website, specialties, photo |
| Verified | $49/year | + Badge, priority placement, booking link |

Verified upgrade: practitioners click "Get Verified" on their listing → Stripe Checkout → webhook activates `listing_tier: 'premium'` and `is_verified: true`.

---

## Architecture

```
app/
  page.tsx                  Homepage with hero, category browse, featured listings
  listings/page.tsx         Browse with URL-based filtering
  listings/[slug]/page.tsx  Listing detail with structured data
  categories/[slug]/page.tsx  Category SEO pages
  submit/page.tsx           Submit form
  claim/[id]/page.tsx       Claim flow with magic link
  admin/page.tsx            Admin panel (approve/reject)
  api/webhooks/stripe/      Stripe webhook handler
  api/listings/submit/      Listing submission API
  api/admin/listings/[id]/  Admin actions API

components/
  Nav.tsx                   Sticky navigation
  SearchBar.tsx             URL-based search form
  ListingCard.tsx           Listing preview card
  FilterSidebar.tsx         Filter panel (category, creds, telehealth)
  SubmitForm.tsx            Submit new listing form
  AdminTable.tsx            Admin approve/reject table

lib/
  supabase/client.ts        Browser Supabase client
  supabase/server.ts        Server Supabase client
  stripe.ts                 Stripe client
  types.ts                  TypeScript interfaces
  utils.ts                  Helpers, labels, US states
```
