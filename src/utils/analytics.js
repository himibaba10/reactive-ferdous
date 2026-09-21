/**
 * GA4 event helpers.
 *
 * `gtag.js` is loaded lazily (first interaction / 12s fallback) in index.html,
 * so an event fired before that must be queued — gtag.js drains
 * `window.dataLayer` on init.
 */
export const trackEvent = (name, params = {}) => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(['event', name, params]);
};

const linkLabel = (anchor) =>
  (anchor.getAttribute('aria-label') || anchor.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);

/**
 * One delegated listener for every conversion that matters, so individual
 * components never have to remember to instrument themselves.
 * Returns a cleanup function.
 */
export const initConversionTracking = () => {
  if (typeof document === 'undefined') return () => {};

  const handleClick = (event) => {
    const target = event.target;
    const anchor = target instanceof Element ? target.closest('a[href]') : null;
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const params = {
      link_text: linkLabel(anchor),
      link_url: href,
      page_path: window.location.pathname,
    };

    if (href.includes('wa.me') || href.includes('whatsapp')) {
      trackEvent('whatsapp_click', params);
    } else if (href.startsWith('mailto:')) {
      trackEvent('email_click', params);
    } else if (href.startsWith('tel:')) {
      trackEvent('phone_click', params);
    } else if ((anchor.getAttribute('aria-label') || '').includes('visit the live website')) {
      trackEvent('project_click', params);
    }
  };

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
};
