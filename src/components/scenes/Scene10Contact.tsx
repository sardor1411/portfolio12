import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '../../store/useScrollStore';
import { playClickSound, playHoverSound } from '../../utils/sound';
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Send,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene10Props {
  onOpenContact: () => void;
}

interface ContactItem {
  id: string;
  label: string;
  value: string;
  displayValue: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  copyable: boolean;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'ermaxamdovsardor8@gmail.com',
    displayValue: 'ermaxamdovsardor8@gmail.com',
    href: 'mailto:ermaxamdovsardor8@gmail.com',
    icon: Mail,
    copyable: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+998 87 443 53 00',
    displayValue: '+998 87 443 53 00',
    href: 'tel:+998874435300',
    icon: Phone,
    copyable: true,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: 'https://t.me/Ermaxamadov',
    displayValue: '@Ermaxamadov',
    href: 'https://t.me/Ermaxamadov',
    icon: Send,
    copyable: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'https://www.instagram.com/ermaxamadov.sardor/',
    displayValue: '@ermaxamadov.sardor',
    href: 'https://www.instagram.com/ermaxamadov.sardor/',
    icon: Instagram,
    copyable: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/sardor-ermaxamadov-511b7431b/',
    displayValue: 'Sardor Ermaxamadov',
    href: 'https://www.linkedin.com/in/sardor-ermaxamadov-511b7431b/',
    icon: Linkedin,
    copyable: false,
  },
];

// Magnetic Contact Row Component with GSAP Spring Physics
const ContactRow: React.FC<{
  item: ContactItem;
  onCopy: (text: string, label: string) => void;
}> = ({ item, onCopy }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    // Create magnetic spring quickTo instances
    xTo.current = gsap.quickTo(rowRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    yTo.current = gsap.quickTo(rowRef.current, 'y', { duration: 0.4, ease: 'power3.out' });

    return () => {
      xTo.current = null;
      yTo.current = null;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current || !xTo.current || !yTo.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;

    xTo.current(deltaX);
    yTo.current(deltaY);

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 12,
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: 45,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (xTo.current && yTo.current) {
      xTo.current(0);
      yTo.current(0);
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const IconComponent = item.icon;

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHoverSound}
      className="group relative w-full p-4 sm:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-colors duration-300 backdrop-blur-xl flex items-center justify-between shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] cursor-pointer select-none"
    >
      {/* Animated Underline Highlight Bar */}
      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />

      {/* Left Icon & Details */}
      <a
        href={item.href}
        target={item.href.startsWith('http') ? '_blank' : '_self'}
        rel="noreferrer"
        onClick={() => playClickSound()}
        className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0"
      >
        <div
          ref={iconRef}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/15 group-hover:border-white/30 flex items-center justify-center text-[#C9D3E0] group-hover:text-white transition-all duration-300 shadow-inner"
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="flex flex-col text-left truncate">
          <span className="font-mono text-[10px] sm:text-xs text-[#85898F] uppercase tracking-widest font-semibold">
            {item.label}
          </span>
          <span className="text-base sm:text-2xl font-light text-white group-hover:text-white tracking-tight truncate mt-0.5">
            {item.displayValue}
          </span>
        </div>
      </a>

      {/* Right Controls: Copy Button (If copyable) & Interactive Arrow */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2">
        {item.copyable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onCopy(item.value, item.label);
            }}
            title={`Copy ${item.label}`}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/20 text-xs font-mono text-[#85898F] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 min-h-[44px]"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </button>
        )}

        <a
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : '_self'}
          rel="noreferrer"
          className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black text-[#85898F] transition-all duration-300 flex items-center justify-center min-h-[44px] min-w-[44px]"
        >
          <div ref={arrowRef}>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </a>
      </div>
    </div>
  );
};

export const Scene10Contact: React.FC<Scene10Props> = React.memo(({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setLiquidState = useScrollStore((state) => state.setLiquidState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Liquid Companion settles gently into calm background behind presentation ending
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 60%',
        onEnter: () => {
          setLiquidState({
            x: 0,
            y: 0,
            z: -1,
            scale: 2.2,
            distortion: 0.15,
            roughness: 0.2,
            metalness: 0.95,
            color: '#C9D3E0',
            opacity: 0.85,
          });
        },
        onEnterBack: () => {
          setLiquidState({
            x: 0,
            y: 0,
            z: -1,
            scale: 2.2,
            distortion: 0.15,
            roughness: 0.2,
            metalness: 0.95,
            color: '#C9D3E0',
            opacity: 0.85,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setLiquidState]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`✓ Copied ${label} to clipboard`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full py-28 sm:py-36 px-6 sm:px-12 bg-[#050506] flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Softer, calmer Apple-style presentation lighting & background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,211,224,0.08)_0%,rgba(10,10,11,0.95)_70%)] pointer-events-none" />

      {/* Floating Glass Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[250] px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white font-mono text-xs font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Presentation Container */}
      <div className="max-w-4xl w-full mx-auto space-y-12 sm:space-y-16 relative z-10 text-center my-auto">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#85898F] font-semibold">
            FINALE — CONTACT & DIRECT LINES
          </span>
        </div>

        {/* Huge Headline */}
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white leading-[0.98] select-none">
          Let's build something <br />
          <span className="font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#85898F]">
            unforgettable.
          </span>
        </h2>

        {/* Contact Links List */}
        <div className="space-y-3.5 sm:space-y-4 max-w-2xl mx-auto pt-4">
          {CONTACT_ITEMS.map((item) => (
            <ContactRow key={item.id} item={item} onCopy={handleCopy} />
          ))}
        </div>

        {/* Big Interactive Conversation Trigger CTA */}
        <div className="pt-8 sm:pt-12">
          <button
            onClick={() => {
              playClickSound();
              onOpenContact();
            }}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-mono text-sm font-bold tracking-tight hover:bg-[#C9D3E0] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer active:scale-95 inline-flex items-center justify-center gap-3 min-h-[52px]"
          >
            <span>Initiate Direct Proposal</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTACT FOOTER */}
      <footer className="w-full max-w-5xl mx-auto pt-20 pb-8 border-t border-white/10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#85898F] text-center md:text-left">
        <div>
          <p className="text-white font-medium">Designed & Developed by Sardor Ermaxamadov</p>
          <p className="mt-1 text-[#85898F]">© 2026 Sardor Ermaxamadov · All Rights Reserved</p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-1 text-[11px] text-[#85898F]">
          <span>Built with:</span>
          <span className="text-[#C9D3E0]">React</span>
          <span>·</span>
          <span className="text-[#C9D3E0]">TypeScript</span>
          <span>·</span>
          <span className="text-[#C9D3E0]">Three.js</span>
          <span>·</span>
          <span className="text-[#C9D3E0]">GSAP</span>
          <span>·</span>
          <span className="text-[#C9D3E0]">React Three Fiber</span>
          <span>·</span>
          <span className="text-[#C9D3E0]">TailwindCSS</span>
        </div>
      </footer>
    </section>
  );
});
