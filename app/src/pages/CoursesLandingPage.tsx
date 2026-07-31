import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coursesData } from '../data/coursesData';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import useLenis from '../hooks/useLenis';
import { BookOpen, Calendar, Clock, MapPin, Award, ArrowRight, Sparkles, User } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract numerical value of the first date for sorting (e.g. "25/06 e 02/07" -> month 6, day 25 -> 625)
const getCourseDateValue = (dateStr: string): number => {
  const match = dateStr.match(/(\d{2})\/(\d{2})/);
  if (!match) return 0;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  return month * 100 + day;
};

const CoursesLandingPage = () => {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sortedCourses = [...coursesData].sort((a, b) => {
    return getCourseDateValue(a.date) - getCourseDateValue(b.date);
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.4 }
      );

      // Fade in course cards in sequence
      const cards = gridRef.current?.querySelectorAll('.course-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const coursesJsonLd = sortedCourses.map(course => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.subtitle,
    "provider": {
      "@type": "Organization",
      "name": "Vila Tech Hub - Instituto de Inovação",
      "sameAs": "https://vilatechub.com.br"
    },
    "courseCode": course.id,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "location": course.location,
      "startDate": `2026-${course.date.split('/')[1] || '06'}-${course.date.split('/')[0] || '01'}`,
      "duration": "PT3H"
    }
  }));

  const coursesFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quais cursos de Inteligência Artificial e Negócios são oferecidos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oferecemos programas executivos presenciais focados em aplicação prática, incluindo: IA Aplicada aos Negócios, IA Aplicada à Advocacia, Inteligência Tributária e Planejamento Estratégico."
        }
      },
      {
        "@type": "Question",
        "name": "Onde ocorrem os cursos e qual o formato?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todos os cursos são realizados presencialmente na sede do Vila Tech Hub em Itu, SP (Rua Francisco José Ferreira Sampaio, 90), mesclando teoria com aplicação prática imediata e oportunidades de networking."
        }
      },
      {
        "@type": "Question",
        "name": "Quem são os professores dos cursos de IA e Estratégia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O corpo docente conta com profissionais especialistas de mercado: Carlos Tabosa (VP de Tecnologia na OPAH IT e Top Voice em IA), Felipe Scalet (Advogado especialista em IA e LGPD), Carla Bertoncello (Diretora Executiva da Tax Way) e Gilberto de Moura (Diretor de Planejamento da GMG)."
        }
      },
      {
        "@type": "Question",
        "name": "Há desconto para empresas parceiras ou entidades de classe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Oferecemos cupons de 50% de desconto vinculados a parcerias regionais (ex: OAB, ACI). Você pode validar seu cupom diretamente na página do respectivo curso ou durante a inscrição via Sympla."
        }
      }
    ]
  };

  return (
    <div className="bg-[#1d1d1b] text-white min-h-screen font-sans selection:bg-[#e83a79] selection:text-white">
      <SEO
        title="Cursos de IA & Tecnologia em Itu | Vila Tech Educação"
        description="Acelere sua carreira com nossos cursos e workshops de Inteligência Artificial aplicada, Gestão de Negócios e Planejamento Estratégico. Aulas presenciais em Itu, SP."
      />
      <script type="application/ld+json">
        {JSON.stringify(coursesJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(coursesFaqJsonLd)}
      </script>
      {/* Top Navigation */}
      <TopNavigation variant="home" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#e83a79]/10 via-[#1d1d1b] to-[#1d1d1b]"
      >
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e83a79]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e83a79]/15 border border-[#e83a79]/30 text-[#e83a79] text-xs font-display uppercase tracking-widest mb-6 animate-pulse">
            <BookOpen className="w-3.5 h-3.5" />
            Vila Tech Educação
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white leading-none max-w-4xl mx-auto mb-6"
          >
            Formação Ágil em <span className="text-[#e83a79] block sm:inline">Tecnologia & IA</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Cursos presenciais e workshops de alta performance desenhados para acelerar a sua carreira e os resultados da sua empresa na era da Inteligência Artificial.
          </p>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Heading & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
            <div>
              <p className="text-[#e83a79] font-display uppercase tracking-widest text-sm mb-2">Trilhas de Aprendizado</p>
              <h2 className="text-3xl md:text-4xl font-display uppercase text-white">IA &amp; Gestão de Negócios</h2>
            </div>

            {/* Future Trails Indicator Tabs */}
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#e83a79] text-white text-xs uppercase font-display tracking-widest rounded-full">
                Negócios (Ativo)
              </span>
              <span className="px-4 py-2 bg-white/5 text-white/40 text-xs uppercase font-display tracking-widest rounded-full cursor-not-allowed border border-white/5 select-none" title="Em breve">
                Criatividade (Em Breve)
              </span>
              <span className="px-4 py-2 bg-white/5 text-white/40 text-xs uppercase font-display tracking-widest rounded-full cursor-not-allowed border border-white/5 select-none" title="Em breve">
                Games (Em Breve)
              </span>
            </div>
          </div>

          {/* Grid of Courses */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="course-card group flex flex-col justify-between bg-white/[0.02] border border-white/10 hover:border-[#e83a79]/40 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:bg-[#e83a79]/[0.02] hover:-translate-y-1"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 bg-white/5 px-2.5 py-1 rounded">
                      {course.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-[#e83a79] text-xs font-mono">
                      <Award className="w-3.5 h-3.5" />
                      <span>{course.discount} OFF</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-display uppercase text-white mb-2 group-hover:text-[#e83a79] transition-colors leading-tight">
                    {course.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm lg:text-base text-white/60 mb-6 font-medium leading-snug">
                    {course.subtitle}
                  </p>

                  {/* Meta Details */}
                  <div className="space-y-3 border-t border-b border-white/5 py-4 mb-6">
                    <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm">
                      <Calendar className="w-4 h-4 text-[#e83a79] flex-shrink-0" />
                      <span><strong>Quando:</strong> {course.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm">
                      <Clock className="w-4 h-4 text-[#e83a79] flex-shrink-0" />
                      <span><strong>Horário:</strong> {course.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm">
                      <MapPin className="w-4 h-4 text-[#e83a79] flex-shrink-0" />
                      <span><strong>Onde:</strong> {course.location}</span>
                    </div>
                  </div>

                  {/* Teacher Summary Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                      {course.teacher.image ? (
                        <img
                          src={course.teacher.image}
                          alt={course.teacher.name}
                          className="w-full h-full object-cover grayscale"
                        />
                      ) : (
                        <User className="w-full h-full p-2 text-white/30" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-display uppercase text-xs tracking-wider">{course.teacher.name}</p>
                      <p className="text-[10px] text-white/50 font-medium max-w-[220px] truncate">{course.teacher.role}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to={`/cursos/${course.id}`}
                    className="flex-1 text-center py-3 border border-white/20 hover:border-[#e83a79] hover:text-[#e83a79] rounded-xl text-xs uppercase font-display tracking-wider transition-all"
                    aria-label={`Ver detalhes do curso de ${course.title}`}
                  >
                    Detalhes do Curso
                  </Link>
                  <a
                    href={course.symplaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={`course-buy-sympla-${course.id}`}
                    className="flex-1 text-center py-3 bg-[#e83a79] hover:bg-[#d02c68] text-white rounded-xl text-xs uppercase font-display tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(232,58,121,0.3)]"
                  >
                    <span>Garantir Vaga</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate CTA Callout */}
          <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-white/[0.01] to-white/[0.03] border border-white/10 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e83a79]/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <span className="text-xs uppercase font-display tracking-widest text-[#e83a79] flex items-center gap-1.5 mb-4">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                Vila Tech In Company
              </span>
              <h3 className="text-2xl md:text-3xl font-display uppercase text-white mb-4">
                Leve estes treinamentos para a sua empresa
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                Personalizamos nossos cursos de IA, contabilidade tributária, direito digital e planejamento ágil de acordo com a realidade e objetivos do seu time de negócios.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1d1d1b] hover:bg-[#e83a79] hover:text-white rounded-xl text-xs uppercase font-display tracking-wider transition-all duration-300 font-bold"
              >
                Falar com o time corporativo
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#1d1d1b] text-white relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#e83a79] font-display uppercase tracking-widest text-sm mb-2">Tire suas dúvidas</p>
            <h2 className="text-3xl md:text-5xl font-display uppercase text-white mb-6">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-[#e83a79] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            <details className="group border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none">
                <span className="font-display font-semibold text-lg pr-8">Quais cursos de Inteligência Artificial e Negócios são oferecidos?</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-[#e83a79] group-open:bg-[#e83a79] group-open:text-white transition-all duration-300">
                  <span className="block group-open:hidden">+</span>
                  <span className="hidden group-open:block">-</span>
                </span>
              </summary>
              <div className="p-6 pt-0 text-white/70 font-sans leading-relaxed border-t border-white/5">
                Oferecemos programas executivos presenciais focados em aplicação prática, incluindo: <strong>IA Aplicada aos Negócios</strong>, <strong>IA Aplicada à Advocacia</strong>, <strong>Inteligência Tributária</strong> e <strong>Planejamento Estratégico</strong>.
              </div>
            </details>

            <details className="group border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none">
                <span className="font-display font-semibold text-lg pr-8">Onde ocorrem os cursos e qual o formato?</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-[#e83a79] group-open:bg-[#e83a79] group-open:text-white transition-all duration-300">
                  <span className="block group-open:hidden">+</span>
                  <span className="hidden group-open:block">-</span>
                </span>
              </summary>
              <div className="p-6 pt-0 text-white/70 font-sans leading-relaxed border-t border-white/5">
                Todos os cursos são realizados presencialmente na sede do Vila Tech Hub em Itu, SP (Rua Francisco José Ferreira Sampaio, 90), mesclando teoria com aplicação prática imediata e oportunidades de networking.
              </div>
            </details>

            <details className="group border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none">
                <span className="font-display font-semibold text-lg pr-8">Quem são os professores dos cursos de IA e Estratégia?</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-[#e83a79] group-open:bg-[#e83a79] group-open:text-white transition-all duration-300">
                  <span className="block group-open:hidden">+</span>
                  <span className="hidden group-open:block">-</span>
                </span>
              </summary>
              <div className="p-6 pt-0 text-white/70 font-sans leading-relaxed border-t border-white/5">
                O corpo docente conta com profissionais especialistas de mercado: <strong>Carlos Tabosa</strong> (VP de Tecnologia na OPAH IT e Top Voice em IA), <strong>Felipe Scalet</strong> (Advogado especialista em IA e LGPD), <strong>Carla Bertoncello</strong> (Diretora Executiva da Tax Way) e <strong>Gilberto de Moura</strong> (Diretor de Planejamento da GMG).
              </div>
            </details>

            <details className="group border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none">
                <span className="font-display font-semibold text-lg pr-8">Há desconto para empresas parceiras ou entidades de classe?</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-[#e83a79] group-open:bg-[#e83a79] group-open:text-white transition-all duration-300">
                  <span className="block group-open:hidden">+</span>
                  <span className="hidden group-open:block">-</span>
                </span>
              </summary>
              <div className="p-6 pt-0 text-white/70 font-sans leading-relaxed border-t border-white/5">
                Sim. Oferecemos cupons de 50% de desconto vinculados a parcerias regionais (ex: OAB, ACI). Você pode validar seu cupom diretamente na página do respectivo curso ou durante a inscrição via Sympla.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CoursesLandingPage;
