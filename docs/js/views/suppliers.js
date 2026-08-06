window.renderSuppliers = function (root) {
  const vault = window.demoState.privateVaults[window.demoState.currentVaultId];
  if (!vault) {
    root.innerHTML = '<div class="text-slate-400 p-6">Select a vault first.</div>';
    return;
  }

  const total = (c) => (c.compliant || 0) + (c.pending || 0) + (c.missing || 0);
  const pct = (c) => { const t = total(c); return t ? Math.round((c.compliant || 0) / t * 100) : 0; };

  // Rank by open items first — the point of this page is who needs chasing,
  // not who contributed the most value.
  const suppliers = (vault.suppliers || []).slice().sort((a, b) =>
    ((b.certCounts.pending + b.certCounts.missing) - (a.certCounts.pending + a.certCounts.missing))
    || (pct(a.certCounts) - pct(b.certCounts)));

  const allCounts = suppliers.reduce((a, s) => ({
    compliant: a.compliant + (s.certCounts.compliant || 0),
    pending: a.pending + (s.certCounts.pending || 0),
    missing: a.missing + (s.certCounts.missing || 0),
  }), { compliant: 0, pending: 0, missing: 0 });
  const allTotal = total(allCounts);

  const statCard = (label, value, sub, tone) => `
    <div class="card p-4">
      <div class="text-xs text-slate-500 uppercase tracking-wide">${label}</div>
      <div class="text-2xl font-semibold mt-1 ${tone || 'text-slate-100'}">${value}</div>
      ${sub ? `<div class="text-xs text-slate-400 mt-0.5">${sub}</div>` : ''}
    </div>`;

  const certDots = (c) => {
    const parts = [];
    if (c.compliant) parts.push(`<span style="color:#5eead4">${'●'.repeat(Math.min(c.compliant, 5))}</span> <span class="text-slate-400">${c.compliant} compliant</span>`);
    if (c.pending) parts.push(`<span style="color:#fbbf24">${'●'.repeat(Math.min(c.pending, 5))}</span> <span class="text-slate-400">${c.pending} pending</span>`);
    if (c.missing) parts.push(`<span style="color:#fda4af">${'●'.repeat(Math.min(c.missing, 5))}</span> <span class="text-slate-400">${c.missing} missing</span>`);
    return parts.length ? parts.join(' · ') : '<span class="text-slate-500">—</span>';
  };

  const rows = suppliers.map(s => {
    const pill = s.status === 'active'
      ? '<span class="pill pill-ok">Active</span>'
      : '<span class="pill pill-warn">Pending</span>';
    const p = pct(s.certCounts);
    const open = (s.certCounts.pending || 0) + (s.certCounts.missing || 0);
    const bar = p >= 80 ? '#2dd4bf' : p >= 60 ? '#f59e0b' : '#fb7185';
    return `
      <tr class="border-t border-slate-800/80">
        <td class="py-4 pr-4 align-top">
          <div class="text-slate-100 font-semibold">${s.name}</div>
          <div class="text-xs text-slate-400 mt-1">${s.role}</div>
          ${s.joinedAt ? `<div class="text-xs text-slate-500 mt-1">Engaged ${s.joinedAt}</div>` : ''}
        </td>
        <td class="py-4 pr-4 align-top">${pill}</td>
        <td class="py-4 pr-4 align-top text-sm">${certDots(s.certCounts)}</td>
        <td class="py-4 pr-4 align-top text-right ${open > 0 ? 'text-amber-300' : 'text-teal-300'} font-semibold">${open}</td>
        <td class="py-4 align-top w-40">
          <div class="flex items-center gap-2">
            <div class="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
              <div class="h-full" style="width:${p}%;background:${bar}"></div>
            </div>
            <span class="text-slate-100 text-sm font-semibold w-10 text-right">${p}%</span>
          </div>
        </td>
      </tr>`;
  }).join('');

  const empty = suppliers.length === 0
    ? '<div class="card p-8 text-center text-slate-400">No suppliers engaged yet.</div>'
    : '';

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-slate-100">Suppliers &amp; Coverage · ${vault.name}</h1>
      <p class="text-sm text-slate-400 mt-1">Each supplier is engaged for one or more compliance domains and is accountable for the criteria within them.</p>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      ${statCard('Suppliers', suppliers.length, suppliers.filter(s => s.status === 'active').length + ' active')}
      ${statCard('Criteria Covered', allTotal, 'across all engaged suppliers')}
      ${statCard('Compliant', allTotal ? Math.round(allCounts.compliant / allTotal * 100) + '%' : '—', allCounts.compliant + ' of ' + allTotal + ' criteria', 'text-teal-300')}
      ${statCard('Open Items', allCounts.pending + allCounts.missing,
        allCounts.missing + ' missing · ' + allCounts.pending + ' pending review',
        (allCounts.pending + allCounts.missing) > 0 ? 'text-amber-300' : 'text-teal-300')}
    </div>

    ${suppliers.length ? `
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-xs uppercase tracking-wide text-slate-500 bg-slate-900/40">
            <th class="py-3 px-4 font-medium">Supplier</th>
            <th class="py-3 px-4 font-medium">Status</th>
            <th class="py-3 px-4 font-medium">Criteria</th>
            <th class="py-3 px-4 font-medium text-right">Open</th>
            <th class="py-3 px-4 font-medium">Compliance</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>` : empty}

    <p class="mt-6 text-xs text-slate-500 italic">
      Criterion counts are illustrative for the demo. In the live platform they are derived from the criteria assigned to each supplier's domains.
    </p>
  `;
};
