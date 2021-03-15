const MAX_INPUT_SIZE = 0x64000; // Max input buffer size

function range(
  size: number,
  src: Int32Array,
  ws: number,
  dst: Uint8Array
): number {
  let di = 0;
  const c = new Uint32Array(0x1000);
  const t = new Uint32Array(0x1001);

  // these single sized arrays are simulating C unsigned 32 bit ints
  // Uint32Array fortunately does over/underflow correctly
  // the original range() in sma4savtool.cpp is depending on over/underflow
  // to work correctly
  let l = Uint32Array.from([0]);
  let w = Uint32Array.from([0xffffffff]);

  let x, si, n;
  for (x = 0; x < ws; x++) {
    c[x] = 1;
    t[x] = x;
  }
  t[ws] = ws;

  for (si = 0; si < size; si++) {
    n = src[si];

    // need to do this as integer division in C truncates
    w[0] = Math.floor(w[0] / t[ws]);
    l[0] += t[n] * w[0];
    w[0] *= c[n]++;

    for (x = n; x < ws; t[++x]++);
    if (t[ws] > 0xffff) {
      t[0] = 0;
      for (x = 0; x < ws; x++) t[x + 1] = t[x] + (c[x] = (c[x] >> 1) | 1);
    }
    while ((l[0] & 0xff000000) == ((l[0] + w[0]) & 0xff000000)) {
      dst[di++] = l[0] >> 24;
      l[0] <<= 8;
      w[0] <<= 8;
    }
    while (w[0] <= 0xffff) {
      w[0] = (0x10000 - (l[0] & 0xffff)) << 8;
      dst[di++] = l[0] >> 24;
      l[0] <<= 8;
    }
  }

  while ((l[0] & 0xff000000) == ((l[0] + w[0]) & 0xff000000)) {
    dst[di++] = l[0] >> 24;
    l[0] <<= 8;
    w[0] <<= 8;
  }
  while (l[0] & 0xff000000) {
    dst[di++] = l[0] >> 24;
    l[0] <<= 8;
  }
  return di;
}

function compress(src_: Uint8Array, mode: 0x00 | 0x80): Uint8Array {
  const size = src_.length;
  const src = new DataView(src_.buffer);
  const dst = new Uint8Array(MAX_INPUT_SIZE);
  const data = new Int32Array(0x10000);
  const offset = new Int32Array(0x4000);

  let di = 0;
  let oi = 0;
  let ws = mode & 0x80 ? 0x1000 : 0x200;

  dst[0] = "A".charCodeAt(0);
  dst[1] = "S".charCodeAt(0);
  dst[2] = "R".charCodeAt(0);
  dst[3] = "0".charCodeAt(0);

  dst[4] = mode;
  dst[5] = size >> 16;
  dst[6] = (size >> 8) & 0xff;
  dst[7] = size & 0xff;

  let bo = 0;
  let bc = 0;
  let c = 0;
  let off = 0;
  let si = 0;

  for (si = 0; si < size; ) {
    bo = 0;
    bc = 0;
    for (off = 1; off <= Math.min(si, ws); off++) {
      for (c = 0; c < Math.min(size - si, 0x102); c++) {
        if (src.getUint8(si - off + c) !== src.getUint8(si + c)) {
          break;
        }
      }

      if (c > bc) {
        bo = off;
        bc = c;
      }
    }
    if (bc > 2) {
      data[di++] = bc + 0xfd;
      offset[oi++] = bo - 1;
      si += bc;
    } else {
      data[di++] = src.getUint8(si++);
    }
  }

  // NOTE: this is commented out in compress.cpp, keeping for accuracy
  // di += 4;

  const ds = range(di, data, 0x200, dst.subarray(12));
  const os = range(oi, offset, ws, dst.subarray(ds + 12));

  dst[8] = (ds + 12) >> 24;
  dst[9] = ((ds + 12) >> 16) & 0xff;
  dst[10] = ((ds + 12) >> 8) & 0xff;
  dst[11] = (ds + 12) & 0xff;

  return dst.slice(0, ds + 12 + os);
}

export { compress };
