import vm from 'node:vm';

/**
 * Parse an AS2 script of a Dofus lang SWF.
 *
 * Structure of every file (after decompilation):
 *   FILE_BEGIN = true;
 *   System.security.allowDomain(_parent._url);
 *   VERSION = <int>;
 *   <data assignments using A, plus possibly other top-level vars>
 *   FILE_END = true;
 *
 * Data is plain JS literals (objects, arrays, strings, numbers, booleans).
 * We evaluate the source in a sandbox to capture every top-level variable
 * the script writes to.
 */
export function parseAS2(source) {
  // Wrap the user code so we can collect every assignment performed at the
  // top level. Because the script uses bareword assignments (e.g. `A = ...`),
  // we rely on `with(context)` semantics in non-strict mode so they land on
  // our sandbox object.
  const sandbox = {
    System: { security: { allowDomain: () => {} } },
    _parent: { _url: '' },
    Object,
    Array,
    Math,
  };

  const wrapped = `with (this) {\n${source}\n}`;
  const ctx = vm.createContext(sandbox);
  try {
    vm.runInContext(wrapped, ctx, { timeout: 30_000 });
  } catch (e) {
    throw new Error(`AS2 parse error: ${e.message}`);
  }

  const data = {};
  for (const [k, v] of Object.entries(sandbox)) {
    if (k === 'System' || k === '_parent' || k === 'Object' || k === 'Array' || k === 'Math') continue;
    data[k] = sanitize(v);
  }
  return data;
}

function sanitize(v) {
  if (v === null || v === undefined) return v;
  const t = typeof v;
  if (t === 'string' || t === 'number' || t === 'boolean') return v;
  if (Array.isArray(v)) return v.map(sanitize);
  if (t === 'object') {
    const out = {};
    for (const k of Object.keys(v)) out[k] = sanitize(v[k]);
    return out;
  }
  return String(v);
}

/**
 * Serialize a parsed object back to AS2 source.
 * Reproduces the canonical layout produced by FFDec exports:
 *   FILE_BEGIN = true;
 *   System.security.allowDomain(_parent._url);
 *   VERSION = N;
 *   <object & array assignments>
 *   FILE_END = true;
 */
export function serializeAS2(data) {
  const lines = [];
  lines.push('FILE_BEGIN = true;');
  lines.push('System.security.allowDomain(_parent._url);');

  const keys = Object.keys(data).filter((k) => k !== 'FILE_BEGIN' && k !== 'FILE_END');
  // Pull VERSION first if present
  if ('VERSION' in data) {
    lines.push(`VERSION = ${formatScalar(data.VERSION)};`);
  }
  for (const k of keys) {
    if (k === 'VERSION') continue;
    emitAssignments(lines, k, data[k]);
  }
  lines.push('FILE_END = true;');
  return lines.join('\n') + '\n';
}

function emitAssignments(lines, name, value) {
  // Top-level scalar (rare here but supported)
  if (!isContainer(value)) {
    lines.push(`${name} = ${formatScalar(value)};`);
    return;
  }
  // Top-level container: declare new Object/Array, then emit each member as
  // a separate assignment. This mirrors the original FFDec dump format.
  if (Array.isArray(value)) {
    lines.push(`${name} = new Array();`);
    for (let i = 0; i < value.length; i++) {
      lines.push(`${name}[${i}] = ${formatValue(value[i])};`);
    }
    return;
  }
  lines.push(`${name} = new Object();`);
  for (const [k, v] of Object.entries(value)) {
    const lhs = accessor(name, k);
    if (isContainer(v)) {
      if (Array.isArray(v)) {
        lines.push(`${lhs} = new Array();`);
        for (let i = 0; i < v.length; i++) {
          lines.push(`${lhs}[${i}] = ${formatValue(v[i])};`);
        }
      } else {
        const numericKeys = Object.keys(v).every((kk) => /^\d+$/.test(kk));
        if (numericKeys && Object.keys(v).length > 0) {
          lines.push(`${lhs} = new Object();`);
          for (const kk of Object.keys(v)) {
            lines.push(`${lhs}[${kk}] = ${formatValue(v[kk])};`);
          }
        } else {
          lines.push(`${lhs} = ${formatValue(v)};`);
        }
      }
    } else {
      lines.push(`${lhs} = ${formatScalar(v)};`);
    }
  }
}

/**
 * Build a member access expression. Uses dot notation for valid identifiers
 * and bracket notation for everything else (notably integer keys like "0"
 * for `G[1]`, `I.u[7100]`, …).
 */
function accessor(base, key) {
  if (/^[A-Za-z_$][\w$]*$/.test(key)) return `${base}.${key}`;
  if (/^-?\d+$/.test(key)) return `${base}[${key}]`;
  return `${base}[${formatString(key)}]`;
}

function isContainer(v) {
  return v !== null && typeof v === 'object';
}

function formatValue(v) {
  if (!isContainer(v)) return formatScalar(v);
  if (Array.isArray(v)) return `[${v.map(formatValue).join(',')}]`;
  return `{${Object.entries(v)
    .map(([k, vv]) => `${formatKey(k)}:${formatValue(vv)}`)
    .join(',')}}`;
}

function formatScalar(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'string') return formatString(v);
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return formatString(String(v));
}

function formatKey(k) {
  if (/^[A-Za-z_$][\w$]*$/.test(k)) return k;
  return formatString(k);
}

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
  out += '"';
  return out;
}
