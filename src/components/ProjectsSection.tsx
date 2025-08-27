import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const container = containerRef.current;

    if (!section || !title || !container) return;

    // Initial states
    gsap.set(title, { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.project-card', { opacity: 0, y: 60, scale: 0.9 });

    // Scroll triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    .to('.project-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-72 h-72 top-1/3 -left-36 opacity-10 float-medium" />
        <div className="orb w-48 h-48 bottom-1/4 right-1/4 opacity-15 float-fast" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold text-glow-primary mb-6"
          >
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated collection of work that reflects my approach to design and development.
          </p>
        </div>

        {/* No Projects Message */}
        <div 
          ref={containerRef}
          className="text-center py-16"
        >
          <div className="glass-card glass-hover p-12 rounded-2xl max-w-2xl mx-auto"
               onMouseMove={(e) => {
                 const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                 const x = e.clientX - rect.left; 
                 const y = e.clientY - rect.top;
                 (e.currentTarget as HTMLDivElement).style.setProperty('--mx', x + 'px');
                 (e.currentTarget as HTMLDivElement).style.setProperty('--my', y + 'px');
               }}
               onMouseLeave={(e) => {
                 (e.currentTarget as HTMLDivElement).style.setProperty('--mx', '50%');
                 (e.currentTarget as HTMLDivElement).style.setProperty('--my', '50%');
               }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center opacity-50">
                <GithubLogo size={32} weight="bold" className="text-primary-foreground" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Work in Progress
            </h3>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm currently crafting several pieces that explore the intersection of performance, 
              motion, and user experience. New work will appear here soon.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-4 py-2 text-sm font-medium bg-surface-elevated rounded-full text-muted-foreground border border-border">
                React
              </span>
              <span className="px-4 py-2 text-sm font-medium bg-surface-elevated rounded-full text-muted-foreground border border-border">
                TypeScript
              </span>
              <span className="px-4 py-2 text-sm font-medium bg-surface-elevated rounded-full text-muted-foreground border border-border">
                GSAP
              </span>
              <span className="px-4 py-2 text-sm font-medium bg-surface-elevated rounded-full text-muted-foreground border border-border">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;