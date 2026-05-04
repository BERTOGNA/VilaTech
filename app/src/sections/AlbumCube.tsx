import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { albumCubeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  'bg-brand-pink text-white',     // Educação: Rosa (Ada Lovelace)
  'bg-brand-cyan text-white',     // Coworking: Azul
  'bg-brand-orange text-white'    // Clube: Laranja
];

interface AlbumSectionProps {
  album: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
  };
  index: number;
  zIndex?: number;
}

const AlbumSection = ({ album, index, zIndex }: AlbumSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [displayedTitle, setDisplayedTitle] = useState('');

  useEffect(() => {
    const el = sectionRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = gsap.context(() => {
      // Default hidden styles
      gsap.set(wordsRef.current, { opacity: 0, y: 20 });
      
      // Entrance Animation
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%", 
        onEnter: () => {
          // Title typing effect
          let i = 0;
          const interval = setInterval(() => {
            setDisplayedTitle(album.title.slice(0, i));
            i++;
            if (i > album.title.length) {
              clearInterval(interval);
            }
          }, 40);

          // Subtitle words stagger fade up
          gsap.to(wordsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.5
          });
        },
        once: true
      });

      // Exit Transition Animation (Scrubbed)
      gsap.to(container, {
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
        opacity: 0.3,
        scale: 0.9,
        filter: "blur(10px)",
        ease: "none"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [album.title]);

  let globalWordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className={`sticky top-0 w-full py-12 md:py-16 flex flex-col items-center justify-center overflow-hidden ${colors[index % colors.length]}`}
      style={{ zIndex: zIndex || (index + 1) * 10 }}
    >
      {/* Decorative background grid subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />
      
      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full px-4 md:px-8">
        <h3 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6 uppercase tracking-tighter drop-shadow-lg leading-none min-h-[1em]">
          {displayedTitle}
        </h3>
        
        <p className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl leading-snug drop-shadow-md">
          {album.subtitle.split('\n').map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.split(' ').filter(w => w.trim() !== '').map((word) => {
                const i = globalWordIndex++;
                return (
                  <span
                    key={i}
                    ref={(el) => { wordsRef.current[i] = el; }}
                    className="inline-block mr-[0.3em]"
                    style={{ opacity: 0 }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

interface AlbumCubeProps {
  index?: number;
  zIndex?: number;
}

const AlbumCube = ({ index, zIndex }: AlbumCubeProps) => {
  if (albumCubeConfig.albums.length === 0) return null;

  return index !== undefined ? 
    <AlbumSection album={albumCubeConfig.albums[index]} index={index} zIndex={zIndex} /> : 
    <div className="relative w-full bg-void-black">
      {albumCubeConfig.albums.map((album, i) => (
        <AlbumSection key={album.id} album={album} index={i} />
      ))}
    </div>;
};

export default AlbumCube;

