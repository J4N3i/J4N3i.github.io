import { useState, useEffect, useRef } from 'react';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';
import { gsap } from 'gsap';
import { profile, cvOptions, navItems } from '@/data';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ResumeDropdown } from './navigation/ResumeDropdown';
import { MobileMenu } from './navigation/MobileMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useActiveSection();
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  // Auto-hide/show navbar on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
      } else {
        if (currentScrollY > lastScrollY.current) {
          gsap.to(nav, { y: -150, opacity: 0, duration: 0.3 });
        } else {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // Entrance animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: 'power2.out' }
    );

    const sheenTimeout = setTimeout(() => {
      nav.classList.add('sheen-run');
      setTimeout(() => nav.classList.remove('sheen-run'), 1700);
    }, 1800);

    return () => clearTimeout(sheenTimeout);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHref(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/50 transition-all duration-300"
      >
        {/* Top Shine Reflection */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-30" />

        <div className="px-4 py-3 relative z-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            {/* Logo */}
            <div
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('#home')}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent-violet/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs shadow-lg group-hover:scale-110 transition-transform duration-300">
                {profile.shortName}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeHref === item.href
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <ResumeDropdown options={cvOptions} />
            </div>

            {/* Right col — socials + mobile hamburger */}
            <div className="flex items-center gap-1">
              <div className="hidden md:flex items-center gap-1">
                <div className="h-6 w-px bg-white/10 mx-2" />
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  title="GitHub"
                  aria-label="GitHub profile"
                >
                  <GithubLogo size={18} weight="fill" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  title="LinkedIn"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinLogo size={18} weight="fill" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        activeHref={activeHref}
        onNavigate={scrollToSection}
        cvOptions={cvOptions}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
      />
    </>
  );
};

export default Navigation;
