import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loader1Ref = useRef<HTMLDivElement>(null);
  const loader2Ref = useRef<HTMLDivElement>(null);
  const loader3Ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 0.5;
    const delay = 0.5;
    const tl = gsap.timeline({ repeat: -1 });

    if (loader1Ref.current && loader2Ref.current && loader3Ref.current) {
      tl.to(loader1Ref.current, { width: 90, duration })
        .set(loader1Ref.current, { transformOrigin: "right center", rotate: 90 })
        .to(loader1Ref.current, { width: 35, duration })
        .set(loader3Ref.current, { transformOrigin: "45px 45px", rotate: 90 })
        .to(loader3Ref.current, { width: 35, marginTop: 0, duration })
        .set(loader3Ref.current, { transformOrigin: "left center", rotate: 180 })
        .to(loader3Ref.current, { width: 90, duration })
        .set(loader3Ref.current, { transformOrigin: "left center", rotate: 270 })
        .to(loader3Ref.current, { width: 35, duration })
        .set(loader2Ref.current, { transformOrigin: "-10px 45px", rotate: 90 })
        .to(loader2Ref.current, { marginLeft: 0, duration })
        .set(loader2Ref.current, { transformOrigin: "center bottom", rotate: 180 })
        .to(loader2Ref.current, { height: 90, duration })
        .set(loader2Ref.current, { transformOrigin: "center bottom", rotate: 270 })
        .to(loader2Ref.current, { height: 35, duration })
        .set(loader1Ref.current, { transformOrigin: "45px -10px", rotate: 180 })
        .to(loader1Ref.current, { marginTop: 55, duration })
        .set(loader1Ref.current, { transformOrigin: "left center", rotate: 270 })
        .to(loader1Ref.current, { width: 90, duration })
        .set(loader1Ref.current, { transformOrigin: "left center", rotate: 360 })
        .to(loader1Ref.current, { width: 35, duration })
        .set(loader3Ref.current, { transformOrigin: "45px -10px", rotate: 360 })
        .to(loader3Ref.current, { marginTop: 55, duration })
        .set(loader3Ref.current, { transformOrigin: "right center", rotate: 450 })
        .to(loader3Ref.current, { width: 90, duration })
        .set(loader2Ref.current, { marginLeft: 55, duration })
        .delay(delay);
    }

    // Hide preloader after everything is loaded or timeout
    const handleLoad = () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = '';
        }
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Safety timeout
    const timeout = setTimeout(handleLoad, 4000);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeout);
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f59d22]"
    >
      <div className="relative w-[90px] h-[90px] mb-8">
        <div ref={loader1Ref} className="absolute w-[35px] h-[35px] border-[10px] border-[#1d1d1b] rounded-[40px]"></div>
        <div ref={loader2Ref} className="absolute w-[35px] h-[35px] border-[10px] border-[#1d1d1b] rounded-[40px] ml-[55px]"></div>
        <div ref={loader3Ref} className="absolute w-[90px] h-[35px] border-[10px] border-[#1d1d1b] rounded-[40px] mt-[55px]"></div>
      </div>
      
      <div className="text-[#1d1d1b] font-display text-xl uppercase tracking-[0.3em] animate-pulse">
        Carregando Inovação
      </div>
    </div>
  );
};

export default Preloader;
