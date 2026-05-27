/**
 * Binary IO helpers for the SWF format.
 *
 * Numeric encoding in SWF is little-endian. The exception is doubles, which use
 * a "word-swapped" 8-byte encoding: the two 32-bit halves of an IEEE-754 double
 * are stored in reverse order. We hide that quirk behind `f64`.
 *
 * Bit fields (used by RECT) are packed big-endian within each byte, MSB first.
 */
import { Buffer } from 'node:buffer';

export class Reader {
  constructor(buf) {
    this.buf = buf;
    this.pos = 0;
    this.bitBuf = 0;
    this.bitPos = 0; // bits remaining in bitBuf
  }
  eof() { return this.pos >= this.buf.length; }
  remaining() { return this.buf.length - this.pos; }
  byte() { return this.buf[this.pos++]; }
  u8() { this.alignBits(); return this.buf[this.pos++]; }
  i8() { this.alignBits(); const v = this.buf[this.pos++]; return v < 0x80 ? v : v - 0x100; }
  u16() { this.alignBits(); const v = this.buf.readUInt16LE(this.pos); this.pos += 2; return v; }
  i16() { this.alignBits(); const v = this.buf.readInt16LE(this.pos); this.pos += 2; return v; }
  u32() { this.alignBits(); const v = this.buf.readUInt32LE(this.pos); this.pos += 4; return v; }
  i32() { this.alignBits(); const v = this.buf.readInt32LE(this.pos); this.pos += 4; return v; }
  f32() { this.alignBits(); const v = this.buf.readFloatLE(this.pos); this.pos += 4; return v; }
  f64() {
    this.alignBits();
    // SWF "doubles" swap the two 32-bit halves vs. IEEE-754 little-endian.
    const lo = this.buf.readUInt32LE(this.pos);
    const hi = this.buf.readUInt32LE(this.pos + 4);
    this.pos += 8;
    const tmp = Buffer.alloc(8);
    tmp.writeUInt32LE(hi, 0);
    tmp.writeUInt32LE(lo, 4);
    return tmp.readDoubleLE(0);
  }
  bytes(n) {
    this.alignBits();
    const v = this.buf.subarray(this.pos, this.pos + n);
    this.pos += n;
    return v;
  }
  cstring() {
    this.alignBits();
    const start = this.pos;
    while (this.buf[this.pos] !== 0) this.pos++;
    const v = this.buf.subarray(start, this.pos).toString('utf8');
    this.pos++;
    return v;
  }
  ubits(n) {
    let v = 0;
    while (n > 0) {
      if (this.bitPos === 0) { this.bitBuf = this.buf[this.pos++]; this.bitPos = 8; }
      const take = n < this.bitPos ? n : this.bitPos;
      v = (v << take) | ((this.bitBuf >> (this.bitPos - take)) & ((1 << take) - 1));
      this.bitPos -= take;
      n -= take;
    }
    return v;
  }
  sbits(n) {
    if (n === 0) return 0;
    const v = this.ubits(n);
    const sign = 1 << (n - 1);
    return v & sign ? v - (1 << n) : v;
  }
  alignBits() { this.bitPos = 0; this.bitBuf = 0; }
}

export class Writer {
  constructor(initialCapacity = 1024) {
    this.buf = Buffer.alloc(initialCapacity);
    this.pos = 0;
    this.bitBuf = 0;
    this.bitPos = 0; // bits filled in bitBuf (0..7)
  }
  size() { this.alignBits(); return this.pos; }
  toBuffer() {
    this.alignBits();
    // Return a tight slice (copy if necessary so callers can't mutate our internal buffer).
    return Buffer.from(this.buf.buffer, this.buf.byteOffset, this.pos);
  }
  _ensure(extra) {
    const need = this.pos + extra;
    if (need <= this.buf.length) return;
    let cap = this.buf.length;
    while (cap < need) cap *= 2;
    const nb = Buffer.alloc(cap);
    this.buf.copy(nb, 0, 0, this.pos);
    this.buf = nb;
  }
  u8(v) { this.alignBits(); this._ensure(1); this.buf[this.pos++] = v & 0xff; }
  i8(v) { this.u8(v); }
  u16(v) { this.alignBits(); this._ensure(2); this.buf.writeUInt16LE(v & 0xffff, this.pos); this.pos += 2; }
  i16(v) { this.alignBits(); this._ensure(2); this.buf.writeInt16LE(v | 0, this.pos); this.pos += 2; }
  u32(v) { this.alignBits(); this._ensure(4); this.buf.writeUInt32LE(v >>> 0, this.pos); this.pos += 4; }
  i32(v) { this.alignBits(); this._ensure(4); this.buf.writeInt32LE(v | 0, this.pos); this.pos += 4; }
  f32(v) { this.alignBits(); this._ensure(4); this.buf.writeFloatLE(v, this.pos); this.pos += 4; }
  f64(v) {
    this.alignBits();
    this._ensure(8);
    const tmp = scratch8();
    tmp.writeDoubleLE(v, 0);
    // SWF word-swap: write hi half first, then lo half.
    this.buf.writeUInt32LE(tmp.readUInt32LE(4), this.pos);
    this.buf.writeUInt32LE(tmp.readUInt32LE(0), this.pos + 4);
    this.pos += 8;
  }
  bytes(src) {
    if (!src || src.length === 0) return;
    this.alignBits();
    this._ensure(src.length);
    if (Buffer.isBuffer(src)) src.copy(this.buf, this.pos);
    else Buffer.from(src).copy(this.buf, this.pos);
    this.pos += src.length;
  }
  cstring(s) {
    this.alignBits();
    const need = Buffer.byteLength(s, 'utf8') + 1;
    this._ensure(need);
    this.pos += this.buf.write(s, this.pos, 'utf8');
    this.buf[this.pos++] = 0;
  }
  ubits(value, n) {
    if (n === 0) return;
    let val = value >>> 0;
    while (n > 0) {
      const space = 8 - this.bitPos;
      if (n <= space) {
        this.bitBuf |= (val & ((1 << n) - 1)) << (space - n);
        this.bitPos += n;
        if (this.bitPos === 8) this._flushBitByte();
        n = 0;
      } else {
        const top = (val >> (n - space)) & ((1 << space) - 1);
        this.bitBuf |= top;
        this._flushBitByte();
        n -= space;
      }
    }
  }
  sbits(value, n) {
    if (n === 0) return;
    if (value < 0) value = value + (1 << n);
    this.ubits(value, n);
  }
  alignBits() {
    if (this.bitPos > 0) this._flushBitByte();
  }
  _flushBitByte() {
    this._ensure(1);
    this.buf[this.pos++] = this.bitBuf & 0xff;
    this.bitBuf = 0;
    this.bitPos = 0;
  }
}

// Module-level reusable scratch buffer for the float64 word-swap.
let _scratch = null;
function scratch8() { return _scratch ?? (_scratch = Buffer.alloc(8)); }

/** Minimum bits needed to encode `value` as a signed integer. */
export function sbitsNeeded(value) {
  if (value === 0) return 0;
  if (value > 0) return Math.ceil(Math.log2(value + 1)) + 1;
  return Math.ceil(Math.log2(-value)) + 1;
}
