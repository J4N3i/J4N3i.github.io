import { forwardRef } from 'react';
import { profile } from '@/data';

export const HeroCTA = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
    >
      <a
        href="#projects"
        className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-primary text-white font-semibold text-base sm:text-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/25 ring-offset-2 focus:ring-2 ring-primary focus:outline-none text-center"
      >
        View my work
      </a>
      <a
        href={profile.cvs.devops.href}
        download={profile.cvs.devops.href.replace('/', '')}
        className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 backdrop-blur-sm focus:ring-2 ring-primary ring-offset-2 focus:outline-none text-center"
      >
        Download CV
      </a>
    </div>
  );
});

HeroCTA.displayName = 'HeroCTA';
