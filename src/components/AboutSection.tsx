import { useRef } from 'react';
import { gsap } from 'gsap';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ProfileCard } from './about/ProfileCard';
import { AboutIntro } from './about/AboutIntro';
import { WhatIDoRow } from './about/WhatIDoRow';
import { SkillsGrid } from './about/SkillsGrid';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const whatIDoRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const image = imageRef.current;
    const content = contentRef.current;
    const intro = introRef.current;
    const whatIDo = whatIDoRef.current;
    const skills = skillsRef.current;

    // Initial states set via JS (16px translate, opacity 0)
    if (image && content) {
      gsap.set([image, content], { opacity: 0, y: 16 });
    }
    gsap.set('.what-i-do-card', { opacity: 0, y: 16 });
    gsap.set('.skill-card', { opacity: 0, y: 16 });

    // 1. Intro Block Animation (once: true)
    if (intro && image && content) {
      gsap.to([image, content], {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: intro,
          start: 'top 85%',
          once: true,
        },
      });
    }

    // 2. What I Do Row Animation (once: true)
    if (whatIDo) {
      gsap.to('.what-i-do-card', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: whatIDo,
          start: 'top 85%',
          once: true,
        },
      });
    }

    // 3. Skills Grid Animation (once: true)
    if (skills) {
      gsap.to('.skill-card', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: skills,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      {/* Background Elements - Hidden on mobile (<lg) for smooth scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="orb w-96 h-96 top-1/4 -right-48 opacity-10 float-slow" />
        <div className="orb w-64 h-64 bottom-1/4 -left-32 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 space-y-20">
        {/* Intro Block */}
        <div ref={introRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <ProfileCard ref={imageRef} />
          </div>

          {/* Intro Content */}
          <div className="lg:col-span-7">
            <AboutIntro ref={contentRef} />
          </div>
        </div>

        {/* What I Do Row */}
        <WhatIDoRow ref={whatIDoRef} />

        {/* Skills Grid */}
        <SkillsGrid ref={skillsRef} />
      </div>
    </section>
  );
};

export default AboutSection;
