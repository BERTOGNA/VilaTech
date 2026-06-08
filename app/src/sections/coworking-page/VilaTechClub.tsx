import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { Zap, Wifi, Users, Gift, ChevronRight } from 'lucide-react';

const VilaTechClub = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getIcon = (index: number) => {
    const icons = [
      <Wifi className="w-8 h-8 text-brand-cyan" />,
      <Users className="w-8 h-8 text-brand-cyan" />,
      <Gift className="w-8 h-8 text-brand-cyan" />,
      <Zap className="w-8 h-8 text-brand-cyan" />
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="clube" className="py-24 bg-gradient-to-br from-void-black via-[#0a0a0a] to-[#051515] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Clube Vila Tech
            </h2>
            <p className="text-lg text-white/80 font-medium mb-8">
              A comunidade exclusiva do hub. Faça parte da rede que está transformando Itu e região, com acesso a conteúdos, networking e descontos.
            </p>
            
            <div className="bg-void-black/60 backdrop-blur-md text-white p-6 rounded-2xl border border-brand-cyan/20 shadow-2xl">
              <p className="text-sm text-brand-cyan uppercase tracking-wider mb-2 font-semibold">Assinatura Anual</p>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold text-white">R$ {precos.clube.anual.preco}</span>
                <span className="text-white/50 text-sm mb-1">/ano</span>
              </div>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                {precos.clube.anual.descricao}
              </p>
              <button className="w-full py-4 bg-brand-cyan text-void-black font-display font-semibold uppercase tracking-wide rounded-xl hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group">
                Seja Membro
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {precos.clube.anual.beneficios.map((beneficio, index) => (
                <div 
                  key={index}
                  ref={el => { cardsRef.current[index] = el; }}
                  className="bg-void-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">
                    {getIcon(index)}
                  </div>
                  <p className="text-white font-semibold text-lg leading-snug">{beneficio}</p>
                </div>
              ))}
            </div>

            <div className="bg-void-black/20 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h4 className="text-2xl font-display font-bold text-white mb-8 text-center uppercase tracking-wider">Níveis de Fidelidade</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {precos.clube.niveis.map((nivel, idx) => (
                  <div key={idx} className="bg-void-black/60 rounded-2xl p-6 border border-white/5 hover:border-brand-cyan/50 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-display font-bold text-xl">{nivel.nivel}</span>
                        <div className="bg-brand-cyan/20 px-2 py-1 rounded text-[10px] font-bold text-brand-cyan uppercase tracking-wider">
                          {nivel.desconto === 'Especial' ? 'Especial' : `${nivel.desconto}% OFF`}
                        </div>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">{nivel.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VilaTechClub;
