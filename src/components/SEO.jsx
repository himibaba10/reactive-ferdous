import { useEffect } from 'react';

export const SITE_URL = 'https://reactive-ferdous.netlify.app';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const setMetaByName = (name, content) => {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setMetaByProperty = (property, content) => {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href) => {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/**
 * Updates document title, description, canonical, Open Graph, and Twitter tags.
 * @param {string} title
 * @param {string} description
 * @param {string} [path='/'] - Route path used to build absolute canonical / og:url
 * @param {string} [image] - Absolute image URL for social previews
 * @param {boolean} [noindex=false] - Block indexing (admin / dashboard)
 */
const SEO = ({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}) => {
  useEffect(() => {
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
    const canonicalUrl =
      normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;

    if (title) {
      document.title = title;
      setMetaByProperty('og:title', title);
      setMetaByName('twitter:title', title);
    }

    if (description) {
      setMetaByName('description', description);
      setMetaByProperty('og:description', description);
      setMetaByName('twitter:description', description);
    }

    setCanonical(canonicalUrl);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:site_name', 'Ferdous Ahmed');
    setMetaByProperty('og:image', image);
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:image', image);
    setMetaByName('twitter:image:alt', title || 'Ferdous Ahmed');

    setMetaByName(
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow'
    );
  }, [title, description, path, image, noindex]);

  return null;
};

export default SEO;
