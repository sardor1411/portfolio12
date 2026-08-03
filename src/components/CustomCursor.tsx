import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = React.memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports fine touch/pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    if (!cursorRef.current) return;

    // Use GSAP quickSetter for direct 120 FPS GPU transforms without React re-renders
    const xSet = gsap.quickSetter(cursorRef.current, 'x', 'px');
    const ySet = gsap.quickSetter(cursorRef.current, 'y', 'px');

    const onMouseMove = (e: MouseEvent) => {
      xSet(e.clientX - 5);
      ySet(e.clientY - 5);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('interactive-hover') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered((prev) => (prev ? prev : true));
      } else {
        setIsHovered((prev) => (prev ? false : prev));
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[200] will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0px)',
      }}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full mix-blend-difference transition-transform duration-200 ease-out ${
          isHovered ? 'bg-[#F2F3F5] scale-[2.5] opacity-90' : 'bg-[#F2F3F5] scale-100'
        }`}
      />
    </div>
  );
});

