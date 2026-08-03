import React, { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Scene2Intro } from './components/scenes/Scene2Intro';
import { Scene3About } from './components/scenes/Scene3About';
import { Scene4Experience } from './components/scenes/Scene4Experience';
import { Scene5ProjectDetail } from './components/scenes/Scene5ProjectDetail';
import { Scene6ParallaxGallery } from './components/scenes/Scene6ParallaxGallery';
import { Scene7Technology } from './components/scenes/Scene7Technology';
import { Scene8Stats } from './components/scenes/Scene8Stats';
import { Scene9Testimonials } from './components/scenes/Scene9Testimonials';
import { Scene10Contact } from './components/scenes/Scene10Contact';

import { PROJECTS } from './data/portfolioData';
import { ToolkitBar } from './components/ToolkitBar';
import { LiquidCanvas } from './components/3d/LiquidCanvas';
import { CustomCursor } from './components/CustomCursor';
import { AmbientEnvironment } from './components/AmbientEnvironment';
import { BootLoader } from './components/BootLoader';
import { useScrollStore } from './store/useScrollStore';
import { useModalScrollLock } from './hooks/useModalScrollLock';

// Lazy loaded modals for optimal initial JavaScript bundle size
const QuickLookModal = lazy(() => import('./components/QuickLookModal').then((m) => ({ default: m.QuickLookModal })));
const ProjectModal = lazy(() => import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal })));
const ToolkitModal = lazy(() => import('./components/ToolkitModal').then((m) => ({ default: m.ToolkitModal })));
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));
const PhilosophyModal = lazy(() => import('./components/PhilosophyModal').then((m) => ({ default: m.PhilosophyModal })));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState<'work' | 'about' | 'toolkit' | 'contact'>('work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [specProject, setSpecProject] = useState<Project | null>(null);
  const [isToolkitModalOpen, setIsToolkitModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhilosophyModalOpen, setIsPhilosophyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [soundActive, setSoundActive] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const setLiquidState = useScrollStore((s) => s.setLiquidState);

  // Modal Scroll Lock Controller
  const isAnyModalOpen = Boolean(
    selectedProject ||
      specProject ||
      isToolkitModalOpen ||
      isContactModalOpen ||
      isPhilosophyModalOpen ||
      isMobileMenuOpen
  );

  useModalScrollLock(isAnyModalOpen, lenisRef.current);

  // Initialize Lenis Inertia Scroll & Sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial Hash Deep-Link Handling
    const hash = window.location.hash.replace('#', '');
    if (['work', 'about', 'toolkit', 'contact'].includes(hash)) {
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { duration: 1.2, offset: -20 });
          setActiveTab(hash as any);
        }
      }, 300);
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  // Setup ScrollSpy & Continuous Liquid Companion Transformations
  useEffect(() => {
    const sections: Array<{ id: 'work' | 'about' | 'toolkit' | 'contact'; liquid: any }> = [
      {
        id: 'work',
        liquid: { x: 2.2, y: 0.8, z: 0, scale: 1.1, distortion: 0.45, roughness: 0.1, metalness: 0.85 },
      },
      {
        id: 'about',
        liquid: { x: -2.0, y: 0.2, z: -0.5, scale: 1.3, distortion: 0.65, roughness: 0.2, metalness: 0.7 },
      },
      {
        id: 'toolkit',
        liquid: { x: 0, y: 0.5, z: 0.5, scale: 1.4, distortion: 0.75, roughness: 0.05, metalness: 0.9 },
      },
      {
        id: 'contact',
        liquid: { x: 0, y: -0.8, z: 0, scale: 1.6, distortion: 0.85, roughness: 0.15, metalness: 0.95 },
      },
    ];

    const triggers: ScrollTrigger[] = [];

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveTab(sec.id);
          window.history.replaceState(null, '', `#${sec.id}`);
          setLiquidState(sec.liquid);
        },
        onEnterBack: () => {
          setActiveTab(sec.id);
          window.history.replaceState(null, '', `#${sec.id}`);
          setLiquidState(sec.liquid);
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [setLiquidState]);

  // Smooth Scroll Navigation Handler
  const handleNavigateSection = (sectionId: 'work' | 'about' | 'toolkit' | 'contact') => {
    setActiveTab(sectionId);
    window.history.replaceState(null, '', `#${sectionId}`);

    const targetEl = document.getElementById(sectionId);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { duration: 1.2, offset: -20 });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithSubject = (subject: string) => {
    setContactSubject(subject);
    setIsContactModalOpen(true);
  };

  const handleOpenContact = () => {
    setContactSubject('');
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F2F3F5] font-sans relative overflow-x-hidden select-none">
      {/* Continuous Animated Background Environment (Light Bloom & Particle Field) */}
      <AmbientEnvironment />

      {/* 3D WebGL Liquid Companion Canvas */}
      <LiquidCanvas />

      {/* Trailing Dot Cursor */}
      <CustomCursor />

      {/* Top Floating Navbar (Supports Mobile Fullscreen Glass Navigation) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateSection={handleNavigateSection}
        onOpenContact={handleOpenContact}
        soundActive={soundActive}
        setSoundActive={setSoundActive}
        onMobileMenuToggle={(isOpen) => setIsMobileMenuOpen(isOpen)}
      />

      {/* SECTION 1 — HERO & WORK INTRO (#work) */}
      <section
        id="work"
        className="relative z-10 w-full max-w-[1400px] mx-auto min-h-screen grid grid-cols-12 px-6 sm:px-10 pt-28 sm:pt-36 pb-20 gap-y-12 lg:gap-y-0"
      >
        <HeroSection
          onExploreProjects={() => handleNavigateSection('about')}
          onOpenPhilosophy={() => setIsPhilosophyModalOpen(true)}
        />
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-end pl-0 lg:pl-12 pb-12">
          <p className="text-[#85898F] text-xs sm:text-sm leading-relaxed font-mono">
            Scroll down to enter the continuous 10-Scene cinematic experience powered by WebGL, GSAP ScrollTrigger, and Lenis.
          </p>
        </div>
      </section>

      {/* SCENE 2 — INTRO PHENOMENOLOGY */}
      <Scene2Intro />

      {/* SECTION 2 — ABOUT & PHILOSOPHY (#about) */}
      <div id="about">
        <Scene3About />
      </div>

      {/* SCENE 4 — CINEMATIC TIMELINE JOURNEY */}
      <div id="scene-4-timeline">
        <Scene4Experience onSelectProject={(proj) => setSelectedProject(proj)} />
      </div>

      {/* SCENE 5 — FULLSCREEN PROJECT SHOWCASE */}
      <Scene5ProjectDetail onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* SCENE 6 — PARALLAX GALLERY */}
      <Scene6ParallaxGallery />

      {/* SECTION 3 — TOOLKIT & TECH UNIVERSE (#toolkit) */}
      <div id="toolkit">
        <Scene7Technology />
        <Scene8Stats />
        <Scene9Testimonials />
      </div>

      {/* SECTION 4 — CINEMATIC FINALE & CONTACT (#contact) */}
      <div id="contact">
        <Scene10Contact onOpenContact={handleOpenContact} />
      </div>

      {/* Bottom Ticker Bar */}
      <ToolkitBar onOpenToolkitModal={() => setIsToolkitModalOpen(true)} />

      {/* Boot Pipeline Overlay */}
      {isBooting && <BootLoader onComplete={handleBootComplete} />}

      {/* Modals & Overlays */}
      <Suspense fallback={null}>
        {selectedProject && (
          <QuickLookModal
            project={selectedProject}
            allProjects={PROJECTS}
            onClose={() => setSelectedProject(null)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenCodeDetails={(proj) => setSpecProject(proj)}
          />
        )}

        {specProject && (
          <ProjectModal
            project={specProject}
            onClose={() => setSpecProject(null)}
            onOpenContactWithSubject={handleOpenContactWithSubject}
          />
        )}

        {isToolkitModalOpen && (
          <ToolkitModal
            isOpen={isToolkitModalOpen}
            onClose={() => setIsToolkitModalOpen(false)}
          />
        )}

        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            initialSubject={contactSubject}
            onClose={() => setIsContactModalOpen(false)}
          />
        )}

        {isPhilosophyModalOpen && (
          <PhilosophyModal
            isOpen={isPhilosophyModalOpen}
            onClose={() => setIsPhilosophyModalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
