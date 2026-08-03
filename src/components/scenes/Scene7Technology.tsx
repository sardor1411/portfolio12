import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechUniverseCanvas } from '../3d/TechUniverseCanvas';

gsap.registerPlugin(ScrollTrigger);

export const Scene7Technology: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=160%',
          pin: true,
          scrub: 1.2,
        },
      });

      // 1. ENTER (0% -> 25%)
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.25 }
      );

      // 2. HOLD PHASE (25% -> 80%): Pinned constellation stays fully visible for inspection
      tl.to(contentRef.current, {
        opacity: 1,
        duration: 0.55,
      });

      // 3. EXIT (80% -> 100%)
      tl.to(contentRef.current, {
        opacity: 0.15,
        y: -30,
        scale: 0.97,
        duration: 0.2,
        ease: 'power2.in',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full py-20 sm:py-28 px-6 sm:px-12 bg-[#0A0A0B] flex flex-col justify-center overflow-hidden"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block">
              SCENE 07 — FLOATING 3D TECH UNIVERSE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
              Constellation of Core Engineering
            </h2>
          </div>
          <span className="font-mono text-xs text-[#85898F]">
            Interactive WebGL Graph Node Matrix
          </span>
        </div>

        {/* 3D Universe Canvas */}
        <TechUniverseCanvas />
      </div>
    </section>
  );
});

