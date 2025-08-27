import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const progressBar = progressBarRef.current;
    const logo = logoRef.current;
    const percentage = percentageRef.current;
    const droplet = dropletRef.current;

    if (!preloader || !progressBar || !logo || !percentage) return;

    // Initial state
    gsap.set([logo, percentage], { opacity: 0, y: 30, filter: 'blur(8px)' });
    gsap.set(progressBar, { width: '0%' });
    if (droplet) {
      gsap.set(droplet, { opacity: 0, scale: 0.3, y: 10, filter: 'blur(6px)', borderRadius: '45% 55% 60% 40% / 40% 38% 62% 60%' });
    }

    // Animation timeline
    const tl = gsap.timeline();

    // Liquid droplet forms first, then title appears
    if (droplet) {
      tl.to(droplet, {
        opacity: 1,
        scale: 1.12,
        y: -4,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'elastic.out(1, 0.6)'
      })
      .to(droplet, {
        scale: 1,
        y: 0,
        borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.45');
    }

    // Logo and text entrance
    tl.to([logo, percentage], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    })
    
    // Progress bar animation with percentage counter
    .to(progressBar, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        percentage.textContent = `${progress}%`;
      }
    }, '-=0.3')
    
    // Exit animation
    .to([logo, percentage], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in'
    }, '+=0.3')
    
    .to(preloader, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        onComplete();
      }
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb w-72 h-72 top-1/4 -left-10 opacity-20 float-slow" />
        <div className="orb w-56 h-56 bottom-1/3 right-1/6 opacity-25 float-medium" />
        <div className="orb w-64 h-64 top-1/2 left-1/3 opacity-15 float-fast" />
      </div>

      {/* Glass container */}
      <div className="relative z-10 text-center">
        <div className="glass-card glass-hover rounded-3xl p-10 md:p-12 min-w-[20rem] backdrop-blur-2xl relative overflow-hidden">
          {/* Liquid droplet */}
          <div 
            ref={dropletRef}
            className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 bg-white/15 border border-white/20 backdrop-blur-xl"
            style={{
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              backdropFilter: 'blur(16px) saturate(140%)',
              borderRadius: '45% 55% 60% 40% / 40% 38% 62% 60%'
            }}
          />
          {/* Title Only - placed at top with Apple-like liquid glass text */}
          <div ref={logoRef} className="mb-8 text-center">
            <div className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.4em] text-white/85 mb-4">WELCOME</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide md:tracking-wider bg-gradient-to-b from-white/40 to-white/10 bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(255,255,255,0.08)]">
              TO PORTFOLIO OF JANEESHA GAMAGE
            </h1>
          </div>

          {/* Progress track */}
          <div className="w-40 max-w-full mx-auto">
            <div className="relative h-4 rounded-full overflow-hidden border border-white/10 bg-white/5 glass-card liquid-track">
              {/* Liquid fill */}
              <div 
                ref={progressBarRef}
                className="liquid-fill"
                style={{ width: '0%' }}
              >
                <div className="wave wave-top wave-bob" />
                <div className="wave wave-bottom wave-bob" />
              </div>
              {/* Inner shadow for depth */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.25),inset_0_-8px_20px_rgba(0,0,0,0.15)] rounded-full" />
            </div>

            {/* Percentage */}
            <div 
              ref={percentageRef}
              className="mt-3 text-sm text-muted-foreground font-mono tracking-wide"
            >
              0%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;