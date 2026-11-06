import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'phosphor-react';
import { profile } from '@/data';
import { ProfileCard } from './about/ProfileCard';
import { SkillsGrid } from './about/SkillsGrid';

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial states set via JS (content visible if JS fails)
      gsap.set([image, content], { opacity: 0, y: 50, filter: 'blur(10px)' });
      gsap.set('.skill-icon', { opacity: 0, scale: 0.5, y: 30 });

      // Scroll triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(image, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
      })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.7'
        )
        .to(
          '.skill-icon',
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.1,
          },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          {/* Profile Card */}
          <ProfileCard imageRef={imageRef} />

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
                {profile.aboutParagraphs.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? 'font-medium text-foreground/90 text-xl' : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {profile.quickStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <SkillsGrid skillsRef={skillsRef} />
      </div>
    </section>
  );
};

export default AboutSection;
