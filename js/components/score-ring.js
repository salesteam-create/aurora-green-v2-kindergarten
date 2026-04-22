window.scoreRing = function (score, size = 140, label = 'EU Readiness') {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, score)) / 100);
  const color = score >= 80 ? '#2dd4bf' : score >= 60 ? '#f59e0b' : '#fb7185';
  return `
    <div class="flex flex-col items-center">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171'}" />
          </linearGradient>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" class="ring-track" stroke-width="10"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" class="ring-fill" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"
                transform="rotate(-90 ${size/2} ${size/2})"/>
        <text x="50%" y="48%" text-anchor="middle" dominant-baseline="middle" fill="#f1f5f9" font-size="${size*0.26}" font-weight="600">${score}</text>
        <text x="50%" y="64%" text-anchor="middle" fill="#94a3b8" font-size="${size*0.09}">% readiness</text>
      </svg>
      <div class="text-xs text-slate-400 mt-2">${label}</div>
    </div>
  `;
};

window.statusPill = function (status) {
  const map = {
    'missing': ['pill-bad', 'Missing'],
    'partial': ['pill-warn', 'Partial'],
    'compliant': ['pill-ok', 'Compliant'],
    'pending-review': ['pill-info', 'Pending DNV review'],
    'approved': ['pill-ok', 'Approved'],
  };
  const [cls, label] = map[status] || ['pill-neutral', status];
  return `<span class="pill ${cls}">${label}</span>`;
};

window.fmtEUR = function (n) {
  if (n >= 1_000_000) return '€' + (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M';
  if (n >= 1_000) return '€' + (n / 1_000).toFixed(0) + 'k';
  return '€' + n;
};

window.fmtDateShort = function (iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

window.fmtRelative = function (iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
};
