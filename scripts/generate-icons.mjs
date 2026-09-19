import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
// Already a square 500x500 brand mark — ideal source for the icon set.
const source = path.join(root, 'public', 'favicon.webp');
const outDir = path.join(root, 'public');

const targets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['favicon-192x192.png', 192],
  ['favicon-512x512.png', 512],
];

await mkdir(outDir, { recursive: true });

for (const [name, size] of targets) {
  await sharp(source)
    .resize(size, size, { fit: 'cover' })
    .png()
    .toFile(path.join(outDir, name));
  console.log(`Wrote public/${name} (${size}x${size})`);
}
