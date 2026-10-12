/* Local client records shared by the document pages. */
(function () {
  'use strict';

  const defaultKey = 'alhusiny-client-documents-v1';
  const types = new Set(['welcome', 'deck', 'agreement', 'invoice', 'storyboard', 'moodboard', 'guide', 'payment-receipt', 'portfolio-deck']);
  const pageType = location.pathname.split('/').pop().replace(/\.html$/i, '');
  let storageKey = defaultKey;
  let unsaved = false;
  let restoring = false;
  let template = null;
  let documentObserver;
  function draftKey(id = currentClientId) { return `${storageKey}:draft:${pageType}:${id || 'unassigned'}`; }
  function saveDraft() {
    if (!types.has(pageType) || restoring) return;
    try {
      localStorage.setItem(draftKey(), JSON.stringify(captureDocument()));
      setSaveStatus(currentClientId ? 'مسودة محفوظة في هذا المتصفح؛ قاعدة البيانات غير متصلة' : 'مسودة محفوظة في هذا المتصفح — اختر عميلًا أو اضغط حفظ بيانات العميل');
    } catch (_) { setSaveStatus('تعذّر حفظ التعديلات؛ مساحة المتصفح ممتلئة أو التخزين محظور', true); }
  }
  function readDraft() {
    try { return JSON.parse(localStorage.getItem(draftKey())); } catch (_) { return null; }
  }
  function setSaveStatus(text, failed = false) {
    const status = document.getElementById('documentSaveStatus');
    if (status) { status.textContent = text; status.style.color = failed ? '#ef9b9b' : '#aaa'; }
  }

  function normalize(raw) {
    if (Array.isArray(raw)) return { activeClientId: '', clients: raw };
    if (!raw || typeof raw !== 'object') return { activeClientId: '', clients: [] };
    const clients = Array.isArray(raw.clients) ? raw.clients : Object.values(raw.clients || {});
    return { ...raw, activeClientId: raw.activeClientId || '', clients };
  }

  function findStorageKey() {
    if (localStorage.getItem(defaultKey)) return defaultKey;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!/client|عميل/i.test(key || '')) continue;
      try {
        const value = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(value) && value.every(item => item && typeof item === 'object' && 'id' in item)) return key;
        if (value && (Array.isArray(value.clients) || (value.clients && typeof value.clients === 'object'))) return key;
      } catch (_) { /* Ignore unrelated values. */ }
    }
    return defaultKey;
  }

  try { storageKey = findStorageKey(); } catch (_) { /* Private browsing can block storage. */ }

  function getClientDB() {
    try { return normalize(JSON.parse(localStorage.getItem(storageKey))); }
    catch (_) { return { activeClientId: '', clients: [] }; }
  }

  function putClientDB(db) {
    try { localStorage.setItem(storageKey, JSON.stringify(db)); document.dispatchEvent(new Event('clientdatachange')); return true; }
    catch (_) { alert(window.documentLanguage?.t('تعذّر حفظ البيانات في المتصفح. تحقق من مساحة التخزين.') ?? 'تعذّر حفظ البيانات في المتصفح. تحقق من مساحة التخزين.'); return false; }
  }

  const pageQuery = new URLSearchParams(location.search);
  let currentClientId = pageQuery.get('clientId') || (pageQuery.has('new') ? '' : getClientDB().activeClientId);
  let saveTimer;

  function getCurrentClientId() { return currentClientId || ''; }

  function getAllClients() { return getClientDB().clients; }

  function editableFields() {
    return [...document.querySelectorAll('.editable-field, .editable')].filter(el => !el.closest('#invoiceItemsList'));
  }

  function captureDocument() {
    const fields = {};
    editableFields().forEach((el, index) => { fields[el.id || `field-${index}`] = window.documentLanguage?.canonicalHTML(el) ?? el.innerHTML; });
    const images = {};
    document.querySelectorAll('[data-img-slot]').forEach(el => {
      if (el.style.backgroundImage) images[el.dataset.imgSlot] = el.style.backgroundImage;
    });
    const inputs = {};
    document.querySelectorAll('.receipt-sheet input[id], .invoice-number-input[id], [data-document-value][id]').forEach(el => { inputs[el.id] = el.value; });
    return { fields, images, inputs, documentState: window.clientDocumentState?.getState?.(), invoiceItems: window.invoiceItemsEditor?.getItems?.(),
      savedAt: new Date().toISOString() };

  }

  // Migrate the positional contract fields used before removal of the registry line.
  function normalizeAgreementFields(fields, recovery = {}) {
    const result = { ...fields };
    const has = key => Object.prototype.hasOwnProperty.call(fields, key);
    const oldLayout = has('field-6') || has('field-8');
    const text = value => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : '';
    const shiftedRegistry = !oldLayout && /^CR-\d+$/i.test(text(fields['field-4']));
    const pairs = [
      ['contractReference', 0, 0], ['contractProviderName', 1, 1],
      ['contractClientCompany', 2, 2], ['contractClientRepresentative', 3, 3],
      ['contractProjectName', 4, 5], ['contractDeliveryDate', 5, 6],
      ['contractSignatoryName', 7, 8]
    ];
    pairs.forEach(([id, currentIndex, oldIndex]) => {
      if (typeof result[id] === 'string') return;
      let value = fields[`field-${oldLayout ? oldIndex : currentIndex}`];
      if (shiftedRegistry && id === 'contractProjectName') value = fields['field-5'];
      if (shiftedRegistry && id === 'contractDeliveryDate') {
        const recoveryIsOld = Object.prototype.hasOwnProperty.call(recovery, 'field-6') || Object.prototype.hasOwnProperty.call(recovery, 'field-8');
        const recoveryShifted = !recoveryIsOld && /^CR-\d+$/i.test(text(recovery['field-4']));
        value = recovery.contractDeliveryDate ?? (recoveryShifted ? undefined : recovery[`field-${recoveryIsOld ? 6 : 5}`]);
      }
      if (typeof value === 'string') result[id] = value;
    });
    return result;
  }

  function restoreDocument(saved) {
    if (!saved) return;
    restoring = true;
    try {
    window.clientDocumentState?.setState?.(saved.documentState || template?.documentState);
    if (saved.invoiceItems) window.invoiceItemsEditor?.setItems?.(saved.invoiceItems);
    let fields = saved.fields || saved.data || {};
    if (pageType === 'agreement') {
      const recovery = getClientDB().clients.find(client => client.id === currentClientId)?.documents?.agreement;
      fields = normalizeAgreementFields(fields, recovery?.fields || recovery?.data || {});
    }
    editableFields().forEach((el, index) => {
      const key = el.id || `field-${index}`;
      const value = fields[key] ?? template?.fields?.[key];
      if (typeof value === 'string') el.innerHTML = value;
    });
    const images = saved.images || saved.imageMap || {};
    document.querySelectorAll('[data-img-slot]').forEach(el => {
      el.style.backgroundImage = images[el.dataset.imgSlot] || template?.images?.[el.dataset.imgSlot] || '';
    });
    document.querySelectorAll('.receipt-sheet input[id], .invoice-number-input[id], [data-document-value][id]').forEach(el => { el.value = saved.inputs?.[el.id] ?? template?.inputs?.[el.id] ?? ''; });
    window.clientDocumentState?.refresh?.();
    window.documentLanguage?.refresh();
    } finally { documentObserver?.takeRecords(); restoring = false; unsaved = false; clearTimeout(saveTimer); }
  }

  function clientName() {
    const explicit = document.getElementById('wlcClientName') || document.getElementById('clientName');
    const value = (explicit?.value || explicit?.textContent || '').trim();
    return value && !/اسم العميل|شركة المبتكرون/.test(value) ? value : '';
  }

  function populateClientDropdown() {
    const select = document.getElementById('clientSelector');
    if (!select) return;
    const db = getClientDB();
    select.replaceChildren(new Option('-- عميل عام --', ''));
    db.clients.forEach(client => select.add(new Option(client.name || 'عميل بلا اسم', client.id)));
    select.value = currentClientId || '';
  }

  function loadSelectedClient(id) {
    if (unsaved && currentClientId !== id) { saveDraft(); if (currentClientId) saveCurrentClient(true); }
    clearTimeout(saveTimer);
    currentClientId = id || '';
    const db = getClientDB();
    db.activeClientId = currentClientId;
    putClientDB(db);
    populateClientDropdown();
    const client = db.clients.find(item => item.id === id);
    if (types.has(pageType)) {
      const saved = client?.documents?.[pageType];
      const draft = readDraft();
      restoreDocument(draft && (!saved || draft.savedAt > saved.savedAt) ? draft : saved || template);
      setSaveStatus('الحفظ في هذا المتصفح فقط؛ قاعدة البيانات غير متصلة');
    }
    if (types.has(pageType)) {
      const url = new URL(location.href);
      if (currentClientId) url.searchParams.set('clientId', currentClientId);
      else url.searchParams.delete('clientId');
      if (currentClientId) url.searchParams.delete('new');
      history.replaceState(null, '', url);
    }

    document.dispatchEvent(new Event('clientdatachange'));
  }

  function saveCurrentClient(silent) {
    if (!types.has(pageType)) return;
    const db = getClientDB();
    let id = currentClientId;
    let client = db.clients.find(item => item.id === id);
    if (!client) {
      const name = clientName() || (silent ? '' : prompt(window.documentLanguage?.t('اسم العميل أو الشركة:') ?? 'اسم العميل أو الشركة:'))?.trim();
      if (!name) return;
      id = (window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()));
      client = { id, name, documents: {}, lastModified: '' };
      db.clients.push(client);
    }
    const previousDraftKey = draftKey();
    currentClientId = id;
    client.documents = client.documents || {};
    client.documents[pageType] = captureDocument();
    client.lastModified = new Date().toISOString();
    db.activeClientId = id;
    if (putClientDB(db)) {
      unsaved = false;
      try { localStorage.removeItem(previousDraftKey); localStorage.removeItem(draftKey()); } catch (_) {}
      setSaveStatus('تم الحفظ في هذا المتصفح؛ قاعدة البيانات غير متصلة');
      populateClientDropdown();
      const url = new URL(location.href);
      url.searchParams.set('clientId', id);
      url.searchParams.delete('new');
      history.replaceState(null, '', url);
      if (!silent && typeof window.showToast === 'function') window.showToast('تم حفظ بيانات العميل');
    }
  }

  function markUnsavedChanges() {
    if (restoring) return;
    unsaved = true;
    clearTimeout(saveTimer);
    if (types.has(pageType)) saveTimer = setTimeout(() => { saveDraft(); if (currentClientId) saveCurrentClient(true); }, 500);
  }

  function createWorkspaceClient() {
    const name = prompt(window.documentLanguage?.t('اسم العميل أو الشركة:') ?? 'اسم العميل أو الشركة:')?.trim();
    if (!name) return;
    const db = getClientDB();
    const id = window.crypto?.randomUUID?.() || String(Date.now());
    db.clients.push({ id, name, documents: {}, lastModified: new Date().toISOString() });
    if (putClientDB(db)) window.renderWorkspaceClients?.();
  }


  function showToast(message) {
    let toast = document.getElementById('clientManagerToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'clientManagerToast';
      Object.assign(toast.style, { position: 'fixed', bottom: '24px', left: '50%',
        transform: 'translateX(-50%)', padding: '10px 18px', background: '#222',
        color: '#fff', border: '1px solid #555', borderRadius: '6px',
        zIndex: '9999', font: '14px IBM Plex Sans Arabic, sans-serif' });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => { toast.hidden = true; }, 3000);
  }

  function openNewDoc(type) {
    if (!types.has(type)) return;
    const db = getClientDB();
    db.activeClientId = '';
    putClientDB(db);
    location.href = `${pageType === 'workspace' ? 'documents/' : ''}${type}.html?new=1`;
  }

  function openClientDoc(type, id) {
    if (!types.has(type)) return;
    const db = getClientDB();
    db.activeClientId = id;
    putClientDB(db);
    location.href = `${pageType === 'workspace' ? 'documents/' : ''}${type}.html?clientId=${encodeURIComponent(id)}`;
  }

  function deleteClientById(id) {
    const db = getClientDB();
    const client = db.clients.find(item => item.id === id);
    if (!client || !confirm(window.documentLanguage?.t(`حذف ملف ${client.name}؟`) ?? `حذف ملف ${client.name}؟`)) return;
    db.clients = db.clients.filter(item => item.id !== id);
    if (db.activeClientId === id) db.activeClientId = '';
    if (putClientDB(db)) {
      populateClientDropdown();
      if (typeof window.renderWorkspaceClients === 'function') window.renderWorkspaceClients();
    }
  }

  Object.assign(window, { getClientDB, getAllClients, populateClientDropdown,
    loadSelectedClient, saveCurrentClient, markUnsavedChanges, getCurrentClientId, createWorkspaceClient,
    openNewDoc, openClientDoc, deleteClientById, showToast });

  document.addEventListener('DOMContentLoaded', () => {
    if (types.has(pageType)) {
      template = captureDocument();
      if (window.invoiceItemsEditor?.getTemplateItems) template.invoiceItems = window.invoiceItemsEditor.getTemplateItems();
      if (window.clientDocumentState?.getTemplateState) template.documentState = window.clientDocumentState.getTemplateState();
      if (window.receiptTemplateInputs) template.inputs = { ...window.receiptTemplateInputs };
    }
    populateClientDropdown();
    const id = currentClientId;
    if (id && types.has(pageType)) loadSelectedClient(id);
    else if (types.has(pageType) && readDraft()) restoreDocument(readDraft());
    if (types.has(pageType)) {
      const profile = document.querySelector('[data-document-client-profile]');
      if (profile && !document.querySelector('[data-client-save-button]')) {
        const button = document.createElement('button');
        button.type = 'button'; button.dataset.clientSaveButton = '';
        button.textContent = 'حفظ بيانات العميل';
        button.style.cssText = 'display:block;margin:12px auto 24px;padding:6px 12px;background:none;border:1px solid #333;color:#aaa;font:12px IBM Plex Sans Arabic,sans-serif;cursor:pointer';
        button.addEventListener('click', () => saveCurrentClient(false));
        profile.after(button);
        const status = document.createElement('p'); status.id = 'documentSaveStatus'; status.setAttribute('role', 'status');
        status.style.cssText = 'text-align:center;font:12px IBM Plex Sans Arabic,sans-serif;margin:8px auto 20px;color:#aaa';
        status.textContent = 'الحفظ في هذا المتصفح فقط؛ قاعدة البيانات غير متصلة';
        button.after(status);
      }
    }
    document.addEventListener('change', event => { if (event.target.closest('.deck-slide select, .receipt-sheet input, .invoice-number-input, [data-document-value], [data-client-avatar-input]')) markUnsavedChanges(); });
    document.addEventListener('click', event => { if (event.target.closest('[data-invoice-plan], [data-payment-method], [data-invoice-currency], [data-stage-index], [data-receipt-plan], [data-contract-plan]')) markUnsavedChanges(); });
    if (types.has(pageType)) {
      documentObserver = new MutationObserver(records => {
        if (restoring || window.documentLanguage?.isApplying) return;
        if (records.some(record => {
          const element = record.target.nodeType === 1 ? record.target : record.target.parentElement;
          return element?.closest?.('.editable-field, .editable, [data-img-slot]');
        })) markUnsavedChanges();
      });
      documentObserver.observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['style']});
    }
    document.addEventListener('input', event => {
      if (event.target.closest('.editable-field, .editable, .receipt-sheet input, .invoice-number-input')) markUnsavedChanges();
    });
  });
  window.addEventListener('pagehide', () => { if (unsaved) { saveDraft(); if (currentClientId) saveCurrentClient(true); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && unsaved) { saveDraft(); if (currentClientId) saveCurrentClient(true); } });
})();
