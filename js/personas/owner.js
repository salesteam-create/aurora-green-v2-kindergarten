window.OwnerViews = {};

function vessel() { return window.demoState.vessels[window.demoState.selectedVesselId]; }

window.OwnerViews.dashboard = function (root) {
  const v = vessel();
  const initial = window.INITIAL_STATE.vessels[v.id];
  const valueDelta = v.currentValue - initial.currentValue;
  const scoreDelta = v.euReadinessScore - initial.euReadinessScore;
  const hasSessionGain = scoreDelta > 0 || valueDelta > 0;
  // Animate when score/value has changed since the last dashboard render (once per change).
  const prev = window.demoState._dashPrev || { score: v.euReadinessScore, value: v.currentValue };
  const fromScore = prev.score;
  const fromValue = prev.value;
  const shouldAnimate = hasSessionGain && (prev.score !== v.euReadinessScore || prev.value !== v.currentValue);
  window.demoState._dashPrev = { score: v.euReadinessScore, value: v.currentValue };

  root.innerHTML = `
    <div class="flex items-end justify-between mb-6">
      <div>
        <div class="text-sm text-slate-400">Good morning, Captain Rao</div>
        <h1 class="text-3xl font-semibold tracking-tight">${v.name} — Compliance Overview</h1>
        <div class="text-slate-400 text-sm mt-1">${v.type} · IMO ${v.imo} · ${v.flag} → ${v.targetMarket}</div>
      </div>
      <div class="flex gap-2">
        ${Object.values(window.demoState.vessels).map(x => `
          <button data-vid="${x.id}" class="vessel-btn px-3 py-1.5 rounded-lg text-sm border ${x.id===v.id?'border-teal-400 text-teal-300 bg-teal-400/10':'border-slate-700 text-slate-300'}">${x.name}</button>
        `).join('')}
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="card p-6 col-span-4 flex flex-col items-center justify-center" id="ring-card">
        ${window.scoreRing(v.euReadinessScore, 180, 'EU Readiness Score')}
        ${scoreDelta > 0 ? `<div class="mt-2 pill pill-ok inline-block ${shouldAnimate ? 'badge-glow' : ''}">+${scoreDelta} pts since start</div>` : ''}
      </div>

      <div class="card p-6 col-span-4">
        <div class="text-sm text-slate-400">Current estimated value</div>
        <div class="text-3xl font-semibold mt-1" id="current-value">${window.fmtEUR(v.currentValue)}</div>
        <div class="mt-2 text-sm text-slate-400">Projected at 100% compliance</div>
        <div class="text-xl text-teal-300 font-semibold">${window.fmtEUR(v.projectedValue)}</div>
        ${valueDelta > 0 ? `<div class="mt-3 text-teal-300 text-sm inline-block ${shouldAnimate ? 'badge-glow' : ''}" style="padding:2px 8px;border-radius:999px;background:rgba(45,212,191,.12);">▲ ${window.fmtEUR(valueDelta)} since start of demo</div>` : '<div class="mt-3 text-slate-500 text-sm">€' + ((v.projectedValue-v.currentValue)/1e6).toFixed(0) + 'M unlocked when fully compliant</div>'}
      </div>

      <div class="card p-6 col-span-4">
        <div class="text-sm text-slate-400 mb-3">Critical gaps</div>
        <div class="text-4xl font-semibold text-rose-400">${v.criticalGaps}</div>
        <div class="text-xs text-slate-500 mt-1">${v.criticalGaps === 0 ? 'All critical items addressed.' : 'Items blocking EU market readiness.'}</div>
        <div class="text-xs text-slate-500 mt-1 italic">Non-critical items tracked in Asset Value.</div>
        <div class="mt-5 space-y-2.5">
          ${collectCriticalGaps(v).map(g => `
            <div class="flex items-start justify-between text-sm gap-2">
              <div class="min-w-0 flex-1">
                <div class="text-slate-300 truncate">${g.name}</div>
                <div class="text-xs text-slate-500 truncate">${g._componentName}</div>
              </div>
              ${window.statusPill(g.status)}
            </div>
          `).join('') || '<div class="text-xs text-teal-300">All critical regulations in good standing.</div>'}
        </div>
      </div>

      <div class="card p-6 col-span-8">
        <div class="flex items-center justify-between mb-3">
          <div class="font-medium">Compliance trend</div>
          <div class="text-xs text-slate-500">Last 6 months · EU Readiness %</div>
        </div>
        <div style="height:240px"><canvas id="trendChart"></canvas></div>
      </div>

      <div class="card p-6 col-span-4">
        <div class="flex items-center justify-between mb-3">
          <div class="font-medium">Recent activity</div>
          ${window.demoState.recentActivity.length > 4 ? `<button id="view-all-activity" class="text-xs text-teal-300 hover:text-teal-200">View all (${window.demoState.recentActivity.length})</button>` : ''}
        </div>
        <div class="space-y-3">
          ${window.demoState.recentActivity.slice(0, 4).map(a => `
            <div class="flex gap-3">
              <div class="w-2 h-2 mt-1.5 rounded-full ${a.persona==='dnv'?'bg-teal-400':a.persona==='compliance'?'bg-amber-400':'bg-slate-500'}"></div>
              <div class="text-sm"><div class="text-slate-200">${a.text}</div><div class="text-xs text-slate-500">${a.session ? 'just now' : window.fmtRelative(a.at)}</div></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card p-6 col-span-12">
        <div class="font-medium mb-4">Component status</div>
        <div class="grid grid-cols-4 gap-3">
          ${Object.values(v.components).map(c => {
            const topCert = c.certifications.slice().sort((a,b) => {
              const rank = { 'missing': 0, 'partial': 1, 'pending-review': 2, 'approved': 3, 'compliant': 3 };
              return (rank[a.status] ?? 9) - (rank[b.status] ?? 9);
            })[0];
            const entName = window.demoState.compliantEntities[c.assignedTo]?.name || '—';
            return `
            <div class="comp-card bg-slate-900/50 rounded-lg p-3 border border-slate-800 cursor-pointer hover:border-teal-400/50 transition-colors" data-comp-click="${c.id}">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium">${c.name}</div>
                ${window.statusPill(c.status)}
              </div>
              <div class="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                <div class="h-full" style="width:${c.score}%;background:${c.score>=80?'#2dd4bf':c.score>=60?'#f59e0b':'#fb7185'}; transition:width 1s"></div>
              </div>
              <div class="mt-1 text-xs text-slate-400">${c.score}% complete</div>
              <div class="comp-tooltip text-xs">
                <div class="text-slate-400">Assigned entity</div>
                <div class="text-slate-100 font-medium mb-2">${entName}</div>
                <div class="text-slate-400">Top regulation</div>
                <div class="text-slate-100 font-medium mb-2 truncate">${topCert ? topCert.name : '—'}</div>
                <div class="text-teal-300">Click for details →</div>
              </div>
            </div>
          `;}).join('')}
        </div>
      </div>
    </div>
    <div id="comp-modal-root"></div>
  `;
  window.renderTrendChart('trendChart', window.demoState.scoreHistory, v.euReadinessScore);

  root.querySelectorAll('.vessel-btn').forEach(btn => btn.addEventListener('click', () => {
    window.demoState.selectedVesselId = btn.dataset.vid;
    window.render();
  }));
  const viewAll = document.getElementById('view-all-activity');
  viewAll && viewAll.addEventListener('click', () => window.toast('Full activity log opens in operations console.'));

  // Component status card click -> modal.
  root.querySelectorAll('[data-comp-click]').forEach(el => el.addEventListener('click', () => {
    openComponentModal(v.components[el.dataset.compClick]);
  }));

  // Post-approval animations.
  if (shouldAnimate) {
    // Ring: animate from old dashoffset to new.
    const ringFill = root.querySelector('#ring-card .ring-fill');
    const ringText = root.querySelector('#ring-card svg text');
    if (ringFill) {
      const r = parseFloat(ringFill.getAttribute('r'));
      const circ = 2 * Math.PI * r;
      const oldOffset = circ * (1 - Math.max(0, Math.min(100, fromScore)) / 100);
      const newOffset = circ * (1 - Math.max(0, Math.min(100, v.euReadinessScore)) / 100);
      // Snap to old without transition, then animate to new.
      ringFill.style.transition = 'none';
      ringFill.setAttribute('stroke-dashoffset', oldOffset);
      // force reflow, then enable transition
      void ringFill.getBoundingClientRect();
      ringFill.style.transition = '';
      requestAnimationFrame(() => {
        ringFill.setAttribute('stroke-dashoffset', newOffset);
      });
      if (ringText) countUp(ringText, fromScore, v.euReadinessScore, 1000, (n) => String(n));
    }
    // Current value count-up.
    const valEl = document.getElementById('current-value');
    if (valEl) countUp(valEl, fromValue, v.currentValue, 1000, (n) => window.fmtEUR(n));
  }
};

function countUp(el, from, to, duration, fmt) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    // ease-out
    const eased = 1 - Math.pow(1 - t, 3);
    const v = Math.round(from + (to - from) * eased);
    el.textContent = fmt(v);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = fmt(to);
  };
  requestAnimationFrame(step);
}

function openComponentModal(c) {
  const mount = document.getElementById('comp-modal-root');
  if (!mount) return;
  const entName = window.demoState.compliantEntities[c.assignedTo]?.name || '—';
  mount.innerHTML = `
    <div class="modal-backdrop" id="comp-modal-backdrop">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="text-xs text-slate-400">Assigned to ${entName}</div>
            <div class="text-xl font-semibold">${c.name}</div>
            <div class="text-xs text-slate-400 mt-0.5">${c.score}% complete · ${c.certifications.length} regulations tracked</div>
          </div>
          <button id="comp-modal-close" class="text-slate-400 hover:text-slate-200 p-1" aria-label="Close">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="space-y-2">
          ${c.certifications.map(cert => `
            <div class="flex items-start justify-between bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div class="min-w-0 pr-3">
                <div class="text-sm text-slate-200 truncate">${cert.name}</div>
                <div class="text-xs text-slate-500 truncate">${cert.regulation}</div>
              </div>
              ${window.statusPill(cert.status)}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  const close = () => { mount.innerHTML = ''; };
  document.getElementById('comp-modal-backdrop').addEventListener('click', close);
  document.getElementById('comp-modal-close').addEventListener('click', close);
  const esc = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
  document.addEventListener('keydown', esc);
}

function collectCriticalGaps(v) {
  const out = [];
  Object.values(v.components).forEach(c => c.certifications.forEach(cert => {
    if (cert.criticality === 'critical' && cert.status !== 'compliant' && cert.status !== 'approved') {
      out.push({ ...cert, _componentName: c.name });
    }
  }));
  return out.slice(0, 4);
}

window.OwnerViews['digital-twin'] = function (root) {
  const v = vessel();
  const selectedId = window.demoState.selectedComponentId;
  const selectedComp = v.components[selectedId];
  const twin = window.renderDigitalTwin(v, (id) => {
    window.demoState.selectedComponentId = id;
    window.render();
  }, selectedId);

  root.innerHTML = `
    <div class="flex items-end justify-between mb-6">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Digital Twin · ${v.name}</h1>
        <div class="text-slate-400 text-sm mt-1">Click any zone for component detail.</div>
      </div>
      <div class="pill pill-info">Read-only · Owner view</div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-8" id="twin-mount">${twin.html}</div>
      <div class="card p-5 col-span-4">
        ${selectedComp ? `
          <div class="flex items-center justify-between">
            <div class="text-lg font-semibold">${selectedComp.name}</div>
            ${window.statusPill(selectedComp.status)}
          </div>
          <div class="mt-4">${window.scoreRing(selectedComp.score, 120, 'Component score')}</div>
          <div class="mt-4 text-sm text-slate-400">Assigned to</div>
          <div class="text-slate-200">${window.demoState.compliantEntities[selectedComp.assignedTo]?.name || '—'}</div>

          <div class="mt-5 text-sm text-slate-400 mb-2">Regulations tracked</div>
          <div class="space-y-2">
            ${selectedComp.certifications.map(c => `
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-300 truncate pr-2">${c.name}</span>
                ${window.statusPill(c.status)}
              </div>
            `).join('')}
          </div>
        ` : '<div class="text-slate-400 text-sm">Select a zone to inspect.</div>'}
      </div>
    </div>
  `;
  twin.wire(document.getElementById('twin-mount'));
};

window.OwnerViews['asset-value'] = function (root) {
  const v = vessel();
  const breakdown = collectValueBreakdown(v);
  root.innerHTML = `
    <div class="flex items-end justify-between mb-6">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Asset Value</h1>
        <div class="text-slate-400 text-sm mt-1">${v.name} · projected trajectory as gaps close.</div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="card p-6 col-span-4">
        <div class="text-sm text-slate-400">Current estimated value</div>
        <div class="text-4xl font-semibold mt-1">${window.fmtEUR(v.currentValue)}</div>
        <div class="mt-4 text-sm text-slate-400">Projected at 100% compliance</div>
        <div class="text-2xl text-teal-300 font-semibold">${window.fmtEUR(v.projectedValue)}</div>
        <div class="mt-1 text-xs text-slate-500">Upside: ${window.fmtEUR(v.projectedValue - v.currentValue)}</div>
        <div class="mt-5 text-sm text-slate-400">Nominal / reference</div>
        <div class="text-xl">${window.fmtEUR(v.nominalValue)}</div>
      </div>
      <div class="card p-6 col-span-8">
        <div class="font-medium mb-3">Value trajectory</div>
        <div style="height:280px"><canvas id="valueChart"></canvas></div>
      </div>

      <div class="col-span-12">
        <div class="flex items-center justify-between mb-3">
          <div class="font-medium">Value contribution by criterion</div>
          <div class="text-xs text-slate-500">Scientific Committee framework · weights ratified 2026-Q1</div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          ${criterionCards(v)}
        </div>
      </div>

      <div class="col-span-12">
        <details class="card p-5 group">
          <summary class="cursor-pointer text-sm text-slate-300 hover:text-teal-300 list-none flex items-center justify-between">
            <span>View regulation-level detail</span>
            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
          </summary>
          <div class="mt-4 grid grid-cols-2 gap-3">
            ${breakdown.map(b => `
              <div class="flex items-center justify-between bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <div>
                  <div class="text-slate-200">${b.name}</div>
                  <div class="text-xs text-slate-500">${b.regulation}</div>
                </div>
                <div class="text-right">
                  <div class="text-teal-300 font-semibold">+${window.fmtEUR(b.upside)}</div>
                  <div class="text-xs text-slate-500">${b.status === 'approved' || b.status === 'compliant' ? 'unlocked' : 'pending'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </details>
      </div>
    </div>
  `;
  window.renderValueChart('valueChart', v);
};

// Criterion-level breakdown for the Asset Value page.
// Visual ratio = compliantCount / total (drives bar color + X-of-Y label).
// Financial contribution uses CERT_WEIGHTS partial credit so currentContribution
// tracks vessel.currentValue once recomputeAll has run.
function criterionCards(v) {
  const fw = window.demoState.criteriaFramework || [];
  const floor = v.nominalValue * 0.80;
  const totalUpside = v.projectedValue - floor;
  const W = { missing: 0, partial: 50, 'pending-review': 75, compliant: 100, approved: 100 };

  const certsById = {};
  Object.values(v.components).forEach(c => {
    c.certifications.forEach(cert => { certsById[cert.id] = cert; });
  });

  return fw.map(crit => {
    const items = crit.certIds.map(id => certsById[id]).filter(Boolean);
    const total = items.length;
    if (total === 0) return ''; // criterion has no regs on this vessel
    const compliantCount = items.filter(c => c.status === 'compliant' || c.status === 'approved').length;
    const displayPct = Math.round((compliantCount / total) * 100);
    const mathRatio = items.reduce((s, c) => s + (W[c.status] ?? 0), 0) / total / 100;
    const projectedContribution = crit.weight * v.projectedValue;
    const currentContribution = crit.weight * (floor + totalUpside * mathRatio);
    const barColor = displayPct >= 80 ? '#2dd4bf' : displayPct >= 60 ? '#f59e0b' : '#fb7185';
    const weightPct = Math.round(crit.weight * 100);

    return `
      <div class="card p-5 col-span-4">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="font-semibold">${crit.name}</div>
          <span class="pill" style="background:rgba(45,212,191,.12);color:#5eead4;border:1px solid rgba(45,212,191,.3);">${weightPct}%</span>
        </div>
        <div class="text-xs text-slate-400 mb-2">${compliantCount} of ${total} regulations compliant</div>
        <div class="h-1.5 rounded-full bg-slate-800 overflow-hidden mb-4">
          <div class="h-full" style="width:${displayPct}%;background:${barColor};transition:width .8s"></div>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-xs text-slate-500">Current contribution</div>
            <div class="text-lg font-semibold text-slate-100">${window.fmtEUR(currentContribution)}</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-slate-500">At 100%</div>
            <div class="text-sm text-teal-300 font-semibold">${window.fmtEUR(projectedContribution)}</div>
          </div>
        </div>
        <details class="mt-4 group">
          <summary class="cursor-pointer text-xs text-slate-400 hover:text-teal-300 list-none flex items-center gap-1">
            <i data-lucide="chevron-right" class="w-3 h-3 transition-transform group-open:rotate-90"></i>
            <span>${total} regulation${total === 1 ? '' : 's'}</span>
          </summary>
          <div class="mt-2 space-y-1.5">
            ${items.map(c => `
              <div class="flex items-center justify-between gap-2 text-xs">
                <div class="text-slate-300 truncate">${c.name}</div>
                ${window.statusPill(c.status)}
              </div>
            `).join('')}
          </div>
        </details>
      </div>
    `;
  }).join('');
}

function collectValueBreakdown(v) {
  const initial = window.INITIAL_STATE.vessels[v.id];
  const isDone = (s) => s === 'compliant' || s === 'approved';
  const weight = (c) => c.criticality === 'critical' ? 3 : c.criticality === 'high' ? 2 : 1;

  const unlocked = [];
  const pending = [];
  Object.values(v.components).forEach(c => {
    const initComp = initial.components[c.id];
    c.certifications.forEach(cert => {
      const initCert = initComp && initComp.certifications.find(x => x.id === cert.id);
      const wasDone = initCert ? isDone(initCert.status) : false;
      const nowDone = isDone(cert.status);
      if (!wasDone && nowDone) unlocked.push(cert);
      else if (!nowDone) pending.push(cert);
    });
  });

  const sessionGain = Math.max(0, v.currentValue - initial.currentValue);
  const remainingUpside = Math.max(0, v.projectedValue - v.currentValue);

  const distribute = (items, pool) => {
    if (!items.length || pool <= 0) return items.map(c => ({ cert: c, upside: 0 }));
    const totalW = items.reduce((s, c) => s + weight(c), 0);
    let spent = 0;
    return items.map((c, i) => {
      let up;
      if (i === items.length - 1) up = pool - spent;
      else { up = Math.round(pool * weight(c) / totalW); spent += up; }
      return { cert: c, upside: up };
    });
  };

  const toRow = (status) => ({ cert, upside }) => ({
    name: cert.name, regulation: cert.regulation, status: cert.status, upside, kind: status,
  });

  return [
    ...distribute(unlocked, sessionGain).map(toRow('unlocked')),
    ...distribute(pending, remainingUpside).map(toRow('pending')),
  ];
}

window.OwnerViews.reports = function (root) {
  const v = vessel();
  const reports = [
    { name: 'Compliance Report — April 2026', type: 'Quarterly', date: '2026-04-01', pages: 32 },
    { name: 'Digital Twin Passport', type: 'Certificate', date: '2026-03-15', pages: 18 },
    { name: 'EU Readiness Gap Analysis', type: 'Advisory', date: '2026-03-10', pages: 24 },
    { name: 'Asset Valuation Memo', type: 'Financial', date: '2026-02-28', pages: 9 },
  ];
  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Reports</h1>
      <div class="text-slate-400 text-sm mt-1">Formal documents for ${v.name}. Share with insurers, lenders, and class society.</div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${reports.map(r => `
        <div class="card p-5 flex items-center justify-between card-hover">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-lg bg-teal-400/10 flex items-center justify-center">
              <i data-lucide="file-text" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <div class="font-medium">${r.name}</div>
              <div class="text-xs text-slate-400">${r.type} · ${window.fmtDateShort(r.date)} · ${r.pages} pp.</div>
            </div>
          </div>
          <button class="dl-btn px-3 py-1.5 text-sm rounded-md border border-slate-700 hover:border-teal-400 hover:text-teal-300" data-name="${r.name}">Download</button>
        </div>
      `).join('')}
    </div>
  `;
  root.querySelectorAll('.dl-btn').forEach(b => b.addEventListener('click', () => {
    window.toast(`Download started · ${b.dataset.name}.pdf`);
  }));
};
