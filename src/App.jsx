import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Blob from "./ui/Blob";
import Hero from "./components/Hero";
import About from "./components/About";
import Heading from "./ui/Heading";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Framer from "./components/Framer";

function App() {
  return (
    <main id="hero">
      <Blob />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
