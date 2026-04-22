document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('persona-select').addEventListener('change', (e) => {
    window.demoState.currentPersona = e.target.value;
    window.demoState.currentView = window.DEFAULT_VIEW[e.target.value];
    window.render();
  });
  document.getElementById('reset-demo').addEventListener('click', () => {
    window.resetDemo();
  });
  window.render();
});
