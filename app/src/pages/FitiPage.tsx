import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function FitiPage() {
  const [activeTab, setActiveTab] = useState('human');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#11110f] text-[#f3f0e8] font-sans min-h-screen scroll-smooth">
      <SEO
        title="FITI — O futuro encontra lugar em Itu"
        description="FITI — Festival de Inovação, Criatividade e Tecnologia de Itu. Uma cidade-campus para ideias, negócios e cultura."
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[66px] lg:h-[82px] px-6 lg:px-[4vw] flex items-center justify-between bg-[#11110f]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <a href="/" className="flex items-center text-white no-underline w-[175px] lg:w-auto">
          <img src="/images/logo-vila-tech.svg" alt="Instituto Vila Tech" className="max-h-[40px] lg:max-h-[42px] object-contain object-left" />
        </a>
        <button className="lg:hidden text-white uppercase text-[0.78rem] tracking-[0.12em] font-extrabold" onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
        <nav className={`lg:flex items-center gap-6 ${isMenuOpen ? 'flex flex-col absolute top-[66px] left-0 right-0 bg-[#11110f] p-6 pb-8 border-b border-white/10' : 'hidden'}`}>
          <a href="#visao" onClick={() => setIsMenuOpen(false)} className="text-[0.78rem] uppercase tracking-[0.12em] font-bold hover:text-[#c8d400] py-2 lg:py-0 transition-colors">Visão</a>
          <a href="#formato" onClick={() => setIsMenuOpen(false)} className="text-[0.78rem] uppercase tracking-[0.12em] font-bold hover:text-[#c8d400] py-2 lg:py-0 transition-colors">Formato</a>
          <a href="#cidade" onClick={() => setIsMenuOpen(false)} className="text-[0.78rem] uppercase tracking-[0.12em] font-bold hover:text-[#c8d400] py-2 lg:py-0 transition-colors">Cidade</a>
          <a href="#curadoria" onClick={() => setIsMenuOpen(false)} className="text-[0.78rem] uppercase tracking-[0.12em] font-bold hover:text-[#c8d400] py-2 lg:py-0 transition-colors">Curadoria</a>
          <a href="#parcerias" onClick={() => setIsMenuOpen(false)} className="border border-current px-4 py-3 text-[0.78rem] text-center uppercase tracking-[0.12em] font-bold hover:bg-[#c8d400] hover:text-[#11110f] hover:border-[#c8d400] mt-2 lg:mt-0 transition-colors">Construir o FITI</a>
        </nav>
      </header>

      <main id="conteudo">
        {/* 01 / Hero */}
        <section id="inicio" className="relative min-h-[100svh] grid items-end overflow-hidden bg-[#11110f] text-[#f3f0e8] pt-[82px]">
          <div className="absolute inset-0 bg-[url('/images/fiti/bom-jesus-mapping.webp')] bg-[55%_center] bg-cover bg-no-repeat scale-[1.02]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f]/95 via-[#11110f]/70 to-[#11110f]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110f]/90 to-transparent h-1/2 bottom-0 top-auto"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-gradient-to-r from-[#3fbdd8] via-[#c8d400] via-40% to-[#e83a79] via-60% to-[#f59d22]"></div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[4vw] pb-[118px] flex flex-col items-center text-center">
            <img src="/images/fiti/marca_FITI.png" alt="FITI" className="w-[800px] max-w-full fade-up object-contain" />
            <div className="w-full max-w-[800px] flex justify-between uppercase text-[0.6rem] sm:text-[0.8rem] md:text-[1.2rem] lg:text-[1.4rem] font-bold mt-4 mb-8 fade-up text-[#f3f0e8]">
              <span>O</span>
              <span>F</span><span>U</span><span>T</span><span>U</span><span>R</span><span>O</span>
              <span>E</span><span>N</span><span>C</span><span>O</span><span>N</span><span>T</span><span>R</span><span>A</span>
              <span>L</span><span>U</span><span>G</span><span>A</span><span>R</span>
              <span>E</span><span>M</span>
              <span>I</span><span>T</span><span>U</span>
            </div>
            <p className="max-w-[670px] text-[clamp(1.05rem,2vw,1.45rem)] leading-snug fade-up">Quatro dias para criatividade, tecnologia e negócios ocuparem a cidade — e transformarem patrimônio em plataforma.</p>
          </div>
          <div className="absolute z-10 bottom-[28px] left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 lg:gap-10 text-[0.68rem] uppercase tracking-[0.16em] font-bold w-[calc(100%-2rem)]">
            <span>MVP · 3–4 dias</span>
            <span>Quinta → domingo</span>
            <span>Cidade-campus</span>
          </div>
        </section>

        {/* 02 / Formato */}
        <section id="visao" className="bg-[#f3f0e8] text-[#11110f] py-[clamp(6rem,11vw,11rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw] grid lg:grid-cols-[1fr_4fr] gap-8 lg:gap-[4vw]">
            <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold m-0">02 / Formato</p>
            <div>
              <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,8rem)] fade-up">Itu não será cenário.<br /><span className="text-[#e83a79]">Será interface.</span></h2>
              <p className="max-w-[900px] text-[clamp(1.35rem,2.7vw,2.3rem)] leading-tight mt-12 fade-up">O FITI nasce para aproximar quem decide, quem cria e quem transforma. Um festival distribuído por fábricas históricas, museus, hubs, praças, parques e mesas da cidade — com uma agenda única e uma experiência que começa na rua.</p>
              <div className="mt-16 py-5 border-y-2 border-[#11110f] flex gap-4 flex-wrap items-baseline uppercase font-bold text-[clamp(0.85rem,1.5vw,1.15rem)] fade-up">
                <span>Memória</span><b className="text-[#e83a79]">×</b><span>Imaginação</span><b className="text-[#e83a79]">×</b><span>Capital</span><b className="text-[#e83a79]">=</b><strong className="text-[#6b4494] font-bold">futuro praticável</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 03 / Arquitetura */}
        <section id="formato" className="bg-[#e83a79] text-[#11110f] py-[clamp(6rem,10vw,10rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw]">
            <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">03 / Arquitetura da experiência</p>
            <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,8rem)] max-w-[12ch]">Três circuitos.<br />Um festival inteiro.</h2>

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 border-2 border-[#11110f]">
              <article className="min-h-[360px] lg:min-h-[520px] p-8 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#11110f] fade-up">
                <p className="uppercase tracking-[0.16em] text-[0.7rem] font-extrabold">01 / Conteúdo</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3rem,5vw,5.4rem)]">FITI<br />Conversa</h3>
                <span className="max-w-[28rem]">Keynotes, painéis, masterclasses e encontros editoriais para líderes e criadores.</span>
              </article>
              <article className="min-h-[360px] lg:min-h-[520px] p-8 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#11110f] bg-[#11110f] text-[#f3f0e8] fade-up">
                <p className="uppercase tracking-[0.16em] text-[0.7rem] font-extrabold">02 / Mercado</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3rem,5vw,5.4rem)]">FITI<br />Negócios</h3>
                <span className="max-w-[28rem]">Rodadas, pitch sessions, mentorias e conexões entre empresas, startups e capital.</span>
              </article>
              <article className="min-h-[360px] lg:min-h-[520px] p-8 flex flex-col bg-[#f59d22] fade-up">
                <p className="uppercase tracking-[0.16em] text-[0.7rem] font-extrabold">03 / Cidade</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3rem,5vw,5.4rem)]">FITI<br />Viva</h3>
                <span className="max-w-[28rem]">Arte, música, cinema, gastronomia e experiências gratuitas ou acessíveis.</span>
              </article>
            </div>
          </div>
        </section>

        {/* 04 / Pilares Editoriais */}
        <section className="bg-[#f3f0e8] text-[#11110f] py-[clamp(6rem,10vw,10rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw]">
            <div className="grid lg:grid-cols-[1.65fr_0.7fr] gap-8 lg:gap-[8vw] items-end mb-[clamp(3rem,7vw,6rem)]">
              <div>
                <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">04 / Pilares editoriais</p>
                <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,6.8rem)]">Conexão de<br />mentes inovadoras.</h2>
              </div>
              <p className="text-[1.1rem] max-w-[34rem] leading-relaxed">O diferencial está nas intersecções: saúde encontra dados; arquitetura encontra clima; cinema encontra IA; gastronomia encontra bioeconomia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-[#11110f]">
              <button onClick={() => setActiveTab('human')} className={`text-left p-6 lg:p-6 border-b-2 lg:border-b-2 border-[#11110f] font-extrabold text-[clamp(1rem,1.5vw,1.35rem)] transition-colors ${activeTab === 'human' ? 'bg-[#11110f] text-[#f3f0e8]' : 'bg-transparent text-[#11110f] md:border-r border-[#11110f]/20 hover:bg-[#11110f]/5'}`}>
                <span className="block mb-4 text-[0.7rem] tracking-[0.18em] font-normal">01</span> Ser Humano
              </button>
              <button onClick={() => setActiveTab('creative')} className={`text-left p-6 lg:p-6 border-b-2 lg:border-b-2 border-[#11110f] font-extrabold text-[clamp(1rem,1.5vw,1.35rem)] transition-colors ${activeTab === 'creative' ? 'bg-[#11110f] text-[#f3f0e8]' : 'bg-transparent text-[#11110f] md:border-r border-[#11110f]/20 hover:bg-[#11110f]/5'}`}>
                <span className="block mb-4 text-[0.7rem] tracking-[0.18em] font-normal">02</span> Economia Criativa
              </button>
              <button onClick={() => setActiveTab('tech')} className={`text-left p-6 lg:p-6 border-b-2 lg:border-b-2 border-[#11110f] font-extrabold text-[clamp(1rem,1.5vw,1.35rem)] transition-colors ${activeTab === 'tech' ? 'bg-[#11110f] text-[#f3f0e8]' : 'bg-transparent text-[#11110f] hover:bg-[#11110f]/5'}`}>
                <span className="block mb-4 text-[0.7rem] tracking-[0.18em] font-normal">03</span> Techs & IA
              </button>
            </div>

            <div className="mt-8 fade-up min-h-[420px]">
              {activeTab === 'human' && (
                <article className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-[8vw] py-12 lg:py-16">
                  <div>
                    <p className="uppercase tracking-[0.14em] text-[0.7rem] font-extrabold">Viver melhor é uma agenda de inovação.</p>
                    <h3 className="font-black uppercase tracking-tighter leading-[0.9] text-[clamp(2.7rem,5.5vw,5.8rem)] max-w-[13ch] mt-5">Do bem-estar individual ao futuro das cidades.</h3>
                  </div>
                  <ul className="self-end lg:text-right w-full">
                    {['Educação', 'Saúde & wellness', 'Cidades inteligentes', 'Saúde no trabalho', 'Sustentabilidade & bioeconomia'].map((item, i) => (
                      <li key={i} className="py-3 border-b border-black/10 text-[1.15rem]">{item}</li>
                    ))}
                  </ul>
                </article>
              )}
              {activeTab === 'creative' && (
                <article className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-[8vw] py-12 lg:py-16">
                  <div>
                    <p className="uppercase tracking-[0.14em] text-[0.7rem] font-extrabold">Criatividade também é infraestrutura econômica.</p>
                    <h3 className="font-black uppercase tracking-tighter leading-[0.9] text-[clamp(2.7rem,5.5vw,5.8rem)] max-w-[13ch] mt-5">Ideias autorais que movem repertório, desejo e renda.</h3>
                  </div>
                  <ul className="self-end lg:text-right w-full">
                    {['Design & publicidade', 'Cinema & audiovisual', 'Arquitetura', 'Música, literatura & artes', 'Gastronomia'].map((item, i) => (
                      <li key={i} className="py-3 border-b border-black/10 text-[1.15rem]">{item}</li>
                    ))}
                  </ul>
                </article>
              )}
              {activeTab === 'tech' && (
                <article className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-[8vw] py-12 lg:py-16">
                  <div>
                    <p className="uppercase tracking-[0.14em] text-[0.7rem] font-extrabold">Tecnologia ganha sentido quando resolve o real.</p>
                    <h3 className="font-black uppercase tracking-tighter leading-[0.9] text-[clamp(2.7rem,5.5vw,5.8rem)] max-w-[13ch] mt-5">Capital, inteligência e novos produtos em circulação.</h3>
                  </div>
                  <ul className="self-end lg:text-right w-full">
                    {['Tecnologia & negócios', 'Startups', 'Inovação digital', 'Inteligência artificial', 'Gaming'].map((item, i) => (
                      <li key={i} className="py-3 border-b border-black/10 text-[1.15rem]">{item}</li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* 05 / Cidade */}
        <section id="cidade" className="bg-[#11110f] text-[#f3f0e8] pt-[clamp(6rem,10vw,10rem)] pb-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw] grid lg:grid-cols-[1.65fr_0.7fr] gap-8 lg:gap-[8vw] items-end mb-[clamp(3rem,7vw,6rem)]">
            <div>
              <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">05 / Itu como cidade-campus</p>
              <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,5.5rem)] max-w-[16ch]">Uma cidade em movimento: Vários endereços, uma programação integrada</h2>
            </div>
            <p className="text-[1.1rem] max-w-[34rem] leading-relaxed">Cada espaço assume uma vocação. O público cruza a cidade seguindo interesses, encontros e descobertas.</p>
          </div>

          <div className="w-full lg:max-w-[1600px] mx-auto">
            {[
              { img: 'bom-jesus-mapping.webp', label: 'Centro histórico · abertura', title: 'Itu em Luz', desc: 'Video mapping autoral transforma a memória arquitetônica em narrativa de futuro.' },
              { img: 'varvito-orquestra.webp', label: 'Parque do Varvito · música', title: 'Sinfonia das Camadas', desc: 'Orquestra, eletrônica e paisagem geológica em um concerto criado para o lugar.' },
              { img: 'fama-imersiva.webp', label: 'FAMA Museu · arte & cinema', title: 'FAMA Imersiva', desc: 'Instalações, arte generativa e uma mostra audiovisual expandida noite adentro.' },
              { img: 'fabrica-design.webp', label: 'Fábrica São Luiz · design', title: 'Futuros que se Fabricam', desc: 'Arquitetura, design e economia criativa em diálogo com o patrimônio industrial.' },
              { img: 'praca-carmo.webp', label: 'Praças & gastronomia · cidade', title: 'Praça em Movimento', desc: 'Shows, feira criativa, experiências de marca e uma rota gastronômica conectam o festival à vida cotidiana.' },
            ].map((story, i) => (
              <article key={i} className="relative min-h-[72svh] lg:min-h-[82svh] overflow-hidden grid items-end mb-4 group">
                <img src={`/images/fiti/${story.img}`} alt={story.title} className="absolute inset-0 w-full h-full object-cover opacity-80 scale-[1.01] transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11110f]/95 via-[#11110f]/40 to-transparent h-[70%] bottom-0 top-auto"></div>
                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[4vw] py-20 grid md:grid-cols-[1fr_1.7fr_1fr] gap-4 lg:gap-[4vw] items-end fade-up">
                  <p className="uppercase tracking-[0.16em] text-[0.68rem] font-extrabold">{story.label}</p>
                  <h3 className="m-0 font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,6vw,7rem)]">{story.title}</h3>
                  <span className="text-[1rem] md:col-start-2 lg:col-start-3">{story.desc}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="max-w-[1440px] mx-auto px-6 lg:px-[4vw] mt-8 text-white/60 text-[0.72rem]">Imagens conceituais produzidas a partir de registros reais dos espaços de Itu. Programação e autorias em desenvolvimento.</p>
        </section>

        {/* 06 / MVP */}
        <section className="bg-[#c8d400] text-[#11110f] py-[clamp(5rem,8vw,8rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw]">
            <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">06 / Ritmo do MVP</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 border-[#11110f]">
              {[
                { day: 'QUI', title: 'Horizontes', desc: 'Abertura, líderes, futuro humano e a cidade como plataforma.' },
                { day: 'SEX', title: 'Capital & código', desc: 'IA, negócios, startups, investidores e inteligência aplicada.' },
                { day: 'SÁB', title: 'Imaginação', desc: 'Economia criativa, cinema, design, música, arte e gastronomia.' },
                { day: 'DOM', title: 'Cidade viva', desc: 'Programação popular, famílias, experiências públicas e grande encerramento.' },
              ].map((item, i) => (
                <article key={i} className={`p-8 lg:px-6 lg:py-8 border-b md:border-b border-[#11110f]/35 fade-up ${i % 2 === 0 ? 'md:border-r' : ''} ${i !== 3 ? 'lg:border-r' : ''}`}>
                  <span className="block font-black tracking-tighter text-[clamp(2.8rem,5vw,5rem)] leading-none">{item.day}</span>
                  <h3 className="mt-10 mb-2 text-[1.2rem] font-bold">{item.title}</h3>
                  <p className="text-[1rem] leading-relaxed opacity-80">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 07 / Curadoria */}
        <section id="curadoria" className="bg-[#f3f0e8] text-[#11110f] py-[clamp(6rem,10vw,10rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw]">
            <div className="grid lg:grid-cols-[1.65fr_0.7fr] gap-8 lg:gap-[8vw] items-end mb-[clamp(3rem,7vw,6rem)]">
              <div>
                <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">07 / Mapa curatorial</p>
                <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,6.8rem)]">Vozes que impactam<br />mentes e mercados.</h2>
              </div>
              <p className="text-[1.1rem] max-w-[34rem] leading-relaxed">Uma curadoria que combina alcance, consistência, presença contemporânea e capacidade de criar conversa depois do palco.</p>
            </div>

            <p className="inline-block bg-[#11110f] text-[#f3f0e8] px-4 py-2 mb-6 uppercase tracking-[0.12em] text-[0.68rem] font-extrabold">Nomes em prospecção · sujeitos a convite, agenda e confirmação</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 border-2 border-[#11110f] border-b-0 lg:border-b-2">
              <article className="min-h-[360px] lg:min-h-[430px] p-8 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#11110f] bg-[#c8d400] fade-up">
                <p className="uppercase tracking-[0.13em] text-[0.7rem] font-extrabold">Estrela · Ser Humano</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3.1rem,5vw,5.2rem)]">Ailton<br />Krenak</h3>
                <span>Pensamento, território e futuros possíveis.</span>
              </article>
              <article className="min-h-[360px] lg:min-h-[430px] p-8 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#11110f] bg-[#f59d22] fade-up">
                <p className="uppercase tracking-[0.13em] text-[0.7rem] font-extrabold">Estrela · Economia Criativa</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3.1rem,5vw,5.2rem)]">Fernando<br />Meirelles</h3>
                <span>Cinema brasileiro com circulação global.</span>
              </article>
              <article className="min-h-[360px] lg:min-h-[430px] p-8 flex flex-col bg-[#3fbdd8] fade-up">
                <p className="uppercase tracking-[0.13em] text-[0.7rem] font-extrabold">Estrela · Techs & IA · China</p>
                <h3 className="my-auto font-black uppercase tracking-tighter leading-[0.82] text-[clamp(3.1rem,5vw,5.2rem)]">Kai-Fu<br />Lee</h3>
                <span>IA, empreendedorismo e a ponte China–mundo.</span>
              </article>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-x-2 border-b-2 border-[#11110f]">
              {[
                { label: 'Brasil · negócios & tecnologia', name: 'Fabrício Bloisi', desc: 'Prosus · ecossistemas digitais' },
                { label: 'América do Sul · empreendedorismo', name: 'David Vélez', desc: 'Nubank · ruptura em escala continental' },
                { label: 'Brasil · gastronomia', name: 'Janaína Torres', desc: 'Cozinha, impacto social e acesso' }
              ].map((guest, i) => (
                <div key={i} className={`p-8 lg:p-8 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-[#11110f]' : ''}`}>
                  <p className="uppercase tracking-[0.12em] text-[0.65rem] font-extrabold">{guest.label}</p>
                  <h3 className="mt-8 mb-2 text-[1.5rem] font-black">{guest.name}</h3>
                  <span>{guest.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-6 border-t-2 border-[#11110f] fade-up">
              <p className="uppercase tracking-[0.12em] text-[0.65rem] font-extrabold mb-4">Nomes de impacto regional e nacional</p>
              <ul className="flex flex-wrap gap-3 text-[1rem]">
                {['Kobra', 'Guilherme Kramer', 'Marco Amaro', 'Gustavo Borges', 'Henry Zilbertein', 'João Olivério', 'Ricardo Bellino', 'Ricardo Amorim', 'Rodrigo Helcer', 'João Tabosa'].map((name, i) => {
                  const colors = ['bg-[#c8d400]', 'bg-[#f59d22]', 'bg-[#3fbdd8]', 'bg-[#e83a79]', 'bg-[#6b4494]'];
                  const bgColor = colors[i % colors.length];
                  return (
                    <li key={i} className={`border border-[#11110f] px-4 py-3 font-bold ${bgColor} text-white`}>{name}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* 08 / Marcas & Parcerias */}
        <section id="parcerias" className="bg-[#11110f] text-[#f3f0e8] py-[clamp(6rem,10vw,10rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw]">
            <div className="grid lg:grid-cols-[1.65fr_0.7fr] gap-8 lg:gap-[8vw] items-end mb-[clamp(3rem,7vw,6rem)]">
              <div>
                <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">08 / Proposta para marcas</p>
                <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3rem,14vw,6.8rem)]">Muito além de exposição de marca:<br />Engajamento real.</h2>
              </div>
              <p className="text-[1.1rem] max-w-[34rem] leading-relaxed">O FITI abre territórios para reputação, relacionamento, conteúdo, dados de impacto e experiências que as pessoas escolhem viver.</p>
            </div>

            <div className="border-t border-white/35 fade-up">
              {[
                { num: '01', title: 'Acesso', desc: 'Tomadores de decisão, capital, talentos e comunidades criativas no mesmo ecossistema.' },
                { num: '02', title: 'Experiência', desc: 'Ativações contextuais que participam da programação e respeitam a cidade.' },
                { num: '03', title: 'Conteúdo', desc: 'Propriedades editoriais antes, durante e depois do encontro presencial.' },
                { num: '04', title: 'Impacto', desc: 'Indicadores culturais, econômicos, ambientais e de acesso acompanhados desde a primeira edição.' }
              ].map((val, i) => (
                <article key={i} className="grid grid-cols-[0.25fr_1fr] md:grid-cols-[0.25fr_0.7fr_1.5fr] gap-4 md:gap-8 items-center py-6 border-b border-white/25">
                  <span className="text-[#c8d400] text-[0.7rem] tracking-[0.15em] font-extrabold">{val.num}</span>
                  <h3 className="font-black uppercase text-[clamp(1.8rem,3vw,3.3rem)] m-0">{val.title}</h3>
                  <p className="m-0 col-span-2 md:col-span-1">{val.desc}</p>
                </article>
              ))}
            </div>



            <div className="mt-28 grid lg:grid-cols-[0.9fr_1.6fr] gap-[6vw] pt-8 border-t-2 border-[#c8d400] fade-up">
              <div>
                <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">Motor econômico</p>
                <h3 className="font-black uppercase tracking-tighter leading-[0.86] text-[clamp(2.7rem,5vw,5.4rem)]">Valor circula<br />antes, durante<br />e depois.</h3>
              </div>
              <ul className="m-0 p-0">
                {[
                  { num: '01', title: 'Patrocínio', desc: 'Cotas, naming de experiências e entregas editoriais.' },
                  { num: '02', title: 'Credenciais', desc: 'Jornadas profissionais, executivas e por dia.' },
                  { num: '03', title: 'Mercado', desc: 'Startups, exposição, rodadas e hospitalidade B2B.' },
                  { num: '04', title: 'Conteúdo', desc: 'Licenciamento, mídia, propriedades digitais e pós-evento.' },
                  { num: '05', title: 'Cidade', desc: 'Gastronomia, varejo criativo, turismo e serviços parceiros.' }
                ].map((item, i) => (
                  <li key={i} className="grid grid-cols-[0.18fr_0.6fr_1fr] gap-4 py-5 border-b border-white/25 items-baseline">
                    <span className="text-[#c8d400] text-[0.68rem] tracking-[0.13em] font-extrabold">{item.num}</span>
                    <strong className="text-[1.15rem] font-bold">{item.title}</strong>
                    <small className="text-white/70 text-[1rem]">{item.desc}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>



        {/* 09 / Parceiros */}
        <section className="bg-[#f3f0e8] text-[#11110f] py-[clamp(6rem,10vw,10rem)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-[4vw] grid lg:grid-cols-[0.75fr_1.6fr] gap-[7vw]">
            <div className="bg-[#11110f] text-[#f3f0e8] p-8 min-h-[360px] flex flex-col items-center justify-center text-center fade-up">
              <p className="uppercase tracking-[0.14em] text-[0.7rem] font-extrabold self-start mb-auto">Realização</p>
              <img src="/images/fiti/instituto-vila-tech-branco.png" alt="Instituto Vila Tech" className="max-w-[280px] w-full my-auto" />
            </div>
            <div className="fade-up pt-8 lg:pt-0">
              <p className="uppercase tracking-[0.14em] text-[0.7rem] font-extrabold mb-10">Ecossistema de Parcerias - Instituições, Bares e restaurantes</p>
              <div className="flex flex-wrap gap-3">
                {['Vila Tech Hub', 'Fábrica São Luiz', 'FAMA Museu', 'Chou Noodle Bar', 'A Taverna Pub', 'Garagem Pub', 'Empório Santa Ritha', 'Terraço Terras II', 'Do Quintal Pizza', 'A Churrascada Itu', 'Atelier dos Pães', 'Clube do Vinil Café', 'Cozinha São Pedro', 'Por ai Afora', 'Plaza Shopping Itu', 'Cine Araújo', 'Casa de Cultura de Itu', 'Cila'].map((brand, i) => (
                  <span key={i} className="px-4 py-3 border border-[#11110f] font-extrabold text-[1rem]">{brand}</span>
                ))}
              </div>
              <small className="block mt-8 max-w-[760px] opacity-70 leading-relaxed">Aplicação pública de marcas condicionada à autorização e ao recebimento dos arquivos oficiais de cada organização.</small>
            </div>
          </div>
        </section>

        {/* 10 / Fechamento */}
        <section className="relative min-h-[92svh] grid items-center overflow-hidden bg-[#11110f] text-[#f3f0e8]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110f]/98 to-[#11110f]/50">
            <img src="/images/fiti/praca-carmo.webp" alt="Praça do Carmo" className="w-full h-full object-cover mix-blend-screen opacity-50" />
          </div>
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[4vw] py-32 fade-up">
            <p className="uppercase tracking-[0.18em] text-[0.73rem] font-extrabold mb-6">FITI · Itu · abril de 2027</p>
            <h2 className="font-black uppercase tracking-tighter leading-[0.84] text-[clamp(3.8rem,8vw,8.8rem)] max-w-[15ch]">O futuro não chega.<br /><em className="text-[#c8d400] not-italic">Ele encontra a gente.</em></h2>
            <p className="max-w-[690px] text-[1.25rem] my-8">Venha fazer parte das marcas e empresas que fazem parte do ecossistema da inovação. Entre em contato com a gente</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="/#contact" className="inline-flex min-h-[52px] items-center justify-center px-6 py-3 uppercase tracking-[0.1em] text-[0.75rem] font-black border border-transparent transition-all hover:-translate-y-0.5 bg-[#c8d400] text-[#11110f] hover:bg-white">
                Fale com a gente ↗
              </a>
              <a href="/doar" className="inline-flex min-h-[52px] items-center justify-center px-6 py-3 uppercase tracking-[0.1em] text-[0.75rem] font-black border border-transparent transition-all hover:-translate-y-0.5 bg-[#e83a79] text-white hover:bg-white hover:text-[#e83a79]">
                Faça sua contribuição para o projeto ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Padrão */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
