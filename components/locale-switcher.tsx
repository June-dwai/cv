"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/site";

type LocaleSwitcherProps = {
  locale: Locale;
};

function buildLocaleHref(pathname: string, targetLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);

  if (!parts.length) {
    return `/${targetLocale}`;
  }

  if (locales.includes(parts[0] as Locale)) {
    parts[0] = targetLocale;
    return `/${parts.join("/")}`;
  }

  return `/${targetLocale}`;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 p-1 text-xs font-semibold tracking-[0.16em] text-muted">
      {locales.map((target) => {
        const active = target === locale;

        return (
          <Link
            key={target}
            href={buildLocaleHref(pathname, target)}
            className={`rounded-full px-3 py-2 transition-colors ${
              active
                ? "border border-border bg-[#edf1f4] text-foreground"
                : "text-muted hover:bg-[#f4f6f8] hover:text-foreground"
            }`}
          >
            {target.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
