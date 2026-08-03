import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playHoverSound } from '../../utils/sound';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Sardor delivered a workspace UI that runs at locked 120 FPS even during heavy WebSocket state syncs. The motion quality feels like Apple software.",
    author: "Elena Rostova",
    role: "VP of Engineering @ UNIGO",
    offset: "top-0 left-0",
  },
  {
    quote: "His attention to the first 200ms of user interaction completely transformed our checkout conversion. Unmatched craftsmanship.",
    author: "Marcus Vance",
    role: "Founder & CEO @ VERAMODE",
    offset: "top-20 right-0",
  },
  {
    quote: "The GLSL shader fluid integration in AURA is breathtaking. Performs flawlessly across mobile GPUs without heat issues.",
    author: "Dr. Aris Thorne",
    role: "Creative Director @ AURA Studio",
    offset: "top-52 left-1/4",
  },
];

export const Scene9Testimonials: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.testimonial-glass-panel');

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        gsap.to(card, {
          y: idx % 2 === 0 ? -60 : 60,
          rotate: idx % 2 === 0 ? -2 : 2,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 min-h-screen w-full py-32 px-6 sm:px-12 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F] block">
            SCENE 09 — REFRACTIVE TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
            Endorsements from Engineering Leaders
          </h2>
        </div>

        {/* Overlapping Floating Refractive Liquid Glass Panels */}
        <div className="relative min-h-[550px] grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="testimonial-glass-panel p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl hover:border-white/40 hover:bg-white/[0.06] transition-all duration-500 flex flex-col justify-between group cursor-pointer"
            >
              <p className="text-sm sm:text-base text-[#C9D3E0] leading-relaxed italic">
                "{item.quote}"
              </p>

              <div className="pt-6 border-t border-white/10 mt-6">
                <h4 className="font-mono text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {item.author}
                </h4>
                <p className="font-mono text-[10px] text-[#85898F] uppercase mt-1">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
