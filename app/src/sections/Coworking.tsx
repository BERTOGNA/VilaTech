import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, DoorOpen, Presentation, Mic, Coffee, MapPin, Building, ShoppingCart, Sofa, Car } from 'lucide-react';
import { coworkingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  users: Users,
  'door-open': DoorOpen,
  presentation: Presentation,
  mic: Mic,
  coffee: Coffee,
  'map-pin': MapPin,
  building: Building,
  'shopping-cart': ShoppingCart,
  sofa: Sofa,
  car: Car,
};

interface CoworkingProps {
  zIndex?: number;
}

const Coworking = ({ zIndex = 40 }: CoworkingProps) => {
  if (!coworkingConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

      // Features stagger animation using ScrollTrigger.batch for perfect sequence
      const features = featuresRef.current?.querySelectorAll('.feature-item');
      if (features && features.length > 0) {
        gsap.set(features, { y: 30, opacity: 0 });
        
        ScrollTrigger.batch(features, {
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
      id="coworking"
      ref={sectionRef}
      className="relative w-full py-6 md:py-10 bg-void-black"
      style={{ zIndex }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-4">
          {/* Archetype Image */}
          <div className="relative order-2 lg:order-1 flex lg:justify-end justify-center items-start group">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={coworkingConfig.archetypeImage}
                alt={coworkingConfig.archetypeName}
                className="w-full max-w-[480px] xl:max-w-[560px] h-auto object-contain"
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg pointer-events-none transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                <span className="font-sans text-xs font-medium text-white tracking-wide whitespace-nowrap">
                  Leo, o criador
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2 pb-8">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              {coworkingConfig.sectionTitle}
            </h2>
            <div className="font-medium text-white/70 text-lg leading-relaxed mb-8 whitespace-pre-line">
              {coworkingConfig.description}
            </div>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-brand-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-brand-cyan/80 transition-colors duration-300"
            >
              {coworkingConfig.ctaText}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {coworkingConfig.features.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
            return (
              <div
                key={feature.id}
                className="feature-item group p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-center items-center text-center h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center mb-3 group-hover:bg-brand-cyan/30 transition-colors shrink-0">
                  <IconComponent className="w-5 h-5 text-brand-cyan" />
                </div>
                <h3 className="font-display font-semibold text-base md:text-lg text-white flex-grow flex items-center justify-center leading-tight whitespace-pre-line text-center">
                  {feature.title}
                </h3>
                {feature.description && (
                  <div className="w-full h-px bg-white/10 my-3 group-hover:bg-brand-cyan/30 transition-colors"></div>
                )}
                {feature.description && (
                  <p className="text-white/80 text-base md:text-lg leading-relaxed whitespace-pre-line text-center w-full">
                    {feature.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Coworking;
