import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { profile } from '@/data';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const container = containerRef.current;
    if (container) {
      container.style.display = 'none';
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Skip preloader immediately if reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      handleFinish();
      return;
    }

    // Set initial states via JS
    gsap.set(content, { opacity: 0, y: 16 });

    // Timeline total about 0.8s:
    // fade and rise in (0.3s), hold (0.2s), fade whole overlay out (0.3s)
    const tl = gsap.timeline({
      onComplete: handleFinish,
    });
    tlRef.current = tl;

    tl.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.out',
    })
      .to({}, { duration: 0.2 })
      .to(container, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });

    // Skip behaviour: pressing any key or clicking anywhere finishes intro immediately
    const handleKeyDown = () => {
      handleFinish();
    };

    const handlePointerDown = () => {
      handleFinish();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      tl.kill();
    };
  }, [handleFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 min-h-[100svh] h-[100dvh] z-50 flex items-center justify-center bg-background cursor-pointer select-none overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
      role="status"
      aria-label="Welcome introduction"
    >
      <div ref={contentRef} className="text-center px-4 max-w-full overflow-hidden">
        <p className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-3 font-inter">
          {profile.shortName}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-white/70 tracking-[0.25em] uppercase">
          {profile.name}
        </p>
      </div>
    </div>
  );
};

export default Preloader;
