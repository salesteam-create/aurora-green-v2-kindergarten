// SVG side-profile technical schematic of a tanker. Zones are <g>s keyed by component id.
window.renderDigitalTwin = function (vessel, onZoneClick, selectedZoneId) {
  const comps = vessel.components;
  const colorFor = (status) => status === 'compliant' ? '#2dd4bf'
    : status === 'partial' ? '#f59e0b'
    : status === 'missing' ? '#fb7185' : '#64748b';
  const zoneFill = (status) => `${colorFor(status)}33`;

  // Zone polygon definitions. Hull-structure follows the new silhouette contours.
  const zones = {
    'hull-structure': {
      label: 'Hull & Structure',
      points: '60,260 900,260 940,305 910,345 90,345 30,305',
    },
    'cargo-tanks':    { label: 'Cargo Tanks',      points: '180,180 700,180 700,260 180,260' },
    'engine-room':    { label: 'Engine Room',      points: '700,180 820,180 820,260 700,260' },
    'bridge-nav':     { label: 'Bridge & Nav',     points: '740,100 820,100 820,180 740,180' },
    'accommodation':  { label: 'Accommodation',    points: '660,120 740,120 740,180 660,180' },
    'fuel-emissions': { label: 'Fuel & Emissions', points: '820,200 900,200 900,260 820,260' },
    'deck-safety':    { label: 'Deck & Safety',    points: '180,160 660,160 660,180 180,180' },
    'ballast-water':  { label: 'Ballast Water',    points: '60,260 180,260 180,310 60,310' },
  };

  const polygons = Object.entries(zones).map(([id, z]) => {
    const comp = comps[id];
    if (!comp) return '';
    const selected = selectedZoneId === id ? 'selected' : '';
    const { x, y } = centroid(z.points);
    return `
      <g class="zone ${selected}" data-zone="${id}">
        <polygon points="${z.points}" fill="${zoneFill(comp.status)}" stroke="${colorFor(comp.status)}" stroke-width="2"/>
        <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="#e5e7eb" font-size="12" font-weight="500" pointer-events="none">${z.label}</text>
      </g>
    `;
  }).join('');

  // ---------- Decorative (non-interactive) elements ----------
  // Hull silhouette outline: raked bow (right), curved stern (left), with deck line across top.
  const hullOutline = `
    <path d="M 60,180 L 30,180 Q 5,230 30,305 L 90,345 L 900,345 L 940,305 L 948,262 L 920,180 Z"
          fill="none" stroke="#5eead4" stroke-width="1.5" opacity="0.4"/>
    <line x1="60" y1="180" x2="920" y2="180" stroke="#5eead4" stroke-width="1" opacity="0.3" stroke-dasharray="1 0"/>
  `;

  // Bulbous bow below waterline at forward end.
  const bulbousBow = `
    <ellipse cx="946" cy="325" rx="14" ry="9" fill="none" stroke="#5eead4" stroke-width="1.2" opacity="0.5"/>
    <ellipse cx="946" cy="325" rx="6" ry="4" fill="#5eead4" opacity="0.15"/>
  `;

  // Rudder hanging below the stern.
  const rudder = `
    <path d="M 38,345 L 38,378 L 58,378 L 58,350 Z" fill="none" stroke="#5eead4" stroke-width="1.2" opacity="0.55"/>
    <line x1="48" y1="345" x2="48" y2="378" stroke="#5eead4" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.4"/>
  `;

  // Row of portholes along the hull side, evenly spaced above the waterline.
  const PORTHOLE_COUNT = 14;
  const portholes = Array.from({ length: PORTHOLE_COUNT }, (_, i) => {
    const x = 110 + i * 55;
    return `<circle cx="${x}" cy="290" r="3.5" fill="#0c1936" stroke="#5eead4" stroke-width="0.8" opacity="0.7" pointer-events="none"/>`;
  }).join('');

  // Bridge window band inside Bridge & Nav zone.
  const bridgeWindows = `
    <g pointer-events="none" opacity="0.85">
      <rect x="748" y="126" width="64" height="5" fill="#5eead4" opacity="0.85"/>
      <rect x="748" y="134" width="64" height="3" fill="#5eead4" opacity="0.55"/>
    </g>
  `;

  // Accommodation porthole/window grid — kept in the upper portion so it doesn't cover the label.
  const accomWindows = (() => {
    const rows = 2, cols = 4;
    let out = '<g pointer-events="none" opacity="0.75">';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 668 + c * 17;
        const y = 125 + r * 9;
        out += `<rect x="${x}" y="${y}" width="11" height="6" fill="#0c1936" stroke="#5eead4" stroke-width="0.6"/>`;
      }
    }
    out += '</g>';
    return out;
  })();

  // Funnel/stack above the engine room with a red band.
  const funnel = `
    <g pointer-events="none">
      <rect x="772" y="60" width="22" height="45" fill="#334155" stroke="#5eead4" stroke-width="1"/>
      <rect x="767" y="54" width="32" height="8" fill="#1e293b" stroke="#5eead4" stroke-width="1"/>
      <rect x="775" y="70" width="16" height="5" fill="#fb7185" opacity="0.85"/>
    </g>
  `;

  // LOA (Length Overall) dimension callout spanning the full hull length above the ship.
  const loaCallout = `
    <g pointer-events="none" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" opacity="0.7">
      <line x1="30" y1="38" x2="948" y2="38" stroke="#5eead4" stroke-width="0.5"/>
      <line x1="30" y1="32" x2="30" y2="44" stroke="#5eead4" stroke-width="1"/>
      <line x1="948" y1="32" x2="948" y2="44" stroke="#5eead4" stroke-width="1"/>
      <rect x="450" y="30" width="78" height="16" fill="#0f1a2e"/>
      <text x="489" y="42" text-anchor="middle" fill="#5eead4" font-size="10">LOA 243m</text>
    </g>
  `;

  // Scale indicator beneath the hull.
  const scaleBar = (() => {
    const x0 = 220, y = 400, step = 60;
    const labels = ['0', '50', '100', '150', '200m'];
    let out = '<g pointer-events="none" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" opacity="0.55">';
    out += `<line x1="${x0}" y1="${y}" x2="${x0 + step * 4}" y2="${y}" stroke="#94a3b8" stroke-width="0.8"/>`;
    for (let i = 0; i < labels.length; i++) {
      const tx = x0 + i * step;
      out += `<line x1="${tx}" y1="${y - 4}" x2="${tx}" y2="${y + 4}" stroke="#94a3b8" stroke-width="0.8"/>`;
      out += `<text x="${tx}" y="${y + 14}" text-anchor="middle" fill="#94a3b8" font-size="9">${labels[i]}</text>`;
    }
    out += '</g>';
    return out;
  })();

  // Compass rose — bottom-left, ~40px.
  const compass = `
    <g transform="translate(48,390)" pointer-events="none" opacity="0.75" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">
      <circle cx="0" cy="0" r="18" fill="#0c1936" stroke="#5eead4" stroke-width="0.8"/>
      <circle cx="0" cy="0" r="12" fill="none" stroke="#5eead4" stroke-width="0.3" opacity="0.5"/>
      <path d="M 0,-15 L 4,0 L 0,2 L -4,0 Z" fill="#5eead4"/>
      <path d="M 0,15 L 4,0 L 0,-2 L -4,0 Z" fill="#64748b"/>
      <text x="0" y="-20" text-anchor="middle" fill="#5eead4" font-size="8">N</text>
      <text x="0" y="26" text-anchor="middle" fill="#94a3b8" font-size="8">S</text>
      <text x="-23" y="3" text-anchor="middle" fill="#94a3b8" font-size="8">W</text>
      <text x="23" y="3" text-anchor="middle" fill="#94a3b8" font-size="8">E</text>
    </g>
  `;

  // Corner annotations.
  const cornerAnnotations = `
    <g pointer-events="none" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">
      <text x="20" y="62" fill="#5eead4" font-size="9" opacity="0.65">DRAWING NO. DS-001-R2</text>
      <text x="20" y="76" fill="#94a3b8" font-size="9" opacity="0.55">SCALE 1:500</text>
      <text x="940" y="412" text-anchor="end" fill="#5eead4" font-size="9" opacity="0.55">AGG · DIGITAL TWIN · v1</text>
    </g>
  `;

  // Vessel identification (top-right).
  const vesselTag = `
    <g pointer-events="none" font-family="Inter,system-ui,sans-serif">
      <text x="940" y="22" text-anchor="end" fill="#cbd5e1" font-size="13" font-weight="600">${vessel.name} · Reg. no ${vessel.imo}</text>
      <text x="940" y="36" text-anchor="end" fill="#64748b" font-size="10">${vessel.type} · ${vessel.flag} → ${vessel.targetMarket}</text>
    </g>
  `;

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
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0c1936"/>
            <stop offset="100%" stop-color="#0a162d"/>
          </linearGradient>
          <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#93c5fd" stroke-width="0.4" opacity="0.1"/>
          </pattern>
          <pattern id="bpGridMajor" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" stroke-width="0.6" opacity="0.18"/>
          </pattern>
        </defs>

        <!-- Blueprint grid background -->
        <rect x="0" y="0" width="960" height="420" fill="url(#bpGrid)"/>
        <rect x="0" y="0" width="960" height="420" fill="url(#bpGridMajor)"/>

        <!-- Waterline (dashed) -->
        <line x1="0" y1="310" x2="960" y2="310" stroke="#5eead4" stroke-width="1" stroke-dasharray="6 5" opacity="0.4"/>

        <!-- Submerged water tint -->
        <rect x="0" y="310" width="960" height="110" fill="url(#water)" opacity="0.35"/>

        <!-- Hull silhouette & under-hull features -->
        ${hullOutline}
        ${bulbousBow}
        ${rudder}

        <!-- Dimension callout & corner annotations -->
        ${loaCallout}
        ${cornerAnnotations}
        ${vesselTag}

        <!-- Interactive zones -->
        ${polygons}

        <!-- Decorative overlays inside/above zones -->
        ${portholes}
        ${bridgeWindows}
        ${accomWindows}
        ${funnel}

        <!-- Scale bar & compass -->
        ${scaleBar}
        ${compass}
      </svg>
      <div class="mt-3 flex items-center justify-between">${legend}
        <div class="text-xs text-slate-500">Click any zone to inspect</div>
      </div>
    </div>
  `;

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
