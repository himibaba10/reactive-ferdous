import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import CookieConsent from './components/CookieConsent';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import Blob from './ui/Blob';
import { initConversionTracking } from './utils/analytics';

function App() {
  useEffect(() => initConversionTracking(), []);

  return (
    <>
      <Popup />
      <FloatingWhatsApp />
      <Blob />
      <Navbar />

      <main id='hero'>
        <Outlet />
      </main>

      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
