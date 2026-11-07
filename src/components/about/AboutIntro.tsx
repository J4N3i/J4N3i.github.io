import { forwardRef } from 'react';
import { Users } from 'phosphor-react';
import { aboutData } from '@/data';

export const AboutIntro = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="space-y-8 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
          <Users size={14} weight="bold" />
          {aboutData.badge}
        </div>

        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground leading-tight">
          I like building things that work, and keeping them{' '}
          <span className="text-primary">working</span>.
        </h2>
      </div>

      <div className="space-y-4 text-base sm:text-lg text-white/80 leading-relaxed">
        {aboutData.paragraphs.map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? 'text-foreground font-medium' : undefined}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* 3 Facts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        {aboutData.facts.map((fact, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-base sm:text-lg font-bold text-foreground">{fact.title}</div>
            <div className="text-xs sm:text-sm text-white/70">{fact.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

AboutIntro.displayName = 'AboutIntro';
