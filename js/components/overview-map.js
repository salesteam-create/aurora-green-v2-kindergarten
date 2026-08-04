// Overview map for the Authority persona (Module 1 — PA Due Diligence Overview).
//
// Deliberately NOT a GIS engine. Two hand-authored, stylised country silhouettes
// with entity pins positioned by percentage inside each silhouette's own box, so
// the whole thing scales with the viewport and needs no projection maths.
//
// Replaces the slot the yacht digital twin used to occupy. digital-twin.js is
// still on disk and still wired to the hidden owner persona; it can be deleted
// when that persona is retired.

(function () {
  // Compliance bands. Shared with the legend and the pin fills so a dot's colour
  // always means the same thing as the chip beside it.
  const BANDS = [
    { id: 'critical', label: 'Below 60%',  min: 0,  colour: '#fb7185', soft: 'rgba(251,113,133,.18)' },
    { id: 'watch',    label: '60–79%',     min: 60, colour: '#f59e0b', soft: 'rgba(245,158,11,.18)' },
    { id: 'good',     label: '80% +',      min: 80, colour: '#2dd4bf', soft: 'rgba(45,212,191,.18)' },
  ];

  window.complianceBand = function (score) {
    return BANDS.slice().reverse().find(b => score >= b.min) || BANDS[0];
  };

  const TYPE_LABEL = {
    school: 'School', hospital: 'Hospital', municipal: 'Municipal body', hotel: 'Hotel',
  };
  window.entityTypeLabel = (t) => TYPE_LABEL[t] || t;

  // Stylised silhouettes, each drawn in its own 0 0 100 100 box and scaled by the
  // wrapping <svg viewBox>. Approximate by design — recognisable, not accurate.
  //
  // Norway: long NNE-SSW body, wider in the south, narrowing through the middle,
  // with Finnmark hooking east at the top.
  const NORWAY_PATH = [
    'M 44 96', 'L 36 91', 'L 31 84', 'L 26 76', 'L 29 69', 'L 24 61',
    'L 27 53', 'L 23 45', 'L 29 38', 'L 34 32', 'L 40 26', 'L 47 21',
    'L 55 16', 'L 63 11', 'L 72 7', 'L 82 4', 'L 90 6', 'L 93 11',
    'L 85 13', 'L 77 16', 'L 70 20', 'L 64 25', 'L 59 31', 'L 55 38',
    'L 52 46', 'L 50 54', 'L 49 62', 'L 50 70', 'L 52 78', 'L 51 86',
    'L 48 92', 'Z',
  ].join(' ');

  // Italy: wide Alpine north, peninsula running SE, then the two features that
  // make it read at a glance — the heel at Salento and the toe at Calabria,
  // separated by the concave Gulf of Taranto.
  const ITALY_PATH = [
    'M 18 14', 'L 30 9', 'L 42 12', 'L 54 8', 'L 66 12', 'L 72 18',
    'L 66 24', 'L 62 30', 'L 66 38', 'L 71 46', 'L 75 55', 'L 79 63',
    'L 85 68', 'L 90 73', 'L 86 78', 'L 80 76', 'L 74 79', 'L 68 84',
    'L 62 87', 'L 57 91', 'L 52 93', 'L 50 88', 'L 54 83', 'L 52 77',
    'L 47 72', 'L 43 64', 'L 38 56', 'L 33 47', 'L 27 38', 'L 22 28',
    'L 18 20', 'Z',
  ].join(' ');

  // Sicily off the toe and Sardinia to the west, so Italy reads correctly.
  const ITALY_ISLANDS = [
    { cx: 40, cy: 95, rx: 9, ry: 4.5, rot: -10 },  // Sicily
    { cx: 14, cy: 60, rx: 4.5, ry: 10, rot: 5 },   // Sardinia
  ];

  const COUNTRIES = [
    { name: 'Norway', path: NORWAY_PATH, islands: [] },
    { name: 'Italy',  path: ITALY_PATH,  islands: ITALY_ISLANDS },
  ];

  // Render one country panel. Entities are pre-filtered by the caller.
  function countryPanel(country, entities) {
    const pins = entities.map(v => {
      const band = window.complianceBand(v.euReadinessScore);
      const cx = v.map.x, cy = v.map.y;
      return `
        <g class="map-pin" data-entity="${v.id}" style="cursor:pointer">
          <circle cx="${cx}" cy="${cy}" r="5.2" fill="${band.colour}" opacity="0.18"/>
          <circle cx="${cx}" cy="${cy}" r="2.6" fill="${band.colour}"
                  stroke="#0b1220" stroke-width="0.5"/>
          ${v.criticalGaps > 0
            ? `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="${band.colour}"
                       stroke-width="0.5" opacity="0.85"/>`
            : ''}
        </g>`;
    }).join('');

    return `
      <div class="flex-1">
        <div class="flex items-baseline justify-between mb-2">
          <div class="text-sm font-medium text-slate-200">${country.name}</div>
          <div class="text-xs text-slate-500">${entities.length} entit${entities.length === 1 ? 'y' : 'ies'}</div>
        </div>
        <div class="rounded-xl border border-slate-800 bg-slate-900/40 p-2">
          <svg viewBox="0 0 100 100" style="width:100%;height:260px;overflow:visible"
               role="img" aria-label="Stylised map of ${country.name}">
            <path d="${country.path}" fill="rgba(148,163,184,.10)"
                  stroke="rgba(148,163,184,.35)" stroke-width="0.6"
                  stroke-linejoin="round"/>
            ${country.islands.map(i => `
              <ellipse cx="${i.cx}" cy="${i.cy}" rx="${i.rx}" ry="${i.ry}"
                       transform="rotate(${i.rot} ${i.cx} ${i.cy})"
                       fill="rgba(148,163,184,.10)" stroke="rgba(148,163,184,.35)" stroke-width="0.6"/>
            `).join('')}
            ${pins}
          </svg>
        </div>
      </div>`;
  }

  // The map plus legend. onPinClick receives the entity id.
  window.renderOverviewMap = function (mountEl, entities, onPinClick) {
    const byCountry = COUNTRIES.map(c => ({
      country: c,
      list: entities.filter(v => v.country === c.name),
    }));

    mountEl.innerHTML = `
      <div class="flex gap-5">
        ${byCountry.map(({ country, list }) => countryPanel(country, list)).join('')}
      </div>
      <div class="flex items-center gap-5 mt-4 pt-4 border-t border-slate-800 text-xs">
        <span class="text-slate-500 uppercase tracking-wide">Compliance</span>
        ${BANDS.map(b => `
          <span class="flex items-center gap-1.5">
            <span style="width:9px;height:9px;border-radius:999px;background:${b.colour};display:inline-block"></span>
            <span class="text-slate-400">${b.label}</span>
          </span>`).join('')}
        <span class="flex items-center gap-1.5 ml-auto">
          <span style="width:11px;height:11px;border-radius:999px;border:1px solid #94a3b8;display:inline-block"></span>
          <span class="text-slate-500">Ring = open critical gap</span>
        </span>
      </div>`;

    mountEl.querySelectorAll('.map-pin').forEach(g => {
      g.addEventListener('click', () => onPinClick(g.dataset.entity));
    });
  };
})();
