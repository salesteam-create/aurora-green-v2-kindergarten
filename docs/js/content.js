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

    // ----- Shared entries, matched on the criterion suffix (see pick() below).
    // An entity-specific entry above always wins; these cover the same control
    // for any entity without a tailored variant.
    'iso27001-a5-policy': [
      { label: 'Reading policy document and approval metadata...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 A.5.1 requirements...', ms: 800 },
      { label: 'Checking scope statement and review interval...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-cl9-review': [
      { label: 'Reading audit programme and review minutes...', ms: 600 },
      { label: 'Cross-referencing ISO/IEC 27001:2022 Cl. 9.2–9.3...', ms: 800 },
      { label: 'Checking audit coverage against the declared scope...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-a8-access': [
      { label: 'Reading access control matrix...', ms: 600 },
      { label: 'Cross-referencing A.8.2–A.8.4 privileged access controls...', ms: 800 },
      { label: 'Scanning for orphaned and dormant accounts...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-a8-05-mfa': [
      { label: 'Reading authentication enrolment report...', ms: 600 },
      { label: 'Cross-referencing A.8.5 secure authentication...', ms: 800 },
      { label: 'Measuring coverage against the account inventory...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-a5-19-supplier': [
      { label: 'Reading supplier register and processor agreements...', ms: 600 },
      { label: 'Cross-referencing A.5.19–A.5.22 and GDPR Art. 28(3)...', ms: 800 },
      { label: 'Checking sub-processor authorisations...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-a5-29-continuity': [
      { label: 'Reading continuity plan and restore test records...', ms: 600 },
      { label: 'Cross-referencing A.5.29–A.5.30 continuity controls...', ms: 800 },
      { label: 'Checking recovery objectives per system...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iso27001-a7-physical': [
      { label: 'Reading physical security assessment...', ms: 600 },
      { label: 'Cross-referencing A.7.1–A.7.4 perimeter and entry controls...', ms: 800 },
      { label: 'Validating access records for restricted areas...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'gdpr-art30-ropa': [
      { label: 'Parsing processing register entries...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 30(1) mandatory fields...', ms: 800 },
      { label: 'Checking retention periods and recipient categories...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'nis2-art23-incident': [
      { label: 'Reading incident response plan and escalation path...', ms: 600 },
      { label: 'Cross-referencing NIS2 Art. 23 notification deadlines...', ms: 800 },
      { label: 'Validating the 24-hour early-warning route...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'nis2-art21-riskmgmt': [
      { label: 'Reading risk analysis and system inventory...', ms: 600 },
      { label: 'Cross-referencing NIS2 Art. 21(2)(a) risk measures...', ms: 800 },
      { label: 'Reconciling assessed systems against the asset register...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'nis2-art21-supplychain': [
      { label: 'Reading supplier register and contract clauses...', ms: 600 },
      { label: 'Cross-referencing NIS2 Art. 21(2)(d) supply-chain measures...', ms: 800 },
      { label: 'Checking vendor remote-access arrangements...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'esg-e5-waste': [
      { label: 'Reading waste and resource-use report...', ms: 600 },
      { label: 'Cross-referencing ESRS E5 resource-flow metrics...', ms: 800 },
      { label: 'Recomputing rates from the underlying logs...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],

    // ----- Criteria unique to a single entity -----
    'hos-gdpr-art9-health': [
      { label: 'Reading Art. 9 safeguards assessment...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 9(2)(h) health-data conditions...', ms: 800 },
      { label: 'Testing access-logging on the patient record system...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'hos-gdpr-art32-security': [
      { label: 'Reading technical measures register...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 32(1) security of processing...', ms: 800 },
      { label: 'Verifying encryption at rest on the imaging archive...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'hos-esg-e5-waste': [
      { label: 'Reading clinical waste report...', ms: 600 },
      { label: 'Cross-referencing ESRS E5 resource-flow metrics...', ms: 800 },
      { label: 'Reconciling contractor volumes against internal records...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'mun-gdpr-art37-dpo': [
      { label: 'Reading DPO appointment act...', ms: 600 },
      { label: 'Cross-referencing GDPR Art. 37(1)(a) and Art. 37(7)...', ms: 800 },
      { label: 'Checking supervisory-authority notification and published contact...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'mun-esg-e1-energy': [
      { label: 'Reading energy and emissions report...', ms: 600 },
      { label: 'Cross-referencing ESRS E1 disclosure requirements...', ms: 800 },
      { label: 'Checking scope coverage across buildings and fleet...', ms: 600 },
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

    // ----- Shared entries, matched on the criterion suffix (see pick() below) -----
    'iso27001-a5-policy': [
      { kind: 'ok', text: 'Policy set covers all Annex A control themes' },
      { kind: 'ok', text: 'Management approval recorded with a dated signature' },
      { kind: 'warn', text: 'Scope statement does not yet name every in-scope system' },
    ],
    'iso27001-cl9-review': [
      { kind: 'ok', text: 'Audit programme established with planned intervals' },
      { kind: 'ok', text: 'Management review minutes recorded and signed' },
      { kind: 'warn', text: 'Audit coverage omits one domain in the declared scope' },
    ],
    'iso27001-a8-access': [
      { kind: 'ok', text: 'Role-based access enforced on in-scope systems' },
      { kind: 'ok', text: 'Privileged account review completed for the current quarter' },
      { kind: 'warn', text: 'Leaver deprovisioning is manual — no automated trigger' },
    ],
    'iso27001-a8-05-mfa': [
      { kind: 'ok', text: 'Multi-factor authentication enrolment evidenced' },
      { kind: 'ok', text: 'Administrative access requires a second factor' },
      { kind: 'warn', text: 'Coverage gap remains on shared operational accounts' },
    ],
    'iso27001-a5-19-supplier': [
      { kind: 'ok', text: 'Processor agreements signed with all active suppliers' },
      { kind: 'ok', text: 'Security requirements included in contract annexes' },
      { kind: 'warn', text: 'Sub-processor authorisations incomplete for one vendor' },
    ],
    'iso27001-a5-29-continuity': [
      { kind: 'ok', text: 'Continuity plan documents roles and activation criteria' },
      { kind: 'ok', text: 'Restore test record supplied for the current cycle' },
      { kind: 'warn', text: 'Recovery objectives stated for a subset of systems only' },
    ],
    'iso27001-a7-physical': [
      { kind: 'ok', text: 'Entry controls and visitor handling documented' },
      { kind: 'ok', text: 'Secure areas identified and access-logged' },
      { kind: 'warn', text: 'One restricted area relies on mechanical key with no log' },
    ],
    'gdpr-art30-ropa': [
      { kind: 'ok', text: 'Register covers the declared processing purposes' },
      { kind: 'ok', text: 'Retention period stated for each purpose' },
      { kind: 'warn', text: 'Recipient categories incomplete for one processor' },
    ],
    'nis2-art23-incident': [
      { kind: 'ok', text: '24-hour early-warning and 72-hour notification routes documented' },
      { kind: 'ok', text: 'Escalation contact chain verified' },
      { kind: 'warn', text: 'Out-of-hours coverage not yet evidenced by a rota' },
    ],
    'nis2-art21-riskmgmt': [
      { kind: 'ok', text: 'Risk analysis method and treatment plan documented' },
      { kind: 'warn', text: 'Assessed systems do not reconcile to the full asset register' },
      { kind: 'warn', text: 'Inherited legacy systems remain outside the assessment' },
    ],
    'nis2-art21-supplychain': [
      { kind: 'ok', text: 'Security requirements embedded in the procurement template' },
      { kind: 'warn', text: 'Legacy contracts carry no security clauses' },
      { kind: 'warn', text: 'Supplier security performance not reviewed at renewal' },
    ],
    'esg-e5-waste': [
      { kind: 'ok', text: 'Report structure follows the ESRS E5 disclosure requirements' },
      { kind: 'warn', text: 'Underlying measurement incomplete for part of the estate' },
      { kind: 'warn', text: 'Rate cannot be recomputed from the supplied logs' },
    ],

    // ----- Criteria unique to a single entity -----
    'hos-gdpr-art9-health': [
      { kind: 'ok', text: 'Art. 9(2)(h) condition identified and documented' },
      { kind: 'ok', text: 'Confidentiality undertakings supplied for clinical staff' },
      { kind: 'warn', text: 'Access logging on the patient record system not yet enabled' },
    ],
    'hos-gdpr-art32-security': [
      { kind: 'ok', text: 'Technical measures register supplied and mapped to Art. 32(1)' },
      { kind: 'warn', text: 'Imaging archive still unencrypted at rest' },
      { kind: 'warn', text: 'No process for testing effectiveness per Art. 32(1)(d)' },
    ],
    'hos-esg-e5-waste': [
      { kind: 'ok', text: 'Clinical waste volumes reported by the disposal contractor' },
      { kind: 'warn', text: 'Contractor figures not reconciled against internal records' },
      { kind: 'warn', text: 'Resource-inflow data for single-use consumables not collected' },
    ],
    'mun-gdpr-art37-dpo': [
      { kind: 'ok', text: 'DPO designated by formal appointment act' },
      { kind: 'warn', text: 'Appointment not notified to the supervisory authority' },
      { kind: 'warn', text: 'Published contact details are out of date — Art. 37(7)' },
    ],
    'mun-esg-e1-energy': [
      { kind: 'ok', text: 'Scope 1 and 2 emissions reported for buildings and fleet' },
      { kind: 'ok', text: 'Energy consumption data complete for the reporting year' },
      { kind: 'warn', text: 'Scope 3 emissions from procured services not quantified' },
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

    // ----- Shared entries, matched on the criterion suffix (see pick() below) -----
    'iso27001-a5-policy': 'Policy set covers the Annex A control themes with a dated management approval. The scope statement does not yet name every in-scope system — recommend approval with observation.',
    'iso27001-cl9-review': 'Audit programme established and management review recorded. Coverage omits one domain within the declared scope — recommend approval with observation.',
    'iso27001-a8-access': 'Role-based access enforced on in-scope systems with a current privileged account review. Leaver deprovisioning remains manual — recommend approval with observation.',
    'iso27001-a8-05-mfa': 'Enrolment evidenced across staff and administrative accounts. A coverage gap remains on shared operational accounts — recommend changes before approval.',
    'iso27001-a5-19-supplier': 'Processor agreements in place for all active suppliers with security requirements in contract annexes. Sub-processor authorisations are incomplete for one vendor — recommend changes before approval.',
    'iso27001-a5-29-continuity': 'Continuity plan and a current restore test record supplied. Recovery objectives cover a subset of systems only — recommend changes before approval.',
    'iso27001-a7-physical': 'Entry controls, visitor handling, and secure-area access records verified. One restricted area relies on mechanical key with no issuance log — recommend approval with observation.',
    'gdpr-art30-ropa': 'Register covers the declared processing purposes with retention periods stated. Recipient categories are incomplete for one processor — recommend approval with observation.',
    'nis2-art23-incident': 'Notification routes and escalation chain documented against the Art. 23 deadlines. Out-of-hours coverage is not evidenced by a rota — recommend changes before approval.',
    'nis2-art21-riskmgmt': 'Risk method and treatment plan are documented, but the assessed systems do not reconcile to the full asset register and inherited legacy systems remain out of scope. Recommend changes before approval.',
    'nis2-art21-supplychain': 'Security requirements are embedded in the procurement template. Legacy contracts carry no security clauses and supplier performance is not reviewed at renewal — recommend changes before approval.',
    'esg-e5-waste': 'Report structure follows the ESRS E5 disclosure requirements, but the underlying measurement is incomplete for part of the estate so the rate cannot be recomputed. Recommend changes before approval.',

    // ----- Criteria unique to a single entity -----
    'hos-gdpr-art9-health': 'The Art. 9(2)(h) condition is identified and confidentiality undertakings are supplied for clinical staff. Access logging on the patient record system is not yet enabled, so unauthorised access could not be detected retrospectively. Recommend changes before approval.',
    'hos-gdpr-art32-security': 'Technical measures register supplied and mapped to Art. 32(1). The imaging archive remains unencrypted at rest and there is no effectiveness-testing process per Art. 32(1)(d). Recommend changes before approval.',
    'hos-esg-e5-waste': 'Clinical waste volumes are reported by the disposal contractor but not reconciled internally, and resource-inflow data for single-use consumables is not collected. Recommend changes before approval.',
    'mun-gdpr-art37-dpo': 'A Data Protection Officer is designated by formal appointment act. The appointment has not been notified to the supervisory authority and the published contact details are out of date, both required by Art. 37(7). Recommend changes before approval.',
    'mun-esg-e1-energy': 'Scope 1 and 2 emissions are reported for buildings and fleet with complete consumption data. Scope 3 emissions from procured services are not quantified — recommend approval with observation.',

    'default': 'Documentation complete and pre-validated against the applicable standard. Recommend approval.',
  },

  // ----- Regulatory AI Agent feed -----
  // Canned regulatory-change notifications. ILLUSTRATIVE ONLY: these are written
  // to be plausible for a 2026 demo and are NOT verified against the actual
  // legislative record. Replace wholesale when a real feed exists.
  // severity: 'high' needs action now | 'medium' plan for it | 'info' awareness
  // appliesTo: 'all' or a list of entity ids.
  regulatoryAlerts: [
    {
      id: 'nis2-incident-thresholds',
      date: '2026-04-14',
      severity: 'high',
      standard: 'NIS2',
      title: 'Incident-reporting thresholds tightened for essential entities',
      body: 'Significant-incident thresholds have been narrowed for the health sector, and the 24-hour early warning now applies to service degradation as well as outright unavailability. Entities without a documented out-of-hours escalation route are exposed.',
      domains: ['Incident Response & Reporting'],
      appliesTo: ['osp-san-rocco', 'comune-bergamo'],
      actionBy: '2026-06-30',
    },
    {
      id: 'gdpr-children-data',
      date: '2026-04-02',
      severity: 'high',
      standard: 'GDPR',
      title: 'Supervisory guidance on children\'s data in education settings',
      body: 'New guidance sets out that photograph consent must be separately withdrawable and that retention of attendance and health records requires an explicit period per purpose. Blanket enrolment consent is no longer considered sufficient.',
      domains: ['Data Protection & Privacy'],
      appliesTo: ['delhi-star', 'marina-luna'],
      actionBy: '2026-07-15',
    },
    {
      id: 'gdpr-health-access-logging',
      date: '2026-03-21',
      severity: 'medium',
      standard: 'GDPR',
      title: 'Access logging expected for special-category health records',
      body: 'Art. 9 processing of patient records is expected to carry per-user access logging sufficient to reconstruct who viewed a record and when. Shared clinical logins will not satisfy this.',
      domains: ['Data Protection & Privacy', 'Access Control & Identity'],
      appliesTo: ['osp-san-rocco'],
      actionBy: '2026-09-01',
    },
    {
      id: 'esrs-scope-revision',
      date: '2026-03-05',
      severity: 'medium',
      standard: 'ESG',
      title: 'ESRS reporting scope revised for smaller reporting entities',
      body: 'Resource-use disclosure has been simplified for smaller entities, but the resource-outflow figures that remain must be reconcilable to primary measurement records. Contractor-supplied totals alone will not be accepted.',
      domains: ['Environmental & Social (ESG)'],
      appliesTo: 'all',
      actionBy: '2026-10-31',
    },
    {
      id: 'iso27001-annexa-clarification',
      date: '2026-02-19',
      severity: 'info',
      standard: 'ISO 27001',
      title: 'Annex A guidance clarifies evidence for supplier controls',
      body: 'Clarified guidance on A.5.19–A.5.22 confirms that sub-processor authorisation must be evidenced in writing, not inferred from a framework agreement. Expect this to be sampled at the next surveillance audit.',
      domains: ['Supplier & Third-Party Risk'],
      appliesTo: 'all',
      actionBy: null,
    },
    {
      id: 'agid-minimum-measures',
      date: '2026-01-28',
      severity: 'info',
      standard: 'NIS2',
      title: 'Updated minimum security measures for public administration',
      body: 'The baseline measure set for public bodies now references multi-factor authentication for all administrative access and an annual restore test with a recorded recovery time. Both are already covered by your current controls.',
      domains: ['Access Control & Identity', 'Business Continuity & Resilience'],
      appliesTo: ['comune-bergamo'],
      actionBy: null,
    },
  ],
};

// Alerts the Regulatory AI Agent should raise for a given entity.
window.AGG_CONTENT.alertsFor = function (vesselId) {
  return window.AGG_CONTENT.regulatoryAlerts.filter(a =>
    a.appliesTo === 'all' || (Array.isArray(a.appliesTo) && a.appliesTo.includes(vesselId)));
};

// Content lookup. Tries the exact criterion id first, then the entity-agnostic
// suffix (so `hos-iso27001-a8-access` falls back to `iso27001-a8-access`), then
// 'default'. This lets a shared control define its text once while still
// allowing a per-entity override where the narrative differs.
window.AGG_CONTENT.pick = function (map, certId) {
  if (!map) return undefined;
  if (map[certId]) return map[certId];
  const suffix = String(certId || '').replace(/^(sol|rb|hos|mun)-/, '');
  return map[suffix] || map.default;
};
