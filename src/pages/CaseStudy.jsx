import { Link, useParams } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';
import Heading from '../ui/Heading';
import PrimaryButton from '../ui/PrimaryButton';
import { caseStudies } from '../data/caseStudies';

const absolute = (src) => (!src ? undefined : src.startsWith('http') ? src : `${SITE_URL}${src}`);

const CaseStudyNotFound = () => (
  <>
    <SEO
      title='Case Study Not Found | Ferdous Ahmed'
      description='This case study does not exist or has not been published.'
      noindex
    />
    <section className='section my-32 text-center'>
      <Heading className='text-4xl sm:text-6xl mb-6'>Not Found</Heading>
      <p className='text-zinc-400 mb-10 text-lg'>
        That case study does not exist or has not been published yet.
      </p>
      <Link
        to='/'
        className='text-zinc-300 hover:text-white underline underline-offset-4 transition-colors'
      >
        Back to home
      </Link>
    </section>
  </>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const study = caseStudies.find((item) => item.slug === slug && item.published);

  if (!study) return <CaseStudyNotFound />;

  const canonical = `${SITE_URL}/work/${study.slug}`;
  const ogImage = absolute(study.ogImage || study.heroImage?.src);

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.h1,
    headline: study.title,
    description: study.metaDescription,
    url: canonical,
    image: ogImage,
    about: study.service?.label,
    keywords: study.stack?.join(', '),
    author: { '@type': 'Person', name: 'Ferdous Ahmed', url: SITE_URL },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...(study.service
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: study.service.label,
              item: `${SITE_URL}${study.service.path}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: study.service ? 3 : 2,
        name: study.h1,
        item: canonical,
      },
    ],
  };

  return (
    <article>
      <SEO
        title={study.title}
        description={study.metaDescription}
        path={`/work/${study.slug}`}
        image={ogImage}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <header className='section max-w-4xl mx-auto pt-16 pb-12'>
        <nav aria-label='Breadcrumb' className='text-sm text-zinc-400 mb-8'>
          <ol className='flex flex-wrap items-center gap-2'>
            <li>
              <Link to='/' className='hover:text-white transition-colors'>
                Home
              </Link>
            </li>
            {study.service && (
              <>
                <li aria-hidden='true'>/</li>
                <li>
                  <Link
                    to={study.service.path}
                    className='hover:text-white transition-colors'
                  >
                    {study.service.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden='true'>/</li>
            <li className='text-zinc-500'>{study.client}</li>
          </ol>
        </nav>

        <p className='text-secondary font-bold tracking-wider uppercase text-sm mb-4'>
          {study.client}
          {study.date ? ` · ${study.date}` : ''}
        </p>

        <h1 className='text-3xl sm:text-5xl lg:text-6xl leading-tight text-white'>
          {study.h1}
        </h1>

        <p className='mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed'>
          {study.summary}
        </p>

        {study.stack?.length > 0 && (
          <ul className='mt-8 flex flex-wrap gap-3'>
            {study.stack.map((tech) => (
              <li
                key={tech}
                className='bg-zinc-800/60 border border-zinc-700/50 rounded-full px-4 py-1 text-sm text-zinc-300'
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <dl className='mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm'>
          {study.timeline && (
            <div>
              <dt className='text-zinc-500'>Timeline</dt>
              <dd className='text-zinc-200'>{study.timeline}</dd>
            </div>
          )}
          {study.service && (
            <div>
              <dt className='text-zinc-500'>Service</dt>
              <dd>
                <Link
                  to={study.service.path}
                  className='text-zinc-200 underline underline-offset-4 hover:text-white transition-colors'
                >
                  {study.service.label}
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {study.heroImage && (
        <div className='section max-w-6xl mx-auto'>
          <img
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            width={study.heroImage.width}
            height={study.heroImage.height}
            fetchpriority='high'
            decoding='async'
            className='w-full h-auto rounded-3xl border border-zinc-800'
          />
        </div>
      )}

      <div className='section max-w-4xl mx-auto my-20 grid gap-14'>
        <div>
          <Heading className='text-3xl sm:text-5xl mb-6'>The Context</Heading>
          <p className='text-zinc-300 text-lg leading-relaxed'>{study.context}</p>
        </div>
        <div>
          <Heading className='text-3xl sm:text-5xl mb-6'>The Problem</Heading>
          <p className='text-zinc-300 text-lg leading-relaxed'>{study.problem}</p>
        </div>
        {study.constraints?.length > 0 && (
          <div>
            <Heading className='text-3xl sm:text-5xl mb-6'>Constraints</Heading>
            <ul className='grid gap-3'>
              {study.constraints.map((item) => (
                <li key={item} className='flex gap-3 text-zinc-300'>
                  <span aria-hidden='true' className='text-secondary'>
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {study.approach?.length > 0 && (
        <section className='section max-w-6xl mx-auto my-20'>
          <Heading className='text-3xl sm:text-5xl mb-10 text-center'>
            The Approach
          </Heading>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {study.approach.map((step) => (
              <div
                key={step.title}
                className='bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50'
              >
                <h3 className='text-xl font-bold text-white mb-2'>{step.title}</h3>
                <p className='text-zinc-400'>{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {study.results?.length > 0 && (
        <section className='section max-w-6xl mx-auto my-20'>
          <Heading className='text-3xl sm:text-5xl mb-10 text-center'>
            The Result
          </Heading>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {study.results.map((result) => (
              <div
                key={result.label}
                className='bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center'
              >
                <p className='text-2xl sm:text-3xl font-bold text-secondary mb-2'>
                  {result.value}
                </p>
                <p className='text-zinc-400'>{result.label}</p>
                {result.note && (
                  <p className='mt-2 text-xs text-zinc-500'>{result.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {study.proof?.length > 0 && (
        <section className='section max-w-6xl mx-auto my-20'>
          <Heading className='text-3xl sm:text-5xl mb-10 text-center'>
            The Work
          </Heading>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {study.proof.map((img) => (
              <figure key={img.src}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading='lazy'
                  decoding='async'
                  className='w-full h-auto rounded-2xl border border-zinc-800'
                />
                {img.caption && (
                  <figcaption className='mt-3 text-sm text-zinc-500'>
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {study.testimonial?.quote && (
        <section className='section max-w-4xl mx-auto my-20'>
          <blockquote className='bg-zinc-900/30 rounded-3xl border border-zinc-800 p-10'>
            <p className='text-xl sm:text-2xl text-zinc-200 leading-relaxed'>
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <footer className='mt-6 text-zinc-400'>
              <span className='text-white font-semibold'>
                {study.testimonial.author}
              </span>
              {study.testimonial.role ? ` — ${study.testimonial.role}` : ''}
            </footer>
          </blockquote>
        </section>
      )}

      <section className='section max-w-4xl mx-auto my-24 text-center'>
        <Heading className='text-3xl sm:text-5xl mb-6'>
          Want results like this?
        </Heading>
        <div className='mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center'>
          <PrimaryButton
            href='https://wa.me/8801997722621'
            target='_blank'
            rel='noopener noreferrer'
          >
            Start Your Project Today
          </PrimaryButton>
          {study.service && (
            <Link
              to={study.service.path}
              className='text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium'
            >
              See all {study.service.label} services
            </Link>
          )}
        </div>
      </section>
    </article>
  );
};

export default CaseStudy;
