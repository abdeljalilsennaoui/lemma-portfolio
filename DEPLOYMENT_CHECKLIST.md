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
- [x] **Pictures for CampusGuide** — three frames from the test recordings in the team wiki
      (800 px wide; replace them if sharper originals turn up), five Figma mockups from the
      wiki's UI design page for the stories I implemented, the SonarQube quality gate and the
      team's component diagram.
- [x] **Pictures for SUMMS** — four screenshots of the running application from winter 2026
      (the map page, a transit route, its steps, a route), plus the team's design diagrams.
      The screenshots are under 900 px wide; replace them if larger originals turn up.
- [ ] **More pictures for the study assistant** — it has one screenshot. The other three study
      modes (flashcards, quiz, question answering) are not pictured.
- [ ] **GDG Concordia** — the role (VP Admin) and the 2026 events were read from the chapter's
      public page on 13 November 2026. Confirm the wording in `src/data/community.ts` and
      `src/i18n/ui.ts`, and add anything specific you ran yourself.
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
