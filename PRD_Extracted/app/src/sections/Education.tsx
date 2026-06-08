import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Rocket, Video, Gamepad2 } from 'lucide-react';
import { educationConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  brain: Brain,
  code: Code,
  rocket: Rocket,
  video: Video,
  gamepad: Gamepad2,
};

const Education = () => {
  if (!educationConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.trail-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="education"
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-[#0A0A0F] to-[#0f172a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-mono-custom text-xs text-[#2D8B8B] uppercase tracking-[0.3em] mb-4 block">
              {educationConfig.sectionLabel}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              {educationConfig.sectionTitle}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {educationConfig.description}
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-[#2D8B8B] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#4ECDC4] transition-colors duration-300"
            >
              {educationConfig.ctaText}
            </button>
          </div>

          {/* Archetype Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={educationConfig.archetypeImage}
                alt={educationConfig.archetypeName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="font-mono-custom text-xs text-white/50 uppercase tracking-wider">
                Arquétipo
              </p>
              <p className="font-display text-white text-lg">
                {educationConfig.archetypeName}
              </p>
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
                className="trail-card group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2D8B8B]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2D8B8B]/20 flex items-center justify-center mb-4 group-hover:bg-[#2D8B8B]/30 transition-colors">
                  <IconComponent className="w-6 h-6 text-[#2D8B8B]" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">
                  {trail.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
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
