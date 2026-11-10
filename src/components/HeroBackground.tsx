import { useState, useEffect, useRef } from 'react';
import { usePointerGlow } from '@/hooks/usePointerGlow';

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  usePointerGlow(containerRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden hero-bg-fade ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Layer 1: Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Layer 2: Animated Colour Blobs with Parallax Wrappers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Primary (top-left) - optimized size and blur */}
        <div className="absolute -top-[5%] -left-[5%] hero-blob-parallax-1 pointer-events-none">
          <div
            data-testid="hero-blob-primary"
            className="w-[45vw] h-[45vw] max-w-[240px] max-h-[240px] md:w-[45vw] md:h-[45vw] md:max-w-[440px] md:max-h-[440px] rounded-full bg-primary/25 blur-2xl hero-drift-a"
          />
        </div>

        {/* Blob 2: Accent Violet (bottom-right) - optimized size and blur */}
        <div className="absolute -bottom-[10%] -right-[5%] hero-blob-parallax-2 pointer-events-none">
          <div
            data-testid="hero-blob-violet"
            className="w-[40vw] h-[40vw] max-w-[220px] max-h-[220px] md:w-[40vw] md:h-[40vw] md:max-w-[400px] md:max-h-[400px] rounded-full bg-accent-violet/20 blur-2xl hero-drift-b"
          />
        </div>

        {/* Blob 3: Accent Cyan (top/center-right, rendered only on screens >= 768px) */}
        <div className="hidden md:block absolute top-[15%] right-[10%] hero-blob-parallax-3 pointer-events-none">
          <div
            data-testid="hero-blob-cyan"
            className="w-[35vw] h-[35vw] max-w-[360px] max-h-[360px] rounded-full bg-accent-cyan/20 blur-2xl hero-drift-c"
          />
        </div>
      </div>

      {/* Layer 3: Faint Grid with Radial Mask */}
      <div data-testid="hero-grid" className="absolute inset-0 hero-faint-grid" />

      {/* Layer 3b: Spotlight Layer (Desktop Interactive) */}
      <div data-testid="hero-spotlight" className="hero-spotlight" aria-hidden="true" />

      {/* Layer 3c: Interactive Highlight Grid */}
      <div data-testid="hero-highlight-grid" className="hero-highlight-grid" aria-hidden="true" />

      {/* Layer 4: Vignette to Background Colour */}
      <div
        data-testid="hero-vignette"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 10%, hsl(var(--background) / 0.6) 55%, hsl(var(--background)) 100%)',
        }}
      />

      {/* Layer 5: Bottom Gradient Fade (160px from transparent to page background) */}
      <div
        data-testid="hero-bottom-fade"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />
    </div>
  );
};
