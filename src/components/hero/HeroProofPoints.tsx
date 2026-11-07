import { profile } from '@/data';

export const HeroProofPoints = () => {
  return (
    <div className="mt-4 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="font-medium text-white/90">CS Undergrad</span>
        <span className="text-white/50">@ SLIIT</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
        <span className="font-medium text-white/90">{profile.quickStats[2].value}</span>
        <span className="text-white/50">{profile.quickStats[2].label}</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
        <span className="font-medium text-white/90">{profile.quickStats[1].value}</span>
        <span className="text-white/50">{profile.quickStats[1].label}</span>
      </div>
    </div>
  );
};
