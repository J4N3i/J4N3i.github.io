import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

export const usePointerGlow = (containerRef: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Exit immediately on touch devices, small screens, or reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopWidth = window.innerWidth >= 1024;

    if (!hasFinePointer || prefersReducedMotion || !isDesktopWidth) return;

    const hero =
      (container.closest('#home') as HTMLElement | null) || container.parentElement || container;
    if (!hero) return;

    // Initialize CSS variables on container
    container.style.setProperty('--mx', '0px');
    container.style.setProperty('--my', '0px');
    container.style.setProperty('--nx', '0');
    container.style.setProperty('--ny', '0');
    container.style.setProperty('--glow', '0');

    // Quick setters using GSAP
    const quickMx = gsap.quickTo(container, '--mx', { duration: 0.6, ease: 'power3.out' });
    const quickMy = gsap.quickTo(container, '--my', { duration: 0.6, ease: 'power3.out' });
    const quickNx = gsap.quickTo(container, '--nx', { duration: 0.6, ease: 'power3.out' });
    const quickNy = gsap.quickTo(container, '--ny', { duration: 0.6, ease: 'power3.out' });
    const quickGlow = gsap.quickTo(container, '--glow', { duration: 0.6, ease: 'power3.out' });

    let isListening = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      quickMx(x);
      quickMy(y);

      // Normalised offset (-1 to 1) for parallax
      const nx = rect.width > 0 ? (x / rect.width) * 2 - 1 : 0;
      const ny = rect.height > 0 ? (y / rect.height) * 2 - 1 : 0;

      quickNx(Math.max(-1, Math.min(1, nx)));
      quickNy(Math.max(-1, Math.min(1, ny)));
      quickGlow(1);
    };

    const handlePointerEnter = () => {
      quickGlow(1);
    };

    const handlePointerLeave = () => {
      quickGlow(0);
    };

    const addListeners = () => {
      if (isListening) return;
      hero.addEventListener('pointermove', handlePointerMove, { passive: true });
      hero.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      hero.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      isListening = true;
    };

    const removeListeners = () => {
      if (!isListening) return;
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerenter', handlePointerEnter);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      isListening = false;
      quickGlow(0);
    };

    // Pause everything when hero is out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          addListeners();
        } else {
          removeListeners();
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);

    const handleResize = () => {
      if (window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches) {
        removeListeners();
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      removeListeners();
    };
  }, [containerRef]);
};
