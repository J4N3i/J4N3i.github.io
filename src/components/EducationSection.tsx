import { useRef } from 'react';
import { gsap } from 'gsap';
import { Medal, CalendarBlank, GraduationCap, Bank } from 'phosphor-react';
import { educationList } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const container = containerRef.current;

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

    if (container) {
      const cards = container.querySelectorAll('.education-card');
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  });

  const degree = educationList.find((edu) => edu.id === 1);
  const secondary = educationList.find((edu) => edu.id === 2);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding relative overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <SectionHeader
          ref={titleRef}
          badgeIcon={Medal}
          badgeText="Education"
          titleNormal="Academic"
          titleAccent="Background"
          headingClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground mb-4 leading-tight"
          subtitle="Foundational training in computer science, software systems, and engineering."
          hasDivider={false}
          align="center"
        />

        <div ref={containerRef} className="space-y-6 mt-12">
          {/* Primary Degree Card */}
          {degree && (
            <div className="education-card p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 transition-colors hover:border-white/20">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-primary flex-shrink-0 mt-0.5">
                    <GraduationCap size={26} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                      {degree.degree}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-primary/90 mt-1">
                      {degree.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
                  {degree.currentYearLabel && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                      {degree.currentYearLabel}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/5 border border-white/10">
                    <CalendarBlank size={12} weight="bold" />
                    <span>{degree.period}</span>
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed pt-2 border-t border-white/5">
                {degree.description}
              </p>
            </div>
          )}

          {/* Secondary School / A/L - Smaller & Below */}
          {secondary && (
            <div className="education-card p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 transition-colors hover:border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 flex-shrink-0">
                    <Bank size={18} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {secondary.degree}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-white/70">
                      {secondary.institution}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-white/60 bg-white/5 border border-white/5 w-fit">
                  <CalendarBlank size={11} weight="bold" />
                  <span>{secondary.period}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {secondary.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
