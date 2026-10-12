// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Where the site is served from. The defaults match the GitHub Pages project
// URL (https://abdeljalilsennaoui.github.io/lemma-portfolio/). To move to a
// custom domain, set SITE_URL=https://example.dev and BASE_PATH=/ — see
// "Configuring the custom domain" in the README. Nothing else needs to change.
const site = process.env.SITE_URL ?? 'https://abdeljalilsennaoui.github.io';
const base = process.env.BASE_PATH ?? '/lemma-portfolio';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: {
    // The whole stylesheet is about 40 kB, so it ships inside each page
    // rather than as separate render-blocking requests.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-CA', fr: 'fr-CA' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
