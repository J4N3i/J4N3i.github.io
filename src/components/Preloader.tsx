import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const progress = progressRef.current;
    const bar = barRef.current;

    if (!container || !text || !progress || !bar) return;

    // Skip preloader entirely if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.style.display = 'none';
      onComplete();
      return;
    }

    // Set initial states via JS
    gsap.set(text, { opacity: 0, y: 20 });
    gsap.set(progress, { opacity: 0 });
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            container.style.display = 'none';
            onComplete();
          }
        });
      }
    });

    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.out'
    })
      .to(progress, {
        opacity: 1,
        duration: 0.2
      }, '-=0.1')
      .to(bar, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      })
      .to([text, progress], {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: 'power2.in'
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div ref={textRef} className="text-center mb-8">
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2" aria-hidden="true">
            JG
          </p>
          <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase">
            Janeesha Vishwaprabha
          </p>
        </div>

        <div ref={progressRef} className="w-48 h-[2px] bg-secondary rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
