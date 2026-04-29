window.ScientificViews = {};

function fmtDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function pageHeader(title, subline) {
  return `
    <div class="mb-6">
      <div class="text-sm text-slate-400">Scientific Committee · Aurora Vault</div>
      <h1 class="text-3xl font-semibold tracking-tight">${title}</h1>
      <div class="text-slate-400 text-sm mt-1">${subline}</div>
    </div>
  `;
}

function weightPill(weight) {
  const pct = Math.round(weight * 100);
  return `<span class="pill" style="background:rgba(45,212,191,.12);color:#5eead4;border:1px solid rgba(45,212,191,.3);">${pct}% of asset value</span>`;
}

window.ScientificViews.framework = function (root) {
  const fw = window.demoState.criteriaFramework || [];
  root.innerHTML = `
    ${pageHeader('Compliance Criteria Framework',
      'Ratified by the Scientific Committee. Each criterion weights regulations and feeds the asset value model.')}

    <div class="grid grid-cols-12 gap-5">
      ${fw.map(c => `
        <div class="card p-6 col-span-4">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="text-lg font-semibold">${c.name}</div>
            ${weightPill(c.weight)}
          </div>
          <div class="text-sm text-slate-400 leading-relaxed mb-4">${c.description}</div>
          <div class="text-xs text-slate-500 pt-3 border-t border-slate-800">
            Ratified ${fmtDateShort(c.ratifiedAt)} · ${c.certIds.length} regulations covered
          </div>
        </div>
      `).join('')}
    </div>

    <div class="mt-6 text-xs text-slate-500">
      Last review: 2026-Q1 · Next review: 2026-Q3
    </div>
  `;
};

// Build a flat index from cert id → { vesselName, certName, status, componentName }.
function indexCerts() {
  const idx = {};
  Object.values(window.demoState.vessels).forEach(v => {
    Object.values(v.components).forEach(comp => {
      comp.certifications.forEach(cert => {
        (idx[cert.id] = idx[cert.id] || []).push({
          vesselId: v.id, vesselName: v.name,
          componentName: comp.name,
          certName: cert.name, status: cert.status,
        });
      });
    });
  });
  return idx;
}

function isCompliantStatus(s) {
  return s === 'compliant' || s === 'approved';
}

window.ScientificViews.coverage = function (root) {
  const fw = window.demoState.criteriaFramework || [];
  const idx = indexCerts();

  root.innerHTML = `
    ${pageHeader('Coverage',
      'Which regulations sit under which pillar, and where evidence is currently thin.')}

    <div class="space-y-5">
      ${fw.map(c => {
        const entries = c.certIds.flatMap(id => (idx[id] || []).map(e => ({ ...e, certId: id })));
        const total = entries.length;
        const compliant = entries.filter(e => isCompliantStatus(e.status)).length;
        const pct = total ? Math.round((compliant / total) * 100) : 0;
        const barColor = pct >= 80 ? '#2dd4bf' : pct >= 50 ? '#f59e0b' : '#fb7185';

        // Group entries by vessel.
        const byVessel = {};
        entries.forEach(e => {
          (byVessel[e.vesselId] = byVessel[e.vesselId] || { name: e.vesselName, items: [] }).items.push(e);
        });

        return `
          <div class="card p-6">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div class="flex items-center gap-3">
                <div class="text-lg font-semibold">${c.name}</div>
                ${weightPill(c.weight)}
              </div>
              <div class="text-sm text-slate-400">${compliant} of ${total} compliant</div>
            </div>
            <div class="h-1.5 rounded-full bg-slate-800 overflow-hidden mb-5">
              <div class="h-full" style="width:${pct}%;background:${barColor}"></div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              ${Object.values(byVessel).map(grp => `
                <div>
                  <div class="text-xs uppercase tracking-wide text-slate-500 mb-2">${grp.name}</div>
                  <div class="space-y-1.5">
                    ${grp.items.map(e => `
                      <div class="flex items-center justify-between gap-3 text-sm">
                        <div class="min-w-0 flex-1">
                          <div class="text-slate-200 truncate">${e.certName}</div>
                          <div class="text-xs text-slate-500 truncate">${e.componentName}</div>
                        </div>
                        ${window.statusPill(e.status)}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};
