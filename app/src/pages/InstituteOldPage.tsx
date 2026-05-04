import { useEffect, useState } from 'react'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Rocket, Book, Heart, Users, ShieldCheck, Sparkles, Mail } from 'lucide-react';
import { instituteConfig, siteConfig } from '../config';
import ContactForm from '../sections/ContactForm';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function InstitutePage() {
  // Efeito Typing Multi-linha
  const textLine1 = "Somos um instituto que transforma realidades unindo educação, tecnologia, arte e cultura.";
  const textLine2 = "Criamos pontes entre conhecimento técnico, inovação criativa e desenvolvimento humano para impulsionar novos futuros.";
  const textLine3 = "O Instituto Cultural e Educacional Vila Tech promove a transformação social e profissional de jovens e comunidades por meio de experiências formativas que democratizam o acesso às novas tecnologias. Com metodologias de aprendizagem inovadoras, estimulamos o protagonismo, a inclusão digital e o desenvolvimento de competências criativas e técnicas que ampliam oportunidades de vida e trabalho.";

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingStep, setTypingStep] = useState(0); // 0: line1, 1: line2, 2: done
  const [isDecoding, setIsDecoding] = useState(true);

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    if (typingStep === 0) {
      interval = setInterval(() => {
        index += 2;
        setLine1(textLine1.substring(0, index));
        if (index >= textLine1.length) {
          clearInterval(interval);
          setLine1(textLine1);
          setTimeout(() => setTypingStep(1), 150);
        }
      }, 10);
    } else if (typingStep === 1) {
      interval = setInterval(() => {
        index += 2;
        setLine2(textLine2.substring(0, index));
        if (index >= textLine2.length) {
          clearInterval(interval);
          setLine2(textLine2);
          setIsDecoding(false);
          setTimeout(() => setTypingStep(2), 150);
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [typingStep]);

  // GSAP Animations
  useEffect(() => {
    // Fade in text elements on scroll
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
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-brand-teal selection:text-white">
      {/* 1. Navegação Encapsulada (Pill) idêntica à Home + Logo */}
      <div className="fixed top-6 left-4 md:top-8 md:left-8 z-[60] pointer-events-auto">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src={siteConfig.logo} 
            alt={siteConfig.title} 
            className="w-auto max-w-[120px] md:max-w-[140px] object-contain block select-none"
            style={{ filter: 'brightness(0)' }}
          />
        </Link>
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-2 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 shadow-xl pointer-events-auto hidden md:block">
        <div className="flex items-center gap-1">
          <a href="#proposito" className="flex items-center gap-2 px-4 py-2 text-xs font-sans uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <Target className="w-3.5 h-3.5" />
            <span>Nossa Essência</span>
          </a>
          <a href="#conselho" className="flex items-center gap-2 px-4 py-2 text-xs font-sans uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <Users className="w-3.5 h-3.5" />
            <span>Conselho</span>
          </a>
          <a href="#contact" className="ml-2 flex items-center gap-2 px-5 py-2 text-xs font-sans uppercase tracking-wider text-zinc-900 bg-white hover:bg-brand-teal hover:text-white transition-colors rounded-full font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>Contato</span>
          </a>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="sobre" className="pt-48 pb-16 md:pt-52 md:pb-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-5xl fade-up">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-zinc-900 mb-8 min-h-[4.5em] lg:min-h-[3.5em] flex flex-col justify-start">
              <span className={`block w-full ${typingStep === 0 && isDecoding ? 'text-brand-teal' : 'text-zinc-900'} transition-colors duration-300 min-h-[1.5em]`}>
                {line1}
                {typingStep === 0 && <span className="w-[4px] h-[0.9em] bg-brand-teal ml-2 inline-block animate-pulse align-middle" />}
              </span>
              <span className="block text-zinc-400 mt-4 w-full min-h-[2em] text-2xl sm:text-3xl lg:text-4xl leading-[1.2]">
                {line2}
                {typingStep === 1 && <span className="w-[4px] h-[0.9em] bg-zinc-400 ml-2 inline-block animate-pulse align-middle" />}
              </span>
            </h1>
            <p className={`text-lg md:text-xl text-zinc-500 font-light max-w-4xl mb-12 leading-relaxed min-h-[7em] transition-all duration-1000 ease-out ${typingStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {textLine3}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-900 text-white text-lg font-bold hover:bg-brand-teal hover:text-white transition-colors duration-300 gap-2">
                Fale com a gente <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Missão, Visão e Valores (Propósito) */}
      <section id="proposito" className="py-24 md:py-32 bg-white px-6 border-t border-zinc-100">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 md:mb-24 fade-up">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
              Nossa Essência
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl font-light">
              O que nos move, onde queremos chegar e os princípios inegociáveis que guiam nossa jornada.
            </p>
          </div>

          {/* Missão e Visão - 2 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            {/* Missão Card */}
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-brand-teal transition-all duration-500 fade-up group">
              <div className="w-16 h-16 rounded-full bg-brand-teal/10 flex items-center justify-center mb-8 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                <Target className="w-8 h-8 text-brand-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-4xl font-bold mb-6 tracking-tight text-zinc-900">{instituteConfig.mission.title}</h3>
              <p className="text-zinc-600 leading-relaxed font-light text-xl">
                {instituteConfig.mission.text}
              </p>
            </div>
            
            {/* Visão Card */}
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-brand-orange transition-all duration-500 fade-up group">
              <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <Eye className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-4xl font-bold mb-6 tracking-tight text-zinc-900">{instituteConfig.vision.title}</h3>
              <p className="text-zinc-600 leading-relaxed font-light text-xl">
                {instituteConfig.vision.text}
              </p>
            </div>
          </div>

          {/* Valores - Grid */}
          <div className="fade-up">
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-12">
              Nossos Valores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {instituteConfig.values.map((val, i) => {
                const IconList = [Rocket, Book, Heart, Users, ShieldCheck, Sparkles, Target];
                const Icon = IconList[i % IconList.length];
                return (
                  <div key={i} className="group p-8 md:p-10 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-brand-teal hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-500 hover:-translate-y-1 fade-up">
                    <div className="w-12 h-12 rounded-full bg-zinc-200/50 flex items-center justify-center mb-10 group-hover:bg-brand-teal/10 transition-colors">
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-brand-teal transition-colors" />
                    </div>
                    <h4 className="font-display text-2xl font-bold mb-4 tracking-tight">{val.title}</h4>
                    <p className="text-zinc-500 leading-relaxed font-light">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Conselho */}
      <section id="conselho" className="py-24 md:py-32 bg-zinc-900 text-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-24 fade-up text-center">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter mb-6">O Conselho</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Lideranças que inspiram e direcionam o futuro do Instituto Vila Tech.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-16">
            {[
              { role: "Conselheiro", name: "Membro 1", img: "/images/conselho/membro-1.jpg" },
              { role: "Conselheiro", name: "Membro 2", img: "/images/conselho/membro-2.jpg" },
              { role: "Conselheiro", name: "Membro 3", img: "/images/conselho/membro-3.jpg" },
              { role: "Conselheiro", name: "Membro 4", img: "/images/conselho/membro-4.jpg" },
              { role: "Conselheiro", name: "Membro 5", img: "/images/conselho/membro-5.jpg" }
            ].map((person, i) => (
              <div key={i} className="text-center group fade-up">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-zinc-800 mb-8 overflow-hidden relative">
                   <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random` }} />
                   <div className="absolute inset-0 bg-brand-teal mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">{person.name}</h3>
                <p className="text-sm text-zinc-400 font-light mb-3">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clientes / Ecossistema */}
      <section className="py-24 px-6 border-b border-zinc-100 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-16 fade-up">
            Marcas que confiam na nossa visão
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale fade-up">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="font-display text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter hover:text-brand-teal transition-colors cursor-pointer">
                MARCA {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Escritórios / Presença */}
      <section className="py-24 md:py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div className="fade-up">
               <h3 className="font-display text-3xl font-bold text-zinc-900 mb-4 tracking-tight">São Paulo</h3>
               <p className="text-zinc-500 font-medium mb-1">Vila Tech Hub HQ</p>
               <p className="text-zinc-400 font-light text-sm">Av. Paulista, 1000<br/>SP, Brasil</p>
             </div>
             <div className="fade-up">
               <h3 className="font-display text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Campinas</h3>
               <p className="text-zinc-500 font-medium mb-1">Polo de Inovação</p>
               <p className="text-zinc-400 font-light text-sm">Pq. Tecnológico, 404<br/>SP, Brasil</p>
             </div>
             <div className="fade-up">
               <h3 className="font-display text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Remoto</h3>
               <p className="text-zinc-500 font-medium mb-1">Presença Nacional</p>
               <p className="text-zinc-400 font-light text-sm">Especialistas conectados<br/>em mais de 15 estados.</p>
             </div>
           </div>
        </div>
      </section>

      {/* 8. Formulário e Footer Global */}
      <ContactForm />
      <Footer />
    </div>
  );
}
