import { useState, useEffect } from 'react';

export const HeroBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden hero-bg-fade ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Layer 1: Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Layer 2: Animated Colour Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Primary (top-left) */}
        <div
          data-testid="hero-blob-primary"
          className="absolute -top-[5%] -left-[5%] w-[55vw] h-[55vw] max-w-[620px] max-h-[620px] min-w-[280px] min-h-[280px] rounded-full bg-primary/30 blur-3xl hero-drift-a"
        />

        {/* Blob 2: Accent Violet (bottom-right) */}
        <div
          data-testid="hero-blob-violet"
          className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] max-w-[580px] max-h-[580px] min-w-[260px] min-h-[260px] rounded-full bg-accent-violet/25 blur-3xl hero-drift-b"
        />

        {/* Blob 3: Accent Cyan (top/center-right, desktop only) */}
        <div
          data-testid="hero-blob-cyan"
          className="hidden md:block absolute top-[15%] right-[10%] w-[42vw] h-[42vw] max-w-[500px] max-h-[500px] rounded-full bg-accent-cyan/25 blur-3xl hero-drift-c"
        />
      </div>

      {/* Layer 3: Faint Grid with Radial Mask */}
      <div data-testid="hero-grid" className="absolute inset-0 hero-faint-grid" />

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
