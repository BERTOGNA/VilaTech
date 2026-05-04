import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { startupsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Startups = () => {
  if (!startupsConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Embla Carousel Setup with AutoScroll
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      dragFree: true
    },
    [
      AutoScroll({ 
        playOnInit: true, 
        stopOnInteraction: false, 
        stopOnMouseEnter: false,
        speed: 2 
      })
    ]
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll) {
      autoScroll.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="startups"
      ref={sectionRef}
      className="relative w-full py-16 bg-void-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center opacity-100">
          <span className="font-sans text-xs text-brand-teal uppercase tracking-[0.3em] mb-4 block">
            {startupsConfig.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight mb-6">
            {startupsConfig.sectionTitle}
          </h2>
          <p className="font-medium text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {startupsConfig.description}
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 border border-brand-teal/30 text-brand-teal font-display text-xs uppercase tracking-wider rounded-full hover:bg-brand-teal hover:text-void-black transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {startupsConfig.ctaText}
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full px-4 md:px-8">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[...startupsConfig.institutionalLogos, ...startupsConfig.institutionalLogos, ...startupsConfig.institutionalLogos, ...startupsConfig.institutionalLogos].map((item, index) => (
              <div 
                key={index} 
                className="flex-[0_0_auto] px-4"
              >
                <div 
                  className="flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-32 h-32 md:w-48 md:h-48 p-8 hover:scale-105 hover:bg-white/10 hover:border-brand-teal/30 transition-all duration-500 shadow-xl group"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:brightness-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Visible on Hover */}
        <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={scrollPrev}
            className="w-14 h-14 ml-8 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Previous startups"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-14 h-14 mr-8 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Next startups"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default Startups;

