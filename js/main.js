document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('persona-select').addEventListener('change', (e) => {
    if (window.demoState.vaultStage === 'locked') return;
    const newPersona = e.target.value;
    const level = window.PERSONA_LEVEL[newPersona];
    window.demoState.currentPersona = newPersona;
    if (level === 'sv') {
      window.demoState.vaultStage = 'sv-shell';
      window.demoState.currentVaultId = null;
    }
    // vault-level: stay in current stage (sv-shell or in-vault).
    window.demoState.currentView = window.DEFAULT_VIEW[newPersona];
    window.render();
  });
  document.getElementById('reset-demo').addEventListener('click', () => {
    window.resetDemo();
  });
  window.render();
});
