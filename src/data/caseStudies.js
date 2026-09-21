/**
 * Case studies.
 *
 * `published: true` is the gate: only published entries are prerendered to
 * static HTML, listed in the sitemap, and served at /work/<slug>. Leave a draft
 * at `false` and it never reaches the build output, the index, or production.
 *
 * Entries containing "TODO" are refused by the build even if `published` is
 * true, so an unfinished draft can never ship by accident.
 *
 * Set `published: true` only when the entry has real content, client permission
 * to show the work, and results you can stand behind. Attribute any figure the
 * client reported rather than measured — see the `note` field on `results`.
 *
 * Voice: the site speaks as "we" throughout. Client testimonial quotes are the
 * one exception — those are the client's own words and stay untouched.
 */
export const caseStudies = [
  {
    slug: 'simply-beds',
    published: true,
    client: 'Simply Beds',
    service: { label: 'Web Development', path: '/services/web-development' },
    // `date` is when the work was delivered; it renders next to the client name.
    date: 'June 2026',
    timeline: '10 days',

    // --- SEO ---
    title: 'From 6s to Under 1s: A WooCommerce Rescue | Simply Beds',
    metaDescription:
      'How we rebuilt a slow, error-prone WooCommerce store for Simply Beds: 80+ plugins down to 25, one page builder instead of several, load time from 6s to under 1s.',
    ogImage: '/case-studies/simply-beds/hero.webp',

    // --- Header ---
    h1: 'From 6 Seconds to Under 1 Second — and 3× the Conversions',
    summary:
      'The store was slow, threw PHP errors constantly, and ran on 80+ plugins with several page builders fighting over the same pages. In ten days we rebuilt it around a single builder and a minimal theme, added caching, and cut load time from over 6 seconds to under a second.',
    stack: ['WordPress', 'WooCommerce', 'Elementor Pro', 'Object Caching'],

    heroImage: {
      src: '/case-studies/simply-beds/hero.webp',
      alt: 'The Simply Beds homepage, showing their factory-direct mattress range',
      width: 1600,
      height: 1000,
    },

    // --- Body ---
    context:
      'Simply Beds manufactures mattresses in their own Brisbane factory and sells them factory-direct across Brisbane and the Sunshine Coast, cutting out retail markups. Alongside mattresses, they sell ensembles, adjustable beds, custom-size mattresses and bed heads.',
    problem:
      'The store had been slow and unreliable for a long time. More than 80 plugins had accumulated over the years, several page builders had been layered on top of each other, fighting over the same pages, and the site threw PHP errors regularly. Pages took over six seconds to load, and the team could not rely on the site staying up.',
    constraints: [
      'Only ten days to fix and rebuild the entire site.',
      'Several page builders had been layered on top of each other, so this had to be a ground-up rebuild rather than a patch on the existing stack.',
    ],
    approach: [
      {
        title: 'Resolved the page-builder conflict',
        body: 'Competing page builders on the same pages were a major source of both the bloat and the PHP errors. We standardized the whole site on Elementor and Elementor Pro, so every page now renders through a single, predictable path.',
      },
      {
        title: 'Replaced the theme',
        body: 'The existing theme was heavy and error-prone in its own right. We moved the site to Hello Elementor, a deliberately minimal theme, so the theme stopped adding weight and conflicts of its own.',
      },
      {
        title: 'Cut the plugin stack and added caching',
        body: 'The site ran 80+ plugins; it now runs around 25. With the stack lean, we added object caching and server-side caching. That is what removed the remaining load time.',
      },
    ],
    results: [
      { label: 'Page load time', value: '6s → under 1s' },
      {
        label: 'Conversion rate',
        value: '3× better',
        note: 'Reported by the client',
      },
      { label: 'Lighthouse score', value: '90+' },
    ],
    proof: [
      {
        src: '/case-studies/simply-beds/proof-1.webp',
        alt: 'The Simply Beds mattress category page',
        caption:
          'The mattress category page after the rebuild — one of the pages that previously carried several competing page builders.',
        width: 1600,
        height: 1000,
      },
    ],
    testimonial: {
      // Light copy-edit for grammar only: "a number times" -> "a number of
      // times", and "help and go" -> "help and to go". No meaning changed.
      quote:
        "I have worked with Ferdous a number of times now. I find him exceptional. He is very happy to help and to go above and beyond the required task. I can't be more pleased with his knowledge and ability to get the job done.",
      author: 'Satbir Singh',
      role: 'Simply Beds',
    },
  },
];
