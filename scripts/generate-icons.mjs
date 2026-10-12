// Builds public/apple-touch-icon.png and public/favicon.ico from
// public/favicon.svg. Run with `npm run icons` after changing the mark.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const publicDir = new URL('../public/', import.meta.url);
const svg = await readFile(new URL('favicon.svg', publicDir));

const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

await writeFile(new URL('apple-touch-icon.png', publicDir), await png(180));

// An .ico file may simply wrap a PNG: a 6-byte header, one 16-byte directory
// entry, then the image data.
const icon = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette size
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(icon.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
await writeFile(new URL('favicon.ico', publicDir), Buffer.concat([header, icon]));

console.log('Wrote public/apple-touch-icon.png and public/favicon.ico');
