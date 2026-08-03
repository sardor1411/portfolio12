import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Scene8Stats: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: function () {
                const prog = this.progress();
                if (num1Ref.current) num1Ref.current.innerText = `${Math.floor(prog * 120)}`;
                if (num2Ref.current) num2Ref.current.innerText = `${(Math.floor(prog * 99.9 * 10) / 10).toFixed(1)}`;
                if (num3Ref.current) num3Ref.current.innerText = `${Math.floor(prog * 14)}`;
              },
            }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full py-32 px-6 sm:px-12 bg-[#0A0A0B] flex items-center justify-center overflow-hidden"
    >
      {/* Animated Traveling Glass Beam Line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
      </div>

      <div className="max-w-5xl w-full space-y-16 relative z-10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block text-center">
          SCENE 08 — QUANTIFIED PERFORMANCE
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Stat 1 */}
          <div className="space-y-2">
            <span className="text-6xl sm:text-8xl font-black text-white tracking-tighter">
              <span ref={num1Ref}>0</span>
              <span className="text-2xl text-[#85898F] font-light">Hz</span>
            </span>
            <p className="font-mono text-xs uppercase text-[#85898F] tracking-widest">
              Refresh Rate Budget
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2">
            <span className="text-6xl sm:text-8xl font-black text-white tracking-tighter">
              <span ref={num2Ref}>0.0</span>
              <span className="text-2xl text-[#85898F] font-light">%</span>
            </span>
            <p className="font-mono text-xs uppercase text-[#85898F] tracking-widest">
              Uptime SLA Stability
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2">
            <span className="text-6xl sm:text-8xl font-black text-white tracking-tighter">
              <span ref={num3Ref}>0</span>
              <span className="text-2xl text-[#85898F] font-light">ms</span>
            </span>
            <p className="font-mono text-xs uppercase text-[#85898F] tracking-widest">
              P99 Latency Goal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
