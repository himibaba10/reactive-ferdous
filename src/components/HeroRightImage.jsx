import { motion } from 'framer-motion';
import expertiseImg from '../assets/My expertise image.webp';

const HeroRightImage = () => {
  return (
    <motion.img
      initial={{ right: '-25rem', rotate: 7 }}
      whileInView={{ right: '-3rem' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className='absolute top-64 sm:top-20'
      src={expertiseImg}
      alt='Ferdous Ahmed web development and design expertise'
      width={405}
      height={238}
      loading='lazy'
      decoding='async'
      fetchpriority='low'
    />
  );
};

export default HeroRightImage;
