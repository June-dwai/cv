import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/profile";
import { localizeOrganization, readLocale } from "@/lib/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ResumePage({ params }: LocalePageProps) {
  const locale = await readLocale(params);

  return (
    <div className="shell section-gap">
      <section className="glass-panel p-7 md:p-9">
        <p className="section-label">{locale === "ko" ? "Resume" : "Resume"}</p>
        <h1 className="mt-4 max-w-3xl text-3xl tracking-[-0.04em] md:text-4xl">
          {locale === "ko"
            ? "연구와 산업 현장을 함께 아우르는 이력"
            : "A resume spanning academic research and industrial delivery"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
          {siteContent.profile.availability[locale]}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteContent.links.resume.href}
            className="btn-primary"
            target="_blank"
          >
            {locale === "ko" ? "PDF 다운로드" : "Download PDF"}
          </Link>
          <Link href={siteContent.links.email.href} className="btn-secondary">
            {locale === "ko" ? "이메일" : "Email"}
          </Link>
        </div>
      </section>

      <section className="section-gap">
        <SectionHeading
          eyebrow={locale === "ko" ? "Experience" : "Experience"}
          title={locale === "ko" ? "경력" : "Experience"}
        />
        <div className="mt-8 space-y-4">
          {siteContent.experience.map((entry) => (
            <article key={`${entry.company}-${entry.period.en}`} className="editorial-card">
              <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="section-label">{entry.period[locale]}</p>
                  <h2 className="mt-3 text-xl">{localizeOrganization(locale, entry.company)}</h2>
                  <p className="mt-2 text-sm text-muted">{entry.role[locale]}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">{entry.summary[locale]}</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    {entry.highlights.map((item) => (
                      <li
                        key={item.en}
                        className="soft-divider pt-3 first:border-t-0 first:pt-0"
                      >
                        {item[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="editorial-card">
            <SectionHeading
              eyebrow={locale === "ko" ? "Education" : "Education"}
              title={locale === "ko" ? "학력" : "Education"}
            />
            <div className="mt-7 space-y-5">
              {siteContent.education.map((entry) => (
                <div
                  key={`${entry.institution}-${entry.period.en}`}
                  className="soft-divider pt-5 first:border-t-0 first:pt-0"
                >
                  <p className="section-label">{entry.period[locale]}</p>
                  <h3 className="mt-3 text-lg">
                    {localizeOrganization(locale, entry.institution)}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{entry.degree[locale]}</p>
                  {entry.note ? (
                    <p className="mt-2 text-sm text-muted">{entry.note[locale]}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>

          <article className="editorial-card">
            <SectionHeading
              eyebrow={locale === "ko" ? "Toolkit" : "Toolkit"}
              title={locale === "ko" ? "도구와 방법론" : "Tools and methods"}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {siteContent.toolkit.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-7 space-y-5">
              {siteContent.capabilityGroups.map((group) => (
                <div
                  key={group.title.en}
                  className="soft-divider pt-5 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-lg">{group.title[locale]}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {group.items.map((item) => (
                      <li key={item.en}>{item[locale]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-gap pt-0">
        <article className="editorial-card">
          <SectionHeading
            eyebrow={locale === "ko" ? "Awards & Certificates" : "Awards & Certificates"}
            title={locale === "ko" ? "수상 및 자격" : "Awards and certificates"}
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {siteContent.awards.map((award) => (
              <div
                key={`${award.date}-${award.issuer}`}
                className="rounded-[1rem] border border-border bg-white/85 p-4"
              >
                <p className="section-label">{award.date}</p>
                <h3 className="mt-3 text-base font-semibold">{award.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted">{award.issuer}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
