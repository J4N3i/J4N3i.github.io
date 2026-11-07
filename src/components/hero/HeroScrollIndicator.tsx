import { forwardRef } from 'react';

interface HeroScrollIndicatorProps {
  onClick?: () => void;
}

export const HeroScrollIndicator = forwardRef<HTMLButtonElement, HeroScrollIndicatorProps>(
  ({ onClick }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Scroll to about section"
        className="mx-auto mt-6 sm:mt-16 min-h-[44px] min-w-[44px] inline-flex flex-col items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-2 transition-transform active:scale-95 text-white/70 hover:text-white"
        onClick={onClick}
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    );
  }
);

HeroScrollIndicator.displayName = 'HeroScrollIndicator';
