# Brand name research: LEMMA by AJS

Checked on 12 October 2026. This is a record of what was looked up and what was found. It is not
legal advice, and an empty search result is not a clearance: a name can conflict with an
unregistered mark, a mark filed after this date, or a business that a search did not surface.

**Status of the name: provisional.** The site uses it through one configuration file
(`src/config/site.ts`), so it can be changed without touching components.

## Summary

| Question | Finding | Confidence |
| --- | --- | --- |
| Are the three candidate domains registered? | No, none of them | High — asked the registries directly |
| Is there a Canadian trademark for LEMMA, or for the combinations? | None found | Medium — queried the CIPO database, see caveats |
| Is the name in Quebec's enterprise register? | **Not verified** | — the register refused automated access |
| Do other technology companies use "Lemma"? | Yes, several | High |
| Does anyone use "LEMMA by AJS", "LEMMA AJS" or "AJS LEMMA"? | None found | Medium — web search only |

## Domains

Each registry's own RDAP service was queried. RDAP is the registry's authoritative record of
whether a name is registered; it is not the same as a missing website or missing DNS records.

| Domain | Registry queried | Answer | Meaning |
| --- | --- | --- | --- |
| `lemmabyajs.dev` | Google Registry (`pubapi.registry.google`) | 404 | Not registered |
| `lemmabyajs.com` | Verisign (`rdap.verisign.com`) | 404 | Not registered |
| `ajslemma.dev` | Google Registry | 404 | Not registered |

Controls, to confirm the method distinguishes the two cases: `google.dev`, `lemma.dev` and
`lemma.com` all returned 200 (registered). A WHOIS lookup for `lemmabyajs.com` agreed: "No match
for domain".

What this does not tell you: the price, whether a registrar lists the name as premium, or whether
it will still be free tomorrow. Nothing was purchased. Confirm at a registrar at the moment of
buying.

Note that `lemma.dev` and `lemma.com` are both taken, which is consistent with the name being in
wide use on its own.

## Canadian trademarks (CIPO)

The Canadian Trademarks Database was queried through the search service behind its public
website.

| Search | Results |
| --- | --- |
| `lemma` | 1: **LineLemma**, application 2196386, classes 9 and 41, status *abandoned* |
| `lemma by ajs` | 0 |
| `ajs lemma` | 0 |
| `lemma ajs` | 0 |
| `ajs` | 10, none in software or computing classes; the registered ones are in classes 19, 36 and 16/40/42 under unrelated names |

So no registered or pending Canadian mark for LEMMA alone, or for any of the three combinations,
was found.

Caveats: the query went to the endpoint the public search page uses, not to a documented API, and
it was a text search, not a search for confusingly similar marks. Repeat it yourself at
<https://ised-isde.canada.ca/cipo/trademark-search/srch> before relying on it, and note that an
unregistered mark can still have rights in Canada through use.

## Quebec enterprise register (REQ)

**Not verified.** The Registraire des entreprises website returned HTTP 403 to automated
requests, so no search could be run.

To check it yourself: go to <https://www.registreentreprises.gouv.qc.ca>, choose "Rechercher une
entreprise au registre", and search for `LEMMA`, `LEMMA AJS` and `AJS LEMMA`. The search is free.

This matters less while LEMMA is only the name of a portfolio. It would matter if you ever
carried on a business in Quebec under the name, because a name used for a business there
generally has to be declared and must not be confusingly similar to one already registered.

## Other uses of "Lemma" in technology

The name on its own is in active use. Found in public web searches:

- **Lemma** (San Francisco, Y Combinator Fall 2025) — a product for improving AI agents from
  production feedback.
- **Lemma by Thread AI** — an AI workflow infrastructure platform, launched 2024.
- United States trademark applications for **LEMMA** in software classes: serial 98530087
  (filed May 2024, AI workflow software) and serial 90758934 (filed June 2021, software design
  and development services). Their current status was not checked.
- United States applications by Axiomatic AI for **AXIOMATIC LEMMA** and **AXIOMATIC AI'S
  LEMMA**, filed October 2025, classes 9 and 42.
- A French engineering-software company named Lemma, an open-source "lemma" business-rules
  language, and others.

Separately, "AJS" is used by an unrelated legal-software company in South Africa and other
businesses.

No use of the exact phrases "LEMMA by AJS", "LEMMA AJS" or "AJS LEMMA" was found.

## What this means

- **As a personal portfolio identity, the risk is low.** The site is non-commercial, names its
  author prominently, and adds "by AJS" to a common mathematical word.
- **"LEMMA" alone is not a name you could own.** It is a dictionary word already used by several
  software companies, at least two of which have filed for it in the United States. Always use
  the full form, LEMMA by AJS, in titles and metadata, as the site does.
- **If this becomes a business,** treat the name as unvetted. The realistic risks are a
  confusion objection from one of the existing Lemma companies in a software class, and the
  difficulty of registering a mark whose main word is already claimed. Speak to a trademark agent
  before investing in the name commercially, and check the Quebec register at that point.
- **The domain is the easy part.** `lemmabyajs.dev` was unregistered when checked.

## Sources

- Google Registry RDAP: `https://pubapi.registry.google/rdap/domain/<name>`
- Verisign RDAP: `https://rdap.verisign.com/com/v1/domain/<name>`
- CIPO Canadian Trademarks Database: <https://ised-isde.canada.ca/cipo/trademark-search/srch>
- <https://www.ycombinator.com/companies/uselemma>
- <https://www.fierce-network.com/newswire/thread-ai-emerges-stealth-debuts-composable-infra-platform>
- <https://trademarks.justia.com/985/30/lemma-98530087.html>
- <https://trademark.justia.com/907/58/lemma-90758934.html>
- <https://gleanmark.com/owner/axiomaticaiinc>
