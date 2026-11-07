import { useRef } from 'react';
import { gsap } from 'gsap';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ProfileCard } from './about/ProfileCard';
import { AboutIntro } from './about/AboutIntro';
import { WhatIDoRow } from './about/WhatIDoRow';
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
  const whatIDoRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const image = imageRef.current;
    const content = contentRef.current;
    if (!image || !content) return;

    // Initial states set via JS (content visible if JS fails)
    gsap.set([image, content], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set('.what-i-do-card', { opacity: 0, y: 20 });
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
        '.what-i-do-card',
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_DURATION.fast,
          ease: ANIMATION_EASING.power2Out,
          stagger: 0.1,
        },
        '-=0.4'
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
        '-=0.3'
      );
  });

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-96 h-96 top-1/4 -right-48 opacity-10 float-slow" />
        <div className="orb w-64 h-64 bottom-1/4 -left-32 opacity-15 float-medium" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 space-y-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
