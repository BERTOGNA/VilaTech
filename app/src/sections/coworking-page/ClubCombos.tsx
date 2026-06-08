import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const ClubCombos = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'tradicional' | 'inovador'>('tradicional');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTab]); // Re-animate when tab changes

  const filteredCombos = precos.combos.filter(combo => combo.categoria === activeTab);

  return (
    <section id="combos" className="py-24 bg-void-black relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Smart Bundles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Combos Estratégicos
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Pacotes otimizados para necessidades específicas. Economize unindo posto de trabalho, salas de reunião e endereço fiscal.
          </p>

          <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('tradicional')}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'tradicional' 
                  ? 'bg-brand-cyan text-void-black shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Modelos Tradicionais
            </button>
            <button
              onClick={() => setActiveTab('inovador')}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'inovador' 
                  ? 'bg-brand-cyan text-void-black shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Modelos Inovadores
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCombos.map((combo, index) => (
            <div 
              key={combo.id}
              ref={el => { cardsRef.current[index] = el; }}
              className={`bg-void-black border ${combo.recomendado ? 'border-brand-cyan shadow-[0_0_20px_rgba(0,255,255,0.05)]' : 'border-white/10'} rounded-2xl p-8 flex flex-col hover:border-brand-cyan/30 transition-all duration-300 relative`}
            >
              {combo.recomendado && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cyan text-void-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                  Recomendado
                </span>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{combo.nome}</h3>
                <p className="text-white/60 text-sm h-10">{combo.descricao}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-brand-cyan">R$ {combo.preco}</span>
                  <span className="text-white/50 text-sm mb-1">/mês</span>
                </div>
                {combo.comparativo && (
                  <p className="text-xs text-brand-cyan/70 font-medium">{combo.comparativo}</p>
                )}
              </div>

              <div className="flex-grow space-y-4 mb-8">
                <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">O que está incluso</p>
                <ul className="space-y-3">
                  {combo.incluso.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-cyan shrink-0" />
                      <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 flex items-center justify-center gap-2 group transition-all duration-300">
                <span className="font-medium">Selecionar Plano</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubCombos;
