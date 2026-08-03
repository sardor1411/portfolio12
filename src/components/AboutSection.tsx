import React from 'react';
import { playClickSound, playHoverSound } from '../utils/sound';
import { Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onOpenPhilosophy: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPhilosophy }) => {
  return (
    <section className="w-full">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#85898F] block mb-4">
        About
      </span>
      <p className="text-[#85898F] text-sm leading-relaxed font-normal">
        I care about the 200 milliseconds after a click more than almost anything else on the page. No headshot. Just the work.
      </p>

      <button
        onClick={() => {
          playClickSound();
          onOpenPhilosophy();
        }}
        onMouseEnter={playHoverSound}
        className="mt-4 flex items-center gap-2 font-mono text-[11px] text-[#C9D3E0] hover:text-white transition-colors cursor-pointer group"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#85898F] group-hover:text-white transition-colors" />
        <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white/60">
          Read Engineering Philosophy
        </span>
      </button>
    </section>
  );
};
