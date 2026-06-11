import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import LeadBanner from '../components/LeadBanner';
import ServiceHero from '../components/ServiceHero';
import DiscountBanner from '../components/DiscountBanner';
import ServiceCards from '../components/ServiceCards';
import { motion } from 'framer-motion';
import { MdOutlineShoppingCart, MdOutlineBusiness, MdOutlineCloud, MdOutlineWeb } from 'react-icons/md';

const Process = lazy(() => import('../components/Process'));
const Skills = lazy(() => import('../components/Skills'));
const Stats = lazy(() => import('../components/Stats'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Reviews = lazy(() => import('../components/Reviews'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));

const WebDevelopment = () => {
  const cards = [
    {
      title: "E-Commerce Platforms",
      description: "Robust, secure online stores built to maximize conversions and handle thousands of products with ease.",
      icon: <MdOutlineShoppingCart />
    },
    {
      title: "Corporate Websites",
      description: "Professional, responsive corporate hubs that establish trust and clearly communicate your company's value proposition.",
      icon: <MdOutlineBusiness />
    },
    {
      title: "SaaS Applications",
      description: "Scalable, highly-interactive MERN stack web applications designed to deliver your software service flawlessly.",
      icon: <MdOutlineCloud />
    },
    {
      title: "Landing Pages",
      description: "High-converting, laser-focused single pages optimized for marketing campaigns and lead generation.",
      icon: <MdOutlineWeb />
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title="Web Development | Custom Apps & WordPress | Ferdous" 
        description="I build lightning-fast, highly-converting custom web applications and lead-generation WordPress sites optimized for performance and SEO." 
      />
      
      <ServiceHero 
        title="I Build Web Apps That"
        highlightedText="Drive Growth"
        description="Stop losing customers to slow, outdated websites. I specialize in crafting modern, SEO-friendly web solutions designed to maximize your ROI and act as a 24/7 lead magnet for your business."
      >
        {/* Top Left Image */}
        <motion.img 
          initial={{ left: "-100%", top: "10%", rotate: -15, opacity: 0 }}
          animate={{ left: "3%", top: "15%", rotate: -8, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
          className="absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block"
          alt="Dashboard Project"
        />
        {/* Bottom Left Image */}
        <motion.img 
          initial={{ left: "-100%", bottom: "5%", rotate: -20, opacity: 0 }}
          animate={{ left: "5%", bottom: "10%", rotate: -14, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
          className="absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block"
          alt="Analytics Project"
        />
        {/* Top Right Image */}
        <motion.img 
          initial={{ right: "-100%", top: "15%", rotate: 15, opacity: 0 }}
          animate={{ right: "3%", top: "18%", rotate: 8, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=400&q=80"
          className="absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block"
          alt="UI Project"
        />
        {/* Bottom Right Image */}
        <motion.img 
          initial={{ right: "-100%", bottom: "5%", rotate: 20, opacity: 0 }}
          animate={{ right: "5%", bottom: "8%", rotate: 12, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80"
          className="absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block"
          alt="Mobile Web Project"
        />
      </ServiceHero>

      <DiscountBanner serviceName="Web Development" />

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10 text-center">My Approach to Web Development</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 w-full">
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Lead-Generating Solutions</h3>
              <p className="text-zinc-400">Your website shouldn't just look pretty. I build tailored MERN stack apps and WordPress sites optimized from the ground up to capture leads and drive sales.</p>
            </div>
            
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">SEO & Performance First</h3>
              <p className="text-zinc-400">Faster websites mean lower bounce rates and higher search engine rankings. I write clean, fully SEO-optimized code to ensure maximum visibility and traffic.</p>
            </div>
            
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Conversion & ROI Driven</h3>
              <p className="text-zinc-400">Every button, layout, and user journey is mapped out with a conversion-first mindset to guarantee you see a measurable Return on Investment (ROI).</p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Web Development Workspace" 
              className="w-full h-auto lg:h-[500px] object-cover rounded-2xl shadow-[0_0_40px_rgba(64,140,255,0.15)] border border-zinc-700/50"
            />
          </div>
        </div>
      </section>

      <ServiceCards 
        title="What I Build" 
        description="From high-converting landing pages to complex web applications, I have you covered."
        cards={cards} 
      />

      <Suspense fallback={<div className='min-h-[200px] flex items-center justify-center text-zinc-500'>Loading...</div>}>
        <Process />
        <Skills />
        <Stats />
        <Portfolio />
        <Reviews />
        <FAQ />
        <LeadBanner text='Ready to start your next web project?' buttonText='Discuss Your Project' message="Hi Ferdous, I'm ready to discuss a web development project!" />
        <Contact />
      </Suspense>
    </div>
  );
};

export default WebDevelopment;
