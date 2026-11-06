import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const HeroBackground = () => {
  const [showSpline, setShowSpline] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Spline lazy loading for desktop
    if (window.innerWidth >= 1024 && !prefersReducedMotion) {
      const enableSpline = () => setShowSpline(true);
      if ('requestIdleCallback' in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(enableSpline);
        return () => {
          if ('cancelIdleCallback' in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(enableSpline, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-orb-1', { y: -20, duration: 6, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.hero-orb-2', { y: -30, x: 15, duration: 8, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.hero-orb-3', { y: -15, x: -10, duration: 5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {showSpline && (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
          <iframe
            src="https://my.spline.design/particles-IuAKpPmPEpw3YI7I2p09F8CM/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
            title="3D Particles Background"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-orb-1 orb w-64 h-64 top-1/4 left-1/4 opacity-20 blur-3xl" />
        <div className="hero-orb-2 orb w-32 h-32 top-1/2 right-1/4 opacity-15 blur-2xl" />
        <div className="hero-orb-3 orb w-48 h-48 bottom-1/3 left-1/2 opacity-20 blur-3xl" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90 z-10" />
    </div>
  );
};
