import { useRef } from 'react';
import { gsap } from 'gsap';
import { Users } from 'phosphor-react';
import { profile } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ProfileCard } from './about/ProfileCard';
import { SkillsGrid } from './about/SkillsGrid';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  SCROLL_TRIGGER_POINTS,
} from '@/constants/animations';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const image = imageRef.current;
    const content = contentRef.current;
    if (!image || !content) return;

    // Initial states set via JS (content visible if JS fails)
    gsap.set([image, content], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.skill-pill', { opacity: 0, scale: 0.8, y: 15 });

    // Scroll triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        ...SCROLL_TRIGGER_POINTS.standard,
      },
    });

    tl.to(image, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: ANIMATION_DURATION.slow,
      ease: ANIMATION_EASING.power2Out,
    })
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: ANIMATION_DURATION.slow,
          ease: ANIMATION_EASING.power2Out,
        },
        '-=0.7'
      )
      .to(
        '.skill-pill',
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: ANIMATION_DURATION.fast,
          ease: ANIMATION_EASING.power2Out,
          stagger: 0.04,
        },
        '-=0.5'
      );
  });

  return (
    <section id="about" ref={sectionRef} className="section-padding">
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
                  <p
                    key={idx}
                    className={idx === 0 ? 'font-medium text-foreground/90 text-xl' : undefined}
                  >
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
