import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types/portfolio';
import { playClickSound, playHoverSound, playSuccessSound } from '../utils/sound';
import { X, Send, Copy, Check, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  initialSubject = '',
  onClose,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    budget: '$20k - $40k',
    message: initialSubject ? `Hi Sardor,\n\nI'd like to discuss: ${initialSubject}` : '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Sardor,\n\nI'd like to discuss: ${initialSubject}`,
      }));
    }
  }, [initialSubject]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ermaxamdovsardor8@gmail.com');
    setCopiedEmail(true);
    playClickSound();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+998 87 443 53 00');
    setCopiedPhone(true);
    playClickSound();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      playSuccessSound();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div 
        className="w-full max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[90vh] bg-[#0D0E10] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Down Handle Indicator */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C9D3E0]" />
            <span className="font-mono text-xs tracking-widest text-[#F2F3F5] uppercase font-bold">
              Direct Proposal — Sardor Ermaxamadov
            </span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            onMouseEnter={playHoverSound}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white sm:text-[#85898F] hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div 
          className="flex-1 overflow-y-auto modal-scroll-container p-5 sm:p-8 space-y-6"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Proposal Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-[#85898F] max-w-sm mx-auto leading-relaxed font-mono">
                Thank you. Sardor typically reviews technical inquiries within 6-12 hours.
              </p>
              <button
                onClick={() => {
                  playClickSound();
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer min-h-[48px]"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl font-light text-white tracking-tight">
                  Let's build something <span className="underline underline-offset-8 decoration-white/20">unforgettable.</span>
                </h3>
              </div>

              {/* Direct Email & Phone Quick Copiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <a
                    href="mailto:ermaxamdovsardor8@gmail.com"
                    className="font-mono text-[11px] text-[#C9D3E0] hover:text-white truncate"
                  >
                    ermaxamdovsardor8@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="ml-2 flex items-center gap-1 text-[10px] font-mono text-[#85898F] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <a
                    href="tel:+998874435300"
                    className="font-mono text-[11px] text-[#C9D3E0] hover:text-white truncate"
                  >
                    +998 87 443 53 00
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="ml-2 flex items-center gap-1 text-[10px] font-mono text-[#85898F] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#85898F] mb-1.5 font-bold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-3 text-xs font-mono text-white placeholder-[#85898F] focus:outline-none focus:border-white/30 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#85898F] mb-1.5 font-bold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-3 text-xs font-mono text-white placeholder-[#85898F] focus:outline-none focus:border-white/30 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#85898F] mb-1.5 font-bold">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#141518] border border-white/10 rounded-lg px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-white/30 cursor-pointer min-h-[44px]"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="Interactive WebGL / Motion">Interactive WebGL / Motion</option>
                    <option value="Design System & Architecture">Design System & Architecture</option>
                    <option value="Technical Advisory">Technical Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#85898F] mb-1.5 font-bold">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#141518] border border-white/10 rounded-lg px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-white/30 cursor-pointer min-h-[44px]"
                  >
                    <option value="$10k - $20k">$10k - $20k</option>
                    <option value="$20k - $40k">$20k - $40k</option>
                    <option value="$40k+">$40k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#85898F] mb-1.5 font-bold">
                  Project Brief / Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about the goals, timeline, and key technical considerations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-xs font-mono text-white placeholder-[#85898F] focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href="https://t.me/Ermaxamadov"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#85898F] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/ermaxamadov.sardor/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#85898F] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sardor-ermaxamadov-511b7431b/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#85898F] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  onMouseEnter={playHoverSound}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium text-xs hover:bg-[#C9D3E0] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px] font-bold"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Dispatching...' : 'Send Proposal ↗'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
