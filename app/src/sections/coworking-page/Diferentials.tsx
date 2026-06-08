import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Network, MapPin } from 'lucide-react';

const Diferentials = () => {
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

  const diferentials = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-cyan" />,
      title: "Modelo de Negócio Sustentável",
      description: "Nosso ecossistema foi desenhado para garantir sustentabilidade a longo prazo, entregando máximo valor para os membros por meio de serviços consolidados e benefícios tangíveis."
    },
    {
      icon: <Network className="w-8 h-8 text-brand-cyan" />,
      title: "Mix de Soluções",
      description: "Muito além do espaço físico: combinamos infraestrutura de ponta, endereço fiscal, serviços digitais e programas de inovação em uma plataforma única de aceleração."
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-cyan" />,
      title: "Localização Estratégica",
      description: "Situado no coração do Itu Novo Centro, com fácil acesso às principais vias da cidade, estacionamento amplo e proximidade a serviços essenciais."
    }
  ];

  return (
    <section className="pt-24 pb-12 bg-void-black relative border-t border-white/5" ref={sectionRef}>
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Por que o Vila Tech Hub?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Não somos apenas um escritório compartilhado. Somos um polo de tecnologia estruturado para fomentar negócios reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diferentials.map((dif, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-brand-cyan/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-void-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {dif.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{dif.title}</h3>
              <p className="text-white/60 leading-relaxed">{dif.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diferentials;
