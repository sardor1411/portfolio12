import React, { useEffect, useRef } from 'react';

export const LiquidCompanion: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      // Gentle follow effect
      glowRef.current.style.transform = `translate3d(${x * 0.05}px, ${y * 0.05}px, 0px) rotate(-15deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Radial Glow */}
      <div
        ref={glowRef}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full blur-[110px] opacity-35 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, #C9D3E0 0%, #3D414B 60%, transparent 100%)',
          transform: 'rotate(-15deg)',
        }}
      />
      
      {/* Secondary Soft Ambient Highlight */}
      <div 
        className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 bg-[#C9D3E0] animate-liquid-glow"
      />

      {/* Subtle Bottom Glow Accent */}
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-10 bg-[#3D414B]"
      />

      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
      />
    </div>
  );
};
