import { useState, useEffect, useRef } from 'react';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
    const ids = ['home', 'about', 'projects', 'contact'];
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
    { label: 'Projects', href: '#projects' },
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
        className="fixed top-0 left-0 right-0 z-40 glass-card glass-hover glass-animated backdrop-blur-md"
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (e.currentTarget as HTMLElement).style.setProperty('--mx', x + 'px');
          (e.currentTarget as HTMLElement).style.setProperty('--my', y + 'px');
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.setProperty('--mx', '50%');
          (e.currentTarget as HTMLElement).style.setProperty('--my', '50%');
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight text-glow-primary">
              JG
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`glass-hover px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative group border ${activeHref === item.href ? 'text-foreground border-white/20 bg-white/10' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
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
              <div className="flex items-center space-x-4 ml-8">
                <a
                  href="https://github.com/J4N3i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-electric transition-colors duration-200"
                  title="GitHub"
                >
                  <GithubLogo size={20} weight="bold" />
                </a>
                <a
                  href="https://www.linkedin.com/in/janeesha-gamage-522717298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent-violet transition-colors duration-200"
                  title="LinkedIn"
                >
                  <LinkedinLogo size={20} weight="bold" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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