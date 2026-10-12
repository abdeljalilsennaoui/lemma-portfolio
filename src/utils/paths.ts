import { defaultLocale, type Locale } from '../i18n';

// `import.meta.env.BASE_URL` is "/lemma-portfolio/" on GitHub Pages and "/"
// on a custom domain. Every internal link goes through `href()` so the site
// works at either location without edits.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Build an internal URL.
 *
 *   href('/')                      → /lemma-portfolio/
 *   href('/work/summs/', 'fr')     → /lemma-portfolio/fr/work/summs/
 *   href('/#contact', 'fr')        → /lemma-portfolio/fr/#contact
 */
export function href(path: string, locale: Locale = defaultLocale): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${base}${prefix}${normalised}`;
}

/** URL of a file in `public/`, which is never language-prefixed. */
export function asset(path: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalised}`;
}

/** Absolute URL for canonical links, Open Graph and structured data. */
export function absolute(pathWithBase: string, site: URL | undefined): string {
  return new URL(pathWithBase, site ?? 'http://localhost:4321').toString();
}

/** Strip the base and language prefix from a pathname: "/base/fr/work/x/" → "/work/x/". */
export function routeOf(pathname: string, locale: Locale): string {
  let route = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (locale !== defaultLocale && route.startsWith(`/${locale}`)) {
    route = route.slice(locale.length + 1);
  }
  return route === '' ? '/' : route;
}
