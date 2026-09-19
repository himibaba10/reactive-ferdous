import { motion } from 'framer-motion';
import clientReviewImage from '../assets/Client Review.webp';

const HeroLeftImage = () => {
  return (
    <motion.img
      initial={{ left: '-25rem', top: '0px', rotate: -5 }}
      whileInView={{ left: '-2rem' }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
      className='absolute'
      src={clientReviewImage}
      alt='Client review screenshot from a recent web development project'
      width={404}
      height={238}
      loading='lazy'
      decoding='async'
      fetchpriority='low'
    />
  );
};

export default HeroLeftImage;
