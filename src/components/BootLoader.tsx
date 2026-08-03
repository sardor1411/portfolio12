import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { bootManager, BootProgress } from '../utils/BootManager';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = React.memo(({ onComplete }) => {
  const [progressState, setProgressState] = useState<BootProgress>({
    percentage: 0,
    status: 'Initializing...',
    isComplete: false,
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = bootManager.subscribe((data) => {
      setProgressState(data);
    });

    bootManager.startBootSequence();

    return unsubscribe;
  }, []);

  // Update progress bar width smoothly
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progressState.percentage}%`,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (progressState.isComplete && overlayRef.current) {
      const ctx = gsap.context(() => {
        gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
            onComplete();
          },
        })
          .to(textRef.current, { opacity: 0, y: -10, duration: 0.3 })
          .to(overlayRef.current, {
            opacity: 0,
            scale: 1.02,
            duration: 0.6,
            ease: 'power2.inOut',
          });
      }, overlayRef);

      return () => ctx.revert();
    }
  }, [progressState, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] bg-[#0A0A0B] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Loader Card */}
      <div
        ref={textRef}
        className="relative z-10 max-w-sm w-full space-y-6 text-center flex flex-col items-center"
      >
        {/* Monogram / Logo */}
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <span className="font-mono text-sm font-bold tracking-widest text-white">S</span>
        </div>

        {/* Status Message */}
        <div className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F]">
            SYSTEM BOOT PIPELINE
          </p>
          <p className="font-mono text-xs text-[#C9D3E0] min-h-[20px] transition-all">
            {progressState.status}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-1.5 overflow-hidden p-0.5 backdrop-blur-md">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-white rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5)]"
            style={{ width: '0%' }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-between w-full font-mono text-[10px] text-[#85898F]">
          <span>EST. 60 FPS</span>
          <span className="text-white font-bold">{progressState.percentage}%</span>
          <span>GPU ACCELERATED</span>
        </div>
      </div>
    </div>
  );
});
