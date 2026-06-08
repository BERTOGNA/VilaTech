import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { MonitorPlay, Users, Mic, Presentation, Plus } from 'lucide-react';

const OnDemandSpaces = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case 'sala-4p': return <MonitorPlay className="w-8 h-8 text-brand-cyan mb-4" />;
      case 'sala-8p': return <Users className="w-8 h-8 text-brand-cyan mb-4" />;
      case 'auditorio': return <Presentation className="w-8 h-8 text-brand-cyan mb-4" />;
      case 'estudio': return <Mic className="w-8 h-8 text-brand-cyan mb-4" />;
      default: return <Plus className="w-8 h-8 text-brand-cyan mb-4" />;
    }
  };

  return (
    <section id="espacos" className="py-24 bg-void-black relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Espaços On-Demand
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Salas de reunião, auditório e estúdio de gravação disponíveis quando você precisar. Reserve por hora ou por dia, sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {precos.espacos_on_demand.map((espaco, index) => (
            <div 
              key={espaco.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              {getIcon(espaco.id)}
              <h3 className="text-2xl font-display font-bold text-white mb-2">{espaco.nome}</h3>
              <p className="text-brand-cyan font-medium mb-6">{espaco.preco}</p>

              <div className="flex-grow space-y-6">
                <div>
                  <h4 className="text-white/50 text-sm uppercase tracking-wider mb-3">Equipamentos</h4>
                  <ul className="space-y-2">
                    {espaco.equipamentos.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white/50 text-sm uppercase tracking-wider mb-3">Diferenciais</h4>
                  <ul className="space-y-2">
                    {espaco.diferenciais.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <Plus className="w-4 h-4 text-brand-cyan/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-auto pt-3 pb-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-brand-cyan hover:text-void-black hover:border-brand-cyan font-medium transition-all duration-300">
                Ver Disponibilidade
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnDemandSpaces;
