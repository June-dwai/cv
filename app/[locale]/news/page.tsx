import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { isNewsStorageConfigured, listPublishedNews } from "@/lib/news/db";
import { readLocale } from "@/lib/site";

export const dynamic = "force-dynamic";

type NewsListPageProps = {
  params: Promise<{ locale: string }>;
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

export default async function NewsListPage({ params }: NewsListPageProps) {
  const locale = await readLocale(params);
  const posts = await listPublishedNews(locale);
  const configured = isNewsStorageConfigured();

  return (
    <div className="shell section-gap">
      <SectionHeading
        eyebrow="NEWS"
        title={locale === "ko" ? "소식" : "News"}
        description={
          locale === "ko"
            ? "연구, 개발, 프로젝트 진행 상황을 기록합니다."
            : "Updates on research, product development, and ongoing work."
        }
      />

      <div className="mt-8 grid gap-4">
        {!configured ? (
          <article className="editorial-card">
            <p className="text-sm font-semibold text-foreground">
              소식 저장소가 아직 연결되지 않았습니다.
            </p>
            <p className="mt-2 text-sm text-muted">
              데이터베이스와 Blob 환경변수를 연결하면 실시간으로 글을 작성하고 게시할 수 있습니다.
            </p>
          </article>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/news/${post.slug}`}
              className="editorial-card transition-colors hover:border-accent/30 hover:bg-white"
            >
              <p className="section-label">{formatDate(locale, post.publishedAt ?? post.createdAt)}</p>
              <h2 className="mt-3 text-xl leading-snug text-foreground">{post.title}</h2>
              {post.excerpt ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              ) : null}
            </Link>
          ))
        ) : (
          <article className="editorial-card">
            <p className="text-sm font-semibold text-foreground">
              {locale === "ko" ? "아직 공개된 소식이 없습니다." : "No published updates yet."}
            </p>
            <p className="mt-2 text-sm text-muted">
              {locale === "ko"
                ? "관리자 화면에서 첫 게시물을 작성하면 여기에 표시됩니다."
                : "The first published post will appear here once it is created in the admin editor."}
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
