import { useState, useEffect } from 'react';
import { EVENTOS, MESES_ORDEM, MESES_LABEL, type AgendaEvent } from '../data/agendaData';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { ExternalLink, SlidersHorizontal } from 'lucide-react';
import useLenis from '../hooks/useLenis';

export default function AgendaPage() {
  // Smooth scroll
  useLenis();

  // State for filters
  const [activeCategory, setActiveCategory] = useState<'todos' | 'Palestra' | 'Curso' | 'Evento'>('todos');
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // Statistics state (for counting animation)
  const [stats, setStats] = useState({
    total: 0,
    palestras: 0,
    cursos: 0,
    eventos: 0,
  });

  // Target values for animation
  const targetStats = {
    total: EVENTOS.length,
    palestras: EVENTOS.filter(e => e.tipo === 'Palestra').length,
    cursos: EVENTOS.filter(e => e.tipo === 'Curso').length,
    eventos: EVENTOS.filter(e => e.tipo === 'Evento').length,
  };

  // Animate stats on load
  useEffect(() => {
    document.title = "Vila Tech Hub — Agenda de Atividades";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const duration = 800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setStats({
        total: Math.round(targetStats.total * easeProgress),
        palestras: Math.round(targetStats.palestras * easeProgress),
        cursos: Math.round(targetStats.cursos * easeProgress),
        eventos: Math.round(targetStats.eventos * easeProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  // Filter logic
  const filteredEventos = EVENTOS.filter(ev => {
    const matchesCategory = activeCategory === 'todos' || ev.tipo === activeCategory;
    const matchesMonth = !activeMonth || ev.mes === activeMonth;
    return matchesCategory && matchesMonth;
  });

  // Group filtered events by month
  const eventsByMonth: Record<string, AgendaEvent[]> = {};
  filteredEventos.forEach(ev => {
    if (!eventsByMonth[ev.mes]) {
      eventsByMonth[ev.mes] = [];
    }
    eventsByMonth[ev.mes].push(ev);
  });

  // Sort months based on order
  const activeMonthsSorted = Object.keys(eventsByMonth).sort((a, b) => {
    return MESES_ORDEM.indexOf(a) - MESES_ORDEM.indexOf(b);
  });

  // Distinct months present in data
  const monthsInData = Array.from(new Set(EVENTOS.map(e => e.mes))).sort((a, b) => {
    return MESES_ORDEM.indexOf(a) - MESES_ORDEM.indexOf(b);
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#F5F0FA] font-sans selection:bg-[#9B35AE] selection:text-white">
      {/* Navigation */}
      <TopNavigation variant="coworking" />

      {/* Hero Section */}
      <section className="relative pt-[120px] pb-16 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#160820] to-[#0a0a0a]">
        {/* Glow effect */}
        <div className="absolute top-[-120px] right-[-120px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(123,45,139,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#9B35AE] mb-6 font-syne">
            <span className="w-8 h-[1px] bg-[#9B35AE]" />
            Calendário de Atividades
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-syne leading-none">
            Palestras, Cursos <br className="hidden md:inline" />
            e <span className="text-[#9B35AE]">Eventos</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed mb-10">
            Inovação, tecnologia e criatividade em Itu — SP. Conecte-se ao ecossistema Vila Tech Hub e acelere seu aprendizado.
          </p>

          {/* Stats Grid */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-12 border-t border-white/5 pt-8">
            <div className="border-l-2 border-[#7B2D8B] pl-4">
              <div className="text-3xl md:text-4xl font-extrabold text-white font-syne leading-none">
                {stats.total}
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                Atividades
              </div>
            </div>
            <div className="border-l-2 border-[#378ADD] pl-4">
              <div className="text-3xl md:text-4xl font-extrabold text-white font-syne leading-none">
                {stats.palestras}
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                Palestras
              </div>
            </div>
            <div className="border-l-2 border-[#639922] pl-4">
              <div className="text-3xl md:text-4xl font-extrabold text-white font-syne leading-none">
                {stats.cursos}
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                Cursos
              </div>
            </div>
            <div className="border-l-2 border-[#BA7517] pl-4">
              <div className="text-3xl md:text-4xl font-extrabold text-white font-syne leading-none">
                {stats.eventos}
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
                Eventos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <nav className="bg-[#0a0a0a]/95 border-y border-white/5 sticky top-[70px] z-[90] backdrop-blur-md px-6 md:px-12">
        <div className="max-w-7xl mx-auto py-4 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
          {/* Categoria */}
          <button
            onClick={() => setActiveCategory('todos')}
            className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
              activeCategory === 'todos' ? 'bg-[#7B2D8B] border-[#7B2D8B] text-white' : 'text-gray-400 hover:border-[#7B2D8B] hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveCategory('Palestra')}
            className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
              activeCategory === 'Palestra' ? 'bg-[#185FA5] border-[#185FA5] text-white' : 'text-gray-400 hover:border-[#185FA5] hover:text-white'
            }`}
          >
            Palestras
          </button>
          <button
            onClick={() => setActiveCategory('Curso')}
            className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
              activeCategory === 'Curso' ? 'bg-[#3B6D11] border-[#3B6D11] text-white' : 'text-gray-400 hover:border-[#3B6D11] hover:text-white'
            }`}
          >
            Cursos
          </button>
          <button
            onClick={() => setActiveCategory('Evento')}
            className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
              activeCategory === 'Evento' ? 'bg-[#854F0B] border-[#854F0B] text-white' : 'text-gray-400 hover:border-[#854F0B] hover:text-white'
            }`}
          >
            Eventos
          </button>

          <div className="w-[1px] h-5 bg-white/10 mx-2 hidden sm:block" />

          {/* Mês Filter */}
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-syne mr-2 hidden sm:inline">Mês:</span>
          
          <button
            onClick={() => setActiveMonth(activeMonth === null ? null : null)}
            className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
              activeMonth === null ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Todos Meses
          </button>

          {monthsInData.map(m => (
            <button
              key={m}
              onClick={() => setActiveMonth(activeMonth === m ? null : m)}
              className={`font-syne font-bold uppercase tracking-wider px-4 py-2 border border-white/10 transition-all text-[10px] md:text-xs ${
                activeMonth === m ? 'bg-[#7B2D8B] border-[#7B2D8B] text-white' : 'text-gray-400 hover:border-[#7B2D8B] hover:text-white'
              }`}
            >
              {MESES_LABEL[m] || m}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {activeMonthsSorted.length > 0 ? (
          activeMonthsSorted.map(mes => {
            const evs = eventsByMonth[mes].sort((a, b) => a.dia - b.dia);
            return (
              <section key={mes} className="mb-20 last:mb-0">
                {/* Month header */}
                <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-white/15">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-syne">
                    {MESES_LABEL[mes] || mes}
                  </h2>
                  <span className="text-xl md:text-2xl font-light text-[#9B35AE] font-syne">2026</span>
                  <span className="ml-auto text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-syne">
                    {evs.length} {evs.length === 1 ? 'atividade' : 'atividades'}
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {evs.map((ev, idx) => {
                    const typeColor = ev.tipo === 'Palestra' ? '#378ADD' : ev.tipo === 'Curso' ? '#639922' : '#BA7517';
                    const bgLightColor = ev.tipo === 'Palestra' ? 'rgba(55,138,221,0.1)' : ev.tipo === 'Curso' ? 'rgba(99,153,34,0.1)' : 'rgba(186,117,23,0.1)';
                    const textLightColor = ev.tipo === 'Palestra' ? '#85B7EB' : ev.tipo === 'Curso' ? '#97C459' : '#FAC775';

                    return (
                      <article 
                        key={idx}
                        className="bg-[#1A1A1A] border border-white/5 p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#7B2D8B]/50 hover:shadow-2xl hover:shadow-[#000]/60 group"
                      >
                        {/* Colorful side strip */}
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-[4px]"
                          style={{ backgroundColor: typeColor }}
                        />

                        {/* Category Tag */}
                        <span 
                          className="font-syne font-bold text-[9px] md:text-[10px] tracking-wider uppercase px-2.5 py-1 inline-block mb-5"
                          style={{ backgroundColor: bgLightColor, color: textLightColor }}
                        >
                          {ev.tipo}
                        </span>

                        {/* Date Grid */}
                        <div className="flex items-center gap-4 mb-5">
                          <div className="font-syne font-extrabold text-4xl md:text-5xl text-white leading-none min-w-[56px]">
                            {String(ev.dia).padStart(2, '0')}
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {ev.semana} · {MESES_LABEL[ev.mes] || ev.mes}
                            </div>
                            <div className="text-xs md:text-[13px] font-bold text-[#9B35AE] font-syne mt-0.5">
                              {ev.inicio} – {ev.fim}
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-syne font-bold text-lg md:text-xl text-white mb-2 group-hover:text-[#9B35AE] transition-colors leading-snug">
                          {ev.titulo}
                        </h3>
                        <p className="text-xs md:text-[13px] text-gray-400 font-light leading-relaxed mb-6">
                          {ev.sub}
                        </p>

                        {/* Speakers if any */}
                        {ev.speakers && ev.speakers.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-5">
                            {ev.speakers.map((sp, sIdx) => (
                              <span 
                                key={sIdx}
                                className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-white font-medium hover:bg-[#7B2D8B]/20 transition-colors"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Footer card */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-400 max-w-[60%]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9B35AE] shrink-0" />
                            <span className="truncate">{ev.local || 'Vila Tech Hub'}</span>
                          </div>

                          <a
                            href={ev.linkInscricao || "https://wa.link/2wbzbb"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-syne font-bold text-[10px] tracking-wider uppercase border border-[#7B2D8B]/50 hover:bg-[#7B2D8B] hover:border-[#7B2D8B] px-3.5 py-2 text-[#9B35AE] hover:text-white transition-all duration-300 flex items-center gap-1 hover:scale-105 shrink-0"
                          >
                            {ev.linkInscricao ? 'Inscrever-se' : 'Fale Conosco'}
                            <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500">
            <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-bold font-syne text-white mb-2">Nenhuma atividade encontrada</h3>
            <p className="text-sm font-light">Tente alterar os filtros de categoria ou mês.</p>
          </div>
        )}
      </main>

      {/* Footer Info Area */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 text-center text-gray-500 text-xs font-light">
        <div className="max-w-7xl mx-auto">
          <div className="font-syne font-bold text-sm tracking-[0.2em] text-[#9B35AE] uppercase mb-3">
            Vila Tech Hub
          </div>
          <p className="mb-2">
            Instituto Cultural e Educacional Vila Tech · Itu, SP ·{' '}
            <a 
              href="https://vilatechub.com.br" 
              className="text-[#9B35AE] hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              vilatechub.com.br
            </a>
          </p>
          <div className="text-[10px] text-gray-600 tracking-wider">
            Atualizado em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </footer>

      {/* Full Footer of main site */}
      <div className="border-t border-white/5">
        <Footer />
      </div>

      {/* Float WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
