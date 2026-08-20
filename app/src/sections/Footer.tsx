import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Youtube, Music2, Linkedin, Facebook, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { footerConfig, siteConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  music: Music2,
  linkedin: Linkedin,
  facebook: Facebook,
};

const Footer = () => {
  // Null check: if config is empty, do not render
  if (!footerConfig.brandName && !footerConfig.heroTitle && footerConfig.socialLinks.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleContactClick = () => {
    if (footerConfig.subscribeAlertMessage) {
      alert(footerConfig.subscribeAlertMessage);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-void-black overflow-hidden"
    >
      {/* Footer content */}
      <div className="relative bg-void-black py-12 px-4 md:px-8">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-[1440px] mx-auto">
          {/* Footer grid - Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={siteConfig.logo} 
                  alt={footerConfig.brandName} 
                  className="h-8 md:h-10 w-auto object-contain max-w-[200px] md:max-w-[250px]"
                />
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                {footerConfig.brandDescription}
              </p>
              {/* Social links */}
              <div className="flex gap-4">
                {footerConfig.socialLinks.map((social) => {
                  const IconComponent = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-teal hover:border-brand-teal/50 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
                {footerConfig.quickLinksTitle}
              </h3>
              <ul className="space-y-3">
                {footerConfig.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-brand-teal transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
                {footerConfig.contactTitle}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-teal/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/50">{footerConfig.emailLabel}</p>
                    <a href={`mailto:${footerConfig.email}`} className="text-sm text-white hover:text-brand-teal transition-colors">
                      {footerConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-teal/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/50">{footerConfig.phoneLabel}</p>
                    <span className="text-sm text-white">{footerConfig.phone}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-teal/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/50">{footerConfig.addressLabel}</p>
                    <span className="text-sm text-white">{footerConfig.address}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
                {footerConfig.newsletterTitle}
              </h3>
              <p className="text-sm text-white/50 mb-4">
                {footerConfig.newsletterDescription}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50"
                />
                <button
                  onClick={handleContactClick}
                  className="px-4 py-3 bg-brand-teal/20 text-brand-teal rounded-lg text-sm font-medium hover:bg-brand-teal/30 transition-colors"
                >
                  {footerConfig.newsletterButtonText}
                </button>
              </div>
            </div>
          </div>



          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 font-sans">
              {footerConfig.copyrightText}
            </p>
            <div className="flex gap-6">
              {footerConfig.bottomLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-xs text-white/60 hover:text-white/90 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
