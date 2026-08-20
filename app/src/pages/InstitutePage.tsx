import { useEffect, useState, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MapPin, Target, Zap, Send, Check, User, Mail, Phone, MessageSquare, X, ChevronLeft, ChevronRight, ChevronUp, Palette, BookOpen, Leaf, Building2 } from 'lucide-react';
import { contactFormConfig } from '../config';
import api from '../services/api';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

import TopNavigation from '../components/TopNavigation';
import SEO from '../components/SEO';

export default function InstitutePage() {

  const heroBgRef = useRef<HTMLDivElement>(null);

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // CRM Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // Arte carousel (Embla)
  const [arteEmblaRef, arteEmblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [arteCanScrollPrev, setArteCanScrollPrev] = useState(false);
  const [arteCanScrollNext, setArteCanScrollNext] = useState(true);
  const [arteIsHovered, setArteIsHovered] = useState(false);

  const onArteSelect = useCallback((api: any) => {
    setArteCanScrollPrev(api.canScrollPrev());
    setArteCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!arteEmblaApi) return;
    onArteSelect(arteEmblaApi);
    arteEmblaApi.on('select', onArteSelect);
    arteEmblaApi.on('reInit', onArteSelect);
    return () => {
      arteEmblaApi.off('select', onArteSelect);
      arteEmblaApi.off('reInit', onArteSelect);
    };
  }, [arteEmblaApi, onArteSelect]);

  const arteScrollPrev = useCallback(() => arteEmblaApi && arteEmblaApi.scrollPrev(), [arteEmblaApi]);
  const arteScrollNext = useCallback(() => arteEmblaApi && arteEmblaApi.scrollNext(), [arteEmblaApi]);

  // Educação carousel (Embla)
  const [eduEmblaRef, eduEmblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [eduCanScrollPrev, setEduCanScrollPrev] = useState(false);
  const [eduCanScrollNext, setEduCanScrollNext] = useState(true);
  const [eduIsHovered, setEduIsHovered] = useState(false);

  const onEduSelect = useCallback((api: any) => {
    setEduCanScrollPrev(api.canScrollPrev());
    setEduCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!eduEmblaApi) return;
    onEduSelect(eduEmblaApi);
    eduEmblaApi.on('select', onEduSelect);
    eduEmblaApi.on('reInit', onEduSelect);
    return () => {
      eduEmblaApi.off('select', onEduSelect);
      eduEmblaApi.off('reInit', onEduSelect);
    };
  }, [eduEmblaApi, onEduSelect]);

  const eduScrollPrev = useCallback(() => eduEmblaApi && eduEmblaApi.scrollPrev(), [eduEmblaApi]);
  const eduScrollNext = useCallback(() => eduEmblaApi && eduEmblaApi.scrollNext(), [eduEmblaApi]);

  // Bioeconomia carousel (Embla)
  const [bioEmblaRef, bioEmblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [bioCanScrollPrev, setBioCanScrollPrev] = useState(false);
  const [bioCanScrollNext, setBioCanScrollNext] = useState(true);
  const [bioIsHovered, setBioIsHovered] = useState(false);
  const bioImages = [
    { src: '/images/bioeconomia/1691111481966.jpeg', alt: 'Projeto Bioeconomia 1' },
    { src: '/images/bioeconomia/WhatsApp Image 2023-08-03 at 8.15.31 PM.jpeg', alt: 'Projeto Bioeconomia 2' },
    { src: '/images/bioeconomia/WhatsApp Image 2023-08-03 at 8.20.05 PM.jpeg', alt: 'Projeto Bioeconomia 3' },
    { src: '/images/bioeconomia/WhatsApp Image 2023-08-17 at 2.22.54 PM.jpeg', alt: 'Projeto Bioeconomia 4' },
  ];

  const onBioSelect = useCallback((api: any) => {
    setBioCanScrollPrev(api.canScrollPrev());
    setBioCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!bioEmblaApi) return;
    onBioSelect(bioEmblaApi);
    bioEmblaApi.on('select', onBioSelect);
    bioEmblaApi.on('reInit', onBioSelect);
    return () => {
      bioEmblaApi.off('select', onBioSelect);
      bioEmblaApi.off('reInit', onBioSelect);
    };
  }, [bioEmblaApi, onBioSelect]);

  const bioScrollPrev = useCallback(() => bioEmblaApi && bioEmblaApi.scrollPrev(), [bioEmblaApi]);
  const bioScrollNext = useCallback(() => bioEmblaApi && bioEmblaApi.scrollNext(), [bioEmblaApi]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        form_id: 'contact_form_institute',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.interests.length > 0 ? formData.interests[0] : 'geral',
        extra_fields: {
          all_interests: formData.interests,
          message: formData.message
        },
        source_url: window.location.href,
      };

      await api.post('/leads', payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Houve um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    const wordBlocks = document.querySelectorAll('.word-stagger');
    wordBlocks.forEach((block) => {
      const words = block.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: '120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          }
        }
      );
    });

    gsap.fromTo('.conselho-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#conselho',
          start: 'top 75%',
        }
      }
    );

    // Hero Parallax
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    gsap.fromTo('.valor-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#valores',
          start: 'top 75%',
        }
      }
    );
  }, []);

  const diretoriaMembers = [
    { name: "ACHILLES MILAN", role: "DIRETOR EXECUTIVO", img: "/images/diretoria/Achilles_2_PB.png" },
    { name: "LUCILLA ALMEIDA", role: "DIRETORA DE EVENTOS", img: "/images/diretoria/Lucilla_PB.png" },
    { name: "PAULO SESSO", role: "TESOUREIRO", img: "/images/diretoria/Paulo1_PB.jpg" },
    { name: "PINA", role: "DIRETOR FINANCEIRO", img: "/images/diretoria/Pina_trat.jpg" }
  ];

  const consultivoMembers = [
    { name: "BRUNO BERTOGNA", role: "Diretor de Animação e Tecnologia Criativa | Cofundador da Maranha Filmes", img: "/images/conselho/Conselho Consultivo/Bruno_Bertogna.jpeg" },
    { name: "GABRIEL SANTANA", role: "Gerente de Operações e Contas | Conselheiro", img: "/images/conselho/Conselho Consultivo/Gabriel_Santana.jpeg" },
    { name: "GUILHERME OLLER", role: "Head de Produção Produtor Executivo Criativo", img: "/images/conselho/Conselho Consultivo/Gui Oller.jpeg" },
    { name: "MARCELO ZAMPINI", role: "Chief Creative Officer @ MADCC.CO Cannes Lions Winner", img: "/images/conselho/Conselho Consultivo/Marcelo_zampini.jpeg" },
    { name: "WALMIR SCARAVELLI", role: "Empreendedor | Fala de Inovação | Tecnologia | Statup | EduTech", img: "/images/conselho/Conselho Consultivo/Walmir_scaravelli.jpeg" },
    { name: "CARLOS TABOSA", role: "Inteligência Artificial |Transformação Digital | Blockchain | Opah IT", img: "/images/conselho/Conselho Consultivo/carlos_tabosa.jpeg" }
  ];

  const educacionalMembers = [
    { name: "ALÊ SIREGA", role: "Especialista em Drones DJI desde 2011 | Diretor da Bee Drones ", img: "/images/conselho/Conselho Educacional/Alê_Sirega.jpg" },
    { name: "CARLA BERTONCELO", role: "Estratégia Tributária, Compliance e Governança Fiscal e Contábil", img: "/images/conselho/Conselho Educacional/Carla_Bertoncelo.jpeg" },
    { name: "DINO PAIVA", role: "Mídia, Marketing e Entretenimento", img: "/images/conselho/Conselho Educacional/Dino_Paiva.jpg" },
    { name: "GILBERTO MOURA", role: "Consultoria Empresarial: Planejamento Estratégico", img: "/images/conselho/Conselho Educacional/Gilberto_Moura.png" },
    { name: "FELIPE SCALET", role: "Advogado | Direito Bancário, Compliance e Inteligência Artificial", img: "/images/conselho/Conselho Educacional/felipe_Scalet.png" }
  ];



  return (
    <div className="min-h-screen bg-white text-[#1d1d1b] font-sans selection:bg-brand-teal selection:text-white overflow-hidden">
      <SEO
        title="Instituto Vila Tech | Inovação, Tecnologia & Educação em Itu, SP"
        description="O Instituto Cultural e Educacional Vila Tech une inovação tecnológica, arte e desenvolvimento social em Itu, SP. Conheça nossos projetos sociais e de profissionalização."
      />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .hover-3d:hover img {
          transform: scale(1.1) rotateX(8deg) rotateY(-8deg);
        }
        .embla { overflow: hidden; }
        .embla__container { display: flex; }
        .embla__slide { flex: 0 0 100%; min-width: 0; }
      `}</style>
      <TopNavigation variant="institute" />

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroBgRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('/images/instituto/ecossistema.webp')]"
          aria-hidden="true"
        ></div>
        {/* Dark Overlay gradient (darker on left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="container mx-auto max-w-7xl relative z-10 px-6 pt-40 pb-24 md:pt-52 md:pb-28">
          <div className="max-w-3xl fade-up">
            <div className="mb-8">
              <img src="/images/instituto/Logos_IVT_branco.png" alt="Instituto Vila Tech Logo" className="h-28 w-auto" />
            </div>

            <h1
              className="text-white mb-8"
              style={{
                letterSpacing: '-.075em',
                maxWidth: '780px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(42px, 7vw, 88px)',
                fontWeight: 800,
                lineHeight: 0.96
              }}
            >
              Novas metodologias.<br />
              <span className="text-brand-teal">Novas habilidades.</span><br />
              Novos futuros.
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-inter max-w-2xl mb-12 leading-relaxed font-light">
              Educação, tecnologia, criatividade e cultura para colocar pessoas e territórios em movimento.
            </p>
          </div>
        </div>
      </section>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-8 bg-brand-teal text-white p-3 rounded-full shadow-lg hover:bg-brand-teal/80 transition-all duration-300 z-[9998]"
        aria-label="Voltar ao topo"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* O Que Nos Move */}
      <section id="proposito" className="py-20 px-6 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 fade-up">
              <span className="text-brand-purple font-inter font-bold tracking-widest uppercase text-sm mb-4 block">
                O que nos move
              </span>
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1d1d1b] mb-6"
                style={{
                  letterSpacing: '-.075em',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  lineHeight: 0.96
                }}
              >
                Quando conhecimento encontra propósito, <br /><span className="text-brand-teal">o futuro ganha raiz.</span>
              </h2>
            </div>
            <div className="w-full lg:w-1/2 fade-up" style={{ transitionDelay: '100ms' }}>
              <div className="space-y-6 text-lg text-gray-600 font-inter font-light leading-relaxed">
                <p>
                  O Instituto Cultural e Educacional Vila Tech desenvolve e executa projetos que ampliam o acesso à educação, à tecnologia, à arte, à cultura, ao esporte, ao lazer e à sustentabilidade.
                </p>
                <p>
                  Em Itu e região, criamos programas acessíveis para transformar curiosidade em habilidade, habilidade em oportunidade e oportunidade em impacto positivo.
                </p>
                <a href="#atuacao" className="inline-flex items-center gap-2 mt-4 text-void-black font-semibold hover:text-brand-teal transition-colors">
                  Veja como fazemos acontecer <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 px-6 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white p-10 shadow-sm fade-up flex flex-col group hover:shadow-xl transition-all duration-300" style={{ borderLeft: '12px solid #3fbdd8' }}>
              <div className="mb-6">
                <span className="font-inter font-bold tracking-widest uppercase text-sm" style={{ color: '#3fbdd8' }}>Nossa Missão</span>
              </div>
              <p className="text-xl font-medium font-inter text-void-black leading-relaxed flex-grow">
                Promover inclusão digital e inserção no mercado de trabalho por meio de experiências que conectam educação, criatividade, tecnologia, arte e cultura.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white p-10 shadow-sm fade-up flex flex-col group hover:shadow-xl transition-all duration-300" style={{ borderLeft: '12px solid #e83a79', transitionDelay: '150ms' }}>
              <div className="mb-6">
                <span className="font-inter font-bold tracking-widest uppercase text-sm" style={{ color: '#e83a79' }}>Nossa Visão</span>
              </div>
              <p className="text-gray-600 text-lg font-inter leading-relaxed flex-grow">
                Ser referência nacional em educação tecnológica e criativa, transformando o Instituto em um dos principais polos de inovação e desenvolvimento sustentável do interior paulista.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white p-10 shadow-sm fade-up flex flex-col group hover:shadow-xl transition-all duration-300" style={{ borderLeft: '12px solid #864896', transitionDelay: '300ms' }}>
              <div className="mb-6">
                <span className="font-inter font-bold tracking-widest uppercase text-sm" style={{ color: '#864896' }}>Nossos Valores</span>
              </div>
              <p className="text-gray-600 text-lg font-inter leading-relaxed flex-grow">
                Inovação com propósito, educação transformadora, sustentabilidade, respeito à diversidade, colaboração em rede e compromisso ético.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* As Frentes (Pilares) */}
      <section id="frentes" className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-up">
            <div>
              <p className="text-brand-orange font-inter text-sm font-bold tracking-widest uppercase mb-2">Pilares</p>
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-[#1d1d1b]"
                style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
              >
                Nossos Pilares
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Comunidade */}
            <div className="p-8 rounded-[2rem] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl fade-up" style={{ backgroundColor: '#3fbdd8' }}>
              <span className="text-white/60 font-outfit font-bold text-xl mb-4">01</span>
              <h3 className="text-2xl font-bold font-outfit text-white mb-4">Comunidade</h3>
              <p className="text-white/85 font-inter mb-6 flex-grow">Um lugar para as ideias encontrarem espaço. O Vila Tech Hub conecta pessoas, projetos e oportunidades em um ambiente de colaboração.</p>
              <a href="#comunidade" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:gap-3 transition-all">Explorar <ChevronRight className="w-4 h-4" /></a>
            </div>

            {/* Sustentabilidade */}
            <div className="p-8 rounded-[2rem] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl fade-up" style={{ backgroundColor: '#c8d400', transitionDelay: '100ms' }}>
              <span className="text-white/60 font-outfit font-bold text-xl mb-4">02</span>
              <h3 className="text-2xl font-bold font-outfit text-white mb-4">Sustentabilidade</h3>
              <p className="text-white/85 font-inter mb-6 flex-grow">Território, natureza e futuro na mesma conversa. Promovemos debates e iniciativas para transformar recursos em desenvolvimento sustentável.</p>
              <a href="#sustentabilidade" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:gap-3 transition-all">Explorar <ChevronRight className="w-4 h-4" /></a>
            </div>

            {/* Educação */}
            <div className="p-8 rounded-[2rem] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl fade-up" style={{ backgroundColor: '#e83a79', transitionDelay: '200ms' }}>
              <span className="text-white/60 font-outfit font-bold text-xl mb-4">03</span>
              <h3 className="text-2xl font-bold font-outfit text-white mb-4">Educação</h3>
              <p className="text-white/85 font-inter mb-6 flex-grow">Novas linguagens para traduzir o mundo. O Programa Tecnologia em Educação capacita jovens e profissionais para o amanhã.</p>
              <a href="#educacao" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:gap-3 transition-all">Explorar <ChevronRight className="w-4 h-4" /></a>
            </div>

            {/* Cultura */}
            <div className="p-8 rounded-[2rem] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl fade-up" style={{ backgroundColor: '#864896', transitionDelay: '300ms' }}>
              <span className="text-white/60 font-outfit font-bold text-xl mb-4">04</span>
              <h3 className="text-2xl font-bold font-outfit text-white mb-4">Cultura</h3>
              <p className="text-white/85 font-inter mb-6 flex-grow">A arte que nos dá forma e contorno. Com exposições itinerantes e intervenções urbanas, democratizamos o acesso à arte e à cultura.</p>
              <a href="#cultura" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:gap-3 transition-all">Explorar <ChevronRight className="w-4 h-4" /></a>
            </div>

          </div>
        </div>
      </section>

      {/* Projetos Detalhados (Intro) */}
      <section id="projetos" className="pt-20 pb-6 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end fade-up">
            <div>
              <p className="text-brand-orange font-inter text-sm font-bold tracking-widest uppercase mb-2">Nosso Impacto</p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase text-[#1d1d1b]"
                style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
              >
                Projetos
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidade */}
      <section id="comunidade" className="pt-12 pb-20 px-6 text-white" style={{ backgroundColor: '#3fbdd8' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12 items-center fade-up">
            {/* Image left */}
            <div className="md:w-1/2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 relative shadow-2xl">
                <img src="/public/images/imgs_coworking/Recepção Vila Tech Hub.png" alt="Comunidade" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Text right */}
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
                <Building2 className="w-4 h-4" /> Comunidade
              </div>
              <h3
                className="text-4xl md:text-5xl font-black uppercase mb-4"
                style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
              >
                Vila Tech Hub
              </h3>
              <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                Um ecossistema completo de inovação, coworking e aprendizado no coração de Itu. Onde empreendedores, criativos e estudantes se encontram.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bioeconomia (Sustentabilidade) */}
      <section id="bioeconomia" className="py-20 px-6 text-white" style={{ backgroundColor: '#c8d400' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12 items-center fade-up">
            <div className="md:w-1/2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 relative shadow-2xl"
                onMouseEnter={() => setBioIsHovered(true)}
                onMouseLeave={() => setBioIsHovered(false)}>
                <div className="embla h-full" ref={bioEmblaRef}>
                  <div className="embla__container flex h-full">
                    {bioImages.map((img, idx) => (
                      <div key={idx} className="embla__slide flex-[0_0_100%] relative group h-full">
                        <img src={img.src} alt={img.alt}
                          loading={idx === 0 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 pointer-events-none">
                          <p className="text-white font-outfit font-semibold text-base uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-400 ${bioIsHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <button onClick={bioScrollPrev} disabled={!bioCanScrollPrev}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-green-600 transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Imagem anterior">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={bioScrollNext} disabled={!bioCanScrollNext}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-green-600 transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Próxima imagem">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
                <Leaf className="w-4 h-4" /> Sustentabilidade
              </div>
              <h3
                className="text-4xl md:text-5xl font-black uppercase mb-6"
                style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
              >
                Projeto em Inovação em Bioeconomia
              </h3>
              <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                O Projeto "Plano Municipal de Bioeconomia" de Vila Tech, desenvolvido em parceria com a prefeitura e institutos de pesquisa, definiu 12 linhas estratégicas para promover a transição verde da região.
              </p>
              <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                Foram implementadas iniciativas piloto como a produção de biocombustíveis a partir de resíduos agrícolas, um hub de inovação para startups de bioeconomia e capacitação de agricultores em práticas de agricultura regenerativa.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 fade-up">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+200</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Projetos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+5k</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Participantes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+300</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Workshops</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educação em Tecnologia */}
      <section id="educacao" className="py-20 px-6 text-white" style={{ backgroundColor: '#e83a79' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center fade-up">
            <div className="md:w-1/2">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 relative shadow-2xl"
                onMouseEnter={() => setEduIsHovered(true)}
                onMouseLeave={() => setEduIsHovered(false)}
              >
                <div className="embla h-full" ref={eduEmblaRef}>
                  <div className="embla__container flex h-full">
                    {[
                      { src: '/images/educacao/educacao1.webp', alt: 'Vila Tech Hub - Espaço Educacional' },
                      { src: '/images/educacao/educacao2.webp', alt: 'Cursos de Formação em Tecnologia' },
                      { src: '/images/educacao/educacao3.webp', alt: 'Projeto Vila Tech Hub' },
                      { src: '/images/educacao/educacao4.webp', alt: 'Capacitação e Inovação' },
                    ].map((img, idx) => (
                      <div key={idx} className="embla__slide flex-[0_0_100%] relative group h-full">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading={idx === 0 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 pointer-events-none">
                          <p className="text-white font-outfit font-semibold text-base uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {img.alt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-400 ${eduIsHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <button onClick={eduScrollPrev} disabled={!eduCanScrollPrev} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none" aria-label="Imagem anterior">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={eduScrollNext} disabled={!eduCanScrollNext} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none" aria-label="Próxima imagem">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
                <BookOpen className="w-4 h-4" /> Educação
              </div>
              <h3
                className="text-4xl md:text-5xl font-black uppercase mb-4"
                style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
              >
                Plataforma Educacional
              </h3>

              <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                Nossa plataforma transforma conhecimento tecnológico em potência humana. Com foco em empregabilidade e aplicação imediata, estruturamos nossa metodologia em três pilares fundamentais:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold font-inter">Corporativo & IA</h5>
                    <p className="text-sm text-white/80 font-inter">Tecnologia e Inteligência Artificial aplicadas para otimização de processos e escalabilidade empresarial.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold font-inter">Inovação Criativa</h5>
                    <p className="text-sm text-white/80 font-inter">Audiovisual, criatividade e produção potencializadas por ferramentas digitais e IA Generativa.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold font-inter">Game Development</h5>
                    <p className="text-sm text-white/80 font-inter">Transformando a paixão pelos jogos em carreira. Formação completa em arte, programação, Unreal Engine e design de interfaces para jovens criativos.</p>
                  </div>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                <h5 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Impacto Social</h5>
                <p className="text-sm text-white/90 font-inter font-light">
                  Compromisso com a inclusão digital: oferecemos cotas, bolsas e formação gratuita subvencionada pelo Instituto para alunos de escolas públicas e comunidades de baixa renda.
                </p>
              </div>
            </div>
          </div>

          {/* Métricas Educação */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 fade-up">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+150</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Participantes dos cursos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+500</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Participantes de eventos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
              <p className="text-3xl font-outfit font-bold text-white mb-2">+900</p>
              <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Pessoas impactadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arte e Cultura */}
      <section id="cultura" className="py-20 px-6 text-white" style={{ backgroundColor: '#864896' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 fade-up">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div
                  className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 relative shadow-2xl"
                  onMouseEnter={() => setArteIsHovered(true)}
                  onMouseLeave={() => setArteIsHovered(false)}
                >
                  <div className="embla h-full" ref={arteEmblaRef}>
                    <div className="embla__container flex h-full">
                      {[
                        { src: '/images/arte/Expo3.png', alt: 'A Casa Galeria - Arte em Movimento' },
                        { src: '/images/arte/Expo1.png', alt: 'Exposições Itinerantes' },
                        { src: '/images/arte/IMG_5126.jpg', alt: 'Obras Contemporâneas' },
                        { src: '/images/arte/IMG_5144.jpg', alt: 'Interação e População' },
                        { src: '/images/arte/IMG_5145.jpg', alt: 'Arte na Comunidade' },
                        { src: '/images/arte/IMG_5159.jpg', alt: 'Grafite Colaborativo' },
                      ].map((img, idx) => (
                        <div key={idx} className="embla__slide flex-[0_0_100%] relative group h-full">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5 pointer-events-none">
                            <p className="text-white font-outfit font-semibold text-base uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              {img.alt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-400 ${arteIsHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={arteScrollPrev} disabled={!arteCanScrollPrev} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-purple transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none" aria-label="Imagem anterior">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={arteScrollNext} disabled={!arteCanScrollNext} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-purple transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none" aria-label="Próxima imagem">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
                  <Palette className="w-4 h-4" /> Cultura
                </div>
                <h3
                  className="text-4xl md:text-5xl font-black uppercase mb-6"
                  style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
                >
                  Projeto Arte em Movimento
                </h3>
                <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                  Com um acervo de mais de 180 obras da <strong className="text-white font-medium">A Casa Galeria</strong>, nosso projeto itinerante democratiza o acesso à arte. Levamos exposições completas para bairros periféricos de Itu, como Pirapitingui e Pedregulho.
                </p>
                <p className="text-lg text-white/90 font-inter font-light leading-relaxed mb-6">
                  Apresentamos o contraste entre os clássicos ituanos, como Almeida Junior e Frei Jesuino, e os expoentes contemporâneos. Através de palestras e oficinas, como a conduzida pelo artista Guilherme Kramer que resultou num imenso grafite colaborativo, transformamos espaços comunitários em verdadeiros polos criativos.
                </p>
              </div>
            </div>
            {/* Métricas Arte */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl font-outfit font-bold text-white mb-2">+120</p>
                <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Participantes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl font-outfit font-bold text-white mb-2">9.3k</p>
                <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Pessoas Alcançadas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl font-outfit font-bold text-white mb-2">327</p>
                <p className="text-xs text-white/80 font-inter uppercase tracking-wider font-bold">Interações Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Liderança: Diretoria e Conselhos */}
      <section id="conselho" className="py-24 md:py-32 px-6 bg-[#1d1d1b] border-t border-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 fade-up">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white"
              style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
            >
              TIME
            </h2>
            <p className="text-white/60 text-sm max-w-xs text-right mt-6 md:mt-0 font-light">
              Conheça os líderes e conselheiros que guiam o Vila Tech rumo ao futuro da inovação social.
            </p>
          </div>

          {/* Diretoria */}
          <div className="mb-20">
            <h3
              className="text-3xl md:text-4xl font-bold text-brand-teal uppercase mb-10 text-center fade-up"
              style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
            >
              Diretoria
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              {diretoriaMembers.map((person, i) => (
                <div key={`dir-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 w-40 md:w-48">
                  <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 overflow-hidden relative border border-gray-200 group-hover:border-brand-teal/50 transition-colors shadow-md group-hover:shadow-xl">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=e2e8f0&color=5dbeb5&size=512` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors uppercase tracking-wide">{person.name}</h3>
                  <p className="text-xs font-bold tracking-widest text-brand-teal uppercase mt-1">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conselho Consultivo */}
          <div className="mb-20">
            <h3
              className="text-3xl md:text-4xl font-bold text-brand-orange uppercase mb-10 text-center fade-up"
              style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
            >
              Conselho Consultivo
            </h3>
            <div className="flex justify-center items-start gap-3 sm:gap-4 md:gap-6 w-full overflow-x-auto md:overflow-visible pb-4">
              {consultivoMembers.map((person, i) => (
                <div key={`consul-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 flex-1 min-w-[120px] max-w-[192px]">
                  <div className="aspect-[3/4] bg-white/5 rounded-2xl mb-4 overflow-hidden relative border border-white/10 group-hover:border-brand-orange/50 transition-colors shadow-md group-hover:shadow-xl">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=1d1d1b&color=ef7d00&size=512` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-base lg:text-lg text-white group-hover:text-brand-orange transition-colors uppercase tracking-wide break-words leading-tight">{person.name}</h3>
                  <p className="text-[10px] md:text-xs font-bold tracking-widest text-brand-orange uppercase mt-2 leading-tight">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conselho Educacional */}
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold text-brand-purple uppercase mb-10 text-center fade-up"
              style={{ letterSpacing: '-.075em', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, lineHeight: 0.96 }}
            >
              Conselho Educacional
            </h3>
            <div className="flex flex-wrap justify-center gap-12">
              {educacionalMembers.map((person, i) => (
                <div key={`edu-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 w-40 md:w-48">
                  <div className="aspect-[3/4] bg-white/5 rounded-2xl mb-6 overflow-hidden relative border border-white/10 group-hover:border-brand-purple/50 transition-colors shadow-md group-hover:shadow-xl">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=1d1d1b&color=864896&size=512` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white group-hover:text-brand-purple transition-colors uppercase tracking-wide">{person.name}</h3>
                  <p className="text-xs font-bold tracking-widest text-brand-purple uppercase mt-1">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Contato & Ajude a Construir */}
      <section id="contato" className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">

            {/* CRM Form */}
            <div className="fade-up order-2 md:order-1">
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1d1d1b] mb-10">Entre em Contato</h2>

              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-brand-teal" />
                    </div>
                    <h3 className="font-display text-xl text-[#1d1d1b] mb-2">Mensagem enviada!</h3>
                    <p className="text-gray-500 text-sm">Em breve entraremos em contato com você.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6 mb-6">
                      {/* Name */}
                      <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.nameLabel}</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#1d1d1b] placeholder-gray-400 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                            placeholder="Seu nome"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.emailLabel}</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#1d1d1b] placeholder-gray-400 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.phoneLabel}</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#1d1d1b] placeholder-gray-400 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                            placeholder="(11) 00000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mb-6">
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-3 font-bold">{contactFormConfig.interestLabel}</label>
                      <div className="flex flex-wrap gap-2">
                        {contactFormConfig.interests.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestChange(interest)}
                            className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${formData.interests.includes(interest)
                              ? 'bg-brand-teal text-white'
                              : 'bg-gray-100 text-gray-500 border border-gray-200 hover:border-brand-teal/50'
                              }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.messageLabel}</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#1d1d1b] placeholder-gray-400 focus:border-brand-teal focus:outline-none transition-colors resize-none text-sm"
                          placeholder="Conte-nos mais..."
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-display text-xs uppercase tracking-widest rounded-xl hover:bg-[#1d1d1b] transition-colors duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {contactFormConfig.submitText}
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* Donation Card */}
            <div className="bg-brand-teal group p-10 md:p-16 flex flex-col justify-center fade-up relative overflow-hidden rounded-2xl md:order-2 order-1 shadow-2xl shadow-brand-teal/10 border border-brand-teal/50">
              <div className="absolute inset-0 bg-[url('/images/Arvore1.png')] bg-cover bg-center opacity-30 scale-100 group-hover:scale-[1.05] transition-transform duration-1000 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#023B33]/80 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#023B33] mb-6 leading-[0.85]">
                  Ajude a<br />Construir<br />O Amanhã
                </h2>
                <p className="text-[#023B33]/90 font-medium mb-10 max-w-sm text-lg leading-snug">
                  Sua doação impulsiona bolsas de estudo, equipamentos e infraestrutura para talentos em vulnerabilidade social.
                </p>
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#023B33] text-white font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors rounded-sm"
                >
                  Fazer Doação
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="fade-up">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#1d1d1b] mb-16">Localização</h2>

              <div className="mb-10">
                <p className="text-brand-teal text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Endereço
                </p>
                <p className="text-gray-700 text-xl font-light leading-relaxed">
                  R. Francisco José Ferreira Sampaio, 90<br />
                  Itu, SP - 13303-536
                </p>
              </div>

              <div>
                <p className="text-brand-teal text-xs font-bold tracking-widest uppercase mb-3">Horário</p>
                <p className="text-gray-700 text-xl font-light leading-relaxed">
                  Segunda a Sexta<br />
                  09:00 - 18:00
                </p>
              </div>
            </div>

            <div className="fade-up rounded-3xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.639727409419!2d-47.30058912384918!3d-23.32882205310384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf50a0f3eb3463%3A0xc6cb5a329dbe06af!2sR.%20Francisco%20Jos%C3%A9%20Ferreira%20Sampaio%2C%2090%20-%20Itu%20Novo%20Centro%2C%20Itu%20-%20SP%2C%2013303-536!5e0!3m2!1spt-BR!2sbr!4v1709848247900!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Localização do Instituto Vila Tech"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Donation Modal */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white border border-gray-200 text-[#1d1d1b] shadow-2xl">
            <button
              onClick={() => setIsDonationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1d1d1b] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-display text-2xl font-bold uppercase text-brand-teal mb-4">Apoie o Instituto</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              O Instituto Cultural e Educacional Vila Tech é uma associação sem fins lucrativos. Sua doação apoia bolsas de estudos, infraestrutura e inclusão digital de jovens em Itu, SP.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6">
              <p className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-2">Chave Pix (CNPJ)</p>
              <p className="text-lg font-mono font-bold select-all bg-white p-2.5 rounded border border-gray-200 text-center text-[#1d1d1b]">
                58.473.428/0001-31
              </p>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Razão Social: Instituto Cultural e Educacional Vila Tech
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("58.473.428/0001-31");
                  alert("Chave Pix CNPJ copiada com sucesso!");
                }}
                className="flex-1 py-3 rounded-xl bg-brand-teal text-white font-bold uppercase tracking-wider text-xs hover:bg-[#1d1d1b] transition-colors">
                Copiar Chave Pix
              </button>
              <a
                href="#contato"
                onClick={() => {
                  setIsDonationModalOpen(false);
                  setFormData(prev => ({ ...prev, interests: ['Investidor/Parceiro'] }));
                }}
                className="flex-grow flex items-center justify-center py-3 rounded-xl border border-gray-200 text-center text-[#1d1d1b] font-bold uppercase tracking-wider text-xs hover:bg-gray-50 transition-colors"
              >
                Outros Apoios
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
