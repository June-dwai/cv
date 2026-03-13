import Link from "next/link";

import { siteContent } from "@/content/profile";

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

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-16">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-4xl font-semibold tracking-[0.08em] text-foreground md:text-5xl">
            CONTACT
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 md:grid-cols-2">
          <div className="text-center">
            <div className="flex justify-center">
              <MailIcon />
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-muted">
              EMAIL
            </p>
            <Link
              href={siteContent.links.email.href}
              className="mt-4 inline-block text-lg text-foreground transition-colors hover:text-accent"
            >
              {siteContent.links.email.helper?.ko}
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              <ScholarIcon />
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-muted">
              GOOGLE SCHOLAR
            </p>
            <Link
              href={siteContent.links.scholar.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-lg text-foreground transition-colors hover:text-accent"
            >
              scholar.google.com
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-border/70 pt-6 text-center text-muted">
          <p className="text-xs uppercase tracking-[0.2em]">
            &copy; 2026 Jun-Ho Kang. All rights reserved.
          </p>
          <p className="mt-3 text-[0.72rem] tracking-[0.08em]">
            Built with Next.js, TypeScript, Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
