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
        suppliers: [
          { id: 'marinepro', name: 'MarinePro Engineering Ltd.', role: 'Engine Room · Fuel & Emissions · Accommodation', shareEquityPct: 8.5, greenSharesPct: 12, certCounts: { compliant: 3, pending: 1, missing: 1 }, valueContribution: 22_400_000, status: 'active', joinedAt: '2026-01-20' },
          { id: 'nordiccert', name: 'NordicCert A/S', role: 'Hull · Ballast Water · Bridge Nav', shareEquityPct: 6.2, greenSharesPct: 9, certCounts: { compliant: 4, pending: 0, missing: 0 }, valueContribution: 19_100_000, status: 'active', joinedAt: '2026-01-15' },
          { id: 'seagreen', name: 'SeaGreen Marine Services', role: 'Deck & Safety · Cargo Tanks', shareEquityPct: 4.0, greenSharesPct: 7, certCounts: { compliant: 0, pending: 1, missing: 1 }, valueContribution: 8_700_000, status: 'active', joinedAt: '2026-02-08' },
          { id: 'iso-acoustics', name: 'ISO Acoustics GmbH', role: 'Noise & vibration certification (pending onboarding)', shareEquityPct: 1.8, greenSharesPct: 3, certCounts: { compliant: 0, pending: 0, missing: 1 }, valueContribution: 0, status: 'pending', joinedAt: null },
        ],
      },
      'monaco-vault': {
        id: 'monaco-vault',
        name: 'Marina Luna Vault',
        clientName: 'Mediterranean Holdings · Marina Luna',
        description: 'Superyacht · IMO 9543210',
        assetIds: ['marina-luna'],
        status: 'active',
        createdAt: '2026-03-04',
        suppliers: [
          { id: 'seagreen', name: 'SeaGreen Marine Services', role: 'All components (full delivery)', shareEquityPct: 14.0, greenSharesPct: 18, certCounts: { compliant: 7, pending: 0, missing: 1 }, valueContribution: 26_300_000, status: 'active', joinedAt: '2026-02-22' },
          { id: 'monaco-tech', name: 'Monaco Yachting Tech', role: 'Bridge & Navigation upgrades', shareEquityPct: 2.0, greenSharesPct: 4, certCounts: { compliant: 1, pending: 0, missing: 0 }, valueContribution: 4_100_000, status: 'active', joinedAt: '2026-03-10' },
        ],
      },
      'equinor-vault': {
        id: 'equinor-vault',
        name: 'Equinor Platform Vault',
        clientName: 'Equinor (placeholder)',
        description: 'Offshore platform digital twin · onboarding',
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
        type: 'Kommunal barnehage · 4 avdelinger',
        flag: 'Stavanger',
        targetMarket: 'Grønt Flagg-sertifisering',
        yearBuilt: 2014,
        dwt: '82 barn · 22 ansatte',
        nominalValue: 300_000_000,
        currentValue: 285_000_000,
        projectedValue: 312_000_000,
        euReadinessScore: 62,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Kjøkken og mat', assignedTo: 'marinepro',
            score: 74, status: 'partial', zone: 'engine',
            certifications: [
              cert('ihm-part-i', 'Kildesortering og avfallsreduksjon', 'Grønt Flagg – Avfall', 'high', 'missing',
                18000, 25000, [6, 8],
                'Kildesortering er delvis etablert. Matavfall komposteres ikke systematisk, og avfallsregnskap mangler dokumentasjon for inneværende år.',
                ['Avfallsplan', 'Kildesorteringsrutine', 'Avfallsregnskap 2026']),
              cert('marpol-annex-vi', 'Økologisk og kortreist mat', 'Grønt Flagg – Mat og helse', 'high', 'partial',
                4500, 8000, [3, 5],
                'Innkjøpsrutine for økologiske råvarer finnes, men andel kortreist mat er ikke dokumentert. Menyplan for våren 2026 mangler klimavurdering.',
                ['Innkjøpsrutine mat', 'Menyplan med klimavurdering', 'Leverandøroversikt']),
              cert('ism-code', 'Internkontroll kjøkken (IK-Mat)', 'Forskrift om næringsmiddelhygiene / IK-Mat', 'high', 'compliant',
                2000, 3500, [2, 3],
                'IK-Mat-system er etablert og revidert. Siste tilsyn fra Mattilsynet uten avvik.',
                ['IK-Mat-håndbok', 'Tilsynsrapport Mattilsynet', 'Temperaturlogg kjøl og frys']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Energi og oppvarming', assignedTo: 'marinepro',
            score: 58, status: 'partial', zone: 'fuel',
            certifications: [
              cert('iopp', 'Energikartlegging', 'Grønt Flagg – Energi', 'critical', 'missing',
                15000, 22000, [5, 7],
                'Energikartlegging er ikke gjennomført. Oppvarmingskilder og forbruksdata for 2025 mangler dokumentasjon.',
                ['Energikartleggingsrapport', 'Forbruksoversikt strøm og varme', 'Tiltaksplan energi']),
              cert('eu-ets', 'Energiregnskap og måleravlesning', 'Miljøfyrtårn kriterium – Energi', 'high', 'partial',
                6000, 12000, [4, 6],
                'Måleravlesning registreres månedlig, men energiregnskapet for 2025 er ufullstendig. Sammenligning mot referanseår mangler.',
                ['Energiregnskap 2025', 'Måleravlesningslogg', 'Referanseårsberegning']),
              cert('cii-rating', 'Enøk-tiltak og temperaturstyring', 'Grønt Flagg – Energi', 'high', 'partial',
                3000, 5000, [2, 4],
                'Nattsenking av temperatur er innført i to av fire avdelinger. Effekten er ennå ikke målt og dokumentert.',
                ['Enøk-tiltaksliste', 'Temperaturstyringsplan']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Bygg og uteområde', assignedTo: 'nordiccert',
            score: 88, status: 'compliant', zone: 'hull',
            certifications: [
              cert('solas-xii', 'Vedlikeholdsplan for bygg', 'Forskrift om miljørettet helsevern i barnehager og skoler §9', 'high', 'compliant',
                0, 0, [0, 0],
                'Vedlikeholdsplanen for bygget er oppdatert og fulgt. Ingen avvik ved siste vernerunde.',
                ['Vedlikeholdsplan', 'Vernerunderapport']),
              cert('afs', 'Giftfritt uteområde', 'Grønt Flagg – Naturmangfold', 'medium', 'compliant',
                0, 0, [0, 0],
                'Uteområdet er kartlagt. Trykkimpregnert virke og gummigranulat er fjernet fra lekearealene.',
                ['Kartleggingsrapport uteområde', 'Innkjøpsrutine lekeapparater']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Vann og sanitær', assignedTo: 'nordiccert',
            score: 92, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ballast-water', 'Vannbesparende tiltak', 'Grønt Flagg – Vann', 'high', 'compliant',
                0, 0, [0, 0],
                'Vannbesparende armaturer installert 2022. Forbruket overvåkes månedlig og er innenfor mål.',
                ['Installasjonsdokumentasjon', 'Vannforbrukslogg']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Læring og pedagogikk', assignedTo: 'nordiccert',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('solas-v', 'Bærekraft i årsplanen', 'Rammeplan for barnehagen – Bærekraftig utvikling', 'high', 'compliant',
                0, 0, [0, 0],
                'Bærekraftig utvikling er integrert i årsplanen. Miljøråd med barna etablert høsten 2025.',
                ['Årsplan 2025–2026', 'Referat fra miljøråd']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Sikkerhet og HMS', assignedTo: 'seagreen',
            score: 71, status: 'partial', zone: 'deck',
            certifications: [
              cert('lsa', 'Brannvern og evakueringsøvelser', 'Forskrift om brannforebygging', 'medium', 'partial',
                2500, 4500, [2, 3],
                'Evakueringsøvelse for våren er forsinket med 4 måneder. Årskontroll av slokkeutstyr må dokumenteres.',
                ['Øvelseslogg evakuering', 'Kontrollrapport slokkeutstyr']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Renhold og hygiene', assignedTo: 'marinepro',
            score: 80, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('mlc', 'Renholdsplan og miljømerkede produkter', 'Forskrift om miljørettet helsevern i barnehager og skoler §13', 'medium', 'compliant',
                0, 0, [0, 0],
                'Renholdsplanen følges. Miljømerkede renholdsprodukter innført i alle avdelinger, siste revisjon mai 2025.',
                ['Renholdsplan', 'Produktoversikt med miljømerking']),
              cert('mlc-title-4', 'Smittevern og hygienerutiner', 'Forskrift om miljørettet helsevern i barnehager og skoler §17', 'high', 'missing',
                2000, 4000, [2, 3],
                'Skriftlige smittevernrutiner mangler for stellerom og kjøkken. Håndhygieneopplæring for nyansatte er ikke dokumentert, og rutinene må oppdateres i tråd med kommunens veileder.',
                ['Smittevernrutine', 'Opplæringslogg håndhygiene', 'Sjekkliste stellerom']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Avfall og gjenvinning', assignedTo: 'seagreen',
            score: 65, status: 'partial', zone: 'cargo',
            certifications: [
              cert('esp', 'Avfallskartlegging og gjenvinningsgrad', 'Grønt Flagg – Avfall', 'high', 'partial',
                8000, 14000, [3, 5],
                'Avfallskartleggingen er delvis gjennomført. To avdelinger mangler veiing av restavfall, og gjenvinningsgrad kan ikke beregnes for 2026.',
                ['Avfallskartlegging', 'Veielogg restavfall', 'Gjenvinningsrapport']),
            ],
          },
        },
      },
      'marina-luna': {
        id: 'marina-luna',
        name: 'Regnbuen Barnehage',
        imo: '912 305 447',
        type: 'Privat barnehage · 3 avdelinger',
        flag: 'Sandnes',
        targetMarket: 'Grønt Flagg-sertifisering',
        yearBuilt: 2019,
        dwt: '58 barn · 15 ansatte',
        nominalValue: 180_000_000,
        currentValue: 172_000_000,
        projectedValue: 185_000_000,
        euReadinessScore: 81,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Kjøkken og mat', assignedTo: 'seagreen',
            score: 90, status: 'compliant', zone: 'engine',
            certifications: [
              cert('ml-ism', 'Internkontroll kjøkken (IK-Mat)', 'Forskrift om næringsmiddelhygiene / IK-Mat', 'high', 'compliant',
                0, 0, [0, 0], 'IK-Mat-system etablert. Siste tilsyn fra Mattilsynet uten avvik.',
                ['IK-Mat-håndbok', 'Tilsynsrapport Mattilsynet']),
              cert('ml-marpol-vi', 'Kildesortering av matavfall', 'Grønt Flagg – Avfall', 'high', 'compliant',
                0, 0, [0, 0], 'Matavfall komposteres. Avfallsregnskap ført løpende siden 2024.',
                ['Kompostrutine', 'Avfallsregnskap']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Energi og oppvarming', assignedTo: 'seagreen',
            score: 62, status: 'partial', zone: 'fuel',
            certifications: [
              cert('ml-eu-mrv', 'Energikartlegging', 'Grønt Flagg – Energi', 'critical', 'missing',
                5000, 9000, [3, 5],
                'Energikartlegging for 2026 er ikke gjennomført. Barnehagen søker Grønt Flagg-fornyelse fra tredje kvartal; kartleggingen må være verifisert før søknaden sendes.',
                ['Energikartleggingsrapport', 'Forbruksoversikt strøm og varme', 'Tiltaksplan energi']),
              cert('ml-cii', 'Energiregnskap og måleravlesning', 'Miljøfyrtårn kriterium – Energi', 'high', 'partial',
                2500, 4500, [2, 3],
                'Måleravlesning registreres, men energiregnskapet for 2025 er ufullstendig.',
                ['Energiregnskap 2025', 'Måleravlesningslogg']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Bygg og uteområde', assignedTo: 'seagreen',
            score: 92, status: 'compliant', zone: 'hull',
            certifications: [
              cert('ml-solas-ii', 'Vedlikeholdsplan for bygg', 'Forskrift om miljørettet helsevern i barnehager og skoler §9', 'high', 'compliant',
                0, 0, [0, 0], 'Vedlikeholdsplanen er oppdatert. Ingen avvik ved siste vernerunde.',
                ['Vedlikeholdsplan', 'Vernerunderapport']),
              cert('ml-afs', 'Giftfritt uteområde', 'Grønt Flagg – Naturmangfold', 'medium', 'compliant',
                0, 0, [0, 0], 'Uteområdet er kartlagt og giftfrie materialer dokumentert.',
                ['Kartleggingsrapport uteområde']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Vann og sanitær', assignedTo: 'seagreen',
            score: 88, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('ml-bwm', 'Vannbesparende tiltak', 'Grønt Flagg – Vann', 'high', 'compliant',
                0, 0, [0, 0], 'Vannbesparende armaturer installert 2021. Forbruket overvåkes månedlig.',
                ['Installasjonsdokumentasjon', 'Vannforbrukslogg']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Læring og pedagogikk', assignedTo: 'seagreen',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('ml-solas-v', 'Bærekraft i årsplanen', 'Rammeplan for barnehagen – Bærekraftig utvikling', 'high', 'compliant',
                0, 0, [0, 0], 'Bærekraftig utvikling er integrert i årsplanen. Miljøråd aktivt.',
                ['Årsplan 2025–2026']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Sikkerhet og HMS', assignedTo: 'seagreen',
            score: 75, status: 'partial', zone: 'deck',
            certifications: [
              cert('ml-lsa', 'Brannvern og evakueringsøvelser', 'Forskrift om brannforebygging', 'medium', 'partial',
                2000, 3500, [2, 3],
                'Årskontroll av slokkeutstyr forfaller. Evakueringsøvelse for våren må gjennomføres før fornyelse av Grønt Flagg.',
                ['Øvelseslogg evakuering', 'Kontrollrapport slokkeutstyr']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Renhold og hygiene', assignedTo: 'seagreen',
            score: 82, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('ml-mlc', 'Renholdsplan og miljømerkede produkter', 'Forskrift om miljørettet helsevern i barnehager og skoler §13', 'medium', 'compliant',
                0, 0, [0, 0], 'Renholdsplanen følges. Miljømerkede produkter i alle avdelinger.',
                ['Renholdsplan', 'Produktoversikt med miljømerking']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Avfall og gjenvinning', assignedTo: 'seagreen',
            score: 74, status: 'partial', zone: 'cargo',
            certifications: [
              cert('ml-grey-black', 'Avfallskartlegging og gjenvinningsgrad', 'Grønt Flagg – Avfall', 'medium', 'partial',
                1500, 3000, [1, 2],
                'Veiing av restavfall er forfalt. Gjenvinningsrapporten for 2025 er ufullstendig.',
                ['Veielogg restavfall', 'Gjenvinningsrapport']),
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
