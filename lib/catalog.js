import fs from 'node:fs';
import path from 'node:path';

const FILENAME_RE = /^([A-Za-z]+)_([a-z]{2})_(\d+)\.swf$/;

export function scanCatalog(swfDir) {
  const entries = fs.readdirSync(swfDir);
  const byKey = new Map();
  for (const name of entries) {
    const m = name.match(FILENAME_RE);
    if (!m) continue;
    const [, type, lang, idStr] = m;
    const id = parseInt(idStr, 10);
    const key = `${type}__${lang}`;
    const prev = byKey.get(key);
    if (!prev || id > prev.id) {
      byKey.set(key, { type, lang, id, file: name, path: path.join(swfDir, name) });
    }
  }
  const types = new Set();
  const langs = new Set();
  const items = [];
  for (const e of byKey.values()) {
    types.add(e.type);
    langs.add(e.lang);
    items.push(e);
  }
  items.sort((a, b) => a.type.localeCompare(b.type) || a.lang.localeCompare(b.lang));
  return {
    types: [...types].sort(),
    langs: [...langs].sort(),
    items,
  };
}

export function findEntry(catalog, type, lang) {
  return catalog.items.find((e) => e.type === type && e.lang === lang);
}
