import React from 'react';
import { playClickSound, playHoverSound } from '../utils/sound';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenPhilosophy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({
  onExploreProjects,
  onOpenPhilosophy,
}) => {
  return (
    <div className="col-span-12 lg:col-span-7 flex flex-col justify-between py-2 sm:py-4 pr-0 lg:pr-8">
      <div>
        {/* Eyebrow Label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs sm:text-[10px] tracking-[0.25em] uppercase text-[#85898F] font-semibold">
            Sardor — Selected Work
          </span>
        </div>

        {/* Main Display Headline (Reflows naturally on Mobile) */}
        <h1 className="leading-[0.94] flex flex-col select-none break-words max-w-full">
          <span className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl font-extralight tracking-tight opacity-90 text-[#F2F3F5]">
            I build the parts
          </span>
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-8xl font-black tracking-tighter mt-1 sm:-mt-2 text-[#F2F3F5] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
            you feel, not just see.
          </span>
        </h1>

        {/* Hero Paragraph */}
        <p className="text-[#85898F] text-base sm:text-lg max-w-md mt-6 sm:mt-8 leading-relaxed font-normal">
          Full-stack engineer. Interfaces, motion, and the small decisions that make software feel expensive and instantaneous.
        </p>

        {/* Quick Stat Badges & Philosophy Trigger */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-8">
          <button
            onClick={() => {
              playClickSound();
              onOpenPhilosophy();
            }}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-0 border border-white/20 bg-white/10 sm:bg-white/5 backdrop-blur-md px-4 py-2.5 sm:py-1.5 rounded-full text-xs font-mono text-white sm:text-[#85898F] hover:text-[#F2F3F5] hover:border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Philosophy: 200ms Standard</span>
          </button>

          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-2.5 sm:py-1.5 rounded-full text-xs font-mono text-[#85898F]">
            Latency: &lt; 20ms
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-2.5 sm:py-1.5 rounded-full text-xs font-mono text-[#85898F]">
            Node / WebGL / React
          </div>
        </div>
      </div>

      {/* Mobile-Optimized CTA & Scroll Indicator */}
      <div className="mt-10 lg:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
        <button
          onClick={() => {
            playClickSound();
            onExploreProjects();
          }}
          onMouseEnter={playHoverSound}
          className="w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-tight hover:bg-[#C9D3E0] transition-all cursor-pointer flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.25)] min-h-[48px] active:scale-95"
        >
          <span>Explore Timeline Work</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-[#85898F] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span>Interactive 10-Scene Experience</span>
        </div>
      </div>
    </div>
  );
});
