import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import precos from '../../data/precos.json';
import { Check } from 'lucide-react';

const PricingTable = () => {
  const [discountLevel, setDiscountLevel] = useState<'base' | 'prata' | 'ouro' | 'diamante'>('base');
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const DISCOUNTS = {
    base: 0,
    prata: 0.1,
    ouro: 0.2,
    diamante: 0.3
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tableRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="precos" className="py-24 bg-void-black relative border-t border-white/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">
            Simule seu Benefício <span className="text-brand-cyan">Clube Vila Tech</span>
          </h2>
          
          <div className="inline-flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 relative overflow-hidden">
            {(['base', 'prata', 'ouro', 'diamante'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDiscountLevel(level)}
                className={`relative px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 z-10 ${
                  discountLevel === level ? 'text-void-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {level === 'base' ? 'Preço Base' : `${level} (${DISCOUNTS[level] * 100}%)`}
                {discountLevel === level && (
                  <div
                    className="absolute inset-0 bg-brand-cyan rounded-xl -z-10 shadow-[0_0_20px_rgba(0,255,249,0.4)] transition-all duration-300"
                  />
                )}
              </button>
            ))}
          </div>
          
          <p className="mt-6 text-white/40 text-xs md:text-sm max-w-lg text-center">
            {discountLevel === 'base' 
              ? 'Selecione um nível do Clube para ver os descontos exclusivos aplicados.'
              : `Benefício do nível ${discountLevel.charAt(0).toUpperCase() + discountLevel.slice(1)} ativado: ${DISCOUNTS[discountLevel] * 100}% de desconto em todos os serviços.`}
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto pb-8">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-6 text-left text-white/60 font-semibold uppercase tracking-wider text-sm w-[40%]">Solução</th>
                <th className="py-6 px-6 text-left text-white/60 font-semibold uppercase tracking-wider text-sm w-[20%]">Preço Inicial</th>
                <th className="py-6 px-6 text-left text-white/60 font-semibold uppercase tracking-wider text-sm w-[20%]">Ideal Para</th>
                <th className="py-6 px-6 text-center text-white/60 font-semibold uppercase tracking-wider text-sm w-[20%]">Acesso a Rede</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              
              {/* Postos de Trabalho */}
              <tr className="bg-white/5"><td colSpan={4} className="py-4 px-6 text-brand-cyan font-bold uppercase tracking-widest text-xs">Postos de Trabalho</td></tr>
              {precos.postos.map((item, idx) => {
                const basePrice = item.mensal || item.hora;
                const discount = DISCOUNTS[discountLevel];
                const finalPrice = basePrice ? Math.floor(basePrice * (1 - discount)) : basePrice;

                return (
                  <tr key={`posto-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6">
                      <p className="text-white font-medium group-hover:text-brand-cyan transition-colors">{item.nome}</p>
                      <p className="text-white/50 text-xs">{item.descricao}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-all duration-300 ${discountLevel !== 'base' ? 'text-brand-cyan text-lg' : 'text-white'}`}>
                          R$ {finalPrice} {item.mensal ? '/mês' : '/hora'}
                        </span>
                        {discountLevel !== 'base' && basePrice && (
                          <span className="text-[10px] text-white/30 line-through">R$ {basePrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-white/80 text-sm">
                      {item.nome.includes('Individual') || item.nome.includes('Diária') ? 'Freelancers' : 'Equipes'}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                    </td>
                  </tr>
                );
              })}

              {/* Espaços On-Demand */}
              <tr className="bg-white/5"><td colSpan={4} className="py-4 px-6 text-brand-cyan font-bold uppercase tracking-widest text-xs">Espaços On-Demand</td></tr>
              {precos.espacos_on_demand.map((item: any, idx) => {
                const discount = DISCOUNTS[discountLevel];
                const finalPrice = Math.floor(item.valor * (1 - discount));
                
                return (
                  <tr key={`ondemand-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6">
                      <p className="text-white font-medium group-hover:text-brand-cyan transition-colors">{item.nome}</p>
                      <p className="text-white/50 text-xs">{item.capacidade}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-all duration-300 ${discountLevel !== 'base' ? 'text-brand-cyan text-lg' : 'text-white'}`}>
                          R$ {finalPrice} {item.id === 'auditorio' ? '/ 4h' : '/hora'}
                        </span>
                        {discountLevel !== 'base' && (
                          <span className="text-[10px] text-white/30 line-through">R$ {item.valor}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-white/80 text-sm">Eventos e Reuniões</td>
                    <td className="py-5 px-6 text-center">
                      <Check className="w-5 h-5 text-brand-cyan opacity-70 mx-auto" />
                    </td>
                  </tr>
                );
              })}

              {/* Endereço Virtual */}
              <tr className="bg-white/5"><td colSpan={4} className="py-4 px-6 text-brand-cyan font-bold uppercase tracking-widest text-xs">Endereço Virtual</td></tr>
              {precos.endereco_virtual.map((item, idx) => {
                const discount = DISCOUNTS[discountLevel];
                const finalPrice = Math.floor(item.preco * (1 - discount));

                return (
                  <tr key={`ev-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6">
                      <p className="text-white font-medium group-hover:text-brand-cyan transition-colors">{item.nome}</p>
                      <p className="text-white/50 text-xs">Endereço Fiscal & Virtual</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-all duration-300 ${discountLevel !== 'base' ? 'text-brand-cyan text-lg' : 'text-white'}`}>
                          R$ {finalPrice} /mês
                        </span>
                        {discountLevel !== 'base' && (
                          <span className="text-[10px] text-white/30 line-through">R$ {item.preco}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-white/80 text-sm">Empresas Remotas</td>
                    <td className="py-5 px-6 text-center">
                      <Check className="w-5 h-5 text-brand-cyan opacity-50 mx-auto" />
                    </td>
                  </tr>
                );
              })}

              {/* Combos Clube */}
              <tr className="bg-white/5"><td colSpan={4} className="py-4 px-6 text-brand-cyan font-bold uppercase tracking-widest text-xs">Combos Clube</td></tr>
              {precos.combos.map((item, idx) => {
                const discount = DISCOUNTS[discountLevel];
                const finalPrice = Math.floor(item.preco * (1 - discount));

                return (
                  <tr key={`combo-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6">
                      <p className="text-white font-medium group-hover:text-brand-cyan transition-colors">{item.nome}</p>
                      <p className="text-white/50 text-xs">{item.descricao}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-all duration-300 ${discountLevel !== 'base' ? 'text-brand-cyan text-lg' : 'text-white'}`}>
                          R$ {finalPrice} /mês
                        </span>
                        {discountLevel !== 'base' && (
                          <span className="text-[10px] text-white/30 line-through">R$ {item.preco}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-white/80 text-sm">Alta Performance</td>
                    <td className="py-5 px-6 text-center">
                      <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                    </td>
                  </tr>
                );
              })}

              {/* Programas de Inovação */}
              <tr className="bg-white/5"><td colSpan={4} className="py-4 px-6 text-brand-cyan font-bold uppercase tracking-widest text-xs">Inovação Startup</td></tr>
              {precos.inovacao.map((item, idx) => {
                const discount = DISCOUNTS[discountLevel];
                const finalPrice = Math.floor(item.preco * (1 - discount));

                return (
                  <tr key={`inov-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6">
                      <p className="text-white font-medium group-hover:text-brand-cyan transition-colors">{item.nome}</p>
                      <p className="text-white/50 text-xs">{item.duracao}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-all duration-300 ${discountLevel !== 'base' ? 'text-brand-cyan text-lg' : 'text-white'}`}>
                          R$ {finalPrice} /{item.tipo.toLowerCase()}
                        </span>
                        {discountLevel !== 'base' && (
                          <span className="text-[10px] text-white/30 line-through">R$ {item.preco}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-white/80 text-sm">Startups e Devs</td>
                    <td className="py-5 px-6 text-center">
                      <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                    </td>
                  </tr>
                );
              })}

              {/* Clube Vila Tech */}
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-5 px-6">
                  <p className="text-white font-medium">Clube Vila Tech</p>
                  <p className="text-white/50 text-xs">{precos.clube.anual.descricao}</p>
                </td>
                <td className="py-5 px-6 text-brand-cyan font-semibold">
                  R$ {precos.clube.anual.preco} /ano
                </td>
                <td className="py-5 px-6 text-white/80 text-sm">Networking e Eventos</td>
                <td className="py-5 px-6 text-center">
                  <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
