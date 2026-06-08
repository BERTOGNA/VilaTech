import { useEffect, useState } from 'react';
import { X, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const EVENT_CTA_URL = 'https://bit.ly/4dKP2e3';
const SESSION_KEY = 'vth_event_popup_closed';

const EventPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after a small delay, only once per session
    const alreadyClosed = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyClosed) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    sessionStorage.setItem(SESSION_KEY, '1');
    setTimeout(() => setIsVisible(false), 350);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm
        transition-opacity duration-350 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`relative w-full max-w-lg bg-void-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl
          transition-all duration-350 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ boxShadow: '0 0 60px rgba(45, 212, 191, 0.15), 0 25px 60px rgba(0,0,0,0.7)' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>

        {/* Event image — place the arte as /images/evento-ia-negocios.jpg */}
        <div className="relative w-full overflow-hidden bg-black">
          <img
            src="/images/pop-up/vt-palestra-pop-uo-01.jpeg"
            alt="IA nos Negócios - Vila Tech Hub"
            className="w-full h-auto object-cover"
            onError={(e) => {
              // Fallback banner if image not found
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
            }}
          />
          {/* Fallback banner */}
          <div
            className="hidden w-full px-8 py-10 flex-col gap-2 bg-gradient-to-br from-void-black via-[#0d1a1a] to-void-black"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-brand-teal mb-2">Próximo Evento</span>
            <h2 className="font-display font-bold text-3xl text-white leading-tight">
              IA nos negócios
            </h2>
            <p className="font-sans text-white/70 text-base leading-snug">
              A tecnologia revolucionando e acelerando o crescimento
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-brand-teal" />
                <span>11 de junho de 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-teal" />
                <span>18h30 às 20h</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-teal" />
                <span>Vila Tech Hub — Itu Novo Centro, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-center sm:text-left">
            <p className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Garanta seu ingresso
            </p>
            <p className="font-sans text-white/50 text-xs mt-0.5">
              11/06 · 18h30 · Vila Tech Hub — Itu, SP
            </p>
          </div>
          <a
            href={EVENT_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-brand-teal text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-brand-teal/80 transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(45,212,191,0.35)' }}
          >
            Quero participar
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
