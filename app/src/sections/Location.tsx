import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation } from 'lucide-react';
import { locationConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  if (!locationConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
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

      // Map reveal animation
      gsap.fromTo(
        mapRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${locationConfig.address}, ${locationConfig.city}, ${locationConfig.state}`
      )}`,
      '_blank'
    );
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative w-full py-12 bg-white"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-sans text-xs text-brand-teal uppercase tracking-[0.3em] mb-4 block">
              {locationConfig.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-void-black leading-tight mb-6">
              {locationConfig.sectionTitle}
            </h2>
            <p className="font-medium text-void-black/70 text-lg leading-relaxed mb-8">
              {locationConfig.description}
            </p>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-void-black/5 border border-void-black/10 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <p className="text-void-black font-medium text-lg mb-1">
                    {locationConfig.address}
                  </p>
                  <p className="text-void-black/60">
                    {locationConfig.city} - {locationConfig.state}
                  </p>
                  <p className="text-void-black/40 text-sm">
                    CEP: {locationConfig.zipCode}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={openMap}
              className="flex items-center gap-2 px-8 py-3 bg-brand-teal text-void-black font-sans text-sm uppercase tracking-wider rounded-full hover:bg-brand-teal/80 transition-colors duration-300"
            >
              <Navigation className="w-4 h-4" />
              {locationConfig.ctaText}
            </button>
          </div>

          {/* Map */}
          <div ref={mapRef} className="relative">
            <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-void-black/5 border border-void-black/10">
              {locationConfig.mapUrl ? (
                <iframe
                  src={locationConfig.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vila Tech Hub Location"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-brand-teal/50 mx-auto mb-4" />
                    <p className="text-void-black/50 font-sans text-sm">
                      Mapa em breve
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
