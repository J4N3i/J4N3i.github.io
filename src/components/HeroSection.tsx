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
      yPercent: -30,
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
      <div ref={splineRef} className="absolute inset-0 z-0 opacity-60">
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
        <div className="hero-orb-1 orb w-64 h-64 top-1/4 left-1/4 opacity-20 blur-3xl" />
        <div className="hero-orb-2 orb w-32 h-32 top-1/2 right-1/4 opacity-15 blur-2xl" />
        <div className="hero-orb-3 orb w-48 h-48 bottom-1/3 left-1/2 opacity-20 blur-3xl" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90 z-10" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight cursor-default"
        >
          <span className="block text-foreground mb-4 drop-shadow-2xl hover:text-glow-primary transition-all duration-500 hover:scale-[1.02] transform origin-center">
            Janeesha Gamage
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">
            Building the <span className="text-glow-primary font-semibold text-foreground animate-pulse-glow">Digital Future</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Computer Science Undergraduate & Web Developer.
          <br className="hidden md:block" />
          Specializing in high-performance React applications and immersive user experiences.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 ring-offset-2 focus:ring-2 ring-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center animate-pulse-glow opacity-70">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;