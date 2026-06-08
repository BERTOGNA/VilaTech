import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partnersConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  if (!partnersConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      gsap.fromTo(
        headerRef.current,
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

      // Categories stagger animation
      const categories = categoriesRef.current?.querySelectorAll('.category-block');
      if (categories) {
        gsap.fromTo(
          categories,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
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
      id="partners"
      ref={sectionRef}
      className="relative w-full py-24 bg-[#0A0A0F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-mono-custom text-xs text-[#4ECDC4] uppercase tracking-[0.3em] mb-4 block">
            {partnersConfig.sectionLabel}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            {partnersConfig.sectionTitle}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            {partnersConfig.description}
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 border border-[#4ECDC4] text-[#4ECDC4] font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#4ECDC4] hover:text-[#0A0A0F] transition-colors duration-300"
          >
            {partnersConfig.ctaText}
          </button>
        </div>

        {/* Partners Categories */}
        <div ref={categoriesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnersConfig.categories.map((category) => (
            <div
              key={category.id}
              className="category-block p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="font-mono-custom text-xs text-white/50 uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.partners.map((partner, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors cursor-default"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
