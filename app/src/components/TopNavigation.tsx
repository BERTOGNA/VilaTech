import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, BookOpen, Building2, Users, Rocket, Mail, Globe, Eye, Target, ShieldCheck, MapPin, Lightbulb, Menu, X } from 'lucide-react';
import { heroConfig, siteConfig, instituteNavItems, coworkingPageNavItems } from '../config';
import { Link, useLocation } from 'react-router-dom';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
  book: BookOpen,
  building: Building2,
  users: Users,
  rocket: Rocket,
  mail: Mail,
  globe: Globe,
  eye: Eye,
  target: Target,
  shield: ShieldCheck,
  'map-pin': MapPin,
  lightbulb: Lightbulb,
};

interface TopNavigationProps {
  variant?: 'home' | 'institute' | 'coworking';
}

const TopNavigation = ({ variant = 'home' }: TopNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extend coworking menu items or keep current
  const navItems = variant === 'home' 
    ? heroConfig.navItems 
    : variant === 'institute' 
      ? instituteNavItems 
      : coworkingPageNavItems;

  useEffect(() => {
    // Animate strictly on mount/remount
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
    gsap.fromTo(
      logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, [location.pathname]);

  // Handle body overflow lock when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const targetPath = variant === 'home' ? '/' : variant === 'institute' ? '/instituto' : '/coworking';
    
    // If not on the correct page, redirect to that page with hash
    if (location.pathname !== targetPath) {
      window.location.href = `${targetPath}#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        variant === 'coworking' || variant === 'institute' 
          ? 'bg-void-black/10 backdrop-blur-md border-b border-white/5' 
          : 'mix-blend-difference'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex items-center justify-between gap-6 md:gap-4">
          {/* Logo / Brand */}
          <div 
            ref={logoRef} 
            className="pointer-events-auto flex-shrink-0"
          >
            <Link to="/" className="inline-block" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src={siteConfig.logo} 
                alt={heroConfig.brandName} 
                className="w-auto max-w-[120px] md:max-w-[140px] nav:max-w-[160px] object-contain block hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Desktop Navigation pill wrapper (visible only on lg/nav screen sizes) */}
          <nav
            ref={navRef}
            className="nav-pill rounded-full px-1.5 py-1.5 pointer-events-auto text-white flex-shrink min-w-0 hidden nav:flex"
          >
            <div className="flex items-center gap-0.5 md:gap-1">
              {navItems.map((item) => {
                const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP];
                const content = (
                  <>
                    <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </>
                );

                const itemClasses = "flex items-center gap-1.5 md:gap-2 px-3 py-2 text-xs font-sans uppercase tracking-wider text-white hover:bg-white/20 transition-colors rounded-full whitespace-nowrap";

                if (item.path) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={itemClasses}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => item.sectionId && scrollToSection(item.sectionId)}
                    className={itemClasses}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile hamburger button (visible on screen widths below nav size) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-pill flex items-center justify-center w-10 h-10 rounded-full text-white border border-white/10 hover:bg-white/20 transition-colors nav:hidden z-[110]"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Navigation Drawer overlay */}
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-[95] transition-all duration-300 nav:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono border-b border-white/10 pb-2 mb-2">
            Navegação — {variant === 'home' ? 'Site' : variant === 'institute' ? 'Instituto' : 'Coworking'}
          </p>
          {navItems.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            const itemClasses = `flex items-center gap-4 text-lg font-syne uppercase tracking-wider text-white hover:text-[#9B35AE] transition-colors py-3 border-b border-white/5 last:border-0 transform transition-transform duration-500 delay-[${idx * 50}ms] ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`;

            if (item.path) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={itemClasses}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5 text-[#9B35AE]" />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => item.sectionId && scrollToSection(item.sectionId)}
                className={itemClasses}
              >
                <IconComponent className="w-5 h-5 text-[#9B35AE]" />
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
