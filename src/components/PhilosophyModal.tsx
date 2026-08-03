import React from 'react';
import { PHILOSOPHY_POINTS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/sound';
import { X, Sparkles, Zap, Shield, Flame } from 'lucide-react';

interface PhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhilosophyModal: React.FC<PhilosophyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
            <Sparkles className="w-4 h-4 text-[#C9D3E0]" />
            <span className="font-mono text-xs tracking-widest text-[#F2F3F5] uppercase font-bold">
              Engineering Mindset & Principles
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

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto modal-scroll-container p-5 sm:p-8 space-y-6"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div>
            <h3 className="text-2xl font-light text-white tracking-tight">
              Software you feel <span className="underline underline-offset-8 decoration-white/20">before you see.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#85898F] mt-2 leading-relaxed">
              Below are the three core principles guiding every interface, animation curve, and backend pipeline I author.
            </p>
          </div>

          <div className="space-y-4">
            {PHILOSOPHY_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2">
                  {idx === 0 && <Zap className="w-4 h-4 text-emerald-400" />}
                  {idx === 1 && <Shield className="w-4 h-4 text-cyan-400" />}
                  {idx === 2 && <Flame className="w-4 h-4 text-amber-400" />}
                  <h4 className="font-mono text-sm text-white font-medium">
                    0{idx + 1}. {point.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#85898F] leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs text-[#85898F]">
            <span>Latency Target: &lt; 20ms</span>
            <span className="text-emerald-400 font-bold">FPS Target: 120Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
};
