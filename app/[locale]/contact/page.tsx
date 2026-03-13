import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/profile";
import { readLocale } from "@/lib/site";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-muted"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.25" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-muted"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M2.5 9 12 4l9.5 5L12 14 2.5 9Z" />
      <path d="M6 11.2V15c0 1.9 2.9 3.5 6 3.5s6-1.6 6-3.5v-3.8" />
      <path d="M21.5 9v5" />
    </svg>
  );
}

export default async function ContactPage({ params }: LocalePageProps) {
  const locale = await readLocale(params);

  return (
    <div className="shell section-gap">
      <section>
        <SectionHeading
          eyebrow={locale === "ko" ? "Contact" : "Contact"}
          title={locale === "ko" ? "연락처" : "Contact"}
        />
      </section>

      <section className="section-gap pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="editorial-card">
            <div className="flex justify-start">
              <MailIcon />
            </div>
            <p className="section-label">Email</p>
            <h2 className="mt-3 text-xl">junhok0629@google.com</h2>
            <p className="mt-3 text-sm text-muted">
              {locale === "ko"
                ? "가장 빠른 연락 채널입니다."
                : "The fastest and most direct channel."}
            </p>
            <Link href={siteContent.links.email.href} className="btn-secondary mt-5">
              {locale === "ko" ? "메일 보내기" : "Send email"}
            </Link>
          </article>

          <article className="editorial-card">
            <div className="flex justify-start">
              <ScholarIcon />
            </div>
            <p className="section-label">Google Scholar</p>
            <h2 className="mt-3 text-xl">scholar.google.com</h2>
            <p className="mt-3 text-sm text-muted">
              {locale === "ko"
                ? "논문과 인용 정보를 확인할 수 있습니다."
                : "Browse publications and citation records."}
            </p>
            <Link
              href={siteContent.links.scholar.href}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-5"
            >
              {locale === "ko" ? "Scholar 열기" : "Open Scholar"}
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
