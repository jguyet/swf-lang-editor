import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { scanCatalog, findEntry } from './lib/catalog.js';
import { decompile, recompile, getFFDecPath } from './lib/swf.js';
import { parseAS2, serializeAS2 } from './lib/parser.js';
import { LABELS } from './lib/labels.js';
import { LABELS_FR } from './lib/labels-fr.js';
import { LABELS_ES } from './lib/labels-es.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, '.config.json');
const CACHE_DIR = path.resolve(__dirname, '.cache');
const PORT = process.env.PORT || 8801;

/* -------------------------------------------------- config */

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }
  } catch {}
  return {};
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + '\n');
}

function resolveSwfDir(langDir) {
  if (!langDir) return null;
  const swf = path.join(langDir, 'swf');
  if (fs.existsSync(swf) && fs.statSync(swf).isDirectory()) return swf;
  if (fs.existsSync(langDir) && fs.statSync(langDir).isDirectory()) {
    const entries = fs.readdirSync(langDir);
    if (entries.some(e => e.endsWith('.swf'))) return langDir;
  }
  return null;
}

let config = loadConfig();
let swfDir = resolveSwfDir(config.langDir) || path.resolve(__dirname, '..', 'swf');

if (!config.langDir && fs.existsSync(swfDir)) {
  config.langDir = path.resolve(__dirname, '..');
  saveConfig(config);
}

fs.mkdirSync(CACHE_DIR, { recursive: true });

const app = express();
app.use(express.json({ limit: '64mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* -------------------------------------------------- config API */

app.get('/api/config', (req, res) => {
  const dir = resolveSwfDir(config.langDir);
  res.json({
    langDir: config.langDir || '',
    swfDir: dir || '',
    valid: !!dir,
    favorites: config.favorites || [],
  });
});

app.post('/api/config', (req, res) => {
  const { langDir } = req.body || {};
  if (typeof langDir !== 'string' || !langDir.trim()) {
    return res.status(400).json({ error: 'langDir is required' });
  }
  const resolved = path.resolve(langDir.trim());
  if (!fs.existsSync(resolved)) {
    return res.status(400).json({ error: `Directory not found: ${resolved}` });
  }
  if (!fs.statSync(resolved).isDirectory()) {
    return res.status(400).json({ error: `Not a directory: ${resolved}` });
  }
  const dir = resolveSwfDir(resolved);
  if (!dir) {
    return res.status(400).json({
      error: `No swf/ subfolder or .swf files found in: ${resolved}`,
    });
  }
  config.langDir = resolved;
  swfDir = dir;
  if (!config.recentDirs) config.recentDirs = [];
  config.recentDirs = [resolved, ...config.recentDirs.filter(d => d !== resolved)].slice(0, 10);
  saveConfig(config);
  res.json({ langDir: resolved, swfDir: dir, valid: true });
});

app.post('/api/config/scan', (req, res) => {
  const { root } = req.body || {};
  const scanRoot = root ? path.resolve(root.trim()) : process.env.HOME || '/';
  if (!fs.existsSync(scanRoot)) {
    return res.status(400).json({ error: `Directory not found: ${scanRoot}` });
  }
  const results = [];
  const maxDepth = 6;
  const maxResults = 20;
  function walk(dir, depth) {
    if (depth > maxDepth || results.length >= maxResults) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const full = path.join(dir, e.name);
      if (e.name === 'swf') {
        try {
          const files = fs.readdirSync(full);
          if (files.some(f => f.endsWith('.swf'))) {
            results.push(path.dirname(full));
          }
        } catch {}
      }
      if (results.length < maxResults) walk(full, depth + 1);
    }
  }
  walk(scanRoot, 0);
  res.json({ results });
});

app.get('/api/config/recent', (req, res) => {
  res.json({ dirs: config.recentDirs || [], favorites: config.favorites || [] });
});

app.post('/api/config/recent/remove', (req, res) => {
  const { langDir } = req.body || {};
  if (!config.recentDirs) config.recentDirs = [];
  config.recentDirs = config.recentDirs.filter(d => d !== langDir);
  saveConfig(config);
  res.json({ dirs: config.recentDirs, favorites: config.favorites || [] });
});

app.post('/api/config/favorite/add', (req, res) => {
  const { langDir, name } = req.body || {};
  if (!langDir) return res.status(400).json({ error: 'langDir required' });
  if (!config.favorites) config.favorites = [];
  if (!config.favorites.some(f => f.dir === langDir)) {
    config.favorites.push({ dir: langDir, name: name || path.basename(path.dirname(langDir)) });
  }
  saveConfig(config);
  res.json({ favorites: config.favorites });
});

app.post('/api/config/favorite/remove', (req, res) => {
  const { langDir } = req.body || {};
  if (!config.favorites) config.favorites = [];
  config.favorites = config.favorites.filter(f => f.dir !== langDir);
  saveConfig(config);
  res.json({ favorites: config.favorites });
});

/* -------------------------------------------------- doc */

app.get('/api/doc', (req, res) => {
  try {
    const lang = req.query.lang || 'fr';
    const candidates = [
      path.join(__dirname, 'public', `doc-content-${lang}.md`),
      path.join(__dirname, 'public', 'doc-content-fr.md'),
      path.join(__dirname, 'public', 'doc-content.md'),
    ];
    const mdPath = candidates.find(p => fs.existsSync(p));
    if (!mdPath) return res.status(404).json({ error: 'doc not found' });
    const md = fs.readFileSync(mdPath, 'utf8');
    res.json({ markdown: md });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/doc-section/:type', (req, res) => {
  const TYPE_TO_DOC_SECTION = {
    items: '2', itemsets: '2', spells: '3', monsters: '4', maps: '5',
    npc: '6', dialog: '6', quests: '7', jobs: '8', skills: '8', crafts: '8',
    alignment: '9', servers: '9', guilds: '10', rides: '11', houses: '12',
    titles: '13', effects: '16', states: '17',
  };
  const section = TYPE_TO_DOC_SECTION[req.params.type];
  res.json({ section: section || null });
});

/* -------------------------------------------------- labels / status / catalog */

app.get('/api/labels', (req, res) => {
  const uiLang = req.query.lang || 'en';
  const labelsMap = { fr: LABELS_FR, es: LABELS_ES };
  res.json(labelsMap[uiLang] || LABELS);
});

app.get('/api/status', (req, res) => {
  res.json({
    platform: process.platform,
    backend: 'pure-js',
    swfDir,
    cacheDir: CACHE_DIR,
  });
});

app.get('/api/catalog', (req, res) => {
  try {
    if (!swfDir || !fs.existsSync(swfDir)) {
      return res.json({ langs: [], types: [], items: [] });
    }
    res.json(scanCatalog(swfDir));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* -------------------------------------------------- file API */

app.get('/api/file/:type/:lang', async (req, res) => {
  const { type, lang } = req.params;
  try {
    const catalog = scanCatalog(swfDir);
    const entry = findEntry(catalog, type, lang);
    if (!entry) return res.status(404).json({ error: 'not found' });
    const { source } = await decompile(entry.path, CACHE_DIR);
    let parsed = null;
    let parseError = null;
    try {
      parsed = parseAS2(source);
    } catch (e) {
      parseError = e.message;
    }
    res.json({ entry, source, parsed, parseError });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/file/:type/:lang', async (req, res) => {
  const { type, lang } = req.params;
  const { mode, source, data } = req.body || {};
  try {
    const catalog = scanCatalog(swfDir);
    const entry = findEntry(catalog, type, lang);
    if (!entry) return res.status(404).json({ error: 'not found' });

    let newSource;
    if (mode === 'raw') {
      if (typeof source !== 'string') return res.status(400).json({ error: 'missing source' });
      try {
        parseAS2(source);
      } catch (e) {
        return res.status(400).json({ error: 'AS2 source invalid: ' + e.message });
      }
      newSource = source;
    } else if (mode === 'form') {
      if (!data || typeof data !== 'object') return res.status(400).json({ error: 'missing data' });
      newSource = serializeAS2(data);
    } else {
      return res.status(400).json({ error: 'mode must be raw or form' });
    }

    const result = await recompile(entry.path, CACHE_DIR, newSource);
    res.json({ ok: true, file: entry.file, backup: path.basename(result.backupPath) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`SWF lang editor listening on http://localhost:${PORT}`);
  console.log(`Lang dir: ${config.langDir || '(not configured)'}`);
  console.log(`SWF dir:  ${swfDir}`);
  console.log('Backend: pure JS (no FFDec / no Java dependency)');
});
