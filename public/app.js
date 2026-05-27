const state = {
  catalog: null,
  labels: {},
  lang: null,
  type: null,
  mode: 'raw',
  entry: null,
  source: '',
  parsed: null,
  parseError: null,
};

const langDirConfig = document.getElementById('langDirConfig');
const langRow = document.getElementById('langRow');
const filterInput = document.getElementById('filterInput');
const typeList = document.getElementById('typeList');
const sidebarFooter = document.getElementById('sidebarFooter');
const fileInfo = document.getElementById('fileInfo');
const modeBtn = document.getElementById('modeBtn');
const reloadBtn = document.getElementById('reloadBtn');
const saveBtn = document.getElementById('saveBtn');
const statusEl = document.getElementById('status');
const rawWrap = document.getElementById('rawWrap');
const formWrap = document.getElementById('formWrap');
const rawArea = document.getElementById('rawArea');
const formRoot = document.getElementById('formRoot');
const emptyState = document.getElementById('emptyState');
const uiLangFlags = document.getElementById('uiLangFlags');
const docBtn = document.getElementById('docBtn');
const modalOverlay = document.getElementById('modalOverlay');
const langDirModal = document.getElementById('langDirModal');

const TYPE_TO_DOC_SECTION = {
  items: 'doc-section-1', itemsets: 'doc-section-1', spells: 'doc-section-2',
  monsters: 'doc-section-3', maps: 'doc-section-4', npc: 'doc-section-5', dialog: 'doc-section-5',
  quests: 'doc-section-6', jobs: 'doc-section-7', skills: 'doc-section-7', crafts: 'doc-section-7',
  alignment: 'doc-section-8', servers: 'doc-section-8', guilds: 'doc-section-9',
  rides: 'doc-section-10', houses: 'doc-section-11', titles: 'doc-section-12',
  effects: 'doc-section-15', states: 'doc-section-16',
};

function updateDocLink() {
  const anchor = state.type && TYPE_TO_DOC_SECTION[state.type]
    ? '#' + TYPE_TO_DOC_SECTION[state.type]
    : '';
  docBtn.href = '/doc.html' + anchor;
}

/* -------------------------------------------------- i18n helpers */

function applyI18n() {
  document.title = i18n.t('app.title');
  document.getElementById('sidebarTitle').textContent = i18n.t('sidebar.title');
  filterInput.placeholder = i18n.t('sidebar.filter');
  fileInfo.textContent = state.entry
    ? fileInfo.textContent
    : i18n.t('topbar.noFile');
  modeBtn.textContent = state.mode === 'raw' ? i18n.t('btn.formMode') : i18n.t('btn.rawMode');
  reloadBtn.textContent = i18n.t('btn.reload');
  saveBtn.textContent = i18n.t('btn.save');
  docBtn.textContent = i18n.t('btn.doc');
  emptyState.textContent = i18n.t('editor.empty');
  renderUiLangFlags();
}

function renderUiLangFlags() {
  uiLangFlags.innerHTML = '';
  for (const lang of i18n.SUPPORTED_LANGS) {
    const btn = document.createElement('button');
    btn.textContent = i18n.FLAGS[lang];
    btn.title = lang.toUpperCase();
    if (lang === i18n.getLang()) btn.classList.add('active');
    btn.onclick = async () => {
      i18n.setLang(lang);
      applyI18n();
      await reloadLabels();
      if (state.catalog) {
        renderTypeList();
        renderFooter();
      }
      if (state.entry && state.mode === 'form' && state.parsed) {
        renderForm(state.parsed);
      }
    };
    uiLangFlags.appendChild(btn);
  }
}

/* -------------------------------------------------- lang dir config */

let configState = { langDir: '', valid: false, favorites: [], recentDirs: [] };

function renderLangDirConfig() {
  langDirConfig.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'config-label';
  label.textContent = i18n.t('config.langDir');
  langDirConfig.appendChild(label);

  const display = document.createElement('div');
  display.className = 'config-display';
  const pathEl = document.createElement('span');
  pathEl.className = 'config-path' + (configState.valid ? '' : ' none');
  const fav = configState.favorites.find(f => f.dir === configState.langDir);
  pathEl.textContent = fav ? fav.name : (configState.langDir || i18n.t('config.none'));
  pathEl.title = configState.langDir || '';
  const manageBtn = document.createElement('button');
  manageBtn.className = 'config-change-btn';
  manageBtn.textContent = i18n.t('config.manage');
  manageBtn.onclick = openLangDirModal;
  display.append(pathEl, manageBtn);
  langDirConfig.appendChild(display);
}

function openLangDirModal() {
  modalOverlay.classList.remove('hidden');
  renderModal();
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeLangDirModal(); };
}

function closeLangDirModal() {
  modalOverlay.classList.add('hidden');
}

function renderModal() {
  const m = langDirModal;
  m.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'modal-header';
  const h3 = document.createElement('h3');
  h3.textContent = i18n.t('config.modalTitle');
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.textContent = '×';
  closeBtn.onclick = closeLangDirModal;
  header.append(h3, closeBtn);
  m.appendChild(header);

  const body = document.createElement('div');
  body.className = 'modal-body';

  if (configState.favorites.length > 0) {
    const favSec = document.createElement('div');
    favSec.className = 'modal-section';
    const favTitle = document.createElement('div');
    favTitle.className = 'modal-section-title';
    favTitle.textContent = '⭐ ' + i18n.t('config.favorites');
    favSec.appendChild(favTitle);
    for (const fav of configState.favorites) {
      favSec.appendChild(makeModalItem(fav.dir, fav.name, true));
    }
    body.appendChild(favSec);
  }

  if (configState.recentDirs.length > 0) {
    const recSec = document.createElement('div');
    recSec.className = 'modal-section';
    const recTitle = document.createElement('div');
    recTitle.className = 'modal-section-title';
    recTitle.textContent = i18n.t('config.recent');
    recSec.appendChild(recTitle);
    for (const dir of configState.recentDirs) {
      const fav = configState.favorites.find(f => f.dir === dir);
      recSec.appendChild(makeModalItem(dir, null, !!fav));
    }
    body.appendChild(recSec);
  }

  const manualSec = document.createElement('div');
  manualSec.className = 'modal-section';
  const manualTitle = document.createElement('div');
  manualTitle.className = 'modal-section-title';
  manualTitle.textContent = i18n.t('config.langDir');
  manualSec.appendChild(manualTitle);
  const manualRow = document.createElement('div');
  manualRow.className = 'modal-input-row';
  const manualInput = document.createElement('input');
  manualInput.placeholder = i18n.t('config.manualPath');
  manualInput.value = configState.langDir || '';
  const manualBtn = document.createElement('button');
  manualBtn.className = 'primary';
  manualBtn.textContent = i18n.t('config.apply');
  manualBtn.onclick = () => applyLangDir(manualInput.value);
  manualInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') applyLangDir(manualInput.value); });
  manualRow.append(manualInput, manualBtn);
  manualSec.appendChild(manualRow);
  body.appendChild(manualSec);

  const scanSec = document.createElement('div');
  scanSec.className = 'modal-section';
  const scanTitle = document.createElement('div');
  scanTitle.className = 'modal-section-title';
  scanTitle.textContent = i18n.t('config.scan');
  scanSec.appendChild(scanTitle);
  const scanRow = document.createElement('div');
  scanRow.className = 'modal-input-row';
  const scanInput = document.createElement('input');
  scanInput.placeholder = i18n.t('config.scanFrom');
  scanInput.value = configState.langDir ? configState.langDir.replace(/\/lang$/, '') : '';
  const scanBtn = document.createElement('button');
  scanBtn.textContent = i18n.t('config.scan');
  scanBtn.onclick = () => doScan(scanInput.value, scanSec);
  scanInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doScan(scanInput.value, scanSec); });
  scanRow.append(scanInput, scanBtn);
  scanSec.appendChild(scanRow);
  body.appendChild(scanSec);

  m.appendChild(body);
}

function makeModalItem(dir, name, isFav) {
  const item = document.createElement('div');
  item.className = 'modal-item' + (dir === configState.langDir ? ' active' : '');

  const star = document.createElement('button');
  star.className = 'mi-star' + (isFav ? ' faved' : '');
  star.textContent = isFav ? '★' : '☆';
  star.title = isFav ? i18n.t('config.removeFav') : i18n.t('config.addFav');
  star.onclick = async (e) => {
    e.stopPropagation();
    if (isFav) {
      const r = await fetchJSON('/api/config/favorite/remove', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ langDir: dir }),
      });
      configState.favorites = r.favorites;
    } else {
      const favName = prompt(i18n.t('config.favName'), name || dir.split('/').filter(Boolean).pop());
      if (favName === null) return;
      const r = await fetchJSON('/api/config/favorite/add', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ langDir: dir, name: favName }),
      });
      configState.favorites = r.favorites;
    }
    renderModal();
    renderLangDirConfig();
  };

  const info = document.createElement('div');
  info.className = 'mi-info';
  info.onclick = () => applyLangDir(dir);
  if (name) {
    const nameEl = document.createElement('div');
    nameEl.className = 'mi-name';
    nameEl.textContent = name;
    info.appendChild(nameEl);
  }
  const pathEl = document.createElement('div');
  pathEl.className = 'mi-path';
  pathEl.textContent = dir;
  info.appendChild(pathEl);

  item.append(star, info);

  if (dir === configState.langDir) {
    const badge = document.createElement('span');
    badge.className = 'mi-badge';
    badge.textContent = i18n.t('config.active');
    item.appendChild(badge);
  }

  const rmBtn = document.createElement('button');
  rmBtn.className = 'mi-remove';
  rmBtn.textContent = '×';
  rmBtn.title = i18n.t('config.remove');
  rmBtn.onclick = async (e) => {
    e.stopPropagation();
    try {
      const r = await fetchJSON('/api/config/recent/remove', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ langDir: dir }),
      });
      configState.recentDirs = r.dirs;
      if (isFav) {
        const r2 = await fetchJSON('/api/config/favorite/remove', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ langDir: dir }),
        });
        configState.favorites = r2.favorites;
      }
      renderModal();
      renderLangDirConfig();
    } catch {}
  };
  item.appendChild(rmBtn);

  return item;
}

async function doScan(root, container) {
  const old = container.querySelector('.modal-scan-results');
  if (old) old.remove();
  const oldStatus = container.querySelector('.modal-status');
  if (oldStatus) oldStatus.remove();

  const status = document.createElement('div');
  status.className = 'modal-status';
  status.textContent = i18n.t('config.scanning');
  container.appendChild(status);

  try {
    const r = await fetchJSON('/api/config/scan', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ root: root || '' }),
    });
    status.remove();
    if (r.results.length === 0) {
      const noRes = document.createElement('div');
      noRes.className = 'modal-status error';
      noRes.textContent = i18n.t('config.noResults');
      container.appendChild(noRes);
    } else {
      const s = document.createElement('div');
      s.className = 'modal-status';
      s.textContent = i18n.t('config.scanResults', r.results.length);
      container.appendChild(s);
      const results = document.createElement('div');
      results.className = 'modal-scan-results';
      for (const dir of r.results) {
        const item = document.createElement('div');
        item.className = 'modal-scan-item';
        item.textContent = dir;
        item.title = dir;
        item.onclick = () => applyLangDir(dir);
        results.appendChild(item);
      }
      container.appendChild(results);
    }
  } catch (e) {
    status.className = 'modal-status error';
    status.textContent = e.message;
  }
}

async function applyLangDir(dir) {
  try {
    const r = await fetchJSON('/api/config', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ langDir: dir }),
    });
    configState.langDir = r.langDir;
    configState.valid = r.valid;
    state.type = null;
    state.entry = null;
    state.parsed = null;
    state.source = '';
    fileInfo.textContent = i18n.t('topbar.noFile');
    emptyState.classList.remove('hidden');
    rawWrap.classList.add('hidden');
    formWrap.classList.add('hidden');
    modeBtn.disabled = true;
    reloadBtn.disabled = true;
    saveBtn.disabled = true;
    await loadLangDirConfig();
    closeLangDirModal();
    setStatus(i18n.t('config.saved', r.langDir), 'ok');
    await loadCatalog();
  } catch (e) {
    const m = langDirModal.querySelector('.modal-body');
    if (m) {
      const err = document.createElement('div');
      err.className = 'modal-status error';
      err.textContent = e.message;
      m.appendChild(err);
    }
  }
}

async function loadLangDirConfig() {
  try {
    const cfg = await fetchJSON('/api/config');
    configState.langDir = cfg.langDir;
    configState.valid = cfg.valid;
    configState.favorites = cfg.favorites || [];
    const recent = await fetchJSON('/api/config/recent').catch(() => ({ dirs: [] }));
    configState.recentDirs = recent.dirs || [];
  } catch {}
  renderLangDirConfig();
}

/* -------------------------------------------------- status / fetch */

function setStatus(msg, kind = '') {
  statusEl.textContent = msg || '';
  statusEl.className = kind;
}

async function fetchJSON(url, opts) {
  const r = await fetch(url, opts);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
  return j;
}

/* -------------------------------------------------- catalog */

async function loadCatalog() {
  const [catalog, labels, status] = await Promise.all([
    fetchJSON('/api/catalog'),
    fetchJSON('/api/labels?lang=' + i18n.getLang()).catch(() => ({})),
    fetchJSON('/api/status').catch(() => ({})),
  ]);
  state.catalog = catalog;
  state.labels = labels;
  state.lang ||= state.catalog.langs.find((l) => l === 'fr') || state.catalog.langs[0];
  renderLangRow();
  renderTypeList();
  renderFooter();
}

async function reloadLabels() {
  state.labels = await fetchJSON('/api/labels?lang=' + i18n.getLang()).catch(() => ({}));
}

function renderFooter() {
  sidebarFooter.innerHTML =
    `${i18n.t('footer.stats', state.catalog.items.length, state.catalog.types.length)}<br>` +
    `<span style="color:#76d676">${i18n.t('footer.backend', 'pure-js')}</span>`;
}

/* -------------------------------------------------- labels lookup */

function labelFor(pathArr) {
  const map = state.labels[state.type];
  if (!map) return null;
  for (let len = pathArr.length; len > 0; len--) {
    const slice = pathArr.slice(0, len).map((p) => {
      if (typeof p === 'number') return { lit: String(p), isNum: true };
      if (typeof p === 'string' && /^\d+$/.test(p)) return { lit: p, isNum: true };
      return { lit: p, isNum: false };
    });
    const numericIdx = slice.map((s, i) => (s.isNum ? i : -1)).filter((i) => i >= 0);
    const N = numericIdx.length;
    for (let mask = 0; mask < (1 << N); mask++) {
      const built = slice.map((s) => s.lit);
      for (let bit = 0; bit < N; bit++) {
        if (mask & (1 << bit)) built[numericIdx[bit]] = '*';
      }
      const key = built.join('.');
      if (map[key]) return map[key];
    }
  }
  return null;
}

function getOptionalFields(path, existingKeys) {
  const map = state.labels[state.type];
  if (!map) return [];
  const patternParts = path.map((p) => {
    if (typeof p === 'number' || (typeof p === 'string' && /^\d+$/.test(p))) return '*';
    return p;
  });
  const prefix = patternParts.join('.');
  const fields = [];
  const seen = new Set();
  for (const key of Object.keys(map)) {
    if (!key.startsWith(prefix + '.')) continue;
    const rest = key.slice(prefix.length + 1);
    const seg = rest.split('.')[0];
    if (seg === '*' || seen.has(seg) || existingKeys.has(seg)) continue;
    seen.add(seg);
    const hasChildren = Object.keys(map).some(
      (k) => k.startsWith(prefix + '.' + seg + '.') && k !== key
    );
    fields.push({ key: seg, label: map[key], isContainer: hasChildren });
  }
  return fields;
}

/* -------------------------------------------------- sidebar */

function renderLangRow() {
  langRow.innerHTML = '';
  for (const l of state.catalog.langs) {
    const b = document.createElement('button');
    b.textContent = l;
    if (l === state.lang) b.classList.add('active');
    b.onclick = () => {
      state.lang = l;
      renderLangRow();
      renderTypeList();
      if (state.type) loadFile(state.type, state.lang);
    };
    langRow.appendChild(b);
  }
}

function renderTypeList() {
  const filter = filterInput.value.trim().toLowerCase();
  typeList.innerHTML = '';
  const itemsByType = new Map();
  for (const it of state.catalog.items) {
    if (it.lang !== state.lang) continue;
    itemsByType.set(it.type, it);
  }
  const types = state.catalog.types.filter((t) => !filter || t.toLowerCase().includes(filter));
  for (const t of types) {
    const li = document.createElement('li');
    const it = itemsByType.get(t);
    li.innerHTML = `<span>${t}</span><span class="meta">${it ? '#' + it.id : '—'}</span>`;
    if (!it) {
      li.classList.add('missing');
    } else {
      li.onclick = () => {
        state.type = t;
        renderTypeList();
        loadFile(t, state.lang);
      };
    }
    if (state.type === t) li.classList.add('active');
    typeList.appendChild(li);
  }
}

filterInput.addEventListener('input', renderTypeList);

/* -------------------------------------------------- file loading */

async function loadFile(type, lang) {
  setStatus(i18n.t('status.loading', type + '_' + lang));
  emptyState.classList.add('hidden');
  try {
    const data = await fetchJSON(`/api/file/${type}/${lang}`);
    state.entry = data.entry;
    state.source = data.source;
    state.parsed = data.parsed;
    state.parseError = data.parseError;
    fileInfo.innerHTML = `${data.entry.file} <small>${data.source.length.toLocaleString()} ${i18n.t('unit.chars')}</small>`;
    modeBtn.disabled = !state.parsed;
    reloadBtn.disabled = false;
    saveBtn.disabled = false;
    updateDocLink();
    if (state.parseError) {
      setStatus(i18n.t('status.parseError', state.parseError), 'error');
      state.mode = 'raw';
    } else {
      const keys = Object.keys(state.parsed).filter(k => k !== 'FILE_BEGIN' && k !== 'FILE_END');
      const display = keys.length > 20
        ? keys.slice(0, 15).join(', ') + ` … (+${keys.length - 15})`
        : keys.join(', ');
      setStatus(i18n.t('status.loaded', display), 'ok');
    }
    applyMode();
  } catch (e) {
    setStatus(e.message, 'error');
  }
}

/* -------------------------------------------------- mode switching */

function applyMode() {
  modeBtn.textContent = state.mode === 'raw' ? i18n.t('btn.formMode') : i18n.t('btn.rawMode');
  if (state.mode === 'raw') {
    rawWrap.classList.remove('hidden');
    formWrap.classList.add('hidden');
    rawArea.value = state.source;
  } else {
    rawWrap.classList.add('hidden');
    formWrap.classList.remove('hidden');
    renderForm(state.parsed);
  }
}

modeBtn.onclick = async () => {
  if (state.mode === 'raw') {
    const rawEdited = rawArea.value !== state.source;
    if (!rawEdited && state.parsed) {
      state.mode = 'form';
      applyMode();
      return;
    }
    state.source = rawArea.value;
    try {
      state.parsed = clientParseAS2(rawArea.value);
      state.mode = 'form';
      applyMode();
      setStatus(i18n.t('status.formRebuilt'), 'ok');
    } catch (_e) {
      try {
        await reloadAndSwitchToForm();
      } catch (e2) {
        setStatus(i18n.t('status.cannotSwitch', e2.message), 'error');
      }
    }
  } else {
    state.source = serializeFormToSource();
    state.mode = 'raw';
    applyMode();
  }
};

async function reloadAndSwitchToForm() {
  if (!state.type || !state.lang) return;
  setStatus(i18n.t('status.reloading'));
  const data = await fetchJSON(`/api/file/${state.type}/${state.lang}`);
  state.entry = data.entry;
  state.source = data.source;
  state.parsed = data.parsed;
  state.parseError = data.parseError;
  if (state.parseError) throw new Error(state.parseError);
  state.mode = 'form';
  applyMode();
  fileInfo.innerHTML = `${data.entry.file} <small>${data.source.length.toLocaleString()} ${i18n.t('unit.chars')}</small>`;
  const rKeys = Object.keys(state.parsed).filter(k => k !== 'FILE_BEGIN' && k !== 'FILE_END');
  const rDisplay = rKeys.length > 20
    ? rKeys.slice(0, 15).join(', ') + ` … (+${rKeys.length - 15})`
    : rKeys.join(', ');
  setStatus(i18n.t('status.loaded', rDisplay), 'ok');
}

function clientParseAS2(source) {
  const sandbox = {
    System: { security: { allowDomain: () => {} } },
    _parent: { _url: '' },
    Object,
    Array,
    Math,
  };
  const fn = new Function('ctx', `with (ctx) {\n${source}\n}`);
  fn(sandbox);
  const out = {};
  for (const k of Object.keys(sandbox)) {
    if (['System', '_parent', 'Object', 'Array', 'Math'].includes(k)) continue;
    out[k] = sandbox[k];
  }
  return out;
}

reloadBtn.onclick = () => {
  if (state.type && state.lang) loadFile(state.type, state.lang);
};

saveBtn.onclick = async () => {
  if (!state.entry) return;
  saveBtn.disabled = true;
  setStatus(i18n.t('status.saving'));
  try {
    const body = state.mode === 'raw'
      ? { mode: 'raw', source: rawArea.value }
      : { mode: 'form', data: collectFormValues() };
    const r = await fetchJSON(`/api/file/${state.entry.type}/${state.entry.lang}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    setStatus(i18n.t('status.saved', r.file, r.backup), 'ok');
    state.source = state.mode === 'raw' ? rawArea.value : serializeFormToSource();
    if (state.mode === 'form') state.parsed = collectFormValues();
  } catch (e) {
    setStatus(e.message, 'error');
  } finally {
    saveBtn.disabled = false;
  }
};

/* -------------------------------------------------- form renderer */

let formData = null;

function renderForm(parsed) {
  formData = JSON.parse(JSON.stringify(parsed));
  formRoot.innerHTML = '';
  const keys = Object.keys(formData).filter((k) => k !== 'FILE_BEGIN' && k !== 'FILE_END');
  for (const k of keys) {
    formRoot.appendChild(renderSection(k, formData[k], [k]));
  }
}

function renderSection(title, value, path) {
  const section = document.createElement('div');
  section.className = 'section';
  const h2 = document.createElement('h2');
  const isContainer = value !== null && typeof value === 'object';
  const count = isContainer
    ? (Array.isArray(value) ? value.length : Object.keys(value).length)
    : 0;
  const lbl = labelFor(path);
  const titleHtml = lbl
    ? `<span><code>${title}</code> <span class="lbl">${lbl}</span></span>`
    : `<span><code>${title}</code></span>`;
  h2.innerHTML = `${titleHtml}<span class="count">${isContainer ? i18n.t('form.entries', count) : typeof value}</span>`;
  const twisty = document.createElement('span');
  twisty.className = 'twisty';
  twisty.textContent = '▼';
  h2.appendChild(twisty);
  section.appendChild(h2);
  const body = document.createElement('div');
  body.className = 'body';
  section.appendChild(body);
  h2.onclick = () => {
    section.classList.toggle('collapsed');
    twisty.textContent = section.classList.contains('collapsed') ? '▶' : '▼';
  };
  if (count > 50) {
    section.classList.add('collapsed');
    twisty.textContent = '▶';
  }
  if (isContainer) {
    renderContainerBody(body, value, path);
  } else {
    body.appendChild(makeScalarField(title, value, path));
  }
  return section;
}

const SORT_FIELDS = {
  items: { section: 'I.u', fields: ['l', 'p', 'w'] },
  spells: { section: 'S', fields: [] },
  monsters: { section: 'M', fields: [] },
  quests: { section: 'Q.q', fields: [] },
};

function buildSearchText(v) {
  if (typeof v === 'string') return v.toLowerCase();
  if (typeof v !== 'object' || v === null) return String(v);
  return Object.values(v).map(vv => {
    if (typeof vv === 'string') return vv.toLowerCase();
    if (typeof vv === 'number') return String(vv);
    return '';
  }).join(' ');
}

function renderContainerBody(body, value, path) {
  const keys = Array.isArray(value) ? value.map((_, i) => String(i)) : Object.keys(value);
  const isLarge = keys.length > 15;
  const entryEls = [];

  if (isLarge) {
    const bar = document.createElement('div');
    bar.className = 'filter-bar';
    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'search-input';
    search.placeholder = i18n.t('search.placeholder');
    bar.appendChild(search);

    const patternKey = path.join('.');
    const sortDef = SORT_FIELDS[state.type];
    const hasSortFields = sortDef && sortDef.section === patternKey && sortDef.fields.length > 0;

    const sortGroup = document.createElement('div');
    sortGroup.className = 'sort-group';
    const sortSelect = document.createElement('select');
    const optId = document.createElement('option');
    optId.value = '_id'; optId.textContent = i18n.t('search.sortId');
    sortSelect.appendChild(optId);
    const optName = document.createElement('option');
    optName.value = 'n'; optName.textContent = i18n.t('search.sortName');
    sortSelect.appendChild(optName);
    if (hasSortFields) {
      for (const f of sortDef.fields) {
        const lbl = labelFor(path.concat('*', f));
        const opt = document.createElement('option');
        opt.value = f;
        opt.textContent = lbl || f;
        sortSelect.appendChild(opt);
      }
    }
    sortGroup.appendChild(sortSelect);
    bar.appendChild(sortGroup);

    const countEl = document.createElement('span');
    countEl.className = 'filter-count';
    countEl.textContent = i18n.t('search.results', keys.length, keys.length);
    bar.appendChild(countEl);

    body.appendChild(bar);

    for (const k of keys) {
      const v = Array.isArray(value) ? value[Number(k)] : value[k];
      const entry = makeEntry(k, v, path.concat(Array.isArray(value) ? Number(k) : k));
      entry._searchText = (k + ' ' + buildSearchText(v)).toLowerCase();
      entry._sortKey = k;
      entry._sortName = (v && typeof v === 'object' && typeof v.n === 'string') ? v.n.toLowerCase() : '';
      entry._entryValue = v;
      entryEls.push(entry);
      body.appendChild(entry);
    }

    let debounce = null;
    const applyFilter = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      for (const el of entryEls) {
        const match = !q || el._searchText.includes(q);
        el.classList.toggle('filter-hidden', !match);
        if (match) shown++;
      }
      countEl.textContent = i18n.t('search.results', shown, entryEls.length);
    };
    search.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(applyFilter, 150);
    });

    sortSelect.addEventListener('change', () => {
      const field = sortSelect.value;
      const sorted = [...entryEls];
      if (field === '_id') {
        sorted.sort((a, b) => {
          const na = Number(a._sortKey), nb = Number(b._sortKey);
          if (!isNaN(na) && !isNaN(nb)) return na - nb;
          return a._sortKey.localeCompare(b._sortKey);
        });
      } else if (field === 'n') {
        sorted.sort((a, b) => a._sortName.localeCompare(b._sortName));
      } else {
        sorted.sort((a, b) => {
          const va = a._entryValue && typeof a._entryValue === 'object' ? Number(a._entryValue[field]) || 0 : 0;
          const vb = b._entryValue && typeof b._entryValue === 'object' ? Number(b._entryValue[field]) || 0 : 0;
          return vb - va;
        });
      }
      for (const el of sorted) body.appendChild(el);
    });
  } else {
    for (const k of keys) {
      const v = Array.isArray(value) ? value[Number(k)] : value[k];
      body.appendChild(makeEntry(k, v, path.concat(Array.isArray(value) ? Number(k) : k)));
    }
  }

  if (!Array.isArray(value)) {
    body.appendChild(makeAddFieldRow(value, path));
  }
}

function makeEntry(key, value, path) {
  const entry = document.createElement('div');
  entry.className = 'entry';
  const isContainer = value !== null && typeof value === 'object';
  if (!isContainer) {
    entry.appendChild(makeScalarField(key, value, path));
    return entry;
  }
  const head = document.createElement('div');
  head.className = 'entry-header';
  const k = document.createElement('span');
  k.className = 'key';
  k.textContent = '[' + key + ']';
  const nameHint = (value && typeof value === 'object' && typeof value.n === 'string')
    ? value.n : null;
  const lbl = labelFor(path);
  const preview = document.createElement('span');
  preview.className = 'preview';
  preview.textContent = nameHint || previewValue(value);
  if (lbl) {
    const tag = document.createElement('span');
    tag.className = 'lbl';
    tag.textContent = lbl;
    head.appendChild(k);
    head.appendChild(tag);
  } else {
    head.appendChild(k);
  }
  head.appendChild(preview);
  const entryBody = document.createElement('div');
  entryBody.className = 'entry-body';
  head.onclick = () => entry.classList.toggle('collapsed');
  entry.classList.add('collapsed');
  renderContainerBody(entryBody, value, path);
  entry.appendChild(head);
  entry.appendChild(entryBody);
  return entry;
}

function makeScalarField(name, value, path) {
  const field = document.createElement('div');
  field.className = 'field';
  const lbl = document.createElement('label');
  const humanLbl = labelFor(path);
  if (humanLbl) {
    lbl.innerHTML = `<code>${esc(name)}</code><span class="lbl">${esc(humanLbl)}</span>`;
  } else {
    lbl.textContent = name;
  }
  field.appendChild(lbl);
  let input;
  const t = typeof value;
  if (t === 'boolean') {
    input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = value;
    input.addEventListener('change', () => setAtPath(path, input.checked));
  } else if (t === 'number') {
    input = document.createElement('input');
    input.type = 'number';
    input.value = value;
    input.step = 'any';
    input.addEventListener('input', () => {
      const n = Number(input.value);
      setAtPath(path, Number.isFinite(n) ? n : 0);
    });
  } else {
    const s = value === null ? '' : String(value);
    if (s.length > 60 || s.includes('\n')) {
      input = document.createElement('textarea');
      input.value = s;
      input.rows = Math.min(8, s.split('\n').length || 1);
      input.addEventListener('input', () => setAtPath(path, input.value));
    } else {
      input = document.createElement('input');
      input.type = 'text';
      input.value = s;
      input.addEventListener('input', () => setAtPath(path, input.value));
    }
  }
  field.appendChild(input);
  const badge = document.createElement('span');
  badge.className = 'type-badge';
  badge.textContent = t;
  field.appendChild(badge);
  return field;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/* -------------------------------------------------- add field */

function makeAddFieldRow(obj, path) {
  const row = document.createElement('div');
  row.className = 'add-field-row';
  const btn = document.createElement('button');
  btn.className = 'add-field-btn';
  btn.textContent = i18n.t('form.addField');
  row.appendChild(btn);
  btn.onclick = (e) => {
    e.stopPropagation();
    const existing = row.querySelector('.add-field-popover');
    if (existing) { existing.remove(); return; }
    const popover = document.createElement('div');
    popover.className = 'add-field-popover';
    const existingKeys = new Set(Object.keys(obj));
    const optFields = getOptionalFields(path, existingKeys);
    if (optFields.length > 0) {
      const title = document.createElement('div');
      title.className = 'popover-title';
      title.textContent = i18n.t('form.optional');
      popover.appendChild(title);
      for (const f of optFields) {
        const opt = document.createElement('div');
        opt.className = 'field-option';
        opt.innerHTML = `<span class="fo-key">${esc(f.key)}</span><span class="fo-label">${esc(f.label)}</span>`;
        opt.onclick = () => {
          const defVal = f.isContainer ? {} : '';
          addFieldToObj(obj, path, f.key, defVal, row);
          popover.remove();
        };
        popover.appendChild(opt);
      }
    }
    const customRow = document.createElement('div');
    customRow.className = 'custom-row';
    const keyInput = document.createElement('input');
    keyInput.placeholder = i18n.t('form.fieldKey');
    const typeSelect = document.createElement('select');
    for (const [val, lbl] of [['string', i18n.t('type.string')], ['number', i18n.t('type.number')], ['boolean', i18n.t('type.boolean')], ['object', i18n.t('type.object')], ['array', i18n.t('type.array')]]) {
      const o = document.createElement('option');
      o.value = val;
      o.textContent = lbl;
      typeSelect.appendChild(o);
    }
    const addBtn = document.createElement('button');
    addBtn.textContent = i18n.t('form.add');
    addBtn.onclick = () => {
      const k = keyInput.value.trim();
      if (!k) return;
      const defaults = { string: '', number: 0, boolean: false, object: {}, array: [] };
      addFieldToObj(obj, path, k, defaults[typeSelect.value], row);
      popover.remove();
    };
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = i18n.t('form.cancel');
    cancelBtn.onclick = () => popover.remove();
    customRow.append(keyInput, typeSelect, addBtn, cancelBtn);
    popover.appendChild(customRow);
    row.appendChild(popover);
    keyInput.focus();
  };
  return row;
}

function addFieldToObj(obj, path, key, defaultValue, addFieldRowEl) {
  obj[key] = defaultValue;
  setAtPath(path.concat(key), defaultValue);
  const parentBody = addFieldRowEl.parentElement;
  const newEntry = makeEntry(key, defaultValue, path.concat(key));
  if (newEntry.classList.contains('collapsed')) newEntry.classList.remove('collapsed');
  parentBody.insertBefore(newEntry, addFieldRowEl);
}

/* -------------------------------------------------- data helpers */

function setAtPath(path, value) {
  let node = formData;
  for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
  node[path[path.length - 1]] = value;
}

function previewValue(v) {
  if (Array.isArray(v)) return `[ ${v.length} ]`;
  if (v && typeof v === 'object') {
    const ks = Object.keys(v);
    if (ks.length === 0) return '{ }';
    const first = ks.slice(0, 3).map((k) => {
      const vv = v[k];
      if (typeof vv === 'string') return `${k}:"${vv.slice(0, 18)}${vv.length > 18 ? '…' : ''}"`;
      if (typeof vv === 'object') return `${k}:…`;
      return `${k}:${vv}`;
    }).join(', ');
    return `{ ${first}${ks.length > 3 ? ', …' : ''} }`;
  }
  return String(v);
}

function collectFormValues() {
  return formData || state.parsed;
}

function serializeFormToSource() {
  return clientSerializeAS2(collectFormValues());
}

/* -------------------------------------------------- AS2 serializer */

function clientSerializeAS2(data) {
  const lines = ['FILE_BEGIN = true;', 'System.security.allowDomain(_parent._url);'];
  const keys = Object.keys(data).filter((k) => k !== 'FILE_BEGIN' && k !== 'FILE_END');
  if ('VERSION' in data) lines.push(`VERSION = ${formatScalar(data.VERSION)};`);
  for (const k of keys) {
    if (k === 'VERSION') continue;
    emitAssignments(lines, k, data[k]);
  }
  lines.push('FILE_END = true;');
  return lines.join('\n') + '\n';
}

function emitAssignments(lines, name, value) {
  if (!isContainer(value)) { lines.push(`${name} = ${formatScalar(value)};`); return; }
  if (Array.isArray(value)) {
    lines.push(`${name} = new Array();`);
    for (let i = 0; i < value.length; i++) lines.push(`${name}[${i}] = ${formatValue(value[i])};`);
    return;
  }
  lines.push(`${name} = new Object();`);
  for (const [k, v] of Object.entries(value)) {
    if (isContainer(v)) {
      if (Array.isArray(v)) {
        lines.push(`${name}.${k} = new Array();`);
        for (let i = 0; i < v.length; i++) lines.push(`${name}.${k}[${i}] = ${formatValue(v[i])};`);
      } else {
        const numericKeys = Object.keys(v).every((kk) => /^\d+$/.test(kk));
        if (numericKeys && Object.keys(v).length > 0) {
          lines.push(`${name}.${k} = new Object();`);
          for (const kk of Object.keys(v)) lines.push(`${name}.${k}[${kk}] = ${formatValue(v[kk])};`);
        } else {
          lines.push(`${name}.${k} = ${formatValue(v)};`);
        }
      }
    } else {
      lines.push(`${name}.${k} = ${formatScalar(v)};`);
    }
  }
}

function isContainer(v) { return v !== null && typeof v === 'object'; }

function formatValue(v) {
  if (!isContainer(v)) return formatScalar(v);
  if (Array.isArray(v)) return '[' + v.map(formatValue).join(',') + ']';
  return '{' + Object.entries(v).map(([k, vv]) => formatKey(k) + ':' + formatValue(vv)).join(',') + '}';
}

function formatScalar(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'string') return formatString(v);
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return formatString(String(v));
}

function formatKey(k) { return /^[A-Za-z_$][\w$]*$/.test(k) ? k : formatString(k); }

function formatString(s) {
  let out = '"';
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    if (ch === '\\') out += '\\\\';
    else if (ch === '"') out += '\\"';
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else if (c < 0x20) out += '\\x' + c.toString(16).padStart(2, '0');
    else out += ch;
  }
  return out + '"';
}

/* -------------------------------------------------- init */

document.documentElement.lang = i18n.getLang();
applyI18n();
loadLangDirConfig().then(() => loadCatalog()).catch((e) => setStatus(e.message, 'error'));
