import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { partnersConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  if (!partnersConfig.sectionTitle) {
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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full py-8 bg-void-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center">
          <span className="font-sans text-xs text-brand-teal uppercase tracking-[0.3em] mb-4 block">
            {partnersConfig.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
            {partnersConfig.sectionTitle}
          </h2>
          <p className="font-medium text-white/60 text-base leading-relaxed max-w-2xl mx-auto mb-8">
            {partnersConfig.description}
          </p>
          <button
            onClick={scrollToContact}
            className="px-6 py-2 border border-brand-teal/30 text-brand-teal font-display text-xs uppercase tracking-wider rounded-full hover:bg-brand-teal hover:text-void-black transition-colors duration-300"
          >
            {partnersConfig.ctaText}
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full px-4 md:px-8">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[...partnersConfig.institutionalLogos, ...partnersConfig.institutionalLogos, ...partnersConfig.institutionalLogos, ...partnersConfig.institutionalLogos].map((item, index) => (
              <div 
                key={index} 
                className="flex-[0_0_auto] px-4"
              >
                <div 
                  className="flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-32 h-32 md:w-40 md:h-40 p-6 hover:scale-105 hover:bg-white/10 hover:border-brand-teal/30 transition-all duration-500 shadow-xl"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="max-h-full max-w-full object-contain transition-all duration-500"
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
            className="w-12 h-12 ml-4 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Previous partners"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-12 h-12 mr-4 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-teal hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Next partners"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default Partners;
