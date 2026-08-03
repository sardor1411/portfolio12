import React, { useEffect, useRef } from 'react';
import { detectPerformancePreset } from '../utils/performance';

export const AmbientEnvironment: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const perf = detectPerformancePreset();
    if (perf.isReducedMotion) return; // Respect reduced motion

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Particle field scaled by performance preset
    const particles = Array.from({ length: perf.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedY: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let time = 0;
    let isTabActive = true;

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabActive) return;

      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Render subtle radial ambient illumination spots
      const x1 = width * 0.3 + Math.sin(time) * 120;
      const y1 = height * 0.3 + Math.cos(time * 0.8) * 80;
      const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.5);
      g1.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
      g1.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
      g1.addColorStop(1, 'rgba(10, 10, 11, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const x2 = width * 0.7 - Math.cos(time * 0.7) * 100;
      const y2 = height * 0.7 + Math.sin(time * 0.9) * 90;
      const g2 = ctx.createRadialGradient(x2, y2, 20, x2, y2, width * 0.6);
      g2.addColorStop(0, 'rgba(201, 211, 224, 0.035)');
      g2.addColorStop(0.6, 'rgba(168, 85, 247, 0.015)');
      g2.addColorStop(1, 'rgba(10, 10, 11, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Render floating micro dust particles
      const useShadow = perf.preset === 'HIGH';
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(time + p.size) * 0.15 + p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 243, 245, ${p.opacity})`;
        if (useShadow) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(242, 243, 245, 0.3)';
        }
        ctx.fill();
        if (useShadow) ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});
