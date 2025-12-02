import { useState, useEffect, useRef } from 'react';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top (with a small buffer)
      if (currentScrollY < 50) {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
      } else {
        // Show if scrolling up, hide if scrolling down
        if (currentScrollY > lastScrollY.current) {
          // Hide
          gsap.to(nav, { y: -150, opacity: 0, duration: 0.3 });
        } else {
          // Show
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial nav animation
    gsap.fromTo(nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power2.out' }
    );

    // Trigger one-time sheen sweep shortly after reveal
    const sheenTimeout = setTimeout(() => {
      nav.classList.add('sheen-run');
      setTimeout(() => nav.classList.remove('sheen-run'), 1700);
    }, 4200);

    return () => clearTimeout(sheenTimeout);
  }, []);

  // Observe sections to update active nav on scroll
  useEffect(() => {
    const ids = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section with the largest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveHref(`#${id}`);
        }
      },
      {
        root: null,
        // Start tracking when 35% of the section is visible
        threshold: [0.35, 0.5, 0.75],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isMenuOpen) {
      gsap.fromTo(mobileMenu,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileMenu, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
    { label: 'Resume', href: '#resume' }
  ];

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
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/50 transition-all duration-300 overflow-hidden"
      >
        {/* Top Shine Reflection */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-30" />

        <div className="px-6 py-3 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('#home')}>
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent-violet/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs shadow-lg group-hover:scale-110 transition-transform duration-300">JG</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeHref === item.href
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Vertical Divider */}
              <div className="h-6 w-px bg-white/10 mx-4" />

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/J4N3i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                  title="GitHub"
                >
                  <GithubLogo size={20} weight="fill" />
                </a>
                <a
                  href="https://www.linkedin.com/in/janeesha-gamage-522717298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                  title="LinkedIn"
                >
                  <LinkedinLogo size={20} weight="fill" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 z-40 glass-card backdrop-blur-md md:hidden transform translate-x-full"
      >
        <div className="p-8 pt-20">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`glass-hover text-left text-lg font-medium transition-colors duration-200 px-4 py-3 rounded-xl border ${activeHref === item.href ? 'text-foreground border-white/20 bg-white/10' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', x + 'px');
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--my', y + 'px');
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', '50%');
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--my', '50%');
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-8 border-t border-border/20">
              <a
                href="https://github.com/J4N3i"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent-electric transition-colors duration-200 flex items-center space-x-2"
              >
                <GithubLogo size={20} weight="bold" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/janeesha-gamage-522717298"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent-violet transition-colors duration-200 flex items-center space-x-2"
              >
                <LinkedinLogo size={20} weight="bold" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;