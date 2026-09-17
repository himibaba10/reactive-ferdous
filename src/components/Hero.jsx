import HeroImage from './HeroImage';
import HeroInfo from './HeroInfo';
import HeroLeftImage from './HeroLeftImage';
import HeroRightImage from './HeroRightImage';

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(11,17,35,1), rgba(64, 140, 255, 0.2))',
      }}
      className='mt-14 overflow-hidden relative'
    >
      {/* Decorative pattern — lazy so it cannot become LCP */}
      <img
        src='/images/numbers-background.webp'
        alt=''
        aria-hidden='true'
        loading='lazy'
        decoding='async'
        className='pointer-events-none absolute inset-x-0 top-0 w-full h-auto opacity-40 select-none'
        style={{ transform: 'translateY(-40%)' }}
      />

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
