CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  directory text NOT NULL,
  source text DEFAULT 'footer-bar',
  created_at timestamptz DEFAULT now(),
  UNIQUE(email, directory)
);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write
CREATE POLICY "Service role only" ON email_subscribers
  USING (false)
  WITH CHECK (false);
