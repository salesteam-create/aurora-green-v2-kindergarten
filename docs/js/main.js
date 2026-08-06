document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('persona-select').addEventListener('change', (e) => {
    if (window.demoState.vaultStage === 'locked') return;
    const newPersona = e.target.value;
    window.demoState.currentPersona = newPersona;
    // Switching personas always pops out to the SV shell so the user
    // explicitly re-enters a vault under the new role.
    window.demoState.vaultStage = 'sv-shell';
    window.demoState.currentVaultId = null;
    window.demoState.currentView = window.DEFAULT_VIEW[newPersona];
    window.render();
  });
  document.getElementById('reset-demo').addEventListener('click', () => {
    window.resetDemo();
  });
  window.render();
});
