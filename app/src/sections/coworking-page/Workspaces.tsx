import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { Check, Clock, Calendar, ShieldCheck, Zap } from 'lucide-react';

const Workspaces = () => {
  const [activeTab, setActiveTab] = useState<'hora' | 'mensal' | 'semestral' | 'anual'>('mensal');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação inicial
      gsap.fromTo(cardsRef.current, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animação ao trocar de tab
    gsap.fromTo(cardsRef.current, 
      { opacity: 0, scale: 0.98, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
    );
  }, [activeTab]);

  const tabs = [
    { id: 'hora', label: 'Hora', icon: Clock },
    { id: 'mensal', label: 'Mensal', icon: Calendar },
    { id: 'semestral', label: 'Semestral', icon: ShieldCheck },
    { id: 'anual', label: 'Anual', icon: Zap },
  ] as const;

  return (
    <section id="postos" ref={sectionRef} className="pt-12 pb-24 bg-void-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Postos de Trabalho
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Design focado em produtividade. Estações ergonômicas, internet redundante e ambiente climatizado para você entregar o seu melhor.
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-brand-cyan text-void-black shadow-[0_0_20px_rgba(0,255,249,0.3)]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {precos.postos.map((posto, index) => {
            const price = posto[activeTab];
            const isConsult = price === null;

            return (
              <div 
                key={`${posto.id}-${activeTab}`}
                ref={el => { cardsRef.current[index] = el; }}
                className={`relative bg-void-black/40 backdrop-blur-md border ${posto.destaque && activeTab === 'anual' ? 'border-brand-cyan shadow-[0_0_30px_rgba(0,255,249,0.1)]' : 'border-white/10'} rounded-2xl p-6 flex flex-col hover:border-brand-cyan/50 transition-all duration-500 group`}
              >
                {posto.destaque && activeTab === 'anual' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cyan text-void-black text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    {posto.destaque}
                  </span>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-brand-cyan transition-colors duration-300">
                    {posto.nome}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{posto.descricao}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {!isConsult && <span className="text-sm text-white/40 font-medium">R$</span>}
                    <span className={`${isConsult ? 'text-2xl' : 'text-4xl'} font-bold text-white tracking-tight`}>
                      {isConsult ? 'Sob consulta' : price}
                    </span>
                    {!isConsult && (
                      <span className="text-white/40 text-sm">
                        /{activeTab === 'hora' ? 'h' : 'mês'}
                      </span>
                    )}
                  </div>
                  {activeTab === 'semestral' && (
                    <p className="text-[10px] text-brand-cyan/70 mt-1 font-medium uppercase tracking-wider">Compromisso de 6 meses</p>
                  )}
                  {activeTab === 'anual' && (
                    <p className="text-[10px] text-brand-cyan/70 mt-1 font-medium uppercase tracking-wider">Compromisso de 12 meses</p>
                  )}
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {posto.incluso.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-brand-cyan/10 p-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      </div>
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full mt-auto py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                  posto.destaque && activeTab === 'anual'
                    ? 'bg-brand-cyan text-void-black hover:bg-white hover:scale-[1.02]' 
                    : 'bg-white/5 text-white hover:bg-brand-cyan hover:text-void-black hover:scale-[1.02]'
                }`}>
                  Reservar Agora
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workspaces;
