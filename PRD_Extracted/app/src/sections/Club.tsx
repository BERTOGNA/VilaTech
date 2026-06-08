import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Gift, Users, Ticket } from 'lucide-react';
import { clubConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Club = () => {
  if (!clubConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

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

      // Keywords animation
      const keywords = keywordsRef.current?.querySelectorAll('.keyword');
      if (keywords) {
        gsap.fromTo(
          keywords,
          { y: 20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: keywordsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Benefits stagger animation
      const benefits = benefitsRef.current?.querySelectorAll('.benefit-card');
      if (benefits) {
        gsap.fromTo(
          benefits,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: benefitsRef.current,
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

  const getIcon = (index: number) => {
    const icons = [Star, Gift, Users, Ticket];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-[#6B5B95]" />;
  };

  return (
    <section
      id="club"
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-[#1a1a2e] to-[#2d1b4e]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#6B5B95_0%,_transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={contentRef} className="text-center mb-12">
          <span className="font-mono-custom text-xs text-[#6B5B95] uppercase tracking-[0.3em] mb-4 block">
            {clubConfig.sectionLabel}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            {clubConfig.sectionTitle}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            {clubConfig.description}
          </p>

          {/* Keywords */}
          <div ref={keywordsRef} className="flex flex-wrap justify-center gap-4 mb-8">
            {clubConfig.keywords.map((keyword, index) => (
              <span
                key={index}
                className="keyword px-6 py-2 rounded-full bg-[#6B5B95]/20 border border-[#6B5B95]/30 text-white font-display text-sm uppercase tracking-wider"
              >
                {keyword}
              </span>
            ))}
          </div>

          <button
            onClick={scrollToContact}
            className="px-8 py-3 bg-[#6B5B95] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#8B7BB5] transition-colors duration-300"
          >
            {clubConfig.ctaText}
          </button>
        </div>

        {/* Benefits Grid */}
        <div ref={benefitsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubConfig.benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="benefit-card group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#6B5B95]/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6B5B95]/20 flex items-center justify-center mb-4 group-hover:bg-[#6B5B95]/30 transition-colors">
                {getIcon(index)}
              </div>
              <h3 className="font-display text-lg text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Archetype attribution */}
        <div className="mt-16 text-center">
          <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-2">
            Arquétipo do Clube
          </p>
          <p className="font-display text-white text-xl">
            {clubConfig.archetypeName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Club;
