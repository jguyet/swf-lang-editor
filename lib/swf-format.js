/**
 * SWF file reader / writer.
 *
 * Layout (Adobe SWF spec, §1.3):
 *
 *   0  3   Signature: "FWS" (uncompressed) | "CWS" (zlib) | "ZWS" (LZMA)
 *   3  1   Version
 *   4  4   FileLength (total size of the uncompressed file, little-endian)
 *   8  …   Body — compressed with zlib if CWS, raw if FWS:
 *            RECT FrameSize                (variable, packed bits)
 *            UI16 FrameRate                (8.8 fixed-point)
 *            UI16 FrameCount
 *            Tag* tags                     (each: u16 packed header [+ u32 long-form length] + body)
 *            … terminated by an END tag (code 0, length 0)
 *
 * We only support FWS and CWS. ZWS would require LZMA.
 *
 * For our Dofus-lang use case we **always re-emit CWS** so the output stays
 * comparable to the input.
 */
import zlib from 'node:zlib';
import { Buffer } from 'node:buffer';
import { Reader, Writer, sbitsNeeded } from './binio.js';

export const TAG_END = 0;
export const TAG_SHOW_FRAME = 1;
export const TAG_DO_ACTION = 12;
export const TAG_SET_BACKGROUND_COLOR = 9;

/**
 * @typedef {Object} ParsedSWF
 * @property {string} signature  "CWS"|"FWS"
 * @property {number} version
 * @property {{nbits:number,xMin:number,xMax:number,yMin:number,yMax:number}} frameSize
 * @property {number} frameRate         8.8 fixed-point as a float (e.g. 20.0)
 * @property {number} frameCount
 * @property {Array<{code:number, body:Buffer}>} tags
 */

/** @returns {ParsedSWF} */
export function readSWF(buffer) {
  if (buffer.length < 8) throw new Error('SWF too short');
  const signature = buffer.subarray(0, 3).toString('ascii');
  const version = buffer[3];
  const fileLength = buffer.readUInt32LE(4);

  let body;
  if (signature === 'FWS') {
    body = buffer.subarray(8);
  } else if (signature === 'CWS') {
    body = zlib.inflateSync(buffer.subarray(8));
  } else if (signature === 'ZWS') {
    throw new Error('LZMA-compressed SWF (ZWS) not supported');
  } else {
    throw new Error(`Unknown SWF signature: ${JSON.stringify(signature)}`);
  }

  const r = new Reader(body);
  const frameSize = readRect(r);
  const frameRateRaw = r.u16(); // 8.8 fixed-point
  const frameRate = frameRateRaw / 256;
  const frameCount = r.u16();

  const tags = [];
  while (!r.eof()) {
    const header = r.u16();
    const code = header >> 6;
    let length = header & 0x3f;
    if (length === 0x3f) length = r.u32();
    const tagBody = Buffer.from(r.bytes(length));
    tags.push({ code, body: tagBody });
    if (code === TAG_END) break;
  }

  return { signature, version, fileLength, frameSize, frameRate, frameCount, tags };
}

/** @param {ParsedSWF} parsed */
export function writeSWF(parsed) {
  // 1. Encode the body (everything after the 8-byte header).
  const bodyW = new Writer();
  writeRect(bodyW, parsed.frameSize);
  bodyW.u16(Math.round(parsed.frameRate * 256));
  bodyW.u16(parsed.frameCount);
  let sawEnd = false;
  for (const tag of parsed.tags) {
    writeTag(bodyW, tag);
    if (tag.code === TAG_END) { sawEnd = true; break; }
  }
  if (!sawEnd) writeTag(bodyW, { code: TAG_END, body: Buffer.alloc(0) });
  const body = bodyW.toBuffer();

  // 2. Total uncompressed file length = 8-byte header + body.
  const totalLength = 8 + body.length;

  // 3. Compress body if originally compressed.
  let payload;
  let sig;
  if (parsed.signature === 'CWS') {
    payload = zlib.deflateSync(body, { level: 9 });
    sig = 'CWS';
  } else {
    payload = body;
    sig = 'FWS';
  }

  // 4. Header.
  const out = Buffer.alloc(8 + payload.length);
  out.write(sig, 0, 'ascii');
  out[3] = parsed.version;
  out.writeUInt32LE(totalLength, 4);
  payload.copy(out, 8);
  return out;
}

function readRect(r) {
  const nbits = r.ubits(5);
  const xMin = r.sbits(nbits);
  const xMax = r.sbits(nbits);
  const yMin = r.sbits(nbits);
  const yMax = r.sbits(nbits);
  r.alignBits();
  return { nbits, xMin, xMax, yMin, yMax };
}

function writeRect(w, rect) {
  const nbits = Math.max(
    rect.nbits || 0,
    sbitsNeeded(rect.xMin),
    sbitsNeeded(rect.xMax),
    sbitsNeeded(rect.yMin),
    sbitsNeeded(rect.yMax),
  );
  w.ubits(nbits, 5);
  w.sbits(rect.xMin, nbits);
  w.sbits(rect.xMax, nbits);
  w.sbits(rect.yMin, nbits);
  w.sbits(rect.yMax, nbits);
  w.alignBits();
}

function writeTag(w, tag) {
  const code = tag.code;
  const len = tag.body.length;
  if (len < 0x3f) {
    w.u16(((code & 0x3ff) << 6) | len);
  } else {
    w.u16(((code & 0x3ff) << 6) | 0x3f);
    w.u32(len);
  }
  w.bytes(tag.body);
}
