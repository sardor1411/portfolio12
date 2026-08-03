import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '../../store/useScrollStore';

gsap.registerPlugin(ScrollTrigger);

export const Scene3About: React.FC = React.memo(() => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const glassPanelRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const setLiquidState = useScrollStore((state) => state.setLiquidState);

  useEffect(() => {
    if (!pinContainerRef.current || !textContainerRef.current || !glassPanelRef.current) return;

    // Split text into words
    const wordsList = textContainerRef.current.querySelectorAll('.word-item');

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=180%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            setLiquidState({
              x: gsap.utils.interpolate(0, -2.2, self.progress),
              y: gsap.utils.interpolate(0, 0.5, self.progress),
              scale: gsap.utils.interpolate(1.4, 1.1, self.progress),
            });
          },
        },
      });

      // 1. ENTER (0% -> 25%): Glass panel slides up from behind
      timeline.fromTo(
        glassPanelRef.current,
        { y: 150, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.25 }
      );

      // 2. WORD REVEAL (25% -> 55%): Words reveal word-by-word
      timeline.fromTo(
        wordsList,
        { opacity: 0, y: 25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, ease: 'power3.out', duration: 0.3 }
      );

      // 3. HOLD / READING PHASE (55% -> 80%): Text remains completely visible & crisp
      timeline.to(glassPanelRef.current, {
        opacity: 1,
        duration: 0.25,
      });

      // 4. EXIT (80% -> 100%): Gentle exit fade & float
      timeline.to(glassPanelRef.current, {
        y: -40,
        opacity: 0.15,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
      });
    }, pinContainerRef);

    return () => ctx.revert();
  }, [setLiquidState]);

  const paragraphWords =
    "I care about the 200 milliseconds after a click more than almost anything else on the page. I engineer digital interfaces as physical instruments where every millisecond of motion conveys weight, luxury, and instant response.".split(
      " "
    );

  return (
    <section
      ref={pinContainerRef}
      className="relative z-20 min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-20 bg-[#0A0A0B]/60"
    >
      {/* Sliding Refractive Glass Panel */}
      <div
        ref={glassPanelRef}
        className="relative max-w-4xl w-full p-8 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Subtle internal glass reflection line */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block">
            SCENE 03 — ABOUT PHILOSOPHY
          </span>

          <div ref={textContainerRef} className="flex flex-wrap text-2xl sm:text-4xl font-light text-[#F2F3F5] leading-relaxed gap-x-2.5 gap-y-1">
            {paragraphWords.map((word, idx) => (
              <span key={idx} className="word-item inline-block">
                {word}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#85898F]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero-layout-shift standard</span>
            </div>
            <span>60-120 FPS Framerate Budget</span>
          </div>
        </div>
      </div>
    </section>
  );
});
