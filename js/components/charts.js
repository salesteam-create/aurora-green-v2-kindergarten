window._charts = window._charts || {};

function destroyIfPresent(id) {
  if (window._charts[id]) { window._charts[id].destroy(); delete window._charts[id]; }
}

window.renderTrendChart = function (canvasId, history, currentScore) {
  destroyIfPresent(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const lastHistoric = history[history.length - 1]?.score ?? currentScore;
  const hasSessionGain = currentScore !== lastHistoric;

  const labels = history.map(h => h.date);
  const historical = history.map(h => h.score);

  // Overlay session-gain segment as a separate dataset so the historical line stays smooth.
  let sessionSeries = null;
  if (hasSessionGain) {
    labels.push('now');
    historical.push(null);
    sessionSeries = history.map(() => null);
    sessionSeries[sessionSeries.length - 1] = lastHistoric;
    sessionSeries.push(currentScore);
  }

  const datasets = [{
    label: 'EU Readiness %',
    data: historical,
    borderColor: '#2dd4bf',
    backgroundColor: (c) => {
      const g = c.chart.ctx.createLinearGradient(0, 0, 0, 200);
      g.addColorStop(0, 'rgba(45,212,191,.35)');
      g.addColorStop(1, 'rgba(45,212,191,0)');
      return g;
    },
    fill: true, tension: 0.35, pointRadius: 3, pointBackgroundColor: '#2dd4bf', borderWidth: 2,
    spanGaps: false,
  }];
  if (sessionSeries) {
    datasets.push({
      label: 'This session',
      data: sessionSeries,
      borderColor: (c) => {
        const g = c.chart.ctx.createLinearGradient(0, 0, c.chart.width, 0);
        g.addColorStop(0, '#2dd4bf');
        g.addColorStop(0.6, '#fbbf24');
        g.addColorStop(1, '#fbbf24');
        return g;
      },
      borderWidth: 2.5,
      tension: 0.4,
      cubicInterpolationMode: 'monotone',
      pointRadius: (ctx) => ctx.dataIndex === sessionSeries.length - 1 ? 6 : 0,
      pointBackgroundColor: '#fbbf24',
      fill: false,
      spanGaps: false,
    });
  }

  const sessionDelta = hasSessionGain ? (currentScore - lastHistoric) : 0;

  window._charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => item.dataset.label + ': ' + item.parsed.y + '%',
          },
        },
        title: hasSessionGain ? {
          display: true,
          text: '+' + sessionDelta + ' pts this session',
          color: '#fbbf24',
          align: 'end',
          font: { size: 12, weight: 'normal' },
          padding: { bottom: 6 },
        } : { display: false },
      },
      scales: {
        y: { min: 40, max: 100, grid: { color: 'rgba(148,163,184,.08)' }, ticks: { color: '#94a3b8' } },
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
      },
    },
  });
};

window.renderValueChart = function (canvasId, vessel) {
  destroyIfPresent(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  // Synth value history based on score history.
  const floor = vessel.nominalValue * 0.80;
  const ceiling = vessel.projectedValue;
  const history = window.demoState.scoreHistory.map(h => ({
    date: h.date,
    value: Math.round(floor + (ceiling - floor) * (h.score / 100)),
  }));
  history.push({ date: 'now', value: vessel.currentValue });

  const labels = history.map(h => h.date);
  const actual = history.map(h => h.value);
  const projectedM = Math.round(vessel.projectedValue / 1e6);

  window._charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Value (€M)', data: actual.map(v => v / 1e6),
          borderColor: '#2dd4bf', backgroundColor: 'rgba(45,212,191,.15)',
          fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { right: 72 } },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: '→ €' + projectedM + 'M projected at 100% compliance',
          color: '#fbbf24',
          align: 'end',
          font: { size: 12, weight: 'normal' },
          padding: { bottom: 6 },
        },
      },
      scales: {
        y: { grid: { color: 'rgba(148,163,184,.08)' }, ticks: { color: '#94a3b8', callback: v => '€' + v + 'M' } },
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
      },
    },
  });
};
