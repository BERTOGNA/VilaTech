import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animation Logic - Cloning the provided reference
    // We use standard bounce as a fallback for CustomBounce
    const tl = gsap.timeline({ repeat: -1 }).timeScale(1.42);
    
    // Set initial visibility
    gsap.set(svgRef.current, { visibility: 'visible' });

    // Main animation sequence
    tl.to('.mainDot', {
      duration: 1,
      x: 240,
      ease: "sine.inOut"
    })
    .to('.otherDots circle', {
      duration: 0.3,
      y: -40,
      ease: "sine.out",
      stagger: 0.09
    }, 0.06)
    .to('.otherDots circle', {
      duration: 0.7,
      y: 0,
      ease: "bounce.out", // Fallback for 'myBounce'
      stagger: 0.09
    }, 0.48)
    .to('.otherDots circle', {
      duration: 0.7,
      scaleY: 0.6,
      scaleX: 1.3,
      ease: "power2.inOut", // Fallback for 'myBounce-squash'
      transformOrigin: "bottom",
      stagger: 0.09
    }, 0.48)
    .to('.otherDots circle', {
      duration: 0.2,
      scaleY: 1,
      scaleX: 1,
      stagger: 0.09
    }, 1.1)
    .to('.otherDots circle', {
      duration: 1,
      x: -40,
      ease: "expo.out",
      stagger: 0.09
    }, 0.68)
    .to('.mainDot', {
      duration: 1.8,
      x: 0,
      ease: "elastic.out(1, 0.75)"
    }, 1);

    // Hide preloader logic
    const handleLoad = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsVisible(false);
            document.body.style.overflow = '';
          }
        });
      }
    };

    if (document.readyState === 'complete') {
      const timeout = setTimeout(handleLoad, 1000);
      return () => clearTimeout(timeout);
    } else {
      window.addEventListener('load', handleLoad);
      const timeout = setTimeout(handleLoad, 4000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f59d22]"
    >
      <div className="w-full max-w-[400px] h-auto flex items-center justify-center">
        <svg 
          ref={svgRef}
          viewBox="0 0 800 600" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full invisible"
        >
          <g className="dots">
            <circle className="mainDot" cx="300" cy="300" r="12.5" fill="#1d1d1b"/>
            <g className="otherDots" fill="#1d1d1b">
              <circle cx="340" cy="300" r="12.5" />
              <circle cx="380" cy="300" r="12.5" />
              <circle cx="420" cy="300" r="12.5" />
              <circle cx="460" cy="300" r="12.5" />
              <circle cx="500" cy="300" r="12.5" />
            </g>
          </g>
        </svg>
      </div>
      
      <div className="text-[#1d1d1b] font-display text-xl uppercase tracking-[0.3em] mt-[-120px] animate-pulse">
        Vila Tech Hub
      </div>
    </div>
  );
};

export default Preloader;

