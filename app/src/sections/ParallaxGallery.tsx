import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { parallaxGalleryConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  // Null check: if config is empty, do not render
  if (
    parallaxGalleryConfig.parallaxImagesTop.length === 0 &&
    !parallaxGalleryConfig.sectionTitle
  ) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Lightbox State
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const allImages = [
    ...parallaxGalleryConfig.parallaxImagesTop,
    ...parallaxGalleryConfig.parallaxImagesBottom
  ];

  // Embla state for navigation
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Embla Carousel Setup with AutoScroll
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: false, 
      align: 'start',
      dragFree: false,
      watchDrag: false
    }
  );

  const onSelect = useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);



  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = sectionRef.current?.querySelectorAll('.embla__slide');
      if (slides) {
        gsap.fromTo(slides, 
          { scale: 0.5, opacity: 0, y: 30 },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0,
            duration: 1, 
            stagger: 0.2, 
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (imgId: string | number) => {
    const index = allImages.findIndex(img => img.id === imgId);
    if (index !== -1) {
      setCurrentIndex(index);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = useCallback(() => {
    setCurrentIndex(null);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((newDirection: number) => {
    if (currentIndex === null) return;
    
    if (modalImageRef.current) {
      gsap.to(modalImageRef.current, {
        x: -newDirection * 50,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentIndex((prev) => {
            if (prev === null) return null;
            const next = prev + newDirection;
            if (next < 0) return allImages.length - 1;
            if (next >= allImages.length) return 0;
            return next;
          });
          gsap.fromTo(modalImageRef.current, 
            { x: newDirection * 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        }
      });
    } else {
      setCurrentIndex((prev) => {
        if (prev === null) return null;
        const next = prev + newDirection;
        if (next < 0) return allImages.length - 1;
        if (next >= allImages.length) return 0;
        return next;
      });
    }
  }, [currentIndex, allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, closeLightbox, navigate]);

  return (
    <section
      id="nosso-espaco"
      ref={sectionRef}
      className="relative w-full bg-void-black pb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-10 pt-16">
        <span className="font-sans text-xs text-brand-cyan uppercase tracking-[0.3em] mb-4 block">
          {parallaxGalleryConfig.sectionLabel}
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
          {parallaxGalleryConfig.sectionTitle}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 md:px-0">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {allImages.map((image, idx) => (
              <div 
                key={`${image.id}-${idx}`} 
                className="embla__slide flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] px-2 md:px-4"
              >
                <div 
                  onClick={() => openLightbox(image.id)}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl cursor-pointer group shadow-2xl border border-white/5 transition-all duration-500 hover:shadow-brand-cyan/20 hover:scale-[1.02]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-display font-medium text-lg uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Visible on Hover */}
        <div className={`absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`w-14 h-14 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl transform hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`w-14 h-14 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-void-black transition-all duration-300 pointer-events-auto shadow-2xl transform hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative py-12 bg-void-black overflow-hidden mt-16 border-y border-white/5">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {parallaxGalleryConfig.marqueeTexts.map((text, j) => {
                const colors = ['text-brand-pink', 'text-brand-cyan', 'text-brand-orange'];
                const colorClass = colors[j % colors.length];
                return (
                  <span key={`${i}-${j}`} className={`flex items-center gap-8 mx-12 text-3xl font-display font-bold ${colorClass} opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default`}>
                    {text}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300">
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] bg-white/5 p-2 rounded-full backdrop-blur-md"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md hover:bg-brand-cyan hover:text-void-black"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <button 
            onClick={() => navigate(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md hover:bg-brand-cyan hover:text-void-black"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden" onClick={closeLightbox}>
            <div className="relative max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <img 
                ref={modalImageRef}
                src={allImages[currentIndex].src}
                alt={allImages[currentIndex].alt}
                className="w-full h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg"
              />
              {/* Meta info */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="font-display font-bold text-xl text-white mb-1 uppercase tracking-widest">
                  {allImages[currentIndex].alt}
                </p>
                <p className="text-brand-cyan text-sm font-sans font-bold tracking-[0.2em]">
                  {currentIndex + 1} / {allImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ParallaxGallery;

