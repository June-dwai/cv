import type { JSONContent } from "@tiptap/core";

import type { Locale } from "@/lib/site";

export const NEWS_STATUSES = ["draft", "published"] as const;

export type NewsStatus = (typeof NEWS_STATUSES)[number];

export type NewsPostRecord = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string | null;
  contentHtml: string;
  contentJson: JSONContent | null;
  status: NewsStatus;
  coverImageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsPostSummary = Pick<
  NewsPostRecord,
  "id" | "locale" | "slug" | "title" | "excerpt" | "status" | "coverImageUrl" | "publishedAt" | "createdAt" | "updatedAt"
>;

export type NewsPostUpsertInput = {
  locale: Locale;
  title: string;
  excerpt?: string | null;
  contentHtml: string;
  contentJson: JSONContent | null;
  status: NewsStatus;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};
