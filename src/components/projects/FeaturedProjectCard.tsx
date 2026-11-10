import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import type { Project } from '@/types';

interface FeaturedProjectCardProps {
  project: Project;
}

export const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  return (
    <div
      tabIndex={0}
      aria-label={`Featured Project: ${project.title}`}
      className="project-card group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-white/10 bg-surface-elevated/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-within:border-primary/40"
    >
      {/* Visual / Screenshot Container */}
      <div className="relative w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-black/40 flex-shrink-0">
        <img
          src={project.image}
          srcSet={project.srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 600px"
          alt={project.imageAlt}
          width={project.width || 1200}
          height={project.height || 750}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
          Featured Project
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* Narrative & Metrics */}
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-primary/90 font-medium mb-6">
            {project.oneLiner}
          </p>

          <div className="space-y-3.5 text-sm text-muted-foreground leading-relaxed">
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

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
              >
                <span>Live demo</span>
                <ArrowUpRight size={15} weight="bold" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
            >
              <GithubLogo size={16} weight="bold" />
              <span>View code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
