import { useEffect } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import AlbumCube from './sections/AlbumCube';
import ParallaxGallery from './sections/ParallaxGallery';
import TourSchedule from './sections/TourSchedule';
import Education from './sections/Education';
import Coworking from './sections/Coworking';
import Club from './sections/Club';
import Partners from './sections/Partners';
import Location from './sections/Location';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      {/* Hero Section - Immersive landing */}
      <Hero />

      {/* Album Cube Section - 3D showcase of three pillars */}
      <AlbumCube />

      {/* Education Section */}
      <Education />

      {/* Coworking Section */}
      <Coworking />

      {/* Club Section */}
      <Club />

      {/* Parallax Gallery Section */}
      <ParallaxGallery />

      {/* Tour Schedule Section - Startups */}
      <TourSchedule />

      {/* Partners Section */}
      <Partners />

      {/* Location Section */}
      <Location />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
