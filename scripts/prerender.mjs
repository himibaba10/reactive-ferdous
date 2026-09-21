import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { generateSitemap } from './generate-sitemap.mjs';
import { PUBLIC_ROUTES } from './routes.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = path.join(root, 'dist');
const PORT = 4321;

const exists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** `/` -> dist/index.html, `/a/b` -> dist/a/b/index.html */
const outputPathFor = (routePath) =>
  routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

const prerender = async () => {
  const builtIndex = path.join(distDir, 'index.html');
  if (!(await exists(builtIndex))) {
    throw new Error('dist/index.html not found — run `vite build` first.');
  }

  // Keep the untouched SPA shell for the Netlify catch-all (client-only routes).
  await writeFile(
    path.join(distDir, 'app.html'),
    await readFile(builtIndex, 'utf8'),
    'utf8'
  );

  const server = await preview({
    root,
    preview: { port: PORT, host: '127.0.0.1' },
  });
  const baseUrl = (server.resolvedUrls?.local?.[0] || `http://127.0.0.1:${PORT}/`).replace(
    /\/$/,
    ''
  );

  const browser = await chromium.launch();
  const snapshots = [];

  try {
    for (const route of PUBLIC_ROUTES) {
      const context = await browser.newContext();
      // The audit popup opens after 8s — never bake it into the static HTML.
      await context.addInitScript(() => {
        try {
          localStorage.setItem('hasSeenAuditPopup', 'true');
        } catch {
          /* ignore */
        }
      });

      const page = await context.newPage();
      // Keep gtag out of the markup.
      await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());

      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' });

      // Grow the viewport to the full page so every `whileInView` animation is
      // in view at once and settles to its visible state before we serialize.
      // Two passes: content can grow once lazy sections mount. The stagger on
      // the per-character headings reaches ~2s, so wait longer than that.
      for (let pass = 0; pass < 2; pass += 1) {
        const height = await page.evaluate(() => document.body.scrollHeight);
        await page.setViewportSize({
          width: 1440,
          height: Math.min(height + 200, 30000),
        });
        await wait(pass === 0 ? 1500 : 2500);
      }

      // Let the Firebase-backed sliders finish their reads.
      await page.waitForLoadState('networkidle');

      snapshots.push({ routePath: route.path, html: await page.content() });
      console.log(`Prerendered ${route.path}`);

      await context.close();
    }
  } finally {
    await browser.close();
    server.httpServer.closeAllConnections?.();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }

  // Write only after every route is captured, so a written file can never
  // shadow a later capture.
  for (const { routePath, html } of snapshots) {
    const outPath = outputPathFor(routePath);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
  }

  await generateSitemap();
  console.log(`Done — prerendered ${snapshots.length} routes.`);
};

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
