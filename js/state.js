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
    currentPersona: 'owner',
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
        name: "Sultan's Vault",
        clientName: 'Royal Board · Delhi Star',
        description: 'Flagship superyacht · IMO 9876543',
        assetIds: ['delhi-star'],
        status: 'active',
        createdAt: '2026-02-12',
      },
      'monaco-vault': {
        id: 'monaco-vault',
        name: 'Marina Luna Vault',
        clientName: 'Mediterranean Holdings · Marina Luna',
        description: 'Superyacht · IMO 9543210',
        assetIds: ['marina-luna'],
        status: 'active',
        createdAt: '2026-03-04',
      },
      'equinor-vault': {
        id: 'equinor-vault',
        name: 'Equinor Platform Vault',
        clientName: 'Equinor (placeholder)',
        description: 'Offshore platform digital twin · onboarding',
        assetIds: [],
        status: 'placeholder',
        createdAt: null,
      },
    },

    vessels: {
      'delhi-star': {
        id: 'delhi-star',
        name: 'Delhi Star',
        imo: '9876543',
        type: 'Oil Tanker (Suezmax)',
        flag: 'India',
        targetMarket: 'Netherlands (EU)',
        yearBuilt: 2014,
        dwt: '158,000 DWT',
        nominalValue: 300_000_000,
        currentValue: 285_000_000,
        projectedValue: 312_000_000,
        euReadinessScore: 62,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Engine Room', assignedTo: 'marinepro',
            score: 74, status: 'partial', zone: 'engine',
            certifications: [
              cert('ihm-part-i', 'IHM Part I — Onboard Materials Survey', 'EU 1257/2013 Art. 12', 'high', 'missing',
                18000, 25000, [6, 8],
                'No certified IHM Part I survey has been conducted. A class-approved surveyor must inspect all hazardous materials onboard including asbestos, PCBs, TBT compounds, and radioactive substances. Current waste register lacks the required format per EU SRR Annex II.',
                ['IHM Part I Survey Report', 'Surveyor Accreditation Certificate', 'Material Declaration Forms']),
              cert('marpol-annex-vi', 'MARPOL Annex VI — Air Emissions', 'MARPOL Annex VI Reg. 14 & 18', 'high', 'partial',
                4500, 8000, [3, 5],
                'Fuel analysis certificates on file through 2025-Q3. NOx Technical File revision 2 needs update to revision 3 per MEPC.76(70). CII rating attained but documentation incomplete.',
                ['Fuel Analysis Certificates', 'NOx Technical File Rev. 3', 'Bunker Delivery Notes']),
              cert('ism-code', 'ISM Code — Safety Management', 'ISM Code Part A', 'high', 'compliant',
                2000, 3500, [2, 3],
                'Safety Management Certificate current. Document of Compliance valid through 2027.',
                ['Safety Management Certificate', 'DOC', 'Last Audit Report']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Fuel & Emissions', assignedTo: 'marinepro',
            score: 58, status: 'partial', zone: 'fuel',
            certifications: [
              cert('iopp', 'IOPP — Oil Pollution Prevention', 'MARPOL Annex I', 'critical', 'missing',
                15000, 22000, [5, 7],
                'IOPP renewal survey overdue. Certificate expired 2026-01. Inert gas system verification required.',
                ['IOPP Certificate', 'Inert Gas System Survey', 'Tank Cleaning Records']),
              cert('eu-ets', 'EU ETS — Emissions Trading Reporting', 'EU Regulation 2023/957', 'high', 'partial',
                6000, 12000, [4, 6],
                'EU ETS monitoring plan draft on file. Accredited verifier engagement pending. Emissions data for 2024 captured; 2025 partial.',
                ['Monitoring Plan', 'Verifier Accreditation', 'Emissions Data 2024-2025']),
              cert('cii-rating', 'CII — Carbon Intensity Indicator', 'MARPOL Annex VI Reg. 28', 'high', 'partial',
                3000, 5000, [2, 4],
                'CII attained: C. Required: C or better. On boundary — one poor voyage drops to D.',
                ['Annual Fuel Consumption Report', 'Distance Travelled Records']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Hull & Structure', assignedTo: 'nordiccert',
            score: 88, status: 'compliant', zone: 'hull',
            certifications: [
              cert('solas-xii', 'SOLAS XII — Structural Requirements', 'SOLAS Ch. XII Reg. 4', 'high', 'compliant',
                0, 0, [0, 0],
                'Double-hull structural integrity confirmed. Class society endorsement current.',
                ['Class Survey Report', 'Hull Thickness Measurements']),
              cert('afs', 'AFS — Anti-Fouling Systems', 'AFS Convention 2001', 'medium', 'compliant',
                0, 0, [0, 0],
                'Anti-fouling coating TBT-free certificate on file.',
                ['AFS Certificate', 'Coating Spec Sheet']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Ballast Water System', assignedTo: 'nordiccert',
            score: 92, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ballast-water', 'BWM Convention — D-2 Standard', 'BWM Convention Reg. D-2', 'high', 'compliant',
                0, 0, [0, 0],
                'Type-approved BWMS installed 2022. D-2 commissioning test passed.',
                ['BWMS Type Approval', 'Commissioning Test Record']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Bridge & Navigation', assignedTo: 'nordiccert',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('solas-v', 'SOLAS V — Navigation Safety', 'SOLAS Ch. V', 'high', 'compliant',
                0, 0, [0, 0],
                'ECDIS, AIS, VDR all current. Last survey 2025-09.',
                ['Navigation Equipment Survey', 'VDR APT Certificate']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Deck & Safety Systems', assignedTo: 'seagreen',
            score: 71, status: 'partial', zone: 'deck',
            certifications: [
              cert('lsa', 'LSA Code — Life Saving Appliances', 'SOLAS Ch. III / LSA Code', 'medium', 'partial',
                2500, 4500, [2, 3],
                'Lifeboat servicing overdue by 4 months. Davit load test required.',
                ['Lifeboat Service Record', 'Davit Load Test Certificate']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Accommodation & MLC', assignedTo: 'marinepro',
            score: 80, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('mlc', 'MLC 2006 — Maritime Labour', 'MLC 2006 Title 3', 'medium', 'compliant',
                0, 0, [0, 0],
                'MLC compliance certificate current. Last DMLC-II audit 2025-05.',
                ['MLC Certificate', 'DMLC Part II']),
              cert('mlc-title-4', 'MLC 2006 Title 4 — Health Protection, Medical Care, Welfare', 'MLC 2006 Title 4', 'high', 'missing',
                2000, 4000, [2, 3],
                'Mandatory shipboard medical stores inspection and stocking records are not on file. Hospital spaces and designated medical personnel qualifications require re-verification against Standard A4.1. Medical-care reporting procedures need alignment with IMO Resolution A.1079(28).',
                ['Medical Stores Inventory & Inspection Log', 'Shipboard Medical Care Certificate', 'Medical Personnel Qualifications']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Cargo Tanks', assignedTo: 'seagreen',
            score: 65, status: 'partial', zone: 'cargo',
            certifications: [
              cert('esp', 'Enhanced Survey Programme — Tank Condition', 'IACS UR Z10.1 / SOLAS XI-1', 'high', 'partial',
                8000, 14000, [3, 5],
                'ESP close-up survey of tank internals partially complete. Remaining tanks (3P, 4S) pending coating assessment and thickness measurements.',
                ['Tank Thickness Measurements', 'Coating Condition Report', 'Close-up Survey Photos']),
            ],
          },
        },
      },
      'marina-luna': {
        id: 'marina-luna',
        name: 'Marina Luna',
        imo: '9543210',
        type: 'Superyacht',
        flag: 'Cayman Islands',
        targetMarket: 'Monaco (EU)',
        yearBuilt: 2019,
        dwt: '1,850 GT',
        nominalValue: 180_000_000,
        currentValue: 172_000_000,
        projectedValue: 185_000_000,
        euReadinessScore: 81,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Engine Room', assignedTo: 'seagreen',
            score: 90, status: 'compliant', zone: 'engine',
            certifications: [
              cert('ml-ism', 'ISM Code — Safety Management', 'ISM Code Part A', 'high', 'compliant',
                0, 0, [0, 0], 'Safety Management Certificate current through 2027.',
                ['Safety Management Certificate', 'DOC']),
              cert('ml-marpol-vi', 'MARPOL Annex VI — Air Emissions', 'MARPOL Annex VI Reg. 14', 'high', 'compliant',
                0, 0, [0, 0], 'Sulphur-compliant fuel in use. NOx Tech File rev. 3 filed.',
                ['Fuel Analysis Certificates', 'NOx Technical File']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Fuel & Emissions', assignedTo: 'seagreen',
            score: 62, status: 'partial', zone: 'fuel',
            certifications: [
              cert('ml-eu-mrv', 'EU MRV — Monitoring, Reporting, Verification', 'EU Regulation 2015/757', 'critical', 'missing',
                5000, 9000, [3, 5],
                'EU MRV monitoring plan not yet verified for 2026 reporting year. Vessel calls Monaco from Q3; plan must be in place and verified before first EU port call.',
                ['MRV Monitoring Plan', 'Verifier Accreditation', 'Fuel Consumption Records']),
              cert('ml-cii', 'CII — Carbon Intensity Indicator', 'MARPOL Annex VI Reg. 28', 'high', 'partial',
                2500, 4500, [2, 3],
                'CII attained: C. Documentation of distance-travelled and fuel consumption records partial for 2025.',
                ['Annual Fuel Consumption Report', 'Distance Travelled Records']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Hull & Structure', assignedTo: 'seagreen',
            score: 92, status: 'compliant', zone: 'hull',
            certifications: [
              cert('ml-solas-ii', 'SOLAS II-1 — Construction & Stability', 'SOLAS Ch. II-1', 'high', 'compliant',
                0, 0, [0, 0], 'Hull integrity and stability booklet current.',
                ['Class Survey Report', 'Stability Booklet']),
              cert('ml-afs', 'AFS — Anti-Fouling Systems', 'AFS Convention 2001', 'medium', 'compliant',
                0, 0, [0, 0], 'TBT-free anti-fouling certificate on file.',
                ['AFS Certificate']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Ballast Water System', assignedTo: 'seagreen',
            score: 88, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ml-bwm', 'BWM Convention — D-2 Standard', 'BWM Convention Reg. D-2', 'high', 'compliant',
                0, 0, [0, 0], 'Type-approved BWMS installed 2021. Commissioning passed.',
                ['BWMS Type Approval', 'Commissioning Test Record']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Bridge & Navigation', assignedTo: 'seagreen',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('ml-solas-v', 'SOLAS V — Navigation Safety', 'SOLAS Ch. V', 'high', 'compliant',
                0, 0, [0, 0], 'ECDIS, AIS, and VDR surveys current.',
                ['Navigation Equipment Survey']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Deck & Safety Systems', assignedTo: 'seagreen',
            score: 75, status: 'partial', zone: 'deck',
            certifications: [
              cert('ml-lsa', 'LSA Code — Life Saving Appliances', 'SOLAS Ch. III / LSA Code', 'medium', 'partial',
                2000, 3500, [2, 3],
                'Tender-launch davit annual service due. Liferaft hydrostatic release units require replacement before next EU port call.',
                ['Davit Service Record', 'HRU Replacement Certificate']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Accommodation & MLC', assignedTo: 'seagreen',
            score: 82, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('ml-mlc', 'MLC 2006 — Maritime Labour', 'MLC 2006 Title 3', 'medium', 'compliant',
                0, 0, [0, 0], 'DMLC Part II current. Crew complement within limits.',
                ['MLC Certificate', 'DMLC Part II']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Cargo Tanks', assignedTo: 'seagreen',
            score: 74, status: 'partial', zone: 'cargo',
            certifications: [
              cert('ml-grey-black', 'Grey & Black Water Discharge', 'MARPOL Annex IV / MEPC.227(64)', 'medium', 'partial',
                1500, 3000, [1, 2],
                'Sewage treatment plant effluent testing overdue. Discharge records for 2025 incomplete.',
                ['Effluent Test Report', 'Discharge Log']),
            ],
          },
        },
      },
    },

    dnvQueue: [
      {
        id: 'sub-seed-1',
        vesselId: 'marina-luna', vesselName: 'Marina Luna',
        componentId: 'engine-room', componentName: 'Engine Room',
        certId: 'marpol-annex-vi', certName: 'MARPOL Annex VI — Air Emissions',
        submittedBy: 'SeaGreen Marine Services',
        submittedAt: '2026-04-19T10:14:00Z',
        docs: ['Fuel_Analysis_Cert_Q1_2026.pdf', 'NOx_Tech_File_Rev3.pdf'],
        aiNotes: 'Fuel samples comply with 0.5% S cap. NOx Technical File revision 3 current. CII attained: B. Recommend approval.',
        status: 'pending',
      },
    ],

    completedReviews: [
      {
        id: 'done-1', vesselName: 'Marina Luna',
        certId: 'ml-solas-v', certName: 'SOLAS Ch. V — Navigation Safety',
        submittedBy: 'NordicCert A/S', decidedAt: '2026-04-15T09:00:00Z', decision: 'approved',
        reviewerNotes: 'ECDIS, AIS and VDR records all in good order. Approved without observation.',
      },
    ],

    recentActivity: [
      { at: '2026-04-20T11:32:00Z', text: 'MarinePro uploaded MARPOL Annex VI fuel analysis.', persona: 'compliance' },
      { at: '2026-04-18T14:10:00Z', text: 'DNV approved ISM Code — Safety Management.', persona: 'dnv' },
      { at: '2026-04-16T08:45:00Z', text: 'AFS Anti-Fouling certificate verified.', persona: 'compliance' },
    ],

    compliantEntities: {
      'marinepro':  { name: 'MarinePro Engineering Ltd.', components: ['engine-room', 'fuel-emissions', 'accommodation'] },
      'nordiccert': { name: 'NordicCert A/S',             components: ['hull-structure', 'ballast-water', 'bridge-nav'] },
      'seagreen':   { name: 'SeaGreen Marine Services',   components: ['deck-safety', 'cargo-tanks'] },
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
        name: 'ESG & Environment',
        description: 'Hazardous-material inventories, ballast-water management, and circular-economy posture for EU port-state acceptance.',
        weight: 0.30,
        ratifiedAt: '2026-01-15',
        certIds: ['ihm-part-i', 'ballast-water', 'ml-bwm'],
      },
      {
        id: 'emissions',
        name: 'Emissions & Air Quality',
        description: 'MARPOL Annex VI air emissions, IOPP, EU ETS, MRV, and CII carbon-intensity discipline across the operating profile.',
        weight: 0.25,
        ratifiedAt: '2026-01-15',
        certIds: ['marpol-annex-vi', 'iopp', 'eu-ets', 'cii-rating',
                  'ml-marpol-vi', 'ml-eu-mrv', 'ml-cii', 'ml-grey-black'],
      },
      {
        id: 'safety',
        name: 'Safety Management & Navigation',
        description: 'ISM safety management, SOLAS V navigation safety, and LSA life-saving appliance readiness — operational integrity at sea.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['ism-code', 'solas-v', 'lsa', 'ml-ism', 'ml-solas-v', 'ml-lsa'],
      },
      {
        id: 'structural',
        name: 'Structural & Class',
        description: 'Hull construction, anti-fouling, and Enhanced Survey Programme integrity — class-society endorsements and structural health.',
        weight: 0.15,
        ratifiedAt: '2026-01-15',
        certIds: ['solas-xii', 'afs', 'esp', 'ml-solas-ii', 'ml-afs'],
      },
      {
        id: 'labor',
        name: 'Labor & Welfare',
        description: 'MLC 2006 seafarer welfare, accommodation standards, and onboard medical care — crew rights and human factors.',
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
    window.demoState = structuredClone(window.INITIAL_STATE);
    // Reset skips the door — drop straight into the SV shell.
    window.demoState.vaultStage = 'sv-shell';
    window.demoState.currentVaultId = null;
    if (window.render) window.render();
    window.toast && window.toast('Demo reset to initial state.');
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
