import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_ROUTES, SITE_URL } from './routes.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

/** Last commit date (YYYY-MM-DD) for a file, or null when git is unavailable. */
const gitDate = (src) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', src], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
};

const buildDate = () => new Date().toISOString().slice(0, 10);

export const generateSitemap = async () => {
  const today = buildDate();

  const urls = PUBLIC_ROUTES.map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    const lastmod = gitDate(route.src) || today;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  const outPath = path.join(root, 'dist', 'sitemap.xml');
  await writeFile(outPath, xml, 'utf8');
  console.log(`Generated ${path.relative(root, outPath)} (${PUBLIC_ROUTES.length} urls)`);
};

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  generateSitemap().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
