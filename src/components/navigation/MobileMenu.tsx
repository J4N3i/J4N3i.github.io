import { useState, useEffect, useRef } from 'react';
import { CaretDown, GithubLogo, LinkedinLogo } from 'phosphor-react';
import { gsap } from 'gsap';
import type { NavItem, CVOption } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeHref: string;
  onNavigate?: (href: string) => void;
  cvOptions: CVOption[];
  githubUrl: string;
  linkedinUrl: string;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  activeHref,
  cvOptions,
  githubUrl,
  linkedinUrl,
}: MobileMenuProps) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Entrance / exit animation & visibility
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isOpen) {
      setIsVisible(true);
      gsap.fromTo(
        mobileMenu,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileMenu, {
        x: '100%',
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setIsVisible(false);
        },
      });
    }
  }, [isOpen]);

  // Focus trap inside panel & Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const panel = mobileMenuRef.current;
    if (!panel) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Focus the first interactive element on open
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (el) => el.offsetParent !== null || el.getClientRects().length > 0
    );

    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const currentFocusables = Array.from(
          panel.querySelectorAll<HTMLElement>(focusableSelector)
        ).filter((el) => el.offsetParent !== null || el.getClientRects().length > 0);

        if (currentFocusables.length === 0) return;

        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isResumeOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu-panel"
        ref={mobileMenuRef}
        inert={!isOpen ? '' : undefined}
        aria-hidden={!isOpen}
        style={{ visibility: isVisible || isOpen ? 'visible' : 'hidden' }}
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-40 glass-card backdrop-blur-md md:hidden transform translate-x-full overflow-y-auto"
      >
        <div className="p-6 pt-20">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isCurrent = activeHref === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`min-h-[44px] flex items-center text-left text-base font-medium transition-colors duration-200 px-4 py-2.5 rounded-xl border ${
                    isCurrent
                      ? 'text-foreground border-white/20 bg-white/10'
                      : 'text-white/75 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Mobile Resume Accordion */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 text-base font-medium text-white/75 hover:text-white transition-colors"
                aria-expanded={isResumeOpen}
              >
                <span>Resume / CV</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isResumeOpen && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {cvOptions.map((cv) => (
                    <a
                      key={cv.href}
                      href={cv.href}
                      download
                      onClick={onClose}
                      className="min-h-[44px] flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cv.dot} opacity-70`} />
                      <div>
                        <p className={`text-sm font-semibold ${cv.color}`}>{cv.label}</p>
                        <p className="text-xs text-white/75">{cv.desc}</p>
                      </div>
                      <span className="ml-auto opacity-40 group-hover:opacity-70 transition-opacity text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-6 mt-2 border-t border-border/20">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center space-x-2 text-white/75 hover:text-white transition-colors duration-200"
              >
                <GithubLogo size={20} weight="bold" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center space-x-2 text-white/75 hover:text-white transition-colors duration-200"
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
