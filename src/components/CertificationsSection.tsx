import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Medal, GraduationCap, ArrowSquareOut, CaretDown } from 'phosphor-react';
import { certifications } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const CertificationsSection = () => {
  const [showAll, setShowAll] = useState(false);
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
      const cards = container.querySelectorAll('.cert-card');
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

  const devCerts = certifications.filter((cert) => cert.isDevOrDevOps !== false);
  const additionalCerts = certifications.filter((cert) => cert.isDevOrDevOps === false);

  const renderCertCard = (cert: (typeof certifications)[0]) => {
    const IconComponent = cert.icon;
    return (
      <div
        key={cert.id}
        className="cert-card p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 transition-colors hover:border-white/20"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-primary flex-shrink-0 mt-0.5">
              <IconComponent size={22} weight="duotone" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                {cert.name}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70">
                <GraduationCap size={15} weight="bold" />
                <span>{cert.issuer}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
            <span className="text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {cert.date}
            </span>
            {cert.credentialId && (
              <span className="text-xs text-white/50 font-mono">ID: {cert.credentialId}</span>
            )}
          </div>
        </div>

        {/* Skills & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white/70 bg-white/5 border border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded py-1"
            >
              <span>View credential</span>
              <ArrowSquareOut size={13} weight="bold" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <SectionHeader
          ref={titleRef}
          badgeIcon={Medal}
          badgeText="Credentials"
          titleNormal="Certifications &"
          titleAccent="Learning"
          headingClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground mb-4 leading-tight"
          subtitle="Verified training and technical coursework in software engineering."
          hasDivider={false}
          align="center"
        />

        <div ref={containerRef} className="space-y-6 mt-12">
          {/* Development & DevOps Certifications */}
          <div className="space-y-4">{devCerts.map(renderCertCard)}</div>

          {/* Show All Toggle for Additional Certs */}
          {additionalCerts.length > 0 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
                aria-controls="additional-certifications-list"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>
                  {showAll
                    ? 'Show fewer certifications'
                    : `Show all certifications (${certifications.length})`}
                </span>
                <CaretDown
                  size={14}
                  className={`transform transition-transform duration-200 ${
                    showAll ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showAll && (
                <div id="additional-certifications-list" className="mt-6 space-y-4 text-left">
                  {additionalCerts.map(renderCertCard)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
