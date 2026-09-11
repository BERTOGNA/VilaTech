import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Camera, Users, Target, Clapperboard, Send, Menu, X, ArrowUpRight, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../services/api';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function PlanoAbertoPage() {
  const [formData, setFormData] = useState({ perfil: '', nome: '', email: '', mensagem: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/leads', {
        name: formData.nome,
        email: formData.email,
        message: `[Plano Sequência] Perfil: ${formData.perfil}\n${formData.mensagem}`,
        interests: ['plano-sequencia'],
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { num: '01', text: 'O PROJETO', href: '#projeto' },
    { num: '02', text: 'MÉTODO', href: '#metodo' },
    { num: '03', text: 'RESULTADOS', href: '#resultados' },
    { num: '04', text: 'MENTORIA', href: '#mentoria' },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans overflow-x-hidden selection:bg-[#E83A79] selection:text-white">
      <SEO
        title="Plano Sequência | Academia de Cinema Popular Comunitário"
        description="Quando a cidade se conta, ela se enxerga. Formação audiovisual para jovens: aprendizado, criação, produção e exibição."
      />

      <style>{`
        .editorial-title {
          font-family: 'Montserrat', sans-serif;
          letter-spacing: -0.06em;
          line-height: 0.9;
        }
        .orbit-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .orbit-label {
          position: absolute;
          font-size: 0.65rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          background: #1A1A1A;
          padding: 0.2rem 0.5rem;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }
      `}</style>

      {/* --- CUSTOM NAVBAR --- */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group mix-blend-difference z-50">
          <img src="/images/logo-vila-tech.svg" alt="Vila Tech" className="h-8 md:h-10 w-auto object-contain transition-transform" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 mix-blend-difference z-50">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-white/60 hover:text-white flex gap-1.5 items-baseline text-[11px] uppercase tracking-widest font-bold transition-colors">
              <span className="text-[#E83A79] font-mono text-[9px]">{link.num}</span> {link.text}
            </a>
          ))}
          <a href="#formulario" className="text-white text-[11px] font-bold uppercase tracking-widest border-b border-white pb-0.5 hover:text-[#E83A79] hover:border-[#E83A79] transition-colors ml-4">
            QUERO FAZER PARTE
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden text-white z-50 mix-blend-difference" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col justify-center items-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map((link, i) => (
          <a key={i} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-white text-3xl font-black uppercase tracking-tighter mb-8 editorial-title flex items-center gap-4">
            <span className="text-[#E83A79] text-xl font-mono">{link.num}</span> {link.text}
          </a>
        ))}
        <a href="#formulario" onClick={() => setIsMenuOpen(false)} className="text-[#E83A79] text-3xl font-black uppercase tracking-tighter editorial-title mt-8 border-b-2 border-[#E83A79] pb-2">
          QUERO FAZER PARTE
        </a>
      </div>

      {/* ==================== HERO SECTION (Print 22) ==================== */}
      <section className="relative min-h-[100svh] flex items-center bg-[#1D1D1B] overflow-hidden">
        {/* Full background image */}
        <div className="absolute inset-0">
          <img
            src="./images/projeto_captacao/cinema.webp"
            alt="Jovens com câmera"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1B] via-[#1D1D1B]/10 to-transparent" />
          <div className="absolute inset-0 bg-[#1D1D1B]/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-16 pt-32 pb-20 relative z-10 flex h-full">

          <div className="lg:w-2/3 flex flex-col justify-center h-full pt-10">
            <div>
              <img src="/images/instituto/Logos_IVT_branco.png" alt="Instituto Vila Tech" className="h-[80px] md:h-[120px] mb-12 object-contain self-start transition-opacity" />
            </div>
            <div className="flex flex-col gap-1 mb-12">
              <img src="/images/projeto_captacao/Marca_Plano_Cor.png" alt="Plano Sequência" className="h-[180px] md:h-[150px] object-contain self-start mb-4" />

            </div>

            <div className="mb-12">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black editorial-title text-white mb-2 leading-[0.9]">Quando</h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black editorial-title text-[#E83A79] mb-2 leading-[0.9]">o território</h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black editorial-title text-white mb-2 leading-[0.9]">entra em cena.</h2>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-4 pt-6 max-w-md">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">PLANO 01 / 12</span>
                <div className="flex-1 h-px bg-[#E83A79]" />
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">ITU, SP — BRASIL</span>
              </div>
              <p className="text-white/60 font-inter text-sm md:text-base font-light mt-4 max-w-md leading-relaxed">
                Formação audiovisual para jovens:<br />
                Um projeto de educação ágil para formação e capacitação em audiovisual e cinema.
              </p>
            </div>
          </div>


        </div>

        {/* Vertical text right edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block z-10" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.4em]">ACADEMIA DE CINEMA POPULAR</span>
        </div>
      </section>

      {/* ==================== 01 / O PROJETO (Print 23) ==================== */}
      <section id="projeto" className="bg-[#FFFFFF] text-[#1A1A1A] py-32 px-6 relative">
        {/* Pink line indicator */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block">
          <div className="absolute top-32 -left-[4px] w-[9px] h-[9px] border border-[#E83A79] rounded-full bg-white" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20">
          <div className="flex items-center justify-between mb-24 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
                <span className="text-[#E83A79]">01</span> / O PROJETO
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-gray-300 hidden md:block">FIELD NOTE / SHOT 01 / SETUP</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
            <div className="fade-up">
              <h2 className="text-5xl md:text-6xl lg:text-[70px] font-black editorial-title text-[#1A1A1A] mb-2 leading-[0.9]">O aprendizado do Processo</h2>
              <h2 className="text-5xl md:text-6xl lg:text-[70px] font-black editorial-title text-[#5dbeb5] leading-[0.9]">Cinematográfico<br />impactando vidas<br />e comunidades.</h2>
            </div>
            <div className="flex flex-col gap-8 fade-up lg:pl-12">
              <p className="text-2xl md:text-3xl font-inter font-light text-[#1A1A1A] leading-snug">
                Plano Sequência é uma academia de cinema comunitário popular. Uma trilha de conhecimento que acompanha o aluno da pesquisa ao portfólio.
              </p>
              <p className="text-base text-gray-500 font-inter font-light leading-relaxed max-w-lg">
                Muito além de aprender a operar uma câmera ou um equipamento de iluminação, o projeto combina repertório, técnica, autoria e circulação em uma mesma sequência, onde a comunidade não é só um cenário: é parte da formação.
              </p>
              <div className="mt-4">
                <a href="#metodo" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 hover:text-[#E83A79] hover:border-[#E83A79] transition-colors">
                  VER COMO FUNCIONA <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 pt-16 border-t border-gray-200 fade-up">
            <div className="md:border-r border-gray-200 pr-12 pb-8 md:pb-0">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
                <h4 className="font-black text-[11px] uppercase tracking-widest text-[#1A1A1A]">UM ÚNICO TRAÇO</h4>
              </div>
              <p className="text-gray-500 font-inter font-light text-sm pl-10">processo contínuo, sem atalhos</p>
            </div>
            <div className="md:border-r border-gray-200 px-0 md:px-12 py-8 md:py-0 border-t md:border-t-0">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
                <h4 className="font-black text-[11px] uppercase tracking-widest text-[#1A1A1A]">UM CAMPO ABERTO</h4>
              </div>
              <p className="text-gray-500 font-inter font-light text-sm pl-10">novas perspectivas para a cidade</p>
            </div>
            <div className="md:pl-12 pt-8 md:pt-0 border-t border-gray-200 md:border-t-0">
              <div className="flex items-center gap-4 mb-4">
                <Camera className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
                <h4 className="font-black text-[11px] uppercase tracking-widest text-[#1A1A1A]">UMA TRAJETÓRIA</h4>
              </div>
              <p className="text-gray-500 font-inter font-light text-sm pl-10">da pesquisa ao portfólio</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 02 / POR QUE AGORA (Print 24) ==================== */}
      <section className="bg-[#1A1A1A] text-white py-32 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-100">
          <img src="/images/projeto_captacao/cinema5.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        </div>

        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block" />

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center justify-between mb-20 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                02 / O MOMENTO CERTO
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 hidden md:block">SHOT 02 / TIMING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <div className="fade-up relative z-20">
              <p className="text-[#E83A79] font-black text-[10px] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83A79] block" />
                REPERTÓRIO + TÉCNICA + IA + NEGÓCIO
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-[70px] font-black editorial-title mb-8 leading-[0.85]">
                Uma carreira.<br />
                Várias<br />
                possibilidades.
              </h2>
              <p className="text-lg text-white/70 font-inter font-light leading-relaxed max-w-md mt-10">
                Um conhecimento que abre portas e várias frentes de trabalho, em um mercado amadurecido que busca profissionais conectados às suas raízes.
              </p>
            </div>

            {/* Orbit graphic */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center fade-up opacity-90 overflow-visible">

              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto">
                {/* Outer Orbit */}
                <div className="orbit-circle w-full h-full border-white/5" />
                <div className="orbit-label" style={{ top: '15%', left: '20%' }}>CRIADOR DE CONTEÚDO</div>
                <div className="orbit-label" style={{ top: '85%', left: '80%' }}>VIDEOMAKER E PRODUÇÃO</div>

                {/* Middle Orbit */}
                <div className="orbit-circle w-[75%] h-[75%] border-white/10" />
                <div className="orbit-label text-right" style={{ top: '25%', left: '90%' }}>VENDAS E<br />E-COMMERCE</div>
                <div className="orbit-label" style={{ top: '85%', left: '25%' }}>EDIÇÃO E FINALIZAÇÃO</div>

                {/* Inner Orbit */}
                <div className="orbit-circle w-[50%] h-[50%] border-white/20" />
                <div className="orbit-label text-right" style={{ top: '50%', left: '0%' }}>CAMERAMAN E FOTÓGRAFO</div>
                <div className="orbit-label text-left" style={{ top: '45%', left: '100%' }}>MÍDIAS SOCIAIS E<br />STREAMING</div>

                {/* Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#E83A79] rounded-full flex items-center justify-center text-center shadow-[0_0_60px_rgba(232,58,121,0.4)] z-10">
                  <span className="font-black text-[9px] sm:text-[11px] uppercase tracking-[0.1em] text-white px-4 leading-tight">
                    OPORTUNIDADES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 / PARA QUEM (Print 25) ==================== */}
      <section className="bg-white text-[#1A1A1A] py-32 px-6 relative">
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block" />

        <div className="container mx-auto max-w-[1400px] md:pl-20">
          <div className="flex items-center justify-between mb-24 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
                <span className="text-[#E83A79]">03</span> / PARA QUEM
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-16">
            <div className="fade-up">
              <h2 className="text-4xl md:text-5xl lg:text-[60px] font-black editorial-title mb-8 text-[#1A1A1A] leading-[0.9]">
                Acesso a<br />
                tecnologia<br />
                não pode ser<br />
                <span className="text-[#E83A79]">obstáculo.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-500 font-inter font-light leading-relaxed mb-12 max-w-lg mt-8">
                Um programa de inclusão tecnológica e digital que promove acesso a equipamentos de ponta e formação profissional.
              </p>

              <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50 mb-8">
                <h4 className="font-bold text-[#1A1A1A] uppercase tracking-widest text-sm mb-4">Público-alvo:</h4>
                <ul className="list-disc pl-5 text-gray-600 font-inter font-light space-y-2">
                  <li>Estudantes de ensino médio e Universitários</li>
                  <li>Aprovação e indicação por entidades locais</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:border-l border-gray-200 lg:pl-12 fade-up pt-12 lg:pt-0">
              <div className="flex flex-col items-center text-center">
                <p className="text-[clamp(40px,6vw,80px)] whitespace-nowrap font-black editorial-title text-[#F39200] leading-none mb-3">60</p>
                <p className="font-black text-[9px] uppercase tracking-[0.15em] text-[#1A1A1A] leading-tight">JOVENS<br />NO PILOTO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <p className="text-[clamp(40px,6vw,80px)] whitespace-nowrap font-black editorial-title text-[#823B88] leading-none mb-3">15-24</p>
                <p className="font-black text-[9px] uppercase tracking-[0.15em] text-[#1A1A1A] leading-tight">ANOS</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <p className="text-[clamp(40px,6vw,80px)] whitespace-nowrap font-black editorial-title text-[#5dbeb5] leading-none mb-3">3</p>
                <p className="font-black text-[9px] uppercase tracking-[0.15em] text-[#1A1A1A] leading-tight">TERRITÓRIOS<br />PRIORITÁRIOS</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 border border-[#E83A79]/30 rounded-2xl bg-[#E83A79]/5 flex flex-col md:flex-row items-start md:items-center gap-8 mt-12 fade-up">
            <Clapperboard className="w-12 h-12 text-[#E83A79] shrink-0" />
            <div className="flex flex-col gap-2">
              <span className="font-black text-[#1A1A1A] text-xl md:text-2xl tracking-wide">Ninguém fica de fora por falta de equipamento.</span>
              <span className="text-gray-600 font-inter font-light text-base md:text-lg">Infraestrutura, software e acompanhamento para aprender, produzir, editar e finalizar.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 04 / COMO ACONTECE (Print 26) ==================== */}
      <section id="metodo" className="bg-[#1A1A1A] text-white py-32 px-6 relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-120">
          <img src="/images/projeto_captacao/cinema4.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        </div>

        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block">
          <div className="absolute top-32 -left-[4px] w-[9px] h-[9px] border border-[#E83A79] rounded-full bg-[#1A1A1A]" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center justify-between mb-20 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                <span className="text-[#E83A79]">04</span> / COMO ACONTECE
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 mb-32 fade-up">
            <h2 className="text-4xl md:text-5xl lg:text-[60px] font-black editorial-title leading-[0.9]">
              Aprender<br />
              fazendo,<br />
              <span className="text-[#E83A79]">em ciclos<br />curtos.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-inter font-light leading-relaxed max-w-sm">
              Situações e histórias reais do território viram matéria-prima. Cada encontro tem prática, feedback, mentoria e uma entrega visível.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative mt-8 mb-32 fade-up">
            {/* The horizontal line — white */}
            <div className="absolute top-[34px] left-0 right-0 h-px bg-white hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { num: '01', title: 'OLHAR', desc: 'repertório e pesquisa' },
                { num: '02', title: 'NARRAR', desc: 'ideia e roteiro' },
                { num: '03', title: 'PRODUZIR', desc: 'equipe, câmera, som e luz' },
                { num: '04', title: 'MONTAR', desc: 'edição e finalização' },
                { num: '05', title: 'CIRCULAR', desc: 'exibição e publicação' },
              ].map((step, i) => (
                <div key={i} className="relative pt-6 md:pt-0 border-l border-white/20 md:border-l-0 pl-6 md:pl-0">
                  <span className="text-[#E83A79] font-mono text-[10px] uppercase tracking-widest block mb-4">{step.num}</span>
                  {/* White circle with black center dot */}
                  <div className="hidden md:block absolute top-[28px] left-0 w-[13px] h-[13px] rounded-full border-2 border-white bg-[#1A1A1A] -translate-x-[3px]">
                    <div className="absolute inset-[3px] rounded-full bg-white" />
                  </div>
                  <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-2 mt-4 md:mt-10">{step.title}</h4>
                  <p className="text-white/50 text-xs font-inter font-light pr-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Big numbers */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 fade-up items-end">
            <div>
              <p className="text-[90px] md:text-[130px] font-black editorial-title text-[#823B88] leading-[0.75] mb-4">120</p>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-white/70">HORAS PARA TRANSFORMAÇÃO</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-12 lg:gap-20">
              <div>
                <p className="text-[50px] md:text-[80px] font-black editorial-title text-[#F39200] leading-[0.75] mb-4">96h</p>
                <p className="font-black text-[9px] uppercase tracking-[0.2em] text-white/50">NÚCLEO FORMATIVO COMUM</p>
              </div>
              <div>
                <p className="text-[50px] md:text-[80px] font-black editorial-title text-[#E83A79] leading-[0.75] mb-4">+24h</p>
                <p className="font-black text-[9px] uppercase tracking-[0.2em] text-white/50">PRODUÇÃO FINAL ORIENTADA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 05 / O QUE SE APRENDE (Print 27) ==================== */}
      <section className="bg-[#efe8dc] text-[#1A1A1A] py-32 px-6 relative">
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block">
          <div className="absolute top-32 -left-[4px] w-[9px] h-[9px] border border-[#E83A79] rounded-full bg-[#efe8dc]" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20">
          <div className="flex items-center gap-6 mb-24 fade-up">
            <div className="w-12 h-px bg-[#E83A79]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
              <span className="text-[#E83A79]">05</span> / O QUE SE APRENDE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 fade-up">
            <h2 className="text-4xl md:text-[60px] font-black editorial-title text-[#1A1A1A] leading-[0.9]">
              Sete módulos.<br />
              <span className="text-[#E83A79]">Uma obra autoral.</span>
            </h2>
            <p className="text-base text-gray-500 font-inter font-light leading-relaxed max-w-sm lg:ml-auto">
              Da primeira pergunta à sessão pública, o percurso transforma repertório em prática e prática em portfólio.
            </p>
          </div>

          {/* Static Table */}
          <div className="border-t border-black/10 fade-up">
            {[
              { num: '01', title: 'Olhar e repertório', hours: '10h', desc: 'A prática acontece em sprints presenciais, com demonstração curta, trabalho em equipe e acompanhamento próximo.' },
              { num: '02', title: 'Pesquisa, território e ética', hours: '10h', desc: 'Identificação de histórias locais, construção de roteiro baseado em fatos reais ou ficcionais dentro da comunidade.' },
              { num: '03', title: 'Ideia, roteiro e direção', hours: '14h', desc: 'Da premissa ao roteiro formatado, explorando decupagem e visão de direção.' },
              { num: '04', title: 'Câmera, som e luz', hours: '22h', desc: 'Uso de equipamentos, lentes, captação de áudio limpo e iluminação básica para criar atmosfera.' },
              { num: '05', title: 'Produção, atuação e IA', hours: '10h', desc: 'Direção de atores (não-atores do território), organização de set e uso de ferramentas de IA para agilizar processos.' },
              { num: '06', title: 'Edição e finalização', hours: '18h', desc: 'Montagem, color grading básico, inserção de trilhas e exportação nos formatos corretos.' },
              { num: '07', title: 'Plataformas e circulação', hours: '12h', desc: 'Estratégias de lançamento, redes sociais, criação de reels derivados e mostra final.' },
            ].map((mod, i) => (
              <div key={i} className="border-b border-black/10">
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between py-5 px-4 md:px-8 transition-colors hover:bg-black/5">
                  <div className="flex items-center gap-6 md:gap-12 mb-3 md:mb-0 md:w-1/3">
                    <span className="text-[#E83A79] font-mono text-[9px] w-6 text-left">{mod.num}</span>
                    <span className="font-black text-[#1A1A1A] font-sans text-base md:text-xl tracking-tight">{mod.title}</span>
                  </div>
                  <div className="md:w-1/2 flex-1 mb-3 md:mb-0 md:px-8">
                    <p className="text-gray-600 font-inter font-light text-sm max-w-xl leading-relaxed">{mod.desc}</p>
                  </div>
                  <div className="flex items-center justify-end md:w-1/6 mt-2 md:mt-0">
                    <span className="text-gray-400 font-mono text-[10px] tracking-widest font-bold">{mod.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 06 / TERRITÓRIO E AUTORIA (Print extra) ==================== */}
      <section className="bg-[#1A1A1A] text-white py-32 px-6 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-100">
          <img src="/images/projeto_captacao/cinema.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block" />

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center justify-between mb-20 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                06 / TERRITÓRIO E AUTORIA
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 hidden md:block">SHOT 06 / LOCATION</span>
          </div>

          <div className="flex flex-col gap-8 items-start mb-20 max-w-4xl">
            <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-black editorial-title leading-[0.85] fade-up">
              A comunidade<br />não é só <span className="text-[#E83A79]">cenário.</span>
            </h2>
            <div className="fade-up">
              <p className="text-lg md:text-xl text-white/80 font-inter font-light leading-relaxed max-w-2xl">
                Cada turma investiga seu território, escuta moradores, transforma repertório local em narrativa e devolve as obras em sessões públicas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12 fade-up">
            <div>
              <span className="text-[#E83A79] font-mono text-[9px] uppercase tracking-widest block mb-4">01</span>
              <h4 className="font-black uppercase text-sm tracking-[0.2em] mb-2">ESCUTA</h4>
              <p className="text-white/50 text-xs font-inter font-light pr-4 max-w-[200px]">memórias, desafios, personagens e lugares</p>
            </div>
            <div>
              <span className="text-[#E83A79] font-mono text-[9px] uppercase tracking-widest block mb-4">02</span>
              <h4 className="font-black uppercase text-sm tracking-[0.2em] mb-2">CRIAÇÃO</h4>
              <p className="text-white/50 text-xs font-inter font-light pr-4 max-w-[200px]">roteiros e escolhas construídos em equipe</p>
            </div>
            <div>
              <span className="text-[#E83A79] font-mono text-[9px] uppercase tracking-widest block mb-4">03</span>
              <h4 className="font-black uppercase text-sm tracking-[0.2em] mb-2">DEVOLUTIVA</h4>
              <p className="text-white/50 text-xs font-inter font-light pr-4 max-w-[200px]">exibições, conversa pública e circulação</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 07 / O QUE FICA (Resultados) ==================== */}
      <section id="resultados" className="bg-[#efe8dc] text-[#1A1A1A] py-32 px-6 relative">
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block" />

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center justify-between mb-20 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
                07 / O QUE FICA
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-gray-400 hidden md:block">FIELD NOTE / SHOT 07 / OUTPUT</span>
          </div>

          <div className="mb-24 fade-up">
            <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-black editorial-title leading-[0.85]">
              Obras, portfólios<br />e <span className="text-[#E83A79]">circulação.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 fade-up border-y border-black/10">
            {[
              { num: '12', label: 'obras audiovisuais', color: 'text-[#5dbeb5]' },
              { num: '60', label: 'portfólios individuais', color: 'text-[#F39200]' },
              { num: '3', label: 'sessões comunitárias', color: 'text-[#823B88]' },
              { num: '1', label: 'mostra municipal', color: 'text-[#E83A79]' },
            ].map((item, i) => (
              <div key={i} className={`pt-12 pb-12 md:px-6 ${i !== 0 ? 'md:border-l border-black/10' : ''}`}>
                <p className={`text-[80px] md:text-[120px] font-black editorial-title mb-4 leading-none ${item.color}`}>{item.num}</p>
                <p className="text-[#1A1A1A] font-mono text-[9px] uppercase tracking-[0.1em]">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 fade-up">
            <p className="text-gray-400 font-inter text-xs font-light">
              + 6 encontros de carreira • guia metodológico • memória de processo • banco de talentos
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 08 / DOZE MESES ==================== */}
      <section className="bg-[#1A1A1A] text-white py-32 px-6 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/projeto_captacao/cinema3.webp" alt="Pessoal filmando" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        </div>
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block">
          <div className="absolute top-32 -left-[4px] w-[9px] h-[9px] bg-[#E83A79] rounded-full" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center justify-between mb-24 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                08 / DOZE MESES
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30 hidden md:block">SHOT 08 / TIMELINE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32 fade-up">
            <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-black editorial-title leading-[0.85] text-white">
              Preparar.<br />
              Formar.<br />
              <span className="text-[#E83A79]">Produzir.</span><br />
              Circular.
            </h2>
            <div className="lg:pt-6">
              <p className="text-lg md:text-xl text-white/50 font-inter font-light leading-relaxed max-w-sm lg:ml-auto">
                Uma jornada com começo, meio, entrega e continuidade.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px border-t border-white/10 fade-up pt-12">
            {[
              { period: 'M1–M2', label: 'PREPARAR', desc: 'pactuação territorial, parceiros, seleção e linha de base' },
              { period: 'M3–M7', label: 'FORMAR', desc: 'núcleo comum, práticas técnicas e desenvolvimento de projetos' },
              { period: 'M8–M10', label: 'PRODUZIR', desc: 'filmagem, edição, acessibilidade, portfólios e mentoria' },
              { period: 'M11–M12', label: 'CIRCULAR', desc: 'sessões comunitárias, mostra municipal e avaliação' },
            ].map((item, i) => (
              <div key={i} className={`pb-12 ${i !== 0 ? 'md:border-l border-white/10 md:pl-8' : 'md:pr-8'}`}>
                <p className="text-[#E83A79] font-mono text-[9px] uppercase tracking-widest mb-8">{item.period}</p>
                <p className="font-black uppercase text-white text-xl tracking-tight mb-4">{item.label}</p>
                <p className="text-white/50 text-sm font-inter font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 09 / COORDENAÇÃO E MENTORIA ==================== */}
      <section id="mentoria" className="bg-[#efe8dc] text-[#1A1A1A] py-32 px-6 relative">
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#E83A79]/30 hidden md:block">
          <div className="absolute top-32 -left-[4px] w-[9px] h-[9px] border border-[#E83A79] rounded-full bg-[#efe8dc]" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20">
          <div className="flex items-center justify-between mb-24 fade-up">
            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-[#E83A79]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">
                <span className="text-[#E83A79]">09</span> / COORDENAÇÃO E MENTORIA
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-gray-300 hidden md:block">CREW / FIELD NOTES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 fade-up">
            <h2 className="text-5xl md:text-[60px] lg:text-[80px] font-black editorial-title text-[#1A1A1A] leading-[0.85]">
              Experiência<br />compartilhada<br />
              <span className="text-[#E83A79]">traz resultados.</span>
            </h2>
            <p className="text-lg text-gray-500 font-inter font-light leading-relaxed max-w-sm lg:ml-auto">
              Um time de professores e orientadores com muita experiência e prática ajudando a construir essa jornada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-up">
            {/* Achilles */}
            <div>
              <div className="relative mb-6 group overflow-hidden bg-[#5dbeb5] h-[250px]">
                <img src="/images/diretoria/Achilles.webp" alt="Achilles Milan Neto" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-4 border border-[#E83A79]/50 pointer-events-none" />
              </div>
              <h3 className="font-black text-xl text-[#1A1A1A] mb-2 tracking-tight">Achilles Milan Neto</h3>
              <p className="text-gray-500 font-inter font-light text-xs mb-4">
                Diretor de cinema, diretor de arte e diretor executivo do Instituto Cultural Vila Tech
              </p>
              <p className="text-[#E83A79] font-mono text-[8px] uppercase tracking-[0.2em]">FUNÇÃO / MENTORIA AUDIOVISUAL</p>
            </div>

            {/* Guilherme */}
            <div>
              <div className="relative mb-6 group overflow-hidden bg-[#F39200] h-[250px]">
                <img src="/images/conselho/Conselho Consultivo/Gui Oller.webp" alt="Guilherme Oller" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale" />
                <div className="absolute inset-4 border border-[#E83A79]/50 pointer-events-none" />
              </div>
              <h3 className="font-black text-xl text-[#1A1A1A] mb-2 tracking-tight">Guilherme Oller</h3>
              <p className="text-gray-500 font-inter font-light text-xs mb-4">
                Roteirista e produtor premiado, diretor da Motim Filmes
              </p>
              <p className="text-[#E83A79] font-mono text-[8px] uppercase tracking-[0.2em]">FUNÇÃO / MENTORIA AUDIOVISUAL</p>
            </div>

            {/* Bruno */}
            <div>
              <div className="relative mb-6 group overflow-hidden bg-[#823B88] h-[250px]">
                <img src="/images/conselho/Conselho Consultivo/Bruno_Bertogna.webp" alt="Bruno Bertogna" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale" />
                <div className="absolute inset-4 border border-[#E83A79]/50 pointer-events-none" />
              </div>
              <h3 className="font-black text-xl text-[#1A1A1A] mb-2 tracking-tight">Bruno Bertogna</h3>
              <p className="text-gray-500 font-inter font-light text-xs mb-4">
                Diretor de arte e editor de video especialista em IA
              </p>
              <p className="text-[#E83A79] font-mono text-[8px] uppercase tracking-[0.2em]">FUNÇÃO / MENTORIA AUDIOVISUAL</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 10 / APOIE NOSSO PROJETO ==================== */}
      <section className="bg-[#E83A79] py-32 px-6 relative flex flex-col justify-center min-h-[90vh]">
        {/* Fio condutor */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-[#1A1A1A]/10 hidden md:block">
          <div className="absolute top-1/2 -left-[4px] w-[9px] h-[9px] bg-white rounded-full" />
        </div>

        <div className="container mx-auto max-w-[1400px] md:pl-20 relative z-10">
          <div className="flex items-center gap-6 mb-20 fade-up">
            <div className="w-12 h-px bg-[#1A1A1A]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]">
              APOIE NOSSO PROJETO
            </span>
          </div>

          <h2 className="text-[70px] md:text-[100px] lg:text-[140px] font-black editorial-title text-[#1A1A1A] leading-[0.85] fade-up mb-12">
            Vamos<br />
            construir<br />
            <span className="text-white">esse plano</span><br />
            juntos.
          </h2>

          <p className="text-xl md:text-2xl font-inter font-light text-[#1A1A1A] mb-16 fade-up">
            O Plano Sequência só é possível com o seu apoio.
          </p>

          <div className="fade-up flex flex-wrap gap-6">
            <a href="#formulario" className="inline-flex items-center gap-4 border border-[#1A1A1A] bg-transparent py-4 px-8 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
              QUERO PATROCINAR
            </a>
            <a href="/doar" className="inline-flex items-center gap-4 border border-[#1A1A1A] bg-[#1A1A1A] text-white py-4 px-8 text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-[#1A1A1A] transition-colors">
              QUERO DOAR <Heart className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FORMULÁRIO ==================== */}
      <section id="formulario" className="bg-[#111110] py-32 px-6 border-t border-white/5 relative">
        <div className="container mx-auto max-w-[1400px] md:pl-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="fade-up">
              <div className="text-[#E83A79] font-mono text-[10px] uppercase tracking-[0.2em] mb-8">Formulário de interesse</div>
              <h2 className="text-5xl md:text-7xl font-black editorial-title text-white mb-8 leading-[0.85]">
                Quero<br />fazer parte.
              </h2>
              <p className="text-white/60 font-inter text-lg font-light leading-relaxed mb-10 max-w-md">
                Para jovens, escolas, parceiros e apoiadores que querem entrar em cena. Inscreva-se para receber novidades.
              </p>
            </div>

            <div className="fade-up bg-white/5 p-8 md:p-16 rounded-2xl border border-white/10">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-[#E83A79]/20 text-[#E83A79] rounded-full flex items-center justify-center mx-auto mb-8">
                    <Send className="w-8 h-8 ml-1" />
                  </div>
                  <h3 className="text-3xl font-black editorial-title uppercase text-white mb-4">Interesse Registrado!</h3>
                  <p className="text-white/50 font-inter font-light text-base">Em breve a equipe do Instituto entrará em contato.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-white/40 text-[10px] uppercase font-mono tracking-widest mb-4">Seu perfil</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Jovem participante', 'Escola', 'Parceiro'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setFormData({ ...formData, perfil: p })}
                          className={`px-4 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${formData.perfil === p
                            ? 'bg-white text-[#1A1A1A] border-white'
                            : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 bg-black/20'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nome completo ou instituição"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-5 text-white placeholder-white/30 font-inter text-base focus:outline-none focus:border-[#E83A79] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="E-mail principal"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-5 text-white placeholder-white/30 font-inter text-base focus:outline-none focus:border-[#E83A79] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !formData.perfil}
                    className="w-full mt-8 flex items-center justify-center gap-3 px-8 py-6 bg-[#E83A79] text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Enviando...' : 'Enviar interesse'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
