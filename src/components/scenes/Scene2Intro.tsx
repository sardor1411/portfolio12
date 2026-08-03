import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '../../store/useScrollStore';

gsap.registerPlugin(ScrollTrigger);

export const Scene2Intro: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const setLiquidState = useScrollStore((state) => state.setLiquidState);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Split headline text into letters
    const rawText = "Software created with weight, tactile motion, and physical intent.";
    const words = rawText.split(" ");
    textRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block whitespace-nowrap mr-3">${word
            .split("")
            .map(
              (char) =>
                `<span class="letter inline-block transition-transform opacity-20 blur-[4px]">${char}</span>`
            )
            .join("")}</span>`
      )
      .join("");

    const letters = textRef.current.querySelectorAll('.letter');

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=160%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            // Shift Liquid Companion 3D model toward center with higher distortion
            setLiquidState({
              x: gsap.utils.interpolate(2.5, 0, self.progress),
              y: gsap.utils.interpolate(1.2, 0, self.progress),
              scale: gsap.utils.interpolate(1, 1.4, self.progress),
              distortion: gsap.utils.interpolate(0.4, 0.85, self.progress),
            });
          },
        },
      });

      // 1. ENTER PHASE (0% -> 35%): Letters unblur & illuminate sequentially
      tl.to(letters, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        stagger: 0.02,
        ease: 'power3.out',
        duration: 0.35,
      });

      // 2. HOLD PHASE (35% -> 80%): Text remains pinned and 100% crisp for visitor to read comfortably
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.45,
      });

      // 3. EXIT PHASE (80% -> 100%): Gentle scale & fade out before unpinning
      tl.to(containerRef.current, {
        opacity: 0.1,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setLiquidState]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-32"
    >
      <div className="max-w-4xl text-center space-y-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block">
          SCENE 02 — INTRO PHENOMENOLOGY
        </span>

        <h2
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F2F3F5] leading-tight select-none"
        >
          Software created with weight, tactile motion, and physical intent.
        </h2>

        <div className="pt-8 flex justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
});
