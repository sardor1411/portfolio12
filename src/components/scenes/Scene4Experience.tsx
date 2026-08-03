import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { playClickSound, playHoverSound } from '../../utils/sound';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene4Props {
  onSelectProject: (project: Project) => void;
}

export const Scene4Experience: React.FC<Scene4Props> = React.memo(({ onSelectProject }) => {
  const outerPinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerPinRef.current || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth;
    const amountToScroll = totalWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: outerPinRef.current,
          start: 'top top',
          end: `+=${amountToScroll + 600}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, outerPinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={outerPinRef} className="relative z-20 h-screen w-full overflow-hidden bg-[#0A0A0B]">
      <div className="absolute top-8 left-10 z-30 font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F]">
        SCENE 04 — CINEMATIC TIMELINE JOURNEY (400VW)
      </div>

      {/* Horizontal Track Container */}
      <div ref={trackRef} className="h-full flex items-center gap-12 sm:gap-20 px-12 sm:px-24 w-max">
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            className="w-[85vw] sm:w-[65vw] md:w-[50vw] max-w-2xl h-[70vh] rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-500 shrink-0"
          >
            {/* Top Index & Year */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-[#85898F]">
                STOP 0{idx + 1} / 0{PROJECTS.length}
              </span>
              <span className="font-mono text-xs text-[#85898F]">{proj.year}</span>
            </div>

            {/* Middle Content */}
            <div className="space-y-4 my-auto">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 inline-block">
                {proj.category}
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight group-hover:scale-105 origin-left transition-transform duration-500">
                {proj.title}
              </h3>
              <p className="text-sm sm:text-base text-[#85898F] leading-relaxed max-w-lg">
                {proj.tagline}
              </p>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-[#C9D3E0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="font-mono text-xs text-[#85898F]">
                Avg Latency: <span className="text-white">{proj.metrics[0]?.value}</span>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onSelectProject(proj);
                }}
                onMouseEnter={playHoverSound}
                className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-[#C9D3E0] transition-all cursor-pointer flex items-center gap-2 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Live Preview</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
