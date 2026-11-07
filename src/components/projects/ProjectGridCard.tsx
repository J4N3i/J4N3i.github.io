import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import type { Project } from '@/types';

interface ProjectGridCardProps {
  project: Project;
}

export const ProjectGridCard = ({ project }: ProjectGridCardProps) => {
  return (
    <div
      tabIndex={0}
      aria-label={`Project: ${project.title}`}
      className="project-card group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/30 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-within:border-primary/40"
    >
      {/* Screenshot / Mockup Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40 flex-shrink-0">
        <img
          src={project.image}
          alt={project.imageAlt}
          width="800"
          height="500"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-primary/90 font-medium mb-4 leading-normal">
            {project.oneLiner}
          </p>

          <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
            <div>
              <span className="font-semibold text-white/90">Problem: </span>
              <span>{project.problem}</span>
            </div>
            <div>
              <span className="font-semibold text-primary">My role: </span>
              <span>{project.role}</span>
            </div>
            <div>
              <span className="font-semibold text-emerald-400">Result: </span>
              <span className="text-white/90">{project.result}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
              >
                <span>Live demo</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
            >
              <GithubLogo size={14} weight="bold" />
              <span>View code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
