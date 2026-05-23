-- =====================================================================
-- MenopauseDirectory.co — Initial Schema
-- =====================================================================

-- Core listings table
CREATE TABLE menopause_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  npi_number TEXT UNIQUE,
  full_name TEXT NOT NULL,
  credentials TEXT,
  practice_name TEXT,
  practitioner_type TEXT NOT NULL
    CHECK (practitioner_type IN ('obgyn','endocrinologist','internist','np','pa','functional_medicine','pelvic_floor_pt','coach','other')),
  bio TEXT,
  headshot_url TEXT,
  phone TEXT,
  website TEXT,
  booking_url TEXT,
  email TEXT, -- not publicly exposed
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  lat NUMERIC(9, 6),
  lng NUMERIC(9, 6),
  -- Credential flags
  mscp_certified BOOLEAN NOT NULL DEFAULT FALSE,
  isswsh_member BOOLEAN NOT NULL DEFAULT FALSE,
  hrt_prescriber BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_telehealth BOOLEAN NOT NULL DEFAULT FALSE,
  accepting_new_patients BOOLEAN NOT NULL DEFAULT TRUE,
  -- Arrays
  specialties TEXT[] NOT NULL DEFAULT '{}',
  insurance_accepted TEXT[] NOT NULL DEFAULT '{}',
  languages_spoken TEXT[] NOT NULL DEFAULT '{English}',
  -- Listing status
  listing_tier TEXT NOT NULL DEFAULT 'unclaimed'
    CHECK (listing_tier IN ('unclaimed','free','premium','featured')),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  -- Subscription
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ,
  -- Source tracking
  source TEXT,
  -- Full-text search
  search_vector TSVECTOR,
  -- Audit
  claimed_at TIMESTAMPTZ,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX listings_search_idx ON menopause_listings USING GIN (search_vector);
CREATE INDEX listings_city_state_idx ON menopause_listings(city, state);
CREATE INDEX listings_tier_idx ON menopause_listings(listing_tier);
CREATE INDEX listings_type_idx ON menopause_listings(practitioner_type);
CREATE INDEX listings_approved_idx ON menopause_listings(is_approved, is_active);
CREATE INDEX listings_mscp_idx ON menopause_listings(mscp_certified) WHERE mscp_certified = TRUE;
CREATE INDEX listings_telehealth_idx ON menopause_listings(accepts_telehealth) WHERE accepts_telehealth = TRUE;

-- Trigger to maintain search_vector
CREATE OR REPLACE FUNCTION menopause_listings_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.practice_name, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.bio, '')), 'D') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.specialties, ' '), '')), 'C');
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_search_vector_trigger
  BEFORE INSERT OR UPDATE ON menopause_listings
  FOR EACH ROW EXECUTE FUNCTION menopause_listings_search_vector_update();

-- Claims table
CREATE TABLE menopause_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES menopause_listings(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','approved','rejected')),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(listing_id)
);

-- Payments log
CREATE TABLE menopause_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES menopause_listings(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  tier TEXT NOT NULL CHECK (tier IN ('premium','featured')),
  status TEXT NOT NULL CHECK (status IN ('pending','succeeded','failed','canceled')),
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews (schema now, enable post-launch)
CREATE TABLE menopause_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES menopause_listings(id) ON DELETE CASCADE NOT NULL,
  reviewer_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- City pages metadata
CREATE TABLE menopause_city_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  state_abbr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  h1_title TEXT,
  meta_description TEXT,
  intro_content TEXT,
  listing_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(city, state)
);

-- =====================================================================
-- Row Level Security
-- =====================================================================

ALTER TABLE menopause_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menopause_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE menopause_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE menopause_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE menopause_city_pages ENABLE ROW LEVEL SECURITY;

-- Public can read approved listings
CREATE POLICY "Public read approved listings" ON menopause_listings
  FOR SELECT
  USING (is_approved = TRUE AND is_active = TRUE);

-- Service role can do anything (used by API routes and webhooks)
CREATE POLICY "Service role full access listings" ON menopause_listings
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Authenticated users can read their own claimed listings
CREATE POLICY "Users can read claimed listings" ON menopause_listings
  FOR SELECT
  USING (claimed_by = auth.uid());

-- Public can read approved reviews
CREATE POLICY "Public read approved reviews" ON menopause_reviews
  FOR SELECT
  USING (is_approved = TRUE);

-- Service role full access for all tables
CREATE POLICY "Service role full access claims" ON menopause_claims
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access payments" ON menopause_payments
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access reviews" ON menopause_reviews
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Public read city pages
CREATE POLICY "Public read city_pages" ON menopause_city_pages
  FOR SELECT
  USING (TRUE);

-- =====================================================================
-- Storage bucket for headshots
-- =====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('headshots', 'headshots', TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read headshots" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'headshots');

CREATE POLICY "Authenticated users upload headshots" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'headshots' AND auth.role() = 'authenticated');
