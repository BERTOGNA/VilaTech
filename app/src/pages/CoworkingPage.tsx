import { useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import { useLocation } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import CoworkingHero from '../sections/coworking-page/CoworkingHero';
import Diferentials from '../sections/coworking-page/Diferentials';
import Workspaces from '../sections/coworking-page/Workspaces';
import OnDemandSpaces from '../sections/coworking-page/OnDemandSpaces';
import VirtualOffice from '../sections/coworking-page/VirtualOffice';
import CafeAndCommunity from '../sections/coworking-page/CafeAndCommunity';
import CoworkingFAQ from '../sections/coworking-page/CoworkingFAQ';
import ParallaxGallery from '../sections/ParallaxGallery';
import ContactForm from '../sections/ContactForm';
import Footer from '../sections/Footer';

import SEO from '../components/SEO';

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
  }, [location.hash, location.pathname]); // Re-run if path changes (not hash)

  const coworkingJsonLd = {
    "@context": "https://schema.org",
    "@type": "CoworkingSpace",
    "name": "Vila Tech Hub - Coworking & Inovação",
    "image": "https://vilatechub.com.br/images/hero-bg.jpg",
    "@id": "https://vilatechub.com.br/coworking",
    "url": "https://vilatechub.com.br/coworking",
    "telephone": "+5511993710652",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Convenção, 440",
      "addressLocality": "Itu",
      "addressRegion": "SP",
      "postalCode": "13300-113",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.2641,
      "longitude": -47.2992
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/vilatechhub",
      "https://www.linkedin.com/company/vilatechhub"
    ]
  };

  const coworkingFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Onde fica localizado o Vila Tech Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Vila Tech Hub está localizado na Rua Francisco José Ferreira Sampaio, 90, CEP: 13303-536 no bairro Itu Novo Centro, em Itu - SP."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são os horários de funcionamento do coworking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para planos Hot Desk, o funcionamento é de segunda a sexta, das 9h às 18h. Membros com planos Fixed Desk e Salas Privativas possuem acesso 24 horas por dia, 7 dias por semana (24/7)."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa a diária de coworking (Hot Desk) no Vila Tech Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A diária de Hot Desk (posto flexível) custa R$ 60 e inclui internet de alta velocidade, café, água e acesso às áreas comuns."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são os planos mensais de coworking disponíveis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O plano Hot Desk Mensal (posto flexível) custa R$ 450/mês. O plano Fixed Desk (mesa fixa exclusiva com gaveteiro e acesso 24/7) custa R$ 650/mês."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona o serviço de Endereço Fiscal e Escritório Virtual?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Vila Tech Hub oferece duas opções: o Endereço Comercial por R$ 120/mês (para divulgação) e o plano Endereço Fiscal + Comercial por R$ 200/mês (para registro de CNPJ de prestadores de serviços e recebimento de correspondências)."
        }
      },
      {
        "@type": "Question",
        "name": "Posso alugar salas de reunião ou estúdio sob demanda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Oferecemos salas de reunião equipadas para até 8 pessoas por R$ 80/hora e um Estúdio de Podcast profissional por R$ 150/hora."
        }
      }
    ]
  };

  return (
    <div className="bg-void-black min-h-screen">
      <SEO
        title="Coworking em Itu | Salas Privativas, Comercial & Endereço Fiscal"
        description="Espaço de coworking de alto padrão em Itu, SP. Aluguel de salas de reunião, postos individuais de trabalho, escritório virtual e endereço fiscal. Agende sua visita!"
      />
      <script type="application/ld+json">
        {JSON.stringify(coworkingJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(coworkingFaqJsonLd)}
      </script>
      <TopNavigation variant="coworking" />

      <main>
        <CoworkingHero />

        <Diferentials />
        <Workspaces />
        <OnDemandSpaces />
        <VirtualOffice />
        <CafeAndCommunity />

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
