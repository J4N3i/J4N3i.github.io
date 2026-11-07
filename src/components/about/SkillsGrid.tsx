import type { RefObject } from 'react';
import { Code } from 'phosphor-react';
import { skillGroups } from '@/data';

interface SkillsGridProps {
  skillsRef: RefObject<HTMLDivElement>;
}

export const SkillsGrid = ({ skillsRef }: SkillsGridProps) => {
  return (
    <div id="skills" ref={skillsRef} className="mt-24 md:mt-32 relative">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider">
            <Code size={14} weight="bold" />
            Skills
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">Tools I work with</h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Grouped by what I use them for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
            >
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border border-white/10 bg-white/5 text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
