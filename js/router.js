window.NAV = {
  owner: [
    { view: 'dashboard',     label: 'Dashboard',       icon: 'layout-dashboard' },
    { view: 'digital-twin',  label: 'Digital Twin',    icon: 'ship' },
    { view: 'asset-value',   label: 'Asset Value',     icon: 'trending-up' },
    { view: 'suppliers',     label: 'Suppliers & Investors', icon: 'users' },
    { view: 'reports',       label: 'Reports',         icon: 'file-text' },
  ],
  compliance: [
    { view: 'my-components', label: 'My Components',   icon: 'list-checks' },
    { view: 'cert-engine',   label: 'Certification Engine', icon: 'shield-check' },
    { view: 'submissions',   label: 'Submissions',     icon: 'send' },
    { view: 'suppliers',     label: 'Suppliers & Investors', icon: 'users' },
  ],
  dnv: [
    { view: 'review-queue',  label: 'Review Queue',    icon: 'inbox' },
    { view: 'completed',     label: 'Completed',       icon: 'check-circle-2' },
  ],
  scientific: [
    { view: 'framework',     label: 'Criteria Framework', icon: 'book-open' },
    { view: 'coverage',      label: 'Coverage',           icon: 'layers' },
  ],
};

window.DEFAULT_VIEW = {
  owner: 'dashboard',
  compliance: 'my-components',
  dnv: 'review-queue',
  scientific: 'framework',
};

window.PERSONA_LEVEL = { owner: 'vault', compliance: 'vault', dnv: 'sv', scientific: 'sv' };

window.PERSONA_LABELS = {
  owner: 'Captain Rao — Delhi Star Owner',
  compliance: 'MarinePro Engineering Ltd.',
  dnv: 'DNV — Maritime Classification',
  scientific: 'Scientific Committee · Aurora Vault',
};

window.renderSidebar = function () {
  const persona = window.demoState.currentPersona;
  const stage = window.demoState.vaultStage;
  const nav = document.getElementById('sidebar-nav');

  if (stage === 'locked') return;

  const level = window.PERSONA_LEVEL[persona];
  let html = '';

  if (stage === 'sv-shell' && level === 'vault') {
    html = `
      <div class="nav-item active">
        <i data-lucide="grid-3x3" class="w-4 h-4"></i>
        <span>All Assets</span>
      </div>`;
    nav.innerHTML = html;
  } else {
    if (stage === 'in-vault') {
      html += `
        <div class="nav-item" data-back-to-shell="1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>All Assets</span>
        </div>
        <div class="my-2 border-t border-slate-800"></div>`;
    }
    const items = window.NAV[persona];
    html += items.map(it => `
      <div class="nav-item ${window.demoState.currentView === it.view ? 'active' : ''}" data-view="${it.view}">
        <i data-lucide="${it.icon}" class="w-4 h-4"></i>
        <span>${it.label}</span>
      </div>
    `).join('');
    nav.innerHTML = html;
    nav.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', () => {
        window.demoState.currentView = el.dataset.view;
        window.render();
      });
    });
    const back = nav.querySelector('[data-back-to-shell]');
    if (back) {
      back.addEventListener('click', () => {
        window.updateState(s => {
          s.vaultStage = 'sv-shell';
          s.currentVaultId = null;
          s.currentView = window.DEFAULT_VIEW[s.currentPersona];
        });
      });
    }
  }

  const footer = document.getElementById('sidebar-footer');
  if (stage === 'sv-shell' && level === 'vault') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Aurora Vault</div><div class="text-slate-300">Asset Index</div>`;
    lucide.createIcons();
    return;
  }
  if (stage === 'in-vault') {
    const vault = window.demoState.privateVaults[window.demoState.currentVaultId];
    if (vault) {
      footer.innerHTML = `<div class="text-slate-400 mb-1">Private Vault</div><div class="text-slate-300">${vault.name}</div><div>${vault.clientName}</div>`;
      lucide.createIcons();
      return;
    }
  }
  if (persona === 'compliance') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Signed in as</div><div class="text-slate-300">MarinePro Engineering</div><div>Engine Room · Fuel · Accommodation</div>`;
  } else if (persona === 'dnv') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Reviewer</div><div class="text-slate-300">DNV AS · Oslo</div>`;
  } else if (persona === 'scientific') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Committee</div><div class="text-slate-300">Aurora Vault</div><div>Ratified 2026-Q1</div>`;
  } else {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Principal</div><div class="text-slate-300">Captain Rao</div><div>Royal Board · Delhi Star</div>`;
  }
  lucide.createIcons();
};

window.render = function () {
  const persona = window.demoState.currentPersona;
  const view = window.demoState.currentView;
  const stage = window.demoState.vaultStage;
  const root = document.getElementById('view-root');

  document.body.classList.toggle('vault-locked', stage === 'locked');

  if (stage === 'locked') {
    root.innerHTML = '';
    window.renderVaultDoor(root);
    lucide.createIcons();
    return;
  }

  document.getElementById('persona-label').textContent = window.PERSONA_LABELS[persona];
  document.getElementById('persona-select').value = persona;

  const level = window.PERSONA_LEVEL[persona];

  if (stage === 'sv-shell' && level === 'vault') {
    window.renderSidebar();
    root.innerHTML = '';
    window.renderAllAssets(root);
    lucide.createIcons();
    return;
  }

  if (stage === 'in-vault') {
    const vault = window.demoState.privateVaults[window.demoState.currentVaultId];
    if (vault && vault.assetIds.length && !vault.assetIds.includes(window.demoState.selectedVesselId)) {
      window.demoState.selectedVesselId = vault.assetIds[0];
    }
  }

  window.renderSidebar();

  root.innerHTML = '';
  const viewsByPersona = { owner: window.OwnerViews, compliance: window.ComplianceViews, dnv: window.DnvViews, scientific: window.ScientificViews };
  const views = viewsByPersona[persona];
  const fn = views && views[view];
  if (fn) {
    fn(root);
  } else {
    // Fallback: switch to default view for this persona.
    window.demoState.currentView = window.DEFAULT_VIEW[persona];
    return window.render();
  }
  lucide.createIcons();
};

window.toast = function (text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; el.style.transition = 'all .3s'; }, 2600);
  setTimeout(() => el.remove(), 3000);
};
