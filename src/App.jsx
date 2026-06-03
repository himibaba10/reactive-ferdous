import { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Blob from "./ui/Blob";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import About from "./components/About";
import Services from "./components/Services";
import LeadBanner from "./components/LeadBanner";
import Heading from "./ui/Heading";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Dynamically load heavy below-the-fold components
const Process = lazy(() => import("./components/Process"));
const Skills = lazy(() => import("./components/Skills"));
const Stats = lazy(() => import("./components/Stats"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Reviews = lazy(() => import("./components/Reviews"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <main id="hero">
      <Popup />
      <FloatingWhatsApp />
      <Blob />
      <Navbar />
      
      {/* Above the fold (eager loaded) */}
      <Hero />
      <LogoSlider />
      <About />
      <Services />

      {/* Below the fold (lazy loaded) */}
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-zinc-500">Loading...</div>}>
        <Process />
        
        <LeadBanner 
          text="Not sure where to start? Let's map out your strategy." 
          buttonText="Get a Free Audit" 
          message="Hi Ferdous, I'd like to get a free website audit!" 
        />
        
        <Skills />
        <Stats />
        <Portfolio />
        <Reviews />
        
        <LeadBanner 
          text="Ready to become my next success story?" 
          buttonText="Discuss Your Project" 
          message="Hi Ferdous, I'm ready to become your next success story!" 
        />
        
        <FAQ />
        <Contact />
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
