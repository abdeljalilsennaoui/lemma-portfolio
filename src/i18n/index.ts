export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** A string available in every supported language. */
export type Localized = Record<Locale, string>;

/** Shorthand for writing bilingual content: `t('Work', 'Projets')`. */
export function t(en: string, fr: string): Localized {
  return { en, fr };
}

/** BCP 47 tags used for `<html lang>`, hreflang and Open Graph. */
export const languageTag: Record<Locale, string> = {
  en: 'en-CA',
  fr: 'fr-CA',
};

export const languageName: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Pages live under `src/pages/[...locale]/`. The default language has no URL
 * prefix, so its route param is `undefined`.
 */
export function localeFromParam(param: string | undefined): Locale {
  return isLocale(param) ? param : defaultLocale;
}

export function localeParams() {
  return locales.map((locale) => ({
    params: { locale: locale === defaultLocale ? undefined : locale },
  }));
}
