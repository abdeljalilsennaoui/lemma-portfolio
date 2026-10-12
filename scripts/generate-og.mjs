// Renders scripts/og-image.html to public/og.png (1200 × 630) with headless
// Chrome, so the image uses the site's real typefaces. Run with `npm run og`.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chrome = candidates.find((path) => existsSync(path));
if (!chrome) {
  console.error('Chrome was not found. Set CHROME_PATH to its executable and run again.');
  process.exit(1);
}

const source = new URL('./og-image.html', import.meta.url);
const output = fileURLToPath(new URL('../public/og.png', import.meta.url));

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--allow-file-access-from-files',
    '--virtual-time-budget=3000',
    '--window-size=1200,630',
    `--screenshot=${output}`,
    source.href,
  ],
  { stdio: 'ignore' },
);
console.log(`Wrote ${output}`);
