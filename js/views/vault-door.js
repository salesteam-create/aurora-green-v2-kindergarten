window.renderVaultDoor = function (root) {
  const ticks = [];
  for (let i = 0; i < 36; i++) {
    const angle = i * 10;
    const long = i % 9 === 0;
    ticks.push(`<line x1="160" y1="${long ? 18 : 24}" x2="160" y2="34" stroke="${long ? '#5eead4' : '#475569'}" stroke-width="${long ? 2 : 1}" transform="rotate(${angle} 160 160)" />`);
  }

  root.innerHTML = `
    <div class="min-h-[80vh] flex items-center justify-center">
      <div class="text-center">
        <div id="vault-dial" class="vault-dial mx-auto mb-8" style="width:320px;height:320px;">
          <svg viewBox="0 0 320 320" width="320" height="320">
            <defs>
              <radialGradient id="dialFace" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#1e3158" />
                <stop offset="100%" stop-color="#0f1a2e" />
              </radialGradient>
            </defs>
            <circle cx="160" cy="160" r="148" fill="url(#dialFace)" stroke="#1e3158" stroke-width="2" />
            <circle cx="160" cy="160" r="130" fill="none" stroke="#334155" stroke-width="1" />
            <circle cx="160" cy="160" r="108" fill="none" stroke="#1e3158" stroke-width="1" />
            <g>${ticks.join('')}</g>
            <circle cx="160" cy="160" r="62" fill="#0f1a2e" stroke="#2dd4bf" stroke-width="2" stroke-opacity="0.5" />
            <polygon points="160,42 154,62 166,62" fill="#2dd4bf" />
            <circle cx="160" cy="160" r="10" fill="#2dd4bf" />
            <circle cx="160" cy="160" r="4" fill="#0f1a2e" />
            <text x="160" y="200" text-anchor="middle" fill="#5eead4" font-size="12" font-weight="600" letter-spacing="3">AURORA</text>
          </svg>
        </div>
        <h1 class="text-3xl font-semibold text-slate-100 mb-2">Aurora Green Genesis</h1>
        <p class="text-sm text-slate-400 tracking-wider uppercase mb-8">Scientific Vault · Restricted Access</p>
        <form id="vault-door-form" class="flex flex-col items-center gap-3">
          <input type="password" id="vault-code" value="vault-2026" autofocus
                 class="bg-slate-800 border border-slate-700 rounded-md px-4 py-2.5 text-slate-100 text-center w-72 focus:outline-none focus:border-teal-400 tracking-widest" />
          <button type="submit"
                  class="px-8 py-2.5 rounded-md bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition-colors">
            Open Vault
          </button>
        </form>
        <p class="mt-10 text-xs text-slate-500">Authorised personnel only · Aurora Green Genesis · 2026</p>
      </div>
    </div>
  `;

  document.getElementById('vault-door-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const dial = document.getElementById('vault-dial');
    dial.classList.add('unlocking');
    setTimeout(() => {
      window.updateState(s => {
        s.vaultStage = 'sv-shell';
        s.currentView = window.DEFAULT_VIEW[s.currentPersona];
      });
    }, 700);
  });
};
