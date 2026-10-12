# Deployment checklist

## Before every push

- [ ] `npm run verify` passes (type check, build, link check).
- [ ] New text exists in both English and French.
- [ ] Every new figure names its source, and no claim goes beyond what the repository shows.
- [ ] New images have alt text.

## First deployment

- [ ] The repository exists at `github.com/abdeljalilsennaoui/lemma-portfolio` and is public.
- [ ] **Settings → Pages → Source** is set to **GitHub Actions**.
- [ ] The "Deploy to GitHub Pages" workflow finished green on `main`.
- [ ] <https://abdeljalilsennaoui.github.io/lemma-portfolio/> loads with styles and fonts.
- [ ] A case study page loads, and its images appear.
- [ ] The French version loads at `/fr/`, and the language switch stays on the same page.
- [ ] An unknown address shows the 404 page.

## Still to supply

- [ ] **LinkedIn URL** — set `links.linkedin` in `src/config/site.ts`. It is hidden until then.
- [ ] **Résumé** — put the PDF in `public/` and set `links.resume`. It is hidden until then.
- [ ] **Email** — the site shows the address published on the GitHub profile. Change
      `links.email` if another address is preferred, or set it to `null` to hide it.
- [ ] **Screenshots for CampusGuide and SUMMS** — both show an architecture diagram until real
      screenshots are added. See "Replacing portfolio images" in the README.
- [ ] **Quebec enterprise register** — search for the name by hand; it could not be checked
      automatically. See `docs/BRAND_NAME_RESEARCH.md`.

## Moving to the custom domain

- [x] Domain bought: `lemmabyajs.com`, registered at Porkbun on 12 October 2026.
- [ ] Domain verified in GitHub account settings.
- [ ] DNS records added at the registrar.
- [ ] Custom domain entered in the repository's Pages settings.
- [ ] Repository variables set: `SITE_URL` and `BASE_PATH=/`.
- [ ] Workflow re-run; site loads at the new address.
- [ ] **Enforce HTTPS** ticked.
- [ ] Old project URL redirects to the new domain (GitHub does this automatically).

Full steps are in the README under "Configuring the custom domain".
