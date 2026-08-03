import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Project } from '../types/portfolio';
import { ShieldAlert, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

interface PreviewGalleryProps {
  project: Project;
}

export const PreviewGallery: React.FC<PreviewGalleryProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const screenshots = project.screenshots || [];

  useEffect(() => {
    if (!screenshots.length) return;

    // Cinematic Intro Animations
    const tl = gsap.timeline();

    // Slide down notification
    if (notificationRef.current) {
      tl.fromTo(
        notificationRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
        0.5
      );
    }

    // Initial first slide fade-in and very slow zoom
    if (slidesRef.current[0]) {
      gsap.fromTo(
        slidesRef.current[0],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }
      );
    }

    // Setup Slideshow interval using GSAP timeline for exact 3.5s crossfades
    let slideIndex = 0;
    const interval = setInterval(() => {
      const nextSlideIndex = (slideIndex + 1) % screenshots.length;
      const current = slidesRef.current[slideIndex];
      const next = slidesRef.current[nextSlideIndex];

      if (current && next) {
        const crossfadeTl = gsap.timeline();

        // Bring next slide above current
        gsap.set(next, { zIndex: 10, opacity: 0, scale: 1.05 });
        gsap.set(current, { zIndex: 5 });

        // Crossfade and subtle pan/zoom
        crossfadeTl
          .to(next, {
            opacity: 1,
            scale: 1, // very slow zoom in
            duration: 1.8,
            ease: 'power1.inOut',
          })
          .to(
            current,
            {
              opacity: 0,
              scale: 0.98,
              duration: 1.8,
              ease: 'power1.inOut',
            },
            '<'
          );

        slideIndex = nextSlideIndex;
        setCurrentSlide(nextSlideIndex);
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [screenshots.length]);

  if (!screenshots.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050506]">
        <ImageIcon className="w-12 h-12 text-white/20 mb-4" />
        <p className="text-[#85898F] font-mono text-sm">No preview available.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#050506] overflow-hidden">
      {/* Slideshow Container */}
      <div className="absolute inset-0 z-0">
        {screenshots.map((src, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) slidesRef.current[idx] = el;
            }}
            className="absolute inset-0 w-full h-full opacity-0 flex items-center justify-center bg-[#0A0A0C]"
            style={{ zIndex: idx === 0 ? 5 : 1 }}
          >
            {/* Soft Lighting / Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,6,0.6)_100%)] z-10 pointer-events-none" />
            
            <img
              src={src}
              alt={`${project.title} Preview ${idx + 1}`}
              className="w-full h-full object-cover object-center sm:object-contain sm:p-8 md:p-12"
            />
          </div>
        ))}
      </div>

      {/* Floating Notification */}
      <div className="absolute top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          ref={notificationRef}
          className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 max-w-lg w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-start gap-4 pointer-events-auto"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm mb-1 tracking-tight">Live Preview unavailable</h4>
            <p className="text-[#85898F] text-xs leading-relaxed mb-4">
              This website prevents embedded previews for security reasons. You can still explore the project through the screenshots below, or open the live website in a new tab.
            </p>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs transition-all hover:bg-[#C9D3E0] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <span>Open Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 inset-x-0 z-50 flex justify-center gap-2 pointer-events-none">
        {screenshots.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              idx === currentSlide ? 'bg-white scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
