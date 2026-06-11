import { motion } from 'framer-motion';
import React from 'react';
import Heading from '../ui/Heading';
import PrimaryButton from '../ui/PrimaryButton';
import { useAboutSlider } from '../hooks/useAboutSlider';

const projectImages = ['/projects/marvich-ai.webp', '/projects/kamro.webp', '/projects/electricallpro.webp', '/projects/claimcloud-cz.webp', '/projects/zeplan.webp'];

const About = () => {
  const images = useAboutSlider(projectImages);

  return (
    <section id='about' className='my-16 sm:my-28 section'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Left Column: Text */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <Heading className='font-bebas text-5xl sm:text-7xl text-secondary mb-6 text-left'>Who Am I?</Heading>
          <p className='text-base sm:text-xl mb-10 text-zinc-300 leading-relaxed max-w-xl'>
            We don't just write code; We build digital assets that generate revenue. With over 4 years of experience specializing in WordPress and modern web infrastructure, I bridge the gap between
            stunning design and high-converting architecture.
            <br />
            <br />
            Our philosophy is simple: your website shouldn't be an expense—it should be your hardest-working sales engine. Whether you need a lead-optimized WordPress funnel or a custom React
            application, We engineer solutions focused entirely on maximizing your Return on Investment (ROI).
          </p>
          <a href='#portfolio'>
            <PrimaryButton>SEE OUR PROJECTS</PrimaryButton>
          </a>
        </motion.div>

        {/* Right Column: 3D Auto-Slider */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='relative h-[300px] sm:h-[450px] w-full hidden md:block'
        >
          {images.map((img, idx) => {
            const isFront = idx === 0;
            const isMid = idx === 1;
            const isBack = idx === 2;
            const isHidden = idx > 2;

            return (
              <motion.img
                key={img}
                initial={false}
                animate={{
                  top: isFront ? '7rem' : isMid ? '3rem' : isBack ? '0rem' : '7rem',
                  right: isFront ? '30%' : isMid ? '15%' : isBack ? '0%' : '30%',
                  zIndex: isFront ? 20 : isMid ? 10 : isBack ? 0 : 30,
                  opacity: isFront ? 1 : isMid ? 0.7 : isBack ? 0.4 : 0,
                  scale: isFront ? 1 : isMid ? 0.95 : isBack ? 0.9 : 1.1,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                src={img}
                alt='Portfolio Snippet'
                loading='lazy'
                className={`absolute w-3/5 aspect-[5/6] object-cover object-top rounded-xl shadow-2xl border ${isFront ? 'border-2 border-secondary/70' : 'border-zinc-700/50'} ${isHidden ? 'pointer-events-none' : ''}`}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
