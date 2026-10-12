// Builds the small display-font files in src/assets/fonts/ from the full
// Computer Modern Unicode fonts in the `computer-modern` package.
//
// The originals are 160–220 kB each because they cover Greek, Cyrillic and
// more. The site only sets English and French display text in them, so this
// keeps Latin plus the few mathematical symbols the design uses.
//
// Run with `npm run fonts` after changing the character list below.
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const source = new URL('../node_modules/computer-modern/', import.meta.url);
const target = new URL('../src/assets/fonts/', import.meta.url);

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join('');

const characters =
  range(0x20, 0x7e) + // Basic Latin
  range(0xa0, 0xff) + // Latin-1: accents, « », ×, §, ¹
  'ŒœŸ' +
  '–—‘’“”…‹›' +
  ' ' + // narrow no-break space, used before French punctuation
  '⊆∈→∎≤≥∀∃∅∧∨¬⇒';

const faces = [
  ['cmu-serif-500-roman', 'lemma-serif-regular'],
  ['cmu-serif-500-italic', 'lemma-serif-italic'],
  ['cmu-serif-700-roman', 'lemma-serif-bold'],
];

for (const [from, to] of faces) {
  const original = await readFile(new URL(`fonts/${from}.ttf`, source));
  const subset = await subsetFont(original, characters, { targetFormat: 'woff2' });
  await writeFile(new URL(`${to}.woff2`, target), subset);
  console.log(`${to}.woff2  ${(subset.length / 1024).toFixed(1)} kB  (from ${(original.length / 1024).toFixed(0)} kB)`);
}

await copyFile(new URL('OFL.txt', source), new URL('OFL.txt', target));
console.log(`Licence copied to ${fileURLToPath(new URL('OFL.txt', target))}`);
