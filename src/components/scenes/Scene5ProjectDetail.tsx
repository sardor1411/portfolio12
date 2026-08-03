import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { Project3DMockup } from '../3d/Project3DMockup';
import { playClickSound, playHoverSound } from '../../utils/sound';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Scene5Props {
  onSelectProject: (project: Project) => void;
}

export const Scene5ProjectDetail: React.FC<Scene5Props> = React.memo(({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = PROJECTS;

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll('.featured-pin-section');
    const mm = gsap.matchMedia(containerRef);

    // =========================================================
    // DESKTOP: CINEMATIC PINNED 4-STAGE STORYTELLING (>= 768px)
    // =========================================================
    mm.add('(min-width: 768px)', () => {
      sections.forEach((sec) => {
        const mockupWrapper = sec.querySelector('.project-mockup-wrapper');
        const badgeLabel = sec.querySelector('.project-badge-label');
        const title = sec.querySelector('.project-detail-title');
        const desc = sec.querySelector('.project-detail-desc');
        const stats = sec.querySelectorAll('.project-stat-card');
        const techChips = sec.querySelectorAll('.project-tech-chip');
        const ctaBtn = sec.querySelector('.project-cta-btn');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // STAGE 1 — ENTER (0% -> 20%): Hardware mockup settles, lighting fades in
        tl.fromTo(
          mockupWrapper,
          { scale: 0.88, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }
        );

        // STAGE 2 — CONTENT REVEAL (20% -> 50%): Scene label, Title & Description animate sequentially
        tl.fromTo(
          badgeLabel,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.1 },
          '-=0.05'
        );

        tl.fromTo(
          title,
          { scale: 0.92, opacity: 0, y: 25 },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out', duration: 0.15 },
          '+=0.02'
        );

        tl.fromTo(
          desc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.15 },
          '+=0.02'
        );

        // STAGE 3 — DETAILS (50% -> 65%): Metrics, tech chips, and CTA button reveal
        tl.fromTo(
          stats,
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.15 },
          '+=0.02'
        );

        tl.fromTo(
          techChips,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 0.1 },
          '-=0.05'
        );

        tl.fromTo(
          ctaBtn,
          { scale: 0.9, opacity: 0, y: 10 },
          { scale: 1, opacity: 1, y: 0, ease: 'back.out(1.4)', duration: 0.15 },
          '-=0.02'
        );

        // STAGE 3 HOLD / PAUSE PHASE (65% -> 85%): Scene remains 100% pinned, crisp & stationary
        tl.to(title, {
          opacity: 1,
          duration: 0.35,
        });

        // STAGE 4 — EXIT (85% -> 100%): Gentle exit transition
        tl.to(
          [mockupWrapper, badgeLabel, title, desc, stats, techChips, ctaBtn],
          {
            opacity: 0.1,
            y: -30,
            scale: 0.97,
            stagger: 0.02,
            duration: 0.2,
            ease: 'power2.in',
          }
        );
      });
    });

    // =========================================================
    // MOBILE: NATURAL STACKED REVEALS (NO LONG PINNING) (< 768px)
    // =========================================================
    mm.add('(max-width: 767px)', () => {
      sections.forEach((sec) => {
        const mockupWrapper = sec.querySelector('.project-mockup-wrapper');
        const badgeLabel = sec.querySelector('.project-badge-label');
        const title = sec.querySelector('.project-detail-title');
        const desc = sec.querySelector('.project-detail-desc');
        const stats = sec.querySelectorAll('.project-stat-card');
        const techChips = sec.querySelectorAll('.project-tech-chip');
        const ctaBtn = sec.querySelector('.project-cta-btn');

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        mobileTl
          .fromTo(
            mockupWrapper,
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
          )
          .fromTo(
            badgeLabel,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(
            title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            '-=0.15'
          )
          .fromTo(
            desc,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            '-=0.2'
          )
          .fromTo(
            stats,
            { opacity: 0, y: 15, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out' },
            '-=0.15'
          )
          .fromTo(
            techChips,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.03, duration: 0.25, ease: 'power2.out' },
            '-=0.15'
          )
          .fromTo(
            ctaBtn,
            { opacity: 0, y: 15, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.2)' },
            '-=0.1'
          );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-[#0A0A0B]">
      {featuredProjects.map((proj, idx) => (
        <section
          key={proj.id}
          className="featured-pin-section min-h-0 sm:min-h-screen w-full flex items-center justify-center px-4 sm:px-12 py-12 sm:py-20 border-b border-white/5 overflow-hidden"
        >
          <div className="max-w-6xl w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* 3D Floating Mockup Wrapper */}
            <div className="project-mockup-wrapper w-full lg:col-span-6 order-1">
              <Project3DMockup
                title={proj.title}
                category={proj.category}
                metrics={proj.metrics}
              />
            </div>

            {/* Project Details Panel */}
            <div className="w-full lg:col-span-6 order-2 space-y-5 sm:space-y-6">
              <div className="project-badge-label flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#85898F]">
                  SCENE 05 — SHOWCASE 0{idx + 1}
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold uppercase">
                  {proj.category}
                </span>
              </div>

              <h2 className="project-detail-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white select-none">
                {proj.title}
              </h2>

              <p className="project-detail-desc text-sm sm:text-lg text-[#85898F] leading-relaxed">
                {proj.description}
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {proj.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="project-stat-card p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase text-[#85898F] block truncate">
                      {metric.label}
                    </span>
                    <span className="text-base sm:text-xl font-bold text-white mt-0.5 block">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {proj.techStack.slice(0, 5).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="project-tech-chip font-mono text-[9px] sm:text-[10px] text-[#C9D3E0] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="project-cta-btn pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    playClickSound();
                    onSelectProject(proj);
                  }}
                  onMouseEnter={playHoverSound}
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-3 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-[#C9D3E0] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.3)] min-h-[48px] active:scale-95"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Launch Live QuickLook</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
});
