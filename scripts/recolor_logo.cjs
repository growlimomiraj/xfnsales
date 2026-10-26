const fs = require('fs');
const zlib = require('zlib');

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, (h / 360) + 1/3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, (h / 360) - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 'ascii');
  data.copy(buf, 8);
  const crcTarget = buf.subarray(4, 8 + len);
  buf.writeUInt32BE(crc32(crcTarget), 8 + len);
  return buf;
}

function recolorLogo(srcPath, destPath) {
  const input = fs.readFileSync(srcPath);
  let offset = 8;
  const idatParts = [];
  let width, height;

  while (offset < input.length) {
    const len = input.readUInt32BE(offset);
    const type = input.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = input.readUInt32BE(offset + 8);
      height = input.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') {
      idatParts.push(input.subarray(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }

  const compressedData = Buffer.concat(idatParts);
  const rawData = zlib.inflateSync(compressedData);

  const bpp = 4;
  const stride = width * bpp;
  const uncompressed = Buffer.alloc(height * stride);

  let rawOff = 0;
  for (let y = 0; y < height; y++) {
    const filter = rawData[rawOff++];
    const rowOffset = y * stride;
    const priorOffset = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const byte = rawData[rawOff++];
      const left = x >= bpp ? uncompressed[rowOffset + x - bpp] : 0;
      const up = y > 0 ? uncompressed[priorOffset + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? uncompressed[priorOffset + x - bpp] : 0;

      let val = 0;
      switch (filter) {
        case 0: val = byte; break;
        case 1: val = (byte + left) & 0xff; break;
        case 2: val = (byte + up) & 0xff; break;
        case 3: val = (byte + Math.floor((left + up) / 2)) & 0xff; break;
        case 4: val = (byte + paethPredictor(left, up, upLeft)) & 0xff; break;
        default: throw new Error('Unknown filter: ' + filter);
      }
      uncompressed[rowOffset + x] = val;
    }
  }

  // Recolor uncompressed RGBA pixels
  for (let i = 0; i < uncompressed.length; i += 4) {
    let r = uncompressed[i];
    let g = uncompressed[i + 1];
    let b = uncompressed[i + 2];
    const a = uncompressed[i + 3];

    if (a > 0) {
      const [h, s, l] = rgbToHsl(r, g, b);
      // If pixel is colored (blue/cyan wifi arc or sphere)
      if (s > 0.1) {
        // Shift cyan/blue (190-220) to purple/violet (260-275) to match #6d2eff
        const targetHue = ((h - 198) * 0.9 + 266) % 360;
        // Keep smooth shading and highlight contrast
        const [newR, newG, newB] = hslToRgb(targetHue, Math.min(1, s * 1.05), l);
        uncompressed[i] = newR;
        uncompressed[i + 1] = newG;
        uncompressed[i + 2] = newB;
      }
    }
  }

  // Encode with Filter 0 (None) for all rows
  const filteredData = Buffer.alloc(height * (stride + 1));
  let filtOff = 0;
  for (let y = 0; y < height; y++) {
    filteredData[filtOff++] = 0; // Filter 0
    uncompressed.copy(filteredData, filtOff, y * stride, (y + 1) * stride);
    filtOff += stride;
  }

  const deflated = zlib.deflateSync(filteredData, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const output = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(destPath, output);
  console.log('Successfully wrote recolored logo to', destPath);
}

recolorLogo('C:/Users/GrowLimo - Umair/.gemini/antigravity-ide/brain/1b22033a-9fce-4a58-a26f-adb2f104b1ed/.user_uploaded/media_1793035867202.png', 'public/logo.png');
fs.copyFileSync('public/logo.png', 'public/favicon.png');
console.log('Copied to favicon.png');
