// Canned compliance content for the ISO 27001 / GDPR / NIS2 / ESG standard set.
// Not live data — plausible but not verified against a certifying body.
// Keyed by criterion id. Every id in state.js has an entry; 'default' is the
// fallback for ids added later.
window.AGG_CONTENT = {
  // Per-criterion phased animation: {label, ms}. Total ~2.0-2.3s.
  // Keep the final label's finding count in sync with aiFindings below.
  aiPhases: {
    // ----- Solstråle Barnehage · Information Security Governance -----
    'sol-iso27001-a5-policy': [
      { label: 'Reading policy document and approval metadata...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 A.5.1 requirements...', ms: 800 },
      { label: 'Checking management approval and review interval...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-iso27001-a5-roles': [
      { label: 'Reading roles and responsibilities matrix...', ms: 600 },
      { label: 'Cross-referencing A.5.2–A.5.4 allocation requirements...', ms: 800 },
      { label: 'Testing segregation of duties on administrator accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-iso27001-cl9-review': [
      { label: 'Reading internal audit report and review minutes...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 Cl. 9.2–9.3...', ms: 800 },
      { label: 'Validating nonconformity register closure dates...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Data Protection & Privacy -----
    'sol-gdpr-art30-ropa': [
      { label: 'Parsing processing register entries...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 30(1) mandatory fields...', ms: 800 },
      { label: 'Checking retention periods and recipient categories...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-gdpr-art35-dpia': [
      { label: 'Reading impact assessment and risk matrix...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 35(7) assessment criteria...', ms: 800 },
      { label: 'Evaluating risks to children as vulnerable data subjects...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-gdpr-art13-transparency': [
      { label: 'Reading privacy notice and consent register...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 13 disclosure requirements...', ms: 800 },
      { label: 'Validating consent withdrawal procedure...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Access Control & Identity -----
    'sol-iso27001-a8-access': [
      { label: 'Reading access control matrix...', ms: 600 },
      { label: 'Cross-referencing A.8.2–A.8.4 privileged access controls...', ms: 800 },
      { label: 'Scanning for orphaned and dormant accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-iso27001-a8-05-mfa': [
      { label: 'Reading authentication enrolment report...', ms: 600 },
      { label: 'Cross-referencing A.8.5 secure authentication...', ms: 800 },
      { label: 'Verifying coverage across staff and admin accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Incident Response & Reporting -----
    'sol-nis2-art23-incident': [
      { label: 'Reading incident response plan and escalation path...', ms: 600 },
      { label: 'Cross-referencing NIS2 Art. 23 notification deadlines...', ms: 800 },
      { label: 'Validating the 24-hour early-warning route to the CSIRT...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Supplier & Third-Party Risk -----
    'sol-iso27001-a5-19-supplier': [
      { label: 'Reading supplier register and processor agreements...', ms: 600 },
      { label: 'Cross-referencing A.5.19–A.5.22 and GDPR Art. 28(3)...', ms: 800 },
      { label: 'Checking contract security annexes against renewal dates...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Business Continuity & Resilience -----
    'sol-iso27001-a5-29-continuity': [
      { label: 'Reading continuity plan and restore test records...', ms: 600 },
      { label: 'Cross-referencing A.5.29–A.5.30 and NIS2 Art. 21(2)(c)...', ms: 800 },
      { label: 'Checking recovery objectives per system...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Physical & Environmental Security -----
    'sol-iso27001-a7-physical': [
      { label: 'Reading physical security assessment...', ms: 600 },
      { label: 'Cross-referencing A.7.1–A.7.4 perimeter and entry controls...', ms: 800 },
      { label: 'Validating visitor log and secure-area access records...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'sol-iso27001-a7-10-media': [
      { label: 'Reading media handling and disposal procedures...', ms: 600 },
      { label: 'Cross-referencing A.7.10 storage media and A.7.14 disposal...', ms: 800 },
      { label: 'Reconciling asset register against destruction certificates...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Solstråle Barnehage · Environmental & Social (ESG) -----
    'sol-esg-e5-waste': [
      { label: 'Reading waste and resource-use report...', ms: 600 },
      { label: 'Cross-referencing ESRS E5 resource-outflow metrics...', ms: 800 },
      { label: 'Recomputing the recycling rate from weighing logs...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Regnbuen Barnehage -----
    'rb-iso27001-cl9-review': [
      { label: 'Reading internal audit report and review minutes...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 Cl. 9.2–9.3...', ms: 800 },
      { label: 'Confirming the audit programme covers all domains...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a5-policy': [
      { label: 'Reading policy set and board approval record...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 A.5.1...', ms: 800 },
      { label: 'Checking the annual review chain since 2025...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-gdpr-art30-ropa': [
      { label: 'Parsing processing register entries...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 30(1) mandatory fields...', ms: 800 },
      { label: 'Diffing the register against the new parent application...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-gdpr-art13-transparency': [
      { label: 'Reading privacy notice and consent register...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 13 disclosure requirements...', ms: 800 },
      { label: 'Reconciling consent records against enrolment list...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a8-access': [
      { label: 'Reading access control matrix...', ms: 600 },
      { label: 'Cross-referencing A.8.2–A.8.4 privileged access controls...', ms: 800 },
      { label: 'Scanning for orphaned and dormant accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a8-05-mfa': [
      { label: 'Reading authentication enrolment report...', ms: 600 },
      { label: 'Cross-referencing A.8.5 secure authentication...', ms: 800 },
      { label: 'Verifying enforcement on administrative accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-nis2-art23-incident': [
      { label: 'Reading incident response plan and exercise report...', ms: 600 },
      { label: 'Cross-referencing NIS2 Art. 23 notification deadlines...', ms: 800 },
      { label: 'Validating the escalation contact chain...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a5-19-supplier': [
      { label: 'Reading supplier register and processor agreements...', ms: 600 },
      { label: 'Cross-referencing A.5.19–A.5.22 and GDPR Art. 28(3)...', ms: 800 },
      { label: 'Checking both agreements against renewal dates...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a5-29-continuity': [
      { label: 'Reading continuity plan and restore test records...', ms: 600 },
      { label: 'Cross-referencing A.5.29–A.5.30 continuity controls...', ms: 800 },
      { label: 'Checking recovery objectives per system...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-iso27001-a7-physical': [
      { label: 'Reading physical security assessment...', ms: 600 },
      { label: 'Cross-referencing A.7.1–A.7.4 perimeter and entry controls...', ms: 800 },
      { label: 'Validating archive-room access records...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'rb-esg-e5-waste': [
      { label: 'Reading waste and resource-use report...', ms: 600 },
      { label: 'Cross-referencing ESRS E5 resource-outflow metrics...', ms: 800 },
      { label: 'Recomputing the recycling rate from weighing logs...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    'default': [
      { label: 'Reading document metadata...', ms: 600 },
      { label: 'Cross-referencing the applicable standard...', ms: 800 },
      { label: 'Validating supporting documentation...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
  },

  // Findings bullets shown inline after AI pre-validation completes.
  aiFindings: {
    // ----- Solstråle Barnehage -----
    'sol-iso27001-a5-policy': [
      { kind: 'ok', text: 'Policy set covers all Annex A control themes' },
      { kind: 'ok', text: 'Management approval recorded with a dated signature' },
      { kind: 'warn', text: 'No review interval stated — A.5.1 requires review at planned intervals' },
    ],
    'sol-iso27001-a5-roles': [
      { kind: 'ok', text: 'Roles matrix names an owner for each control theme' },
      { kind: 'warn', text: 'Segregation of duties undocumented for the parent-portal administrator' },
      { kind: 'warn', text: 'No deputy named for absence periods — manual review advised' },
    ],
    'sol-iso27001-cl9-review': [
      { kind: 'ok', text: 'Internal audit completed within the annual programme' },
      { kind: 'ok', text: 'Management review minutes signed February 2026' },
      { kind: 'ok', text: 'Nonconformity register shows no open major findings' },
    ],
    'sol-gdpr-art30-ropa': [
      { kind: 'ok', text: 'Register covers all declared purposes including health and allergy data' },
      { kind: 'ok', text: 'Retention period stated for each processing purpose' },
      { kind: 'warn', text: 'Recipient categories missing for two third-party processors' },
    ],
    'sol-gdpr-art35-dpia': [
      { kind: 'ok', text: 'Assessment scope covers the parent communication application' },
      { kind: 'warn', text: 'Risk evaluation for children as vulnerable data subjects incomplete' },
      { kind: 'warn', text: 'Data Protection Officer opinion not recorded — Art. 35(2) advisory' },
    ],
    'sol-gdpr-art13-transparency': [
      { kind: 'ok', text: 'Privacy notice contains all Art. 13(1) disclosure items' },
      { kind: 'warn', text: 'Notice issued in two of four departments only' },
      { kind: 'warn', text: 'Photograph consent has no documented withdrawal route' },
    ],
    'sol-iso27001-a8-access': [
      { kind: 'ok', text: 'Role-based access enforced across portal and staff systems' },
      { kind: 'ok', text: 'Privileged account review completed for Q1 2026' },
      { kind: 'ok', text: 'No orphaned or dormant accounts detected' },
    ],
    'sol-iso27001-a8-05-mfa': [
      { kind: 'ok', text: 'Multi-factor authentication enabled on all staff accounts' },
      { kind: 'ok', text: 'Legacy shared logins decommissioned and evidenced' },
      { kind: 'warn', text: 'Enrolment evidence is approaching its two-year review point' },
    ],
    'sol-nis2-art23-incident': [
      { kind: 'ok', text: '24-hour early-warning and 72-hour notification routes documented' },
      { kind: 'ok', text: 'National CSIRT contact chain verified' },
      { kind: 'ok', text: 'Tabletop exercise held November 2025 with findings logged' },
    ],
    'sol-iso27001-a5-19-supplier': [
      { kind: 'ok', text: 'Processor agreements signed with all four active suppliers' },
      { kind: 'ok', text: 'Contract security annex matches the A.5.19 requirement set' },
      { kind: 'ok', text: 'Supplier register reviewed at last renewal cycle' },
    ],
    'sol-iso27001-a5-29-continuity': [
      { kind: 'ok', text: 'Continuity plan documents roles and activation criteria' },
      { kind: 'warn', text: 'Backup restore test four months overdue' },
      { kind: 'warn', text: 'Recovery objectives stated for the attendance system only' },
    ],
    'sol-iso27001-a7-physical': [
      { kind: 'ok', text: 'Entry controlled by keypad with visitor log at reception' },
      { kind: 'ok', text: 'Server and archive rooms secured and access-logged' },
      { kind: 'warn', text: 'Assessment last reviewed May 2025 — renewal due' },
    ],
    'sol-iso27001-a7-10-media': [
      { kind: 'ok', text: 'Procedure covers handling, transfer, and disposal of storage media' },
      { kind: 'warn', text: 'Two departments still lack a wipe record for retired tablets' },
      { kind: 'warn', text: 'No certificate of destruction for the 2025 paper archive purge' },
    ],
    'sol-esg-e5-waste': [
      { kind: 'ok', text: 'Resource-use report follows the ESRS E5 disclosure structure' },
      { kind: 'warn', text: 'Residual-waste weighing missing for two departments' },
      { kind: 'warn', text: 'Recycling rate cannot be computed for 2026 — blocks Green Flag renewal' },
    ],

    // ----- Regnbuen Barnehage -----
    'rb-iso27001-cl9-review': [
      { kind: 'ok', text: 'Internal audit and management review complete for 2026' },
      { kind: 'ok', text: 'Audit programme covers all eight compliance domains' },
      { kind: 'ok', text: 'No nonconformities raised at closure' },
    ],
    'rb-iso27001-a5-policy': [
      { kind: 'ok', text: 'Policy set approved by the board in January 2025' },
      { kind: 'ok', text: 'Annual review chain unbroken since approval' },
      { kind: 'ok', text: 'Staff acknowledgement recorded for all current employees' },
    ],
    'rb-gdpr-art30-ropa': [
      { kind: 'ok', text: 'Updated register declares the new parent application as a purpose' },
      { kind: 'ok', text: 'Retention periods stated for all entries' },
      { kind: 'warn', text: 'Re-verify against the Q3 renewal deadline before submission' },
    ],
    'rb-gdpr-art13-transparency': [
      { kind: 'ok', text: 'Privacy notices issued to guardians at enrolment' },
      { kind: 'ok', text: 'Notice content matches Art. 13(1) disclosure items' },
      { kind: 'warn', text: 'Consent register incomplete for 2025 photograph processing' },
    ],
    'rb-iso27001-a8-access': [
      { kind: 'ok', text: 'Role-based access enforced across all systems' },
      { kind: 'ok', text: 'Privileged accounts reviewed quarterly' },
      { kind: 'ok', text: 'No orphaned accounts at the latest review' },
    ],
    'rb-iso27001-a8-05-mfa': [
      { kind: 'ok', text: 'Multi-factor authentication enforced on staff accounts' },
      { kind: 'ok', text: 'Administrative access requires a second factor' },
      { kind: 'ok', text: 'Enrolment report covers the full current headcount' },
    ],
    'rb-nis2-art23-incident': [
      { kind: 'ok', text: '24-hour early-warning path documented in the response plan' },
      { kind: 'ok', text: 'Escalation contact chain verified and current' },
      { kind: 'ok', text: 'Last exercised December 2025' },
    ],
    'rb-iso27001-a5-19-supplier': [
      { kind: 'ok', text: 'Processor agreements signed with both active suppliers' },
      { kind: 'ok', text: 'Agreements reviewed at renewal' },
      { kind: 'ok', text: 'Supplier register complete and current' },
    ],
    'rb-iso27001-a5-29-continuity': [
      { kind: 'ok', text: 'Continuity plan documents activation criteria' },
      { kind: 'warn', text: 'Annual backup restore test now due' },
      { kind: 'warn', text: 'Recovery objectives must be documented before renewal' },
    ],
    'rb-iso27001-a7-physical': [
      { kind: 'ok', text: 'Entry controlled and visitor log maintained' },
      { kind: 'ok', text: 'Archive room secured in all departments' },
      { kind: 'ok', text: 'Assessment current within the two-year cycle' },
    ],
    'rb-esg-e5-waste': [
      { kind: 'ok', text: 'Report structure follows ESRS E5 disclosure requirements' },
      { kind: 'warn', text: 'Residual-waste weighing overdue' },
      { kind: 'warn', text: '2025 resource-use report incomplete' },
    ],

    'default': [
      { kind: 'ok', text: 'Document format matches the applicable standard' },
      { kind: 'ok', text: 'Supporting documentation verified against the control register' },
      { kind: 'warn', text: 'One minor item flagged for reviewer attention' },
    ],
  },

  // Reviewer notes surfaced when a submission reaches the authority queue.
  reviewerNotes: {
    // ----- Solstråle Barnehage -----
    'sol-iso27001-a5-policy': 'Policy set covers all Annex A control themes and carries a dated management approval. No review interval is stated, which A.5.1 requires — recommend approval with observation.',
    'sol-iso27001-a5-roles': 'Roles matrix names an owner per control theme. Segregation of duties for the portal administrator and the absence deputy remain undocumented — recommend changes before approval.',
    'sol-iso27001-cl9-review': 'Internal audit and management review complete for the annual cycle. Nonconformity register shows no open major findings. Recommend approval.',
    'sol-gdpr-art30-ropa': 'Submitted register covers all declared processing purposes, including children\'s health and allergy data, with a retention period stated per purpose. Recipient categories are absent for two third-party processors — recommend approval with observation.',
    'sol-gdpr-art35-dpia': 'Assessment scope is correct but the evaluation of risks to children as vulnerable data subjects is incomplete and the DPO opinion is unrecorded. Recommend changes before approval.',
    'sol-gdpr-art13-transparency': 'Notice content satisfies Art. 13(1). Coverage is limited to two of four departments and photograph consent has no withdrawal route. Recommend changes before approval.',
    'sol-iso27001-a8-access': 'Role-based access enforced and the Q1 2026 privileged account review found no orphaned accounts. Recommend approval.',
    'sol-iso27001-a8-05-mfa': 'Multi-factor authentication verified across staff and administrative accounts; legacy shared logins evidenced as decommissioned. Enrolment evidence nears its review point — recommend approval with observation.',
    'sol-nis2-art23-incident': 'Early-warning and notification routes documented with a verified CSIRT contact chain. Exercise findings logged November 2025. Recommend approval.',
    'sol-iso27001-a5-19-supplier': 'Processor agreements in place for all four active suppliers and the contract security annex matches the A.5.19 requirement set. Recommend approval.',
    'sol-iso27001-a5-29-continuity': 'Continuity plan is adequate but the restore test is four months overdue and recovery objectives cover the attendance system only. Recommend changes before approval.',
    'sol-iso27001-a7-physical': 'Entry controls, visitor log, and secure-area access records verified. Assessment is due for its biennial renewal — recommend approval with observation.',
    'sol-iso27001-a7-10-media': 'Submitted procedure satisfies A.7.10 and A.7.14 for future disposals. Historic gaps remain: two departments lack a wipe record for retired tablets and the 2025 archive purge has no certificate of destruction. Recommend changes before approval.',
    'sol-esg-e5-waste': 'Report structure follows ESRS E5. Residual-waste weighing is missing for two departments, so the recycling rate cannot be computed for 2026. Recommend changes before approval.',

    // ----- Regnbuen Barnehage -----
    'rb-iso27001-cl9-review': 'Audit and management review complete for 2026 across all eight domains, closed without nonconformities. Recommend approval.',
    'rb-iso27001-a5-policy': 'Policy set board-approved January 2025 with an unbroken annual review chain and complete staff acknowledgement. Recommend approval.',
    'rb-gdpr-art30-ropa': 'Updated register now declares the parent application as a processing purpose, with retention periods stated throughout. Re-verify once against the Q3 renewal deadline — recommend approval with observation.',
    'rb-gdpr-art13-transparency': 'Privacy notices verified against the Art. 13 disclosure requirements. Consent register incomplete for 2025 photograph processing — recommend approval with observation.',
    'rb-iso27001-a8-access': 'Role-based access enforced with quarterly privileged account reviews and no orphaned accounts. Recommend approval.',
    'rb-iso27001-a8-05-mfa': 'Multi-factor authentication enforced on staff and administrative accounts across the full current headcount. Recommend approval.',
    'rb-nis2-art23-incident': 'Response plan documents the 24-hour early-warning path with a verified escalation chain, exercised December 2025. Recommend approval.',
    'rb-iso27001-a5-19-supplier': 'Supplier register and both processor agreements in good order, reviewed at renewal. Recommend approval.',
    'rb-iso27001-a5-29-continuity': 'Continuity plan documents activation criteria. The annual restore test is due and recovery objectives are undocumented — recommend changes before approval.',
    'rb-iso27001-a7-physical': 'Entry controls and archive-room security verified; assessment current within the biennial cycle. Recommend approval.',
    'rb-esg-e5-waste': 'Report follows the ESRS E5 structure but residual-waste weighing is overdue and the 2025 resource-use report is incomplete. Recommend changes before approval.',

    'default': 'Documentation complete and pre-validated against the applicable standard. Recommend approval.',
  },
};
