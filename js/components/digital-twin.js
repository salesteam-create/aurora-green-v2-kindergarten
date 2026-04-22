// SVG side-cutaway of a generic tanker. Zones are <g>s keyed by component id.
window.renderDigitalTwin = function (vessel, onZoneClick, selectedZoneId) {
  const comps = vessel.components;
  const colorFor = (status) => status === 'compliant' ? '#2dd4bf'
    : status === 'partial' ? '#f59e0b'
    : status === 'missing' ? '#fb7185' : '#64748b';
  const zoneFill = (status) => {
    const c = colorFor(status);
    return `${c}33`; // ~20% alpha
  };

  // Zone polygon definitions for a stylized tanker silhouette.
  const zones = {
    'hull-structure': {
      label: 'Hull & Structure',
      points: '40,260 920,260 960,320 900,360 60,360 20,320',
    },
    'cargo-tanks': {
      label: 'Cargo Tanks',
      points: '180,180 700,180 700,260 180,260',
    },
    'engine-room': {
      label: 'Engine Room',
      points: '700,180 820,180 820,260 700,260',
    },
    'bridge-nav': {
      label: 'Bridge & Nav',
      points: '740,100 820,100 820,180 740,180',
    },
    'accommodation': {
      label: 'Accommodation',
      points: '660,120 740,120 740,180 660,180',
    },
    'fuel-emissions': {
      label: 'Fuel & Emissions',
      points: '820,200 900,200 900,260 820,260',
    },
    'deck-safety': {
      label: 'Deck & Safety',
      points: '180,160 660,160 660,180 180,180',
    },
    'ballast-water': {
      label: 'Ballast Water',
      points: '60,260 180,260 180,320 60,320',
    },
  };

  const polygons = Object.entries(zones).map(([id, z]) => {
    const comp = comps[id];
    if (!comp) return '';
    const selected = selectedZoneId === id ? 'selected' : '';
    return `
      <g class="zone ${selected}" data-zone="${id}">
        <polygon points="${z.points}" fill="${zoneFill(comp.status)}" stroke="${colorFor(comp.status)}" stroke-width="2"/>
        <text x="${centroid(z.points).x}" y="${centroid(z.points).y}" text-anchor="middle" dominant-baseline="middle" fill="#e5e7eb" font-size="12" font-weight="500" pointer-events="none">${z.label}</text>
      </g>
    `;
  }).join('');

  const legend = `
    <div class="flex items-center gap-5 text-xs text-slate-400">
      <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm" style="background:#2dd4bf"></span>Compliant</div>
      <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm" style="background:#f59e0b"></span>Partial</div>
      <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm" style="background:#fb7185"></span>Gap / missing</div>
    </div>
  `;

  const html = `
    <div class="relative">
      <svg viewBox="0 0 960 420" class="w-full h-auto rounded-xl bg-slate-900/60 border border-slate-800">
        <!-- waterline -->
        <line x1="0" y1="340" x2="960" y2="340" stroke="#1e3a8a" stroke-width="2" stroke-dasharray="4 6" opacity=".5"/>
        <!-- subtle water gradient + blueprint grid -->
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0c1936"/>
            <stop offset="100%" stop-color="#0a162d"/>
          </linearGradient>
          <pattern id="bpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93c5fd" stroke-width="0.5" opacity="0.08"/>
          </pattern>
          <pattern id="bpGridMinor" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#93c5fd" stroke-width="0.3" opacity="0.04"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="960" height="420" fill="url(#bpGridMinor)"/>
        <rect x="0" y="0" width="960" height="420" fill="url(#bpGrid)"/>
        <rect x="0" y="340" width="960" height="80" fill="url(#water)"/>

        <!-- bow/stern contours -->
        <polygon points="20,320 60,260 40,260" fill="#1e293b" opacity="0.5"/>
        <polygon points="900,360 960,320 940,360" fill="#1e293b" opacity="0.5"/>

        ${polygons}

        <!-- funnel detail -->
        <rect x="770" y="70" width="20" height="35" fill="#475569"/>
        <rect x="772" y="60" width="16" height="12" fill="#334155"/>

        <!-- title -->
        <text x="20" y="30" fill="#cbd5e1" font-size="14" font-weight="600">${vessel.name} · IMO ${vessel.imo}</text>
        <text x="20" y="48" fill="#64748b" font-size="11">${vessel.type} · ${vessel.flag} → ${vessel.targetMarket}</text>
      </svg>
      <div class="mt-3 flex items-center justify-between">${legend}
        <div class="text-xs text-slate-500">Click any zone to inspect</div>
      </div>
    </div>
  `;

  // Deferred wiring handled by caller via data-zone selector.
  return { html, wire: (container) => {
    container.querySelectorAll('.zone').forEach(el => {
      el.addEventListener('click', () => onZoneClick(el.dataset.zone));
      el.addEventListener('mouseenter', () => el.setAttribute('opacity', '0.85'));
      el.addEventListener('mouseleave', () => el.setAttribute('opacity', '1'));
    });
  }};
};

function centroid(pointsStr) {
  const pts = pointsStr.trim().split(/\s+/).map(p => p.split(',').map(Number));
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return { x, y };
}
