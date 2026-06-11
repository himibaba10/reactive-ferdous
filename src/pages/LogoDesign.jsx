import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import DesignGallery from '../components/DesignGallery';
import ServiceHero from '../components/ServiceHero';
import ServiceCards from '../components/ServiceCards';
import DiscountBanner from '../components/DiscountBanner';
import { MdOutlineDiamond, MdOutlinePets, MdOutlineFontDownload, MdOutlineViewInAr } from 'react-icons/md';

const Reviews = lazy(() => import('../components/Reviews'));
const Contact = lazy(() => import('../components/Contact'));

const LogoDesign = () => {
  const cards = [
    {
      title: "Minimalist Logo",
      description: "Clean, modern, and uncluttered designs that look great on everything from favicons to billboards.",
      icon: <MdOutlineDiamond />
    },
    {
      title: "3D Logo",
      description: "Eye-catching three-dimensional marks with depth, shadow, and stunning gradients.",
      icon: <MdOutlineViewInAr />
    },
    {
      title: "Mascot Logo",
      description: "Friendly and highly identifiable character-driven logos perfect for engaging communities and gaming brands.",
      icon: <MdOutlinePets />
    },
    {
      title: "Wordmark Logo",
      description: "Custom typography and lettermarks that make your brand name itself the unforgettable icon.",
      icon: <MdOutlineFontDownload />
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title="Logo Design | Custom Brand Marks | Ferdous" 
        description="Custom logo design services focused on creating memorable, scalable, and timeless brand marks that define your business identity." 
      />
      
      <ServiceHero 
        title="Logos That Speak"
        highlightedText="Volumes"
        description="I create distinctive, memorable logos that capture the essence of your business and serve as the cornerstone of your brand identity."
      />

      <DiscountBanner serviceName="Logo Design" />

      <section className="section max-w-5xl mx-auto mb-10 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Crafting Timeless Brands</h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          A logo is more than just a symbol; it's the face of your company. It needs to be recognizable, scalable across various mediums, and instantly communicate the values of your brand.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Through a rigorous process of research, conceptualization, and refinement, I design custom brand marks that not only look modern today but will remain relevant for years to come. Whether you're a startup looking for your first identity or an established business ready for a rebrand, I deliver designs that resonate.
        </p>
      </section>

      <ServiceCards 
        title="Logo Design Styles" 
        description="From clean minimalism to complex 3D marks, I tailor the aesthetic to match your brand's unique personality."
        cards={cards} 
      />

      <DesignGallery 
        category="Logo Design" 
        title="Logo Portfolio" 
        description="A collection of custom brand marks and logotypes."
      />

      <Suspense fallback={<div className='min-h-[200px] flex items-center justify-center text-zinc-500'>Loading...</div>}>
        <Reviews />
        <Contact />
      </Suspense>
    </div>
  );
};

export default LogoDesign;
