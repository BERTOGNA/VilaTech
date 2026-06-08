import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { MapPin, Building, Mail, Phone, Check } from 'lucide-react';

const VirtualOffice = () => {
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
          stagger: 0.2,
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

  return (
    <section id="virtual" className="py-24 bg-void-black relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Endereço Fiscal & Virtual
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Formalize seu negócio com um endereço de prestígio em Itu. A solução perfeita para quem trabalha remoto mas precisa de uma base corporativa profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {precos.endereco_virtual.map((plano, index) => (
            <div 
              key={plano.id}
              ref={el => { cardsRef.current[index] = el; }}
              className={`bg-void-black border ${plano.popular ? 'border-brand-cyan shadow-[0_0_30px_rgba(0,255,255,0.1)]' : 'border-white/10'} rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:border-brand-cyan/50 hover:-translate-y-2`}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-cyan text-void-black text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Mais Escolhido
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">{plano.nome}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">R$ {plano.preco}</span>
                  <span className="text-white/50 text-sm mb-1">/{plano.tipo.toLowerCase()}</span>
                </div>
              </div>

              <div className="space-y-4 flex-grow mb-8">
                {plano.beneficios.map((beneficio, i) => {
                  let Icon = Check;
                  if (beneficio.includes('Endereço Fiscal')) Icon = MapPin;
                  if (beneficio.includes('Comercial')) Icon = Building;
                  if (beneficio.includes('correspondências')) Icon = Mail;
                  if (beneficio.includes('telefônico')) Icon = Phone;

                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm leading-relaxed">{beneficio}</span>
                    </div>
                  );
                })}
              </div>

              <button className={`w-full mt-auto py-4 rounded-xl font-display font-semibold tracking-wide uppercase transition-all duration-300 ${
                plano.popular 
                  ? 'bg-brand-cyan text-void-black hover:bg-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                Assinar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualOffice;
