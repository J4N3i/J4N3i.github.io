import { forwardRef } from 'react';
import { Code } from 'phosphor-react';
import { skillGroups } from '@/data';
import { SectionHeader } from '@/components/common/SectionHeader';

export const SkillsGrid = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div id="skills" ref={ref} className="pt-8">
      <SectionHeader
        badgeIcon={Code}
        badgeText="Skills"
        titleNormal="Tools I work with"
        titleAccent=""
        headingClassName="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
        subtitle="Grouped by what I use them for."
        hasDivider={false}
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="skill-card p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 transition-colors hover:border-white/20"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-white/20 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SkillsGrid.displayName = 'SkillsGrid';
