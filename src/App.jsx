import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Blob from "./ui/Blob";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import LeadBanner from "./components/LeadBanner";
import Heading from "./ui/Heading";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Framer from "./components/Framer";
import Popup from "./components/Popup";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function App() {
  return (
    <main id="hero">
      <Popup />
      <FloatingWhatsApp />
      <Blob />
      <Navbar />
      <Hero />
      <LogoSlider />
      <About />
      <Services />
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
      <Footer />
    </main>
  );
}

export default App;
