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
    'ihm-part-i': 'Waste_Management_Plan_Solstrale_2026.pdf',
    'marpol-annex-vi': 'Menu_Plan_Climate_Assessment_Spring_2026.pdf',
    'solas-xii': 'Building_Maintenance_Plan_2026.pdf',
    'ism-code': 'IK_Mat_Inspection_Report_2026.pdf',
    'ballast-water': 'Water_Consumption_Log_2026.pdf',
    'eu-ets': 'Energy_Account_2025.pdf',
    'cii-rating': 'Energy_Saving_Measures_List_2026.pdf',
    'iopp': 'Energy_Audit_Report_2026.pdf',
    'lsa': 'Extinguisher_Inspection_Report_2026.pdf',
    'afs': 'Outdoor_Area_Survey_2026.pdf',
    'solas-v': 'Annual_Plan_2025_2026.pdf',
    'mlc': 'Cleaning_Plan_2026.pdf',
    'mlc-title-4': 'Infection_Control_Routine_2026.pdf',
  };
  return map[certId] || 'HSE_Routine_Kindergarten_2026.pdf';
}
