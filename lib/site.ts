import { notFound } from "next/navigation";

export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedString = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function readLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export function t(locale: Locale, value: LocalizedString): string {
  return value[locale];
}

const organizationNames: Record<string, LocalizedString> = {
  "Dogwood AI": {
    ko: "(주)도그우드에이아이",
    en: "DogWoodAI",
  },
  DogwoodAI: {
    ko: "(주)도그우드에이아이",
    en: "DogWoodAI",
  },
  DogWoodAI: {
    ko: "(주)도그우드에이아이",
    en: "DogWoodAI",
  },
  "Yonsei University": {
    ko: "연세대학교",
    en: "Yonsei University",
  },
  "Kyunggi High School": {
    ko: "경기고등학교",
    en: "Kyunggi High School",
  },
};

export function localizeOrganization(locale: Locale, value: string): string {
  return organizationNames[value]?.[locale] ?? value;
}
