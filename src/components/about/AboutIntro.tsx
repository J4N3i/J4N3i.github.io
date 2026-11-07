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

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          I like building things that work,{' '}
          <span className="text-primary">and keeping them working.</span>
        </h2>
      </div>

      <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
        {aboutData.paragraphs.map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? 'text-foreground/90 font-medium' : undefined}>
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
