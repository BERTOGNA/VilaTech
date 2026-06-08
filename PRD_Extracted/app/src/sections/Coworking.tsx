import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, DoorOpen, Presentation, Mic, Coffee, MapPin } from 'lucide-react';
import { coworkingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  users: Users,
  'door-open': DoorOpen,
  presentation: Presentation,
  mic: Mic,
  coffee: Coffee,
  'map-pin': MapPin,
};

const Coworking = () => {
  if (!coworkingConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features stagger animation with counter effect
      const features = featuresRef.current?.querySelectorAll('.feature-item');
      if (features) {
        gsap.fromTo(
          features,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
      className="relative w-full py-24 bg-gradient-to-b from-[#0f172a] to-[#1a1a2e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Archetype Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={coworkingConfig.archetypeImage}
                alt={coworkingConfig.archetypeName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="font-mono-custom text-xs text-white/50 uppercase tracking-wider">
                Arquétipo
              </p>
              <p className="font-display text-white text-lg">
                {coworkingConfig.archetypeName}
              </p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <span className="font-mono-custom text-xs text-[#F5A623] uppercase tracking-[0.3em] mb-4 block">
              {coworkingConfig.sectionLabel}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              {coworkingConfig.sectionTitle}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {coworkingConfig.description}
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-[#F5A623] text-[#1A1A1A] font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#FFD700] transition-colors duration-300"
            >
              {coworkingConfig.ctaText}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {coworkingConfig.features.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
            return (
              <div
                key={feature.id}
                className="feature-item group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5A623]/50 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5A623]/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-[#F5A623]/30 transition-colors">
                  <IconComponent className="w-6 h-6 text-[#F5A623]" />
                </div>
                <p className="font-display text-3xl text-white mb-1">
                  {feature.value}
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Coworking;
