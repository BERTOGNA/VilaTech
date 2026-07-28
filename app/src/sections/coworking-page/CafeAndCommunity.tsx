import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Coffee, MessagesSquare, Smile, ShoppingCart, Disc } from 'lucide-react';

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
                  <h3 className="text-xl font-display font-bold text-white mb-1">Copa Completa</h3>
                  <p className="text-white/60 text-sm">Café fresco sempre disponível, microondas, geladeira e mesas para refeições ou bate-papos informais.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MessagesSquare className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">Áreas de Descompressão</h3>
                  <p className="text-white/60 text-sm">Sofás e pufes confortáveis espalhados estrategicamente para pausas produtivas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Smile className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">Recepção Acolhedora</h3>
                  <p className="text-white/60 text-sm">Um ambiente profissional para receber seus clientes e convidados desde o primeiro minuto.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-transparent border border-brand-cyan/20 hover:border-brand-cyan/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0">
                      <Disc className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <p className="text-brand-cyan font-bold text-[10px] uppercase tracking-widest">Parceria Premium</p>
                  </div>
                  <h3 className="text-white font-display font-bold text-xl mb-2">Clube do Vinil <br/>Wine & Coffee</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Experiência gastronômica e sensorial integrada ao ecossistema de inovação, unindo a paixão por discos de vinil, vinhos selecionados e cafés especiais.</p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5 text-orange-500" />
                    </div>
                    <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest">Conveniência 24/7</p>
                  </div>
                  <h3 className="text-white font-display font-bold text-xl mb-2">PL Honest<br/>Market</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Facilidade e conveniência 24/7 com um mercado autônomo dentro do hub. Compre lanches, bebidas e snacks no sistema de autoatendimento ("pegue e pague") com total praticidade e confiança.</p>
                </div>
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
