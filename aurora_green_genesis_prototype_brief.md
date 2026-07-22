# Aurora Green Genesis — Interactive Prototype Brief

<!--
POST-MEETING (kindergarten pilot — parked during the re-skin rehearsal pass, do not build before founder triage):

- Rogaland map for the Overview user (Miljødirektoratet): colour-coded kindergarten status pins,
  drill-down modal with certification level + Fornitører list. Today Overview reuses the review-queue
  interface; the map is a real redesign, not a label swap.
- Remove/replace the € machinery for the kindergarten vertical: currentValue/nominalValue/projectedValue,
  fmtEUR displays, supplier valueContribution/equity framing all still speak in €M asset terms.
  Needs a kindergarten-appropriate value model (or hiding) — cross-vertical decision.
- Compliance workspace redesign per kindergarten brief: document workspace, Grønt Flagg progress
  tracker, human-in-the-loop feedback panel, dynamic AI agent alerts. Current cert-engine covers the
  loop but not the specified layout.
- Criterion cost/timeline figures were preserved verbatim from the yacht build per the re-skin rule
  (e.g. €18,000–25,000 for kildesortering). Implausible at barnehage scale — recalibrate when real
  Grønt Flagg cost data exists.
- index.html landing page is still full yacht copy (Delhi Star, vessels, digital twin mockups).
  "prototype"/"DNV" were swept, but the page needs its own kindergarten pass or should be bypassed.
- digital-twin.js ship SVG is loaded but unreachable (owner persona hidden). Replace with a
  kindergarten floor plan or drop the script include when verticals converge.
- English UI chrome (Certification Engine, Review Queue, Suppliers & Investors, status pills) vs
  Norwegian content is deliberate for now; full localization is a product decision.
- Persona registry is hardcoded in ~6 places (PERSONA_LEVEL, NAV, DEFAULT_VIEW, PERSONA_LABELS,
  app.html select, sidebar footer). Converge into one data-driven registry before vertical #3.
-->

<!--
v4 candidates (collected during iteration 3 vault-architecture rehearsal — triage with founder before iteration 4):

- Validate the vault-door code instead of accepting any input. Adds gravity to the "restricted access" framing; could also gate different personas behind different codes.
- Per-supplier drill-down: clicking a supplier row opens a profile (which certs they own, audit history, equity vesting curve). Today the table is read-only.
- Compliance-aware All Assets filter: today MarinePro sees Marina Luna with a "No assignments" pill. Founder may prefer hiding non-assigned vaults entirely for the compliance role.
- Innovation Pipeline functional: list of climate-tech / maritime-compliance startups under review by the Scientific Committee, status pills, decision log. Currently visible-only.
- Multi-asset vaults: today every vault has exactly one asset. Architecture supports many (assetIds array), but no UI to switch assets within a vault.
- Browser back/forward and shareable URLs: no hash router today, so navigation can't be deep-linked or replayed.
- Locked-state Reset: if the demo gets stuck on the door, there's no reset affordance — the demo bar is hidden by design.
- Vault creation flow: "+ New Private Vault" affordance for the SV shell so founders can demo onboarding a new client live.
- Equity algorithm preview: the Suppliers footnote mentions an Olidata algorithm. A small "How this is computed" overlay would make the claim concrete.
- DNV / Scientific Committee cross-vault visibility: today they're at SV level but only see one queue / one framework. Could surface a "vaults touched this week" digest.
-->

**For:** Claude Code session
**Purpose:** Build an interactive HTML prototype of the Aurora Green Genesis (AGG) maritime compliance platform, used as a sales demo for prospective clients, investors, and certifying partners.
**Timeline:** 1–2 weeks, solo developer.
**This document is the single source of truth.** Do not add features outside this scope. If ambiguous, ask before building.

---

## 1. Project Context (read this first)

### What Aurora Green Genesis is
A platform that helps owners of large maritime assets (starting with superyachts) make those assets **bankable and sellable** by systematically closing compliance and certification gaps. The real-world driver: a ~€300M yacht is sitting in port unsold because of emissions, noise, and classification pain points. AGG is the platform that prevalidates fixes, tracks progress toward EU compliance, and shows owners how their asset's value increases as gaps close.

### Who uses it (three roles, this matters)
1. **Asset Owner** (e.g., royal board, yacht owner) — wants a dead-simple visual view. "Is my yacht green or red? How much more is it worth if I fix it?" Does NOT upload documents or do compliance work themselves.
2. **Compliance Entity** (e.g., an engine vendor, a ventilation subcontractor) — a third-party firm assigned to handle one or more components of the vessel. They upload documents, receive AI pre-validation feedback, fix gaps, and submit for certification. They pay the subscription.
3. **DNV Reviewer** (or equivalent certifying authority) — the third-party body that issues the actual certification. Reviews pre-validated submissions from Compliance Entities, approves or requests changes. Sees only the individual components they're reviewing, NOT the whole asset.

### What the demo needs to prove
That the platform produces a clear, visible loop:
> Compliance Entity uploads documents → AI pre-validates → Gaps identified with cost/timeline → Submit to DNV → DNV approves → Asset's EU Readiness Score and monetary value both tick up in real time on the Owner's dashboard.

**That loop is the hero moment.** Everything else is supporting texture.

---

## 2. Tech Stack & Constraints

- **Plain HTML + Tailwind CSS (via CDN) + vanilla JavaScript.** No build step. No framework.
- **Single-page app feel** using a simple router (hash-based or manual view swapping).
- **Multi-file structure** (see section 8) for maintainability, but no bundler — files linked via `<script>` and `<link>` tags.
- **Desktop-only.** This is demoed on a laptop in a conference room. Do not spend time on mobile responsiveness.
- **No backend.** All state in-memory in JavaScript.
- **No real AI calls.** All "AI responses" are hardcoded and revealed after a 2–3 second fake loading state with plausible step labels.
- **No accounts, no real auth.** Persona switching is a dropdown in the top bar.

### Libraries allowed (via CDN)
- Tailwind CSS (via CDN script for speed — acceptable for a prototype; production will migrate)
- Chart.js for the compliance trend chart and asset value chart
- Lucide icons (via CDN)
- That's it. Resist the urge to add anything else.

### Branding
- Full name: **Aurora Green Genesis**
- Short name in-app: **Aurora** or **AGG**
- Use full name on landing page, login screen, document footers
- Use short name in navbar, breadcrumbs, in-app headers
- Color palette: the existing prototype uses dark navy (`#0f1a2e`-ish) with teal/green accents (`#2dd4bf`-ish) and orange for warnings. Preserve this. Pull exact hex codes from the reference screenshots if available.
- Typography: clean sans-serif (Inter or system-ui is fine)

---

## 3. Three Demo Personas (the core architecture)

The app has a persistent **"Demo Mode" bar** at the top with:
- Current persona display (e.g., "Viewing as: Captain Rao — Delhi Star Owner")
- Persona switcher dropdown (three options)
- "Reset Demo" button (clears in-memory state, returns to default canned state)

### Persona 1: Captain Rao — Asset Owner (representing the Sultan / royal board)
**Mental model:** A busy, non-technical principal who wants to know one thing: *is my asset getting more valuable?*

**Screens they see:**
1. **Dashboard** — Greeting, current vessel (Delhi Star), EU Readiness Score big and prominent, critical gaps count, fleet overview (if multiple vessels), compliance trend line chart, recent activity feed.
2. **Digital Twin Explorer** — Visual of the vessel with clickable zones (red/amber/green). Click a zone → side panel shows that zone's compliance status. No document upload here. Read-only.
3. **Asset Value** — Current estimated value, projected value at 100% compliance, a breakdown showing "+€X for completing Engine certification, +€Y for IHM Part I" etc. Chart showing value trajectory over time.
4. **Reports** — One static page showing downloadable PDF mock reports ("Compliance Report March 2026," "Digital Twin Passport"). Buttons don't need to actually download — just show a "Download" button with a click animation.

**Screens they do NOT see:** Document upload, certification workflow details, DNV queue.

### Persona 2: MarinePro Engineering Ltd. — Compliance Entity
**Mental model:** A technical subcontractor responsible for the vessel's engine room certification. They upload documents, see gaps, fix them, resubmit.

**Screens they see:**
1. **My Assigned Components** — List view showing only the components they've been assigned to (e.g., "Delhi Star — Engine Room," "Delhi Star — Fuel & Emissions"). Each shows current status and % compliance.
2. **Component Detail / Certification Engine** — THE hero screen. For a selected component, shows:
   - Compliance checklist (e.g., IHM Part I, MARPOL Annex VI, SOLAS XII, etc.)
   - Each checklist item expandable, shows gap analysis, estimated cost, timeline, required documents
   - **Drag-and-drop document upload area** per item
   - After upload: 2–3 second fake AI analysis → checklist item updates status → overall % ticks up
   - "Submit to DNV" button once a section is complete
3. **Submission Status** — List of items submitted to DNV, their review status.

**Screens they do NOT see:** The asset owner's dashboard. Other components not assigned to them. Asset value.

### Persona 3: DNV Reviewer
**Mental model:** A maritime classification society reviewer. Gets a queue of pre-validated submissions to approve or request changes on.

**Screens they see:**
1. **Review Queue** — List of pending submissions across multiple vessels/components. Each shows: vessel, component, submitting entity, date submitted, AI pre-validation summary.
2. **Submission Detail** — For a selected submission: uploaded documents (list, not actual viewer), AI pre-validation notes, approve / request changes / reject buttons, comment box.
3. **Completed Reviews** — History of past approvals.

**Screens they do NOT see:** Asset value. Owner dashboard. Components not in their queue.

---

## 4. The Hero Demo Flow (this must work end-to-end)

Rehearse this flow. Every feature in this prototype must serve this flow. If something doesn't, cut it.

**Setup state (loaded when "Reset Demo" is pressed):**
- Delhi Star is at **62% EU Readiness**
- Engine Room component is at **74%** with IHM Part I flagged as "Missing"
- Asset value shown at **€285M** (below the €300M nominal because of compliance gaps)
- Captain Rao is the default persona

**Demo steps:**
1. Start in Captain Rao view. Show the dashboard. Point out: 62% score, €285M current value, 3 critical gaps. Click into Digital Twin, show Engine Room zone is amber. Click into Asset Value, show projected value at 100% compliance is €312M.
2. Switch persona → MarinePro Engineering.
3. Open "My Assigned Components" → select Delhi Star / Engine Room. Show the Certification Engine checklist with IHM Part I flagged Missing.
4. Expand IHM Part I — Onboard Materials Survey. Show gap analysis text, cost (€18,000–€25,000), timeline (6–8 weeks).
5. Drag a fake file ("IHM_Survey_DelhiStar.pdf") into the upload area.
6. **Fake AI analysis animation** (2.5 seconds) — show steps streaming in: "Parsing document metadata..." → "Cross-referencing EU SRR Annex II..." → "Validating surveyor accreditation..." → "Complete."
7. IHM Part I status updates: Missing → "Pre-validated, pending DNV review." Component score ticks up from 74% → 82%.
8. Click "Submit to DNV."
9. Switch persona → DNV Reviewer.
10. Review Queue now shows the new submission at the top. Click into it.
11. Show AI pre-validation notes (hardcoded, realistic). Click "Approve."
12. Switch persona → Captain Rao.
13. Dashboard now shows: EU Readiness Score ticked up from 62% → 68% with a green "+6 pts" indicator. Recent activity shows "IHM Part I approved by DNV." Asset Value page shows estimated value jumped from €285M to €291M.

**That's the whole pitch.** ~90 seconds. Rehearsable. Repeatable via Reset Demo button.

---

## 5. State Model

One global JavaScript object. Single source of truth.

```javascript
window.demoState = {
  currentPersona: 'owner', // 'owner' | 'compliance' | 'dnv'

  vessels: {
    'delhi-star': {
      name: 'Delhi Star',
      imo: '9876543',
      type: 'Oil Tanker',
      flag: 'India',
      targetMarket: 'Netherlands',
      nominalValue: 300_000_000, // €
      currentValue: 285_000_000,
      projectedValue: 312_000_000,
      euReadinessScore: 62,
      criticalGaps: 3,
      components: {
        'engine-room': {
          name: 'Engine Room',
          score: 74,
          status: 'partial',
          assignedTo: 'marinepro',
          certifications: [
            {
              id: 'ihm-part-i',
              name: 'IHM Part I — Onboard Materials Survey',
              status: 'missing', // 'missing' | 'partial' | 'compliant' | 'pending-review' | 'approved'
              regulation: 'EU 1257/2013 Art. 12',
              criticality: 'critical',
              costMin: 18000,
              costMax: 25000,
              timelineWeeks: [6, 8],
              gapAnalysis: 'No certified IHM Part I survey has been conducted...',
              requiredDocs: ['IHM Part I Survey Report', 'Surveyor Accreditation Certificate', 'Material Declaration Forms'],
              uploadedDocs: [],
            },
            // ... more certifications
          ],
        },
        // ... more components
      },
    },
    // ... 1-2 more fake vessels for DNV queue texture
  },

  dnvQueue: [
    // populated dynamically when a compliance entity submits something
  ],

  recentActivity: [
    // populated dynamically as actions happen
  ],
};
```

**State mutation rules:**
- Every action (upload, submit, approve) calls a single `updateState(change)` function that mutates `demoState` and re-renders the current view.
- Never mutate state directly from event handlers — always through `updateState`.
- When a certification's status changes, recompute the parent component's score, then recompute the vessel's overall EU Readiness Score, then recompute the asset value.
- Score math: simple weighted average is fine. Value math: linear interpolation between `currentValue` and `projectedValue` based on readiness score. **Do not overthink this.** It's a demo.

**Reset:**
- A `const INITIAL_STATE = { ... }` constant at the top of the state file.
- `resetDemo()` does `window.demoState = structuredClone(INITIAL_STATE)` and re-renders.

---

## 6. The Digital Twin (the tricky bit)

This is the single screen most likely to eat your time. Budget it carefully.

**What it needs to be:**
- An **SVG side-cutaway view** of a tanker/yacht (one image, inline SVG, not a PNG).
- Zones outlined as SVG `<g>` groups: Hull, Engine Room, Bridge & Nav, Cargo Tanks, Deck & Safety, Fuel & Emissions, Accommodation, Machinery Space.
- Each zone has a status (green/amber/red) driven by state, shown via fill color or a colored indicator dot on the zone.
- Hover = tooltip with zone name and score.
- Click = side panel opens showing zone details.

**What it does NOT need to be:**
- A 3D model.
- An accurate representation of the Delhi Star or any real vessel (we don't have specs yet).
- Animated.
- Responsive.

**How to build the SVG:**
- Create a stylized cross-section of a generic tanker: hull silhouette, deck line, superstructure/bridge at rear, cargo section in middle, engine room below rear, bow at front.
- Use simple geometric shapes (rectangles, polygons). Do not attempt photorealism.
- Color-code fills based on zone status. Use low-opacity fills with brighter borders for clarity.
- Include a legend at the bottom.
- Reference the existing prototype screenshot (page 18 of the feedback PDF) — it already has something in this direction, but improve on it: more detail, clearer zones, better color-coding.

**If you get stuck on the SVG, ship a simpler version first (just colored rectangles labeled with zone names) and iterate.** A working ugly version beats a broken beautiful one.

---

## 7. Content & Fake Data Guidelines

**This is 30% of the work. Do not shortcut it.**

All compliance content must sound plausibly real. Use these as templates:

- **Certification names:** Use real EU/IMO regulations. IHM (EU 1257/2013), MARPOL Annex I/V/VI, SOLAS Chapter II-1/XII, ISM Code, ISPS Code, MLC 2006, BWM Convention, AFS Convention. Look these up if needed — the names and article numbers must be real.
- **Gap analysis text:** Write 2–3 sentences per gap using maritime compliance terminology. Example: *"No certified IHM Part I survey has been conducted. A class-approved surveyor must inspect all hazardous materials onboard including asbestos, PCBs, and TBT compounds. Current waste register lacks required format per EU SRR Annex II."*
- **Cost ranges:** Use realistic maritime compliance consulting rates. €1,000–€5,000 for minor gaps, €15,000–€50,000 for major surveys, €100,000+ for retrofits. Don't make up numbers that don't match the scope.
- **Timelines:** Most compliance work is weeks, not days. 1–2 weeks for documentation reviews, 4–8 weeks for surveys, 12+ weeks for physical retrofits.
- **AI loading messages:** Make them specific. Bad: "Analyzing..." Good: "Cross-referencing IMO MEPC.81(43) against submitted fuel analysis certificates."
- **Document names:** `IHM_Part_I_Survey_DelhiStar_20260315.pdf`, `MARPOL_IOPP_Certificate_2024.pdf`. Not `document.pdf`.

**Create a `content.js` file with all this canned content.** Keep it separate from the state file. If the client sends real DNV data later, we replace this file without touching the app logic.

---

## 8. Suggested File Structure

```
/
├── index.html              # Landing page (public-facing)
├── app.html                # The app shell — persona switcher, routing
├── css/
│   └── styles.css          # Any custom CSS beyond Tailwind utilities
├── js/
│   ├── state.js            # window.demoState + INITIAL_STATE + updateState() + resetDemo()
│   ├── content.js          # All canned compliance content (certs, gap texts, AI messages)
│   ├── router.js           # View switching logic (hash-based)
│   ├── personas/
│   │   ├── owner.js        # Owner dashboard + digital twin + asset value + reports views
│   │   ├── compliance.js   # Compliance entity views
│   │   └── dnv.js          # DNV reviewer views
│   ├── components/
│   │   ├── digital-twin.js # The SVG cross-section + zone interactions
│   │   ├── upload.js       # Drag-drop upload + fake AI animation
│   │   ├── score-ring.js   # The circular score indicators
│   │   └── charts.js       # Chart.js wrappers for trend + value charts
│   └── main.js             # Boot: load state, render initial view, wire up persona switcher
└── assets/
    └── (any static images/icons)
```

Single-file alternatives are fine if you prefer — but keep `state.js` and `content.js` separate from the views regardless. That boundary is what makes it possible to swap in real data later without rewriting.

---

## 9. Out of Scope — Do NOT Build

These will feel tempting. Resist.

- ❌ User registration, login screens, password flows, "forgot password"
- ❌ Account settings, user profile pages, preferences
- ❌ Real file upload (drag-drop is visual only — file is acknowledged by name, not parsed)
- ❌ Mobile-responsive layouts (desktop only)
- ❌ Fleet management screens (multi-vessel views beyond what the hero flow needs)
- ❌ Internationalization / multi-language
- ❌ A help center, docs pages, or tooltips beyond the digital twin hover
- ❌ Admin panels, system config, role management UI
- ❌ Any integration with real APIs — not even a fake `fetch()` to localhost
- ❌ Dark mode / light mode toggle
- ❌ Accessibility audit-grade a11y (basic semantic HTML is fine; don't spend time on ARIA edge cases)
- ❌ Unit tests, E2E tests (this is a throwaway prototype)
- ❌ Animations beyond the AI loading pulse and score tick-up transitions
- ❌ Real PDF generation (the "Download PDF" button can show a toast saying "Download started" — no actual file)

---

## 10. Execution Order (do it in this order)

Building this in the wrong order will cost you days. Follow this sequence.

1. **Day 1:** Set up file structure, landing page, app shell with persona switcher, routing. Get the Captain Rao dashboard rendering with hardcoded state (no interactivity yet). Get the visual design right — colors, spacing, typography — because you'll reuse it everywhere.
2. **Day 2:** Build out `state.js` and `content.js`. Populate realistic data for Delhi Star + 2 supporting vessels. Wire the Owner dashboard to read from state.
3. **Day 3:** Build the Compliance Entity view, especially the Certification Engine screen. Get the drag-drop upload + fake AI animation working end-to-end for ONE certification. Don't build the whole checklist until the one works.
4. **Day 4:** Expand Compliance Entity view — full checklist per component, submission flow. Wire up state mutations (upload → status change → score recompute).
5. **Day 5:** Build DNV Reviewer view. Queue, detail, approve/reject. Wire approval back to vessel state.
6. **Day 6:** Build the Digital Twin SVG. Start simple (rectangles), iterate if time allows. Wire zone clicks to state.
7. **Day 7:** Build Asset Value view with Chart.js. Wire to state so value updates live.
8. **Day 8:** Rehearse the hero flow end-to-end, 5+ times. Fix every friction point. Add the Reset Demo button and make sure it actually resets everything.
9. **Day 9:** Polish. Landing page. Reports page. Recent activity animations. Edge cases.
10. **Day 10:** Final polish, browser-test in Chrome (the pitch browser), fix layout bugs. Record a backup screen recording of the hero flow in case live demo breaks.

**Days 11–14 are buffer.** You will need them.

---

## 11. Known Unknowns (flag these as you go)

- We don't have the real yacht specs. The digital twin is generic. Update when client sends.
- We don't have the real DNV certification list. The checklist uses researched EU/IMO regulations but is not verified by DNV. Update when client sends.
- We don't have the NDA-cleared pain point list. Gap analyses are plausible but not client-specific. Update when client sends.
- The real yacht's IMO number is 9476374 (per the transcript, "Als..." is the name). If it's ever referenced, use Delhi Star as the demo name but add a comment in code that the real vessel data will replace it.

---

## 12. Success Criteria

The prototype is done when:
- [ ] All three personas are accessible via the Demo Mode switcher
- [ ] The hero demo flow (section 4) works end-to-end without errors, in under 2 minutes
- [ ] Reset Demo button returns to a known clean state every time
- [ ] The Owner dashboard's score + value update visibly after a DNV approval
- [ ] The Digital Twin has at least 6 clickable zones with color-coded status
- [ ] No console errors during the demo flow
- [ ] Tested in latest Chrome on a standard laptop screen (1440x900 minimum)

---

## 13. If You Get Stuck

- If a feature is taking longer than a day, cut it back to its simplest form. Ship ugly-and-working before pretty-and-broken.
- If state management gets tangled, re-read section 5 and simplify. One global object, one mutator function.
- If the SVG is fighting you, use plain rectangles and move on. The client cares about the loop working, not the vessel being anatomically correct.
- If the AI fake-out feels too fake, improve the loading step labels (section 7). That's where the magic lives.

Good luck. Keep it tight. Ship the hero flow first, polish second.
