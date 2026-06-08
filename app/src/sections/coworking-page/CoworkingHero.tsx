import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coworkingPageConfig } from '../../config';

gsap.registerPlugin(ScrollTrigger);

const CoworkingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(true);
  const titleText = coworkingPageConfig.hero.title;

  // Typing effect for the title
  useEffect(() => {
    setDisplayText('');
    setIsDecoding(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(titleText.slice(0, i));
      i++;
      if (i > titleText.length) {
        clearInterval(interval);
        setIsDecoding(false);
      }
    }, 100); // Slower, more deliberate typing

    return () => clearInterval(interval);
  }, [titleText]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade + slide up
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Subtitle fade + slide up
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // CTA buttons fade + slide up
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Scroll out effect (parallax/scale)
      gsap.to(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="sticky top-0 w-full h-screen overflow-hidden bg-void-black z-0"
    >
      {/* Background container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-void-black">
        {/* Local Video Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw] object-cover scale-110 opacity-70"
            src="/videos/abstract-loop-geometry-background-10-2026-02-02-05-58-35-utc_V%C3%ADdeo_da_Internet.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-transparent to-void-black" />
        <div className="absolute inset-0 bg-void-black/50" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Main title with typing effect and responsive vw sizing */}
        <div className="min-h-[25vh] md:min-h-[30vh] w-full flex items-center justify-center mb-8">
          <h1
            ref={titleRef}
            className="font-display font-bold text-white leading-[1.1] tracking-tighter text-center text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[8vw]"
          >
            <span className="block min-h-[1.1em] whitespace-nowrap">
              <span className={`${isDecoding ? 'text-glow-teal' : ''} transition-all duration-300`}>
                {displayText}
              </span>
              {isDecoding && (
                <span className="w-[4px] md:w-[8px] h-[0.8em] bg-brand-teal ml-2 inline-block animate-pulse align-middle shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              )}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center mb-12 text-center">
          <p
            ref={subtitleRef}
            className="font-sans text-lg md:text-xl lg:text-2xl text-white/90 font-medium mb-4 max-w-3xl balance-text leading-tight drop-shadow-lg"
          >
            {coworkingPageConfig.hero.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => scrollToSection('precos')}
            className="px-10 py-4 bg-white text-void-black font-display text-sm uppercase tracking-widest rounded-full hover:bg-brand-teal transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {coworkingPageConfig.hero.ctaSecondary}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-10 py-4 border border-white/30 text-white font-display text-sm uppercase tracking-widest rounded-full hover:border-brand-teal hover:text-brand-teal transition-all duration-300 transform hover:scale-105"
          >
            {coworkingPageConfig.hero.ctaPrimary}
          </button>
          <button
            onClick={() => { window.location.href = '/agenda'; }}
            className="px-10 py-4 bg-white text-void-black font-display text-sm uppercase tracking-widest rounded-full hover:bg-brand-teal transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Agenda
          </button>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
    </section>
  );
};

export default CoworkingHero;


