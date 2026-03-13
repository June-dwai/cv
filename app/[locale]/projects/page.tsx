import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/profile";
import { localizeOrganization, readLocale } from "@/lib/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: LocalePageProps) {
  const locale = await readLocale(params);

  return (
    <div className="shell section-gap">
      <section>
        <SectionHeading
          eyebrow={locale === "ko" ? "Projects" : "Projects"}
          title={locale === "ko" ? "프로젝트" : "Projects"}
          description={
            locale === "ko"
              ? "실무 프로젝트와 주요 연구과제를 한 곳에서 볼 수 있게 정리했습니다."
              : "Applied projects and major research programs collected in one place."
          }
        />
      </section>

      <section className="section-gap pt-8">
        <div className="space-y-4">
          {siteContent.projects.map((project) => (
            <article key={project.title.en} className="editorial-card">
              <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="section-label">{project.period[locale]}</p>
                  <h2 className="mt-3 text-2xl">{project.title[locale]}</h2>
                  <p className="mt-3 text-sm text-muted">
                    {project.client[locale]} / {project.role[locale]}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {localizeOrganization(locale, project.employer)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag.en} className="chip">
                        {tag[locale]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="section-label">
                      {locale === "ko" ? "문제" : "Problem"}
                    </p>
                    <p className="mt-3 text-sm text-muted">{project.problem[locale]}</p>
                  </div>
                  <div className="soft-divider pt-5">
                    <p className="section-label">
                      {locale === "ko" ? "해결" : "Solution"}
                    </p>
                    <p className="mt-3 text-sm text-muted">{project.approach[locale]}</p>
                    <p className="mt-3 text-sm text-muted">{project.outcome[locale]}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap pt-0">
        <SectionHeading
          eyebrow={locale === "ko" ? "Research Grants" : "Research Grants"}
          title={locale === "ko" ? "연구과제" : "Research Grants"}
        />
        <div className="mt-8 space-y-4">
          {siteContent.researchGrants.map((grant) => (
            <article
              key={`${grant.period.en}-${grant.title.en}`}
              className="editorial-card"
            >
              <p className="section-label">{grant.period[locale]}</p>
              <h3 className="mt-3 text-lg">{grant.title[locale]}</h3>
              <p className="mt-3 text-sm text-muted">{grant.sponsor[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
