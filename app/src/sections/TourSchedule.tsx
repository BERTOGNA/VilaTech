import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Ticket, ExternalLink } from 'lucide-react';
import { tourScheduleConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const TourSchedule = () => {
  // Null check: if config is empty, do not render
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [activeVenue, setActiveVenue] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const tourItems = contentRef.current?.querySelectorAll('.tour-item');
      if (tourItems && tourItems.length > 0) {
        gsap.set(tourItems, { y: 30, opacity: 0 });
        
        ScrollTrigger.batch(tourItems, {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle mouse movement for floating thumbnail
  useEffect(() => {
    if (!thumbnailRef.current || activeVenue === null) return;

    gsap.to(thumbnailRef.current, {
      x: mousePos.x + 20,
      y: mousePos.y + 20,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [mousePos, activeVenue]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-sale':
        return { text: tourScheduleConfig.statusLabels.onSale, color: 'text-emerald-600 bg-emerald-100' };
      case 'sold-out':
        return { text: tourScheduleConfig.statusLabels.soldOut, color: 'text-rose-600 bg-rose-100' };
      case 'coming-soon':
        return { text: tourScheduleConfig.statusLabels.comingSoon, color: 'text-amber-600 bg-amber-100' };
      default:
        return { text: tourScheduleConfig.statusLabels.default, color: 'text-gray-600 bg-gray-100' };
    }
  };

  const TOUR_DATES = tourScheduleConfig.tourDates;

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Thumbnail */}
      <div
        ref={thumbnailRef}
        className={`fixed top-0 left-0 w-64 aspect-[4/3] z-50 pointer-events-none rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-300 ${
          activeVenue !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeVenue !== null && (
          <div className="relative w-full h-full">
            <img
              src={TOUR_DATES[activeVenue]?.image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display font-bold text-lg leading-tight">{TOUR_DATES[activeVenue]?.venue}</p>
              <p className="font-sans text-xs opacity-80">{TOUR_DATES[activeVenue]?.city}</p>
            </div>
          </div>
        )}
      </div>

      {/* Content container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-sans text-xs text-[#1F1F1F]/60 uppercase tracking-wider mb-2">
            {tourScheduleConfig.sectionLabel}
          </p>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-[#1F1F1F]">
            {tourScheduleConfig.sectionTitle}
          </h2>
        </div>

        {/* Tour list - Full width */}
        <div className="space-y-6">
          {TOUR_DATES.map((tour, index) => {
            const status = getStatusLabel(tour.status);
            const isActive = activeVenue === index;

            return (
              <div
                key={tour.id}
                className={`tour-item group relative p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#1F1F1F]/10 transition-all duration-500 ease-out cursor-none
                  ${isActive ? 'bg-white shadow-xl scale-[1.02] py-12' : 'hover:bg-white/80'}`}
                onMouseEnter={() => setActiveVenue(index)}
                onMouseLeave={() => setActiveVenue(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Date */}
                  <div className="flex-shrink-0 w-32">
                    <p className={`font-sans text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-[#1F1F1F]' : 'text-[#1F1F1F]/70'}`}>
                      {tour.date.split('.').slice(1).join('.')}
                    </p>
                    <p className="font-sans text-xs text-[#1F1F1F]/40 uppercase tracking-widest">
                      {tour.date.split('.')[0]}
                    </p>
                  </div>

                  {/* Venue info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#1F1F1F]' : 'text-[#1F1F1F]/30'}`} />
                      <span className={`font-display font-bold text-xl transition-colors duration-300 ${isActive ? 'text-[#1F1F1F]' : 'text-[#1F1F1F]/80'}`}>
                        {tour.city}
                      </span>
                    </div>
                    <p className={`text-base transition-colors duration-300 ml-6 ${isActive ? 'text-[#1F1F1F]/80 font-medium' : 'text-[#1F1F1F]/50'}`}>
                      {tour.venue}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-[#1F1F1F]/50">
                    <Clock className="w-4 h-4" />
                    <span className="font-sans text-sm">{tour.time}</span>
                  </div>

                  {/* Status badge */}
                  <div className="flex-shrink-0">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${status.color} ${isActive ? 'shadow-sm' : ''}`}>
                      {status.text}
                    </span>
                  </div>

                  {/* Action button */}
                  <div className="flex-shrink-0">
                    {tour.status === 'on-sale' ? (
                      <button className="flex items-center gap-2 px-6 py-3 bg-[#1F1F1F] text-white rounded-full text-sm font-semibold hover:bg-[#1F1F1F]/90 transition-all hover:shadow-lg active:scale-95">
                        <Ticket className="w-4 h-4" />
                        <span>{tourScheduleConfig.buyButtonText}</span>
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-6 py-3 border border-[#1F1F1F]/20 text-[#1F1F1F]/60 rounded-full text-sm font-medium hover:border-[#1F1F1F]/40 transition-all active:scale-95">
                        <ExternalLink className="w-4 h-4" />
                        <span>{tourScheduleConfig.detailsButtonText}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover indicator line */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-[#1F1F1F] rounded-full transition-all duration-500 ${isActive ? 'h-2/3 opacity-100' : 'h-0 opacity-0'}`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="font-sans text-sm text-[#1F1F1F]/40 mb-6 uppercase tracking-widest">
            {tourScheduleConfig.bottomNote}
          </p>
          <button className="px-10 py-5 bg-[#1F1F1F] text-white font-sans text-sm uppercase tracking-[0.2em] rounded-full hover:bg-[#1F1F1F]/90 transition-all hover:shadow-2xl active:scale-95 group">
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 inline-block">
              {tourScheduleConfig.bottomCtaText}
            </span>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F1F1F]/10 to-transparent" />
    </section>
  );
};

export default TourSchedule;
