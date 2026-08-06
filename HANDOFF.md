# AGG — Handoff Note (General Compliance Platform pivot)

> Read this first in any new session. It captures the strategy, product model, current
> build state, and conventions so you can continue without the prior chat history.
> Last updated: 2026 (session after the Mr. Perri partner-deck review).

---

## 0. What this repo is

This repo (`aurora-green-v2-kindergarten`) started as a fork of the **yacht** demo
(`Aurora-green-v2`, separate repo, LIVE — do not touch). It was reskinned to a Norwegian
**kindergarten / Grønt Flagg** pilot, and is now being **generalized again** into the
platform Maria (founder) actually pitches: **Aurora Green Genesis (AGG)** — a general
compliance platform, two products (see §2). Kindergarten is now just ONE example entity.

- Stack: plain HTML + Tailwind (CDN) + vanilla JS. No build step, no backend, all canned data.
- Demo/research instrument only — NOT production. Illustrates the vision; the Italian
  partner will build the real thing (see §1).
- Remote: `https://github.com/salesteam-create/aurora-green-v2-kindergarten.git`
- Yacht safety tag on the yacht repo: `v3-pre-kindergarten-fork`.

---

## 1. Strategic context (why this shape)

- **Italy = partner model.** Public administration in Italy needs an accredited, established
  vendor. Maria is partnering with a large Italian firm (director = "Mr. Perri") that already
  serves public admin. The **partner builds & sells** the solution; **Maria's team consults
  for a % + fee**. Advisory fees fund finishing the product for Norway/France.
- **Norway = primary market**, Maria keeps full control there (kindergartens / Grønt Flagg /
  Innovasjon Norge funding track).
- **Our role:** build the DEMO (the "Functional Prototype" in the partner deck's Phase-3).
  The partner presents it in Phase-4.
- **Language nuance:** the Italian-partner deck freely says "MVP / prototype". The Norway /
  Innovasjon Norge track must say "demo / research instrument", NEVER "prototype" (funding
  eligibility). Same product, two vocabularies by audience.

---

## 2. Product model — ONE platform, TWO modules (both "due diligence layers")

| | Module 1 — PA Due Diligence Overview | Module 2 — Compliance Dashboard (B2B) |
|---|---|---|
| For | Authorities (e.g. Ministry of Environment) | Entities (corporates, public bodies, startups) |
| Shows | Map (Italy/Norway), red/green/orange location dots, filter by region + entity type, aggregate compliance %, preventive non-compliance alerts | Standards (ISO 27001 / GDPR / NIS2 / ESG), % compliant, actionable steps + deadlines, Scientific Committee comments, Regulatory AI Agent alerts, "Audit Ready" downloadable report, certification support, resource links |
| Purpose | Tells authorities WHERE to inspect (targeted, not random audits) | Tells an entity WHAT to do to stay compliant |
| Persona slot in code | `dnv` persona (relabelled "Overview — Authority") — main view becomes the MAP | `compliance` persona (relabelled) — generalized content |
| Owner sees this? | Authority | The entity itself |

- Entity types: **schools (incl. kindergartens), hospitals, municipal bodies, hotels.**
- Standards: **ISO 27001, GDPR, NIS2, ESG / Green Supply Chain.**
- Geography: **Italy + Norway.**
- Future (NOT now): connect the two modules via API.

### Deck vocabulary to reuse verbatim in the demo
"PA Due Diligence Overview", "Continuous Enterprise Compliance Management", "Audit Ready",
"Regulatory AI Agent", "Preventive Non-Compliance Alerts", "Targeted Audits",
"Scientific Committee", "Hybrid AI + Human oversight".

---

## 3. Current build state — v4 general-compliance build is DONE

Both modules are built and verified in-browser (console clean). Branch
`feat/general-compliance`, rollback tag `v4-pre-general`.

- **Entry point:** `docs/index.html` IS the app (the yacht landing page was deleted; `app.html`
  no longer exists). Lands on the Vault Door, code pre-filled `vault-2026`.
- **The site lives in `docs/`** because GitHub Pages publishes that folder and nothing else.
  Anything outside `docs/` -- this file, the client changelog, the brief -- stays private by
  construction. Never move demo files back to the repo root.
- **Vault architecture:** Vault Door (locked) → Scientific Vault shell → Entity Index → enter a
  Private Vault. Stages `locked` / `sv-shell` / `in-vault` in `js/state.js`.
- **Personas:** internal keys `owner/compliance/dnv/scientific` kept. TWO exposed:
  `dnv` ("Overview — Authority") and `compliance` ("Compliance — Entity"). `owner` + `scientific`
  hidden but wired. `PERSONA_LEVEL`: owner/compliance = vault, dnv/scientific = sv.
- **Module 1 (`js/personas/dnv.js` view `overview`, default):** PA Due Diligence Overview.
  Stylised Norway + Italy maps (`js/components/overview-map.js`), pins by compliance band,
  region/entity-type filters (`overviewFilters` in state), aggregate %, Preventive Non-Compliance
  Alerts, click-a-pin → read-only modal. Two-tier triage: targeted audit vs enhanced monitoring.
- **Module 2 (`js/personas/compliance.js`):** Regulatory AI Agent alerts, Audit Ready report
  (mock download + toast), Certification Support, deadlines instead of costs.
- **Data (`js/state.js`):** 4 entities — Solstråle + Regnbuen (schools, Rogaland, Norway),
  Ospedale San Rocco (hospital) + Comune di Bergamo (municipal, Lombardia, Italy). 8 shared
  compliance domains each, 49 criteria total, 4-standard `criteriaFramework` (ISO 27001 / GDPR /
  NIS2 / ESG, weights sum 1.0). Per-entity `scoreHistory`. Each entity carries `country`,
  `region`, `city`, `entityType`, `map:{x,y}`.
- **Criterion IDs are semantic now**, prefixed per entity: `sol-`, `rb-`, `hos-`, `mun-`
  (e.g. `sol-gdpr-art30-ropa`). Entity, vault and component IDs are still the old marine ones
  (`delhi-star`, `engine-room`) — invisible to users; do NOT assume ID names are meaningful.
- **Content (`js/content.js`):** all 49 criteria covered in `aiPhases`, `aiFindings`,
  `reviewerNotes`, plus `regulatoryAlerts`. `pick()` falls back from exact ID → entity-agnostic
  suffix → `default`, so shared controls define text once. Zero criteria hit `default`.
- **Scoring model:** seeded baseline + formula *delta* (`state.js`). Seeded scores and raw
  CERT_WEIGHTS are different scales; the formula supplies movement, not the absolute value.
  Any scoring change must respect this or the headline number snaps on first upload.
- **Dev server:** `.claude/devserver.py` serves with `Cache-Control: no-store`.
  `python .claude/devserver.py 8770`.

### Known issues / accepted limitations
- **At full compliance the entity score reads 81, not 100** — areas that never diverged keep
  their seeded scores. Deliberate; reasoning in commit `0cf11a9`.
- **The 6 regulatory alerts are illustrative and NOT fact-checked** against real legislation.
  Marked as such in `content.js` and in the client changelog. Needs a review pass before anyone
  treats them as advice.
- **Never verified at 1440×900** (the pitch resolution). The preview pane caps at 800px, so
  chip rows and stat tiles may wrap differently at full width.
- **Regnbuen shows "No assignments"** for the default compliance entity — pre-existing
  compliance-filter behaviour, not a regression.
- `js/components/digital-twin.js` is dead but still wired to the hidden owner persona. Drop it
  when that persona is retired.
- Owner + Scientific personas still speak in € internally (hidden). Sweep if un-hidden.
- Criteria-framework pillar groupings only visible in the hidden Scientific Committee view.

---

## 4. What's next

Nothing from the v4 plan is outstanding. Candidates for the next iteration, none committed to:

1. **Fact-check the regulatory alerts** before the partner presentation. Highest priority —
   it is the only content that could be mistaken for legal advice.
2. **Rehearse at 1440×900** and fix any layout wrap.
3. **API link between the two modules** (§2 says future) — today they read the same state object
   but there is no interface between them.
4. **New public landing page** (separate track). Must NOT live at `docs/index.html` — that is
   the app now. Give it its own path or its own site.
5. **Un-hide the Scientific Committee persona** if the Committee story needs its own screen;
   would need the pillar groupings and € wording fixed first.
6. **A fifth entity type (hotel)** — cheap now: 6 touchpoints, and shared controls need no new
   content thanks to the suffix fallback.

---

## 5. Where things live (file → responsibility)

Everything the demo needs is under `docs/` — that folder *is* the published site.
Paths below are relative to `docs/`.

- `js/components/overview-map.js` → the Module 1 map (silhouettes, pins, legend).
- `js/personas/dnv.js` → Authority: overview map, review queue, completed reviews.
- `js/personas/compliance.js` → Entity: components, cert engine, AI agent, audit ready, support.
- `js/content.js` → all canned AI text + regulatory alerts + the `pick()` lookup.
- `js/state.js` → entities, criteria, framework, decay, scoring, deadlines.
- `js/views/all-assets.js` → entity index cards.
- `js/views/suppliers.js` → supplier coverage.
- `index.html` / `js/router.js` → app shell, nav, persona labels.
- `.nojekyll` → stops GitHub Pages running the files through Jekyll.

Outside `docs/` and therefore never published: this file, `CHANGELOG-CLIENT.md`,
the superseded brief, and `.claude/`.

---

## 6. Working conventions (keep these)
- **Preserve every internal `id`, status, number, weight** when reskinning — change only visible
  text. This keeps cross-file references (content.js keys, criteriaFramework certIds,
  upload.js) intact. This rule is why the reskin was low-risk.
- **Plan in chat, build in terminal.** Terminal Claude runs on **Fable 5** → keep prompts tight,
  prescriptive, small, with explicit verification + commit after each step.
- **Tag before each iteration** (e.g. `git tag v5-pre-<name> main`) as a rollback point.
- **Branch per iteration**, verify in browser (`python .claude/devserver.py 8770`), console must
  stay clean, then commit. One commit per coherent step, not one big one.
- Work on a feature branch; don't push to `main` / merge until an iteration passes rehearsal.

### Verification lessons from the v4 build (these cost real time)
- **Recount independently.** Don't trust that a number rendering means it is right — a
  double-counted "blocking items" figure and an all-entities-flagged triage both looked fine
  on screen and were wrong.
- **Screenshot anything visual.** Structural checks pass on a map that looks nothing like the
  country it claims to be. A pin also rendered in the sea while passing every data check.
- **Reload with a distinct URL** (`index.html?v=N`). Navigating to an unchanged URL does not
  reload the document, which produces false-green verification.
- **Use `git commit -F <file>`** for commit messages. PowerShell here-strings break on quotes.
- **Watch for animation races.** Upload (~2.3s) and the vault door (700ms) both commit state on
  a timer; reading immediately after a click reports the pre-change state.

---

## 7. Client documentation process (NEW — do every version)
After each version is built and presented, produce a **short, client-friendly overview of that
version's changes** for Maria (she emails/reviews it). Keep a running
**`CHANGELOG-CLIENT.md`** in this repo:
- One section per version: version label, date, 3–6 plain-English bullets of what changed and why
  (tie each to her feedback), and a one-line "how to view it" note.
- No jargon, no file paths — it's for a non-technical founder + her partners.
- Draft it in the planning session, hand it over when the version is presented.

---

## 8. Do NOT build (anti-scope)
Real backend / auth / database, real AI, real GIS map engine, real integrations
(Miljødirektoratet, Innovasjon Norge, partner systems), mobile responsiveness, WCAG audit,
API connection between the two modules (future), a new public landing page (separate Ashley
track - must NOT be served at index.html, which is now the app),
the "Share Risk / Green Shares" equity module (future, India track).

---

## 9. First move in the new session
1. Read this file. (`aurora_green_genesis_prototype_brief.md` is SUPERSEDED history — it still
   describes the yacht build. This file wins wherever they disagree.)
2. `git log --oneline -12` to see what the v4 build actually did; the commit messages carry the
   reasoning behind every non-obvious decision.
3. Serve and open the demo before changing anything: `python .claude/devserver.py 8770`.
4. Tag + branch for the new iteration (§6), then pick from §4.
5. Update `CHANGELOG-CLIENT.md` in the *same* iteration as the change — it drifted out of date
   twice during v4 because it was left to the end.
