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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenu,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileMenu, { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 z-40 glass-card backdrop-blur-md md:hidden transform translate-x-full"
      >
        <div className="p-8 pt-20">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isCurrent = activeHref === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`text-left text-lg font-medium transition-colors duration-200 px-4 py-3 rounded-xl border ${
                    isCurrent
                      ? 'text-foreground border-white/20 bg-white/10'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Mobile Resume Accordion */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Resume</span>
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
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cv.dot} opacity-70`} />
                      <div>
                        <p className={`text-sm font-semibold ${cv.color}`}>{cv.label}</p>
                        <p className="text-xs text-white/70">{cv.desc}</p>
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
                className="text-muted-foreground hover:text-accent-electric transition-colors duration-200 flex items-center space-x-2"
              >
                <GithubLogo size={20} weight="bold" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
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
