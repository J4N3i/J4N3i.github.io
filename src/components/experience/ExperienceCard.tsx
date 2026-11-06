import { CalendarBlank } from 'phosphor-react';
import type { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = ({ experience: exp }: ExperienceCardProps) => {
  const IconComponent = exp.icon;
  return (
    <div
      className={`group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${exp.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${exp.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
      />

      <div className="relative z-10 flex gap-5 items-start">
        <div
          className={`p-3 rounded-2xl bg-black/20 border border-white/5 ${exp.color} group-hover:scale-110 transition-transform duration-500 shadow-inner flex-shrink-0`}
        >
          <IconComponent size={32} weight="fill" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-tight leading-tight">
              {exp.role}
            </h3>
            <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium bg-white/5 px-2 py-0.5 rounded-full border border-white/5 w-fit">
              <CalendarBlank size={11} weight="bold" />
              <span>{exp.period}</span>
            </div>
          </div>

          <h4 className={`text-sm font-semibold ${exp.color} mb-2 leading-snug`}>
            {exp.organization}
          </h4>

          <p className="text-white/60 leading-relaxed text-sm">{exp.description}</p>
        </div>
      </div>
    </div>
  );
};
