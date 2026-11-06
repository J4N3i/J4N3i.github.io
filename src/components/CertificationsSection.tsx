import { useRef } from 'react';
import { gsap } from 'gsap';
import { Medal, GraduationCap } from 'phosphor-react';
import { certifications } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  SCROLL_TRIGGER_POINTS,
} from '@/constants/animations';

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const container = containerRef.current;

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

    // Content Animation
    if (container) {
      const children = Array.from(container.children);
      gsap.fromTo(
        children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_DURATION.normal,
          stagger: 0.2,
          ease: ANIMATION_EASING.power3Out,
          scrollTrigger: {
            trigger: container,
            ...SCROLL_TRIGGER_POINTS.cards,
          },
        }
      );
    }
  });

  return (
    <section id="certifications" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <SectionHeader
            ref={titleRef}
            className="mb-16"
            badgeIcon={Medal}
            badgeText="Credentials"
            titleNormal="Certifications &"
            titleAccent="Learning"
            accentColorClass="text-accent-cyan"
            dividerGradient="from-accent-cyan to-primary"
          />

          <div ref={containerRef} className="space-y-6">
            {certifications.map((cert) => {
              const IconComponent = cert.icon;
              return (
                <div
                  key={cert.id}
                  className={`group relative p-7 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${cert.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden`}
                >
                  {/* Top Shine */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${cert.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    {/* Icon */}
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner flex-shrink-0">
                      <IconComponent size={24} weight="fill" className={cert.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                        <div>
                          <h3
                            className={`text-xl font-bold text-white group-hover:${cert.color} transition-colors mb-1`}
                          >
                            {cert.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <GraduationCap size={14} className="text-white/70" />
                            <span className="text-sm font-semibold text-white/70">
                              {cert.issuer}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            Issued {cert.date}
                          </span>
                          <span className="text-xs text-white/70 font-mono">
                            ID: {cert.credentialId}
                          </span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
