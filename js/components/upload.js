// Drag-drop zone + phased AI pre-validation animation.
// Usage: wireUpload(container, { certId, onComplete })
window.wireUpload = function (container, { certId, onComplete }) {
  const dz = container.querySelector('.dropzone');
  if (!dz) return;

  const simulate = (filename) => {
    const phases = (window.AGG_CONTENT.aiPhases[certId] || window.AGG_CONTENT.aiPhases.default);
    const findings = (window.AGG_CONTENT.aiFindings[certId] || window.AGG_CONTENT.aiFindings.default);
    dz.classList.add('hidden');

    // Disable submit button while AI runs.
    const submitBtn = document.getElementById('submit-all');
    if (submitBtn) {
      submitBtn.dataset.prevDisabled = submitBtn.disabled ? '1' : '0';
      submitBtn.disabled = true;
      submitBtn.classList.add('bg-slate-700', 'text-slate-500', 'cursor-not-allowed');
      submitBtn.classList.remove('bg-teal-400', 'text-slate-900', 'hover:bg-teal-300');
    }

    const panel = container.querySelector('.ai-panel');
    panel.innerHTML = `
      <div class="card p-5">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-teal-400/15 flex items-center justify-center">
            <i data-lucide="sparkles" class="w-5 h-5 text-teal-300"></i>
          </div>
          <div>
            <div class="font-medium">Aurora AI · Pre-validation</div>
            <div class="text-xs text-slate-400">${filename}</div>
          </div>
        </div>
        <div class="space-y-2.5" id="ai-steps">
          ${phases.map((p, i) => `
            <div class="ai-step flex items-center gap-3" data-i="${i}">
              <span class="dot"></span>
              <span class="text-sm text-slate-300">${p.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    lucide.createIcons();

    const stepEls = panel.querySelectorAll('.ai-step');
    let i = 0;
    const next = () => {
      if (i > 0) { stepEls[i-1].classList.remove('active'); stepEls[i-1].classList.add('done'); }
      if (i < stepEls.length) {
        stepEls[i].classList.add('show', 'active');
        const dur = phases[i].ms;
        i++;
        setTimeout(next, dur);
      } else {
        // All phases done. Commit state — the render will surface findings inline.
        window.demoState._submitJustUnlocked = true;
        onComplete && onComplete(filename, findings);
      }
    };
    next();
  };

  dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('drag'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag'));
  dz.addEventListener('drop', (e) => {
    e.preventDefault(); dz.classList.remove('drag');
    const file = e.dataTransfer.files[0];
    const name = file ? file.name : fakeFilename(certId);
    simulate(name);
  });
  dz.addEventListener('click', () => simulate(fakeFilename(certId)));
};

function fakeFilename(certId) {
  const map = {
    // ----- Solstråle Barnehage -----
    'sol-iso27001-a5-policy': 'Information_Security_Policy_Solstrale_v2_2026.pdf',
    'sol-iso27001-a5-roles': 'Roles_Responsibilities_Matrix_2026.pdf',
    'sol-iso27001-cl9-review': 'Internal_Audit_Report_2026.pdf',
    'sol-gdpr-art30-ropa': 'Records_of_Processing_Activities_2026.xlsx',
    'sol-gdpr-art35-dpia': 'DPIA_Parent_App_Solstrale_2026.pdf',
    'sol-gdpr-art13-transparency': 'Privacy_Notice_Guardians_2026.pdf',
    'sol-iso27001-a8-access': 'Access_Control_Matrix_Q1_2026.xlsx',
    'sol-iso27001-a8-05-mfa': 'MFA_Enrolment_Report_2026.pdf',
    'sol-nis2-art23-incident': 'Incident_Response_Plan_2026.pdf',
    'sol-iso27001-a5-19-supplier': 'Data_Processing_Agreements_2026.zip',
    'sol-iso27001-a5-29-continuity': 'Backup_Restore_Test_Report_2026.pdf',
    'sol-iso27001-a7-physical': 'Physical_Security_Assessment_2026.pdf',
    'sol-iso27001-a7-10-media': 'Media_Disposal_Procedure_2026.pdf',
    'sol-esg-e5-waste': 'Waste_Resource_Report_Solstrale_2026.pdf',

    // ----- Regnbuen Barnehage -----
    'rb-iso27001-cl9-review': 'Internal_Audit_Report_Regnbuen_2026.pdf',
    'rb-iso27001-a5-policy': 'Information_Security_Policy_Regnbuen_2026.pdf',
    'rb-gdpr-art30-ropa': 'Records_of_Processing_Activities_Regnbuen_2026.xlsx',
    'rb-gdpr-art13-transparency': 'Consent_Register_Q1_2026.xlsx',
    'rb-iso27001-a8-access': 'Access_Control_Matrix_Regnbuen_2026.xlsx',
    'rb-iso27001-a8-05-mfa': 'MFA_Enrolment_Report_Regnbuen_2026.pdf',
    'rb-nis2-art23-incident': 'Tabletop_Exercise_Report_Dec_2025.pdf',
    'rb-iso27001-a5-19-supplier': 'Supplier_Register_Regnbuen_2026.pdf',
    'rb-iso27001-a5-29-continuity': 'Business_Continuity_Plan_Regnbuen_2026.pdf',
    'rb-iso27001-a7-physical': 'Physical_Security_Assessment_Regnbuen_2026.pdf',
    'rb-esg-e5-waste': 'Waste_Resource_Report_Regnbuen_2025.pdf',
  };
  return map[certId] || 'Compliance_Evidence_2026.pdf';
}
