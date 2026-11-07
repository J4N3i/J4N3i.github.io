import { forwardRef } from 'react';
import { CvDownload } from '../CvDownload';

export const HeroCTA = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto relative z-30"
    >
      <a
        href="#projects"
        className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-primary text-white font-semibold text-sm sm:text-base hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25 ring-offset-2 focus:ring-2 ring-primary focus:outline-none text-center"
      >
        View my work
      </a>
      <CvDownload variant="hero" />
    </div>
  );
});

HeroCTA.displayName = 'HeroCTA';
