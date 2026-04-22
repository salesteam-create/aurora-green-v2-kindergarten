window.ComplianceViews = {};

function entity() {
  const id = window.demoState.currentComplianceEntity;
  return { id, ...window.demoState.compliantEntities[id] };
}

function assignedComponents() {
  const ent = entity();
  const out = [];
  Object.values(window.demoState.vessels).forEach(v => {
    Object.values(v.components || {}).forEach(c => {
      if (c.assignedTo === ent.id) out.push({ vessel: v, component: c });
    });
  });
  return out;
}

window.ComplianceViews['my-components'] = function (root) {
  const items = assignedComponents();
  root.innerHTML = `
    <div class="flex items-end justify-between mb-6">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">My Assigned Components</h1>
        <div class="text-slate-400 text-sm mt-1">${entity().name} · ${items.length} components across ${new Set(items.map(i=>i.vessel.id)).size} vessels.</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${items.map(({vessel, component}) => `
        <div class="card p-5 card-hover cursor-pointer" data-vid="${vessel.id}" data-cid="${component.id}">
          <div class="flex items-center justify-between mb-2">
            <div class="text-xs text-slate-400">${vessel.name} · IMO ${vessel.imo}</div>
            ${window.statusPill(component.status)}
          </div>
          <div class="text-lg font-medium">${component.name}</div>
          <div class="mt-4 flex items-center gap-4">
            <div class="flex-1">
              <div class="h-2 rounded-full bg-slate-700 overflow-hidden">
                <div class="h-full" style="width:${component.score}%;background:${component.score>=80?'#2dd4bf':component.score>=60?'#f59e0b':'#fb7185'}"></div>
              </div>
              <div class="text-xs text-slate-400 mt-1">${component.score}% complete · ${component.certifications.length} regulations</div>
            </div>
            <i data-lucide="chevron-right" class="w-5 h-5 text-slate-500"></i>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  root.querySelectorAll('[data-cid]').forEach(el => el.addEventListener('click', () => {
    window.demoState.selectedVesselId = el.dataset.vid;
    window.demoState.selectedComponentId = el.dataset.cid;
    window.demoState.selectedCertId = null;
    window.demoState.currentView = 'cert-engine';
    window.render();
  }));
};

window.ComplianceViews['cert-engine'] = function (root) {
  const v = window.demoState.vessels[window.demoState.selectedVesselId];
  let c = v.components[window.demoState.selectedComponentId];
  // Ensure we have an assigned component selected.
  if (!c || c.assignedTo !== entity().id) {
    const first = assignedComponents()[0];
    if (!first) { root.innerHTML = '<div class="text-slate-400">No components assigned.</div>'; return; }
    window.demoState.selectedVesselId = first.vessel.id;
    window.demoState.selectedComponentId = first.component.id;
    return window.ComplianceViews['cert-engine'](root);
  }

  const selId = window.demoState.selectedCertId;
  const anyReady = c.certifications.some(x => x.status === 'pending-review');
  const allDone = c.certifications.every(x => x.status === 'compliant' || x.status === 'approved');
  const showSubmit = !allDone;

  root.innerHTML = `
    <div class="flex items-end justify-between mb-6">
      <div>
        <div class="text-xs text-slate-400">${v.name} · IMO ${v.imo}</div>
        <h1 class="text-3xl font-semibold tracking-tight">${c.name} — Certification Engine</h1>
        <div class="text-slate-400 text-sm mt-1">${c.certifications.length} regulations tracked · ${c.score}% complete</div>
      </div>
      ${showSubmit ? `<button id="submit-all" ${anyReady ? '' : 'disabled'} class="px-4 py-2 rounded-lg font-semibold ${anyReady ? 'bg-teal-400 text-slate-900 hover:bg-teal-300' : 'bg-slate-700 text-slate-500 cursor-not-allowed'} ${anyReady && window.demoState._submitJustUnlocked ? 'submit-pulse' : ''}">Submit to DNV</button>` : ''}
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-5 space-y-2">
        ${c.certifications.map(cert => `
          <div class="card p-4 cursor-pointer ${selId===cert.id?'border-teal-400':''}" data-cid="${cert.id}">
            <div class="flex items-center justify-between">
              <div class="font-medium text-sm pr-2">${cert.name}</div>
              ${window.statusPill(cert.status)}
            </div>
            <div class="mt-1 text-xs text-slate-500">${cert.regulation}</div>
            ${cert.status === 'missing' || cert.status === 'partial' ? `
              <div class="mt-2 flex items-center gap-3 text-xs text-slate-400">
                <span>€${cert.costMin.toLocaleString()}–${cert.costMax.toLocaleString()}</span>
                <span>·</span>
                <span>${cert.timelineWeeks[0]}–${cert.timelineWeeks[1]} weeks</span>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
      <div class="col-span-7" id="cert-detail">
        ${selId ? certDetailHTML(c.certifications.find(x => x.id === selId)) : '<div class="card p-8 text-slate-400">Select a regulation to view gap analysis and upload documents.</div>'}
      </div>
    </div>
  `;

  // Consume one-shot pulse flag so it only animates once.
  if (window.demoState._submitJustUnlocked) delete window.demoState._submitJustUnlocked;

  root.querySelectorAll('[data-cid]').forEach(el => el.addEventListener('click', () => {
    window.demoState.selectedCertId = el.dataset.cid;
    window.render();
  }));

  if (selId) {
    const cert = c.certifications.find(x => x.id === selId);
    window.wireUpload(document.getElementById('cert-detail'), {
      certId: cert.id,
      onComplete: (filename, findings) => {
        window.updateState(state => {
          const vv = state.vessels[state.selectedVesselId];
          const cc = vv.components[state.selectedComponentId];
          const cr = cc.certifications.find(x => x.id === cert.id);
          cr.uploadedDocs.push(filename);
          cr.status = 'pending-review';
          cr.aiFindings = findings;
          state.recentActivity.unshift({ at: new Date().toISOString(), persona: 'compliance', session: true,
            text: `AI pre-validated ${cr.name}. Ready for DNV submission.` });
        });
        window.toast(`${cert.name} · pre-validated`);
      }
    });
  }

  const submitBtn = document.getElementById('submit-all');
  submitBtn && submitBtn.addEventListener('click', () => {
    if (!anyReady) return;
    const submissions = [];
    window.updateState(state => {
      const vv = state.vessels[state.selectedVesselId];
      const cc = vv.components[state.selectedComponentId];
      cc.certifications.forEach(cr => {
        if (cr.status === 'pending-review') {
          submissions.push({
            id: 'sub-' + Math.random().toString(36).slice(2, 9),
            vesselId: vv.id, vesselName: vv.name,
            componentId: cc.id, componentName: cc.name,
            certId: cr.id, certName: cr.name,
            submittedBy: entity().name,
            submittedAt: new Date().toISOString(),
            session: true,
            docs: cr.uploadedDocs.slice(),
            aiNotes: window.AGG_CONTENT.dnvNotes[cr.id] || window.AGG_CONTENT.dnvNotes.default,
            status: 'pending',
          });
        }
      });
      state.dnvQueue.unshift(...submissions);
      if (submissions.length) {
        state.recentActivity.unshift({ at: new Date().toISOString(), persona: 'compliance', session: true,
          text: `Submitted ${submissions.length} item${submissions.length>1?'s':''} to DNV for review.` });
      }
    });
    window.toast(`${submissions.length} submission${submissions.length>1?'s':''} sent to DNV`);
  });
};

function certDetailHTML(cert) {
  const uploaded = cert.uploadedDocs.length > 0;
  return `
    <div class="card p-6 space-y-5">
      <div>
        <div class="flex items-center justify-between">
          <div class="font-semibold text-lg">${cert.name}</div>
          ${window.statusPill(cert.status)}
        </div>
        <div class="text-xs text-slate-400 mt-1">${cert.regulation} · criticality: ${cert.criticality}</div>
      </div>

      ${cert.status !== 'compliant' && cert.status !== 'approved' ? `
        <div class="grid grid-cols-3 gap-3 text-sm">
          <div class="bg-slate-900/50 rounded-lg p-3"><div class="text-xs text-slate-400">Est. cost</div><div class="font-medium">€${cert.costMin.toLocaleString()} – ${cert.costMax.toLocaleString()}</div></div>
          <div class="bg-slate-900/50 rounded-lg p-3"><div class="text-xs text-slate-400">Timeline</div><div class="font-medium">${cert.timelineWeeks[0]}–${cert.timelineWeeks[1]} weeks</div></div>
          <div class="bg-slate-900/50 rounded-lg p-3"><div class="text-xs text-slate-400">Criticality</div><div class="font-medium capitalize">${cert.criticality}</div></div>
        </div>
      ` : ''}

      <div>
        <div class="text-sm text-slate-400 mb-1">Gap analysis</div>
        <div class="text-slate-200 text-sm leading-relaxed">${cert.gapAnalysis}</div>
      </div>

      <div>
        <div class="text-sm text-slate-400 mb-2">Required documents</div>
        <div class="grid grid-cols-2 gap-2">
          ${cert.requiredDocs.map(d => `
            <div class="flex items-center gap-2 bg-slate-900/50 rounded px-3 py-2 text-sm">
              <i data-lucide="${cert.uploadedDocs.some(u => u.toLowerCase().includes(d.split(' ')[0].toLowerCase())) ? 'check-circle-2' : 'circle-dashed'}" class="w-4 h-4 ${uploaded?'text-teal-300':'text-slate-500'}"></i>
              <span>${d}</span>
            </div>
          `).join('')}
        </div>
      </div>

      ${cert.status === 'compliant' || cert.status === 'approved' ? `
        <div class="flex items-center gap-2 text-teal-300 text-sm">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          Fully compliant. No action required.
        </div>
      ` : cert.status === 'pending-review' ? `
        ${cert.aiFindings && cert.aiFindings.length ? `
          <div class="findings-card bg-teal-400/5 border border-teal-400/25 rounded-lg p-4">
            <div class="flex items-center gap-2 text-teal-300 font-medium mb-2">
              <i data-lucide="sparkles" class="w-4 h-4"></i> AI findings
            </div>
            <div class="space-y-1.5">
              ${cert.aiFindings.map(f => `
                <div class="flex items-start gap-2 text-sm">
                  <span class="mt-0.5 ${f.kind==='warn'?'text-amber-300':'text-teal-300'}">${f.kind==='warn'?'⚠':'✓'}</span>
                  <span class="text-slate-200">${f.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        <div class="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
          <div class="flex items-center gap-2 text-sky-300 font-medium"><i data-lucide="clock" class="w-4 h-4"></i> Pre-validated · Awaiting DNV review</div>
          <div class="text-sm text-slate-300 mt-1">Uploaded: ${cert.uploadedDocs.join(', ')}</div>
        </div>
      ` : `
        <div>
          <div class="text-sm text-slate-400 mb-2">Upload supporting documents</div>
          <div class="dropzone rounded-xl p-10 text-center cursor-pointer">
            <i data-lucide="upload-cloud" class="w-8 h-8 mx-auto text-slate-400 mb-2"></i>
            <div class="text-slate-300 font-medium">Drop documents here</div>
            <div class="text-xs text-slate-500 mt-1">or click to simulate upload</div>
          </div>
          <div class="ai-panel mt-4"></div>
        </div>
      `}
    </div>
  `;
}

window.ComplianceViews.submissions = function (root) {
  const ent = entity();
  const subs = window.demoState.dnvQueue.filter(s => s.submittedBy === ent.name);
  const completed = window.demoState.completedReviews.filter(r => r.submittedBy === ent.name);
  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Submissions</h1>
      <div class="text-slate-400 text-sm mt-1">Items sent for DNV review.</div>
    </div>
    <div class="card p-5 mb-5">
      <div class="font-medium mb-3">Pending DNV review (${subs.length})</div>
      ${subs.length === 0 ? '<div class="text-sm text-slate-500">No submissions pending.</div>' : subs.map(s => `
        <div class="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
          <div>
            <div class="text-sm font-medium">${s.certName}</div>
            <div class="text-xs text-slate-500">${s.vesselName} · ${s.componentName} · submitted ${s.session ? 'just now' : window.fmtRelative(s.submittedAt)}</div>
          </div>
          <span class="pill pill-info">Pending</span>
        </div>
      `).join('')}
    </div>
    <div class="card p-5">
      <div class="font-medium mb-3">Recently approved (${completed.length})</div>
      ${completed.length === 0 ? '<div class="text-sm text-slate-500">No approvals yet.</div>' : completed.map(r => `
        <div class="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
          <div>
            <div class="text-sm font-medium">${r.certName}</div>
            <div class="text-xs text-slate-500">${r.vesselName} · ${r.session ? 'just now' : window.fmtRelative(r.decidedAt)}</div>
          </div>
          <span class="pill pill-ok">Approved</span>
        </div>
      `).join('')}
    </div>
  `;
};
