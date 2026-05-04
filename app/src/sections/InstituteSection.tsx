import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { instituteTeaserConfig } from '../config';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const InstituteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const TARGET_TEXT = instituteTeaserConfig.sectionTitle;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        '.institute-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            onEnter: () => setIsTyping(true),
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        '.institute-image',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typing effect logic
  useEffect(() => {
    if (!isTyping) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(TARGET_TEXT.slice(0, i));
      i++;
      if (i > TARGET_TEXT.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [isTyping, TARGET_TEXT]);

  return (
    <section
      id="institute-teaser"
      ref={sectionRef}
      className="relative py-12 overflow-hidden bg-void-black"
    >
      {/* Background Image - Tree Aligned to Top */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="institute-image absolute inset-0 bg-cover opacity-40"
          style={{ 
            backgroundImage: "url('/images/Arvore1.png')",
            backgroundPosition: 'center top'
          }}
        />
        <div className="absolute inset-0 bg-void-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/50 to-void-black" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col items-center">
        <div className="institute-content max-w-4xl text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-teal" />
            <span className="font-sans text-xs uppercase tracking-widest text-brand-teal">
              {instituteTeaserConfig.sectionLabel}
            </span>
            <div className="h-px w-12 bg-brand-teal" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-white mb-4 leading-tight min-h-[1.2em]">
            <span>{displayText}</span>
            <span className="inline-block w-[4px] h-[0.8em] bg-brand-teal ml-2 animate-pulse align-middle" />
          </h2>

          <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-6 max-w-2xl">
            {instituteTeaserConfig.description}
          </p>

          <Link
            to={instituteTeaserConfig.ctaPath}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-void-black rounded-full font-bold text-lg hover:bg-brand-teal hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {instituteTeaserConfig.ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
    </section>
  );
};

export default InstituteSection;
