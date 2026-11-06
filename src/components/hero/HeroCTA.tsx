import { forwardRef } from 'react';
import { profile } from '@/data';

export const HeroCTA = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <a
        href="#projects"
        className="px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 ring-offset-2 focus:ring-2 ring-primary focus:outline-none"
      >
        View My Work
      </a>
      <a
        href={profile.cvs.devops.href}
        download={profile.cvs.devops.href.replace('/', '')}
        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm focus:ring-2 ring-primary ring-offset-2 focus:outline-none"
      >
        Download CV
      </a>
    </div>
  );
});

HeroCTA.displayName = 'HeroCTA';
