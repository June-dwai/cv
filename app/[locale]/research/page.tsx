import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/profile";
import { readLocale } from "@/lib/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

function renderHighlightedName(authors: string) {
  const highlightName = "Kang, J. H.";
  const [before, after] = authors.split(highlightName);

  if (after === undefined) {
    return authors;
  }

  return (
    <>
      {before}
      <strong className="font-semibold text-foreground">{highlightName}</strong>
      {after}
    </>
  );
}

export default async function ResearchPage({ params }: LocalePageProps) {
  const locale = await readLocale(params);

  return (
    <div className="shell section-gap">
      <section>
        <SectionHeading
          eyebrow="Publications"
          title={locale === "ko" ? "논문" : "Research Publications"}
        />
        <div className="mt-8 space-y-4">
          {siteContent.publications.map((publication) =>
            publication.href ? (
              <Link
                key={`${publication.date}-${publication.title}`}
                href={publication.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1rem] border border-border bg-white/85 p-4 transition-colors hover:border-accent/30 hover:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-muted">{publication.date}</p>
                    {publication.isLeadAuthor ? (
                      <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-accent">
                        {locale === "ko" ? "주저자" : "First author"}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-accent">→</span>
                </div>
                <h3 className="mt-2 text-lg leading-snug">{publication.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {renderHighlightedName(publication.authors)}
                </p>
                <p className="mt-2 text-sm text-muted">{publication.journal}</p>
              </Link>
            ) : (
              <article
                key={`${publication.date}-${publication.title}`}
                className="rounded-[1rem] border border-border bg-white/85 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm text-muted">{publication.date}</p>
                  {publication.isLeadAuthor ? (
                    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-accent">
                      {locale === "ko" ? "주저자" : "First author"}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 text-lg leading-snug">{publication.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {renderHighlightedName(publication.authors)}
                </p>
                <p className="mt-2 text-sm text-muted">{publication.journal}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="section-gap pt-12 md:pt-16">
        <SectionHeading
          eyebrow="Presentations"
          title={locale === "ko" ? "학술 발표" : "Research Presentations"}
        />
        <div className="mt-8 space-y-4">
          {siteContent.presentations.map((presentation) => (
            <article
              key={`${presentation.date}-${presentation.title.en}`}
              className="rounded-[1rem] border border-border bg-white/85 p-4"
            >
              <p className="text-sm text-muted">
                {presentation.date} / {presentation.type[locale]} / {presentation.format}
              </p>
              <h3 className="mt-2 text-base leading-snug">
                {presentation.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {presentation.event} / {presentation.organizer}
              </p>
              <p className="mt-2 text-sm text-accent">
                {presentation.authorship[locale]}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap pt-12 md:pt-16">
        <SectionHeading
          eyebrow="Patents"
          title={locale === "ko" ? "특허" : "Research Patents"}
        />
        <div className="mt-8 space-y-4">
          {siteContent.patents.map((patent) => (
            <article
              key={`${patent.date}-${patent.title.en}`}
              className="rounded-[1rem] border border-border bg-white/85 p-4"
            >
              <p className="text-sm text-muted">
                {patent.date} / {patent.status[locale]}
              </p>
              <h3 className="mt-2 text-base leading-snug">{patent.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {renderHighlightedName(patent.authors)}
              </p>
              <p className="mt-2 text-sm text-muted">{patent.office}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
