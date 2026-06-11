import { Outlet } from 'react-router-dom';
import './App.css';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import Blob from './ui/Blob';

function App() {
  return (
    <main id='hero'>
      <Popup />
      <FloatingWhatsApp />
      <Blob />
      <Navbar />

      <Outlet />

      <Footer />
    </main>
  );
}

export default App;
