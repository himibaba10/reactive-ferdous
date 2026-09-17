import { useEffect, useState } from 'react';
import HeroImage from './HeroImage';
import HeroInfo from './HeroInfo';
import HeroLeftImage from './HeroLeftImage';
import HeroRightImage from './HeroRightImage';

const Hero = () => {
  // Decorative pattern must NOT be LCP (web.dev: never lazy-load LCP;
  // a large viewport img will win LCP — load it only after the page is idle).
  const [showPattern, setShowPattern] = useState(false);

  useEffect(() => {
    const reveal = () => setShowPattern(true);
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(reveal, { timeout: 2000 });
      } else {
        window.setTimeout(reveal, 1);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(11,17,35,1), rgba(64, 140, 255, 0.2))',
      }}
      className='mt-14 overflow-hidden relative'
    >
      {showPattern && (
        <img
          src='/images/numbers-background.webp'
          alt=''
          aria-hidden='true'
          decoding='async'
          fetchpriority='low'
          className='pointer-events-none absolute inset-x-0 top-0 w-full h-auto opacity-40 select-none'
          style={{ transform: 'translateY(-40%)' }}
        />
      )}

      <div className='relative z-10'>
        <HeroInfo />
        <div className='relative mt-10 sm:mt-28 text-center'>
          <HeroLeftImage />
          <HeroRightImage />
          <HeroImage />
        </div>
      </div>
    </div>
  );
};

export default Hero;
