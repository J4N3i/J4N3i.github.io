import { useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, CalendarBlank } from 'phosphor-react';
import { positionsOfResponsibility, otherExperiences } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  SCROLL_TRIGGER_POINTS,
} from '@/constants/animations';
import { ExperienceCard } from './experience/ExperienceCard';

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const container = containerRef.current;
    const other = otherRef.current;

    // Title Animation
    if (title) {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_DURATION.normal,
          ease: ANIMATION_EASING.power3Out,
          scrollTrigger: {
            trigger: sectionRef.current,
            ...SCROLL_TRIGGER_POINTS.header,
          },
        }
      );
    }

    // Cards Animation
    if (container) {
      const children = Array.from(container.children);
      gsap.fromTo(
        children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_DURATION.normal,
          stagger: 0.15,
          ease: ANIMATION_EASING.power3Out,
          scrollTrigger: {
            trigger: container,
            ...SCROLL_TRIGGER_POINTS.cards,
          },
        }
      );
    }

    // Other Experience animation
    if (other) {
      const otherChildren = Array.from(other.children);
      gsap.fromTo(
        otherChildren,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: ANIMATION_EASING.power3Out,
          scrollTrigger: {
            trigger: other,
            ...SCROLL_TRIGGER_POINTS.late,
          },
        }
      );
    }
  });

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <SectionHeader
            ref={titleRef}
            className="mb-16"
            badgeIcon={Briefcase}
            badgeText="Career & Leadership"
            titleNormal="Positions of"
            titleAccent="Responsibility"
          />

          {/* Positions of Responsibility */}
          <div ref={containerRef} className="grid sm:grid-cols-2 gap-5">
            {positionsOfResponsibility.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>

          {/* Other Experience */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
                <Briefcase size={14} weight="bold" />
                Other Experience
              </div>
            </div>
            <div ref={otherRef} className="space-y-5">
              {otherExperiences.map((exp) => {
                const IconComponent = exp.icon;
                return (
                  <div
                    key={exp.id}
                    className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${exp.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}
                  >
                    {/* Top Shine */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${exp.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                      <div
                        className={`p-4 rounded-2xl bg-black/20 border border-white/5 ${exp.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                      >
                        <IconComponent size={28} weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-white tracking-tight">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 text-white/50 text-sm font-medium mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <CalendarBlank size={14} weight="bold" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        <h4 className={`text-lg font-semibold ${exp.color} mb-3`}>
                          {exp.organization}
                        </h4>
                        <p className="text-white/70 leading-relaxed text-lg font-light">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
