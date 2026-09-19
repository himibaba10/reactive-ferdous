export const SITE_URL = 'https://portfolio.reactiveferdous.com';

/**
 * Public, indexable routes. Single source of truth for the prerender step and
 * the sitemap generator. `src` is used to derive an accurate `lastmod` from git.
 */
export const PUBLIC_ROUTES = [
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
];
