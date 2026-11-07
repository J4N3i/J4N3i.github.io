import { useState, useRef, useEffect } from 'react';
import { CaretDown, DownloadSimple } from 'phosphor-react';
import { cvs } from '@/data/profile';
import type { CVItem } from '@/types';

export interface CvDownloadProps {
  variant?: 'nav' | 'hero' | 'footer' | 'menu' | 'contact';
  className?: string;
  onItemClick?: () => void;
}

export const CvDownload = ({ variant = 'nav', className = '', onItemClick }: CvDownloadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const caretButtonRef = useRef<HTMLButtonElement>(null);

  const defaultCv: CVItem = cvs[0];

  // Close on outside pointer click
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  // Handle Escape key: close and restore focus to caret button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        caretButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectCv = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  // ==========================================
  // Mobile Menu Variant: Stacked list of 3 full-width tap targets (>= 44px)
  // ==========================================
  if (variant === 'menu') {
    return (
      <div className={`space-y-2 w-full ${className}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/70 px-1">
          Download CV
        </p>
        <div className="flex flex-col space-y-2">
          {cvs.map((cv, idx) => {
            const isRecommended = idx === 0;
            return (
              <a
                key={cv.id}
                href={cv.href}
                download={cv.filename}
                onClick={handleSelectCv}
                className="min-h-[44px] flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/20 transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {cv.label}
                    </span>
                    {isRecommended && (
                      <span className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/75 truncate mt-0.5">{cv.desc}</p>
                </div>
                <DownloadSimple
                  size={16}
                  weight="bold"
                  className="text-white/60 group-hover:text-primary flex-shrink-0 transition-colors"
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // Desktop Split-Button Variants
  // ==========================================
  const isNav = variant === 'nav';
  const isHero = variant === 'hero';
  const isFooter = variant === 'footer';
  const isContact = variant === 'contact';

  let containerStyles = 'relative inline-flex items-center isolate';
  let mainButtonStyles = '';
  let dividerStyles = '';
  let caretButtonStyles = '';

  if (isNav) {
    containerStyles +=
      ' rounded-full bg-primary text-white shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors';
    mainButtonStyles =
      'px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-l-full';
    dividerStyles = 'h-3.5 w-[1px] bg-white/30';
    caretButtonStyles =
      'px-2 py-1.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-r-full hover:bg-white/10 transition-colors';
  } else if (isHero) {
    containerStyles +=
      ' w-full sm:w-auto rounded-full bg-white/5 border border-white/10 text-foreground font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 backdrop-blur-sm shadow-sm';
    mainButtonStyles =
      'flex-1 sm:flex-initial px-6 py-3.5 sm:px-7 sm:py-4 whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-l-full';
    dividerStyles = 'h-6 w-[1px] bg-white/15';
    caretButtonStyles =
      'px-4 py-3.5 sm:px-4 sm:py-4 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-r-full hover:bg-white/10 transition-colors';
  } else if (isFooter) {
    containerStyles +=
      ' gap-1 text-xs font-medium text-white/70 hover:text-white transition-colors';
    mainButtonStyles =
      'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1 px-1.5';
    dividerStyles = 'hidden';
    caretButtonStyles =
      'p-1 rounded hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors';
  } else if (isContact) {
    containerStyles +=
      ' w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium text-sm transition-colors min-w-0';
    mainButtonStyles =
      'flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-l-xl min-w-0';
    dividerStyles = 'h-5 w-[1px] bg-white/10 flex-shrink-0';
    caretButtonStyles =
      'px-3.5 py-3 flex items-center justify-center hover:bg-white/10 rounded-r-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors flex-shrink-0';
  }

  // Panel positioning: footer opens upward, others open downward
  const panelPosition = isFooter
    ? 'bottom-full mb-2 right-0 sm:right-auto sm:left-0'
    : 'top-full mt-2 right-0';

  return (
    <div ref={containerRef} className={`${containerStyles} ${isOpen ? 'z-50' : ''} ${className}`}>
      {/* Main Download Button (Default CV) */}
      <a href={defaultCv.href} download={defaultCv.filename} className={mainButtonStyles}>
        {isContact && (
          <DownloadSimple size={18} weight="bold" className="text-primary flex-shrink-0" />
        )}
        <span>Download CV</span>
      </a>

      {/* Divider */}
      <span className={dividerStyles} aria-hidden="true" />

      {/* Caret Button (Disclosure Toggle) */}
      <button
        ref={caretButtonRef}
        type="button"
        aria-label="Choose another CV"
        aria-expanded={isOpen}
        aria-controls="cv-dropdown-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className={caretButtonStyles}
      >
        <CaretDown
          size={isNav || isFooter ? 14 : 16}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Disclosure Panel listing all CVs - Solid opaque dark surface without transparency */}
      <div
        id="cv-dropdown-panel"
        aria-hidden={!isOpen}
        className={`absolute ${panelPosition} w-64 sm:w-72 max-w-[calc(100vw-2rem)] z-[70] p-2 rounded-2xl bg-[#12141c] border border-white/10 shadow-2xl shadow-black/60 transition-all duration-200 ease-out origin-top-right motion-reduce:transition-none motion-reduce:transform-none ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : isFooter
              ? 'opacity-0 translate-y-2 pointer-events-none'
              : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-2.5 py-1.5 border-b border-white/10 mb-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Select a tailored CV
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          {cvs.map((cv, idx) => {
            const isRecommended = idx === 0;
            return (
              <a
                key={cv.id}
                href={cv.href}
                download={cv.filename}
                onClick={handleSelectCv}
                className="group flex flex-col gap-0.5 p-2.5 rounded-xl bg-transparent hover:bg-[#1e2230] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {cv.label}
                  </span>
                  {isRecommended ? (
                    <span className="text-xs font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-[#1e293b] text-primary border border-primary/40">
                      Recommended
                    </span>
                  ) : (
                    <DownloadSimple
                      size={14}
                      weight="bold"
                      className="text-white/50 group-hover:text-primary transition-colors"
                    />
                  )}
                </div>
                <p className="text-xs text-white/75 line-clamp-1">{cv.desc}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
