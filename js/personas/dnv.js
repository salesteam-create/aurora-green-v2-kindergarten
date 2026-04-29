window.DnvViews = {};

window.DnvViews['review-queue'] = function (root) {
  const q = window.demoState.dnvQueue.filter(s => s.status === 'pending');
  const selId = window.demoState.selectedSubmissionId && q.find(s => s.id === window.demoState.selectedSubmissionId) ? window.demoState.selectedSubmissionId : (q[0]?.id || null);
  const sub = q.find(s => s.id === selId);

  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Review Queue</h1>
      <div class="text-slate-400 text-sm mt-1">${q.length} pre-validated submissions awaiting review.</div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-5 space-y-2">
        ${q.length === 0 ? '<div class="card p-6 text-sm text-slate-400">Queue is clear.</div>' : q.map(s => `
          <div class="card p-4 cursor-pointer ${s.id===selId?'border-teal-400':''}" data-sid="${s.id}">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium pr-2">${s.certName}</div>
              <span class="pill pill-info">Pending</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">${s.vesselName} · ${s.componentName}</div>
            <div class="text-xs text-slate-500 mt-2">${s.submittedBy} · ${s.session ? 'just now' : window.fmtRelative(s.submittedAt)}</div>
          </div>
        `).join('')}
      </div>
      <div class="col-span-7" id="sub-detail">
        ${sub ? submissionDetailHTML(sub) : '<div class="card p-6 text-slate-400 text-sm">Select a submission to review.</div>'}
      </div>
    </div>
  `;

  root.querySelectorAll('[data-sid]').forEach(el => el.addEventListener('click', () => {
    window.demoState.selectedSubmissionId = el.dataset.sid;
    window.render();
  }));

  if (sub) wireDecision(sub);
};

function submissionDetailHTML(s) {
  return `
    <div class="card p-6 space-y-5">
      <div>
        <div class="flex items-center justify-between">
          <div class="font-semibold text-lg">${s.certName}</div>
          <span class="pill pill-info">Pending review</span>
        </div>
        <div class="text-xs text-slate-400 mt-1">${s.vesselName} · ${s.componentName} · submitted ${s.session ? 'just now' : window.fmtRelative(s.submittedAt)} by ${s.submittedBy}</div>
      </div>

      <div>
        <div class="text-sm text-slate-400 mb-2">Uploaded documents</div>
        <div class="space-y-1.5">
          ${s.docs.map(d => `
            <div class="flex items-center gap-2 bg-slate-900/50 rounded px-3 py-2 text-sm">
              <i data-lucide="file-text" class="w-4 h-4 text-slate-400"></i>
              <span class="text-slate-200">${d}</span>
              <span class="ml-auto text-xs text-slate-500">PDF</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-teal-400/5 border border-teal-400/20 rounded-lg p-4">
        <div class="flex items-center gap-2 text-teal-300 font-medium mb-1">
          <i data-lucide="sparkles" class="w-4 h-4"></i> Aurora AI · Pre-validation summary
        </div>
        <div class="text-sm text-slate-200 leading-relaxed">${s.aiNotes}</div>
      </div>

      <div>
        <textarea id="reviewer-notes" class="w-full bg-slate-900/70 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-teal-400" rows="3" placeholder="Reviewer notes (optional)"></textarea>
      </div>

      <div class="flex items-center gap-3">
        <button id="approve" class="px-4 py-2 rounded-lg bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300">Approve</button>
        <button id="request-changes" class="px-4 py-2 rounded-lg border border-amber-500/50 text-amber-300 hover:bg-amber-500/10">Request changes</button>
        <button id="reject" class="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-rose-400 hover:text-rose-300">Reject</button>
      </div>
    </div>
  `;
}

function wireDecision(sub) {
  const approve = document.getElementById('approve');
  const reqch = document.getElementById('request-changes');
  const reject = document.getElementById('reject');

  approve && approve.addEventListener('click', () => decide(sub, 'approved'));
  reqch && reqch.addEventListener('click', () => decide(sub, 'changes-requested'));
  reject && reject.addEventListener('click', () => decide(sub, 'rejected'));
}

function decide(sub, decision) {
  const notesEl = document.getElementById('reviewer-notes');
  const reviewerNotes = (notesEl && notesEl.value.trim()) || '';

  window.updateState(state => {
    const queued = state.dnvQueue.find(x => x.id === sub.id);
    if (!queued) return;
    queued.status = decision;

    const v = state.vessels[sub.vesselId];
    if (v && v.components[sub.componentId]) {
      const cert = v.components[sub.componentId].certifications.find(c => c.id === sub.certId);
      if (cert) {
        if (decision === 'approved') cert.status = 'approved';
        else if (decision === 'changes-requested') cert.status = 'partial';
        else if (decision === 'rejected') cert.status = 'missing';
      }
    }

    state.completedReviews.unshift({
      id: sub.id, vesselName: sub.vesselName,
      certId: sub.certId, certName: sub.certName,
      componentId: sub.componentId, componentName: sub.componentName,
      submittedBy: sub.submittedBy, decidedAt: new Date().toISOString(),
      decision, reviewerNotes, session: true,
    });
    state.dnvQueue = state.dnvQueue.filter(x => x.id !== sub.id);
    state.selectedSubmissionId = null;

    const verb = decision === 'approved' ? 'approved' : decision === 'rejected' ? 'rejected' : 'requested changes to';
    const noteSuffix = reviewerNotes
      ? `: ${reviewerNotes.length > 80 ? reviewerNotes.slice(0, 77) + '...' : reviewerNotes}`
      : '.';
    state.recentActivity.unshift({ at: new Date().toISOString(), persona: 'dnv', session: true,
      text: `DNV ${verb} ${sub.certName}${noteSuffix}` });
  });
  window.toast(`${sub.certName} · ${decision.replace('-', ' ')}`);
}

window.DnvViews.completed = function (root) {
  const items = window.demoState.completedReviews;
  root.innerHTML = `
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Completed Reviews</h1>
      <div class="text-slate-400 text-sm mt-1">${items.length} decisions on record.</div>
    </div>
    <div class="card p-5">
      ${items.length === 0 ? '<div class="text-sm text-slate-500">No completed reviews yet.</div>' : items.map(r => `
        <div class="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
          <div>
            <div class="text-sm font-medium">${r.certName}</div>
            <div class="text-xs text-slate-500">${r.vesselName} · ${r.submittedBy} · ${r.session ? 'just now' : window.fmtRelative(r.decidedAt)}</div>
          </div>
          <span class="pill ${r.decision==='approved'?'pill-ok':r.decision==='rejected'?'pill-bad':'pill-warn'}">${r.decision.replace('-',' ')}</span>
        </div>
      `).join('')}
    </div>
  `;
};
