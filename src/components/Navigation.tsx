import { useState, useEffect, useRef } from 'react';
import { List, X, GithubLogo, LinkedinLogo, CaretDown } from 'phosphor-react';
import { gsap } from 'gsap';

// CV options — add the matching PDF files to /public/
const CV_OPTIONS = [
  {
    label: 'General CV',
    desc: 'Full-stack & software engineering',
    href: '/Janeesha_Vishwaprabha_CV.pdf',
    color: 'text-primary',
    dot: 'bg-primary',
  },
  {
    label: 'DevOps / Cloud CV',
    desc: 'Infrastructure, CI/CD & cloud',
    href: '/Janeesha_Vishwaprabha_CV_DevOps.pdf',
    color: 'text-accent-cyan',
    dot: 'bg-accent-cyan',
  },
  {
    label: 'AI / ML CV',
    desc: 'Machine learning & data science',
    href: '/Janeesha_Vishwaprabha_CV_AI.pdf',
    color: 'text-accent-violet',
    dot: 'bg-accent-violet',
  },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileResumeOpen, setIsMobileResumeOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const resumeDropdownRef = useRef<HTMLDivElement>(null);
  const resumeBtnRef = useRef<HTMLButtonElement>(null);

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

    window.addEventListener('scroll', controlNavbar);
    // Close resume dropdown on scroll so it doesn't float at stale position
    const closeDropdown = () => setIsResumeOpen(false);
    window.addEventListener('scroll', closeDropdown, { passive: true });
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('scroll', closeDropdown);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power2.out' }
    );

    const sheenTimeout = setTimeout(() => {
      nav.classList.add('sheen-run');
      setTimeout(() => nav.classList.remove('sheen-run'), 1700);
    }, 4200);

    return () => clearTimeout(sheenTimeout);
  }, []);

  // Observe sections to update active nav on scroll
  useEffect(() => {
    const ids = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'certifications', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveHref(`#${id}`);
        }
      },
      { root: null, threshold: [0.35, 0.5, 0.75] }
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
      gsap.to(mobileMenu, { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isMenuOpen]);

  // Animate resume dropdown
  useEffect(() => {
    const el = resumeDropdownRef.current;
    if (!el) return;
    if (isResumeOpen) {
      gsap.fromTo(el,
        { opacity: 0, y: -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [isResumeOpen]);

  // Close resume dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeDropdownRef.current && !resumeDropdownRef.current.closest('[data-resume-menu]')?.contains(e.target as Node)) {
        setIsResumeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHref(href);
      setIsMenuOpen(false);
    }
  };

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

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
            {/* Logo — left col */}
            <div
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('#home')}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent-violet/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs shadow-lg group-hover:scale-110 transition-transform duration-300">JG</span>
            </div>

            {/* Desktop Navigation — center col, truly centered */}
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

              {/* Resume Dropdown */}
              <div className="relative" data-resume-menu>
                <button
                  ref={resumeBtnRef}
                  onClick={() => {
                    if (!isResumeOpen && resumeBtnRef.current) {
                      const rect = resumeBtnRef.current.getBoundingClientRect();
                      const dropdownWidth = 256;
                      const left = Math.min(
                        rect.right - dropdownWidth,
                        window.innerWidth - dropdownWidth - 16
                      );
                      setDropdownPos({
                        top: rect.bottom + 8,
                        left: Math.max(left, 8),
                      });
                    }
                    setIsResumeOpen(!isResumeOpen);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 whitespace-nowrap"
                >
                  Resume
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={`transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Panel */}
                {isResumeOpen && dropdownPos && (
                  <div
                    ref={resumeDropdownRef}
                    data-resume-menu
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                    className="fixed w-64 rounded-2xl border border-white/10 bg-background/90 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden z-[60]"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">Download CV</p>
                    </div>
                    {CV_OPTIONS.map((cv) => (
                      <a
                        key={cv.href}
                        href={cv.href}
                        download
                        onClick={() => setIsResumeOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors duration-200 group"
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cv.dot} opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${cv.color} group-hover:brightness-125 transition-all`}>{cv.label}</p>
                          <p className="text-xs text-white/40 truncate">{cv.desc}</p>
                        </div>
                        <span className="opacity-0 group-hover:opacity-60 transition-opacity text-white/60">
                          <DownloadIcon />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right col — socials + mobile hamburger */}
            <div className="flex items-center gap-1">
              {/* Social Links (desktop only) */}
              <div className="hidden md:flex items-center gap-1">
                <div className="h-6 w-px bg-white/10 mx-2" />
                <a href="https://github.com/J4N3i" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300" title="GitHub">
                  <GithubLogo size={18} weight="fill" />
                </a>
                <a href="https://www.linkedin.com/in/janeesha-gamage-522717298" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300" title="LinkedIn">
                  <LinkedinLogo size={18} weight="fill" />
                </a>
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
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 z-40 glass-card backdrop-blur-md md:hidden transform translate-x-full"
      >
        <div className="p-8 pt-20">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`glass-hover text-left text-lg font-medium transition-colors duration-200 px-4 py-3 rounded-xl border ${activeHref === item.href ? 'text-foreground border-white/20 bg-white/10' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--my', (e.clientY - rect.top) + 'px');
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--mx', '50%');
                  (e.currentTarget as HTMLButtonElement).style.setProperty('--my', '50%');
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Resume Accordion */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsMobileResumeOpen(!isMobileResumeOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Resume</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`transition-transform duration-300 ${isMobileResumeOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileResumeOpen && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {CV_OPTIONS.map((cv) => (
                    <a
                      key={cv.href}
                      href={cv.href}
                      download
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cv.dot} opacity-70`} />
                      <div>
                        <p className={`text-sm font-semibold ${cv.color}`}>{cv.label}</p>
                        <p className="text-xs text-white/40">{cv.desc}</p>
                      </div>
                      <span className="ml-auto opacity-40 group-hover:opacity-70 transition-opacity text-white">
                        <DownloadIcon />
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-6 mt-2 border-t border-border/20">
              <a href="https://github.com/J4N3i" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-electric transition-colors duration-200 flex items-center space-x-2">
                <GithubLogo size={20} weight="bold" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/janeesha-gamage-522717298" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-violet transition-colors duration-200 flex items-center space-x-2">
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