import { forwardRef } from 'react';
import { Code, Cloud, UsersThree } from 'phosphor-react';
import { aboutData } from '@/data';

const icons = [Code, Cloud, UsersThree];

export const WhatIDoRow = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="space-y-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-white/60">What I do</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aboutData.whatIDo.map((item, idx) => {
          const Icon = icons[idx] ?? Code;
          return (
            <div
              key={item.title}
              className="what-i-do-card p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.05]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Icon size={20} weight="duotone" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

WhatIDoRow.displayName = 'WhatIDoRow';
