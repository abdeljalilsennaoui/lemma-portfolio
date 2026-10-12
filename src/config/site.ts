import { t, type Localized } from '../i18n';

/**
 * Brand, identity and contact details for the whole site.
 *
 * "LEMMA by AJS" is a provisional name. Everything that prints it reads from
 * this file, so renaming the brand is an edit here plus the logo assets in
 * `public/` — no component changes.
 */
export const brand = {
  /** Full public name, used in titles, metadata and the footer. */
  name: 'LEMMA by AJS',
  /** Lowercase wordmark. The full stop is drawn as a square by `Wordmark.astro`. */
  wordmark: 'lemma',
  /** Secondary signature shown beside the wordmark. */
  signature: 'BY AJS',
  headline: t('Built on logic.', 'Bâti sur la logique.'),
  descriptor: t(
    'Independent software engineering studio',
    'Studio indépendant de génie logiciel',
  ),
} as const;

export const person = {
  name: 'Abdeljalil Sennaoui',
  givenName: 'Abdeljalil',
  familyName: 'Sennaoui',
  role: t('Software Engineering student', 'Étudiant en génie logiciel'),
  school: {
    name: t('Concordia University', 'Université Concordia'),
    url: 'https://www.concordia.ca/',
  },
  location: t('Montreal, Quebec, Canada', 'Montréal (Québec), Canada'),
} as const;

/**
 * Public links. A value of `null` hides the link everywhere it would appear,
 * so nothing unverified is ever published.
 */
export const links: {
  github: string;
  githubHandle: string;
  email: string | null;
  linkedin: string | null;
  resume: string | null;
  repository: string;
} = {
  github: 'https://github.com/abdeljalilsennaoui',
  githubHandle: 'abdeljalilsennaoui',
  // Hidden by choice. Set to an address to show it in the contact section.
  email: null,
  // Not verified yet. Set to the full profile URL to show it.
  linkedin: null,
  // Hidden by choice. To show one, put the PDF in `public/` and set this to its
  // path, e.g. '/resume.pdf'.
  resume: null,
  repository: 'https://github.com/abdeljalilsennaoui/lemma-portfolio',
};

export const seo: {
  title: Localized;
  description: Localized;
  ogImage: string;
} = {
  title: t(
    `${person.name} — Software Engineering Projects | ${brand.name}`,
    `${person.name} — Projets de génie logiciel | ${brand.name}`,
  ),
  description: t(
    `Software designed, built and tested by ${person.name}, a Software Engineering student at Concordia University in Montreal. Case studies in test automation, back-end, Android and software architecture.`,
    `Des logiciels conçus, développés et testés par ${person.name}, étudiant en génie logiciel à l'Université Concordia, à Montréal. Études de cas en automatisation des tests, développement back-end, Android et architecture logicielle.`,
  ),
  ogImage: '/og.png',
};
