import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const spline = splineRef.current;

    if (!hero || !headline || !subtitle || !spline) return;

    // Initial states
    gsap.set([headline, subtitle], { 
      opacity: 0, 
      y: 50, 
      filter: 'blur(10px)' 
    });
    gsap.set(spline, { opacity: 0, x: 100 });

    // Main animation timeline
    const tl = gsap.timeline({ delay: 4 }); // Start after preloader

    tl.to(headline, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(spline, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // Floating background elements
    gsap.to('.hero-orb-1', {
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.hero-orb-2', {
      y: -30,
      x: 15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.hero-orb-3', {
      y: -15,
      x: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Parallax effect on scroll
    gsap.to(hero, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Background Spline 3D Model */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/particles-IuAKpPmPEpw3YI7I2p09F8CM/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          title="3D Particles Background"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-orb-1 orb w-64 h-64 top-1/4 left-1/4 opacity-30" />
        <div className="hero-orb-2 orb w-32 h-32 top-1/2 right-1/4 opacity-20" />
        <div className="hero-orb-3 orb w-48 h-48 bottom-1/3 left-1/2 opacity-25" />
      </div>

      {/* Softer Apple-like gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          <span className="block text-foreground">Hi, I'm</span>
          <span className="block text-glow-primary bg-gradient-primary bg-clip-text text-transparent">
            Janeesha Gamage
          </span>
          <span className="block text-foreground text-2xl md:text-4xl lg:text-6xl mt-4">
            Undergraduate at SLIIT
          </span>
          <span className="block text-muted-foreground text-xl md:text-2xl lg:text-3xl mt-2">
            Computer Sciences
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with precision and purpose. 
          Where technology meets thoughtful design.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;