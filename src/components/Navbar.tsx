import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { playClickSound, playHoverSound, toggleSound } from '../utils/sound';
import gsap from 'gsap';

interface NavbarProps {
  activeTab: 'work' | 'about' | 'toolkit' | 'contact';
  setActiveTab: (tab: 'work' | 'about' | 'toolkit' | 'contact') => void;
  onNavigateSection: (sectionId: 'work' | 'about' | 'toolkit' | 'contact') => void;
  onOpenContact: () => void;
  soundActive: boolean;
  setSoundActive: (active: boolean) => void;
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({
  activeTab,
  setActiveTab,
  onNavigateSection,
  onOpenContact,
  soundActive,
  setSoundActive,
  onMobileMenuToggle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle(mobileMenuOpen);
    }
  }, [mobileMenuOpen, onMobileMenuToggle]);

  const handleTabClick = (tab: 'work' | 'about' | 'toolkit' | 'contact') => {
    playClickSound();
    setActiveTab(tab);
    onNavigateSection(tab);
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  const handleToggleSound = () => {
    const newState = !soundActive;
    toggleSound(newState);
    setSoundActive(newState);
    if (newState) {
      playClickSound();
    }
  };

  const openMobileMenu = () => {
    playClickSound();
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    playClickSound();
    if (!itemsContainerRef.current) {
      setMobileMenuOpen(false);
      return;
    }

    const items = itemsContainerRef.current.querySelectorAll('.mobile-menu-item');
    gsap.to(items, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setMobileMenuOpen(false);
      },
    });
  };

  // Animate mobile menu items on open
  useEffect(() => {
    if (mobileMenuOpen && itemsContainerRef.current) {
      const items = itemsContainerRef.current.querySelectorAll('.mobile-menu-item');
      gsap.fromTo(
        items,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.45,
          ease: 'power3.out',
        }
      );
    }
  }, [mobileMenuOpen]);

  const navItems: { id: 'work' | 'about' | 'toolkit' | 'contact'; label: string; num: string }[] = [
    { id: 'work', label: 'Work', num: '01' },
    { id: 'about', label: 'About', num: '02' },
    { id: 'toolkit', label: 'Toolkit', num: '03' },
    { id: 'contact', label: 'Contact', num: '04' },
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-5 sm:py-8 bg-[#0A0A0B]/60 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/10 md:border-none transition-all">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleTabClick('work')}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono font-bold tracking-tighter group-hover:border-white/50 group-hover:bg-white/10 transition-all text-white">
            S
          </div>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#85898F] group-hover:text-[#F2F3F5] transition-colors font-medium">
            Sardor
          </span>
        </div>

        {/* Floating Center Nav Pill (DESKTOP ONLY) */}
        <div className="hidden md:flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-3 py-1.5 gap-1 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="flex flex-col items-center">
                <div
                  className={`w-1 h-1 rounded-full mb-1 transition-all duration-300 ${
                    isActive ? 'bg-[#F2F3F5] opacity-100 scale-100' : 'bg-transparent opacity-0 scale-0'
                  }`}
                />
                <button
                  onClick={() => handleTabClick(item.id)}
                  onMouseEnter={playHoverSound}
                  className={`text-xs px-4 pb-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#F2F3F5] font-semibold'
                      : 'text-[#85898F] hover:text-[#F2F3F5]'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Sound FX Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
            title={soundActive ? 'Mute micro sounds' : 'Enable micro sounds'}
            className="border border-white/20 bg-white/5 backdrop-blur-md w-9 h-9 rounded-full text-[#85898F] hover:text-[#F2F3F5] hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-[#F2F3F5]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#85898F]" />
            )}
          </button>

          {/* Contact CTA Button (Desktop) */}
          <button
            onClick={() => {
              playClickSound();
              onOpenContact();
            }}
            onMouseEnter={playHoverSound}
            className="hidden sm:inline-flex border border-white/20 bg-white/5 backdrop-blur-md text-xs px-5 py-2.5 rounded-full hover:bg-white/10 hover:border-white/40 transition-all tracking-tight cursor-pointer active:scale-95 text-[#F2F3F5] font-medium"
          >
            Say hello ↗
          </button>

          {/* Mobile Menu Open Toggle Button (MOBILE ONLY) */}
          <button
            onClick={openMobileMenu}
            onMouseEnter={playHoverSound}
            className="md:hidden border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full text-xs font-mono font-medium text-white flex items-center gap-1.5 cursor-pointer active:scale-95 min-h-[44px]"
          >
            <Menu className="w-4 h-4" />
            <span>MENU</span>
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE LIQUID GLASS NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[200] bg-[#07080A]/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 border-b border-white/10 animate-fade-in md:hidden select-none"
        >
          {/* Top Liquid Glass Header inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white">
                S
              </div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-white font-semibold">
                Sardor — Portfolio
              </span>
            </div>

            <button
              onClick={closeMobileMenu}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center cursor-pointer min-h-[48px] min-w-[48px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Navigation Links (Huge Awwwards Typography) */}
          <div ref={itemsContainerRef} className="my-auto space-y-6 py-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="mobile-menu-item group flex items-center justify-between cursor-pointer border-b border-white/5 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {item.num}
                    </span>
                    <h2
                      className={`text-4xl sm:text-5xl font-extralight tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-white font-normal pl-2 border-l-2 border-emerald-400'
                          : 'text-[#85898F] group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </h2>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[#85898F] group-hover:text-white transition-colors" />
                </div>
              );
            })}
          </div>

          {/* Bottom Menu Quick Actions & Email */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenContact();
              }}
              className="w-full py-4 rounded-2xl bg-white text-black font-mono text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.3)] min-h-[48px]"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between font-mono text-xs text-[#85898F]">
              <span>ermaxamdovsardor8@gmail.com</span>
              <span className="text-emerald-400">● Available Q3/Q4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
