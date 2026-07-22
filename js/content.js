// Canned Green Flag compliance content. Not live data — plausible but not verified.
window.AGG_CONTENT = {
  aiSteps: {
    'ihm-part-i': [
      'Reading document metadata and signatures...',
      'Cross-referencing Green Flag waste criteria...',
      'Validating sorting routine and waste management plan...',
      'Checking composting routine and waste account...',
      'Pre-validation complete. 2 minor notes for Miljødirektoratet attention.',
    ],
    'marpol-annex-vi': [
      'Reading purchasing routine and menu plan...',
      'Cross-referencing Green Flag – Food & Health...',
      'Validating share of organic and locally sourced ingredients...',
      'Computing climate assessment for the menu plan...',
      'Pre-validation complete. Climate assessment: acceptable level.',
    ],
    'solas-xii': [
      'Reading maintenance plan and safety inspection report...',
      'Cross-referencing Environmental Health Protection Regulation §9...',
      'Validating completed maintenance measures...',
      'Pre-validation complete.',
    ],
    'ism-code': [
      'Reading IK-Mat handbook and inspection report...',
      'Cross-referencing the Food Hygiene Regulation...',
      'Validating latest Food Safety Authority inspection...',
      'Pre-validation complete.',
    ],
    'ballast-water': [
      'Reading fixture installation documentation...',
      'Cross-referencing Green Flag – Water...',
      'Validating water consumption log...',
      'Pre-validation complete.',
    ],
    'default': [
      'Reading document metadata...',
      'Cross-referencing applicable criteria...',
      'Validating supporting documentation...',
      'Pre-validation complete.',
    ],
  },

  // Per-cert phased animation: {label, ms}. Total ~2.0-2.3s.
  aiPhases: {
    'ihm-part-i': [
      { label: 'Reading document metadata and signatures...', ms: 600 },
      { label: 'Cross-referencing Green Flag waste criteria...', ms: 800 },
      { label: 'Validating waste account and sorting routine...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'marpol-annex-vi': [
      { label: 'Reading purchasing routine and menu plan...', ms: 600 },
      { label: 'Cross-referencing Green Flag – Food & Health...', ms: 800 },
      { label: 'Validating climate assessment of the menu plan...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'iopp': [
      { label: 'Reading energy audit report...', ms: 600 },
      { label: 'Cross-referencing Green Flag – Energy...', ms: 800 },
      { label: 'Validating electricity and heating consumption data...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'eu-ets': [
      { label: 'Reading energy account and meter readings...', ms: 600 },
      { label: 'Cross-referencing Eco-Lighthouse energy criterion...', ms: 800 },
      { label: 'Validating comparison against the reference year...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'cii-rating': [
      { label: 'Reading energy-saving measures list...', ms: 600 },
      { label: 'Cross-referencing Green Flag – Energy...', ms: 800 },
      { label: 'Validating night-setback effect per department...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'ism-code': [
      { label: 'Reading IK-Mat handbook and temperature log...', ms: 600 },
      { label: 'Cross-referencing the Food Hygiene Regulation...', ms: 800 },
      { label: 'Validating latest Food Safety Authority inspection report...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'solas-xii': [
      { label: 'Reading the building maintenance plan...', ms: 600 },
      { label: 'Cross-referencing Environmental Health Protection Regulation §9...', ms: 800 },
      { label: 'Validating safety inspection report...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'solas-v': [
      { label: 'Reading annual plan 2025–2026...', ms: 600 },
      { label: 'Cross-referencing Framework Plan – Sustainability...', ms: 800 },
      { label: 'Validating environmental council minutes...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'afs': [
      { label: 'Reading outdoor area survey report...', ms: 600 },
      { label: 'Cross-referencing Green Flag – Biodiversity...', ms: 800 },
      { label: 'Validating play equipment purchasing routine...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'bwm': [
      { label: 'Reading fixture installation documentation...', ms: 600 },
      { label: 'Cross-referencing Green Flag – Water...', ms: 800 },
      { label: 'Validating water consumption log...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'lsa': [
      { label: 'Reading drill log and inspection reports...', ms: 600 },
      { label: 'Cross-referencing the Fire Prevention Regulation...', ms: 800 },
      { label: 'Validating latest extinguisher inspection...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'mlc': [
      { label: 'Reading cleaning plan and product overview...', ms: 600 },
      { label: 'Cross-referencing Environmental Health Protection Regulation §13...', ms: 800 },
      { label: 'Validating eco-labelling of cleaning products...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'mlc-title-4': [
      { label: 'Reading infection-control routines and training log...', ms: 600 },
      { label: 'Cross-referencing Environmental Health Protection Regulation §17...', ms: 800 },
      { label: 'Validating changing room checklist...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
    'default': [
      { label: 'Reading document metadata...', ms: 600 },
      { label: 'Cross-referencing Green Flag criteria...', ms: 800 },
      { label: 'Validating supporting documentation...', ms: 600 },
      { label: 'Complete — 3 findings ready for review.', ms: 300 },
    ],
  },

  // Findings bullets shown inline after AI validation completes.
  aiFindings: {
    'ihm-part-i': [
      { kind: 'ok', text: 'Waste management plan follows the Green Flag waste template' },
      { kind: 'ok', text: 'Sorting routine documented for all departments' },
      { kind: 'warn', text: 'Waste account for 2026 is missing March figures — manual review advised' },
    ],
    'marpol-annex-vi': [
      { kind: 'ok', text: 'Purchasing routine documents the share of organic ingredients' },
      { kind: 'ok', text: 'Spring 2026 menu plan includes a climate assessment' },
      { kind: 'warn', text: 'Share of locally sourced food is on the criterion boundary — advisory note for Miljødirektoratet' },
    ],
    'iopp': [
      { kind: 'ok', text: 'Energy audit scope covers all four departments' },
      { kind: 'ok', text: 'Electricity and heating consumption data documented' },
      { kind: 'warn', text: 'Energy action plan lacks the manager\'s signature — manual review advised' },
    ],
    'eu-ets': [
      { kind: 'ok', text: 'Energy account follows the Eco-Lighthouse template' },
      { kind: 'ok', text: 'Meter readings logged monthly throughout 2025' },
      { kind: 'warn', text: 'Comparison against the reference year incomplete for Q4' },
    ],
    'cii-rating': [
      { kind: 'ok', text: 'Energy-saving measures list aligns with Green Flag – Energy' },
      { kind: 'ok', text: 'Temperature control plan documented for two departments' },
      { kind: 'warn', text: 'Night-setback effect measurement missing for two departments — manual review advised' },
    ],
    'ism-code': [
      { kind: 'ok', text: 'IK-Mat handbook up to date and audited' },
      { kind: 'ok', text: 'Food Safety Authority inspection closed without deviations' },
      { kind: 'ok', text: 'Fridge and freezer temperature log complete for the last 12 months' },
    ],
    'solas-xii': [
      { kind: 'ok', text: 'Maintenance plan up to date and signed' },
      { kind: 'ok', text: 'Safety inspection round completed without deviations' },
      { kind: 'ok', text: 'Measures closed within deadline per Environmental Health Protection Regulation §9' },
    ],
    'solas-v': [
      { kind: 'ok', text: 'Sustainable development is integrated into the annual plan' },
      { kind: 'ok', text: 'Minutes from the children\'s environmental council on file' },
      { kind: 'warn', text: 'Evaluation of environmental learning activities older than 12 months — schedule an update' },
    ],
    'afs': [
      { kind: 'ok', text: 'Survey report covers the entire outdoor area' },
      { kind: 'ok', text: 'Play equipment purchasing routine documented' },
      { kind: 'ok', text: 'No pressure-treated timber or rubber granulate detected' },
    ],
    'bwm': [
      { kind: 'ok', text: 'Installation documentation matches the fitted fixtures' },
      { kind: 'ok', text: 'Water consumption within target level' },
      { kind: 'ok', text: 'Water consumption log complete for the last 12 months' },
    ],
    'lsa': [
      { kind: 'ok', text: 'Drill log signed by the fire safety officer' },
      { kind: 'warn', text: 'Annual extinguisher inspection expiring within 60 days' },
      { kind: 'ok', text: 'Evacuation plan posted in all departments' },
    ],
    'mlc': [
      { kind: 'ok', text: 'Cleaning plan signed by the general manager' },
      { kind: 'ok', text: 'Product overview with eco-labels updated within the last 12 months' },
      { kind: 'ok', text: 'Eco-labelled products in use in all departments' },
    ],
    'mlc-title-4': [
      { kind: 'ok', text: 'Infection-control routine follows the municipal guideline' },
      { kind: 'warn', text: 'Hand-hygiene training log missing two new staff members — update in progress' },
      { kind: 'warn', text: 'Changing room checklist must be re-verified against Regulation §17' },
    ],
    'default': [
      { kind: 'ok', text: 'Document format matches the applicable criterion' },
      { kind: 'ok', text: 'Supporting documentation verified against the Green Flag register' },
      { kind: 'warn', text: 'One minor item flagged for Miljødirektoratet reviewer attention' },
    ],
  },

  dnvNotes: {
    'ihm-part-i': 'Sorting routine and waste management plan verified against the Green Flag criteria. Composting routine documented for all departments. Minor format deviation in the waste account (March) — recommend approval with observation.',
    'marpol-annex-vi': 'Purchasing routine and menu plan with climate assessment in order. Share of organic ingredients documented. Recommend approval.',
    'solas-xii': 'Maintenance plan and safety inspection confirmed without deviations. Recommend approval.',
    'ism-code': 'IK-Mat system audited. Food Safety Authority inspection closed without deviations. Recommend approval.',
    'ballast-water': 'Water-saving fixtures installed and documented. Water consumption log complete. Recommend approval.',
    'default': 'Documentation complete and pre-validated against the applicable criterion. Recommend approval.',
  },
};
