import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/profile";
import { locales, readLocale } from "@/lib/site";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const locale = await readLocale(params);

  return {
    title: siteContent.siteMeta.title[locale],
    description: siteContent.siteMeta.description[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = await readLocale(params);

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
