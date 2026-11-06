import { forwardRef } from 'react';

interface HeroScrollIndicatorProps {
  onClick?: () => void;
}

export const HeroScrollIndicator = forwardRef<HTMLDivElement, HeroScrollIndicatorProps>(
  ({ onClick }, ref) => {
    return (
      <div
        ref={ref}
        className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onClick}
      >
        <span className="text-xs font-medium text-white/70 uppercase tracking-widest">Scroll</span>
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
          className="text-white/70"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    );
  }
);

HeroScrollIndicator.displayName = 'HeroScrollIndicator';
