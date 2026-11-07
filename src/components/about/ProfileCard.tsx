import { forwardRef } from 'react';
import { aboutData } from '@/data';

export const ProfileCard = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="w-full flex flex-col items-center lg:items-start">
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-surface-elevated/40 shadow-2xl shadow-black/40">
        <img
          src={aboutData.image.src}
          srcSet={aboutData.image.srcSet}
          sizes={aboutData.image.sizes}
          alt={aboutData.image.alt}
          width={aboutData.image.width}
          height={aboutData.image.height}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Static Availability Pill under photo */}
      <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{aboutData.statusPill}</span>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';
