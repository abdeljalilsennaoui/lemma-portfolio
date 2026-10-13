# Deployment checklist

## Before every push

- [ ] `npm run verify` passes (type check, build, link check).
- [ ] New text exists in both English and French.
- [ ] Every new figure names its source, and no claim goes beyond what the repository shows.
- [ ] New images have alt text.

## First deployment

- [x] The repository exists at `github.com/abdeljalilsennaoui/lemma-portfolio` and is public.
- [x] **Settings → Pages → Source** is set to **GitHub Actions**.
- [x] The "Deploy to GitHub Pages" workflow finished green on `main`.
- [x] <https://abdeljalilsennaoui.github.io/lemma-portfolio/> loads with styles and fonts.
- [x] A case study page loads, and its images appear.
- [x] The French version loads at `/fr/`, and the language switch stays on the same page.
- [x] An unknown address shows the 404 page.

## Still to supply

- [ ] **LinkedIn URL** — set `links.linkedin` in `src/config/site.ts`. It is hidden until then.
- [x] **Résumé** — not published, by choice. `links.resume` stays `null`.
- [x] **Email** — the site shows `hello@lemmabyajs.com`, which Porkbun forwards to a private
      inbox. No personal address is published.
- [x] **Pictures for CampusGuide** — three frames from the test recordings in the team wiki.
      They are 800 px wide; replace them if sharper originals turn up.
- [ ] **Pictures for SUMMS** — none exist in its repository, which has no wiki. It shows an
      architecture diagram until real screenshots are supplied. See "Replacing portfolio
      images" in the README.
- [x] **Quebec enterprise register** — `lemma` and `ajs` searched by hand on 12 October 2026. No
      name combines the two. See `docs/BRAND_NAME_RESEARCH.md`.

## Moving to the custom domain

- [x] Domain bought: `lemmabyajs.com`, registered at Porkbun on 12 October 2026.
- [x] Domain verified in GitHub account settings.
- [x] DNS records added at the registrar.
- [x] Custom domain entered in the repository's Pages settings.
- [x] Repository variables set: `SITE_URL` and `BASE_PATH=/`.
- [x] Workflow re-run; site loads at the new address.
- [x] **Enforce HTTPS** ticked.
- [x] Old project URL redirects to the new domain (GitHub does this automatically).

Full steps are in the README under "Configuring the custom domain".
