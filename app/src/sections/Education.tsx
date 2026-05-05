import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building, Lightbulb, Gamepad2, Brain, Code, Rocket, Video } from 'lucide-react';
import { educationConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  building: Building,
  lightbulb: Lightbulb,
  gamepad: Gamepad2,
  brain: Brain,
  code: Code,
  rocket: Rocket,
  video: Video,
};

interface EducationProps {
  zIndex?: number;
}

const Education = ({ zIndex = 40 }: EducationProps) => {
  if (!educationConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation using ScrollTrigger.batch
      const cards = cardsRef.current?.querySelectorAll('.trail-card');
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 30, opacity: 0 });
        
        ScrollTrigger.batch(cards, {
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-6 md:py-10 bg-white"
      style={{ zIndex }}
    >
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-4">
          {/* Content */}
          <div ref={contentRef} className="order-1 pb-8 flex flex-col items-start text-left lg:items-end lg:text-right">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-void-black leading-tight mb-6 whitespace-pre-line">
              {educationConfig.sectionTitle}
            </h2>
            <div className="font-medium text-void-black/70 text-lg leading-relaxed mb-8 whitespace-pre-line">
              {educationConfig.description}
            </div>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-brand-pink text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-brand-pink/80 transition-colors duration-300"
            >
              {educationConfig.ctaText}
            </button>
          </div>

          <div className="relative order-2 flex lg:justify-start justify-center items-start group">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={educationConfig.archetypeImage}
                alt={educationConfig.archetypeName}
                className="w-full max-w-sm xl:max-w-md h-auto object-contain"
              />
              <div className="absolute top-[75%] left-0 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-void-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg pointer-events-none transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                <span className="font-sans text-xs font-medium text-white tracking-wide whitespace-nowrap">
                  Ada, a mãe dos algoritmos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trails Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationConfig.trails.map((trail) => {
            const IconComponent = ICON_MAP[trail.icon as keyof typeof ICON_MAP];
            return (
              <div
                key={trail.id}
                className="trail-card group p-6 rounded-2xl bg-void-black/5 border border-void-black/10 hover:border-brand-pink/50 hover:bg-void-black/10 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center mb-4 group-hover:bg-brand-pink/30 transition-colors">
                  <IconComponent className="w-6 h-6 text-brand-pink" />
                </div>
                <h3 className="font-display font-bold text-xl text-void-black mb-2">
                  {trail.title}
                </h3>
                <p className="text-void-black/60 text-sm leading-relaxed">
                  {trail.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
