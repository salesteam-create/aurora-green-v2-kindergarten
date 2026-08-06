window.renderAllAssets = function (root) {
  const persona = window.demoState.currentPersona;
  const vaults = Object.values(window.demoState.privateVaults);

  const entityKey = window.demoState.currentComplianceEntity;
  const entityComponents = (window.demoState.compliantEntities[entityKey] || {}).components || [];

  const cards = vaults.map(vault => {
    const isPlaceholder = vault.status === 'placeholder';
    const primary = vault.assetIds[0] ? window.demoState.vessels[vault.assetIds[0]] : null;

    let assignmentNote = null;
    if (persona === 'compliance' && !isPlaceholder && primary) {
      const hasAssignment = Object.values(primary.components)
        .some(c => entityComponents.includes(c.id) && c.assignedTo === entityKey);
      if (!hasAssignment) assignmentNote = 'no-assignment';
    }

    const statusPill = isPlaceholder
      ? '<span class="pill pill-neutral">Coming soon</span>'
      : assignmentNote === 'no-assignment'
        ? '<span class="pill pill-neutral">No assignments</span>'
        : '<span class="pill pill-ok">Active</span>';

    const stats = (!isPlaceholder && primary) ? `
      <div class="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div class="text-slate-500 uppercase tracking-wide">Compliance</div>
          <div class="text-slate-100 text-lg font-semibold mt-0.5">${primary.euReadinessScore}<span class="text-slate-400 text-sm">%</span></div>
        </div>
        <div>
          <div class="text-slate-500 uppercase tracking-wide">Critical Gaps</div>
          <div class="text-lg font-semibold mt-0.5 ${primary.criticalGaps > 0 ? 'text-rose-300' : 'text-teal-300'}">${primary.criticalGaps}</div>
        </div>
      </div>
    ` : (isPlaceholder ? `
      <div class="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-500">
        Onboarding in progress.
      </div>
    ` : '');

    const interactive = !isPlaceholder && assignmentNote !== 'no-assignment';
    const wrapClasses = interactive
      ? 'card card-hover p-6 cursor-pointer transition-all'
      : 'card p-6 opacity-50 cursor-not-allowed';

    return `
      <div class="${wrapClasses}" data-vault-id="${interactive ? vault.id : ''}">
        <div class="flex items-start justify-between mb-2">
          <div>
            <div class="text-lg font-semibold text-slate-100">${vault.name}</div>
            <div class="text-sm text-slate-400 mt-0.5">${vault.clientName}</div>
          </div>
          ${statusPill}
        </div>
        <div class="text-sm text-slate-400 mt-3">${vault.description}</div>
        ${stats}
      </div>
    `;
  }).join('');

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-slate-100">Aurora Vault · Entity Index</h1>
      <p class="text-sm text-slate-400 mt-1">Select a Private Vault to enter.</p>
    </div>
    <div class="grid grid-cols-3 gap-5">
      ${cards}
    </div>
  `;

  root.querySelectorAll('[data-vault-id]').forEach(el => {
    const id = el.getAttribute('data-vault-id');
    if (!id) return;
    el.addEventListener('click', () => {
      const vault = window.demoState.privateVaults[id];
      window.updateState(s => {
        s.vaultStage = 'in-vault';
        s.currentVaultId = id;
        s.selectedVesselId = vault.assetIds[0];
        s.currentView = window.DEFAULT_VIEW[s.currentPersona];
      });
    });
  });
};
