import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { Rocket, Code, Laptop, Calendar, GraduationCap, ArrowRight } from 'lucide-react';

const InnovationPrograms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getIcon = (icone: string) => {
    switch (icone) {
      case 'seed': return <Rocket className="w-6 h-6 text-brand-cyan" />;
      case 'residency': return <Laptop className="w-6 h-6 text-brand-cyan" />;
      case 'dev': return <Code className="w-6 h-6 text-brand-cyan" />;
      case 'hackathon': return <Calendar className="w-6 h-6 text-brand-cyan" />;
      case 'alumni': return <GraduationCap className="w-6 h-6 text-brand-cyan" />;
      default: return <Rocket className="w-6 h-6 text-brand-cyan" />;
    }
  };

  return (
    <section id="inovacao" className="py-24 bg-void-black relative border-t border-white/10" ref={sectionRef}>
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[100px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Programas de Inovação
            </h2>
            <p className="text-lg text-white/70">
              Imersão, aceleração e eventos focados no seu crescimento técnico e de negócios. 
              Vá muito além de um espaço físico.
            </p>
          </div>
          <button className="px-6 py-3 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-brand-cyan hover:text-void-black hover:border-brand-cyan font-medium transition-all duration-300 whitespace-nowrap self-start md:self-auto">
            Ver Calendário Completo
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {precos.inovacao.map((programa, index) => (
            <div 
              key={programa.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-void-black border border-white/10 rounded-2xl p-6 flex flex-col hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {getIcon(programa.icone)}
              </div>
              
              <h3 className="text-xl font-display font-bold text-white mb-2">{programa.nome}</h3>
              <p className="text-white/60 text-sm mb-6 flex-grow">{programa.descricao}</p>

              <div className="pt-6 border-t border-white/10 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Duração</p>
                    <p className="text-white font-medium text-sm">{programa.duracao}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-cyan font-bold text-lg">R$ {programa.preco}</p>
                    <p className="text-white/40 text-xs">/{programa.tipo.toLowerCase()}</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-white/5 text-white/80 text-sm font-medium rounded-lg group-hover:bg-brand-cyan group-hover:text-void-black transition-colors duration-300 flex items-center justify-center gap-2">
                  <span>Conhecer {programa.nome}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationPrograms;
