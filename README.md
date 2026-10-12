# LEMMA by AJS

The software engineering portfolio of **Abdeljalil Sennaoui**, a Software Engineering student at
Concordia University in Montreal.

Live site: <https://lemmabyajs.com/>

LEMMA by AJS is the name I publish my work under. It is a personal identity, not a company: there
are no employees and no clients, and every project on the site is one I worked on myself. The
projects themselves live in their own repositories; this site links to them and explains them.

A lemma is a proven result used as a step toward a larger theorem. The site is built around that
idea: each project is stated plainly, argued with evidence, and closed with the mark that ends a
proof.

## What is on the site

- **Home** — a statement, a matrix of projects against the disciplines they exercised (also
  viewable as a graph), four selected projects, an about section, engineering principles and
  skills with evidence, and contact details.
- **Case studies** — one page per project: overview, problem, goals, technologies, architecture,
  my responsibilities, engineering decisions, testing, challenges, results, and links.
- **English and French**, with a language switch that keeps you on the same page.
- **Two themes**, blackboard (default) and paper.

Every figure quoted on the site is either taken from the project's own repository or counted
there, and each results table names its source. Team projects say what the team built and,
separately, what I built.

## Technology

| Purpose | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) 7, static output |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 4, design tokens as CSS custom properties |
| Type | Computer Modern (display), IBM Plex Sans and Mono (text), all self-hosted |
| Images | `astro:assets`, responsive WebP |
| Hosting | GitHub Pages, deployed by GitHub Actions |

There is no client-side framework. The JavaScript on a page is three small inline scripts: the
theme switch, the mobile menu, and the matrix and graph interactions. There are no analytics, no
cookies, no third-party scripts and no requests to other origins.

## Directory structure

```
.
├── .github/workflows/deploy.yml   Build, verify and deploy to GitHub Pages
├── docs/                          Brand-name research
├── public/                        Favicons, social image
├── scripts/                       Link checker and asset generators
├── src/
│   ├── assets/
│   │   ├── fonts/                 Subset display fonts and their licence
│   │   └── projects/<slug>/       Real screenshots, one folder per project
│   ├── components/                Page sections and building blocks
│   ├── config/site.ts             Brand name, identity, links — edit here to rename
│   ├── data/
│   │   ├── projects/              One file per project, plus index.ts
│   │   ├── disciplines.ts         Columns of the hero matrix
│   │   ├── principles.ts          Engineering principles
│   │   └── skills.ts              Skills and where each is evidenced
│   ├── i18n/                      Languages and interface copy
│   ├── layouts/Base.astro         <head>, metadata, structured data
│   ├── pages/                     Routes
│   ├── styles/global.css          Fonts, tokens, shared component classes
│   ├── types/content.ts           The shape of a project
│   └── utils/paths.ts             Base-path-aware links
├── astro.config.mjs
└── DEPLOYMENT_CHECKLIST.md
```

Content is kept apart from presentation: `src/data/` and `src/i18n/` hold every word, and
`src/components/` only decides how it looks.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The site is served at <http://localhost:4321/lemma-portfolio/>. The `/lemma-portfolio` prefix is
there locally too, on purpose, so that a link which would break on GitHub Pages breaks on your
machine first.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run check` | TypeScript and Astro diagnostics |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:links` | Check every internal link, image and anchor in `dist/` |
| `npm run verify` | `check`, then `build`, then `test:links` — what CI runs |
| `npm run fonts` | Rebuild the subset display fonts |
| `npm run icons` | Rebuild `favicon.ico` and `apple-touch-icon.png` from `favicon.svg` |
| `npm run og` | Rebuild the social image (needs Google Chrome) |

To also request every outbound link: `node scripts/check-links.mjs --external`.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which
type-checks, builds, checks links and deploys to GitHub Pages. Pull requests run the same checks
without deploying.

One setting is needed once, in the repository on GitHub: **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

The address the site is built for comes from two values, read in `astro.config.mjs`:

| Variable | Default | Meaning |
| --- | --- | --- |
| `SITE_URL` | `https://abdeljalilsennaoui.github.io` | Origin, used for canonical URLs, the sitemap and social metadata |
| `BASE_PATH` | `/lemma-portfolio` | Path prefix the site is served under |

Every internal link goes through `href()` in `src/utils/paths.ts`, so nothing else refers to the
address.

## Updating project content

Each project is one TypeScript file in `src/data/projects/`. Open it and edit the text. Every
string is written once per language:

```ts
summary: t('English sentence.', 'Phrase en français.'),
```

`npm run check` reports a missing field or a typo in a field name, because the file has to match
the `Project` type in `src/types/content.ts`.

Only state what the project's repository can back up, and say where a number comes from in the
`source` field of its result row.

## Adding a new project

1. Copy an existing file in `src/data/projects/` to `my-project.ts` and rewrite its content. Set
   `slug` (the URL segment), `order` (its position and lemma number) and `disciplines` (which
   columns of the hero matrix it fills).
2. Add it to the list in `src/data/projects/index.ts`.
3. If it has screenshots, put them in `src/assets/projects/<slug>/` and import them at the top of
   the file, as the existing projects do.

That is all. The gallery entry, the case study pages in both languages, the hero matrix, the
previous and next links and the sitemap are generated from the list. To cite the project as
evidence for a skill, add it in `src/data/skills.ts`.

## Replacing portfolio images

Screenshots live in `src/assets/projects/<slug>/` and are imported by the project file. To
replace one, overwrite the file and keep its name, or add a new file and change the import. Then
update its `alt` text (what the image shows, for someone who cannot see it) and its `caption`.
Images are resized and converted to WebP at build time, so commit the original PNG.

A project with no `cover` shows its architecture diagram instead, labelled as a diagram.
CampusGuide and SUMMS are in that state because their repositories do not contain screenshots of
the running application. To give one a real cover:

```ts
import map from '../../assets/projects/campus-guide/map.png';

cover: {
  src: map,
  alt: t('What the screenshot shows.', 'Ce que montre la capture.'),
  caption: t('One sentence of context.', 'Une phrase de contexte.'),
},
```

Use only real screenshots of the real application.

## Adding the LinkedIn link, a résumé or an email address

All three are in `src/config/site.ts`:

```ts
email: 'hello@lemmabyajs.com', // forwards to a private inbox; null hides it
linkedin: null, // set to the full profile URL to show it
resume: null,   // put the PDF in public/ and set to '/resume.pdf'
```

A value of `null` hides the link everywhere it would appear.

## Renaming the brand

The name is provisional (see [docs/BRAND_NAME_RESEARCH.md](docs/BRAND_NAME_RESEARCH.md)).
Everything that prints it reads from `brand` in `src/config/site.ts`. To rename:

1. Edit `brand` and, if needed, `seo` in `src/config/site.ts`.
2. Edit the mark in `public/favicon.svg`, then run `npm run icons`.
3. Edit `scripts/og-image.html`, then run `npm run og`.
4. Search the copy in `src/i18n/ui.ts` for the old name; the About section mentions it in prose.

## Configuring the custom domain

The domain is `lemmabyajs.com`, registered at Porkbun. The site moved to it on 12 October 2026;
the steps are kept here in case it has to be set up again. Do them in this order: if GitHub is
given the domain before DNS points at it, the working `github.io` address starts redirecting to a
domain that does not resolve yet.

1. **Verify the domain** on GitHub: your account **Settings → Pages → Add a domain**, enter
   `lemmabyajs.com`. GitHub shows a TXT record; add it in Porkbun (step 2) and press **Verify**.
   This stops anyone else from pointing your domain at their own Pages site.
2. **Set the DNS records** in Porkbun: **Domain Management → lemmabyajs.com → DNS**. Delete the
   two default parking records (an `ALIAS` for the root and a `CNAME` for `*`, both pointing at
   `uixie.porkbun.com`), then add:

   | Type | Host | Answer |
   | --- | --- | --- |
   | A | *(blank)* | `185.199.108.153` |
   | A | *(blank)* | `185.199.109.153` |
   | A | *(blank)* | `185.199.110.153` |
   | A | *(blank)* | `185.199.111.153` |
   | AAAA | *(blank)* | `2606:50c0:8000::153` |
   | AAAA | *(blank)* | `2606:50c0:8001::153` |
   | AAAA | *(blank)* | `2606:50c0:8002::153` |
   | AAAA | *(blank)* | `2606:50c0:8003::153` |
   | CNAME | `www` | `abdeljalilsennaoui.github.io` |
   | TXT | *(the host GitHub shows in step 1)* | *(the value GitHub shows in step 1)* |

   These are GitHub's published addresses at the time of writing; confirm them against
   [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
   before entering them. Check the result with `dig +short lemmabyajs.com A`.
3. **Tell the build**: repository **Settings → Secrets and variables → Actions → Variables**,
   add `SITE_URL` = `https://lemmabyajs.com` and `BASE_PATH` = `/`.
4. **Tell GitHub Pages**: repository **Settings → Pages → Custom domain**, enter
   `lemmabyajs.com` and save.
5. **Redeploy**: run the workflow from the Actions tab, or push a commit.
6. When the certificate has been issued (usually within minutes, sometimes up to an hour), tick
   **Enforce HTTPS** in the Pages settings.

With a custom domain the site is served from the root, so `robots.txt` takes effect. On the
project URL it does not, because crawlers only read `robots.txt` from the root of a host. The old
`github.io` address redirects to the domain automatically.

To go back to the project URL: clear the custom domain in the Pages settings, delete the two
repository variables, and redeploy.

## Troubleshooting

**The page loads without styles, or links lead to a 404 on GitHub Pages.** The build was made
for a different address. Check the `SITE_URL` and `BASE_PATH` repository variables; for the
project URL both should be unset.

**The deploy job fails with "Get Pages site failed".** Pages is not enabled, or its source is
not GitHub Actions. See [Deployment](#deployment).

**`npm run test:links` reports a link that does not start with the base path.** A link was
written by hand. Use `href('/path/', locale)` for pages and `asset('/file')` for files in
`public/`.

**`npm install` fails with `EACCES` in `~/.npm`.** Some files in the npm cache are owned by
root, usually after a past `sudo npm`. Fix the ownership with
`sudo chown -R $(id -u):$(id -g) ~/.npm`.

**`npm run og` cannot find Chrome.** Set `CHROME_PATH` to the Chrome or Chromium executable.

## Maintenance

- Run `npm run verify` before pushing; CI runs the same thing.
- Update dependencies with `npm update`, then `npm run verify`. For a new major version of
  Astro, read its upgrade guide first.
- When a project changes, update its figures and the date in the `source` of the affected rows.
- Review the site once a term: remove what no longer represents your work.

## Credits and licences

- Computer Modern Unicode fonts, © Andrey V. Panov and the authors of the original fonts, under
  the SIL Open Font License 1.1. The files in `src/assets/fonts/` are Latin subsets of CMU Serif,
  served under the CSS family name "Lemma Serif"; the licence is alongside them.
- IBM Plex, © IBM Corp., under the SIL Open Font License 1.1.
- Screenshots are from my own repositories.

The content of this site — text, images and the LEMMA by AJS identity — is © Abdeljalil
Sennaoui.
