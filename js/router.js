window.NAV = {
  owner: [
    { view: 'dashboard',     label: 'Dashboard',       icon: 'layout-dashboard' },
    { view: 'digital-twin',  label: 'Digital Twin',    icon: 'ship' },
    { view: 'asset-value',   label: 'Asset Value',     icon: 'trending-up' },
    { view: 'reports',       label: 'Reports',         icon: 'file-text' },
  ],
  compliance: [
    { view: 'my-components', label: 'My Components',   icon: 'list-checks' },
    { view: 'cert-engine',   label: 'Certification Engine', icon: 'shield-check' },
    { view: 'submissions',   label: 'Submissions',     icon: 'send' },
  ],
  dnv: [
    { view: 'review-queue',  label: 'Review Queue',    icon: 'inbox' },
    { view: 'completed',     label: 'Completed',       icon: 'check-circle-2' },
  ],
};

window.DEFAULT_VIEW = {
  owner: 'dashboard',
  compliance: 'my-components',
  dnv: 'review-queue',
};

window.PERSONA_LABELS = {
  owner: 'Captain Rao — Delhi Star Owner',
  compliance: 'MarinePro Engineering Ltd.',
  dnv: 'DNV — Maritime Classification',
};

window.renderSidebar = function () {
  const persona = window.demoState.currentPersona;
  const items = window.NAV[persona];
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = items.map(it => `
    <div class="nav-item ${window.demoState.currentView === it.view ? 'active' : ''}" data-view="${it.view}">
      <i data-lucide="${it.icon}" class="w-4 h-4"></i>
      <span>${it.label}</span>
    </div>
  `).join('');
  nav.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      window.demoState.currentView = el.dataset.view;
      window.render();
    });
  });

  const footer = document.getElementById('sidebar-footer');
  if (persona === 'compliance') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Signed in as</div><div class="text-slate-300">MarinePro Engineering</div><div>Engine Room · Fuel · Accommodation</div>`;
  } else if (persona === 'dnv') {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Reviewer</div><div class="text-slate-300">DNV AS · Oslo</div>`;
  } else {
    footer.innerHTML = `<div class="text-slate-400 mb-1">Principal</div><div class="text-slate-300">Captain Rao</div><div>Royal Board · Delhi Star</div>`;
  }
  lucide.createIcons();
};

window.render = function () {
  const persona = window.demoState.currentPersona;
  const view = window.demoState.currentView;
  document.getElementById('persona-label').textContent = window.PERSONA_LABELS[persona];
  document.getElementById('persona-select').value = persona;

  window.renderSidebar();

  const root = document.getElementById('view-root');
  root.innerHTML = '';
  const viewsByPersona = { owner: window.OwnerViews, compliance: window.ComplianceViews, dnv: window.DnvViews };
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
