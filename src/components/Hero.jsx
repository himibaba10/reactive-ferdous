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
      <HeroInfo />
      <div className='relative mt-10 sm:mt-28 text-center'>
        <HeroLeftImage />
        <HeroRightImage />
        <HeroImage />
      </div>
    </div>
  );
};

export default Hero;
