import { useRef } from 'react';
import { gsap } from 'gsap';
import { Code } from 'phosphor-react';
import { skillGroups } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const grid = gridRef.current;

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

    if (grid) {
      gsap.set('.skill-card', { opacity: 0, y: 16 });
      gsap.to('.skill-card', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });

  return (
    <section id="skills" ref={sectionRef} className="section-padding scroll-mt-24">
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          ref={titleRef}
          badgeIcon={Code}
          badgeText="Skills"
          titleNormal="Tools I work with"
          titleAccent=""
          headingClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground mb-4 leading-tight"
          subtitle="Grouped by what I use them for."
          hasDivider={false}
          align="center"
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="skill-card p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 transition-colors hover:border-white/20"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
