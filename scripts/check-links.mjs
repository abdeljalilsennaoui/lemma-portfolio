// Checks the built site in dist/: every internal link, image and asset must
// resolve to a file, and must carry the configured base path. Run after a
// build with `npm run test:links`; pass --external to also request each
// outbound link.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH ?? '/lemma-portfolio').replace(/\/+$/, '');
const checkExternal = process.argv.includes('--external');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])),
  );
  return files.flat();
}

const exists = (path) => stat(path).then(() => true, () => false);

async function resolves(urlPath) {
  const path = decodeURIComponent(urlPath.slice(base.length)) || '/';
  if (path.endsWith('/')) return exists(join(dist, path, 'index.html'));
  return exists(join(dist, path));
}

const pages = (await walk(dist)).filter((file) => file.endsWith('.html'));
const problems = [];
const external = new Map();
let internalCount = 0;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const name = relative(dist, page);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const references = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((match) => match[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((match) =>
      match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]),
    ),
  ];

  for (const reference of references) {
    if (reference.startsWith('mailto:') || reference.startsWith('data:')) continue;
    if (/^https?:\/\//.test(reference)) {
      const url = new URL(reference);
      // Canonical, hreflang and Open Graph URLs point at the deployed site.
      if (url.pathname.startsWith(`${base}/`) && html.includes(`rel="canonical"`) && isOwnSite(url)) {
        if (!(await resolves(url.pathname))) problems.push(`${name}: own absolute URL has no file → ${reference}`);
        continue;
      }
      external.set(reference, name);
      continue;
    }
    if (reference.startsWith('#')) {
      if (reference.length > 1 && !ids.has(reference.slice(1))) problems.push(`${name}: missing anchor ${reference}`);
      continue;
    }
    internalCount += 1;
    const [path, hash] = reference.split('#');
    if (!path.startsWith(`${base}/`) && path !== base) {
      problems.push(`${name}: link does not start with the base path "${base}" → ${reference}`);
      continue;
    }
    if (!(await resolves(path))) {
      problems.push(`${name}: broken link → ${reference}`);
      continue;
    }
    if (hash) {
      const targetPath = decodeURIComponent(path.slice(base.length)) || '/';
      const target = await readFile(join(dist, targetPath, targetPath.endsWith('/') ? 'index.html' : ''), 'utf8');
      if (!target.includes(` id="${hash}"`)) problems.push(`${name}: missing anchor #${hash} in ${path}`);
    }
  }
}

function isOwnSite(url) {
  const site = process.env.SITE_URL ?? 'https://abdeljalilsennaoui.github.io';
  return url.origin === new URL(site).origin;
}

if (checkExternal) {
  for (const [url, page] of external) {
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (!response.ok) problems.push(`${page}: external link returned ${response.status} → ${url}`);
    } catch (error) {
      problems.push(`${page}: external link failed (${error.name}) → ${url}`);
    }
  }
}

console.log(
  `${pages.length} pages, ${internalCount} internal references, ${external.size} distinct external links${checkExternal ? ' (requested)' : ''}.`,
);
if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((problem) => `  - ${problem}`).join('\n'));
  process.exit(1);
}
console.log('All links resolve.');
