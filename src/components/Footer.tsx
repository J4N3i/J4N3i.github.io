import { useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUp, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';
import { profile, navItems as baseNavItems } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ANIMATION_DURATION, ANIMATION_EASING } from '@/constants/animations';
import { FooterNav } from './footer/FooterNav';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useSectionReveal(footerRef, () => {
    const footer = footerRef.current;
    if (!footer) return;

    // Initial state
    gsap.set(footer, { opacity: 0, y: 60, filter: 'blur(10px)' });

    // Scroll triggered animation
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: ANIMATION_DURATION.slow,
      ease: ANIMATION_EASING.power2Out,
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: ANIMATION_EASING.inOut,
      stagger: {
        each: 2,
        from: 'random',
      },
    });
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navItems = [
    { label: 'Home', href: '#home', download: false },
    { label: 'About', href: '#about', download: false },
    { label: 'Projects', href: '#projects', download: false },
    { label: 'Contact', href: '#contact', download: false },
    { label: 'Resume', href: profile.cvs.general.href, download: true },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-10 px-6 border-t border-white/10 bg-background/80 backdrop-blur-xl overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="footer-particle orb w-96 h-96 -top-20 -right-20 opacity-10 float-slow blur-3xl" />
        <div className="footer-particle orb w-64 h-64 bottom-0 left-0 opacity-5 float-medium blur-2xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 mb-16">
          {/* Brand Column (Span 5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="text-3xl font-bold tracking-tight text-white">
              Janeesha <span className="text-primary">Gamage</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Crafting immersive digital experiences that merge creativity with technical precision.
              Let's build the future of the web together.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-3 rounded-full bg-surface-elevated border border-white/5 text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/20 transition-all duration-300"
              >
                <GithubLogo size={20} weight="fill" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-3 rounded-full bg-surface-elevated border border-white/5 text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/20 transition-all duration-300"
              >
                <LinkedinLogo size={20} weight="fill" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send email"
                className="p-3 rounded-full bg-surface-elevated border border-white/5 text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary/20 transition-all duration-300"
              >
                <EnvelopeSimple size={20} weight="fill" />
              </a>
            </div>
          </div>

          {/* Navigation Column (Span 3) */}
          <FooterNav navItems={navItems} onNavigate={scrollToSection} />

          {/* Contact Column (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group p-3 rounded-xl bg-surface-elevated/30 border border-white/5 hover:border-primary/20"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <EnvelopeSimple size={20} weight="duotone" />
                </div>
                <span className="text-sm">{profile.email}</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground p-3 rounded-xl bg-surface-elevated/30 border border-white/5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <ArrowUp size={20} weight="duotone" className="rotate-45" />
                </div>
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full bg-surface-elevated border border-white/5 group-hover:border-primary/30 transition-colors">
              <ArrowUp
                size={14}
                weight="bold"
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
