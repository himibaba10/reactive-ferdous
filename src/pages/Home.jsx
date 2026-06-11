import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import LeadBanner from '../components/LeadBanner';
import LogoSlider from '../components/LogoSlider';
import About from '../components/About';
import Services from '../components/Services';
import SEO from '../components/SEO';

// Dynamically load heavy below-the-fold components
const Reviews = lazy(() => import('../components/Reviews'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
  return (
    <>
      <SEO 
        title="Ferdous | Web Developer & Designer" 
        description="I partner with businesses to deliver digital solutions that solve real problems. Specializing in Web Development, Graphic Design, and Figma Design." 
      />

      {/* Above the fold (eager loaded) */}
      <Hero />
      <LogoSlider />
      <About />
      <Services />

      {/* Below the fold (lazy loaded) */}
      <Suspense fallback={<div className='min-h-[200px] flex items-center justify-center text-zinc-500'>Loading...</div>}>
        <LeadBanner text="Not sure where to start? Let's map out your strategy." buttonText='Get a Free Audit' message="Hi Ferdous, I'd like to get a free website audit!" />

        <Reviews />

        <LeadBanner text='Ready to become my next success story?' buttonText='Discuss Your Project' message="Hi Ferdous, I'm ready to become your next success story!" />

        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
}

export default Home;
