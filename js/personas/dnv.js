window.DnvViews = {};

// ---------------------------------------------------------------------------
// PA Due Diligence Overview (Module 1)
// Tells the authority WHERE to inspect: a stylised map of monitored entities,
// an aggregate compliance figure, and preventive alerts that turn into targeted
// audit recommendations. Clicking a pin opens a light modal, not a vault.
// ---------------------------------------------------------------------------

function overviewFilters() {
  const f = window.demoState.overviewFilters || { region: 'all', entityType: 'all' };
  window.demoState.overviewFilters = f;
  return f;
}

function monitoredEntities() {
  const f = overviewFilters();
  return Object.values(window.demoState.vessels).filter(v =>
    (f.region === 'all' || v.region === f.region) &&
    (f.entityType === 'all' || v.entityType === f.entityType));
}

// Triage an entity for the authority.
//
// The whole point of this module is *targeted* audits, so the bar for sending an
// inspector has to be higher than "has any open item" -- otherwise every entity
// gets flagged and the ranking tells the authority nothing. A single critical gap
// on an otherwise strong entity is a letter, not a site visit.
//
//   high   -> targeted audit: compliance below 60, or two or more critical gaps,
//             or a critical gap on an entity already under 70
//   medium -> enhanced monitoring: an open critical gap, or criteria lapsing soon
//   none   -> routine monitoring
function assessEntity(v) {
  const reasons = [];
  if (v.euReadinessScore < 60) {
    reasons.push({ severity: 'high', text: `Compliance at ${v.euReadinessScore}%, below the 60% threshold` });
  }
  if (v.criticalGaps > 0) {
    reasons.push({
      severity: v.criticalGaps >= 2 ? 'high' : 'medium',
      text: `${v.criticalGaps} unresolved critical gap${v.criticalGaps === 1 ? '' : 's'}`,
    });
  }
  const proj = window.computeDecayProjection(v.id, 3);
  if (proj && proj.atRiskCerts.length) {
    reasons.push({
      severity: 'medium',
      text: `${proj.atRiskCerts.length} criteri${proj.atRiskCerts.length === 1 ? 'on' : 'a'} expiring within 90 days`,
    });
  }

  let priority = 'none';
  if (reasons.some(r => r.severity === 'high')
      || (v.criticalGaps > 0 && v.euReadinessScore < 70)) {
    priority = 'high';
  } else if (reasons.length) {
    priority = 'medium';
  }

  // Sort high reasons first so the summary line leads with the worst.
  reasons.sort((a, b) => (a.severity === 'high' ? 0 : 1) - (b.severity === 'high' ? 0 : 1));
  return { priority, reasons };
}

const PRIORITY = {
  high:   { label: 'Targeted audit',      pill: 'pill-bad',  colour: '#fb7185' },
  medium: { label: 'Enhanced monitoring', pill: 'pill-warn', colour: '#f59e0b' },
};

function statTile(label, value, sub, tone) {
  return `
    <div class="card p-4">
      <div class="text-xs text-slate-500 uppercase tracking-wide">${label}</div>
      <div class="text-3xl font-semibold mt-1 ${tone || 'text-slate-100'}">${value}</div>
      ${sub ? `<div class="text-xs text-slate-400 mt-0.5">${sub}</div>` : ''}
    </div>`;
}

function chipRow(label, key, options) {
  const active = overviewFilters()[key];
  return `
    <div class="flex items-center gap-2">
      <span class="text-xs text-slate-500 uppercase tracking-wide w-20">${label}</span>
      ${options.map(o => `
        <button class="px-3 py-1 rounded-full text-xs border transition-colors ${
          o.value === active
            ? 'border-teal-400 text-teal-300 bg-teal-400/10'
            : 'border-slate-700 text-slate-400 hover:border-slate-500'
        }" data-filter-key="${key}" data-filter-value="${o.value}">${o.label}</button>`).join('')}
    </div>`;
}

function entityModal(v) {
  const band = window.complianceBand(v.euReadinessScore);
  const { priority, reasons } = assessEntity(v);
  const areas = Object.values(v.components).slice().sort((a, b) => a.score - b.score);
  const root = document.getElementById('overview-modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" id="ov-backdrop">
      <div class="modal-card" style="min-width:520px">
        <div class="flex items-start justify-between gap-6">
          <div>
            <div class="text-lg font-semibold text-slate-100">${v.name}</div>
            <div class="text-xs text-slate-400 mt-1">
              ${window.entityTypeLabel(v.entityType)} · ${v.city}, ${v.region}, ${v.country} · Reg. no ${v.imo}
            </div>
          </div>
          <button id="ov-close" class="text-slate-500 hover:text-slate-200 text-xl leading-none">&times;</button>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-5">
          <div class="bg-slate-900/50 rounded-lg p-3">
            <div class="text-xs text-slate-400">Compliance</div>
            <div class="text-2xl font-semibold" style="color:${band.colour}">${v.euReadinessScore}%</div>
          </div>
          <div class="bg-slate-900/50 rounded-lg p-3">
            <div class="text-xs text-slate-400">Critical gaps</div>
            <div class="text-2xl font-semibold ${v.criticalGaps ? 'text-rose-300' : 'text-teal-300'}">${v.criticalGaps}</div>
          </div>
          <div class="bg-slate-900/50 rounded-lg p-3">
            <div class="text-xs text-slate-400">Domains tracked</div>
            <div class="text-2xl font-semibold text-slate-100">${areas.length}</div>
          </div>
        </div>

        ${priority !== 'none' ? (() => {
          const p = PRIORITY[priority];
          const rgb = priority === 'high' ? '251,113,133' : '245,158,11';
          return `
          <div class="mt-4 rounded-lg p-4 border" style="border-color:rgba(${rgb},.35);background:rgba(${rgb},.06)">
            <div class="flex items-center gap-2 font-medium text-sm mb-2" style="color:${p.colour}">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i>
              ${priority === 'high' ? 'Targeted audit recommended' : 'Enhanced monitoring recommended'}
            </div>
            <ul class="space-y-1">
              ${reasons.map(r => `<li class="text-sm text-slate-200">· ${r.text}</li>`).join('')}
            </ul>
          </div>`;
        })()
        : `
          <div class="mt-4 flex items-center gap-2 text-teal-300 text-sm">
            <i data-lucide="shield-check" class="w-4 h-4"></i> No preventive alerts. Routine monitoring only.
          </div>`}

        <div class="mt-5">
          <div class="text-sm text-slate-400 mb-2">Weakest domains</div>
          <div class="space-y-2">
            ${areas.slice(0, 4).map(c => `
              <div class="flex items-center gap-3">
                <div class="text-sm text-slate-300 flex-1 truncate">${c.name}</div>
                <div class="w-28 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div class="h-full" style="width:${c.score}%;background:${window.complianceBand(c.score).colour}"></div>
                </div>
                <div class="text-xs text-slate-400 w-9 text-right">${c.score}%</div>
              </div>`).join('')}
          </div>
        </div>

        <div class="text-xs text-slate-500 italic mt-5">
          Overview is read-only. Entity evidence is held in its own Private Vault.
        </div>
      </div>
    </div>`;
  lucide.createIcons();

  const close = () => { root.innerHTML = ''; };
  document.getElementById('ov-close').addEventListener('click', close);
  document.getElementById('ov-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'ov-backdrop') close();
  });
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
}

window.DnvViews.overview = function (root) {
  const all = Object.values(window.demoState.vessels);
  const shown = monitoredEntities();
  const f = overviewFilters();

  const avg = shown.length
    ? Math.round(shown.reduce((s, v) => s + v.euReadinessScore, 0) / shown.length)
    : 0;
  const totalCritical = shown.reduce((s, v) => s + v.criticalGaps, 0);
  const assessed = shown.map(v => ({ v, ...assessEntity(v) }));
  const targeted = assessed.filter(a => a.priority === 'high');
  const flagged = assessed
    .filter(a => a.priority !== 'none')
    .sort((a, b) => (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1)
                 || a.v.euReadinessScore - b.v.euReadinessScore);

  const regions = ['all', ...Array.from(new Set(all.map(v => v.region)))];
  const types = ['all', ...Array.from(new Set(all.map(v => v.entityType)))];

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">PA Due Diligence Overview</h1>
      <div class="text-slate-400 text-sm mt-1">
        Where to inspect — aggregate compliance across monitored entities, with preventive alerts driving targeted audits.
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-5">
      ${statTile('Aggregate compliance', avg + '%', shown.length + ' of ' + all.length + ' entities in view', 'text-slate-100')}
      ${statTile('Critical gaps', totalCritical, 'across entities in view', totalCritical ? 'text-rose-300' : 'text-teal-300')}
      ${statTile('Targeted audits', targeted.length,
        flagged.length > targeted.length ? `+ ${flagged.length - targeted.length} under monitoring` : 'entities needing a site visit',
        targeted.length ? 'text-rose-300' : 'text-teal-300')}
      ${statTile('Lowest scoring', shown.length ? Math.min(...shown.map(v => v.euReadinessScore)) + '%' : '—',
        shown.length ? shown.slice().sort((a, b) => a.euReadinessScore - b.euReadinessScore)[0].name : '', 'text-rose-300')}
    </div>

    <div class="card p-5 mb-5">
      <div class="flex flex-col gap-3 mb-5">
        ${chipRow('Region', 'region', regions.map(r => ({ value: r, label: r === 'all' ? 'All regions' : r })))}
        ${chipRow('Type', 'entityType', types.map(t => ({ value: t, label: t === 'all' ? 'All types' : window.entityTypeLabel(t) })))}
      </div>
      <div id="overview-map-mount">
        ${shown.length ? '' : '<div class="text-sm text-slate-400 py-8 text-center">No entities match this filter.</div>'}
      </div>
    </div>

    <div class="card p-5">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-9 h-9 rounded-lg bg-rose-400/15 flex items-center justify-center">
          <i data-lucide="siren" class="w-5 h-5 text-rose-300"></i>
        </div>
        <div>
          <div class="font-medium text-slate-100">Preventive Non-Compliance Alerts</div>
          <div class="text-xs text-slate-400">Entities where a targeted audit is recommended</div>
        </div>
      </div>
      ${flagged.length ? `
        <div class="space-y-2">
          ${flagged.map(({ v, priority, reasons }) => {
            const p = PRIORITY[priority];
            return `
            <div class="flex items-start gap-3 rounded-lg p-3 bg-slate-900/50 cursor-pointer hover:bg-slate-900/80 transition-colors" data-alert-entity="${v.id}">
              <span class="mt-1.5 text-xs" style="color:${p.colour}">●</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-slate-100">${v.name}</span>
                  <span class="pill ${p.pill}">${p.label}</span>
                </div>
                <div class="text-xs text-slate-500 mt-0.5">${window.entityTypeLabel(v.entityType)} · ${v.region}, ${v.country}</div>
                <div class="text-xs mt-1 text-slate-300">${reasons.map(r => r.text).join(' · ')}</div>
              </div>
              <div class="text-sm font-semibold shrink-0" style="color:${window.complianceBand(v.euReadinessScore).colour}">${v.euReadinessScore}%</div>
            </div>`;
          }).join('')}
        </div>`
      : '<div class="text-sm text-slate-400">No preventive alerts for the entities in view.</div>'}
    </div>

    <div id="overview-modal-root"></div>
  `;

  if (shown.length) {
    window.renderOverviewMap(document.getElementById('overview-map-mount'), shown, (id) => {
      entityModal(window.demoState.vessels[id]);
    });
  }

  root.querySelectorAll('[data-filter-key]').forEach(btn => btn.addEventListener('click', () => {
    const fl = overviewFilters();
    fl[btn.dataset.filterKey] = btn.dataset.filterValue;
    window.render();
  }));

  root.querySelectorAll('[data-alert-entity]').forEach(el => el.addEventListener('click', () => {
    entityModal(window.demoState.vessels[el.dataset.alertEntity]);
  }));
};

window.DnvViews['review-queue'] = function (root) {
  const q = window.demoState.dnvQueue.filter(s => s.status === 'pending');
  const selId = window.demoState.selectedSubmissionId && q.find(s => s.id === window.demoState.selectedSubmissionId) ? window.demoState.selectedSubmissionId : (q[0]?.id || null);
  const sub = q.find(s => s.id === selId);

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Review Queue</h1>
      <div class="text-slate-400 text-sm mt-1">${q.length} pre-validated submissions awaiting review.</div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-5 space-y-2">
        ${q.length === 0 ? '<div class="card p-6 text-sm text-slate-400">Queue is clear.</div>' : q.map(s => `
          <div class="card p-4 cursor-pointer ${s.id===selId?'border-teal-400':''}" data-sid="${s.id}">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium pr-2">${s.certName}</div>
              <span class="pill pill-info">Pending</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">${s.vesselName} · ${s.componentName}</div>
            <div class="text-xs text-slate-500 mt-2">${s.submittedBy} · ${s.session ? 'just now' : window.fmtRelative(s.submittedAt)}</div>
          </div>
        `).join('')}
      </div>
      <div class="col-span-7" id="sub-detail">
        ${sub ? submissionDetailHTML(sub) : '<div class="card p-6 text-slate-400 text-sm">Select a submission to review.</div>'}
      </div>
    </div>
  `;

  root.querySelectorAll('[data-sid]').forEach(el => el.addEventListener('click', () => {
    window.demoState.selectedSubmissionId = el.dataset.sid;
    window.render();
  }));

  if (sub) wireDecision(sub);
};

function submissionDetailHTML(s) {
  return `
    <div class="card p-6 space-y-5">
      <div>
        <div class="flex items-center justify-between">
          <div class="font-semibold text-lg">${s.certName}</div>
          <span class="pill pill-info">Pending review</span>
        </div>
        <div class="text-xs text-slate-400 mt-1">${s.vesselName} · ${s.componentName} · submitted ${s.session ? 'just now' : window.fmtRelative(s.submittedAt)} by ${s.submittedBy}</div>
      </div>

      <div>
        <div class="text-sm text-slate-400 mb-2">Uploaded documents</div>
        <div class="space-y-1.5">
          ${s.docs.map(d => `
            <div class="flex items-center gap-2 bg-slate-900/50 rounded px-3 py-2 text-sm">
              <i data-lucide="file-text" class="w-4 h-4 text-slate-400"></i>
              <span class="text-slate-200">${d}</span>
              <span class="ml-auto text-xs text-slate-500">PDF</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-teal-400/5 border border-teal-400/20 rounded-lg p-4">
        <div class="flex items-center gap-2 text-teal-300 font-medium mb-1">
          <i data-lucide="sparkles" class="w-4 h-4"></i> Aurora AI · Pre-validation summary
        </div>
        <div class="text-sm text-slate-200 leading-relaxed">${s.aiNotes}</div>
      </div>

      <div>
        <textarea id="reviewer-notes" class="w-full bg-slate-900/70 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-teal-400" rows="3" placeholder="Reviewer notes (optional)"></textarea>
      </div>

      <div class="flex items-center gap-3">
        <button id="approve" class="px-4 py-2 rounded-lg bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300">Approve</button>
        <button id="request-changes" class="px-4 py-2 rounded-lg border border-amber-500/50 text-amber-300 hover:bg-amber-500/10">Request changes</button>
        <button id="reject" class="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-rose-400 hover:text-rose-300">Reject</button>
      </div>
    </div>
  `;
}

function wireDecision(sub) {
  const approve = document.getElementById('approve');
  const reqch = document.getElementById('request-changes');
  const reject = document.getElementById('reject');

  approve && approve.addEventListener('click', () => decide(sub, 'approved'));
  reqch && reqch.addEventListener('click', () => decide(sub, 'changes-requested'));
  reject && reject.addEventListener('click', () => decide(sub, 'rejected'));
}

function decide(sub, decision) {
  const notesEl = document.getElementById('reviewer-notes');
  const reviewerNotes = (notesEl && notesEl.value.trim()) || '';

  window.updateState(state => {
    const queued = state.dnvQueue.find(x => x.id === sub.id);
    if (!queued) return;
    queued.status = decision;

    const v = state.vessels[sub.vesselId];
    if (v && v.components[sub.componentId]) {
      const cert = v.components[sub.componentId].certifications.find(c => c.id === sub.certId);
      if (cert) {
        if (decision === 'approved') cert.status = 'approved';
        else if (decision === 'changes-requested') cert.status = 'partial';
        else if (decision === 'rejected') cert.status = 'missing';
        // On non-approval, clear stale uploads/findings so the re-submit flow starts clean.
        // The submission itself already snapshotted these into sub.docs.
        if (decision !== 'approved') {
          cert.uploadedDocs = [];
          cert.aiFindings = [];
        }
      }
    }

    state.completedReviews.unshift({
      id: sub.id, vesselName: sub.vesselName,
      certId: sub.certId, certName: sub.certName,
      componentId: sub.componentId, componentName: sub.componentName,
      submittedBy: sub.submittedBy, decidedAt: new Date().toISOString(),
      decision, reviewerNotes, session: true,
    });
    state.dnvQueue = state.dnvQueue.filter(x => x.id !== sub.id);
    state.selectedSubmissionId = null;

    const verb = decision === 'approved' ? 'approved' : decision === 'rejected' ? 'rejected' : 'requested changes to';
    const noteSuffix = reviewerNotes
      ? `: ${reviewerNotes.length > 80 ? reviewerNotes.slice(0, 77) + '...' : reviewerNotes}`
      : '.';
    state.recentActivity.unshift({ at: new Date().toISOString(), persona: 'dnv', session: true,
      text: `Authority ${verb} ${sub.certName}${noteSuffix}` });
  });
  window.toast(`${sub.certName} · ${decision.replace('-', ' ')}`);
}

window.DnvViews.completed = function (root) {
  const items = window.demoState.completedReviews;
  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Completed Reviews</h1>
      <div class="text-slate-400 text-sm mt-1">${items.length} decisions on record.</div>
    </div>
    <div class="card p-5">
      ${items.length === 0 ? '<div class="text-sm text-slate-500">No completed reviews yet.</div>' : items.map(r => `
        <div class="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
          <div>
            <div class="text-sm font-medium">${r.certName}</div>
            <div class="text-xs text-slate-500">${r.vesselName} · ${r.submittedBy} · ${r.session ? 'just now' : window.fmtRelative(r.decidedAt)}</div>
          </div>
          <span class="pill ${r.decision==='approved'?'pill-ok':r.decision==='rejected'?'pill-bad':'pill-warn'}">${r.decision.replace('-',' ')}</span>
        </div>
      `).join('')}
    </div>
  `;
};
