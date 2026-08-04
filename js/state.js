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

    // Overview map filters (Authority persona). Reset restores these defaults.
    overviewFilters: { region: 'all', entityType: 'all' },

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
      'sanrocco-vault': {
        id: 'sanrocco-vault',
        name: 'Ospedale San Rocco',
        clientName: 'ASST Bergamo Est',
        description: 'Hospital · Regional health authority — NIS2, GDPR, ISO 27001',
        assetIds: ['osp-san-rocco'],
        status: 'active',
        createdAt: '2026-03-18',
        suppliers: [
          { id: 'marinepro', name: 'Cortex Assurance AS', role: 'Information Security Governance · Data Protection & Privacy · Physical & Environmental Security', shareEquityPct: 5.5, greenSharesPct: 8, certCounts: { compliant: 0, pending: 0, missing: 4 }, valueContribution: 12_600_000, status: 'active', joinedAt: '2026-03-20' },
          { id: 'cybermed', name: 'CyberMed Italia S.r.l.', role: 'Access Control & Identity · Incident Response & Reporting', shareEquityPct: 7.0, greenSharesPct: 10, certCounts: { compliant: 0, pending: 1, missing: 2 }, valueContribution: 15_300_000, status: 'active', joinedAt: '2026-03-19' },
          { id: 'resilio', name: 'Resilio Continuity Partners', role: 'Supplier & Third-Party Risk · Business Continuity & Resilience · Environmental & Social (ESG)', shareEquityPct: 3.5, greenSharesPct: 6, certCounts: { compliant: 0, pending: 0, missing: 3 }, valueContribution: 7_900_000, status: 'active', joinedAt: '2026-04-02' },
        ],
      },
      'bergamo-vault': {
        id: 'bergamo-vault',
        name: 'Comune di Bergamo',
        clientName: 'Comune di Bergamo · Servizi Digitali',
        description: 'Municipal body · Public administration — NIS2, GDPR, ESG',
        assetIds: ['comune-bergamo'],
        status: 'active',
        createdAt: '2026-02-26',
        suppliers: [
          { id: 'marinepro', name: 'Cortex Assurance AS', role: 'Information Security Governance · Data Protection & Privacy · Physical & Environmental Security', shareEquityPct: 6.0, greenSharesPct: 9, certCounts: { compliant: 4, pending: 0, missing: 1 }, valueContribution: 17_800_000, status: 'active', joinedAt: '2026-03-01' },
          { id: 'pubblicasec', name: 'PubblicaSec S.r.l.', role: 'All remaining domains (framework agreement)', shareEquityPct: 11.0, greenSharesPct: 14, certCounts: { compliant: 4, pending: 0, missing: 2 }, valueContribution: 23_500_000, status: 'active', joinedAt: '2026-02-28' },
        ],
      },
      'equinor-vault': {
        id: 'equinor-vault',
        name: 'New Entity (onboarding)',
        clientName: 'Pending assignment',
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
        country: 'Norway', region: 'Rogaland', city: 'Stavanger',
        entityType: 'school',
        map: { x: 39, y: 83 },
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
        scoreHistory: [
          { date: '2025-11', score: 48 },
          { date: '2025-12', score: 52 },
          { date: '2026-01', score: 55 },
          { date: '2026-02', score: 58 },
          { date: '2026-03', score: 60 },
          { date: '2026-04', score: 62 },
        ],
      },
      'marina-luna': {
        id: 'marina-luna',
        name: 'Regnbuen Barnehage',
        imo: '912 305 447',
        type: 'Private kindergarten · 3 departments',
        flag: 'Sandnes',
        targetMarket: 'Multi-standard compliance',
        country: 'Norway', region: 'Rogaland', city: 'Sandnes',
        entityType: 'school',
        map: { x: 43, y: 90 },
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
        scoreHistory: [
          { date: '2025-11', score: 70 },
          { date: '2025-12', score: 73 },
          { date: '2026-01', score: 75 },
          { date: '2026-02', score: 77 },
          { date: '2026-03', score: 79 },
          { date: '2026-04', score: 81 },
        ],
      },

      // ----- Italy · partner track (see HANDOFF section 1). Same eight domains as
      // the Norwegian entities so the authority Overview can compare like with like.
      'osp-san-rocco': {
        id: 'osp-san-rocco',
        name: 'Ospedale San Rocco',
        imo: 'IT 04521980968',
        type: 'Regional hospital · 6 departments',
        flag: 'Lombardia',
        targetMarket: 'Multi-standard compliance',
        country: 'Italy', region: 'Lombardia', city: 'Bergamo',
        entityType: 'hospital',
        map: { x: 47, y: 20 },
        yearBuilt: 1979,
        dwt: '410 beds · 1,240 staff',
        nominalValue: 460_000_000,
        currentValue: 402_000_000,
        projectedValue: 478_000_000,
        euReadinessScore: 54,
        criticalGaps: 2,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Information Security Governance', assignedTo: 'marinepro',
            score: 55, status: 'partial', zone: 'engine',
            certifications: [
              cert('hos-iso27001-a5-policy', 'Information Security Policy Set', 'ISO/IEC 27001:2022 A.5.1', 'high', 'partial',
                12000, 20000, [5, 8],
                'A policy set exists but predates the hospital\'s 2025 NIS2 classification as an essential entity. It does not cover clinical systems or connected medical devices, and the last management approval is from 2022.',
                ['Information Security Policy', 'Management Approval Record', 'Scope Statement']),
              cert('hos-iso27001-cl9-review', 'Internal Audit & Management Review', 'ISO/IEC 27001:2022 Cl. 9.2–9.3', 'high', 'missing',
                18000, 30000, [8, 12],
                'No internal audit programme has been established. Neither an internal audit nor a management review has been conducted since the management system was scoped.',
                ['Internal Audit Programme', 'Internal Audit Report', 'Management Review Minutes']),
              cert('hos-nis2-art21-riskmgmt', 'Cyber Risk Management Measures', 'NIS2 Art. 21(2)', 'critical', 'partial',
                45000, 70000, [12, 20],
                'Risk analysis covers the administrative network only. Clinical systems, imaging, and connected medical devices are out of scope, which NIS2 Art. 21(2)(a) requires for an essential entity in the health sector.',
                ['Risk Analysis Report', 'Asset & Device Inventory', 'Treatment Plan']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Data Protection & Privacy', assignedTo: 'marinepro',
            score: 42, status: 'missing', zone: 'fuel',
            certifications: [
              cert('hos-gdpr-art9-health', 'Special Category (Health) Data Safeguards', 'GDPR Art. 9(2)(h)', 'critical', 'missing',
                35000, 55000, [10, 16],
                'Patient health data is processed without documented Art. 9 safeguards. There is no written confidentiality undertaking for clinical staff and no access-logging on the patient record system, so unauthorised access could not be detected retrospectively.',
                ['Art. 9 Safeguards Assessment', 'Confidentiality Undertakings', 'Access Log Configuration']),
              cert('hos-gdpr-art30-ropa', 'Records of Processing Activities', 'GDPR Art. 30', 'high', 'partial',
                14000, 22000, [5, 8],
                'The register covers administrative processing but omits the clinical departments. Retention periods for diagnostic imaging are not stated.',
                ['Records of Processing Activities', 'Retention Schedule']),
              cert('hos-gdpr-art32-security', 'Security of Processing', 'GDPR Art. 32', 'high', 'missing',
                25000, 40000, [8, 14],
                'Encryption at rest is not applied to the diagnostic imaging archive, and there is no documented process for testing the effectiveness of technical measures as Art. 32(1)(d) requires.',
                ['Technical Measures Register', 'Encryption Configuration Report', 'Effectiveness Test Records']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Access Control & Identity', assignedTo: 'cybermed',
            score: 61, status: 'partial', zone: 'hull',
            certifications: [
              cert('hos-iso27001-a8-access', 'Clinical System Access Control', 'ISO/IEC 27001:2022 A.8.2–A.8.4', 'high', 'partial',
                20000, 32000, [6, 10],
                'Role-based access is enforced on the patient record system but not on the imaging or laboratory systems. The last privileged account review found 34 accounts belonging to former staff.',
                ['Access Control Matrix', 'Privileged Account Review', 'Leaver Deprovisioning Procedure']),
              cert('hos-iso27001-a8-05-mfa', 'Multi-Factor Authentication Coverage', 'ISO/IEC 27001:2022 A.8.5', 'high', 'missing',
                30000, 48000, [10, 16],
                'Multi-factor authentication is not deployed. Clinical workstations use shared ward logins, so actions cannot be attributed to an individual user.',
                ['MFA Rollout Plan', 'Shared Account Inventory', 'Enrolment Report']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Incident Response & Reporting', assignedTo: 'cybermed',
            score: 48, status: 'missing', zone: 'ballast',
            certifications: [
              cert('hos-nis2-art23-incident', 'Incident Detection & 24-Hour Notification', 'NIS2 Art. 23', 'high', 'missing',
                28000, 45000, [8, 14],
                'No incident response plan meets the Art. 23 deadlines. There is no documented route for the 24-hour early warning to the national CSIRT and no on-call rota outside office hours.',
                ['Incident Response Plan', 'Notification Escalation Path', 'On-Call Rota']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Supplier & Third-Party Risk', assignedTo: 'resilio',
            score: 70, status: 'partial', zone: 'bridge',
            certifications: [
              cert('hos-nis2-art21-supplychain', 'ICT Supply-Chain Security', 'NIS2 Art. 21(2)(d)', 'high', 'partial',
                16000, 26000, [6, 10],
                'Security requirements are included in new ICT contracts. Legacy medical-device maintenance contracts carry no security clauses, and remote-access arrangements for device vendors are undocumented.',
                ['Supplier Register', 'Contract Security Clauses', 'Vendor Remote Access Register']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Business Continuity & Resilience', assignedTo: 'resilio',
            score: 52, status: 'missing', zone: 'deck',
            certifications: [
              cert('hos-iso27001-a5-29-continuity', 'Continuity & Crisis Management', 'ISO/IEC 27001:2022 A.5.29–A.5.30 · NIS2 Art. 21(2)(c)', 'high', 'missing',
                40000, 65000, [12, 18],
                'There is no tested continuity plan for a loss of the patient record system. Downtime procedures exist on paper for two wards only, and no restore test has ever been performed on the imaging archive.',
                ['Business Continuity Plan', 'Ward Downtime Procedures', 'Restore Test Report']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Physical & Environmental Security', assignedTo: 'marinepro',
            score: 66, status: 'partial', zone: 'accommodation',
            certifications: [
              cert('hos-iso27001-a7-physical', 'Physical Security & Restricted Areas', 'ISO/IEC 27001:2022 A.7.1–A.7.4', 'medium', 'partial',
                10000, 18000, [4, 8],
                'Badge access protects the server rooms, but ward medication rooms and the records archive are secured by mechanical key with no issuance log.',
                ['Physical Security Assessment', 'Key Issuance Log', 'Restricted Area Register']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Environmental & Social (ESG)', assignedTo: 'resilio',
            score: 58, status: 'partial', zone: 'cargo',
            certifications: [
              cert('hos-esg-e5-waste', 'Clinical Waste & Resource Reporting', 'ESRS E5', 'medium', 'partial',
                12000, 20000, [5, 9],
                'Clinical waste volumes are recorded by the disposal contractor but not reconciled internally. Water and single-use consumable data required for the ESRS E5 resource-inflow disclosure is not collected.',
                ['Clinical Waste Report', 'Contractor Reconciliation', 'Resource Inflow Data']),
            ],
          },
        },
        scoreHistory: [
          { date: '2025-11', score: 41 },
          { date: '2025-12', score: 43 },
          { date: '2026-01', score: 46 },
          { date: '2026-02', score: 49 },
          { date: '2026-03', score: 52 },
          { date: '2026-04', score: 54 },
        ],
      },
      'comune-bergamo': {
        id: 'comune-bergamo',
        name: 'Comune di Bergamo',
        imo: 'IT 00636460162',
        type: 'Municipal body · 11 services',
        flag: 'Lombardia',
        targetMarket: 'Multi-standard compliance',
        country: 'Italy', region: 'Lombardia', city: 'Bergamo',
        entityType: 'municipal',
        map: { x: 42, y: 25 },
        yearBuilt: 1928,
        dwt: '121,000 residents · 840 staff',
        nominalValue: 240_000_000,
        currentValue: 228_000_000,
        projectedValue: 252_000_000,
        euReadinessScore: 79,
        criticalGaps: 1,
        components: {
          'engine-room': {
            id: 'engine-room', name: 'Information Security Governance', assignedTo: 'marinepro',
            score: 84, status: 'partial', zone: 'engine',
            certifications: [
              cert('mun-iso27001-a5-policy', 'Information Security Policy Set', 'ISO/IEC 27001:2022 A.5.1', 'high', 'compliant',
                0, 0, [0, 0],
                'The policy set was adopted by council resolution in 2024 and is reviewed annually against the AgID minimum security measures.',
                ['Information Security Policy', 'Council Resolution', 'Annual Review Record']),
              cert('mun-nis2-art21-riskmgmt', 'Cyber Risk Management Measures', 'NIS2 Art. 21(2)', 'high', 'partial',
                18000, 28000, [6, 10],
                'Risk analysis covers the citizen-facing digital services. The civil-registry and tax-collection systems inherited from the 2023 platform migration have not yet been assessed.',
                ['Risk Analysis Report', 'System Inventory', 'Treatment Plan']),
            ],
          },
          'fuel-emissions': {
            id: 'fuel-emissions', name: 'Data Protection & Privacy', assignedTo: 'marinepro',
            score: 78, status: 'partial', zone: 'fuel',
            certifications: [
              cert('mun-gdpr-art30-ropa', 'Records of Processing Activities', 'GDPR Art. 30', 'high', 'compliant',
                0, 0, [0, 0],
                'The register covers all 11 municipal services with retention periods and recipient categories stated per purpose.',
                ['Records of Processing Activities', 'Retention Schedule']),
              cert('mun-gdpr-art37-dpo', 'Data Protection Officer Designation', 'GDPR Art. 37(1)(a)', 'critical', 'partial',
                8000, 14000, [3, 6],
                'A Data Protection Officer is designated but the appointment has not been notified to the Garante, and the published contact details on the municipal website are out of date. Art. 37(7) requires both.',
                ['DPO Appointment Act', 'Garante Notification Receipt', 'Published Contact Details']),
            ],
          },
          'hull-structure': {
            id: 'hull-structure', name: 'Access Control & Identity', assignedTo: 'pubblicasec',
            score: 90, status: 'compliant', zone: 'hull',
            certifications: [
              cert('mun-iso27001-a8-access', 'Access Control & Privileged Accounts', 'ISO/IEC 27001:2022 A.8.2–A.8.4', 'high', 'compliant',
                0, 0, [0, 0],
                'Access is granted by service role and reviewed each quarter. Digital identity is federated through SPID for citizen-facing services.',
                ['Access Control Matrix', 'Quarterly Review Record']),
            ],
          },
          'ballast-water': {
            id: 'ballast-water', name: 'Incident Response & Reporting', assignedTo: 'pubblicasec',
            score: 86, status: 'compliant', zone: 'ballast',
            certifications: [
              cert('mun-nis2-art23-incident', 'Incident Detection & 24-Hour Notification', 'NIS2 Art. 23', 'high', 'compliant',
                0, 0, [0, 0],
                'The response plan documents the 24-hour early warning and 72-hour notification path to ACN. Last exercised February 2026.',
                ['Incident Response Plan', 'ACN Notification Path', 'Exercise Report']),
            ],
          },
          'bridge-nav': {
            id: 'bridge-nav', name: 'Supplier & Third-Party Risk', assignedTo: 'pubblicasec',
            score: 82, status: 'partial', zone: 'bridge',
            certifications: [
              cert('mun-iso27001-a5-19-supplier', 'Procurement & Processor Agreements', 'ISO/IEC 27001:2022 A.5.19–A.5.22 · GDPR Art. 28', 'high', 'partial',
                9000, 15000, [4, 7],
                'Processor agreements are in place for all current framework suppliers. Two sub-processors engaged by the document-management vendor have not been authorised in writing.',
                ['Supplier Register', 'Processor Agreements', 'Sub-Processor Authorisations']),
              cert('mun-nis2-art21-supplychain', 'ICT Supply-Chain Security', 'NIS2 Art. 21(2)(d)', 'medium', 'partial',
                7000, 12000, [3, 6],
                'Security requirements are embedded in the standard procurement template. Supplier security performance is not yet reviewed at contract renewal.',
                ['Procurement Template', 'Supplier Review Procedure']),
            ],
          },
          'deck-safety': {
            id: 'deck-safety', name: 'Business Continuity & Resilience', assignedTo: 'pubblicasec',
            score: 88, status: 'compliant', zone: 'deck',
            certifications: [
              cert('mun-iso27001-a5-29-continuity', 'Continuity Plan & Restore Testing', 'ISO/IEC 27001:2022 A.5.29–A.5.30', 'medium', 'compliant',
                0, 0, [0, 0],
                'The continuity plan covers all citizen-facing services. The most recent restore test was completed in March 2026 within the stated recovery objective.',
                ['Business Continuity Plan', 'Restore Test Report', 'RTO/RPO Register']),
            ],
          },
          'accommodation': {
            id: 'accommodation', name: 'Physical & Environmental Security', assignedTo: 'marinepro',
            score: 91, status: 'compliant', zone: 'accommodation',
            certifications: [
              cert('mun-iso27001-a7-physical', 'Physical Security & Visitor Control', 'ISO/IEC 27001:2022 A.7.1–A.7.4', 'medium', 'compliant',
                0, 0, [0, 0],
                'Badge access and a staffed reception control entry to all administrative buildings. The data-centre room is access-logged and reviewed monthly.',
                ['Physical Security Assessment', 'Access Log Review']),
            ],
          },
          'cargo-tanks': {
            id: 'cargo-tanks', name: 'Environmental & Social (ESG)', assignedTo: 'pubblicasec',
            score: 76, status: 'partial', zone: 'cargo',
            certifications: [
              cert('mun-esg-e1-energy', 'Energy & Emissions Reporting', 'ESRS E1', 'medium', 'partial',
                11000, 18000, [5, 9],
                'Scope 1 and 2 emissions are reported for municipal buildings and the vehicle fleet. Scope 3 emissions from procured services are not yet quantified, which the ESRS E1 disclosure requires.',
                ['Energy & Emissions Report', 'Fleet Consumption Data', 'Scope 3 Assessment']),
            ],
          },
        },
        scoreHistory: [
          { date: '2025-11', score: 68 },
          { date: '2025-12', score: 71 },
          { date: '2026-01', score: 73 },
          { date: '2026-02', score: 75 },
          { date: '2026-03', score: 77 },
          { date: '2026-04', score: 79 },
        ],
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

    // Advisory firms. `components` is the domain list a firm is engaged for; a
    // firm only sees an entity where a component also carries its `assignedTo`.
    compliantEntities: {
      'marinepro':   { name: 'Cortex Assurance AS',           components: ['engine-room', 'fuel-emissions', 'accommodation'] },
      'nordiccert':  { name: 'NordSecure Advisory AS',        components: ['hull-structure', 'ballast-water', 'bridge-nav'] },
      'seagreen':    { name: 'Verda Sustainability Partners', components: ['deck-safety', 'cargo-tanks'] },
      'cybermed':    { name: 'CyberMed Italia S.r.l.',        components: ['hull-structure', 'ballast-water'] },
      'resilio':     { name: 'Resilio Continuity Partners',   components: ['bridge-nav', 'deck-safety', 'cargo-tanks'] },
      'pubblicasec': { name: 'PubblicaSec S.r.l.',            components: ['hull-structure', 'ballast-water', 'bridge-nav', 'deck-safety', 'cargo-tanks'] },
    },
    currentComplianceEntity: 'marinepro',

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
                  'rb-iso27001-a7-physical',
                  'hos-iso27001-a5-policy', 'hos-iso27001-cl9-review', 'hos-iso27001-a8-access',
                  'hos-iso27001-a8-05-mfa', 'hos-iso27001-a5-29-continuity', 'hos-iso27001-a7-physical',
                  'mun-iso27001-a5-policy', 'mun-iso27001-a8-access', 'mun-iso27001-a5-19-supplier',
                  'mun-iso27001-a5-29-continuity', 'mun-iso27001-a7-physical'],
      },
      {
        id: 'gdpr',
        name: 'GDPR — Data Protection',
        description: 'Lawful processing, records, impact assessments, transparency and data-subject rights.',
        weight: 0.30,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-gdpr-art30-ropa', 'sol-gdpr-art35-dpia', 'sol-gdpr-art13-transparency',
                  'rb-gdpr-art30-ropa', 'rb-gdpr-art13-transparency',
                  'hos-gdpr-art9-health', 'hos-gdpr-art30-ropa', 'hos-gdpr-art32-security',
                  'mun-gdpr-art30-ropa', 'mun-gdpr-art37-dpo'],
      },
      {
        id: 'nis2',
        name: 'NIS2 — Cyber Resilience',
        description: 'Risk management, incident detection, and the 24-hour reporting obligation to the national CSIRT.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-nis2-art23-incident', 'rb-nis2-art23-incident',
                  'hos-nis2-art21-riskmgmt', 'hos-nis2-art23-incident', 'hos-nis2-art21-supplychain',
                  'mun-nis2-art21-riskmgmt', 'mun-nis2-art23-incident', 'mun-nis2-art21-supplychain'],
      },
      {
        id: 'esg',
        name: 'ESG — Environmental & Social',
        description: 'Resource use, waste, and social reporting under ESRS and local schemes such as Green Flag.',
        weight: 0.20,
        ratifiedAt: '2026-01-15',
        certIds: ['sol-esg-e5-waste', 'rb-esg-e5-waste', 'hos-esg-e5-waste', 'mun-esg-e1-energy'],
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

    // ----- Ospedale San Rocco. No criterion is compliant yet, so decay surfaces
    // nothing here by design -- this entity's story is open gaps, not expiry. It
    // is the red dot the authority Overview should send an inspector to.
    'hos-iso27001-a5-policy':       { decay: 12, validated: '2022-05-01' },
    'hos-iso27001-cl9-review':      { decay: 12, validated: '2025-01-01' },
    'hos-nis2-art21-riskmgmt':      { decay: 12, validated: '2025-07-01' },
    'hos-gdpr-art9-health':         { decay: 12, validated: '2025-01-01' },
    'hos-gdpr-art30-ropa':          { decay: 12, validated: '2025-09-01' },
    'hos-gdpr-art32-security':      { decay: 12, validated: '2025-01-01' },
    'hos-iso27001-a8-access':       { decay: 12, validated: '2025-10-01' },
    'hos-nis2-art23-incident':      { decay: 12, validated: '2025-01-01' },
    'hos-nis2-art21-supplychain':   { decay: 12, validated: '2025-11-01' },
    'hos-esg-e5-waste':             { decay: 12, validated: '2025-08-01' },
    'hos-iso27001-a8-05-mfa':       { decay: 24, validated: '2025-01-01' },
    'hos-iso27001-a5-29-continuity':{ decay: 24, validated: '2025-01-01' },
    'hos-iso27001-a7-physical':     { decay: 24, validated: '2025-02-01' },

    // ----- Comune di Bergamo. Two compliant criteria are tuned to fall due
    // within ~90 days so the Overview has a preventive alert to raise here too.
    'mun-iso27001-a5-policy':       { decay: 12, validated: '2025-06-20' }, // at-risk: expires 2026-06-20
    'mun-nis2-art21-riskmgmt':      { decay: 12, validated: '2025-10-01' },
    'mun-gdpr-art30-ropa':          { decay: 12, validated: '2026-01-20' },
    'mun-gdpr-art37-dpo':           { decay: 12, validated: '2025-09-01' },
    'mun-iso27001-a8-access':       { decay: 12, validated: '2026-02-01' },
    'mun-nis2-art23-incident':      { decay: 12, validated: '2026-02-15' },
    'mun-iso27001-a5-19-supplier':  { decay: 12, validated: '2025-11-01' },
    'mun-nis2-art21-supplychain':   { decay: 12, validated: '2025-12-01' },
    'mun-esg-e1-energy':            { decay: 12, validated: '2025-08-01' },
    'mun-iso27001-a5-29-continuity':{ decay: 24, validated: '2024-07-10' }, // at-risk: expires 2026-07-10
    'mun-iso27001-a7-physical':     { decay: 24, validated: '2025-05-01' },
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

  // The demo's fixed "today". All date-derived display hangs off this so the
  // canned data stays coherent whenever the demo is actually run.
  const DEMO_TODAY = '2026-04-29';
  window.AGG_TODAY = () => new Date(DEMO_TODAY);

  // Remediation window by criticality, in days, for criteria not yet met.
  // Compliance work is bounded by a due date, not by a cost estimate.
  const REMEDIATION_DAYS = { critical: 60, high: 120, medium: 180 };

  // A criterion always has a date attached to it: a remediation deadline while
  // it is open, or a renewal date once it is met (which is the decay expiry).
  window.criterionDeadline = function (cert) {
    const today = window.AGG_TODAY();
    const met = cert.status === 'compliant' || cert.status === 'approved';
    let due;
    if (met && cert.lastValidatedAt && cert.decayWindowMonths) {
      due = new Date(cert.lastValidatedAt);
      due.setMonth(due.getMonth() + cert.decayWindowMonths);
    } else {
      due = new Date(today);
      due.setDate(due.getDate() + (REMEDIATION_DAYS[cert.criticality] ?? 180));
    }
    const days = Math.round((due - today) / 86400000);
    return {
      kind: met ? 'renewal' : 'remediation',
      iso: due.toISOString().slice(0, 10),
      label: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      daysLeft: days,
      overdue: days < 0,
    };
  };

  // ----- Computation helpers -----
  const CERT_WEIGHTS = { missing: 0, partial: 50, 'pending-review': 75, compliant: 100, approved: 100 };

  // Mean of CERT_WEIGHTS across a criterion list. This is the raw formula.
  function certAvg(certs) {
    if (!certs || certs.length === 0) return 0;
    return certs.reduce((s, c) => s + (CERT_WEIGHTS[c.status] ?? 0), 0) / certs.length;
  }

  const clampScore = (n) => Math.max(0, Math.min(100, Math.round(n)));

  function componentHasDiverged(component, vesselId) {
    const initComp = window.INITIAL_STATE.vessels[vesselId]?.components?.[component.id];
    if (!initComp) return true;
    return component.certifications.some((c, i) => {
      const ic = initComp.certifications[i];
      if (!ic) return true;
      return c.status !== ic.status || (c.uploadedDocs && c.uploadedDocs.length > 0);
    });
  }

  // Seeded scores are the display baseline and sit on a different scale from the
  // raw formula (Solstrale seeds 62 while certAvg over its areas yields ~77). So
  // the formula supplies the *delta* from the seeded state rather than replacing
  // it: score = seeded + (formula_now - formula_at_seed). This keeps the headline
  // numbers the founder demos stable, makes every upload/approval move the score
  // by a believable amount, and is the same approach computeDecayProjection uses.
  function recomputeComponent(component, vesselId) {
    const init = window.INITIAL_STATE.vessels[vesselId]?.components?.[component.id];
    if (!init || !component.certifications || component.certifications.length === 0) return false;
    // Leave seeded score/status untouched until this component's certs actually diverge from initial.
    if (!componentHasDiverged(component, vesselId)) return false;

    const delta = certAvg(component.certifications) - certAvg(init.certifications);
    const score = clampScore(init.score + delta);
    component.score = score;
    if (score >= 95) component.status = 'compliant';
    else if (score >= 55) component.status = 'partial';
    else component.status = 'missing';
    return true;
  }

  function recomputeVessel(vessel) {
    const comps = Object.values(vessel.components);
    if (comps.length === 0) return;
    const init = window.INITIAL_STATE.vessels[vessel.id];
    if (!init) return;
    let anyChanged = false;
    comps.forEach(c => { if (recomputeComponent(c, vessel.id)) anyChanged = true; });
    if (!anyChanged) return;

    // Same delta rule one level up: non-diverged areas still hold their seeded
    // score, so the means differ only by the movement we actually caused.
    const initComps = Object.values(init.components);
    const seededMean = initComps.reduce((s, c) => s + c.score, 0) / initComps.length;
    const liveMean = comps.reduce((s, c) => s + c.score, 0) / comps.length;
    vessel.euReadinessScore = clampScore(init.euReadinessScore + (liveMean - seededMean));

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
    const today = window.AGG_TODAY();
    const horizon = new Date(today);
    horizon.setMonth(horizon.getMonth() + monthsAhead);

    const avgFromCerts = (vessel) => {
      const comps = Object.values(vessel.components);
      return comps.reduce((s, c) => s + certAvg(c.certifications), 0) / comps.length;
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
