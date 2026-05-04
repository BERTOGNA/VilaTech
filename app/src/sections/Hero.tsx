import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const titlePhrases = [
    "VENHA TRABALHAR E ESTUDAR\nNO ESPAÇO MAIS DESCOLADO\nE CHARMOSO DA REGIÃO",
    "COWORKING\nEDUCAÇÃO\nINOVAÇÃO"
  ];
  
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(true);

  // Typing effect for the current title phrase
  useEffect(() => {
    setDisplayText('');
    setIsDecoding(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(titlePhrases[titleIndex].slice(0, i));
      i++;
      if (i > titlePhrases[titleIndex].length) {
        clearInterval(interval);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [titleIndex]);

  // Title cycling effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titlePhrases.length);
    }, 8000); // 8 seconds per main title cycle
    return () => clearInterval(timer);
  }, []);



  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade + slide up (initial mount only)
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
        ".cta-group",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Scroll out effect
      gsap.to(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%", // based on scroll distance of 100vh
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
        <div className="absolute inset-0 bg-void-black/20" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Main title with typing effect */}
        <div className="min-h-[45vh] md:min-h-[35vh] lg:min-h-[30vh] w-full flex items-center justify-center mb-12 md:mb-16">
          <h1
            ref={titleRef}
            className={`font-display font-bold text-white leading-[1.1] tracking-tighter text-center transition-all duration-500 ${
              titleIndex === 0 
                ? 'text-[4vw] sm:text-[4.5vw] md:text-[5vw] lg:text-[4.5vw]' 
                : 'text-[10vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[7vw]'
            }`}
          >
            {titlePhrases[titleIndex].split('\n').map((line, idx, allLines) => {
              // Calculate how much of this specific line has been "decoded"
              const previousLinesLength = allLines.slice(0, idx).join('\n').length + (idx > 0 ? 1 : 0);
              const lineText = displayText.slice(previousLinesLength, previousLinesLength + line.length);
              const isCurrentLine = idx === (displayText.match(/\n/g) || []).length;
              
              return (
                <span key={idx} className="block min-h-[1.1em] whitespace-nowrap">
                  <span className={`${isDecoding ? 'text-glow-teal' : ''} transition-all duration-300`}>
                    {lineText}
                  </span>
                  {isCurrentLine && (
                    <span className="w-[2px] h-[0.8em] bg-brand-teal ml-1 inline-block animate-pulse align-middle" />
                  )}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center mb-12 text-center">
          <p
            ref={subtitleRef}
            className="font-sans text-lg md:text-xl text-white font-bold mb-4 max-w-2xl balance-text leading-tight drop-shadow-sm"
          >
            {heroConfig.subtitle}
          </p>

        </div>

        {/* CTA Buttons */}
        <div className="cta-group flex gap-4">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-8 py-3 bg-white text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-brand-orange transition-colors duration-300"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
            className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />


    </section>
  );
};

export default Hero;
