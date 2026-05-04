import { useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import { siteConfig } from '../config';
import TopNavigation from '../components/TopNavigation';
import Hero from '../sections/Hero';
import AlbumCube from '../sections/AlbumCube';
import Education from '../sections/Education';
import Coworking from '../sections/Coworking';
import Club from '../sections/Club';
import InstituteSection from '../sections/InstituteSection';
import ParallaxGallery from '../sections/ParallaxGallery';
import Partners from '../sections/Partners';
import Startups from '../sections/Startups';
import Location from '../sections/Location';
import ContactForm from '../sections/ContactForm';
import Footer from '../sections/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Preloader from '../components/Preloader';

const LandingPage = () => {

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
    <main className="relative w-full min-h-screen bg-void-black">
      <Preloader />
      <TopNavigation />
      
      {/* Hero Section - Immersive landing */}
      <Hero />
      
      {/* Coworking Section - Intro + Content Overlay */}
      <div className="relative z-10">
        <AlbumCube index={1} zIndex={1} />
        <Coworking zIndex={2} />
      </div>

      {/* Parallax Gallery Section - "Nosso Espaço" */}
      <div id="parallax-gallery" className="relative z-20">
        <ParallaxGallery />
      </div>

      {/* Educação Section - Intro + Content Overlay */}
      <div className="relative z-30">
        <AlbumCube index={0} zIndex={1} />
        <Education zIndex={2} />
      </div>

      {/* Clube Section - Intro + Content Overlay */}
      <div className="relative z-40">
        <AlbumCube index={2} zIndex={1} />
        <Club zIndex={2} />
      </div>

      {/* Institute, Startups, and follow-up sections - Higher Z-Index to avoid overlap */}
      <div className="relative z-50 bg-void-black">
        {/* Institute Teaser Section */}
        <InstituteSection />

        {/* Startups Section */}
        <Startups />

        {/* Partners Section */}
        <Partners />

        {/* Location Section */}
        <Location />

        {/* Contact Form Section */}
        <ContactForm />

        {/* Footer Section */}
        <Footer />
      </div>

      {/* Floating Action Buttons */}
      <WhatsAppButton />
    </main>

  );
};

export default LandingPage;
