import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import {
  featuredProjects,
  featuredPublications,
  siteContent,
} from "@/content/profile";
import { localizeOrganization, readLocale } from "@/lib/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

function getPeriodEndValue(period: string) {
  const match = period.match(/(\d{4})\.(\d{2})\s*-\s*(\d{4})\.(\d{2})/);

  if (!match) {
    return 0;
  }

  return Number(`${match[3]}${match[4]}`);
}

function removeGpa(text: string) {
  return text.replace(/,?\s*GPA\s*\d+\.\d+\/\d+\.\d+/i, "").trim();
}

export default async function HomePage({ params }: LocalePageProps) {
  const locale = await readLocale(params);
  const homeProjects = featuredProjects
    .filter((project) => !project.title.en.includes("submarine"))
    .slice(0, 2);
  const profileTimeline = [
    ...siteContent.experience
      .filter((entry) => entry.role.en !== "Ph.D. Researcher")
      .map((entry) => ({
      kind: { ko: "경력", en: "Experience" },
      period: entry.period,
      primary: localizeOrganization(locale, entry.company),
      secondary: entry.role,
      })),
    ...siteContent.education.map((entry) => ({
      kind: { ko: "학력", en: "Education" },
      period: entry.period,
      primary: localizeOrganization(locale, entry.institution),
      secondary: {
        ko: removeGpa(entry.degree.ko),
        en: removeGpa(entry.degree.en),
      },
    })),
  ].sort((a, b) => getPeriodEndValue(b.period.ko) - getPeriodEndValue(a.period.ko));

  return (
    <div className="shell section-gap">
      <section>
        <div className="max-w-3xl">
          <p className="section-label">PROFILE</p>
          <h1 className="section-title">
            {siteContent.profile.heroRole[locale]}
          </h1>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.62fr)_minmax(220px,0.5fr)] lg:items-start">
          <article className="editorial-card w-full min-w-0">
            <p className="section-label">
              {locale === "ko" ? "관심 분야" : "Areas of Interest"}
            </p>
            <div className="mt-5 space-y-5">
              {siteContent.profile.heroFocusGroups.map((group) => (
                <div
                  key={group.title.en}
                  className="soft-divider pt-4 first:border-t-0 first:pt-0"
                >
                  <p className="text-base font-semibold text-foreground md:text-lg">
                    {group.title[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.96rem]">
                    {group.items.map((item) => item[locale]).join(" / ")}
                  </p>
                </div>
              ))}
            </div>

            <div className="soft-divider mt-6 pt-5">
              <p className="section-label">
                {locale === "ko" ? "기술 스택" : "TECH STACK"}
              </p>
              <div className="mt-4 space-y-3">
                {siteContent.profile.heroTechStack.map((group) => (
                  <p key={group.label.en} className="text-sm leading-relaxed text-muted md:text-[0.96rem]">
                    <span className="font-semibold text-foreground">
                      {group.label[locale]}:
                    </span>{" "}
                    {group.items.join(", ")}
                  </p>
                ))}
              </div>
            </div>

            <div className="soft-divider mt-6 pt-5">
              <p className="section-label">
                {locale === "ko" ? "언어" : "LANGUAGES"}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-[0.96rem]">
                {siteContent.profile.heroLanguages.map((item) => item[locale]).join(" / ")}
              </p>
            </div>
          </article>

          <article className="editorial-card w-full max-w-[18.5rem] lg:ml-auto">
            <p className="section-label">
              {locale === "ko" ? "학력 · 경력" : "Education · Experience"}
            </p>
            <div className="mt-4 space-y-4">
              {profileTimeline.map((entry) => (
                <div
                  key={`${entry.kind.en}-${entry.primary}-${entry.period.en}`}
                  className="soft-divider pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="section-label">{entry.period[locale]}</p>
                    <span className="inline-flex items-center rounded-full border border-border bg-white/80 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-muted">
                      {entry.kind[locale]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground md:text-base">
                    {entry.primary}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {entry.secondary[locale]}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-gap">
        <SectionHeading
          eyebrow={locale === "ko" ? "KEY METRICS" : "KEY METRICS"}
          title={locale === "ko" ? "주요 지표" : "Key Metrics"}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {siteContent.heroStats.map((stat) => (
            <article key={stat.label.en} className="editorial-card">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-accent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {stat.label[locale]}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.detail[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Projects"
            title={locale === "ko" ? "대표 프로젝트" : "Selected projects"}
          />
          <Link href={`/${locale}/projects`} className="btn-secondary">
            {locale === "ko" ? "전체 보기" : "View all"}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {homeProjects.map((project) => (
            <article key={project.title.en} className="editorial-card h-full">
              <p className="section-label">{project.period[locale]}</p>
              <h2 className="mt-3 min-h-[3.6rem] text-xl leading-snug">
                {project.title[locale]}
              </h2>
              <p className="mt-2 text-sm text-muted">{project.client[locale]}</p>
              <p className="mt-3 text-sm text-muted">{project.outcome[locale]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag.en} className="chip">
                    {tag[locale]}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="PUBLICATIONS"
            title={locale === "ko" ? "대표 논문" : "Featured publications"}
          />
          <Link href={`/${locale}/research`} className="btn-secondary">
            {locale === "ko" ? "연구실적 보기" : "Research"}
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {featuredPublications.slice(0, 3).map((publication) => (
            <Link
              key={`${publication.date}-${publication.title}`}
              href={publication.href ?? `/${locale}/research`}
              target={publication.href ? "_blank" : undefined}
              rel={publication.href ? "noreferrer" : undefined}
              className="block rounded-[1rem] border border-border bg-white/85 p-4 transition-colors hover:border-accent/30 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-muted">{publication.date}</p>
                <span className="text-sm font-semibold text-accent">→</span>
              </div>
              <h3 className="mt-2 text-lg leading-snug">{publication.title}</h3>
              <p className="mt-2 text-sm text-muted">{publication.journal}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
