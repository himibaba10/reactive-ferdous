import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import DesignGallery from '../components/DesignGallery';
import ServiceHero from '../components/ServiceHero';
import ServiceCards from '../components/ServiceCards';
import DiscountBanner from '../components/DiscountBanner';
import { MdOutlineWeb, MdPhoneIphone, MdAutoGraph, MdOutlineDraw } from 'react-icons/md';

const Reviews = lazy(() => import('../components/Reviews'));
const Contact = lazy(() => import('../components/Contact'));

const FigmaDesign = () => {
  const cards = [
    {
      title: "Wireframing",
      description: "Laying the structural foundation of your digital product to ensure logical flow and intuitive user journeys before visual design.",
      icon: <MdOutlineDraw />
    },
    {
      title: "Prototyping",
      description: "Interactive, clickable prototypes that simulate the final product, perfect for user testing and stakeholder presentations.",
      icon: <MdAutoGraph />
    },
    {
      title: "Mobile App Design",
      description: "Sleek, native-feeling mobile interfaces tailored for both iOS and Android platforms.",
      icon: <MdPhoneIphone />
    },
    {
      title: "Web App Design",
      description: "Complex dashboards and responsive web application interfaces designed for maximum usability and minimum friction.",
      icon: <MdOutlineWeb />
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title="Figma UI/UX Design | Ferdous" 
        description="Expert UI/UX design services in Figma. Creating intuitive, highly-converting, and stunning user interfaces for web and mobile applications." 
      />
      
      <ServiceHero 
        title="Interfaces That Drive"
        highlightedText="Engagement"
        description="I craft beautiful, user-centric interfaces in Figma that provide seamless experiences, intuitive navigation, and high conversion rates."
      />

      <DiscountBanner serviceName="Figma UI/UX Design" />

      <section className="section max-w-5xl mx-auto mb-10 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">The Importance of UI/UX</h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          A great product can easily fail if users find it difficult or confusing to navigate. User Interface (UI) and User Experience (UX) design bridges the gap between complex software and human interaction, ensuring every click feels natural and intentional.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Through careful wireframing, rapid prototyping, and meticulous attention to detail in Figma, I design digital products that not only look stunning but also guide users effortlessly toward your conversion goals.
        </p>
      </section>

      <ServiceCards 
        title="UI/UX Services" 
        description="From raw concepts to fully interactive prototypes, I handle the complete design lifecycle."
        cards={cards} 
      />

      <DesignGallery 
        category="Figma Design" 
        title="UI/UX Prototypes" 
        description="A showcase of wireframes, mockups, and interactive prototypes."
      />

      <Suspense fallback={<div className='min-h-[200px] flex items-center justify-center text-zinc-500'>Loading...</div>}>
        <Reviews />
        <Contact />
      </Suspense>
    </div>
  );
};

export default FigmaDesign;
