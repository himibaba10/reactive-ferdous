import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import DesignGallery from '../components/DesignGallery';
import ServiceHero from '../components/ServiceHero';
import ServiceCards from '../components/ServiceCards';
import DiscountBanner from '../components/DiscountBanner';
import { MdOutlineImage, MdContactPage, MdViewDay, MdOutlineShare } from 'react-icons/md';

const Reviews = lazy(() => import('../components/Reviews'));
const Contact = lazy(() => import('../components/Contact'));

const GraphicDesign = () => {
  const cards = [
    {
      title: "Poster Design",
      description: "High-impact poster designs for events, marketing campaigns, and promotions that grab attention instantly.",
      icon: <MdOutlineImage />
    },
    {
      title: "Business Card Design",
      description: "Professional and memorable business cards that leave a lasting impression on your clients and partners.",
      icon: <MdContactPage />
    },
    {
      title: "Banner Design",
      description: "Engaging web and print banners designed to drive clicks and clearly communicate your message.",
      icon: <MdViewDay />
    },
    {
      title: "Social Media Graphics",
      description: "Optimized, shareable graphics tailored for Instagram, Facebook, LinkedIn, and Twitter to boost engagement.",
      icon: <MdOutlineShare />
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title="Graphic Design | Branding & Visual Identity | Ferdous" 
        description="Professional graphic design services including corporate branding, marketing materials, social media assets, and complete visual identity systems." 
      />
      
      <ServiceHero 
        title="Visual Identities That"
        highlightedText="Stand Out"
        description="Elevate your brand with premium, eye-catching graphic design. From memorable logos to complete marketing kits, I design visuals that leave a lasting impression."
      />

      <DiscountBanner serviceName="Graphic Design" />

      <section className="section max-w-5xl mx-auto mb-10 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Why Visual Identity Matters</h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          In today's crowded digital landscape, your visual identity is often the first interaction a potential customer has with your business. A strong, cohesive design language builds trust, conveys professionalism, and separates you from the competition.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          My graphic design services are rooted in strategy. I don't just make things look good; I ensure your marketing materials, brand guidelines, and digital assets align perfectly with your core business values and speak directly to your target audience.
        </p>
      </section>

      <ServiceCards 
        title="Graphic Design Services" 
        description="Comprehensive design solutions tailored to your specific marketing and branding needs."
        cards={cards} 
      />

      <DesignGallery 
        category="Graphic Design" 
        title="Graphic Design Portfolio" 
        description="Explore a selection of my recent branding and graphic design projects."
      />

      <Suspense fallback={<div className='min-h-[200px] flex items-center justify-center text-zinc-500'>Loading...</div>}>
        <Reviews />
        <Contact />
      </Suspense>
    </div>
  );
};

export default GraphicDesign;
