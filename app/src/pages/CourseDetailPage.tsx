import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { coursesData } from '../data/coursesData';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import useLenis from '../hooks/useLenis';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2, Ticket, ExternalLink, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const CourseDetailPage = () => {
  useLenis();
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const course = coursesData.find((c) => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!course) {
      return;
    }

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.fromTo(
        '.reveal-1',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
      );
      
      gsap.fromTo(
        '.reveal-2',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div className="bg-[#1d1d1b] text-white min-h-screen flex flex-col justify-between font-sans">
        <TopNavigation variant="home" />
        <div className="max-w-md mx-auto text-center px-6 py-40">
          <HelpCircle className="w-16 h-16 text-[#e83a79] mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-display uppercase mb-4">Curso Não Encontrado</h2>
          <p className="text-white/60 mb-8">
            O curso que você está procurando não existe ou já foi encerrado.
          </p>
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e83a79] hover:bg-[#d02c68] text-white rounded-xl text-xs uppercase font-display tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Cursos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const courseJsonLd = course ? {
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
  } : null;

  return (
    <div ref={containerRef} className="bg-[#1d1d1b] text-white min-h-screen font-sans selection:bg-[#e83a79] selection:text-white">
      {course && (
        <>
          <SEO 
            title={`${course.title} | Curso de IA & Tecnologia em Itu`}
            description={course.subtitle}
          />
          <script type="application/ld+json">
            {JSON.stringify(courseJsonLd)}
          </script>
        </>
      )}
      {/* Navigation */}
      <TopNavigation variant="home" />

      {/* Main Content Area */}
      <main className="pt-28 pb-24 md:pt-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Back Button */}
          <Link
            to="/cursos"
            className="reveal-1 inline-flex items-center gap-2 text-white/50 hover:text-[#e83a79] transition-colors text-xs uppercase font-display tracking-wider mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos os cursos
          </Link>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Title, Curriculum, Modules */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Category & Title Header */}
              <div className="reveal-1 space-y-4">
                <span className="inline-block text-[#e83a79] border border-[#e83a79]/30 bg-[#e83a79]/10 px-3 py-1 rounded-full text-xs font-display tracking-widest uppercase">
                  {course.categoryLabel}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl font-medium">
                  {course.subtitle}
                </p>
              </div>

              {/* What You Will Learn (Curriculum) */}
              <div className="reveal-1 bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="text-lg md:text-xl font-display uppercase text-[#e83a79] border-b border-[#e83a79]/20 pb-3">
                  O que você vai aprender
                </h2>
                <ul className="space-y-4">
                  {course.learnTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm md:text-base text-white/80 leading-snug">
                      <CheckCircle2 className="w-5 h-5 text-[#e83a79] mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules (if present, like Carlos Tabosa's Course) */}
              {course.modules && course.modules.length > 0 && (
                <div className="reveal-1 space-y-6">
                  <h2 className="text-lg md:text-xl font-display uppercase text-[#e83a79]">
                    Módulos do Curso
                  </h2>
                  <div className="relative border-l border-white/10 pl-6 ml-3 space-y-8">
                    {course.modules.map((mod, index) => (
                      <div key={index} className="relative">
                        {/* Timeline node */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#e83a79] border-4 border-[#1d1d1b]" />
                        <h3 className="text-base md:text-lg font-display uppercase text-white mb-2">
                          {mod.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Teacher, Info Card, Registration */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Event Logistics & Registration Card */}
              <div className="reveal-2 bg-gradient-to-br from-[#e83a79]/10 to-[#1d1d1b] border border-[#e83a79]/20 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e83a79]/10 rounded-full blur-[40px] pointer-events-none" />
                
                <h2 className="text-xl font-display uppercase text-white tracking-wide border-b border-white/5 pb-4">
                  Informações de Logística
                </h2>

                {/* Logistics */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-white/5 text-[#e83a79] flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Data</p>
                      <p className="text-sm font-semibold text-white/90">{course.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-white/5 text-[#e83a79] flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Horário</p>
                      <p className="text-sm font-semibold text-white/90">{course.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-white/5 text-[#e83a79] flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Local</p>
                      <p className="text-sm font-semibold text-white/90">{course.location}</p>
                    </div>
                  </div>
                </div>

                {/* Discount and Coupon Panel */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#e83a79]/20 text-[#e83a79] rounded-lg">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Cupom exclusivo</p>
                      <p className="text-sm font-mono font-bold text-[#e83a79]">{course.coupon}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display text-white">{course.discount}</span>
                    <span className="block text-[8px] uppercase tracking-widest text-white/40 font-display">de desconto</span>
                  </div>
                </div>

                {/* Main Registration Button */}
                <a
                  href={course.symplaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={`course-buy-sympla-${course.id}`}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#e83a79] hover:bg-[#d02c68] text-white rounded-xl text-sm uppercase font-display tracking-widest font-bold transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(232,58,121,0.2)]"
                >
                  Inscrever-se no Sympla
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Teacher Profile Card */}
              <div className="reveal-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                    <img
                      src={course.teacher.image}
                      alt={course.teacher.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-display tracking-widest text-[#e83a79] block mb-1">
                      Professor(a)
                    </span>
                    <h3 className="text-lg font-display uppercase text-white leading-tight">
                      {course.teacher.name}
                    </h3>
                    <p className="text-[10px] text-white/50 font-medium">
                      {course.teacher.role}
                    </p>
                  </div>
                </div>

                {/* About teacher bio */}
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  {course.teacher.bio}
                </p>

                {/* Quote block */}
                <div className="relative border-l-2 border-[#e83a79] bg-[#e83a79]/5 rounded-r-xl p-4 italic text-sm text-white/90">
                  <span className="text-2xl font-serif text-[#e83a79] leading-none absolute top-1 left-2 select-none pointer-events-none opacity-20">“</span>
                  <p className="relative z-10 pl-2">
                    {course.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
