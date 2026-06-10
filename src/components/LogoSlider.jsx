import React from 'react';
import { useLogoSlider } from '../hooks/useLogoSlider';

const LogoSlider = () => {
  const { logos, loading } = useLogoSlider();

  if (loading || logos.length === 0) return null;

  // Duplicate the array multiple times to ensure the screen is filled and loops seamlessly
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className='w-full py-12 bg-zinc-900/10 border-y border-zinc-800/30 overflow-hidden relative'>
      <div className='text-center mb-8'>
        <p className='text-zinc-500 uppercase tracking-widest text-sm font-semibold'>Trusted by innovative companies</p>
      </div>

      <div className='flex relative overflow-hidden w-full'>
        {/* Fading edges for smooth entry/exit effect */}
        <div className='absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none'></div>
        <div className='absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none'></div>

        <div className='flex animate-marquee hover:[animation-play-state:paused] items-center'>
          {duplicatedLogos.map((url, index) => (
            <div key={index} className='flex items-center justify-center min-w-[200px] px-8'>
              <img
                src={url}
                alt='Partner Logo'
                loading='lazy'
                className='max-h-12 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer'
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx='true'>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default LogoSlider;
