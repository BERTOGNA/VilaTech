import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Initial state: hidden
    gsap.set(button, { 
      scale: 0, 
      opacity: 0, 
      visibility: 'hidden',
      y: 20
    });

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to show button after initial scroll
      ScrollTrigger.create({
        start: 200, // Show after 200px of scroll
        onEnter: () => {
          setIsVisible(true);
          gsap.to(button, {
            scale: 1,
            opacity: 1,
            y: 0,
            visibility: 'visible',
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        },
        onLeaveBack: () => {
          setIsVisible(false);
          gsap.to(button, {
            scale: 0,
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => { gsap.set(button, { visibility: 'hidden' }); }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Separate pulse animation that runs when visible
  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !isVisible) return;

    const pulse = gsap.to(button, {
      boxShadow: "0 0 0 15px rgba(37, 211, 102, 0)",
      duration: 1.5,
      repeat: -1,
      ease: "power2.out",
      clearProps: "boxShadow"
    });

    const float = gsap.to(button, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      pulse.kill();
      float.kill();
    };
  }, [isVisible]);

  return (
    <a
      ref={buttonRef}
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[9999] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300" />
      
      <svg 
        viewBox="0 0 24 24" 
        className="relative z-10 w-8 h-8 fill-current transition-transform duration-300 group-hover:rotate-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-20 bg-void-black text-white text-xs font-sans px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl translate-x-4 group-hover:translate-x-0">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
