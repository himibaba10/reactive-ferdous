import numberBackground from '../assets/Numbers background.png';
import HeroImage from './HeroImage';
import HeroInfo from './HeroInfo';
import HeroLeftImage from './HeroLeftImage';
import HeroRightImage from './HeroRightImage';

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url("${numberBackground}"), linear-gradient(to bottom, rgba(11,17,35,1), rgba(64, 140, 255, 0.2))`,
        backgroundPosition: 'center -200%',
      }}
      className='mt-14 overflow-hidden bg-repeat-x'
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
