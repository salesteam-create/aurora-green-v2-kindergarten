# Aurora Green Genesis — What Changed

A short, plain-English record of each version of the demo, for sharing with
partners. One section per version, newest first.

---

## Version 4 — The General Compliance Platform

**Date:** April 2026
**In one line:** the demo is no longer a kindergarten tool — it is the compliance
platform, with kindergartens as just one of four example clients.

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

### How to view it

Open `app.html` in Chrome and enter any access code at the vault door. Start on
**Compliance — Entity** to show a client's own view; switch to **Overview —
Authority** using the dropdown at the top to show the regulator's view.

### Suggested walkthrough (about 90 seconds)

1. At the entity list, point out the four clients and their compliance
   percentages — the hospital is visibly the weakest at 54%.
2. Enter **Solstråle Barnehage**. Show the Regulatory AI Agent alerts at the top,
   then the Audit Ready badge showing 3 blocking items.
3. Open **Data Protection & Privacy** and select *Records of Processing
   Activities* — show the gap description and the deadline.
4. Upload a document. The AI pre-validation runs, findings appear, and the score
   moves from 62% to 65%.
5. Submit for authority review, switch to **Overview — Authority**, approve it —
   the score moves again to 66% and the critical gap clears.

### Worth knowing

The regulatory alerts are written to be realistic but are **illustrative only** —
they have not been checked against the actual published regulations. They should
be replaced with a real feed before anyone relies on them.

### Not in this version

The regulator's map of Italy and Norway is the next piece of work. The public
website (the landing page) is being handled separately and still shows the older
maritime content.
