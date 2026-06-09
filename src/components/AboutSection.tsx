
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, Palette, Rocket, Database, Sparkle, Coffee, Users, ChatCircle, Lightbulb, Handshake, Brain, Lightning, ShareNetwork, Monitor, Gear } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skills = skillsRef.current;

    if (!section || !image || !content || !skills) return;

    // Initial states
    gsap.set([image, content], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.skill-icon', { opacity: 0, scale: 0.5, y: 30 });

    // Scroll triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(image, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
      .to(content, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }, '-=0.7')
      .to('.skill-icon', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1
      }, '-=0.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const technicalSkills = [
    { name: 'React / TypeScript', icon: Globe, color: 'text-accent-violet' },
    { name: 'Java / Spring Boot', icon: Coffee, color: 'text-primary' },
    { name: 'C# / ASP.NET Core', icon: Monitor, color: 'text-accent-electric' },
    { name: 'Python / FastAPI', icon: Lightning, color: 'text-accent-cyan' },
    { name: 'C / C++', icon: Gear, color: 'text-accent-electric' },
    { name: 'Docker / DevOps', icon: Database, color: 'text-accent-violet' },
    { name: 'Azure / Cloud', icon: Globe, color: 'text-primary' },
    { name: 'Distributed Systems', icon: ShareNetwork, color: 'text-accent-cyan' },
    { name: 'GSAP / Animation', icon: Sparkle, color: 'text-primary' },
    { name: 'Clean Architecture', icon: Rocket, color: 'text-accent-electric' },
    { name: 'OOP / Design Patterns', icon: Brain, color: 'text-accent-violet' },
    { name: 'Zero-Trust / Security', icon: Palette, color: 'text-accent-cyan' },
  ];

  const softSkills = [
    { name: 'Leadership & Coordination', icon: Users, color: 'text-accent-electric' },
    { name: 'Written Communication', icon: ChatCircle, color: 'text-accent-violet' },
    { name: 'Analytical Thinking', icon: Lightbulb, color: 'text-primary' },
    { name: 'Time Management', icon: Handshake, color: 'text-accent-cyan' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-96 h-96 top-1/4 -right-48 opacity-10 float-slow" />
        <div className="orb w-64 h-64 bottom-1/4 -left-32 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 group">
              {/* Ambient Glow (Static & Subtle) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent-violet/20 blur-[60px] opacity-40" />

              {/* Image Container - Premium Double Ring */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/5 ring-1 ring-white/10 shadow-2xl shadow-black/50 transition-all duration-500 group-hover:border-primary/20 group-hover:ring-primary/20">
                <img
                  src="/lovable-uploads/30872b2d-0d86-4a0b-846f-852771a82f6e.png"
                  alt="Janeesha Vishwaprabha - Full-Stack Developer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-[1.02]"
                />

                {/* Subtle Inner Shadow/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Floating Badge - Interactive */}
              <a
                href="#contact"
                className="absolute -bottom-4 -right-4 glass-card px-6 py-3 rounded-full border border-white/10 shadow-xl animate-float-slow hidden md:block group-hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden"
              >
                {/* Default State: Available for Projects */}
                <div className="flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-10">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Available for Projects</span>
                </div>

                {/* Hover State: Let's Collaborate */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 translate-y-10 group-hover:translate-y-0 bg-surface-elevated/90 backdrop-blur-md">
                  <Handshake size={20} weight="fill" className="text-primary" />
                  <span className="text-sm font-bold text-primary">Let's Collaborate</span>
                </div>
              </a>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-10 text-center lg:text-left order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
                <Users size={14} weight="bold" />
                Who I Am
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Turning Vision Into <br />
                <span className="text-glow-primary">Digital Reality</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground/90 text-xl">
                  I'm a Computer Science undergraduate at SLIIT, currently serving as Vice President of the Computer Sciences Student Community.
                </p>
                <p>
                  I design and build systems across the full stack — from immersive React frontends with GSAP to distributed backends, cloud infrastructure on Microsoft Azure, and private self-hosted labs running Proxmox, Docker, and TrueNAS. I'm passionate about clean architecture, DevOps, and zero-trust security.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-foreground">3+</h4>
                <p className="text-sm text-muted-foreground">Years of Coding</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-foreground">6+</h4>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-foreground">5+</h4>
                <p className="text-sm text-muted-foreground">Leadership Roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid - Professional Layout */}
        <div id="skills" ref={skillsRef} className="mt-32 relative">
          {/* Section Divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="pt-16 space-y-16">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                Technologies &amp; <span className="text-primary">Expertise</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A curated toolkit spanning frontend, backend, cloud infrastructure, and distributed systems — built to deliver scalable, high-performance experiences.
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
                  {technicalSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-icon group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-white/20"
                    >
                      {/* Top Shine */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Hover Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative p-4 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${skill.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                          <skill.icon size={26} weight="duotone" />
                        </div>
                        <span className="font-medium tracking-wide text-sm text-white/80 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
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
                  {softSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-icon group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:border-white/20"
                    >
                      {/* Top Shine */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Hover Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative p-4 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${skill.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                          <skill.icon size={26} weight="duotone" />
                        </div>
                        <span className="font-medium tracking-wide text-sm text-white/80 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
