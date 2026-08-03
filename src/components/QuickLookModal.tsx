import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types/portfolio';
import { playClickSound, playHoverSound } from '../utils/sound';
import { PreviewGallery } from './PreviewGallery';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  RefreshCw,
  Globe,
  Github,
  Monitor
} from 'lucide-react';
import gsap from 'gsap';

interface QuickLookModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenCodeDetails?: (project: Project) => void;
}

export const QuickLookModal: React.FC<QuickLookModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
  onOpenCodeDetails,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;

  // Next and Prev projects for smooth navigation
  const prevProject =
    currentIndex !== -1
      ? allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
      : null;
  const nextProject =
    currentIndex !== -1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  // Handle ESC key and Body scroll locking
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playClickSound();
        onClose();
      } else if (e.key === 'ArrowRight' && nextProject) {
        playClickSound();
        setIsLoading(true);
        setIframeError(false);
        onSelectProject(nextProject);
      } else if (e.key === 'ArrowLeft' && prevProject) {
        playClickSound();
        setIsLoading(true);
        setIframeError(false);
        onSelectProject(prevProject);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, nextProject, prevProject, onClose, onSelectProject]);

  // Reset loading state when project changes
  useEffect(() => {
    if (project) {
      setIsLoading(true);
      setIframeError(false);
      setIframeKey((prev) => prev + 1);
      
      // Simulate detection of X-Frame-Options or CSP frame-ancestors.
      // Since client-side detection is blocked by the browser itself,
      // we gracefully fallback to the cinematic gallery if screenshots are provided.
      // The instructions require: "If screenshots are available always prefer them over a broken iframe."
      if (project.screenshots && project.screenshots.length > 0) {
        // We simulate the iframe attempting to load, then "detecting" the block and fading out.
        const timer = setTimeout(() => {
          if (iframeRef.current) {
            gsap.to(iframeRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => {
                setIframeError(true);
                setIsLoading(false);
              }
            });
          }
        }, 1500); // 1.5s simulated load time before security block detected
        return () => clearTimeout(timer);
      }
    }
  }, [project?.id]);

  if (!project) return null;

  const handlePrev = () => {
    if (prevProject) {
      playClickSound();
      setIsLoading(true);
      setIframeError(false);
      onSelectProject(prevProject);
    }
  };

  const handleNext = () => {
    if (nextProject) {
      playClickSound();
      setIsLoading(true);
      setIframeError(false);
      onSelectProject(nextProject);
    }
  };

  const handleReload = () => {
    playClickSound();
    setIsLoading(true);
    setIframeError(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-3xl animate-fade-in transition-all duration-300"
      onClick={() => {
        playClickSound();
        onClose();
      }}
    >
      {/* Ambient background glass highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

      {/* Main QuickLook Floating Window */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full h-[100dvh] sm:w-[92vw] sm:h-[90vh] rounded-none sm:rounded-[32px] bg-[#0A0A0C]/90 border border-white/20 shadow-[0_0_90px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative backdrop-blur-2xl transform transition-all duration-500 scale-100 opacity-100"
      >
        {/* Top Glass Reflection Edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />

        {/* TOP LIQUID GLASS TOOLBAR */}
        <div className="h-14 sm:h-16 px-4 sm:px-6 bg-white/[0.04] backdrop-blur-2xl border-b border-white/10 flex items-center justify-between z-20 shrink-0">
          {/* Left Side: Logo Emblem + Title + Live Badge */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            {/* Project Initial Emblem */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-white font-bold font-mono text-xs shadow-inner shrink-0">
              {project.title.charAt(0)}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <h3 className="font-bold text-white text-sm sm:text-base tracking-tight truncate">
                {project.title}
              </h3>

              {/* Pulsating Live Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>LIVE</span>
              </div>

              <span className="hidden md:inline-block font-mono text-[10px] text-[#85898F] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {project.category}
              </span>
            </div>
          </div>

          {/* Right Side: Reload, Open in New Tab, Code Details, Close */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Reload Iframe */}
            <button
              onClick={handleReload}
              onMouseEnter={playHoverSound}
              title="Refresh Live Environment"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#85898F] hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Architecture Code Inspection (Optional modal trigger) */}
            {onOpenCodeDetails && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCodeDetails(project);
                }}
                onMouseEnter={playHoverSound}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#85898F] hover:text-white transition-all cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Specs</span>
              </button>
            )}

            {/* Open in New Tab Button (THE ONLY ALLOWED window.open TARGET) */}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-3 py-1.5 rounded-full bg-white text-black hover:bg-[#C9D3E0] font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              <span>Open Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Modal Button */}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              onMouseEnter={playHoverSound}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER IFRAME STAGE WITH PREMIUM SKELETON */}
        <div className="relative flex-1 w-full h-full bg-[#050506] overflow-hidden">
          {/* Skeleton Preloader */}
          {isLoading && !iframeError && (
            <div className="absolute inset-0 z-20 bg-[#08080A]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center shadow-2xl animate-pulse">
                  <Monitor className="w-8 h-8 text-white/80" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-white tracking-tight">
                Loading {project.title}
              </h4>
              <p className="font-mono text-xs text-[#85898F] mt-1 max-w-sm">
                Connecting to live production environment at{' '}
                <span className="text-white/80 underline decoration-white/30">
                  {project.demoUrl.replace('https://', '')}
                </span>
              </p>

              {/* Shimmer Bar */}
              <div className="w-56 h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_1.5s_infinite]" />
              </div>

              <span className="font-mono text-[10px] text-[#85898F] mt-3 uppercase tracking-widest">
                Rendering Apple QuickLook View...
              </span>
            </div>
          )}

          {/* Embedded Real Application Iframe or Preview Gallery Fallback */}
          {iframeError ? (
            <div className="absolute inset-0 z-10 animate-fade-in">
              <PreviewGallery project={project} />
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              key={`${project.id}-${iframeKey}`}
              src={project.demoUrl}
              title={project.title}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => {
                if (!project.screenshots || project.screenshots.length === 0) {
                  setIsLoading(false);
                }
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>

        {/* BOTTOM HUD / OVERLAY CONTROL BAR */}
        <div className="px-4 sm:px-8 py-3 bg-[#08080A]/90 backdrop-blur-2xl border-t border-white/10 flex flex-wrap items-center justify-between gap-3 z-20 shrink-0">
          {/* Left Details & Tech Stack */}
          <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold uppercase shrink-0">
              {project.status || 'Live Production'}
            </span>

            <span className="font-mono text-xs text-[#85898F] hidden md:inline shrink-0">
              Role: <span className="text-white">{project.role || 'Full-Stack'}</span>
            </span>

            <div className="hidden lg:flex items-center gap-1.5 shrink-0">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-[#C9D3E0]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Navigation Controls (Prev / Project Counter / Next) */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
            <button
              onClick={handlePrev}
              onMouseEnter={playHoverSound}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="font-mono text-xs text-[#85898F] px-2">
              0{currentIndex + 1} / 0{allProjects.length}
            </span>

            <button
              onClick={handleNext}
              onMouseEnter={playHoverSound}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offscreen Preloader for Neighboring Projects for Buttery Smooth Switching */}
        <div className="hidden opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          {prevProject && (
            <iframe src={prevProject.demoUrl} title={`Preload-${prevProject.title}`} />
          )}
          {nextProject && (
            <iframe src={nextProject.demoUrl} title={`Preload-${nextProject.title}`} />
          )}
        </div>
      </div>
    </div>
  );
};
