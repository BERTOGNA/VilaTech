import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, BookOpen, Building2, Users, Rocket, Mail, Globe, Eye, Target, ShieldCheck } from 'lucide-react';
import { heroConfig, siteConfig, instituteNavItems } from '../config';
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
};

interface TopNavigationProps {
  variant?: 'home' | 'institute';
}

const TopNavigation = ({ variant = 'home' }: TopNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navItems = variant === 'home' ? heroConfig.navItems : instituteNavItems;

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

  const scrollToSection = (id: string) => {
    const targetPath = variant === 'home' ? '/' : '/instituto';
    
    // If not on the correct page, redirect to that page with hash
    if (location.pathname !== targetPath) {
      window.location.href = `${targetPath}#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Logo / Brand */}
      <div 
        ref={logoRef} 
        className="fixed top-4 md:top-4 left-0 right-0 z-[100] pointer-events-none mix-blend-difference"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 md:py-4 flex justify-center md:justify-start">
          <Link to="/" className="inline-block pointer-events-auto">
            <img 
              src={siteConfig.logo} 
              alt={heroConfig.brandName} 
              className="w-auto max-w-[140px] md:max-w-[180px] object-contain block hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Navigation pill wrapper to handle blending */}
      <div className="fixed top-20 md:top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none mix-blend-difference">
        <nav
          ref={navRef}
          className="nav-pill rounded-full px-2 py-2 pointer-events-auto text-white"
        >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            const content = (
              <>
                <IconComponent className="w-3.5 h-3.5" />
                <span className="hidden nav:inline">{item.label}</span>
              </>
            );

            if (item.path) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-sans uppercase tracking-wider text-white hover:bg-white/20 transition-colors rounded-full"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => item.sectionId && scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-sans uppercase tracking-wider text-white hover:bg-white/20 transition-colors rounded-full"
              >
                {content}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  </>
  );
};

export default TopNavigation;
