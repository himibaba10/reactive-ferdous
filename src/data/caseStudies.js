/**
 * Case studies.
 *
 * `published: true` is the gate: only published entries are prerendered to
 * static HTML, listed in the sitemap, and served at /work/<slug>. Leave a draft
 * at `false` and it never reaches the build output, the index, or production.
 *
 * Set `published: true` only when the entry has real content, client permission
 * to show the work, and results you can stand behind. If you cannot cite a
 * number, use a qualitative outcome in `results` instead of inventing one.
 */
export const caseStudies = [
  {
    slug: 'example-draft',
    published: false,
    client: '[Client name, or an honest label like "fintech startup"]',
    service: { label: 'Web Development', path: '/services/web-development' },
    year: '[2025]',
    timeline: '[e.g. 6 weeks]',

    // --- SEO ---
    title: '[SEO title — 50-60 chars, primary keyword first]',
    metaDescription:
      '[Meta description — 150-160 chars, state the problem and the result.]',
    ogImage: '/case-studies/example/og.jpg',

    // --- Header ---
    h1: '[Headline: lead with the outcome, not the deliverable]',
    summary:
      '[One or two sentences: what you did and the result it produced.]',
    stack: ['[React]', '[Node]', '[Firebase]'],

    heroImage: {
      src: '/case-studies/example/hero.webp',
      alt: '[Describe the hero image for screen readers]',
      width: 1600,
      height: 900,
    },

    // --- Body ---
    context: '[Who the client is and what their business does.]',
    problem:
      "[The business problem, ideally framed in the client's own words.]",
    constraints: [
      '[e.g. a hard launch date]',
      '[e.g. a legacy stack that could not be replaced]',
      '[e.g. no in-house design resource]',
    ],
    approach: [
      { title: '[Key decision]', body: '[Why you made it, and the tradeoff.]' },
      { title: '[Key decision]', body: '[Why you made it, and the tradeoff.]' },
      { title: '[Key decision]', body: '[Why you made it, and the tradeoff.]' },
    ],
    results: [
      { label: '[What changed]', value: '[Defensible number, or a qualitative outcome]' },
      { label: '[What changed]', value: '[Defensible number, or a qualitative outcome]' },
      { label: '[What changed]', value: '[Defensible number, or a qualitative outcome]' },
    ],
    proof: [
      {
        src: '/case-studies/example/proof-1.webp',
        alt: '[Describe the screenshot]',
        caption: '[What this shows]',
        width: 1200,
        height: 800,
      },
    ],
    testimonial: {
      quote: '[A quote the client has approved in writing]',
      author: '[Name]',
      role: '[Role, Company]',
    },
  },
];
