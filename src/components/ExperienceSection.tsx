import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, CaretDown } from 'phosphor-react';
import { leadershipExperience, earlierExperience, workExperience } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ExperienceCard } from './experience/ExperienceCard';

const ExperienceSection = () => {
  const [showEarlier, setShowEarlier] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const content = contentRef.current;

    if (title) {
      gsap.fromTo(
        title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (content) {
      const items = content.querySelectorAll('.experience-item');
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  });

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        {/* Section Header */}
        <SectionHeader
          ref={titleRef}
          badgeIcon={Briefcase}
          badgeText="Experience"
          titleNormal="Experience &"
          titleAccent="Leadership"
          headingClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground mb-4 leading-tight"
          subtitle="Practical leadership, community building, and operational discipline."
          hasDivider={false}
          align="center"
        />

        <div ref={contentRef} className="space-y-16 mt-12">
          {/* Group 1: Leadership & Community */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Leadership &amp; community
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Desktop timeline line */}
            <div className="md:border-l md:border-white/10 md:ml-6 md:pl-8 space-y-6">
              {leadershipExperience.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}

              {/* Earlier Experience Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowEarlier((prev) => !prev)}
                  aria-expanded={showEarlier}
                  aria-controls="earlier-experience-list"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Earlier experience (2017 – 2020)</span>
                  <CaretDown
                    size={14}
                    className={`transform transition-transform duration-200 ${
                      showEarlier ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showEarlier && (
                  <div id="earlier-experience-list" className="mt-6 space-y-6">
                    {earlierExperience.map((exp) => (
                      <ExperienceCard key={exp.id} experience={exp} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Group 2: Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Work experience
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Desktop timeline line */}
            <div className="md:border-l md:border-white/10 md:ml-6 md:pl-8 space-y-6">
              {workExperience.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
