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
        {/* Blob 1: Primary (top-left) - reduced size on mobile (< 768px) to minimize GPU load */}
        <div className="absolute -top-[5%] -left-[5%] hero-blob-parallax-1 pointer-events-none">
          <div
            data-testid="hero-blob-primary"
            className="w-[45vw] h-[45vw] max-w-[260px] max-h-[260px] md:w-[55vw] md:h-[55vw] md:max-w-[620px] md:max-h-[620px] rounded-full bg-primary/30 blur-3xl hero-drift-a"
          />
        </div>

        {/* Blob 2: Accent Violet (bottom-right) - reduced size on mobile */}
        <div className="absolute -bottom-[10%] -right-[5%] hero-blob-parallax-2 pointer-events-none">
          <div
            data-testid="hero-blob-violet"
            className="w-[40vw] h-[40vw] max-w-[240px] max-h-[240px] md:w-[50vw] md:h-[50vw] md:max-w-[580px] md:max-h-[580px] rounded-full bg-accent-violet/25 blur-3xl hero-drift-b"
          />
        </div>

        {/* Blob 3: Accent Cyan (top/center-right, rendered only on screens >= 768px) */}
        <div className="hidden md:block absolute top-[15%] right-[10%] hero-blob-parallax-3 pointer-events-none">
          <div
            data-testid="hero-blob-cyan"
            className="w-[42vw] h-[42vw] max-w-[500px] max-h-[500px] rounded-full bg-accent-cyan/25 blur-3xl hero-drift-c"
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
    </div>
  );
};
