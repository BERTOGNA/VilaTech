import { useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import { useLocation } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import CoworkingHero from '../sections/coworking-page/CoworkingHero';
import Diferentials from '../sections/coworking-page/Diferentials';
import Workspaces from '../sections/coworking-page/Workspaces';
import OnDemandSpaces from '../sections/coworking-page/OnDemandSpaces';
import VirtualOffice from '../sections/coworking-page/VirtualOffice';
import ClubCombos from '../sections/coworking-page/ClubCombos';
import VilaTechClub from '../sections/coworking-page/VilaTechClub';
import CafeAndCommunity from '../sections/coworking-page/CafeAndCommunity';
import InnovationPrograms from '../sections/coworking-page/InnovationPrograms';
import PricingTable from '../sections/coworking-page/PricingTable';
import CoworkingFAQ from '../sections/coworking-page/CoworkingFAQ';
import ParallaxGallery from '../sections/ParallaxGallery';
import ContactForm from '../sections/ContactForm';
import Footer from '../sections/Footer';

const CoworkingPage = () => {
  useLenis();
  const location = useLocation();

  useEffect(() => {
    // If there is a hash in the URL, scroll to it after a small delay to ensure components are rendered
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // 500ms delay to allow animations and layout to settle
    } else {
      // Otherwise scroll to top on mount
      window.scrollTo(0, 0);
    }
  }, [location.pathname]); // Re-run if path changes (not hash)

  return (
    <div className="bg-void-black min-h-screen">
      <TopNavigation variant="coworking" />
      
      <main>
        <CoworkingHero />
        
        <Diferentials />
        <Workspaces />
        <OnDemandSpaces />
        <VirtualOffice />
        <ClubCombos />
        <VilaTechClub />
        <CafeAndCommunity />
        <InnovationPrograms />
        <PricingTable />
        
        <div id="gallery">
          <ParallaxGallery />
        </div>
        
        <CoworkingFAQ />
        
        <div id="contact">
          <ContactForm zIndex={40} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoworkingPage;
