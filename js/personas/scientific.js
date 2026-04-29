window.ScientificViews = {};

function placeholder(title, oneLiner) {
  return `
    <div class="mb-6">
      <div class="text-sm text-slate-400">Scientific Committee · Aurora Vault</div>
      <h1 class="text-3xl font-semibold tracking-tight">${title}</h1>
      <div class="text-slate-400 text-sm mt-1">${oneLiner}</div>
    </div>
    <div class="card p-8 max-w-2xl">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-9 h-9 rounded-lg bg-teal-400/15 flex items-center justify-center">
          <i data-lucide="hourglass" class="w-5 h-5 text-teal-300"></i>
        </div>
        <div class="font-medium">Coming up</div>
      </div>
      <div class="text-sm text-slate-400 leading-relaxed">
        This view is scaffolded. Content lands in the next iteration alongside the
        five-pillar criteria framework, coverage matrix, and ratification notes.
      </div>
    </div>
  `;
}

window.ScientificViews.framework = function (root) {
  root.innerHTML = placeholder(
    'Criteria Framework',
    'Five pillars governing what counts toward EU readiness — and at what weight.'
  );
};

window.ScientificViews.coverage = function (root) {
  root.innerHTML = placeholder(
    'Coverage',
    'Which regulations sit under which pillar, and where evidence is currently thin.'
  );
};
