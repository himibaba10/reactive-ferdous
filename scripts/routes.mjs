import { caseStudies } from '../src/data/caseStudies.js';

export const SITE_URL = 'https://portfolio.reactiveferdous.com';

/**
 * Public, indexable routes. Single source of truth for the prerender step and
 * the sitemap generator.
 *
 * Case studies are derived from `src/data/caseStudies.js`, so publishing one is
 * a single content edit: flip `published` to true and it is prerendered and
 * added to the sitemap automatically.
 *
 * `src` is used to derive an accurate `lastmod` from git.
 */
const staticRoutes = [
  { path: '/', src: 'src/pages/Home.jsx', changefreq: 'weekly', priority: '1.0' },
  {
    path: '/services/web-development',
    src: 'src/pages/WebDevelopment.jsx',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/services/graphic-design',
    src: 'src/pages/GraphicDesign.jsx',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/services/figma-design',
    src: 'src/pages/FigmaDesign.jsx',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/services/logo-design',
    src: 'src/pages/LogoDesign.jsx',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/work',
    src: 'src/pages/Work.jsx',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '/privacy',
    src: 'src/pages/Privacy.jsx',
    changefreq: 'yearly',
    priority: '0.3',
  },
];

const hasPlaceholder = (study) => JSON.stringify(study).includes('TODO');

const caseStudyRoutes = caseStudies
  .filter((study) => {
    if (!study.published) return false;
    if (hasPlaceholder(study)) {
      console.warn(
        `[routes] Skipping published case study "${study.slug}" — it still contains TODO placeholders.`
      );
      return false;
    }
    return true;
  })
  .map((study) => ({
    path: `/work/${study.slug}`,
    src: 'src/data/caseStudies.js',
    changefreq: 'monthly',
    priority: '0.7',
  }));

export const PUBLIC_ROUTES = [...staticRoutes, ...caseStudyRoutes];
