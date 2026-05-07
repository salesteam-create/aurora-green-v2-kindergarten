window.renderSuppliers = function (root) {
  const vault = window.demoState.privateVaults[window.demoState.currentVaultId];
  if (!vault) {
    root.innerHTML = '<div class="text-slate-400 p-6">Select a vault first.</div>';
    return;
  }
  const suppliers = (vault.suppliers || []).slice().sort((a, b) => b.valueContribution - a.valueContribution);

  const totalEquity = suppliers.reduce((s, x) => s + x.shareEquityPct, 0);
  const totalGreen = suppliers.reduce((s, x) => s + x.greenSharesPct, 0);
  const totalValue = suppliers.reduce((s, x) => s + x.valueContribution, 0);

  const statCard = (label, value, sub) => `
    <div class="card p-4">
      <div class="text-xs text-slate-500 uppercase tracking-wide">${label}</div>
      <div class="text-2xl font-semibold text-slate-100 mt-1">${value}</div>
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
    return `
      <tr class="border-t border-slate-800/80">
        <td class="py-4 pr-4 align-top">
          <div class="text-slate-100 font-semibold">${s.name}</div>
          <div class="text-xs text-slate-400 mt-1">${s.role}</div>
          ${s.joinedAt ? `<div class="text-xs text-slate-500 mt-1">Joined ${s.joinedAt}</div>` : ''}
        </td>
        <td class="py-4 pr-4 align-top">${pill}</td>
        <td class="py-4 pr-4 align-top text-sm">${certDots(s.certCounts)}</td>
        <td class="py-4 pr-4 align-top text-right text-slate-100">${s.shareEquityPct.toFixed(1)}%</td>
        <td class="py-4 pr-4 align-top text-right text-teal-300">${s.greenSharesPct.toFixed(1)}%</td>
        <td class="py-4 align-top text-right text-slate-100 font-semibold">${s.valueContribution > 0 ? window.fmtEUR(s.valueContribution) : '<span class="text-slate-500">—</span>'}</td>
      </tr>`;
  }).join('');

  const empty = suppliers.length === 0
    ? '<div class="card p-8 text-center text-slate-400">No suppliers onboarded yet.</div>'
    : '';

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-slate-100">Suppliers &amp; Investors · ${vault.name}</h1>
      <p class="text-sm text-slate-400 mt-1">Each supplier in this vault contributes certifications and earns equity in the asset's value model.</p>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      ${statCard('Total Suppliers', suppliers.length, suppliers.filter(s => s.status === 'active').length + ' active')}
      ${statCard('Share Equity Allocated', totalEquity.toFixed(1) + '%', 'of asset equity')}
      ${statCard('Green Shares Allocated', totalGreen.toFixed(1) + '%', 'of green-share pool')}
      ${statCard('Value Contribution', window.fmtEUR(totalValue), 'attributed to suppliers')}
    </div>

    ${suppliers.length ? `
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-xs uppercase tracking-wide text-slate-500 bg-slate-900/40">
            <th class="py-3 px-4 font-medium">Supplier</th>
            <th class="py-3 px-4 font-medium">Status</th>
            <th class="py-3 px-4 font-medium">Certifications</th>
            <th class="py-3 px-4 font-medium text-right">Share Equity</th>
            <th class="py-3 px-4 font-medium text-right">Green Shares</th>
            <th class="py-3 px-4 font-medium text-right">Value Contribution</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>` : empty}

    <p class="mt-6 text-xs text-slate-500 italic">
      Share allocations are illustrative for the prototype. Final allocations are computed by the Olidata equity algorithm based on certification weight, timing, and contribution.
    </p>
  `;
};
