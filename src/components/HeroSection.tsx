import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data';
import { HeroBackground } from './hero/HeroBackground';
import { HeroCTA } from './hero/HeroCTA';
import { HeroScrollIndicator } from './hero/HeroScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  ready?: boolean;
}

const HeroSection = ({ ready = true }: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const hero = heroRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial states via JS so content is visible if JS fails
      if (headline && subtitle) {
        gsap.set([headline, subtitle], {
          opacity: 0,
          y: 50,
          filter: 'blur(10px)'
        });
      }
      if (cta) gsap.set(cta, { opacity: 0, y: 30, filter: 'blur(8px)' });
      if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0, y: -10 });

      // Start animation with a slight 0.2s delay after preloader completes
      const tl = gsap.timeline({ delay: 0.2 });

      if (headline) {
        tl.to(headline, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out'
        });
      }

      if (subtitle) {
        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out'
        }, '-=0.8');
      }

      if (cta) {
        tl.to(cta, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5');
      }

      if (scrollIndicator) {
        tl.to(scrollIndicator, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2');

        // Scroll indicator bounce loop
        gsap.to(scrollIndicator, {
          y: 8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.5
        });
      }

      // Parallax effect on scroll
      gsap.to(hero, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    // Hide scroll indicator when user scrolls
    const hideOnScroll = () => {
      if (window.scrollY > 100 && scrollIndicator) {
        gsap.to(scrollIndicator, { opacity: 0, duration: 0.4 });
      }
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', hideOnScroll);
      ctx.revert();
    };
  }, [ready]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      <HeroBackground />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Open to DevOps &amp; full-stack internships</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight cursor-default"
        >
          <span className="block text-foreground mb-4 drop-shadow-2xl hover:text-glow-primary transition-all duration-500 hover:scale-[1.02] transform origin-center">
            {profile.name}
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">
            Building the <span className="text-glow-primary font-semibold text-foreground animate-pulse-glow">Digital Future</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {profile.tagline}
          <br className="hidden md:block" />
          Building scalable systems — from distributed architectures to immersive web experiences.
        </p>

        {/* CTAs */}
        <HeroCTA ref={ctaRef} />

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
