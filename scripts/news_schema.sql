CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL CHECK (locale IN ('ko', 'en')),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_html TEXT NOT NULL,
  content_json JSONB,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  cover_image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS news_posts_locale_slug_key
ON news_posts (locale, slug);

CREATE INDEX IF NOT EXISTS news_posts_published_at_idx
ON news_posts (published_at DESC NULLS LAST);
