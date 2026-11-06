import type { RefObject } from 'react';
import { Code, Users } from 'phosphor-react';
import { technicalSkills, softSkills } from '@/data';

interface SkillsGridProps {
  skillsRef: RefObject<HTMLDivElement>;
}

export const SkillsGrid = ({ skillsRef }: SkillsGridProps) => {
  return (
    <div id="skills" ref={skillsRef} className="mt-32 relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="pt-16 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider">
            <Code size={14} weight="bold" />
            Technical Stack
          </div>
          <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
            Technologies &amp; <span className="text-primary">Expertise</span>
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-violet mx-auto rounded-full opacity-50" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated toolkit spanning frontend, backend, cloud infrastructure, and distributed
            systems — built to deliver scalable, high-performance experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm">
                <Code size={24} className="text-accent-electric" weight="duotone" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">Technical Prowess</h4>
                <p className="text-sm text-muted-foreground">Languages, frameworks &amp; tools</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {technicalSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="skill-icon group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-white/20"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative p-4 flex items-center gap-4">
                      <div
                        className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${skill.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                      >
                        <IconComponent size={26} weight="duotone" />
                      </div>
                      <span className="font-medium tracking-wide text-sm text-white/80 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Skills */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm">
                <Users size={24} className="text-accent-violet" weight="duotone" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">Professional Skills</h4>
                <p className="text-sm text-muted-foreground">Leadership &amp; soft skills</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="skill-icon group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-white/20"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative p-4 flex items-center gap-4">
                      <div
                        className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${skill.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                      >
                        <IconComponent size={26} weight="duotone" />
                      </div>
                      <span className="font-medium tracking-wide text-sm text-white/80 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
