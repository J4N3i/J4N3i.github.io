
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, Palette, Rocket, Database, Sparkle, Coffee, Users, ChatCircle, Lightbulb, Handshake, Brain } from 'phosphor-react';

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

  const skills = [
    // Technical Skills
    { name: 'Frontend', icon: Code, color: 'text-accent-electric', category: 'technical' },
    { name: 'React', icon: Globe, color: 'text-accent-violet', category: 'technical' },
    { name: 'Java', icon: Coffee, color: 'text-primary', category: 'technical' },
    { name: 'C/C++', icon: Database, color: 'text-accent-cyan', category: 'technical' },
    { name: 'OOP', icon: Brain, color: 'text-accent-electric', category: 'technical' },
    { name: 'Design Patterns', icon: Palette, color: 'text-accent-violet', category: 'technical' },
    { name: 'Animation', icon: Sparkle, color: 'text-primary', category: 'technical' },
    { name: 'Performance', icon: Rocket, color: 'text-accent-cyan', category: 'technical' },
    // Soft Skills
    { name: 'Leadership', icon: Users, color: 'text-accent-electric', category: 'soft' },
    { name: 'Communication', icon: ChatCircle, color: 'text-accent-violet', category: 'soft' },
    { name: 'Problem Solving', icon: Lightbulb, color: 'text-primary', category: 'soft' },
    { name: 'Sales & Negotiation', icon: Handshake, color: 'text-accent-cyan', category: 'soft' }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-96 h-96 top-1/4 -right-48 opacity-10 float-slow" />
        <div className="orb w-64 h-64 bottom-1/4 -left-32 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start">
            <div className="relative w-80 h-80">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full bg-gradient-primary opacity-30 blur-lg" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden glass-card border-2 border-primary/30 hover:scale-105 transition-transform duration-500">
                <img 
                  src="/lovable-uploads/30872b2d-0d86-4a0b-846f-852771a82f6e.png"
                  alt="Janeesha Gamage - Web Developer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-glow-primary">
                About Me
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate web developer and an undergraduate at SLIIT (Sri Lanka Institute of Information Technology) 
                  studying Computer Science. Currently serving as the Vice President of the Computer Sciences Student Committee at SLIIT, 
                  I transform ideas into immersive digital experiences with expertise in modern technologies and a keen eye for design, 
                  creating websites that not only look stunning but perform exceptionally.
                </p>
                <p>
                  My journey in web development has led me to master cutting-edge tools like React, 
                  GSAP, and advanced animation libraries. I believe in the power of seamless user 
                  experiences and the magic of perfectly timed animations, combining academic knowledge 
                  with practical development skills and leadership experience in the tech community.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="space-y-8">
              <h3 className="text-2xl font-semibold text-foreground text-center lg:text-left">
                Technologies & Skills
              </h3>
              
              {/* Technical Skills */}
              <div>
                <h4 className="text-lg font-medium text-muted-foreground mb-4 text-center lg:text-left">Technical Skills</h4>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {skills.filter(skill => skill.category === 'technical').map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="skill-icon group cursor-pointer"
                    >
                      <div className="glass-card p-4 rounded-xl hover:scale-110 transition-all duration-300 hover:glow-primary">
                        <skill.icon 
                          size={28} 
                          className={`${skill.color} mb-2 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                          weight="light"
                        />
                        <p className="text-xs font-medium text-foreground text-center">
                          {skill.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="text-lg font-medium text-muted-foreground mb-4 text-center lg:text-left">Professional Skills</h4>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {skills.filter(skill => skill.category === 'soft').map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="skill-icon group cursor-pointer"
                    >
                      <div className="glass-card p-4 rounded-xl hover:scale-110 transition-all duration-300 hover:glow-primary">
                        <skill.icon 
                          size={28} 
                          className={`${skill.color} mb-2 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                          weight="light"
                        />
                        <p className="text-xs font-medium text-foreground text-center">
                          {skill.name}
                        </p>
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
