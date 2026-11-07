import { useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, GithubLogo, FolderOpen } from 'phosphor-react';
import { projects, profile } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ANIMATION_EASING, SCROLL_TRIGGER_POINTS } from '@/constants/animations';
import { FeaturedProjectCard } from './projects/FeaturedProjectCard';
import { ProjectGridCard } from './projects/ProjectGridCard';

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const gridProjects = projects.filter((p) => p.slug !== featuredProject.slug);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    if (title) {
      gsap.set(title, { opacity: 0, y: 16 });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: ANIMATION_EASING.power2Out,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...SCROLL_TRIGGER_POINTS.standard,
        },
      });
    }

    gsap.set('.project-card', { opacity: 0, y: 16 });
    gsap.to('.project-card', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: ANIMATION_EASING.power2Out,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current || sectionRef.current,
        ...SCROLL_TRIGGER_POINTS.cards,
      },
    });
  });

  return (
    <section id="projects" ref={sectionRef} className="section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-72 h-72 top-1/3 -left-36 opacity-10 float-medium" />
        <div className="orb w-48 h-48 bottom-1/4 right-1/4 opacity-15 float-fast" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <SectionHeader
          ref={titleRef}
          badgeIcon={FolderOpen}
          badgeText="Portfolio"
          titleNormal="Selected"
          titleAccent="Work"
          subtitle="Production-grade systems, cloud architectures, and full-stack web platforms built for reliability and scale."
        />

        <div ref={containerRef} className="space-y-8 md:space-y-12">
          {/* Featured Project (Full Width: Image Left, Text Right on Desktop; Stacked on Mobile) */}
          <FeaturedProjectCard project={featuredProject} />

          {/* Remaining Projects in a Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridProjects.map((project) => (
              <ProjectGridCard key={project.slug} project={project} />
            ))}
          </div>

          {/* More on GitHub Link */}
          <div className="pt-6 sm:pt-8 text-center">
            <a
              href={`${profile.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-semibold backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
            >
              <GithubLogo size={18} weight="bold" />
              <span>More projects on GitHub</span>
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
