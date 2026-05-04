import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MapPin, Target, Zap, Lightbulb, RefreshCw, Users, ShieldCheck, Laptop, Leaf, Star, Send, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { contactFormConfig } from '../config';
import api from '../services/api';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

import TopNavigation from '../components/TopNavigation';

export default function InstitutePage() {

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingStep, setTypingStep] = useState(0);
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

  const textLine1 = "VANGUARDA";
  const textLine2 = "DO FUTURO";

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    if (typingStep === 0) {
      interval = setInterval(() => {
        index += 1;
        setLine1(textLine1.substring(0, index));
        if (index >= textLine1.length) {
          clearInterval(interval);
          setTimeout(() => setTypingStep(1), 200);
        }
      }, 70);
    } else if (typingStep === 1) {
      interval = setInterval(() => {
        index += 1;
        setLine2(textLine2.substring(0, index));
        if (index >= textLine2.length) {
          clearInterval(interval);
          setTimeout(() => setTypingStep(2), 200);
        }
      }, 70);
    } else if (typingStep === 2) {
      gsap.fromTo('.hero-slide-up',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    return () => clearInterval(interval);
  }, [typingStep]);

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
    });

    gsap.fromTo('.valor-card',
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '#valores',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const values = [
    { title: "INOVAÇÃO COM PROPÓSITO", icon: Lightbulb },
    { title: "TRANSFORMAÇÃO SOCIAL", icon: RefreshCw },
    { title: "COLABORAÇÃO RADICAL", icon: Users },
    { title: "ÉTICA E INTEGRIDADE", icon: ShieldCheck },
    { title: "INCLUSÃO DIGITAL", icon: Laptop },
    { title: "SUSTENTABILIDADE", icon: Leaf },
    { title: "EXCELÊNCIA CONTÍNUA", icon: Star },
  ];

  const councilMembers = [
    { name: "ACHILLES MILAN", role: "DIRETOR", img: "/images/conselho/conselho_1.png" },
    { name: "PAULO SESSO", role: "DIRETOR", img: "/images/conselho/conselho_2.png" },
    { name: "PINA", role: "DIRETOR", img: "/images/conselho/conselho_3.png" },
    { name: "LUCILLA ALMEIDA", role: "DIRETORA", img: "/images/conselho/conselho_4.png" }
  ];

  const renderStaggeredText = (text: string, className: string = "") => {
    return (
      <span className={`word-stagger inline-block ${className}`}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
            <span className="word inline-block translate-y-[120%] opacity-0">
              {word}
            </span>
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-brand-teal selection:text-white overflow-hidden">
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
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-32 px-6 overflow-hidden min-h-screen flex items-center bg-black">
        {/* Background graphics */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0 opacity-40 bg-[url('/images/Arvore1.png')] bg-cover bg-top mix-blend-screen origin-top"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/60 to-[#0A0A0A]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="max-w-4xl fade-up">
            <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 min-h-[2.5em] md:min-h-[2em]">
              <span className="text-zinc-100 block">
                {line1}
                {typingStep === 0 && <span className="inline-block w-[0.1em] h-[0.7em] bg-white animate-pulse ml-2 align-middle" />}
              </span>
              <span className="text-brand-teal block italic whitespace-nowrap">
                {line2}
                {typingStep === 1 && <span className="inline-block w-[0.1em] h-[0.7em] bg-brand-teal animate-pulse ml-2 align-middle" />}
              </span>
            </h1>
            <div className="hero-slide-up opacity-0">
              <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mb-12 leading-relaxed">
                O Instituto Vila Tech está redefinindo a interseção do patrimônio cultural e da evolução tecnológica. Construímos as pontes para a próxima era da criatividade humana.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contato" className="hero-slide-up opacity-0 inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-teal text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-teal/80 transition-colors shadow-lg shadow-brand-teal/20">
                Ser Parceiro
              </a>
              <a href="#contato" className="hero-slide-up opacity-0 inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-700 text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors">
                Doar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visão */}
      <section id="visao" className="py-24 md:py-32 px-6 border-t border-zinc-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3 fade-up">
              <p className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-2">O Propósito</p>
              <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
                Visão
              </h2>
              <div className="w-12 h-1 bg-brand-teal mt-6"></div>
            </div>
            <div className="md:w-2/3 border-l border-brand-teal/30 pl-8 md:pl-16 py-4">
              <p className="text-2xl md:text-4xl text-zinc-300 font-light leading-snug">
                {renderStaggeredText("O Instituto Cultural e Educacional Vila Tech tem como objetivo promover a transformação social e profissionalização de programas inovadores que unem arte, tecnologia e desenvolvimento humano sustentável para as próximas gerações.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section id="missao" className="py-24 md:py-32 px-6 bg-zinc-900/40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 items-start text-right">
            <div className="md:w-1/4 fade-up flex flex-col items-end">
              <p className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-2">O Caminho</p>
              <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-teal">
                Missão
              </h2>
            </div>
            <div className="md:w-3/4">
              <p className="text-3xl md:text-5xl lg:text-3xl xl:text-5xl text-white font-bold leading-tight tracking-tight mb-8">
                {renderStaggeredText("Ser referência nacional em educação tecnológica e criativa, capacitando talentos para liderar a economia digital com ética e impacto social positivo.")}
              </p>
              <div className="flex justify-end gap-6 text-brand-teal fade-up">
                <Zap className="w-8 h-8" />
                <Target className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="py-24 px-6 border-t border-zinc-800/50">
        <div className="container mx-auto max-w-7xl overflow-hidden">
          <div className="flex items-center gap-4 mb-8 fade-up text-center justify-center">
            <div className="w-12 h-1 bg-brand-orange"></div>
            <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">Nossos Valores</h2>
            <div className="w-12 h-1 bg-brand-orange"></div>
          </div>

          <div className="relative w-full py-10">
            {/* Gradient Mask for fading edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee gap-8">
              {[...values, ...values, ...values, ...values].map((val, i) => (
                <div key={i} className="valor-card flex flex-col items-center text-center group cursor-pointer w-48 shrink-0 hover:scale-[1.15] transition-transform duration-300 z-20 hover:z-30 relative">
                  <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-brand-teal group-hover:bg-brand-teal/10 group-hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all duration-300">
                    <val.icon className="w-10 h-10 text-brand-orange group-hover:text-brand-teal transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors leading-tight px-2">{val.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conselho */}
      <section id="conselho" className="py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800/50 pb-8 fade-up">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              DIRETORES
            </h2>
            <p className="text-zinc-400 text-sm max-w-xs text-right mt-6 md:mt-0 font-light">
              Conheça os líderes que guiam o Vila Tech rumo ao futuro da inovação social.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {councilMembers.map((person, i) => (
              <div key={i} className="conselho-card group cursor-pointer perspective-1000 hover-3d opacity-0">
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
                <button className="inline-flex items-center justify-center px-10 py-4 bg-[#023B33] text-white font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors rounded-sm">
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
                  Itu, SP - 13312-050
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.639727409419!2d-47.30058912384918!3d-23.32882205310384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf50a0f3eb3463%3A0xc6cb5a329dbe06af!2sR.%20Francisco%20Jos%C3%A9%20Ferreira%20Sampaio%2C%2090%20-%20Itu%20Novo%20Centro%2C%20Itu%20-%20SP%2C%2013312-050!5e0!3m2!1spt-BR!2sbr!4v1709848247900!5m2!1spt-BR!2sbr"
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
    </div>
  );
}
