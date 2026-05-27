/**
 * Minimal ActionScript 1/2 VM and encoder for the subset of opcodes used by
 * Dofus 1.29 `lang/*.swf` files. These files only ever execute a flat sequence
 * of top-level assignments (with a single `System.security.allowDomain` call),
 * so we only implement what's needed to round-trip them losslessly.
 *
 * Opcodes handled:
 *
 *   0x00 EndOfActions          — terminator
 *   0x17 Pop
 *   0x1C GetVariable
 *   0x1D SetVariable
 *   0x40 NewObject
 *   0x42 InitArray
 *   0x43 InitObject
 *   0x4E GetMember
 *   0x4F SetMember
 *   0x52 CallMethod
 *   0x88 ConstantPool
 *   0x96 Push
 *
 * Anything else throws (caller falls back to FFDec if installed).
 *
 * Push value types:
 *
 *   0 string  (null-terminated)
 *   1 float   (4 bytes LE)
 *   2 null
 *   3 undefined
 *   4 register (1 byte)
 *   5 boolean (1 byte)
 *   6 double  (8 bytes, SWF word-swapped)
 *   7 integer (4 bytes LE, signed)
 *   8 constant8  (1 byte index into the current constant pool)
 *   9 constant16 (2 bytes index)
 */
import { Reader, Writer } from './binio.js';
import { Buffer } from 'node:buffer';

export const OP = {
  END:           0x00,
  POP:           0x17,
  GET_VARIABLE:  0x1c,
  SET_VARIABLE:  0x1d,
  DEFINE_LOCAL:  0x3c,
  CALL_FUNCTION: 0x3d,
  NEW_OBJECT:    0x40,
  DEFINE_LOCAL2: 0x41,
  INIT_ARRAY:    0x42,
  INIT_OBJECT:   0x43,
  TO_NUMBER:     0x4a,
  TO_STRING:     0x4b,
  GET_MEMBER:    0x4e,
  SET_MEMBER:    0x4f,
  CALL_METHOD:   0x52,
  CONSTANT_POOL: 0x88,
  PUSH:          0x96,
};

/**
 * Decode a single action body. Returns an array of decoded actions; an `END`
 * sentinel ends the stream. Multi-DoAction bodies can be decoded by
 * concatenating each tag's body and decoding once, or by decoding each tag
 * independently and concatenating the results.
 */
/**
 * Decode an action body. If `concatenated` is true, intermediate END opcodes
 * (0x00) are treated as separators rather than the end of the stream — this
 * matches what happens when multiple consecutive DoAction tag bodies are
 * concatenated together.
 */
export function decodeActions(buf, { concatenated = true } = {}) {
  const r = new Reader(buf);
  const out = [];
  while (!r.eof()) {
    const op = r.u8();
    if (op === OP.END || op === 0) {
      if (!concatenated || r.eof()) {
        out.push({ op: OP.END });
        break;
      }
      // Skip the inter-tag END marker.
      continue;
    }
    if (op < 0x80) {
      out.push({ op });
      continue;
    }
    const len = r.u16();
    const body = Buffer.from(r.bytes(len));
    out.push(decodeLongAction(op, body));
  }
  return out;
}

function decodeLongAction(op, body) {
  switch (op) {
    case OP.CONSTANT_POOL: {
      const r = new Reader(body);
      const count = r.u16();
      const strings = [];
      for (let i = 0; i < count; i++) strings.push(r.cstring());
      return { op, strings };
    }
    case OP.PUSH: {
      const r = new Reader(body);
      const values = [];
      while (!r.eof()) values.push(readPushValue(r));
      return { op, values };
    }
    default: {
      return { op, body };
    }
  }
}

function readPushValue(r) {
  const type = r.u8();
  switch (type) {
    case 0: return { type, value: r.cstring() };
    case 1: return { type, value: r.f32() };
    case 2: return { type, value: null };
    case 3: return { type, value: undefined };
    case 4: return { type, value: r.u8() };
    case 5: return { type, value: r.u8() !== 0 };
    case 6: return { type, value: r.f64() };
    case 7: return { type, value: r.i32() };
    case 8: return { type, value: r.u8() }; // constant pool index
    case 9: return { type, value: r.u16() }; // constant pool index
    default: throw new Error(`Unknown Push value type: 0x${type.toString(16)}`);
  }
}

/**
 * Stack VM. Returns the populated globals object.
 *
 * @param {ReturnType<typeof decodeActions>} actions
 */
export function runVM(actions) {
  const globals = {};
  const stack = [];
  let pool = [];

  const peekObj = () => stack[stack.length - 1];
  const pop = () => {
    if (stack.length === 0) throw new Error('Stack underflow');
    return stack.pop();
  };
  const resolve = (v) => {
    if (v && typeof v === 'object' && v.__poolRef !== undefined) {
      return pool[v.__poolRef];
    }
    return v;
  };

  for (const a of actions) {
    switch (a.op) {
      case OP.END:
        return globals;
      case OP.CONSTANT_POOL:
        pool = a.strings;
        break;
      case OP.PUSH:
        for (const v of a.values) {
          if (v.type === 8 || v.type === 9) {
            // Defer resolution so we know whether this value is meant as an
            // identifier (kept as the indexed string) or a string literal
            // (also the indexed string). Constant pool entries are always
            // strings here, so resolving immediately is safe.
            stack.push(pool[v.value]);
          } else {
            stack.push(v.value);
          }
        }
        break;
      case OP.POP:
        pop();
        break;
      case OP.SET_VARIABLE: {
        const value = pop();
        const name = String(pop());
        globals[name] = value;
        break;
      }
      case OP.GET_VARIABLE: {
        const name = String(pop());
        // Some real AS2 globals are needed during the prelude. We synthesize
        // just enough to keep the standard `System.security.allowDomain(...)`
        // call working.
        if (name === 'System') {
          stack.push({ __system: true });
        } else if (name === '_parent') {
          stack.push({ __parent: true });
        } else if (name in globals) {
          stack.push(globals[name]);
        } else {
          // Unknown global — push a sentinel object so subsequent GetMember /
          // CallMethod chains don't crash. Real lookups would go to _global.
          stack.push({ __ref: name });
        }
        break;
      }
      case OP.SET_MEMBER: {
        const value = pop();
        const member = pop();
        const object = pop();
        if (object === null || object === undefined) {
          throw new Error(`SetMember on null/undefined (member=${member})`);
        }
        object[member] = value;
        break;
      }
      case OP.GET_MEMBER: {
        const member = pop();
        const object = pop();
        if (object && typeof object === 'object') {
          stack.push(object[member]);
        } else {
          stack.push(undefined);
        }
        break;
      }
      case OP.NEW_OBJECT: {
        const className = String(pop());
        const numArgs = Number(pop());
        const args = [];
        for (let i = 0; i < numArgs; i++) args.push(pop());
        if (className === 'Object') {
          stack.push({});
        } else if (className === 'Array') {
          stack.push(numArgs === 0 ? [] : args.reverse());
        } else {
          throw new Error(`NewObject: unsupported class ${className}`);
        }
        break;
      }
      case OP.INIT_ARRAY: {
        const count = Number(pop());
        const arr = new Array(count);
        for (let i = count - 1; i >= 0; i--) arr[i] = pop();
        stack.push(arr);
        break;
      }
      case OP.INIT_OBJECT: {
        const count = Number(pop());
        const obj = {};
        // Stack from top to bottom: value1, name1, value2, name2, ...
        // i.e. for each property pop value, then name.
        const pairs = [];
        for (let i = 0; i < count; i++) {
          const v = pop();
          const k = pop();
          pairs.push([k, v]);
        }
        // To preserve source insertion order, reverse: the first pair pushed
        // (which is the first listed in the literal) is at the bottom of the
        // pops, so it ended up last in `pairs`.
        for (let i = pairs.length - 1; i >= 0; i--) obj[pairs[i][0]] = pairs[i][1];
        stack.push(obj);
        break;
      }
      case OP.CALL_METHOD: {
        const methodName = pop();
        const obj = pop();
        const numArgs = Number(pop());
        const args = [];
        for (let i = 0; i < numArgs; i++) args.push(pop());
        // We only model the `allowDomain` no-op here. Anything else is
        // accepted and produces `undefined`. The Dofus lang files don't use
        // method-call results, so this is safe.
        stack.push(undefined);
        break;
      }
      case OP.TO_NUMBER: {
        const v = pop();
        stack.push(Number(v));
        break;
      }
      case OP.TO_STRING: {
        const v = pop();
        stack.push(String(v));
        break;
      }
      case OP.DEFINE_LOCAL2: {
        // Declare a local without initializer. For our flat top-level scripts
        // there is no real scope, so we just consume the name.
        pop();
        break;
      }
      case OP.DEFINE_LOCAL: {
        const value = pop();
        const name = String(pop());
        globals[name] = value;
        break;
      }
      case OP.CALL_FUNCTION: {
        const fnName = String(pop());
        const numArgs = Number(pop());
        const args = [];
        for (let i = 0; i < numArgs; i++) args.push(pop());
        // Only the JS-compatible coercion functions used by lang_*.swf config
        // blocks are modelled (Boolean(false), Number(1), String("…"), …).
        switch (fnName) {
          case 'Boolean': stack.push(Boolean(args[0])); break;
          case 'Number':  stack.push(Number(args[0]));  break;
          case 'String':  stack.push(String(args[0]));  break;
          case 'Array':   stack.push(args.slice().reverse()); break;
          case 'Object':  stack.push(args[0] !== undefined ? Object(args[0]) : {}); break;
          default:
            throw new Error(`CallFunction: unsupported global function ${fnName}`);
        }
        break;
      }
      default:
        throw new Error(`Unsupported opcode: 0x${a.op.toString(16)}`);
    }
  }
  return globals;
}

/**
 * Take the populated globals object and produce a fresh action stream that,
 * when executed, reconstructs the same data. The output uses a freshly built
 * constant pool that interns every string and identifier referenced.
 */
export function emitData(data) {
  // We deliberately **do not** emit a ConstantPool. The SWF tag/action
  // framing for ConstantPool is u16-bounded, so a single pool > 65 535 bytes
  // would silently overflow — which happens for big text files like
  // `dialog_*.swf`. Inline every string with Push type 0 instead. zlib at the
  // SWF level deduplicates the repeated identifiers anyway, so the on-disk
  // size stays in line with the original.
  const actions = [];
  const intern = null; // pool no longer used; pushString uses inline cstring

  emitFileBegin(actions, intern);
  emitAllowDomain(actions, intern);

  for (const key of Object.keys(data)) {
    if (key === 'FILE_BEGIN' || key === 'FILE_END') continue;
    emitAssignment(actions, key, data[key], intern);
  }

  actions.push({ op: OP.PUSH, values: [pushString(intern, 'FILE_END'), { type: 5, value: true }] });
  actions.push({ op: OP.SET_VARIABLE });

  actions.push({ op: OP.END });
  return { actions };
}

// pushString / pushConst always emit Push type-0 (inline cstring). The
// `intern` parameter is kept for API symmetry but ignored.
function pushString(_intern, value) {
  return { type: 0, value };
}
function pushConst(_intern, value) {
  return { type: 0, value };
}

function pushNumber(value) {
  if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
    return { type: 7, value };
  }
  return { type: 6, value };
}

function pushScalar(intern, value) {
  if (value === null) return { type: 2, value: null };
  if (value === undefined) return { type: 3, value: undefined };
  if (typeof value === 'boolean') return { type: 5, value };
  if (typeof value === 'number') return pushNumber(value);
  if (typeof value === 'string') return pushString(intern, value);
  throw new Error(`Cannot encode scalar: ${typeof value}`);
}

function emitFileBegin(actions, intern) {
  actions.push({ op: OP.PUSH, values: [pushConst(intern, 'FILE_BEGIN'), { type: 5, value: true }] });
  actions.push({ op: OP.SET_VARIABLE });
}

function emitAllowDomain(actions, intern) {
  // System.security.allowDomain(_parent._url);
  // Bytecode: Push "_parent", GetVariable, Push "_url", GetMember,
  //           Push 1, Push "System", GetVariable, Push "security", GetMember,
  //           Push "allowDomain", CallMethod, Pop
  actions.push({ op: OP.PUSH, values: [pushConst(intern, '_parent')] });
  actions.push({ op: OP.GET_VARIABLE });
  actions.push({ op: OP.PUSH, values: [pushConst(intern, '_url')] });
  actions.push({ op: OP.GET_MEMBER });
  actions.push({ op: OP.PUSH, values: [{ type: 7, value: 1 }, pushConst(intern, 'System')] });
  actions.push({ op: OP.GET_VARIABLE });
  actions.push({ op: OP.PUSH, values: [pushConst(intern, 'security')] });
  actions.push({ op: OP.GET_MEMBER });
  actions.push({ op: OP.PUSH, values: [pushConst(intern, 'allowDomain')] });
  actions.push({ op: OP.CALL_METHOD });
  actions.push({ op: OP.POP });
}

function isContainer(v) { return v !== null && typeof v === 'object'; }

/**
 * Emit `<varName> = <value>;` either as a scalar set, a `new Object()/Array()`
 * fresh container followed by field-by-field assignment, or an InitObject /
 * InitArray literal.
 *
 * For top-level assignments we emit `new Object()` / `new Array()` and then
 * member assignments, matching the original FFDec exporter output (which is
 * what the constant pool was sized for).
 */
function emitAssignment(actions, varName, value, intern) {
  // Scalar top-level.
  if (!isContainer(value)) {
    actions.push({ op: OP.PUSH, values: [pushConst(intern, varName), pushScalar(intern, value)] });
    actions.push({ op: OP.SET_VARIABLE });
    return;
  }
  // Container top-level: declare empty container, then populate by member.
  emitNewContainer(actions, varName, value, intern, /*topLevel*/ true);
  populateContainer(actions, [varName], value, intern);
}

function emitNewContainer(actions, varOrPath, value, intern, topLevel) {
  // Push the receiver (variable name for top-level, or chain for nested).
  if (topLevel) {
    actions.push({ op: OP.PUSH, values: [
      pushConst(intern, varOrPath),
      { type: 7, value: 0 }, // numArgs
      pushConst(intern, Array.isArray(value) ? 'Array' : 'Object'),
    ]});
    actions.push({ op: OP.NEW_OBJECT });
    actions.push({ op: OP.SET_VARIABLE });
  } else {
    throw new Error('emitNewContainer called for non-top-level path');
  }
}

function populateContainer(actions, path, container, intern) {
  if (Array.isArray(container)) {
    for (let i = 0; i < container.length; i++) {
      emitMemberAssignment(actions, path, i, container[i], intern);
    }
    return;
  }
  for (const k of Object.keys(container)) {
    emitMemberAssignment(actions, path, k, container[k], intern);
  }
}

function emitMemberAssignment(actions, path, key, value, intern) {
  // Push the receiver chain.
  pushPath(actions, path, intern);
  // Push the key (as a string — works for both numeric and string keys in AS2).
  actions.push({ op: OP.PUSH, values: [pushKey(intern, key)] });
  if (isContainer(value)) {
    // Nested container — emit as an object/array literal via InitObject/InitArray.
    pushLiteral(actions, value, intern);
  } else {
    actions.push({ op: OP.PUSH, values: [pushScalar(intern, value)] });
  }
  actions.push({ op: OP.SET_MEMBER });
}

function pushKey(intern, key) {
  if (typeof key === 'number') return pushNumber(key);
  if (typeof key === 'string' && /^-?\d+$/.test(key)) {
    return pushNumber(parseInt(key, 10));
  }
  return pushString(intern, key);
}

function pushPath(actions, path, intern) {
  // Push the first identifier as a variable load.
  actions.push({ op: OP.PUSH, values: [pushConst(intern, path[0])] });
  actions.push({ op: OP.GET_VARIABLE });
  // Each subsequent segment is a GetMember access.
  for (let i = 1; i < path.length; i++) {
    actions.push({ op: OP.PUSH, values: [pushKey(intern, path[i])] });
    actions.push({ op: OP.GET_MEMBER });
  }
}

function pushLiteral(actions, value, intern) {
  if (Array.isArray(value)) {
    // Push each element in *forward* order (value0, value1, ..., valueN-1),
    // then push the count, then InitArray.
    for (const e of value) {
      if (isContainer(e)) pushLiteral(actions, e, intern);
      else actions.push({ op: OP.PUSH, values: [pushScalar(intern, e)] });
    }
    actions.push({ op: OP.PUSH, values: [{ type: 7, value: value.length }] });
    actions.push({ op: OP.INIT_ARRAY });
    return;
  }
  // Object literal. Spec: stack should hold pairs as name1, value1, name2,
  // value2, ..., count (top). On unwind: pop count, then pop (value, name)
  // count times. So we push name first, then value, in source order, then
  // count.
  const keys = Object.keys(value);
  for (const k of keys) {
    actions.push({ op: OP.PUSH, values: [pushKey(intern, k)] });
    const v = value[k];
    if (isContainer(v)) pushLiteral(actions, v, intern);
    else actions.push({ op: OP.PUSH, values: [pushScalar(intern, v)] });
  }
  actions.push({ op: OP.PUSH, values: [{ type: 7, value: keys.length }] });
  actions.push({ op: OP.INIT_OBJECT });
}

/**
 * Serialize an action list to a binary DoAction body.
 */
export function encodeActions(actions) {
  const w = new Writer();
  for (const a of actions) {
    if (a.op === OP.END) {
      w.u8(0);
      continue;
    }
    if (a.op < 0x80) {
      w.u8(a.op);
      continue;
    }
    const bodyBytes = encodeLongAction(a);
    w.u8(a.op);
    w.u16(bodyBytes.length);
    w.bytes(bodyBytes);
  }
  return w.toBuffer();
}

function encodeLongAction(a) {
  switch (a.op) {
    case OP.CONSTANT_POOL: {
      const w = new Writer();
      w.u16(a.strings.length);
      for (const s of a.strings) w.cstring(s);
      return w.toBuffer();
    }
    case OP.PUSH: {
      const w = new Writer();
      for (const v of a.values) writePushValue(w, v);
      return w.toBuffer();
    }
    default:
      return a.body || Buffer.alloc(0);
  }
}

function writePushValue(w, v) {
  w.u8(v.type);
  switch (v.type) {
    case 0: w.cstring(v.value); break;
    case 1: w.f32(v.value); break;
    case 2: break;
    case 3: break;
    case 4: w.u8(v.value); break;
    case 5: w.u8(v.value ? 1 : 0); break;
    case 6: w.f64(v.value); break;
    case 7: w.i32(v.value); break;
    case 8: w.u8(v.value); break;
    case 9: w.u16(v.value); break;
    default: throw new Error(`Cannot encode Push value type ${v.type}`);
  }
}
