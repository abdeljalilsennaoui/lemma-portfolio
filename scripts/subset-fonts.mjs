// Builds src/assets/fonts/lemma-math.woff2: the handful of mathematical
// symbols the site sets, taken from STIX Two Math.
//
// The text face, Charis SIL, has no set-theory or logic symbols, and the full
// STIX Two Math file is about 400 kB. This keeps only the symbols below, so a
// formula such as R ⊆ P × D costs a few kilobytes.
//
// Run with `npm run fonts` after changing the character list below.
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const source = new URL('../node_modules/@fontsource/stix-two-math/', import.meta.url);
const target = new URL('../src/assets/fonts/', import.meta.url);

// Arrows, then set theory, logic and comparison, then the end-of-proof mark.
// Keep in step with the `unicode-range` of "Lemma Math" in global.css.
const characters = '←→⇒' + '⊆⊂∈∉∅∀∃∧∨¬≤≥≠≈' + '∎';

const original = await readFile(new URL('files/stix-two-math-latin-400-normal.woff2', source));
const subset = await subsetFont(original, characters, { targetFormat: 'woff2' });
await writeFile(new URL('lemma-math.woff2', target), subset);
console.log(
  `lemma-math.woff2  ${(subset.length / 1024).toFixed(1)} kB  (from ${(original.length / 1024).toFixed(0)} kB)`,
);

await copyFile(new URL('LICENSE', source), new URL('OFL.txt', target));
console.log(`Licence copied to ${fileURLToPath(new URL('OFL.txt', target))}`);
