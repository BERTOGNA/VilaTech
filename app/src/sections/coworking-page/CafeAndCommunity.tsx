import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Coffee, MessagesSquare, Smile } from 'lucide-react';

const CafeAndCommunity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      tl.from(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(imagesRef.current?.children || [], {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-void-black relative border-t border-white/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Café & <span className="text-brand-cyan">Convivência</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Sabemos que as melhores ideias e parcerias muitas vezes surgem durante um café. Nosso espaço de descompressão foi projetado exatamente para facilitar esses encontros.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Coffee className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-1">Copa Completa</h4>
                  <p className="text-white/60 text-sm">Café fresco sempre disponível, microondas, geladeira e mesas para refeições ou bate-papos informais.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MessagesSquare className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-1">Áreas de Descompressão</h4>
                  <p className="text-white/60 text-sm">Sofás e pufes confortáveis espalhados estrategicamente para pausas produtivas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Smile className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-1">Recepção Acolhedora</h4>
                  <p className="text-white/60 text-sm">Um ambiente profissional para receber seus clientes e convidados desde o primeiro minuto.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20">
                <p className="text-brand-cyan font-bold text-sm uppercase tracking-widest mb-1">Parceria Estratégica</p>
                <h4 className="text-white font-display font-bold text-lg mb-2">Clube do Vinil Wine & Coffee</h4>
                <p className="text-white/60 text-xs leading-relaxed">Experiência gastronômica e sensorial integrada ao ecossistema de inovação.</p>
              </div>
            </div>
          </div>

          <div ref={imagesRef} className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img 
                src="/images/imgs_coworking/Recepção Vila Tech Hub.png" 
                alt="Recepção do Vila Tech Hub" 
                className="w-full h-64 object-cover rounded-2xl border border-white/10"
              />
            </div>
            <div className="space-y-4">
              <img 
                src="/images/imgs_coworking/Copa e Café.png" 
                alt="Copa e Café do Vila Tech Hub" 
                className="w-full h-80 object-cover rounded-2xl border border-white/10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CafeAndCommunity;
