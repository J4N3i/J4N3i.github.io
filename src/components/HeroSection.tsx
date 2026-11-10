import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { profile } from '@/data';
import { HeroBackground } from './HeroBackground';
import { HeroCTA } from './hero/HeroCTA';
import { HeroProofPoints } from './hero/HeroProofPoints';
import { HeroScrollIndicator } from './hero/HeroScrollIndicator';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ANIMATION_DURATION, ANIMATION_EASING } from '@/constants/animations';

interface HeroSectionProps {
  ready?: boolean;
  startDelay?: number;
}

const HeroSection = ({ ready = true, startDelay = 0 }: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useSectionReveal({
    scopeRef: heroRef,
    enabled: ready,
    deps: [ready],
    animate: () => {
      const hero = heroRef.current;
      const headline = headlineRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;
      const scrollIndicator = scrollIndicatorRef.current;

      if (!hero) return;

      // Set initial states via JS so content is visible if JS fails
      if (headline && subtitle) {
        gsap.set([headline, subtitle], {
          opacity: 0,
          y: 20,
        });
      }
      if (cta) gsap.set(cta, { opacity: 0, y: 16 });
      if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0, y: -10 });

      // Start animation immediately (or with short 0.1s handoff delay if intro played)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const headlineDuration = isMobile ? 0.45 : ANIMATION_DURATION.verySlow;
      const subtitleDuration = isMobile ? 0.35 : ANIMATION_DURATION.slow;
      const subtitleStagger = isMobile ? '-=0.25' : '-=0.8';
      const ctaDuration = isMobile ? 0.3 : ANIMATION_DURATION.normal;
      const ctaStagger = isMobile ? '-=0.15' : '-=0.5';
      const scrollDuration = isMobile ? 0.3 : 0.6;
      const scrollStagger = isMobile ? '-=0.1' : '-=0.2';

      const tl = gsap.timeline({ delay: startDelay });

      if (headline) {
        tl.to(headline, {
          opacity: 1,
          y: 0,
          duration: headlineDuration,
          ease: ANIMATION_EASING.power2Out,
        });
      }

      if (subtitle) {
        tl.to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: subtitleDuration,
            ease: ANIMATION_EASING.power2Out,
          },
          subtitleStagger
        );
      }

      if (cta) {
        tl.to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: ctaDuration,
            ease: ANIMATION_EASING.power2Out,
          },
          ctaStagger
        );
      }

      if (scrollIndicator) {
        tl.to(
          scrollIndicator,
          {
            opacity: 1,
            y: 0,
            duration: scrollDuration,
            ease: ANIMATION_EASING.power2Out,
          },
          scrollStagger
        );

        // Scroll indicator bounce loop
        gsap.to(scrollIndicator, {
          y: 8,
          duration: ANIMATION_DURATION.verySlow,
          repeat: -1,
          yoyo: true,
          ease: ANIMATION_EASING.inOut,
        });
      }

      // Parallax effect on scroll - desktop with fine pointer only
      const isDesktopWithFinePointer =
        typeof window !== 'undefined' &&
        window.innerWidth >= 1024 &&
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (isDesktopWithFinePointer) {
        gsap.to(hero, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
  });

  useEffect(() => {
    const hideOnScroll = () => {
      if (window.scrollY > 100 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
      }
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', hideOnScroll);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 pb-10 sm:py-24 scroll-mt-24"
    >
      <HeroBackground />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] sm:text-xs font-medium mb-2.5 sm:mb-5 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Open to DevOps &amp; full-stack internships</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-[clamp(1.9rem,6.5vw,4.5rem)] font-bold tracking-tight mb-1.5 sm:mb-3 leading-[1.14] cursor-default"
        >
          <span className="block text-foreground drop-shadow-2xl hover:text-glow-primary transition-all duration-500 hover:scale-[1.01] transform origin-center">
            {profile.name}
          </span>
        </h1>

        <div className="text-[11px] sm:text-sm md:text-base font-semibold tracking-wider uppercase text-primary mb-2.5 sm:mb-4">
          {profile.role}
        </div>

        <p
          ref={subtitleRef}
          className="text-[clamp(0.9375rem,2.5vw,1.25rem)] font-light text-foreground/90 mb-4 sm:mb-7 max-w-2xl mx-auto leading-relaxed"
        >
          {profile.headline}
        </p>

        {/* CTAs */}
        <HeroCTA ref={ctaRef} />

        {/* Proof Points */}
        <HeroProofPoints />

        {/* Scroll Down Indicator */}
        <HeroScrollIndicator
          ref={scrollIndicatorRef}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
    </section>
  );
};

export default HeroSection;
