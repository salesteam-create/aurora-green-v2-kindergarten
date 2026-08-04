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

## 3. Current build state (what already exists in this repo)

Foundation reskin is DONE and verified in-browser (no console errors):
- **Vault architecture:** Vault Door (locked) → Scientific Vault shell → All Assets/Kindergarten
  index → enter a Private Vault. Stages: `locked` / `sv-shell` / `in-vault` in `js/state.js`.
- **Personas:** internal keys `owner/compliance/dnv/scientific` kept. Only TWO exposed in the
  dropdown: `dnv` ("Overview — Miljødirektoratet") and `compliance` ("Compliance — Barnehage").
  `owner` + `scientific` hidden (kept in code). `PERSONA_LEVEL`: owner/compliance = vault,
  dnv/scientific = sv. See `js/router.js`.
- **Data (`js/state.js`):** 2 kindergartens (Solstråle, Regnbuen), 8 areas each, Green Flag
  criteria, 5-pillar `criteriaFramework`, `privateVaults`, suppliers, decay model
  (`computeDecayProjection`, `decayWindowMonths`/`lastValidatedAt`). All content English;
  kindergarten names Norwegian. **All internal IDs preserved from the yacht** (marine-flavoured
  IDs still lurk internally — invisible to users; do NOT rely on ID names being meaningful).
- **Content (`js/content.js`, `js/components/upload.js`):** kindergarten AI phase/finding text,
  Norwegian-ish English doc filenames. Keyed by the preserved cert IDs.
- **Reviewer feedback loop, decay/"at-risk" surface, criteria-driven value** — all carried from
  yacht iterations 2–3.

### Known issues parked at foundation stage
- **€ money still shows** on All-Assets vault cards ("Current Value €285M") and cert cost
  estimates. Compliance has no monetary value → **drop/replace with compliance %** in the
  general build.
- **`index.html` (landing page) is still 100% yacht** (Delhi Star, MARPOL, "Turn any vessel…").
  Separate track (Ashley redesign + Italian translation). Not part of the app demo.
- Criteria-framework pillar groupings are semantically mixed (only visible in hidden Scientific
  Committee view) — fix when that view is un-hidden.

---

## 4. What's next — the general-compliance build (NOT yet done)

Guiding constraint from Maria: **"make it general, adapt what we have, don't build big."**
The only genuinely net-new build is the Overview MAP.

1. **Generalize Module 2 (Compliance Dashboard):** broaden content from Grønt Flagg to generic
   ISO 27001 / GDPR / NIS2 / ESG. Keep kindergarten as ONE entity example; add a hospital and a
   municipal body / hotel. Add: **Regulatory AI Agent alerts** panel (EU law-change notifications),
   **"Audit Ready" downloadable report** button (toast/mock), **Certification Support** framing.
   Reframe cost/timeline as **deadlines**. Keep Scientific Committee feedback + upload flow.
2. **Build Module 1 (Overview) MAP** — replace the discarded yacht digital-twin SVG slot with a
   **stylized SVG map of Italy (and/or Norway)**: coloured location dots (red/amber/green),
   filter chips (region + entity type), a big aggregate **compliance %**, and a preventive-alert
   strip. KEEP IT MINIMAL — not a real GIS engine. Click a dot → light modal (reuse existing
   modal pattern), not a full vault entry.
3. **Drop the € machinery**; lead with compliance %.
4. **Terminology sweep** to the deck vocabulary (§2).

Defaults for open micro-decisions (proceed unless Maria says otherwise):
- Keep kindergarten as one entity under "schools"; add 1 hospital + 1 municipal/hotel.
- Seed ISO 27001, GDPR, NIS2 as the generic standards in Module 2.

---

## 5. Reuse map (file → what changes)
- `js/components/digital-twin.js` → **replace** with the Overview map component.
- `js/personas/dnv.js` → becomes the Overview module (map main view + alerts).
- `js/personas/compliance.js` + `js/components/upload.js` + `js/content.js` → generalize content
  to ISO/GDPR/NIS2; add AI-agent-alert + audit-ready-report surfaces.
- `js/state.js` → add hospital/municipal entities; generalize criteria; drop/repurpose € fields.
- `js/views/all-assets.js` → remove € stat from cards; general entity index.
- `app.html` / `js/router.js` → relabel personas to Overview / Compliance vocabulary.

---

## 6. Working conventions (keep these)
- **Preserve every internal `id`, status, number, weight** when reskinning — change only visible
  text. This keeps cross-file references (content.js keys, criteriaFramework certIds,
  upload.js) intact. This rule is why the reskin was low-risk.
- **Plan in chat, build in terminal.** Terminal Claude runs on **Fable 5** → keep prompts tight,
  prescriptive, small, with explicit verification + commit after each step.
- **Tag before each iteration** (e.g. `git tag v4-pre-general main`) as a rollback point.
- **Branch per iteration**, verify in browser (serve with `python -m http.server`, open
  `app.html`), console must stay clean, then commit.
- Work on a feature branch; don't push to `main` / merge until an iteration passes rehearsal.

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
API connection between the two modules (future), the landing page (separate Ashley track),
the "Share Risk / Green Shares" equity module (future, India track).

---

## 9. First move in the new session
1. Open this repo in the terminal; read this file + `aurora_green_genesis_prototype_brief.md`.
2. Create a branch `feat/general-compliance` and tag `v4-pre-general`.
3. Confirm the §4 plan + §4 defaults, then scope Module 2 (adapt) before Module 1 (map).
