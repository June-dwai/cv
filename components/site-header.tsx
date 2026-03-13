"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { homeNav, siteContent } from "@/content/profile";
import type { Locale } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function isCurrentPath(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (current === target) {
    return true;
  }

  const parts = target.split("/").filter(Boolean);
  if (parts.length === 1) {
    return false;
  }

  return current.startsWith(`${target}/`);
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const navItems = homeNav(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#fbfcfb]/88 backdrop-blur">
      <div className="shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${locale}`} className="group">
            <div className="text-xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent md:text-2xl">
              {siteContent.profile.nameEnglish}
            </div>
          </Link>
          <div className="md:hidden">
            <LocaleSwitcher locale={locale} />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {navItems.map((item) => {
              const active = isCurrentPath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition-colors ${
                    active
                      ? "border border-border bg-[#edf1f4] text-foreground"
                      : "hover:bg-[#f4f6f8] hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
