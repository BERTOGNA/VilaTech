import { useEffect, useState, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MapPin, Target, Zap, Send, Check, User, Mail, Phone, MessageSquare, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { contactFormConfig } from '../config';
import api from '../services/api';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

import TopNavigation from '../components/TopNavigation';
import SEO from '../components/SEO';
// import { instituteConfig } from '../config'; // removed unused import

export default function InstitutePage() {

  const heroBgRef = useRef<HTMLImageElement>(null);

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
        y: 200,
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

  // Values are sourced from instituteConfig.values (defined in config.ts)

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
  <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-brand-teal selection:text-white overflow-hidden">
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
      `}</style>
    <TopNavigation variant="institute" />

    {/* Hero Section */}
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden min-h-screen flex items-center bg-black">
      {/* Fundo removido para dar lugar à imagem na direita */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 fade-up">
          <img src="/images/instituto/Logos_IVT_branco.png" alt="Instituto Vila Tech" className="h-40 sm:h-48 md:h-64 lg:h-72 w-auto object-contain mb-6 opacity-100 drop-shadow-xl" />
          <div>
            <p className="text-lg md:text-2xl text-zinc-300 font-light max-w-2xl mb-4 leading-relaxed">
              <strong className="text-brand-orange uppercase tracking-wider text-sm block mb-2">Plataforma de Educação</strong>
              Novas metodologias, novas habilidades, novos futuros.
            </p>
            <p className="text-base md:text-lg text-zinc-400 font-light max-w-2xl mb-12 leading-relaxed">
              Transformação social e profissional por meio da educação, tecnologia e inovação criativa.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#contato" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-teal text-zinc-950 font-bold uppercase tracking-wider text-sm hover:bg-brand-teal/80 transition-colors shadow-lg shadow-brand-teal/20">
              Ser Parceiro
            </a>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-700 text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors"
            >
              Doar Agora
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 fade-up flex justify-center lg:justify-end">
          <img
            ref={heroBgRef}
            src="/images/instituto/menina_sorriso_1.png"
            alt="Estudante Vila Tech"
            className="w-full max-w-lg object-cover rounded-3xl shadow-2xl shadow-brand-teal/20"
          />
        </div>
      </div>
    </section>

    {/* Transparência e Natureza Jurídica */}
    <section className="py-16 px-6 bg-black border-t border-b border-zinc-800/50 relative overflow-hidden">
      {/* Fundo abstrato suave */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/5 to-transparent opacity-50 pointer-events-none"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-12 rounded-[2rem] bg-zinc-900 border border-brand-teal/20 shadow-2xl shadow-brand-teal/5 fade-up">
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl">
              <img
                src="/images/instituto/mulher_estudando.jpg"
                alt="Transparência e Educação"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>
          <div className="w-full md:w-7/12 md:pl-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
              <Target className="w-4 h-4" /> Natureza Jurídica
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              Instituto Cultural e Educacional <span className="text-brand-teal">Vila Tech</span>
            </h3>
            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-6">
              Fundado sob a forma de associação sem fins lucrativos, o Instituto atua de forma <strong className="text-white">inteiramente não-comercial</strong> na região de Itu/SP.
            </p>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Nosso propósito é exclusivamente dedicado à promoção de direitos sociais, fomento à inclusão digital, educação tecnológica gratuita e à preservação da rica cultura local.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Quem Somos - Compacto */}
    <section id="quem-somos" className="py-16 px-6 bg-black/60">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="bg-zinc-900/80 border-t-4 border-t-brand-teal border-x border-b border-zinc-800 p-8 rounded-2xl fade-up shadow-lg shadow-brand-teal/5">
            <h3 className="text-2xl font-display font-bold text-brand-teal uppercase mb-4 flex items-center gap-3">
              <Target className="w-6 h-6" /> Missão
            </h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              Ser referência nacional em educação
              tecnológica e criativa, reconhecida
              por formar profissionais preparados
              para os desafios do futuro e por inspirar
              um ecossistema sustentável de inovação,
              empreendedorismo e impacto social.
              Tornar-se um dos principais polos
              de cultura, educação e tecnologia do in
              terior paulista, através do Projeto Vila
              Tech Hub como plataforma
              de aprendizado contínuo e colaboração
              entre pessoas, empresas e instituições
            </p>
          </div>
          {/* Visão */}
          <div className="bg-zinc-900/80 border-t-4 border-t-brand-orange border-x border-b border-zinc-800 p-8 rounded-2xl fade-up shadow-lg shadow-brand-orange/5" style={{ transitionDelay: '100ms' }}>
            <h3 className="text-2xl font-display font-bold text-brand-orange uppercase mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6" /> Visão
            </h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              O Instituto Cultural e Educacional Vila Tech
              tem como objetivo promover
              a transformação social e profissional
              por meio da educação, tecnologia, arte
              e cultura, criando pontes entre
              o conhecimento técnico, a inovação
              criativa e o desenvolvimento humano
              e a democratização do acesso às novas
              tecnologias através de metodologias
              de aprendizado inovadoras, estimulando
              o protagonismo e a inclusão digital de
              jovens e comunidades.
            </p>
          </div>
          {/* Valores */}
          <div className="bg-zinc-900/80 border-t-4 border-t-zinc-300 border-x border-b border-zinc-800 p-8 rounded-2xl fade-up shadow-lg" style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-4 flex items-center gap-3">
              <Check className="w-6 h-6 text-zinc-300" /> Valores
            </h3>
            <ul className="text-zinc-300 font-light space-y-3 text-sm">
              <li><strong className="text-white block mb-1">Inovação com propósito:</strong> aplicar a tecnologia para melhorar vidas e promover impacto positivo.</li>
              <li><strong className="text-white block mb-1">Educação que transforma:</strong> estimular o pensamento crítico, a criatividade e o aprendizado colaborativo.</li>
              <li><strong className="text-white block mb-1">Inclusão e sustentabilidade:</strong> garantir acesso igualitário às oportunidades de formação e desenvolvimento.</li>
              <li><strong className="text-white block mb-1">Cultura e diversidade:</strong> valorizar as expressões artísticas e as múltiplas identidades como motor de evolução.</li>
              <li><strong className="text-white block mb-1">Ética e transparência:</strong> agir com responsabilidade social, integridade e respeito nas relações institucionais.</li>
              <li><strong className="text-white block mb-1">Colaboração:</strong> fomentar redes de conhecimento e empreendedorismo entre empresas, startups e indivíduos.</li>
              <li><strong className="text-white block mb-1">Excelência e protagonismo:</strong> formar agentes de mudança preparados para liderar a inovação no país.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>



    {/* Atuação */}
    <section id="atuacao" className="py-16 px-6 border-t border-zinc-800/50 bg-black/40">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-up">
          <div>
            <p className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-2">Nosso Impacto</p>
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Áreas de Atuação
            </h2>
          </div>
        </div>

        <div className="space-y-24">
          {/* Projetos de Arte e Cultura */}
          <div className="flex flex-col gap-12 fade-up">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                {/* Embla carousel with navigation arrows */}
                <div
                  className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 relative shadow-2xl"
                  onMouseEnter={() => setArteIsHovered(true)}
                  onMouseLeave={() => setArteIsHovered(false)}
                >
                  {/* Embla viewport */}
                  <div className="embla h-full" ref={arteEmblaRef}>
                    <div className="embla__container flex h-full">
                      {[
                        { src: '/images/arte/Expo3.png', alt: 'A Casa Galeria - Arte em Movimento' },
                        { src: '/images/arte/Expo1.png', alt: 'Exposições Itinerantes' },
                        { src: '/images/arte/IMG_5126.jpg', alt: 'Obras Contemporâneas' },
                        { src: '/images/arte/IMG_5144.jpg', alt: 'Interação e População' },
                        { src: '/images/arte/IMG_5145.jpg', alt: 'Grafite Colaborativo' },
                        { src: '/images/arte/IMG_5159.jpg', alt: 'Grafite Colaborativo' },
                      ].map((img, idx) => (
                        <div key={idx} className="embla__slide flex-[0_0_100%] relative group h-full">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Hover overlay with label */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5 pointer-events-none">
                            <p className="text-white font-display font-semibold text-base uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              {img.alt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation arrows — visible on hover */}
                  <div
                    className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-400 ${arteIsHovered ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <button
                      onClick={arteScrollPrev}
                      disabled={!arteCanScrollPrev}
                      className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-black transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={arteScrollNext}
                      disabled={!arteCanScrollNext}
                      className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-black transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
                  <Target className="w-4 h-4" /> Arte em Movimento
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-6">
                  Obras e Histórias nas <span className="text-brand-teal">Comunidades</span>
                </h3>
                <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6">
                  Com um acervo de mais de 180 obras da <strong className="text-white">A Casa Galeria</strong>, nosso projeto itinerante democratiza o acesso à arte. Levamos exposições completas para bairros periféricos de Itu, como Pirapitingui e Pedregulho.
                </p>
                <p className="text-base text-zinc-400 font-light leading-relaxed mb-6">
                  Apresentamos o contraste entre os clássicos ituanos, como Almeida Junior e Frei Jesuino, e os expoentes contemporâneos. Através de palestras e oficinas, como a conduzida pelo artista Guilherme Kramer que resultou num imenso grafite colaborativo, transformamos espaços comunitários em verdadeiros polos criativos.
                </p>
              </div>
            </div>

            {/* Métricas e Resultados do Projeto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
                <p className="text-3xl font-display font-black text-white mb-2">+120</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Participantes Locais</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
                <p className="text-3xl font-display font-black text-white mb-2">9.3k</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Pessoas Alcançadas</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
                <p className="text-3xl font-display font-black text-white mb-2">327</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Interações Online</p>
              </div>
            </div>
          </div>

          {/* Projetos Educacionais */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center fade-up">
            <div className="md:w-1/2">
              {/* Embla carousel with navigation arrows */}
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 relative"
                onMouseEnter={() => setEduIsHovered(true)}
                onMouseLeave={() => setEduIsHovered(false)}
              >
                {/* Embla viewport */}
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
                        {/* Hover overlay with label */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 pointer-events-none">
                          <p className="text-white font-display font-semibold text-base uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {img.alt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation arrows — visible on hover */}
                <div
                  className={`absolute inset-0 flex items-center justify-between px-3 pointer-events-none transition-opacity duration-400 ${eduIsHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                  <button
                    onClick={eduScrollPrev}
                    disabled={!eduCanScrollPrev}
                    className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-black transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={eduScrollNext}
                    disabled={!eduCanScrollNext}
                    className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-black transition-all duration-300 pointer-events-auto shadow-xl disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-display font-bold text-brand-teal uppercase mb-6">Educação em Tecnologia</h3>
              <h4 className="text-xl font-bold text-white mb-4">Projeto Vila Tech Hub - Plataforma Educacional</h4>
              <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6">
                Nossa plataforma de educação transforma conhecimento tecnológico em potência humana. Com foco em empregabilidade e aplicação imediata, estruturamos nossa metodologia em três pilares fundamentais:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal flex-shrink-0 mt-1">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Corporativo & IA</h5>
                    <p className="text-sm text-zinc-400">Tecnologia e Inteligência Artificial aplicadas para otimização de processos e escalabilidade empresarial.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Inovação Criativa</h5>
                    <p className="text-sm text-zinc-400">Audiovisual, criatividade e produção potencializadas por ferramentas digitais e IA Generativa.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Game Development</h5>
                    <p className="text-sm text-zinc-400">Transformando a paixão pelos jogos em carreira. Formação completa em arte, programação, Unreal Engine e design de interfaces para jovens criativos.</p>
                  </div>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h5 className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-2">Impacto Social</h5>
                <p className="text-sm text-zinc-300 font-light">
                  Compromisso com a inclusão digital: oferecemos cotas, bolsas e formação gratuita subvencionada pelo Instituto para alunos de escolas públicas e comunidades de baixa renda.
                </p>
              </div>

            </div>
          </div>

          {/* Métricas e Resultados do Projeto (Educação) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
              <p className="text-3xl font-display font-black text-white mb-2">+150</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Participantes dos cursos</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
              <p className="text-3xl font-display font-black text-white mb-2">+500</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Participantes de eventos</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg shadow-black/50">
              <p className="text-3xl font-display font-black text-brand-teal mb-2">+600</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Pessoas impactadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Liderança: Diretoria e Conselhos */}
    <section id="conselho" className="py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800/50 pb-8 fade-up">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            LIDERANÇA
          </h2>
          <p className="text-zinc-400 text-sm max-w-xs text-right mt-6 md:mt-0 font-light">
            Conheça os líderes e conselheiros que guiam o Vila Tech rumo ao futuro da inovação social.
          </p>
        </div>

        {/* Diretoria */}
        <div className="mb-20">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-teal uppercase mb-10 text-center fade-up">Diretoria</h3>
          <div className="flex flex-wrap justify-center gap-12">
            {diretoriaMembers.map((person, i) => (
              <div key={`dir-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 w-40 md:w-48">
                <div className="aspect-[3/4] bg-zinc-900 rounded-2xl mb-6 overflow-hidden relative border border-zinc-800 group-hover:border-brand-teal/50 transition-colors drop-shadow-2xl">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-transform duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=18181b&color=14b8a6&size=512` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-teal transition-colors uppercase tracking-wide">{person.name}</h3>
                <p className="text-xs font-bold tracking-widest text-brand-teal uppercase mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conselho Consultivo */}
        <div className="mb-20">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-orange uppercase mb-10 text-center fade-up">Conselho Consultivo</h3>
          <div className="flex justify-center items-start gap-3 sm:gap-4 md:gap-6 w-full overflow-x-auto md:overflow-visible pb-4">
            {consultivoMembers.map((person, i) => (
              <div key={`consul-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 flex-1 min-w-[120px] max-w-[192px]">
                <div className="aspect-[3/4] bg-zinc-900 rounded-2xl mb-4 overflow-hidden relative border border-zinc-800 group-hover:border-brand-orange/50 transition-colors drop-shadow-2xl">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-transform duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=18181b&color=14b8a6&size=512` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base lg:text-lg text-white group-hover:text-brand-orange transition-colors uppercase tracking-wide break-words leading-tight">{person.name}</h3>
                <p className="text-[10px] md:text-xs font-bold tracking-widest text-brand-orange uppercase mt-2 leading-tight">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conselho Educacional */}
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-zinc-300 uppercase mb-10 text-center fade-up">Conselho Educacional</h3>
          <div className="flex flex-wrap justify-center gap-12">
            {educacionalMembers.map((person, i) => (
              <div key={`edu-${i}`} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0 w-40 md:w-48">
                <div className="aspect-[3/4] bg-zinc-900 rounded-2xl mb-6 overflow-hidden relative border border-zinc-800 group-hover:border-zinc-300/50 transition-colors drop-shadow-2xl">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-transform duration-700 ease-out" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=18181b&color=14b8a6&size=512` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-zinc-300 transition-colors uppercase tracking-wide">{person.name}</h3>
                <p className="text-xs font-bold tracking-widest text-zinc-300 uppercase mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Contato & Ajude a Construir */}
    <section id="contato" className="py-24 px-6 border-t border-zinc-800/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* CRM Form */}
          <div className="fade-up order-2 md:order-1">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-10">Entre em Contato</h2>

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/5 border border-white/10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">Mensagem enviada!</h3>
                  <p className="text-white/60 text-sm">Em breve entraremos em contato com você.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-6">
                    {/* Name */}
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.nameLabel}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.emailLabel}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.phoneLabel}</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-brand-teal focus:outline-none transition-colors text-sm"
                          placeholder="(11) 00000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="mb-6">
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-3 font-bold">{contactFormConfig.interestLabel}</label>
                    <div className="flex flex-wrap gap-2">
                      {contactFormConfig.interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestChange(interest)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${formData.interests.includes(interest)
                            ? 'bg-brand-teal text-black'
                            : 'bg-white/5 text-white/40 border border-white/10 hover:border-brand-teal/50'
                            }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 font-bold">{contactFormConfig.messageLabel}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/30" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-brand-teal focus:outline-none transition-colors resize-none text-sm"
                        placeholder="Conte-nos mais..."
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-black font-display text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
    <section className="py-24 px-6 border-t border-b border-zinc-800/50 bg-black/40">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="fade-up">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-16">Localização</h2>

            <div className="mb-10">
              <p className="text-brand-teal text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Endereço
              </p>
              <p className="text-zinc-300 text-xl font-light leading-relaxed">
                R. Francisco José Ferreira Sampaio, 90<br />
                Itu, SP - 13303-536
              </p>
            </div>

            <div>
              <p className="text-brand-teal text-xs font-bold tracking-widest uppercase mb-3">Horário</p>
              <p className="text-zinc-300 text-xl font-light leading-relaxed">
                Segunda a Sexta<br />
                09:00 - 18:00
              </p>
            </div>
          </div>

          <div className="fade-up rounded-3xl overflow-hidden grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border border-zinc-800 shadow-2xl">
            {/* Map integration */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.639727409419!2d-47.30058912384918!3d-23.32882205310384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf50a0f3eb3463%3A0xc6cb5a329dbe06af!2sR.%20Francisco%20Jos%C3%A9%20Ferreira%20Sampaio%2C%2090%20-%20Itu%20Novo%20Centro%2C%20Itu%20-%20SP%2C%2013303-536!5e0!3m2!1spt-BR!2sbr!4v1709848247900!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full bg-zinc-900"
              title="Localização do Instituto Vila Tech"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Footer using existing component, but might need forced dark theme styling if it's currently light. Let's assume standard footer handles dark backgrounds fine or is enclosed in its own bg wrapper. */}
    <Footer />

    {/* Donation Modal */}
    {isDonationModalOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <div className="relative w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-brand-teal text-white shadow-2xl">
          <button
            onClick={() => setIsDonationModalOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="font-display text-2xl font-bold uppercase text-brand-teal mb-4">Apoie o Instituto</h3>
          <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
            O Instituto Cultural e Educacional Vila Tech é uma associação sem fins lucrativos. Sua doação apoia bolsas de estudos, infraestrutura e inclusão digital de jovens em Itu, SP.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
            <p className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-2">Chave Pix (CNPJ)</p>
            <p className="text-lg font-mono font-bold select-all bg-black/40 p-2.5 rounded border border-white/5 text-center">
              58.473.428/0001-31
            </p>
            <p className="text-xs text-white/50 mt-2 text-center">
              Razão Social: Instituto Cultural e Educacional Vila Tech
            </p>
          </div>
          <div className="flex gap-4">
            <button
				  onClick={() => {
				    navigator.clipboard.writeText("58.473.428/0001-31");
				    alert("Chave Pix CNPJ copiada com sucesso!");
				  }}
				  className="flex-1 py-3 rounded-xl bg-brand-teal text-black font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors">
				  Copiar Chave Pix
            </button>
            <a
              href="#contato"
              onClick={() => {
                setIsDonationModalOpen(false);
                setFormData(prev => ({ ...prev, interests: ['Investidor/Parceiro'] }));
              }}
              className="flex-grow flex items-center justify-center py-3 rounded-xl border border-zinc-700 text-center text-white font-bold uppercase tracking-wider text-xs hover:bg-zinc-800 transition-colors"
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
