import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsPostBySlug } from "@/lib/news/db";
import { readLocale } from "@/lib/site";

export const dynamic = "force-dynamic";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function formatDate(locale: string, value: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const locale = await readLocale(params);
  const post = await getNewsPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="shell section-gap">
      <Link href={`/${locale}/news`} className="section-label inline-flex items-center gap-2">
        ← {locale === "ko" ? "소식으로 돌아가기" : "Back to News"}
      </Link>

      <article className="mt-6 rounded-[1.5rem] border border-border bg-surface-strong p-6 shadow-sm md:p-8">
        <p className="section-label">{formatDate(locale, post.publishedAt ?? post.createdAt)}</p>
        <h1 className="mt-3 text-3xl leading-tight text-foreground md:text-[2.4rem]">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 max-w-3xl text-sm text-muted md:text-base">{post.excerpt}</p>
        ) : null}
        <div
          className="news-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
