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
        description: 'School · Municipal kindergarten — ISO 27001, GDPR, ESG',
        assetIds: ['delhi-star'],
        status: 'active',
        createdAt: '2026-02-12',
        suppliers: [
          { id: 'marinepro', name: 'Cortex Assurance AS', role: 'Information Security Governance · Data Protection & Privacy · Physical & Environmental Security', shareEquityPct: 8.5, greenSharesPct: 12, certCounts: { compliant: 3, pending: 1, missing: 1 }, valueContribution: 22_400_000, status: 'active', joinedAt: '2026-01-20' },
          { id: 'nordiccert', name: 'NordSecure Advisory AS', role: 'Access Control & Identity · Incident Response & Reporting · Supplier & Third-Party Risk', shareEquityPct: 6.2, greenSharesPct: 9, certCounts: { compliant: 4, pending: 0, missing: 0 }, valueContribution: 19_100_000, status: 'active', joinedAt: '2026-01-15' },
          { id: 'seagreen', name: 'Verda Sustainability Partners', role: 'Business Continuity & Resilience · Environmental & Social (ESG)', shareEquityPct: 4.0, greenSharesPct: 7, certCounts: { compliant: 0, pending: 1, missing: 1 }, valueContribution: 8_700_000, status: 'active', joinedAt: '2026-02-08' },
          { id: 'iso-acoustics', name: 'Helix Privacy Consult AS', role: 'Data protection impact assessment (onboarding pending)', shareEquityPct: 1.8, greenSharesPct: 3, certCounts: { compliant: 0, pending: 0, missing: 1 }, valueContribution: 0, status: 'pending', joinedAt: null },
        ],
      },
      'monaco-vault': {
        id: 'monaco-vault',
        name: 'Regnbuen Barnehage',
        clientName: 'Regnbuen Drift AS',
        description: 'School · Private kindergarten — ISO 27001, GDPR, ESG',
        assetIds: ['marina-luna'],
        status: 'active',
        createdAt: '2026-03-04',
        suppliers: [
          { id: 'seagreen', name: 'Verda Sustainability Partners', role: 'All domains (full delivery)', shareEquityPct: 14.0, greenSharesPct: 18, certCounts: { compliant: 7, pending: 0, missing: 1 }, valueContribution: 26_300_000, status: 'active', joinedAt: '2026-02-22' },
          { id: 'monaco-tech', name: 'LexAudit Nordic AS', role: 'Supplier & Third-Party Risk – contract review', shareEquityPct: 2.0, greenSharesPct: 4, certCounts: { compliant: 1, pending: 0, missing: 0 }, valueContribution: 4_100_000, status: 'active', joinedAt: '2026-03-10' },
        ],
      },
      'equinor-vault': {
        id: 'equinor-vault',
        name: 'New Entity (onboarding)',
        clientName: 'Rogaland (placeholder)',
        description: 'Onboarding — entity pending assignment',
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
        targetMarket: 'Multi-standard compliance',
        yearBuilt: 2014,
        dwt: '82 children · 22 staff',
        nominalValue: 300_000_000,
        currentValue: 285_000_000,
        projectedValue: 312_000_000,
        euReadinessScore: 62,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Information Security Governance', assignedTo: 'marinepro',
            score: 74, status: 'partial', zone: 'engine',
            certifications: [
              cert('sol-iso27001-a5-policy', 'Information Security Policy Set', 'ISO/IEC 27001:2022 A.5.1', 'high', 'missing',
                18000, 25000, [6, 8],
                'No approved information security policy set exists. A documented policy must be approved by management, communicated to all staff, and reviewed at planned intervals. The current IT guideline is a two-page municipal handout with no review date and no management sign-off.',
                ['Information Security Policy', 'Management Approval Record', 'Staff Acknowledgement Log']),
              cert('sol-iso27001-a5-roles', 'Security Roles & Responsibilities', 'ISO/IEC 27001:2022 A.5.2–A.5.4', 'high', 'partial',
                4500, 8000, [3, 5],
                'A data protection contact has been nominated, but information security roles are not formally allocated. Segregation of duties for the parent-portal administrator account is undocumented, and no deputy is named for absence periods.',
                ['Roles & Responsibilities Matrix', 'Segregation of Duties Statement', 'Deputy Nomination Record']),
              cert('sol-iso27001-cl9-review', 'Internal Audit & Management Review', 'ISO/IEC 27001:2022 Cl. 9.2–9.3', 'high', 'compliant',
                2000, 3500, [2, 3],
                'The annual internal audit was completed and the management review held in February 2026. Both closed with no major nonconformities.',
                ['Internal Audit Report 2026', 'Management Review Minutes', 'Nonconformity Register']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Data Protection & Privacy', assignedTo: 'marinepro',
            score: 58, status: 'partial', zone: 'fuel',
            certifications: [
              cert('sol-gdpr-art30-ropa', 'Records of Processing Activities', 'GDPR Art. 30', 'critical', 'missing',
                15000, 22000, [5, 7],
                'No record of processing activities is maintained. A register is required covering every processing purpose, including children\'s photographs, health and allergy data, and attendance records. Retention periods and recipients are entirely undocumented.',
                ['Records of Processing Activities', 'Retention Schedule', 'Recipient & Transfer Register']),
              cert('sol-gdpr-art35-dpia', 'Data Protection Impact Assessment', 'GDPR Art. 35', 'high', 'partial',
                6000, 12000, [4, 6],
                'A DPIA was started for the parent communication app but not completed. The assessment of risks to children as vulnerable data subjects is missing, and the Data Protection Officer has not signed off.',
                ['DPIA Report', 'Risk Assessment Matrix', 'DPO Opinion']),
              cert('sol-gdpr-art13-transparency', 'Privacy Notices & Consent Records', 'GDPR Art. 12–14', 'high', 'partial',
                3000, 5000, [2, 4],
                'Privacy notices are issued to guardians at enrolment in two of four departments. Photograph consent is collected on paper and cannot be withdrawn through a documented process.',
                ['Privacy Notice for Guardians', 'Consent Register', 'Withdrawal Procedure']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Access Control & Identity', assignedTo: 'nordiccert',
            score: 88, status: 'compliant', zone: 'hull',
            certifications: [
              cert('sol-iso27001-a8-access', 'Access Control & Privileged Accounts', 'ISO/IEC 27001:2022 A.8.2–A.8.4', 'high', 'compliant',
                0, 0, [0, 0],
                'Role-based access is enforced across the parent portal and staff systems. Privileged accounts are reviewed quarterly and the last review found no orphaned accounts.',
                ['Access Control Matrix', 'Privileged Account Review Q1 2026']),
              cert('sol-iso27001-a8-05-mfa', 'Multi-Factor Authentication Coverage', 'ISO/IEC 27001:2022 A.8.5', 'medium', 'compliant',
                0, 0, [0, 0],
                'Multi-factor authentication is enabled for all staff accounts and administrative access. Legacy shared logins were decommissioned in 2024.',
                ['MFA Enrolment Report', 'Shared Account Decommissioning Record']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Incident Response & Reporting', assignedTo: 'nordiccert',
            score: 92, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('sol-nis2-art23-incident', 'Incident Detection & 24-Hour Notification', 'NIS2 Art. 23', 'high', 'compliant',
                0, 0, [0, 0],
                'An incident response plan is in place with the 24-hour early-warning and 72-hour notification path to the national CSIRT documented. The last tabletop exercise was held in November 2025.',
                ['Incident Response Plan', 'Notification Escalation Path', 'Tabletop Exercise Report']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Supplier & Third-Party Risk', assignedTo: 'nordiccert',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('sol-iso27001-a5-19-supplier', 'Supplier Security & Processor Agreements', 'ISO/IEC 27001:2022 A.5.19–A.5.22 · GDPR Art. 28', 'high', 'compliant',
                0, 0, [0, 0],
                'Data processing agreements are signed with all four active suppliers. Supplier security requirements are included in contract annexes and reviewed at renewal.',
                ['Supplier Register', 'Data Processing Agreements', 'Contract Security Annex']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Business Continuity & Resilience', assignedTo: 'seagreen',
            score: 71, status: 'partial', zone: 'deck',
            certifications: [
              cert('sol-iso27001-a5-29-continuity', 'Continuity Plan & Restore Testing', 'ISO/IEC 27001:2022 A.5.29–A.5.30 · NIS2 Art. 21(2)(c)', 'medium', 'partial',
                2500, 4500, [2, 3],
                'A continuity plan exists but the backup restore test is four months overdue. Recovery time objectives are stated for the attendance system only, not for the parent portal.',
                ['Business Continuity Plan', 'Backup Restore Test Report', 'RTO/RPO Register']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Physical & Environmental Security', assignedTo: 'marinepro',
            score: 80, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('sol-iso27001-a7-physical', 'Physical Security & Visitor Control', 'ISO/IEC 27001:2022 A.7.1–A.7.4', 'medium', 'compliant',
                0, 0, [0, 0],
                'Entrance access is controlled by keypad and the visitor log is maintained at reception. Server and archive rooms are locked, last reviewed May 2025.',
                ['Physical Security Assessment', 'Visitor Log Procedure']),
              cert('sol-iso27001-a7-10-media', 'Media Handling & Secure Disposal', 'ISO/IEC 27001:2022 A.7.10 · A.7.14', 'high', 'missing',
                2000, 4000, [2, 3],
                'Written procedures for handling and disposing of storage media are missing. Retired tablets from two departments were passed on without a documented wipe, and no certificate of destruction exists for the 2025 paper archive purge.',
                ['Media Handling Procedure', 'Secure Disposal Log', 'Certificate of Destruction']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Environmental & Social (ESG)', assignedTo: 'seagreen',
            score: 65, status: 'partial', zone: 'cargo',
            certifications: [
              cert('sol-esg-e5-waste', 'Waste & Resource-Use Reporting', 'ESRS E5 · Green Flag – Waste', 'high', 'partial',
                8000, 14000, [3, 5],
                'Waste and resource-use data is partially collected. Two departments lack residual-waste weighing, so the recycling rate required for ESRS E5 and the Green Flag renewal cannot be calculated for 2026.',
                ['Waste & Resource Report', 'Residual Waste Weighing Log', 'Green Flag Waste Annex']),
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
        targetMarket: 'Multi-standard compliance',
        yearBuilt: 2019,
        dwt: '58 children · 15 staff',
        nominalValue: 180_000_000,
        currentValue: 172_000_000,
        projectedValue: 185_000_000,
        euReadinessScore: 81,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Information Security Governance', assignedTo: 'seagreen',
            score: 90, status: 'compliant', zone: 'engine',
            certifications: [
              cert('rb-iso27001-cl9-review', 'Internal Audit & Management Review', 'ISO/IEC 27001:2022 Cl. 9.2–9.3', 'high', 'compliant',
                0, 0, [0, 0], 'The internal audit and management review for 2026 are complete. Both closed without nonconformities.',
                ['Internal Audit Report 2026', 'Management Review Minutes']),
              cert('rb-iso27001-a5-policy', 'Information Security Policy Set', 'ISO/IEC 27001:2022 A.5.1', 'high', 'compliant',
                0, 0, [0, 0], 'The information security policy set was approved by the board in January 2025 and has been reviewed annually since.',
                ['Information Security Policy', 'Board Approval Record']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Data Protection & Privacy', assignedTo: 'seagreen',
            score: 62, status: 'partial', zone: 'fuel',
            certifications: [
              cert('rb-gdpr-art30-ropa', 'Records of Processing Activities', 'GDPR Art. 30', 'critical', 'missing',
                5000, 9000, [3, 5],
                'The record of processing activities has not been updated since the new parent communication app was introduced. The kindergarten applies for certification renewal from Q3; the register must be verified before the application is submitted.',
                ['Records of Processing Activities', 'Retention Schedule', 'Recipient & Transfer Register']),
              cert('rb-gdpr-art13-transparency', 'Privacy Notices & Consent Records', 'GDPR Art. 12–14', 'high', 'partial',
                2500, 4500, [2, 3],
                'Privacy notices are issued at enrolment, but the 2025 consent register is incomplete for photograph processing.',
                ['Privacy Notice for Guardians', 'Consent Register']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Access Control & Identity', assignedTo: 'seagreen',
            score: 92, status: 'compliant', zone: 'hull',
            certifications: [
              cert('rb-iso27001-a8-access', 'Access Control & Privileged Accounts', 'ISO/IEC 27001:2022 A.8.2–A.8.4', 'high', 'compliant',
                0, 0, [0, 0], 'Role-based access is enforced and privileged accounts are reviewed quarterly. No orphaned accounts at the latest review.',
                ['Access Control Matrix', 'Privileged Account Review']),
              cert('rb-iso27001-a8-05-mfa', 'Multi-Factor Authentication Coverage', 'ISO/IEC 27001:2022 A.8.5', 'medium', 'compliant',
                0, 0, [0, 0], 'Multi-factor authentication is enforced on all staff and administrative accounts.',
                ['MFA Enrolment Report']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Incident Response & Reporting', assignedTo: 'seagreen',
            score: 88, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('rb-nis2-art23-incident', 'Incident Detection & 24-Hour Notification', 'NIS2 Art. 23', 'high', 'compliant',
                0, 0, [0, 0], 'The incident response plan documents the 24-hour early-warning path. Last exercised December 2025.',
                ['Incident Response Plan', 'Tabletop Exercise Report']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Supplier & Third-Party Risk', assignedTo: 'seagreen',
            score: 85, status: 'compliant', zone: 'bridge',
            certifications: [
              cert('rb-iso27001-a5-19-supplier', 'Supplier Security & Processor Agreements', 'ISO/IEC 27001:2022 A.5.19–A.5.22 · GDPR Art. 28', 'high', 'compliant',
                0, 0, [0, 0], 'Data processing agreements are signed with both active suppliers and reviewed at renewal.',
                ['Supplier Register', 'Data Processing Agreements']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Business Continuity & Resilience', assignedTo: 'seagreen',
            score: 75, status: 'partial', zone: 'deck',
            certifications: [
              cert('rb-iso27001-a5-29-continuity', 'Continuity Plan & Restore Testing', 'ISO/IEC 27001:2022 A.5.29–A.5.30', 'medium', 'partial',
                2000, 3500, [2, 3],
                'The annual backup restore test is due. Recovery time objectives must be documented before the certification renewal.',
                ['Business Continuity Plan', 'Backup Restore Test Report']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Physical & Environmental Security', assignedTo: 'seagreen',
            score: 82, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('rb-iso27001-a7-physical', 'Physical Security & Visitor Control', 'ISO/IEC 27001:2022 A.7.1–A.7.4', 'medium', 'compliant',
                0, 0, [0, 0], 'Entrance access is controlled and the visitor log is maintained. Archive room secured in all departments.',
                ['Physical Security Assessment', 'Visitor Log Procedure']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Environmental & Social (ESG)', assignedTo: 'seagreen',
            score: 74, status: 'partial', zone: 'cargo',
            certifications: [
              cert('rb-esg-e5-waste', 'Waste & Resource-Use Reporting', 'ESRS E5 · Green Flag – Waste', 'medium', 'partial',
                1500, 3000, [1, 2],
                'Residual-waste weighing is overdue. The 2025 resource-use report is incomplete.',
                ['Residual Waste Weighing Log', 'Waste & Resource Report']),
            ],
          },
        },
      },
    },

    dnvQueue: [
      {
        id: 'sub-seed-1',
        vesselId: 'marina-luna', vesselName: 'Regnbuen Barnehage',
        componentId: 'fuel-emissions', componentName: 'Data Protection & Privacy',
        certId: 'rb-gdpr-art13-transparency', certName: 'Privacy Notices & Consent Records',
        submittedBy: 'Verda Sustainability Partners',
        submittedAt: '2026-04-19T10:14:00Z',
        docs: ['Privacy_Notice_Guardians_2026.pdf', 'Consent_Register_Q1_2026.pdf'],
        aiNotes: 'Privacy notices verified against the GDPR Art. 13 disclosure requirements. Consent register covers 54 of 58 enrolled children; four records lack a withdrawal timestamp. Recommend approval with observation.',
        status: 'pending',
      },
    ],

    completedReviews: [
      {
        id: 'done-1', vesselName: 'Regnbuen Barnehage',
        certId: 'rb-iso27001-a5-19-supplier', certName: 'Supplier Security & Processor Agreements',
        submittedBy: 'LexAudit Nordic AS', decidedAt: '2026-04-15T09:00:00Z', decision: 'approved',
        reviewerNotes: 'Supplier register and both data processing agreements in good order. Contract security annex matches the A.5.19 requirement set. Approved without observation.',
      },
    ],

    recentActivity: [
      { at: '2026-04-20T11:32:00Z', text: 'Cortex Assurance AS uploaded the completed data protection impact assessment.', persona: 'compliance' },
      { at: '2026-04-18T14:10:00Z', text: 'Supervisory authority approved Internal Audit & Management Review.', persona: 'dnv' },
      { at: '2026-04-16T08:45:00Z', text: 'Access control matrix and privileged account review verified.', persona: 'compliance' },
    ],

    compliantEntities: {
      'marinepro':  { name: 'Cortex Assurance AS',           components: ['engine-room', 'fuel-emissions', 'accommodation'] },
      'nordiccert': { name: 'NordSecure Advisory AS',        components: ['hull-structure', 'ballast-water', 'bridge-nav'] },
      'seagreen':   { name: 'Verda Sustainability Partners', components: ['deck-safety', 'cargo-tanks'] },
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

    // Four-standard Scientific Committee framework. Weights sum to 1.0.
    // Every cert id in INITIAL_STATE maps to exactly one standard.
    criteriaFramework: [
      {
        id: 'iso27001',
        name: 'ISO/IEC 27001 — Information Security',
        description: 'Management system controls: policy, roles, access, continuity, physical and supplier security.',
        weight: 0.30,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-iso27001-a5-policy', 'sol-iso27001-a5-roles', 'sol-iso27001-cl9-review',
                  'sol-iso27001-a8-access', 'sol-iso27001-a8-05-mfa', 'sol-iso27001-a5-19-supplier',
                  'sol-iso27001-a5-29-continuity', 'sol-iso27001-a7-physical', 'sol-iso27001-a7-10-media',
                  'rb-iso27001-cl9-review', 'rb-iso27001-a5-policy', 'rb-iso27001-a8-access',
                  'rb-iso27001-a8-05-mfa', 'rb-iso27001-a5-19-supplier', 'rb-iso27001-a5-29-continuity',
                  'rb-iso27001-a7-physical'],
      },
      {
        id: 'gdpr',
        name: 'GDPR — Data Protection',
        description: 'Lawful processing, records, impact assessments, transparency and data-subject rights.',
        weight: 0.30,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-gdpr-art30-ropa', 'sol-gdpr-art35-dpia', 'sol-gdpr-art13-transparency',
                  'rb-gdpr-art30-ropa', 'rb-gdpr-art13-transparency'],
      },
      {
        id: 'nis2',
        name: 'NIS2 — Cyber Resilience',
        description: 'Risk management, incident detection, and the 24-hour reporting obligation to the national CSIRT.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-nis2-art23-incident', 'rb-nis2-art23-incident'],
      },
      {
        id: 'esg',
        name: 'ESG — Environmental & Social',
        description: 'Resource use, waste, and social reporting under ESRS and local schemes such as Green Flag.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-esg-e5-waste', 'rb-esg-e5-waste'],
      },
    ],
  };

  // ----- Per-cert decay defaults (renewal-cycle months + last-validated date) -----
  // Three Solstråle certs are tuned to expire within ~90 days of 2026-04-29 so the
  // decay projection has live at-risk items to surface. Others are fresh.
  const DECAY_BY_ID = {
    // ----- Solstråle Barnehage -----
    // Annual cycle (~12mo)
    'sol-iso27001-a5-policy':       { decay: 12, validated: '2025-01-01' },
    'sol-iso27001-a5-roles':        { decay: 12, validated: '2025-09-01' },
    'sol-iso27001-cl9-review':      { decay: 12, validated: '2025-06-15' }, // at-risk: expires 2026-06-15
    'sol-gdpr-art30-ropa':          { decay: 12, validated: '2025-12-01' },
    'sol-gdpr-art13-transparency':  { decay: 12, validated: '2025-12-20' },
    'sol-iso27001-a8-access':       { decay: 12, validated: '2026-01-15' },
    'sol-nis2-art23-incident':      { decay: 12, validated: '2025-11-15' },
    'sol-iso27001-a5-29-continuity':{ decay: 12, validated: '2025-08-01' },
    'sol-esg-e5-waste':             { decay: 12, validated: '2025-08-01' },
    // Bi-annual assessment cycle (~24mo)
    'sol-gdpr-art35-dpia':          { decay: 24, validated: '2025-11-15' },
    'sol-iso27001-a8-05-mfa':       { decay: 24, validated: '2024-06-15' }, // at-risk: expires 2026-06-15
    'sol-iso27001-a7-physical':     { decay: 24, validated: '2024-07-15' }, // at-risk: expires 2026-07-15
    'sol-iso27001-a7-10-media':     { decay: 24, validated: '2025-01-01' },
    'sol-iso27001-a5-19-supplier':  { decay: 24, validated: '2025-06-01' },

    // ----- Regnbuen Barnehage (all fresh) -----
    'rb-iso27001-cl9-review':       { decay: 12, validated: '2026-02-01' },
    'rb-iso27001-a5-policy':        { decay: 12, validated: '2026-01-15' },
    'rb-gdpr-art30-ropa':           { decay: 12, validated: '2025-10-01' },
    'rb-gdpr-art13-transparency':   { decay: 12, validated: '2025-11-01' },
    'rb-iso27001-a8-access':        { decay: 12, validated: '2026-01-10' },
    'rb-nis2-art23-incident':       { decay: 12, validated: '2025-12-01' },
    'rb-iso27001-a5-29-continuity': { decay: 12, validated: '2025-08-01' },
    'rb-esg-e5-waste':              { decay: 12, validated: '2025-08-01' },
    'rb-iso27001-a8-05-mfa':        { decay: 24, validated: '2025-03-01' },
    'rb-iso27001-a5-19-supplier':   { decay: 24, validated: '2025-06-01' },
    'rb-iso27001-a7-physical':      { decay: 24, validated: '2025-04-01' },
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
