import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { playClickSound, playHoverSound } from '../utils/sound';

interface ToolkitBarProps {
  onOpenToolkitModal: () => void;
}

const TOOLS = [
  'React 19',
  'TypeScript',
  'Three.js / WebGL',
  'GSAP Animations',
  'Tailwind CSS',
  'Node.js Engine',
  'PostgreSQL',
  'Supabase',
  'Framer Motion',
  'Gemini AI SDK',
  'Vite',
  'Python / FastAPI',
];

export const ToolkitBar: React.FC<ToolkitBarProps> = React.memo(({ onOpenToolkitModal }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    // Create continuous linear animation from 0% to -50% using GPU translate3d
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  // Smoothly slow down the ticker on hover (Apple / Linear style deceleration)
  const handleMouseEnter = useCallback(() => {
    playHoverSound();
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, []);

  // Smoothly accelerate back to full speed on release
  const handleMouseLeave = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  }, []);

  const handleClick = useCallback(() => {
    playClickSound();
    onOpenToolkitModal();
  }, [onOpenToolkitModal]);

  // Duplicate tools array 4 times for a flawless, 100% seamless infinite loop
  const duplicatedTools = [...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-0 inset-x-0 py-3.5 sm:py-5 border-t border-white/10 bg-[#0A0A0B]/85 backdrop-blur-xl z-[60] cursor-pointer group hover:bg-[#0A0A0B]/98 transition-colors select-none overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 sm:px-8 relative">
        {/* Left & Right Smooth Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 sm:right-64 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none hidden sm:block" />

        {/* Living Infinite Marquee Row */}
        <div className="flex-1 overflow-hidden py-1">
          <div
            ref={marqueeRef}
            className="flex items-center gap-4 sm:gap-8 whitespace-nowrap will-change-transform"
          >
            {duplicatedTools.map((tool, idx) => (
              <div
                key={`${tool}-${idx}`}
                className="flex items-center gap-4 sm:gap-8 group/chip"
              >
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#85898F] uppercase transition-all duration-300 px-2.5 py-1 rounded-md border border-transparent group-hover/chip:border-white/20 group-hover/chip:bg-white/10 group-hover/chip:text-white group-hover/chip:scale-105 group-hover/chip:-translate-y-0.5 group-hover/chip:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  {tool}
                </span>
                <div className="w-1 h-1 bg-white/20 rounded-full shrink-0 group-hover/chip:bg-white/60 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Badge Action Indicator */}
        <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-[#85898F] shrink-0 pl-6 z-20 bg-[#0A0A0B]/80 backdrop-blur-md">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-wider text-[#C9D3E0] group-hover:border-white/40 group-hover:text-white group-hover:bg-white/10 transition-all font-bold shadow-sm">
            EXPLORE STACK ↗
          </span>
          <span className="opacity-50 text-[9px]">© 2026 Sardor</span>
        </div>
      </div>
    </div>
  );
});

