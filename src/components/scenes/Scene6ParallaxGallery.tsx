import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playHoverSound } from '../../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export const Scene6ParallaxGallery: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fastLayerRef = useRef<HTMLDivElement>(null);
  const mediumLayerRef = useRef<HTMLDivElement>(null);
  const slowLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scrolling speeds
      gsap.to(fastLayerRef.current, {
        y: -180,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(mediumLayerRef.current, {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(slowLayerRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full py-32 px-6 sm:px-12 bg-[#0A0A0B]/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block">
            SCENE 06 — MULTI-DEPTH PARALLAX GALLERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
            Architectural Depth & Refraction
          </h2>
        </div>

        {/* Multi-depth grid */}
        <div className="relative min-h-[600px] grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Slow Layer */}
          <div ref={slowLayerRef} className="space-y-8">
            <div
              onMouseEnter={playHoverSound}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl hover:border-white/30 transition-all duration-300 group"
            >
              <div className="h-40 rounded-xl bg-[#121316] border border-white/10 p-4 font-mono text-[10px] text-[#85898F] flex flex-col justify-between">
                <span>// LAYER 01 — DEEP BACKDROP</span>
                <span className="text-white text-xs">Vector Field Simulation</span>
              </div>
              <h4 className="text-sm font-mono text-white mt-4">FBO Framebuffers</h4>
            </div>
          </div>

          {/* Medium Layer */}
          <div ref={mediumLayerRef} className="space-y-8 md:mt-12">
            <div
              onMouseEnter={playHoverSound}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl hover:border-white/30 transition-all duration-300 group"
            >
              <div className="h-52 rounded-xl bg-[#16171B] border border-white/10 p-4 font-mono text-[10px] text-[#85898F] flex flex-col justify-between">
                <span>// LAYER 02 — MIDPLANE METRICS</span>
                <span className="text-emerald-400 text-xs">Sub-20ms Synchronization</span>
              </div>
              <h4 className="text-sm font-mono text-white mt-4">Delta Stream Protocol</h4>
            </div>
          </div>

          {/* Fast Layer */}
          <div ref={fastLayerRef} className="space-y-8 md:mt-24">
            <div
              onMouseEnter={playHoverSound}
              className="p-6 rounded-2xl bg-white/[0.06] border border-white/20 backdrop-blur-xl shadow-2xl hover:border-white/40 transition-all duration-300 group"
            >
              <div className="h-64 rounded-xl bg-[#1C1E24] border border-white/15 p-4 font-mono text-[10px] text-[#85898F] flex flex-col justify-between">
                <span>// LAYER 03 — FOREGROUND SHADER</span>
                <span className="text-cyan-400 text-xs">120 FPS Fluid Motion</span>
              </div>
              <h4 className="text-sm font-mono text-white mt-4">Glass Physics Engine</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
