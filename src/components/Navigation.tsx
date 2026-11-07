import { useState, useEffect, useRef } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';
import { profile, cvOptions, navItems } from '@/data';
import { useActiveSection } from '@/hooks/useActiveSection';
import { MobileMenu } from './navigation/MobileMenu';

interface NavigationProps {
  ready?: boolean;
}

const Navigation = ({ ready = true }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref] = useActiveSection();
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // Single passive scroll listener throttled with requestAnimationFrame (no GSAP on scroll)
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Entrance animation triggered when intro/hero ready
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !ready) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power2.out' }
    );
  }, [ready]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full border shadow-2xl shadow-black/50 transition-all duration-300 ${
          isScrolled
            ? 'top-4 bg-background/85 border-white/15 backdrop-blur-xl'
            : 'top-6 bg-white/5 border-white/20 backdrop-blur-xl'
        }`}
      >
        {/* Top Shine Reflection */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-30" />

        <div
          className={`px-4 relative z-10 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group"
              aria-label="Janeesha Vishwaprabha, back to top"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent-violet/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs shadow-lg group-hover:scale-110 transition-transform duration-300">
                {profile.shortName}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-0.5 flex-nowrap">
              {navItems.map((item) => {
                const isCurrent = activeHref === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-md'
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <a
                href={profile.cvs.devops.href}
                download
                className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
              >
                Download CV
              </a>
            </div>

            {/* Right col — mobile hamburger */}
            <div className="flex items-center justify-end">
              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => {
                  if (isMenuOpen) {
                    handleCloseMenu();
                  } else {
                    setIsMenuOpen(true);
                  }
                }}
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-panel"
              >
                {isMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        navItems={navItems}
        activeHref={activeHref}
        cvOptions={cvOptions}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
      />
    </>
  );
};

export default Navigation;
