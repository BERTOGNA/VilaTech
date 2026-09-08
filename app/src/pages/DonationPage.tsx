import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, Heart, Shield, GraduationCap, Users, Lightbulb, CreditCard, QrCode } from 'lucide-react';
import SEO from '../components/SEO';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function DonationPage() {
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const pixKey = "58.473.428/0001-31";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans selection:bg-brand-teal selection:text-white flex flex-col">
      <SEO 
        title="Faça sua Doação | Instituto Vila Tech" 
        description="Apoie o Instituto Vila Tech e transforme o futuro de jovens em vulnerabilidade social através de educação e tecnologia." 
      />
      <TopNavigation />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#023B33] text-white pt-20 pb-24 md:pt-32 md:pb-32 px-6">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/instituto/grafismos/grafis5.svg')] bg-repeat opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-teal rounded-full blur-[120px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-xs font-bold uppercase tracking-widest mb-8 fade-up">
              <Heart className="w-4 h-4" /> Transforme Vidas
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6 fade-up" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Ajude a construir <span className="text-brand-orange">o amanhã</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed fade-up">
              O Instituto Cultural e Educacional Vila Tech é uma associação sem fins lucrativos. Sua doação viabiliza bolsas de estudo, infraestrutura e inclusão digital de jovens talentos em vulnerabilidade social na cidade de Itu, SP.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 px-6 -mt-10 relative z-20">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Impact & Transparency */}
            <div className="order-2 lg:order-1 fade-up">
              <h2 className="text-3xl font-black uppercase text-[#1d1d1b] mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                O Impacto da sua doação
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1b] mb-2 font-display uppercase tracking-tight">Bolsas de Estudo em IA e Tech</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Financiamos o acesso de jovens sem recursos a cursos de formação em inteligência artificial, programação e habilidades do futuro.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1b] mb-2 font-display uppercase tracking-tight">Apoio a Empreendedores Locais</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Estruturamos programas de aceleração e mentorias para projetos que impactam positivamente a comunidade local e geram renda.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#864896]/10 flex items-center justify-center text-[#864896]">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1b] mb-2 font-display uppercase tracking-tight">Manutenção do Hub de Inovação</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Sua contribuição ajuda a manter a infraestrutura de nosso espaço cultural e de coworking aberto para ações sociais, palestras gratuitas e exposições de arte.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white border border-gray-200 rounded-2xl flex items-start gap-4">
                <Shield className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1d1d1b] text-sm uppercase tracking-wider mb-2">Transparência e Prestação de Contas</h4>
                  <p className="text-gray-500 text-sm font-light">
                    O Instituto Vila Tech compromete-se a publicar relatórios anuais detalhando a alocação dos recursos arrecadados. Todos os fundos são revertidos integralmente para nossos projetos sociais e operacionais descritos em estatuto.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Donation Form UI */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 fade-up">
                <h3 className="text-2xl font-black uppercase text-[#1d1d1b] mb-6 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Escolha como apoiar
                </h3>

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                      paymentMethod === 'pix' ? 'bg-white text-brand-teal shadow' : 'text-gray-500 hover:text-[#1d1d1b]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" /> PIX
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                      paymentMethod === 'card' ? 'bg-white text-brand-teal shadow' : 'text-gray-500 hover:text-[#1d1d1b]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Cartão
                  </button>
                </div>

                {/* PIX Flow */}
                {paymentMethod === 'pix' && (
                  <div className="animate-fade-in">
                    <p className="text-center text-gray-600 mb-6 font-light">
                      Faça sua doação de qualquer valor utilizando a chave PIX (CNPJ) abaixo. O valor cai diretamente na conta do Instituto.
                    </p>
                    
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-3 relative z-10">Chave Pix (CNPJ)</p>
                      <p className="text-2xl font-mono font-bold select-all bg-white p-3 rounded-lg border border-gray-200 text-[#1d1d1b] relative z-10 shadow-inner">
                        {pixKey}
                      </p>
                      <p className="text-xs text-gray-400 mt-4 relative z-10">
                        Razão Social: Instituto Cultural e Educacional Vila Tech<br />
                        Banco: (A inserir se necessário)
                      </p>
                    </div>

                    <button
                      onClick={copyToClipboard}
                      className="w-full py-4 rounded-xl bg-brand-teal text-white font-bold uppercase tracking-wider text-sm hover:bg-[#1d1d1b] transition-colors flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" /> Copiar Chave Pix
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Card Flow (Future) */}
                {paymentMethod === 'card' && (
                  <div className="animate-fade-in text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-bold text-[#1d1d1b] mb-2 uppercase tracking-wide">Doações via Cartão de Crédito</h4>
                    <p className="text-gray-500 font-light mb-6">
                      Estamos integrando nossa plataforma para aceitar doações recorrentes e pontuais via cartão de crédito e boleto.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange font-bold text-xs uppercase tracking-widest rounded-full">
                      Em breve
                    </div>
                  </div>
                )}

              </div>
              
              <p className="text-center text-xs text-gray-400 mt-6 max-w-sm mx-auto">
                Dúvidas sobre como apoiar? Entre em <Link to="/instituto#contato" className="underline hover:text-brand-teal">contato</Link> com nossa equipe.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
