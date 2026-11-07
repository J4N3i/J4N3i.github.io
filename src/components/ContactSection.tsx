import { useRef } from 'react';
import { gsap } from 'gsap';
import { PaperPlaneTilt } from 'phosphor-react';
import { ContactDirectActions } from './contact/ContactDirectActions';
import { ContactForm } from './contact/ContactForm';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useSectionReveal(sectionRef, () => {
    const title = titleRef.current;
    const actions = actionsRef.current;
    const form = formRef.current;

    if (title) {
      gsap.fromTo(
        title,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (actions) {
      gsap.fromTo(
        actions,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: actions,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (form) {
      gsap.fromTo(
        form,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  });

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitle & Direct Actions */}
          <div ref={actionsRef} className="space-y-8">
            <SectionHeader
              ref={titleRef}
              align="left"
              badgeIcon={PaperPlaneTilt}
              badgeText="Contact"
              titleNormal="Let's"
              titleAccent="talk."
              headingClassName="text-[clamp(1.75rem,5vw,3rem)] font-bold text-foreground mb-4 leading-tight"
              subtitle="I'm looking for DevOps and full-stack internships. The quickest way to reach me is LinkedIn or email, and I'm happy to share my CV."
              hasDivider={false}
            />

            <ContactDirectActions />
          </div>

          {/* Right Column: Contact Form */}
          <div ref={formRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
