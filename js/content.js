// Canned maritime compliance content. Not live data — plausible but not verified.
window.AGG_CONTENT = {
  aiSteps: {
    'ihm-part-i': [
      'Parsing document metadata and surveyor signatures...',
      'Cross-referencing EU SRR 1257/2013 Annex II requirements...',
      'Validating surveyor accreditation against IACS class register...',
      'Checking hazardous material declarations (asbestos, PCB, TBT)...',
      'Pre-validation complete. 2 minor notes for DNV attention.',
    ],
    'marpol-annex-vi': [
      'Parsing fuel analysis certificates and bunker delivery notes...',
      'Cross-referencing IMO MEPC.81(43) sulphur cap compliance...',
      'Validating NOx Technical File revision level...',
      'Computing CII attained vs required rating...',
      'Pre-validation complete. CII rating: C (required: C or better).',
    ],
    'solas-xii': [
      'Parsing structural survey reports and plan approvals...',
      'Cross-referencing SOLAS Chapter XII double-hull requirements...',
      'Validating class society endorsements...',
      'Pre-validation complete.',
    ],
    'ism-code': [
      'Parsing Safety Management Certificate and DOC...',
      'Cross-referencing ISM Code functional requirements...',
      'Validating last external audit evidence...',
      'Pre-validation complete.',
    ],
    'ballast-water': [
      'Parsing BWMS type approval certificate...',
      'Cross-referencing BWM Convention D-2 standard...',
      'Validating commissioning test records...',
      'Pre-validation complete.',
    ],
    'default': [
      'Parsing document metadata...',
      'Cross-referencing applicable regulations...',
      'Validating supporting evidence...',
      'Pre-validation complete.',
    ],
  },

  // Per-cert phased animation: {label, ms}. Total ~2.0-2.3s.
  aiPhases: {
    'ihm-part-i': [
      { label: 'Parsing document metadata...', ms: 600 },
      { label: 'Cross-referencing EU SRR 1257/2013 Annex II...', ms: 800 },
      { label: 'Validating surveyor accreditation...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'marpol-annex-vi': [
      { label: 'Parsing fuel analysis certificates...', ms: 600 },
      { label: 'Cross-referencing MARPOL Annex VI Reg. 14 & 18...', ms: 800 },
      { label: 'Validating NOx Technical File revision...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'iopp': [
      { label: 'Parsing IOPP renewal documentation...', ms: 600 },
      { label: 'Cross-referencing MARPOL Annex I Reg. 6...', ms: 800 },
      { label: 'Validating inert gas system survey...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'eu-ets': [
      { label: 'Parsing monitoring plan and emissions data...', ms: 600 },
      { label: 'Cross-referencing EU 2023/957 scope boundaries...', ms: 800 },
      { label: 'Validating verifier accreditation...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'cii-rating': [
      { label: 'Parsing annual fuel consumption report...', ms: 600 },
      { label: 'Cross-referencing MARPOL Annex VI Reg. 28...', ms: 800 },
      { label: 'Validating distance and cargo-mass evidence...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'ism-code': [
      { label: 'Parsing SMC and DOC records...', ms: 600 },
      { label: 'Cross-referencing ISM Code Part A...', ms: 800 },
      { label: 'Validating last external audit evidence...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'solas-xii': [
      { label: 'Parsing structural survey reports...', ms: 600 },
      { label: 'Cross-referencing SOLAS Ch. XII Reg. 4...', ms: 800 },
      { label: 'Validating class society endorsements...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'solas-v': [
      { label: 'Parsing navigation equipment survey...', ms: 600 },
      { label: 'Cross-referencing SOLAS Ch. V requirements...', ms: 800 },
      { label: 'Validating ECDIS and AIS records...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'afs': [
      { label: 'Parsing anti-fouling declaration...', ms: 600 },
      { label: 'Cross-referencing AFS Convention 2001 Annex I...', ms: 800 },
      { label: 'Validating coating system records...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'bwm': [
      { label: 'Parsing BWMS type approval certificate...', ms: 600 },
      { label: 'Cross-referencing BWM Convention D-2 standard...', ms: 800 },
      { label: 'Validating commissioning test records...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'lsa': [
      { label: 'Parsing lifeboat and LSA service records...', ms: 600 },
      { label: 'Cross-referencing LSA Code Ch. IV...', ms: 800 },
      { label: 'Validating last service interval...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'mlc': [
      { label: 'Parsing DMLC Part II and crew records...', ms: 600 },
      { label: 'Cross-referencing MLC 2006 Title 3...', ms: 800 },
      { label: 'Validating accommodation inspection report...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'mlc-title-4': [
      { label: 'Parsing medical stores inventory log...', ms: 600 },
      { label: 'Cross-referencing MLC 2006 Title 4 Standard A4.1...', ms: 800 },
      { label: 'Validating medical personnel qualifications...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
    'default': [
      { label: 'Parsing document metadata...', ms: 600 },
      { label: 'Cross-referencing applicable regulations...', ms: 800 },
      { label: 'Validating supporting evidence...', ms: 600 },
      { label: 'Complete — 3 findings surfaced.', ms: 300 },
    ],
  },

  // Findings bullets shown inline after AI validation completes.
  aiFindings: {
    'ihm-part-i': [
      { kind: 'ok', text: 'Document format matches EU SRR Annex II' },
      { kind: 'ok', text: 'Surveyor accreditation verified (valid through 2028)' },
      { kind: 'warn', text: 'Asbestos register Section 4B has a minor format deviation — manual review advised' },
    ],
    'marpol-annex-vi': [
      { kind: 'ok', text: 'Fuel sulphur content within 0.5% cap on all bunker deliveries' },
      { kind: 'ok', text: 'NOx Technical File revision 3 present and signed' },
      { kind: 'warn', text: 'CII attained rating sits on the C/D boundary — advisory note for DNV' },
    ],
    'iopp': [
      { kind: 'ok', text: 'Previous IOPP certificate history traced; renewal survey scope validated' },
      { kind: 'ok', text: 'Inert gas system commissioning records on file' },
      { kind: 'warn', text: 'Tank cleaning records for voyages 12–14 missing one signature — manual review advised' },
    ],
    'eu-ets': [
      { kind: 'ok', text: 'Monitoring plan aligned with EU 2023/957 scope' },
      { kind: 'ok', text: 'Verifier accreditation verified (TÜV Nord, valid through 2027)' },
      { kind: 'warn', text: '2025 Q4 emissions data incomplete — three voyages pending reconciliation' },
    ],
    'cii-rating': [
      { kind: 'ok', text: 'Annual fuel consumption report format matches IMO DCS template' },
      { kind: 'ok', text: 'Distance-travelled evidence cross-checked against AIS records' },
      { kind: 'warn', text: 'Voyage 14 data point on CII boundary — manual review advised' },
    ],
    'ism-code': [
      { kind: 'ok', text: 'Safety Management Certificate current (valid through 2027)' },
      { kind: 'ok', text: 'Document of Compliance on file and signed' },
      { kind: 'ok', text: 'Last external audit closed with no major non-conformities' },
    ],
    'solas-xii': [
      { kind: 'ok', text: 'Double-hull structural survey signed by class society' },
      { kind: 'ok', text: 'Hull thickness measurements within allowable tolerance' },
      { kind: 'ok', text: 'Plan approvals current against SOLAS Ch. XII Reg. 4' },
    ],
    'solas-v': [
      { kind: 'ok', text: 'ECDIS software version current against IHO S-52' },
      { kind: 'ok', text: 'AIS and VDR maintenance records on file' },
      { kind: 'warn', text: 'Radar performance test report older than 12 months — schedule refresh' },
    ],
    'afs': [
      { kind: 'ok', text: 'Coating system matches AFS Annex I approved list' },
      { kind: 'ok', text: 'Application records and supplier declarations present' },
      { kind: 'ok', text: 'No prohibited substances detected in declaration' },
    ],
    'bwm': [
      { kind: 'ok', text: 'BWMS type approval certificate matches installation' },
      { kind: 'ok', text: 'D-2 standard commissioning test passed' },
      { kind: 'ok', text: 'Ballast water record book entries complete for last 12 months' },
    ],
    'lsa': [
      { kind: 'ok', text: 'Lifeboat service records signed by approved service provider' },
      { kind: 'warn', text: 'Liferaft #3 service interval expiring within 60 days' },
      { kind: 'ok', text: 'LSA Code Ch. IV inventory complete' },
    ],
    'mlc': [
      { kind: 'ok', text: 'DMLC Part II signed by flag state' },
      { kind: 'ok', text: 'Accommodation inspection report within 12 months' },
      { kind: 'ok', text: 'Crew employment agreements on file for all seafarers' },
    ],
    'mlc-title-4': [
      { kind: 'ok', text: 'Medical stores inventory format matches IMO Res. A.1079(28)' },
      { kind: 'warn', text: 'Shipboard Medical Care Certificate expired 2026-02 — renewal pending' },
      { kind: 'warn', text: 'Designated medical personnel qualifications need re-verification' },
    ],
    'default': [
      { kind: 'ok', text: 'Document format matches applicable regulation' },
      { kind: 'ok', text: 'Supporting evidence verified against class register' },
      { kind: 'warn', text: 'One minor item flagged for DNV reviewer attention' },
    ],
  },

  dnvNotes: {
    'ihm-part-i': 'Surveyor accreditation verified against IACS register. Material declarations complete for all 14 hazardous categories. Minor format deviation on asbestos register (Section 4B) — recommend accepting with observation.',
    'marpol-annex-vi': 'Fuel samples comply with 0.5% S cap. NOx Technical File revision 3 current. CII attained: C. Recommend approval.',
    'solas-xii': 'Double-hull structural integrity confirmed by class society. Recommend approval.',
    'ism-code': 'Safety Management System audit current. DOC valid through 2027. Recommend approval.',
    'ballast-water': 'Type-approved BWMS installed. D-2 standard commissioning test passed. Recommend approval.',
    'default': 'Documentation complete and pre-validated against applicable regulation. Recommend approval.',
  },
};
