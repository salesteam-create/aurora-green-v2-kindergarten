// Single source of truth. Mutate only via updateState / action helpers.
(function () {
  const cert = (id, name, regulation, criticality, status, costMin, costMax, weeks, gap, docs) => ({
    id, name, regulation, criticality, status,
    costMin, costMax, timelineWeeks: weeks,
    gapAnalysis: gap,
    requiredDocs: docs,
    uploadedDocs: [],
  });

  window.INITIAL_STATE = {
    currentPersona: 'compliance',
    currentView: 'dashboard',
    selectedVesselId: 'delhi-star',
    selectedComponentId: 'engine-room',
    selectedCertId: null,
    selectedSubmissionId: null,

    vaultStage: 'locked',
    currentVaultId: null,
    privateVaults: {
      'sultan-vault': {
        id: 'sultan-vault',
        name: 'Solstråle Barnehage',
        clientName: 'Stavanger Municipality',
        description: 'Municipal kindergarten · Green Flag candidate',
        assetIds: ['delhi-star'],
        status: 'active',
        createdAt: '2026-02-12',
        suppliers: [
          { id: 'marinepro', name: 'Nordic Meals Catering', role: 'Kitchen & Food · Energy & Heating · Cleaning & Hygiene', shareEquityPct: 8.5, greenSharesPct: 12, certCounts: { compliant: 3, pending: 1, missing: 1 }, valueContribution: 22_400_000, status: 'active', joinedAt: '2026-01-20' },
          { id: 'nordiccert', name: 'GreenGrounds Property AS', role: 'Building & Grounds · Water & Sanitation · Learning & Curriculum', shareEquityPct: 6.2, greenSharesPct: 9, certCounts: { compliant: 4, pending: 0, missing: 0 }, valueContribution: 19_100_000, status: 'active', joinedAt: '2026-01-15' },
          { id: 'seagreen', name: 'Rogaland Waste AS', role: 'Safety & HSE · Waste & Recycling', shareEquityPct: 4.0, greenSharesPct: 7, certCounts: { compliant: 0, pending: 1, missing: 1 }, valueContribution: 8_700_000, status: 'active', joinedAt: '2026-02-08' },
          { id: 'iso-acoustics', name: 'Indoor Climate Consult AS', role: 'Indoor climate & noise assessment (onboarding pending)', shareEquityPct: 1.8, greenSharesPct: 3, certCounts: { compliant: 0, pending: 0, missing: 1 }, valueContribution: 0, status: 'pending', joinedAt: null },
        ],
      },
      'monaco-vault': {
        id: 'monaco-vault',
        name: 'Regnbuen Barnehage',
        clientName: 'Regnbuen Drift AS',
        description: 'Private kindergarten · Green Flag candidate',
        assetIds: ['marina-luna'],
        status: 'active',
        createdAt: '2026-03-04',
        suppliers: [
          { id: 'seagreen', name: 'Rogaland Waste AS', role: 'All areas (full delivery)', shareEquityPct: 14.0, greenSharesPct: 18, certCounts: { compliant: 7, pending: 0, missing: 1 }, valueContribution: 26_300_000, status: 'active', joinedAt: '2026-02-22' },
          { id: 'monaco-tech', name: 'LekLearn Educational Supplies', role: 'Learning & Curriculum – upgrades', shareEquityPct: 2.0, greenSharesPct: 4, certCounts: { compliant: 1, pending: 0, missing: 0 }, valueContribution: 4_100_000, status: 'active', joinedAt: '2026-03-10' },
        ],
      },
      'equinor-vault': {
        id: 'equinor-vault',
        name: 'New Kindergarten (coming)',
        clientName: 'Rogaland (placeholder)',
        description: 'Onboarding — upcoming kindergarten',
        assetIds: [],
        status: 'placeholder',
        createdAt: null,
        suppliers: [],
      },
    },

    vessels: {
      'delhi-star': {
        id: 'delhi-star',
        name: 'Solstråle Barnehage',
        imo: '974 652 100',
        type: 'Municipal kindergarten · 4 departments',
        flag: 'Stavanger',
        targetMarket: 'Green Flag certification',
        yearBuilt: 2014,
        dwt: '82 children · 22 staff',
        nominalValue: 300_000_000,
        currentValue: 285_000_000,
        projectedValue: 312_000_000,
        euReadinessScore: 62,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Kitchen & Food', assignedTo: 'marinepro',
            score: 74, status: 'partial', zone: 'engine',
            certifications: [
              cert('ihm-part-i', 'Waste Sorting & Reduction', 'Green Flag – Waste', 'high', 'missing',
                18000, 25000, [6, 8],
                'Waste sorting is partially established. Food waste is not composted systematically, and the annual waste account lacks documentation for the current year.',
                ['Waste Management Plan', 'Sorting Routine', 'Waste Account 2026']),
              cert('marpol-annex-vi', 'Organic & Locally Sourced Food', 'Green Flag – Food & Health', 'high', 'partial',
                4500, 8000, [3, 5],
                'A purchasing routine for organic ingredients exists, but the share of locally sourced food is not documented. The spring 2026 menu plan lacks a climate assessment.',
                ['Food Purchasing Routine', 'Menu Plan with Climate Assessment', 'Supplier Overview']),
              cert('ism-code', 'Kitchen Internal Control (IK-Mat)', 'Food Hygiene Regulation / IK-Mat', 'high', 'compliant',
                2000, 3500, [2, 3],
                'The internal control system is established and audited. Latest inspection by the Norwegian Food Safety Authority closed without deviations.',
                ['IK-Mat Handbook', 'Food Safety Authority Inspection Report', 'Fridge & Freezer Temperature Log']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Energy & Heating', assignedTo: 'marinepro',
            score: 58, status: 'partial', zone: 'fuel',
            certifications: [
              cert('iopp', 'Energy Audit', 'Green Flag – Energy', 'critical', 'missing',
                15000, 22000, [5, 7],
                'No energy audit has been conducted. Heating sources and consumption data for 2025 lack documentation.',
                ['Energy Audit Report', 'Electricity & Heating Consumption Overview', 'Energy Action Plan']),
              cert('eu-ets', 'Energy Accounting & Meter Readings', 'Eco-Lighthouse criterion – Energy', 'high', 'partial',
                6000, 12000, [4, 6],
                'Meter readings are logged monthly, but the 2025 energy account is incomplete. Comparison against the reference year is missing.',
                ['Energy Account 2025', 'Meter Reading Log', 'Reference Year Baseline']),
              cert('cii-rating', 'Energy-Saving Measures & Temperature Control', 'Green Flag – Energy', 'high', 'partial',
                3000, 5000, [2, 4],
                'Night setback of indoor temperature is in place in two of four departments. The effect has not yet been measured and documented.',
                ['Energy-Saving Measures List', 'Temperature Control Plan']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Building & Grounds', assignedTo: 'nordiccert',
            score: 88, status: 'compliant', zone: 'hull',
            certifications: [
              cert('solas-xii', 'Building Maintenance Plan', 'Regulation on Environmental Health Protection in Kindergartens §9', 'high', 'compliant',
                0, 0, [0, 0],
                'The building maintenance plan is up to date and followed. No deviations at the latest safety inspection round.',
                ['Maintenance Plan', 'Safety Inspection Report']),
              cert('afs', 'Toxin-Free Outdoor Area', 'Green Flag – Biodiversity', 'medium', 'compliant',
                0, 0, [0, 0],
                'The outdoor area has been surveyed. Pressure-treated timber and rubber granulate have been removed from play areas.',
                ['Outdoor Area Survey Report', 'Play Equipment Purchasing Routine']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Water & Sanitation', assignedTo: 'nordiccert',
            score: 92, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ballast-water', 'Water-Saving Measures', 'Green Flag – Water', 'high', 'compliant',
                0, 0, [0, 0],
                'Water-saving fixtures installed in 2022. Consumption is monitored monthly and within target.',
                ['Installation Documentation', 'Water Consumption Log']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Learning & Curriculum', assignedTo: 'nordiccert',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('solas-v', 'Sustainability in the Annual Plan', 'Framework Plan for Kindergartens – Sustainability', 'high', 'compliant',
                0, 0, [0, 0],
                'Sustainable development is integrated into the annual plan. A children\'s environmental council was established in autumn 2025.',
                ['Annual Plan 2025–2026', 'Environmental Council Minutes']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Safety & HSE', assignedTo: 'seagreen',
            score: 71, status: 'partial', zone: 'deck',
            certifications: [
              cert('lsa', 'Fire Safety & Evacuation Drills', 'Fire Prevention Regulation', 'medium', 'partial',
                2500, 4500, [2, 3],
                'The spring evacuation drill is 4 months overdue. The annual inspection of extinguishing equipment must be documented.',
                ['Evacuation Drill Log', 'Extinguisher Inspection Report']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Cleaning & Hygiene', assignedTo: 'marinepro',
            score: 80, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('mlc', 'Cleaning Plan & Eco-Labelled Products', 'Regulation on Environmental Health Protection in Kindergartens §13', 'medium', 'compliant',
                0, 0, [0, 0],
                'The cleaning plan is followed. Eco-labelled cleaning products introduced in all departments, last revised May 2025.',
                ['Cleaning Plan', 'Product Overview with Eco-Labels']),
              cert('mlc-title-4', 'Infection Control & Hygiene Routines', 'Regulation on Environmental Health Protection in Kindergartens §17', 'high', 'missing',
                2000, 4000, [2, 3],
                'Written infection-control routines are missing for changing rooms and the kitchen. Hand-hygiene training for new staff is not documented, and routines must be updated in line with the municipal guideline.',
                ['Infection Control Routine', 'Hand Hygiene Training Log', 'Changing Room Checklist']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Waste & Recycling', assignedTo: 'seagreen',
            score: 65, status: 'partial', zone: 'cargo',
            certifications: [
              cert('esp', 'Waste Mapping & Recycling Rate', 'Green Flag – Waste', 'high', 'partial',
                8000, 14000, [3, 5],
                'Waste mapping is partially complete. Two departments lack residual-waste weighing, so the recycling rate cannot be calculated for 2026.',
                ['Waste Mapping Report', 'Residual Waste Weighing Log', 'Recycling Report']),
            ],
          },
        },
      },
      'marina-luna': {
        id: 'marina-luna',
        name: 'Regnbuen Barnehage',
        imo: '912 305 447',
        type: 'Private kindergarten · 3 departments',
        flag: 'Sandnes',
        targetMarket: 'Green Flag certification',
        yearBuilt: 2019,
        dwt: '58 children · 15 staff',
        nominalValue: 180_000_000,
        currentValue: 172_000_000,
        projectedValue: 185_000_000,
        euReadinessScore: 81,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Kitchen & Food', assignedTo: 'seagreen',
            score: 90, status: 'compliant', zone: 'engine',
            certifications: [
              cert('ml-ism', 'Kitchen Internal Control (IK-Mat)', 'Food Hygiene Regulation / IK-Mat', 'high', 'compliant',
                0, 0, [0, 0], 'Internal control system established. Latest Food Safety Authority inspection closed without deviations.',
                ['IK-Mat Handbook', 'Inspection Report']),
              cert('ml-marpol-vi', 'Food Waste Sorting', 'Green Flag – Waste', 'high', 'compliant',
                0, 0, [0, 0], 'Food waste is composted. The waste account has been kept continuously since 2024.',
                ['Composting Routine', 'Waste Account']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Energy & Heating', assignedTo: 'seagreen',
            score: 62, status: 'partial', zone: 'fuel',
            certifications: [
              cert('ml-eu-mrv', 'Energy Audit', 'Green Flag – Energy', 'critical', 'missing',
                5000, 9000, [3, 5],
                'The 2026 energy audit has not been conducted. The kindergarten applies for Green Flag renewal from Q3; the audit must be verified before the application is submitted.',
                ['Energy Audit Report', 'Electricity & Heating Consumption Overview', 'Energy Action Plan']),
              cert('ml-cii', 'Energy Accounting & Meter Readings', 'Eco-Lighthouse criterion – Energy', 'high', 'partial',
                2500, 4500, [2, 3],
                'Meter readings are logged, but the 2025 energy account is incomplete.',
                ['Energy Account 2025', 'Meter Reading Log']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Building & Grounds', assignedTo: 'seagreen',
            score: 92, status: 'compliant', zone: 'hull',
            certifications: [
              cert('ml-solas-ii', 'Building Maintenance Plan', 'Regulation on Environmental Health Protection in Kindergartens §9', 'high', 'compliant',
                0, 0, [0, 0], 'The maintenance plan is up to date. No deviations at the latest safety inspection round.',
                ['Maintenance Plan', 'Safety Inspection Report']),
              cert('ml-afs', 'Toxin-Free Outdoor Area', 'Green Flag – Biodiversity', 'medium', 'compliant',
                0, 0, [0, 0], 'The outdoor area has been surveyed and toxin-free materials documented.',
                ['Outdoor Area Survey Report']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Water & Sanitation', assignedTo: 'seagreen',
            score: 88, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ml-bwm', 'Water-Saving Measures', 'Green Flag – Water', 'high', 'compliant',
                0, 0, [0, 0], 'Water-saving fixtures installed in 2021. Consumption is monitored monthly.',
                ['Installation Documentation', 'Water Consumption Log']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Learning & Curriculum', assignedTo: 'seagreen',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('ml-solas-v', 'Sustainability in the Annual Plan', 'Framework Plan for Kindergartens – Sustainability', 'high', 'compliant',
                0, 0, [0, 0], 'Sustainable development is integrated into the annual plan. The environmental council is active.',
                ['Annual Plan 2025–2026']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Safety & HSE', assignedTo: 'seagreen',
            score: 75, status: 'partial', zone: 'deck',
            certifications: [
              cert('ml-lsa', 'Fire Safety & Evacuation Drills', 'Fire Prevention Regulation', 'medium', 'partial',
                2000, 3500, [2, 3],
                'The annual inspection of extinguishing equipment is due. The spring evacuation drill must be completed before Green Flag renewal.',
                ['Evacuation Drill Log', 'Extinguisher Inspection Report']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Cleaning & Hygiene', assignedTo: 'seagreen',
            score: 82, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('ml-mlc', 'Cleaning Plan & Eco-Labelled Products', 'Regulation on Environmental Health Protection in Kindergartens §13', 'medium', 'compliant',
                0, 0, [0, 0], 'The cleaning plan is followed. Eco-labelled products in use in all departments.',
                ['Cleaning Plan', 'Product Overview with Eco-Labels']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Waste & Recycling', assignedTo: 'seagreen',
            score: 74, status: 'partial', zone: 'cargo',
            certifications: [
              cert('ml-grey-black', 'Waste Mapping & Recycling Rate', 'Green Flag – Waste', 'medium', 'partial',
                1500, 3000, [1, 2],
                'Residual-waste weighing is overdue. The 2025 recycling report is incomplete.',
                ['Residual Waste Weighing Log', 'Recycling Report']),
            ],
          },
        },
      },
    },

    dnvQueue: [
      {
        id: 'sub-seed-1',
        vesselId: 'marina-luna', vesselName: 'Regnbuen Barnehage',
        componentId: 'engine-room', componentName: 'Kitchen & Food',
        certId: 'marpol-annex-vi', certName: 'Food Waste Sorting',
        submittedBy: 'Rogaland Waste AS',
        submittedAt: '2026-04-19T10:14:00Z',
        docs: ['Composting_Routine_2026.pdf', 'Waste_Account_Q1_2026.pdf'],
        aiNotes: 'Composting routine documented and waste account maintained for Q1 2026. Waste sorting confirmed in all departments. Recommend approval.',
        status: 'pending',
      },
    ],

    completedReviews: [
      {
        id: 'done-1', vesselName: 'Regnbuen Barnehage',
        certId: 'ml-solas-v', certName: 'Sustainability in the Annual Plan',
        submittedBy: 'GreenGrounds Property AS', decidedAt: '2026-04-15T09:00:00Z', decision: 'approved',
        reviewerNotes: 'Annual plan and environmental council minutes in good order. Approved without observation.',
      },
    ],

    recentActivity: [
      { at: '2026-04-20T11:32:00Z', text: 'Nordic Meals Catering uploaded the menu plan with climate assessment.', persona: 'compliance' },
      { at: '2026-04-18T14:10:00Z', text: 'Miljødirektoratet approved Kitchen Internal Control (IK-Mat).', persona: 'dnv' },
      { at: '2026-04-16T08:45:00Z', text: 'Toxin-free outdoor area survey report verified.', persona: 'compliance' },
    ],

    compliantEntities: {
      'marinepro':  { name: 'Nordic Meals Catering',     components: ['engine-room', 'fuel-emissions', 'accommodation'] },
      'nordiccert': { name: 'GreenGrounds Property AS',  components: ['hull-structure', 'ballast-water', 'bridge-nav'] },
      'seagreen':   { name: 'Rogaland Waste AS',         components: ['deck-safety', 'cargo-tanks'] },
    },
    currentComplianceEntity: 'marinepro',

    scoreHistory: [
      { date: '2025-11', score: 48 },
      { date: '2025-12', score: 52 },
      { date: '2026-01', score: 55 },
      { date: '2026-02', score: 58 },
      { date: '2026-03', score: 60 },
      { date: '2026-04', score: 62 },
    ],

    // Five-pillar Scientific Committee framework. Weights sum to 1.0.
    // Every cert id in INITIAL_STATE maps to exactly one pillar.
    criteriaFramework: [
      {
        id: 'esg',
        name: 'Waste & Recycling',
        description: 'Waste sorting, composting, and reduction across the kindergarten.',
        weight: 0.30,
        ratifiedAt: '2026-01-15',
        certIds: ['ihm-part-i', 'ballast-water', 'ml-bwm'],
      },
      {
        id: 'emissions',
        name: 'Energy & Climate',
        description: 'Energy use, heating efficiency, and climate-footprint reduction.',
        weight: 0.25,
        ratifiedAt: '2026-01-15',
        certIds: ['marpol-annex-vi', 'iopp', 'eu-ets', 'cii-rating',
                  'ml-marpol-vi', 'ml-eu-mrv', 'ml-cii', 'ml-grey-black'],
      },
      {
        id: 'safety',
        name: 'Health & Safety',
        description: 'Indoor air quality, hygiene, and child safety.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['ism-code', 'solas-v', 'lsa', 'ml-ism', 'ml-solas-v', 'ml-lsa'],
      },
      {
        id: 'structural',
        name: 'Nature & Outdoors',
        description: 'Grounds, biodiversity, and outdoor learning.',
        weight: 0.15,
        ratifiedAt: '2026-01-15',
        certIds: ['solas-xii', 'afs', 'esp', 'ml-solas-ii', 'ml-afs'],
      },
      {
        id: 'labor',
        name: 'Pedagogy & Wellbeing',
        description: 'Staff competence, environmental curriculum, and child wellbeing.',
        weight: 0.10,
        ratifiedAt: '2026-01-15',
        certIds: ['mlc', 'mlc-title-4', 'ml-mlc'],
      },
    ],
  };

  // ----- Per-cert decay defaults (renewal-cycle months + last-validated date) -----
  // Three Delhi Star certs are tuned to expire within ~90 days of 2026-04-29 so the
  // decay projection has live at-risk items to surface. Others are fresh.
  const DECAY_BY_ID = {
    // Annual (~12mo)
    'marpol-annex-vi': { decay: 12, validated: '2025-09-01' },
    'iopp':            { decay: 12, validated: '2025-12-01' },
    'eu-ets':          { decay: 12, validated: '2025-11-15' },
    'cii-rating':      { decay: 12, validated: '2025-12-20' },
    'solas-v':         { decay: 12, validated: '2025-09-15' },
    'lsa':             { decay: 12, validated: '2025-08-01' },
    'ml-marpol-vi':    { decay: 12, validated: '2025-09-15' },
    'ml-eu-mrv':       { decay: 12, validated: '2025-10-01' },
    'ml-cii':          { decay: 12, validated: '2025-11-01' },
    'ml-grey-black':   { decay: 12, validated: '2025-08-01' },
    'ml-solas-v':      { decay: 12, validated: '2025-09-15' },
    'ml-lsa':          { decay: 12, validated: '2025-08-01' },
    // Bi-annual SMS audit cycle (~24mo)
    'ism-code':        { decay: 24, validated: '2024-06-15' }, // at-risk: expires 2026-06-15
    'ml-ism':          { decay: 24, validated: '2025-08-01' },
    // Class / 5-year survey cycle (~60mo)
    'solas-xii':       { decay: 60, validated: '2021-07-15' }, // at-risk: expires 2026-07-15
    'afs':             { decay: 60, validated: '2021-06-15' }, // at-risk: expires 2026-06-15
    'esp':             { decay: 60, validated: '2024-01-15' },
    'ihm-part-i':      { decay: 60, validated: '2025-01-01' },
    'ballast-water':   { decay: 60, validated: '2022-11-01' },
    'mlc':             { decay: 60, validated: '2025-05-01' },
    'mlc-title-4':     { decay: 60, validated: '2025-05-01' },
    'ml-solas-ii':     { decay: 60, validated: '2024-03-01' },
    'ml-afs':          { decay: 60, validated: '2023-05-01' },
    'ml-bwm':          { decay: 60, validated: '2021-09-01' },
    'ml-mlc':          { decay: 60, validated: '2025-05-01' },
  };
  Object.values(window.INITIAL_STATE.vessels).forEach(v => {
    Object.values(v.components).forEach(c => {
      c.certifications.forEach(cert => {
        const d = DECAY_BY_ID[cert.id] || { decay: 60, validated: '2025-01-01' };
        cert.decayWindowMonths = d.decay;
        cert.lastValidatedAt = d.validated;
      });
    });
  });

  window.demoState = structuredClone(window.INITIAL_STATE);

  // ----- Computation helpers -----
  const CERT_WEIGHTS = { missing: 0, partial: 50, 'pending-review': 75, compliant: 100, approved: 100 };

  function componentHasDiverged(component, vesselId) {
    const initComp = window.INITIAL_STATE.vessels[vesselId]?.components?.[component.id];
    if (!initComp) return true;
    return component.certifications.some((c, i) => {
      const ic = initComp.certifications[i];
      if (!ic) return true;
      return c.status !== ic.status || (c.uploadedDocs && c.uploadedDocs.length > 0);
    });
  }

  function recomputeComponent(component, vesselId) {
    if (!component.certifications || component.certifications.length === 0) return false;
    // Leave seeded score/status untouched until this component's certs actually diverge from initial.
    if (!componentHasDiverged(component, vesselId)) return false;
    const total = component.certifications.reduce((s, c) => s + (CERT_WEIGHTS[c.status] ?? 0), 0);
    const avg = total / component.certifications.length;
    component.score = Math.round(avg);
    if (avg >= 95) component.status = 'compliant';
    else if (avg >= 55) component.status = 'partial';
    else component.status = 'missing';
    return true;
  }

  function recomputeVessel(vessel) {
    const comps = Object.values(vessel.components);
    if (comps.length === 0) return;
    let anyChanged = false;
    comps.forEach(c => { if (recomputeComponent(c, vessel.id)) anyChanged = true; });
    if (!anyChanged) return;

    const avg = comps.reduce((s, c) => s + c.score, 0) / comps.length;
    vessel.euReadinessScore = Math.round(avg);

    let criticalGaps = 0;
    comps.forEach(c => c.certifications.forEach(cert => {
      if (cert.criticality === 'critical' && (cert.status === 'missing' || cert.status === 'partial')) criticalGaps++;
    }));
    vessel.criticalGaps = criticalGaps;

    // Linear interpolation between currentValue-floor and projectedValue based on readiness score.
    const floor = vessel.nominalValue * 0.80;
    const ceiling = vessel.projectedValue;
    vessel.currentValue = Math.round(floor + (ceiling - floor) * (vessel.euReadinessScore / 100));
  }

  window.recomputeAll = function () {
    Object.values(window.demoState.vessels).forEach(recomputeVessel);
  };

  // Pure projection: what would the score/value be if we let decay run for N months?
  // Does not mutate live state. Uses the same CERT_WEIGHTS averaging the live recompute
  // uses, but applies the result as a *delta* off the displayed score so the seeded
  // baseline (which is artificially below the formula) is preserved.
  window.computeDecayProjection = function (vesselId, monthsAhead) {
    const live = window.demoState.vessels[vesselId];
    if (!live) return null;
    const today = new Date('2026-04-29');
    const horizon = new Date(today);
    horizon.setMonth(horizon.getMonth() + monthsAhead);

    const avgFromCerts = (vessel) => {
      const comps = Object.values(vessel.components);
      const compScore = (comp) => {
        const t = comp.certifications.reduce((s, c) => s + (CERT_WEIGHTS[c.status] ?? 0), 0);
        return t / comp.certifications.length;
      };
      return comps.reduce((s, c) => s + compScore(c), 0) / comps.length;
    };

    const baseline = avgFromCerts(live);

    const clone = structuredClone(live);
    const atRiskCerts = [];
    Object.values(clone.components).forEach(comp => {
      comp.certifications.forEach(cert => {
        if ((cert.status !== 'compliant' && cert.status !== 'approved')
            || !cert.lastValidatedAt || !cert.decayWindowMonths) return;
        const expiry = new Date(cert.lastValidatedAt);
        expiry.setMonth(expiry.getMonth() + cert.decayWindowMonths);
        if (expiry < horizon) {
          const monthsToExpiry = Math.max(0, Math.round((expiry - today) / (30.44 * 86400000)));
          atRiskCerts.push({ name: cert.name, monthsToExpiry, componentName: comp.name });
          cert.status = 'partial';
        }
      });
    });

    const decayed = avgFromCerts(clone);
    const delta = baseline - decayed;
    const projectedScore = Math.max(0, Math.round(live.euReadinessScore - delta));
    const floor = live.nominalValue * 0.80;
    const projectedValue = Math.round(floor + (live.projectedValue - floor) * (projectedScore / 100));

    return { projectedScore, projectedValue, atRiskCerts };
  };

  window.updateState = function (mutator) {
    mutator(window.demoState);
    window.recomputeAll();
    if (window.render) window.render();
  };

  window.resetDemo = function () {
    // Preserve the active persona across resets so the demonstrator stays
    // in the role they were showing — they only meant to clear domain state.
    const keepPersona = window.demoState.currentPersona;
    window.demoState = structuredClone(window.INITIAL_STATE);
    window.demoState.currentPersona = keepPersona;
    window.demoState.currentView = window.DEFAULT_VIEW[keepPersona];
    // Reset skips the door — drop straight into the SV shell.
    window.demoState.vaultStage = 'sv-shell';
    window.demoState.currentVaultId = null;
    if (window.render) window.render();
    window.toast && window.toast('Demo reset · vault unlocked, state cleared.');
  };

  window.logActivity = function (text) {
    window.demoState.recentActivity.unshift({
      at: new Date().toISOString(),
      text,
      persona: window.demoState.currentPersona,
      session: true,
    });
  };

  // Seeded values are authoritative at boot — recompute only runs on mutation.
})();
