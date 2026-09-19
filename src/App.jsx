import { Outlet } from 'react-router-dom';
import './App.css';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import Blob from './ui/Blob';

function App() {
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
    </>
  );
}

export default App;
