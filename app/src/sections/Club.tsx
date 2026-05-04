import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clubConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface ClubProps {
  zIndex?: number;
}

const Club = ({ zIndex = 40 }: ClubProps) => {
  if (!clubConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
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

      // Image reveal animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image parallax animation
        gsap.fromTo(
          imageRef.current,
          { y: 100 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // Keywords animation using ScrollTrigger.batch
      const keywords = keywordsRef.current?.querySelectorAll('.keyword');
      if (keywords && keywords.length > 0) {
        gsap.set(keywords, { y: 20, opacity: 0, scale: 0.8 });
        
        ScrollTrigger.batch(keywords, {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.15,
              ease: 'back.out(1.7)',
            }),
        });
      }
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
      id="club"
      ref={sectionRef}
      className="relative w-full py-6 md:py-10 bg-white"
      style={{ zIndex }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ef7d00_0%,_transparent_50%)]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-4">
          {/* Archetype Image */}
          <div className="relative order-1 flex lg:justify-end justify-center items-start group">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={clubConfig.archetypeImage}
                alt={clubConfig.archetypeName}
                className="w-full max-w-[480px] xl:max-w-[560px] h-auto object-contain"
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-2 bg-void-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg pointer-events-none transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                <span className="font-sans text-xs font-medium text-white tracking-wide whitespace-nowrap">
                  Albert, mestre da inovação
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-2 pb-8">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-void-black leading-tight mb-6">
              {clubConfig.sectionTitle}
            </h2>
            <p className="font-medium text-void-black/70 text-lg leading-relaxed mb-10 whitespace-pre-line">
              {clubConfig.description}
            </p>

            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-brand-orange text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-brand-orange/80 transition-colors duration-300"
            >
              {clubConfig.ctaText}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Club;
