import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { JSONContent } from "@tiptap/core";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveNewsPost } from "@/lib/news/db";
import { NEWS_STATUSES } from "@/lib/news/types";
import { locales } from "@/lib/site";

export const runtime = "nodejs";

const schema = z.object({
  locale: z.enum(locales),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().max(320).nullable().optional(),
  contentHtml: z.string().trim().min(1),
  contentJson: z.unknown().nullable(),
  status: z.enum(NEWS_STATUSES),
  coverImageUrl: z.string().url().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

type UpdatePostRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: UpdatePostRouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  }

  const post = await saveNewsPost(
    {
      ...parsed.data,
      contentJson: (parsed.data.contentJson ?? null) as JSONContent | null,
    },
    id,
  );

  revalidatePath(`/${post.locale}/news`);
  revalidatePath(`/${post.locale}/news/${post.slug}`);

  return NextResponse.json({ post });
}
