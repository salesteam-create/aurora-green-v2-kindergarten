# Aurora Green Genesis — What Changed

A short, plain-English record of each version of the demo, for sharing with
partners. One section per version, newest first.

---

## Version 4 — The General Compliance Platform

**Date:** April 2026
**In one line:** the demo is no longer a kindergarten tool — it is the compliance
platform, with both halves working: the authority's overview and the client's own
dashboard, and kindergartens as just one of four example clients.

### What changed and why

- **It now covers four kinds of organisation, not one.** Alongside the two
  Norwegian kindergartens there is now an Italian hospital (Ospedale San Rocco)
  and an Italian municipality (Comune di Bergamo). This directly answers the
  question "does this only work for schools?" — the same platform, the same
  screens, four very different clients.

- **The standards are the ones buyers actually ask about.** Every requirement in
  the demo is now framed around ISO 27001, GDPR, NIS2 and ESG reporting, instead
  of the Norwegian Green Flag scheme. Green Flag is still there for the
  kindergartens, sitting inside the ESG section — so the Norwegian story is
  intact without the platform looking Norway-only.

- **Money is gone; compliance and deadlines lead instead.** The old screens
  showed a euro value for each client, which made no sense for compliance work.
  Every screen now leads with a compliance percentage, the number of critical
  gaps, and a real deadline for each item — with overdue and near-due dates
  highlighted. Nothing in the app quotes a price any more.

- **New: the Regulatory AI Agent.** Each client now sees a live feed of
  regulatory changes that affect them specifically — the hospital is warned about
  tightened NIS2 incident-reporting rules, the kindergartens about new guidance
  on children's data. Each alert names the area it affects and a date to respond
  by. This is the "we warn you before the auditor arrives" promise, made visible.

- **New: the Audit Ready report.** One button produces the evidence pack for a
  client, with a status badge showing whether they are audit ready or how many
  items are still blocking them.

- **New: Certification Support.** A panel showing how many requirements are met,
  pending and outstanding, framed around the Scientific Committee reviewing every
  submission before it reaches the certifying body.

- **The supplier page now tracks compliance, not shares.** It previously showed
  equity and share allocations, which belong to a future product. It now shows
  what each supplier is responsible for, how much of it is done, and who has
  outstanding work.

- **Scores now move believably.** Previously the first document upload jumped a
  client's score by 15 points in one step, which undercut the story. Uploading a
  document now moves the score by a few points at a time, exactly as you would
  describe it in a live walkthrough.

- **New: the authority's map.** The regulator's view now opens on a map of Norway
  and Italy with one dot per client, coloured by compliance level and ringed where
  a critical gap is open. It can be filtered by region and by type of
  organisation, and clicking a dot shows that client's weakest areas. Below it,
  the platform states plainly which clients warrant a site visit and which only
  need watching — two of the four in each case. This is the "inspect where it
  matters, not at random" argument, made concrete.

- **The demo opens straight into the platform.** The old maritime marketing page
  that used to sit in front of it has been removed, so there is no longer a
  wrong-product first impression to click past.

### How to view it

Open the demo in Chrome (`docs/index.html`, or the hosted link if one has been shared with
you). The vault door appears immediately — the access code
is already filled in, so just click **Open Vault**. Use the dropdown at the top to
switch between **Overview — Authority** (the regulator's view) and
**Compliance — Entity** (a client's own view).

### Suggested walkthrough (about two minutes)

1. **Start as the authority.** The map shows four clients across Norway and Italy.
   Point out the red dot — Ospedale San Rocco at 54% — and the panel below saying
   two clients need a targeted audit while two only need monitoring.
2. Click the red dot. The panel shows its weakest areas and why it was flagged:
   compliance below 60% and two unresolved critical gaps.
3. Filter to **Lombardia** to show the aggregate figure recalculating for that
   region alone.
4. **Switch to Compliance — Entity** and enter **Solstråle Barnehage**. Show the
   Regulatory AI Agent alerts at the top and the Audit Ready badge.
5. Open **Data Protection & Privacy**, select *Records of Processing Activities*,
   and show the gap description and its deadline.
6. Upload a document. The AI pre-validation runs, findings appear, and the score
   moves from 62% to 65%.
7. Submit for authority review, switch back to **Overview — Authority**, approve
   it — the score reaches 66% and the critical gap clears.

### Worth knowing

The regulatory alerts are written to be realistic but are **illustrative only** —
they have not been checked against the actual published regulations. They should
be replaced with a real feed before anyone relies on them.

The country outlines on the map are simplified illustrations, not survey-accurate
maps. They are there to show position and status at a glance.

### Not in this version

The two modules do not yet talk to each other — the authority's map and a client's
own dashboard read the same data but are not linked by an interface. A new public
website is a separate piece of work.
