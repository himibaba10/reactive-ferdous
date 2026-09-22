/**
 * Generates the marketing PDFs and writes them into public/, so the build
 * serves them at:
 *   /case-studies/simply-beds.pdf
 *   /case-studies/lra-services.pdf
 *   /one-page-overview.pdf
 *
 * These are site assets now, which means they get committed — regenerating them
 * requires a rebuild for dist/ to pick the new files up.
 *
 * Run with: node marketing/make-pdfs.mjs   (after `npm run build`)
 *
 * Playwright's page.pdf() only works in headless Chromium.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
/** Sources live in marketing/; the served output goes to public/. */
const sourceDir = path.join(root, 'marketing');
const outDir = path.join(root, 'public');

/** The canonical origin links in the PDFs should point at. */
const SITE_ORIGIN = 'https://portfolio.reactiveferdous.com';

const CASE_STUDIES = ['simply-beds', 'lra-services'];

/**
 * The pages are printed from a local preview server, so site-internal links
 * (`/privacy`, `/work/`, the nav) would otherwise be baked into the PDF as
 * http://127.0.0.1:PORT/... — broken for anyone who opens it. Rewrite them to
 * the production origin before printing. Asset URLs are deliberately left
 * alone so the render still uses the local build.
 */
const absolutiseLinks = async (page, origin = SITE_ORIGIN) => {
  const stragglers = await page.evaluate((origin) => {
    const broken = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const raw = a.getAttribute('href');
      if (raw && raw.startsWith('/') && !raw.startsWith('//')) {
        a.setAttribute('href', origin + raw);
      }
      if (a.href.includes('127.0.0.1') || a.href.includes('localhost')) {
        broken.push(a.href);
      }
    });
    return broken;
  }, origin);

  if (stragglers.length) {
    console.warn(`  warning: ${stragglers.length} local link(s) remain:`, stragglers.slice(0, 3));
  }
  return stragglers;
};

/**
 * The nav logo is the white version, which disappears against the light print
 * treatment. The PDF passes swap in the dark logo, embedded as a data URI so
 * the documents don't depend on a served URL.
 */
const logoDataUri = (() => {
  const file = path.join(root, 'src', 'assets', 'Logo Dark.png');
  if (!fs.existsSync(file)) {
    console.warn('warning: src/assets/Logo Dark.png not found — the logo will be blank');
    return null;
  }
  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
})();

const swapLogo = async (page, selector) => {
  if (!logoDataUri) return;
  await page.evaluate(
    ([sel, src]) => {
      document.querySelectorAll(sel).forEach((img) => {
        img.src = src;
      });
    },
    [selector, logoDataUri]
  );
};

/**
 * The case study pages are dark by design. That reads beautifully on screen but
 * is heavy to print and can render light-on-light in some PDF viewers, so the
 * PDF gets a light treatment. Deliberately blunt: force backgrounds white and
 * text dark, then re-apply the accent at a darker, print-legible green.
 */
const PRINT_TREATMENT = `
  html, body { background: #ffffff !important; color: #18181b !important; }

  /* Overlay chrome has no place in a document */
  [role="dialog"], a[aria-label="Chat on WhatsApp"] { display: none !important; }
  nav { position: static !important; }

  section, article, header, footer, aside, div, figure, blockquote,
  dl, dd, dt, li, p, span, code, small {
    background: #ffffff !important;
    background-image: none !important;
    box-shadow: none !important;
  }

  /* Every light-on-dark grey the site uses, neutralised for white paper */
  .text-zinc-300, .text-zinc-400, .text-zinc-500, .text-zinc-600, .text-zinc-700,
  section, article, header, footer, aside, div, figure, blockquote,
  dl, dd, dt, li, p, span { color: #3f3f46 !important; }

  h1, h2, h3, h4, strong, .text-white { color: #111111 !important; }
  .text-secondary, .bg-secondary { color: #4d7c0f !important; }
  a { color: #3f6212 !important; }

  [class*="border-zinc"] { border-color: #e4e4e7 !important; }
  img { border-color: #e4e4e7 !important; }
`;

const ensureDist = () => {
  if (!fs.existsSync(path.join(root, 'dist', 'index.html'))) {
    throw new Error('dist/index.html not found — run `npm run build` first.');
  }
};

const main = async () => {
  ensureDist();
  fs.mkdirSync(path.join(outDir, 'case-studies'), { recursive: true });

  const server = await preview({ root, preview: { port: 4422, host: '127.0.0.1' } });
  const base = (server.resolvedUrls?.local?.[0] || 'http://127.0.0.1:4422/').replace(/\/$/, '');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  // Don't let the audit popup or the consent banner into the document.
  await context.addInitScript(() => {
    try {
      localStorage.setItem('hasSeenAuditPopup', 'true');
      localStorage.setItem('cookieConsent', 'accepted');
    } catch {
      /* ignore */
    }
  });

  const page = await context.newPage();

  for (const slug of CASE_STUDIES) {
    await page.goto(`${base}/work/${slug}/`, { waitUntil: 'load' });
    await new Promise((r) => setTimeout(r, 3000));
    await page.addStyleTag({ content: PRINT_TREATMENT });
    await swapLogo(page, 'img[alt="Ferdous Ahmed logo"]');
    await absolutiseLinks(page);
    await new Promise((r) => setTimeout(r, 800));

    const file = path.join(outDir, 'case-studies', `${slug}.pdf`);
    await page.pdf({
      path: file,
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
    });
    console.log(`wrote public/case-studies/${slug}.pdf`);
  }

  // The proof sheet is a purpose-built print document.
  const sheet = await context.newPage();
  await sheet.goto(
    `file://${path.join(sourceDir, 'proof-sheet.html').replace(/\\/g, '/')}`
  );
  await swapLogo(sheet, '#brand-logo');
  await new Promise((r) => setTimeout(r, 800));
  await sheet.pdf({
    path: path.join(outDir, 'one-page-overview.pdf'),
    format: 'A4',
    printBackground: true,
  });
  console.log('wrote public/one-page-overview.pdf');

  await browser.close();
  server.httpServer.closeAllConnections?.();
  await new Promise((resolve) => server.httpServer.close(resolve));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
