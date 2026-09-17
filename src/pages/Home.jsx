import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import LeadBanner from '../components/LeadBanner';
import About from '../components/About';
import Services from '../components/Services';
import SEO from '../components/SEO';

// Defer Firebase-backed slider off the critical path
const LogoSlider = lazy(() => import('../components/LogoSlider'));
// Below-the-fold (Reviews also pulls Firebase)
const Reviews = lazy(() => import('../components/Reviews'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));

const sectionFallback = (
  <div className='min-h-[120px] flex items-center justify-center text-zinc-400'>
    Loading...
  </div>
);

function Home() {
  return (
    <>
      <SEO
        title='Ferdous Ahmed | Web Developer & Designer'
        description='We partner with businesses to deliver digital solutions that solve real problems. Specializing in Web Development, Graphic Design, and Figma Design.'
        path='/'
      />

      {/* Above the fold — no Firebase */}
      <Hero />

      <Suspense fallback={sectionFallback}>
        <LogoSlider />
      </Suspense>

      <About />
      <Services />

      {/* Below the fold */}
      <Suspense fallback={sectionFallback}>
        <LeadBanner
          text="Not sure where to start? Let's map out your strategy."
          buttonText='Get a Free Audit'
          message="Hi Team, I'd like to get a free website audit!"
        />

        <Reviews />

        <LeadBanner
          text='Ready to become our next success story?'
          buttonText='Discuss Your Project'
          message="Hi Team, I'm ready to become your next success story!"
        />

        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
}

export default Home;
