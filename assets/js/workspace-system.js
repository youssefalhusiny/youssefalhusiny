(() => {
  'use strict';
  const tabs = [...document.querySelectorAll('.crm-tabs [role="tab"]')];
  function select(tab) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowLeft') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowRight') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-workspace-doc], [data-workspace-delete]');
    if (!button) return;
    const clientId = button.dataset.clientId;
    if (button.hasAttribute('data-workspace-delete')) window.deleteClientById(clientId);
    else window.openClientDoc(button.dataset.workspaceDoc, clientId);
  });
  document.addEventListener('clientdatachange', () => window.renderWorkspaceClients?.());
  window.addEventListener('storage', () => window.renderWorkspaceClients?.());
})();
