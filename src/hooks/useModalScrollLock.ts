import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useModalScrollLock(isOpen: boolean, lenis: Lenis | null) {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Capture current scroll position
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // 2. Stop Lenis smooth scroll engine
    if (lenis) {
      lenis.stop();
    }

    // 3. Lock document body styles cleanly
    const originalStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      overflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction,
      width: document.body.style.width,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // 4. Pause GSAP ScrollTriggers so background scenes don't calculate on modal scroll
    const activeTriggers = ScrollTrigger.getAll();
    activeTriggers.forEach((st) => st.disable(false));

    // 5. Block background keyboard scrolling keys (Space, PageUp, PageDown, Arrows, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const keysToBlock = [
        'Space',
        ' ',
        'PageUp',
        'PageDown',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ];
      if (!keysToBlock.includes(e.key)) return;

      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isInput) return; // Allow typing in textboxes inside modal

      // Check if event occurred inside a scrollable modal container
      const isInsideModalScroll = target?.closest('.modal-scroll-container');
      if (!isInsideModalScroll) {
        e.preventDefault();
      }
    };

    // 6. Block background wheel & touch move if event target is outside modal scroll container
    const handleWheelOrTouch = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const isInsideModalScroll = target?.closest('.modal-scroll-container');
      if (!isInsideModalScroll) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('wheel', handleWheelOrTouch, { passive: false, capture: true });
    window.addEventListener('touchmove', handleWheelOrTouch, { passive: false, capture: true });

    return () => {
      // Restore body styles
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.left = originalStyle.left;
      document.body.style.right = originalStyle.right;
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.touchAction = originalStyle.touchAction;
      document.body.style.width = originalStyle.width;

      // Restore scroll position
      window.scrollTo(0, scrollY);

      // Re-enable ScrollTriggers
      activeTriggers.forEach((st) => st.enable(false));

      // Restart Lenis smooth scroll engine
      if (lenis) {
        lenis.start();
      }

      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('wheel', handleWheelOrTouch, { capture: true });
      window.removeEventListener('touchmove', handleWheelOrTouch, { capture: true });
    };
  }, [isOpen, lenis]);
}
