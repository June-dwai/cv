import postgres from "postgres";

import type { Locale } from "@/lib/site";
import { buildExcerpt, sanitizeNewsHtml } from "@/lib/news/content";
import type {
  NewsPostRecord,
  NewsPostSummary,
  NewsPostUpsertInput,
  NewsStatus,
} from "@/lib/news/types";

type NewsPostRow = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  content_json: unknown;
  status: NewsStatus;
  cover_image_url: string | null;
  published_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

let sqlClient: postgres.Sql | null = null;
let schemaPromise: Promise<void> | null = null;

function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

function getSql() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return null;
  }

  if (!sqlClient) {
    sqlClient = postgres(databaseUrl, {
      max: 1,
      prepare: false,
      idle_timeout: 20,
      connect_timeout: 15,
    });
  }

  return sqlClient;
}

function toIsoString(value: Date | string | null) {
  if (!value) {
    return null;
  }

  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function mapRow(row: NewsPostRow): NewsPostRecord {
  return {
    id: row.id,
    locale: row.locale,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    contentHtml: row.content_html,
    contentJson: (row.content_json as NewsPostRecord["contentJson"]) ?? null,
    status: row.status,
    coverImageUrl: row.cover_image_url,
    publishedAt: toIsoString(row.published_at),
    createdAt: toIsoString(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIsoString(row.updated_at) ?? new Date().toISOString(),
  };
}

async function ensureSchema() {
  const sql = getSql();

  if (!sql) {
    return;
  }

  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
      await sql`
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
        )
      `;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS news_posts_locale_slug_key
        ON news_posts (locale, slug)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS news_posts_published_at_idx
        ON news_posts (published_at DESC NULLS LAST)
      `;
    })();
  }

  await schemaPromise;
}

function buildBaseSlug(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `news-${Date.now()}`
  );
}

async function generateUniqueSlug(locale: Locale, title: string, excludeId?: string) {
  const sql = getSql();

  if (!sql) {
    return buildBaseSlug(title);
  }

  await ensureSchema();

  const baseSlug = buildBaseSlug(title);
  const rows = excludeId
    ? await sql<{ slug: string }[]>`
        SELECT slug
        FROM news_posts
        WHERE locale = ${locale}
          AND slug LIKE ${`${baseSlug}%`}
          AND id <> ${excludeId}
      `
    : await sql<{ slug: string }[]>`
        SELECT slug
        FROM news_posts
        WHERE locale = ${locale}
          AND slug LIKE ${`${baseSlug}%`}
      `;

  if (!rows.some((row) => row.slug === baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let candidate = `${baseSlug}-${suffix}`;

  while (rows.some((row) => row.slug === candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  return candidate;
}

export function isNewsStorageConfigured() {
  return Boolean(getDatabaseUrl());
}

export function requireNewsStorage() {
  if (!isNewsStorageConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }
}

export async function listPublishedNews(locale: Locale) {
  const sql = getSql();

  if (!sql) {
    return [] satisfies NewsPostSummary[];
  }

  await ensureSchema();
  const rows = await sql<NewsPostRow[]>`
    SELECT *
    FROM news_posts
    WHERE locale = ${locale}
      AND status = 'published'
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `;

  return rows.map((row) => {
    const mapped = mapRow(row);
    return {
      id: mapped.id,
      locale: mapped.locale,
      slug: mapped.slug,
      title: mapped.title,
      excerpt: mapped.excerpt,
      status: mapped.status,
      coverImageUrl: mapped.coverImageUrl,
      publishedAt: mapped.publishedAt,
      createdAt: mapped.createdAt,
      updatedAt: mapped.updatedAt,
    };
  });
}

export async function listAdminNews() {
  const sql = getSql();

  if (!sql) {
    return [] satisfies NewsPostSummary[];
  }

  await ensureSchema();
  const rows = await sql<NewsPostRow[]>`
    SELECT *
    FROM news_posts
    ORDER BY updated_at DESC
  `;

  return rows.map((row) => {
    const mapped = mapRow(row);
    return {
      id: mapped.id,
      locale: mapped.locale,
      slug: mapped.slug,
      title: mapped.title,
      excerpt: mapped.excerpt,
      status: mapped.status,
      coverImageUrl: mapped.coverImageUrl,
      publishedAt: mapped.publishedAt,
      createdAt: mapped.createdAt,
      updatedAt: mapped.updatedAt,
    };
  });
}

export async function getNewsPostBySlug(locale: Locale, slug: string) {
  const sql = getSql();

  if (!sql) {
    return null;
  }

  await ensureSchema();
  const rows = await sql<NewsPostRow[]>`
    SELECT *
    FROM news_posts
    WHERE locale = ${locale}
      AND slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `;

  const row = rows[0];

  return row ? mapRow(row) : null;
}

export async function getNewsPostById(id: string) {
  const sql = getSql();

  if (!sql) {
    return null;
  }

  await ensureSchema();
  const rows = await sql<NewsPostRow[]>`
    SELECT *
    FROM news_posts
    WHERE id = ${id}
    LIMIT 1
  `;

  const row = rows[0];

  return row ? mapRow(row) : null;
}

export async function saveNewsPost(input: NewsPostUpsertInput, existingId?: string) {
  const sql = getSql();
  requireNewsStorage();

  if (!sql) {
    throw new Error("Database client unavailable.");
  }

  await ensureSchema();

  const existing = existingId ? await getNewsPostById(existingId) : null;
  const title = input.title.trim();
  const sanitizedHtml = sanitizeNewsHtml(input.contentHtml);
  const excerpt = input.excerpt?.trim() || buildExcerpt(sanitizedHtml);
  const slug =
    existing && existing.title === title && existing.locale === input.locale
      ? existing.slug
      : await generateUniqueSlug(input.locale, title, existingId);
  const now = new Date().toISOString();
  const publishedAt =
    input.status === "published"
      ? input.publishedAt ?? existing?.publishedAt ?? now
      : null;

  const rows = existingId
    ? await sql<NewsPostRow[]>`
        UPDATE news_posts
        SET
          locale = ${input.locale},
          slug = ${slug},
          title = ${title},
          excerpt = ${excerpt},
          content_html = ${sanitizedHtml},
          content_json = ${sql.json(input.contentJson)},
          status = ${input.status},
          cover_image_url = ${input.coverImageUrl ?? null},
          published_at = ${publishedAt},
          updated_at = NOW()
        WHERE id = ${existingId}
        RETURNING *
      `
    : await sql<NewsPostRow[]>`
        INSERT INTO news_posts (
          locale,
          slug,
          title,
          excerpt,
          content_html,
          content_json,
          status,
          cover_image_url,
          published_at
        ) VALUES (
          ${input.locale},
          ${slug},
          ${title},
          ${excerpt},
          ${sanitizedHtml},
          ${sql.json(input.contentJson)},
          ${input.status},
          ${input.coverImageUrl ?? null},
          ${publishedAt}
        )
        RETURNING *
      `;

  return mapRow(rows[0]);
}
