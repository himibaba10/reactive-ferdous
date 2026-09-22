import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Heading from '../ui/Heading';

/**
 * Client-side fallback for an unknown in-app route. Direct requests for paths
 * with no prerendered file are handled by public/404.html with a real 404.
 */
const NotFound = () => (
  <>
    <SEO
      title='Page Not Found | Ferdous Ahmed'
      description='That page does not exist. Browse the services and case studies instead.'
      noindex
    />
    <section className='section my-32 text-center'>
      <Heading className='text-4xl sm:text-6xl mb-6'>Page Not Found</Heading>
      <p className='text-zinc-400 mb-10 text-lg'>
        That page doesn&rsquo;t exist. Try one of these instead.
      </p>
      <ul className='flex flex-wrap gap-6 justify-center text-zinc-300'>
        <li>
          <Link to='/' className='underline underline-offset-4 hover:text-white transition-colors'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/work' className='underline underline-offset-4 hover:text-white transition-colors'>
            Case studies
          </Link>
        </li>
        <li>
          <Link
            to='/services/web-development'
            className='underline underline-offset-4 hover:text-white transition-colors'
          >
            Services
          </Link>
        </li>
        <li>
          <Link to='/privacy' className='underline underline-offset-4 hover:text-white transition-colors'>
            Privacy
          </Link>
        </li>
      </ul>
    </section>
  </>
);

export default NotFound;
