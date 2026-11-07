import { CalendarBlank } from 'phosphor-react';
import type { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience: exp }: ExperienceCardProps) => {
  const IconComponent = exp.icon;
  const isPresent = exp.period.includes('Present');

  return (
    <div className="experience-item relative">
      {/* Desktop Timeline Node */}
      <div className="hidden md:flex absolute -left-[45px] top-5 w-7 h-7 rounded-full bg-background border border-white/20 items-center justify-center z-10">
        <div className={`w-2 h-2 rounded-full ${isPresent ? 'bg-emerald-400' : 'bg-white/40'}`} />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 transition-colors hover:border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary flex-shrink-0">
              <IconComponent size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                {exp.role}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/70">{exp.organization}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full w-fit flex-shrink-0">
            {isPresent && (
              <span className="relative flex h-1.5 w-1.5 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            )}
            <CalendarBlank size={12} weight="bold" />
            <span>{exp.period}</span>
          </div>
        </div>

        <p className="text-sm text-white/80 leading-relaxed pt-1">{exp.description}</p>
      </div>
    </div>
  );
};
