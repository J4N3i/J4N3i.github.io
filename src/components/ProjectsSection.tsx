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
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-72 h-72 top-1/3 -left-36 opacity-10 float-medium" />
        <div className="orb w-48 h-48 bottom-1/4 right-1/4 opacity-15 float-fast" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
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

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "DineEase Backend",
              desc: "A robust backend system for a restaurant management and reservation platform. Handles user authentication, booking management, and menu data.",
              tags: ["Node.js", "Express", "MongoDB", "API"],
              link: "https://github.com/J4N3i/dinease_backend"
            },
            {
              title: "Payment System Zookeeper",
              desc: "A distributed payment processing system utilizing Apache Zookeeper for coordination and fault tolerance. Demonstrates distributed systems concepts.",
              tags: ["Java", "Zookeeper", "Distributed Systems"],
              link: "https://github.com/J4N3i/payment_system_zookeeper"
            },
            {
              title: "Portfolio Website",
              desc: "My personal portfolio website featuring a futuristic design, 3D elements, and an AI chatbot assistant. Built with modern web technologies.",
              tags: ["React", "TypeScript", "GSAP", "Tailwind"],
              link: "https://github.com/J4N3i/J4N3i.github.io"
            },
            {
              title: "PPcom",
              desc: "A communication or processing tool. (Description inferred from repository name).",
              tags: ["C++", "Systems Programming"],
              link: "https://github.com/J4N3i/PPcom"
            },
            {
              title: "Worksheet-07",
              desc: "Academic coursework or practical exercises demonstrating core programming concepts and problem-solving skills.",
              tags: ["Java", "Algorithms"],
              link: "https://github.com/J4N3i/Worksheet-07"
            },
            {
              title: "Git Evaluate Base",
              desc: "A base project template used for evaluating Git knowledge and workflow proficiency.",
              tags: ["Git", "Workflow", "Template"],
              link: "https://github.com/J4N3i/git-evaluate-base"
            },
            {
              title: "GitHub Profile",
              desc: "My personal GitHub profile configuration, showcasing my skills, stats, and a brief introduction.",
              tags: ["Markdown", "Profile", "Config"],
              link: "https://github.com/J4N3i/J4N3i"
            }
          ].map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated/30 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 flex flex-col h-full z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-background/50 border border-white/5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                    <GithubLogo size={24} weight="duotone" />
                  </div>
                  <div className="p-2 rounded-full text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                    <ArrowUpRight size={20} weight="bold" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/5 rounded-full text-muted-foreground border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;