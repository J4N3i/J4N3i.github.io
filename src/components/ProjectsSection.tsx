import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, FolderOpen } from 'phosphor-react';

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
        stagger: 0.15
      }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Enterprise DevOps Lab & Private Cloud",
      desc: "Architected a zero-trust private cloud using Proxmox VE for virtualisation and TrueNAS SCALE for ZFS-backed RAID 1 storage. Deployed a containerised microservices stack (Nextcloud, Pi-hole, n8n, Nginx) and an automated CI/CD pipeline via GitHub Actions deploying to Azure/AWS.",
      tags: ["Proxmox", "TrueNAS", "Docker", "Tailscale", "GitHub Actions", "Grafana"],
      link: "https://github.com/J4N3i",
      featured: true,
    },
    {
      title: "Internova — Internship Matching Portal",
      desc: "Engineered a 3-tier architecture deployed on Microsoft Azure using an ASP.NET Core Web API backend and a React.js (Vite) frontend. Implemented JWT authentication, Role-Based Access Control (RBAC), and a 3NF normalised database on Azure Flexible Server.",
      tags: [".NET 8", "React", "Azure", "MySQL", "JWT", "RBAC"],
      link: "https://github.com/J4N3i/Internova",
    },
    {
      title: "DS-Pay — Distributed Payments System",
      desc: "Designed a distributed payments prototype demonstrating leader election via Apache ZooKeeper, WAL replication, and idempotent transactions. Built a multi-node FastAPI cluster with Lamport logical clocks and Berkeley-style time synchronisation.",
      tags: ["Python", "FastAPI", "ZooKeeper", "SQLite", "Distributed Systems"],
      link: "https://github.com/J4N3i/payment_system_zookeeper",
    },
    {
      title: "TestLang Compiler (PPcom)",
      desc: "Developed a custom language compiler in Java using JFlex for lexical analysis and CUP for parsing to generate an Abstract Syntax Tree (AST). Integrated with a Spring Boot REST API to process and execute custom language scripts via a web interface.",
      tags: ["Java", "JFlex", "CUP", "Spring Boot", "AST", "REST API"],
      link: "https://github.com/J4N3i/PPcom",
    },
    {
      title: "Exodus — 3D Interactive Environment",
      desc: "Programmed custom AI agent behaviours and navigation tracking using Unity's baked NavMesh system. Integrated custom 3D models alongside dynamic interactive object scripts for an immersive interactive environment.",
      tags: ["Unity", "C#", "AI Navigation", "NavMesh", "3D Modelling"],
      link: "https://github.com/J4N3i/Exodus",
    },
    {
      title: "Personal Portfolio Website",
      desc: "Designed and built this animated personal portfolio using React 18, TypeScript, and Vite. Integrated GSAP ScrollTrigger animations, shadcn-ui components, a Spline 3D background, and a custom AI chatbot assistant — deployed live at janeeshagamage.me.",
      tags: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Vite", "Spline"],
      link: "https://github.com/J4N3i/J4N3i.github.io",
    },
  ];

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
            <FolderOpen size={14} weight="bold" />
            Selected Work
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70"
          >
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-violet mx-auto rounded-full opacity-50 mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated collection of work spanning full-stack development, distributed systems, DevOps infrastructure, and interactive media.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group relative flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                project.featured
                  ? 'bg-gradient-to-br from-primary/10 via-surface-elevated/40 to-surface-elevated/20 border-primary/20 hover:border-primary/40 hover:shadow-primary/10'
                  : 'bg-surface-elevated/30 border-white/5 hover:border-primary/30 hover:shadow-primary/5'
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest z-10">
                  Featured
                </div>
              )}

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
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
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