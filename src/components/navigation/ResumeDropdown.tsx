import { useState, useEffect, useRef } from 'react';
import { CaretDown } from 'phosphor-react';
import { gsap } from 'gsap';
import type { CVOption } from '@/types';

interface ResumeDropdownProps {
  options: CVOption[];
}

export const ResumeDropdown = ({ options }: ResumeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const resumeBtnRef = useRef<HTMLButtonElement>(null);
  const resumeDropdownRef = useRef<HTMLDivElement>(null);

  // Close on scroll so it doesn't float at stale position
  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    window.addEventListener('scroll', closeDropdown, { passive: true });
    return () => window.removeEventListener('scroll', closeDropdown);
  }, []);

  // Animate dropdown entrance
  useEffect(() => {
    const el = resumeDropdownRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resumeDropdownRef.current &&
        !resumeDropdownRef.current.closest('[data-resume-menu]')?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && resumeBtnRef.current) {
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
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" data-resume-menu>
      <button
        ref={resumeBtnRef}
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Resume
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && dropdownPos && (
        <div
          ref={resumeDropdownRef}
          data-resume-menu
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          className="fixed w-64 rounded-2xl border border-white/10 bg-background/90 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden z-[60]"
        >
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-widest">Download CV</p>
          </div>
          {options.map((cv) => (
            <a
              key={cv.href}
              href={cv.href}
              download
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors duration-200 group"
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cv.dot} opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${cv.color} group-hover:brightness-125 transition-all`}>{cv.label}</p>
                <p className="text-xs text-white/70 truncate">{cv.desc}</p>
              </div>
              <span className="opacity-0 group-hover:opacity-60 transition-opacity text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  );
};
