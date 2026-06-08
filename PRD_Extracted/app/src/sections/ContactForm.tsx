import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { contactFormConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  if (!contactFormConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form reveal animation
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-[#0f172a] to-[#0A0A0F]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono-custom text-xs text-[#F5A623] uppercase tracking-[0.3em] mb-4 block">
            {contactFormConfig.sectionLabel}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            {contactFormConfig.sectionTitle}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {contactFormConfig.description}
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10"
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#2D8B8B]/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#2D8B8B]" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">
                Mensagem enviada!
              </h3>
              <p className="text-white/60">
                {contactFormConfig.successMessage}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="relative">
                  <label className="block text-white/60 text-sm mb-2">
                    {contactFormConfig.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5A623] focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-white/60 text-sm mb-2">
                    {contactFormConfig.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5A623] focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative md:col-span-2">
                  <label className="block text-white/60 text-sm mb-2">
                    {contactFormConfig.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5A623] focus:outline-none transition-colors"
                      placeholder="(11) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-3">
                  {contactFormConfig.interestLabel}
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactFormConfig.interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestChange(interest)}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        formData.interests.includes(interest)
                          ? 'bg-[#F5A623] text-[#1A1A1A]'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:border-[#F5A623]/50'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-white/60 text-sm mb-2">
                  {contactFormConfig.messageLabel}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5A623] focus:outline-none transition-colors resize-none"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#F5A623] text-[#1A1A1A] font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#FFD700] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {contactFormConfig.submitText}
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
