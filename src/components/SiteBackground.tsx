export const SiteBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-background"
      aria-hidden="true"
      style={{ contain: 'strict' }}
    >
      {/* Layer 2: Two soft static colour glows (12% opacity, 50vw size, blur-3xl toward opposite corners) */}
      <div
        className="absolute -top-[10vw] -left-[10vw] w-[50vw] h-[50vw] rounded-full bg-primary/12 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[10vw] -right-[10vw] w-[50vw] h-[50vw] rounded-full bg-accent-violet/12 blur-3xl"
        aria-hidden="true"
      />

      {/* Layer 3: Faint grid (1px lines at white/3%, 64px squares) with radial fade mask */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
