import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    if (typeof window !== 'undefined') {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    const title = titleRef.current;
    const actions = actionsRef.current;
    const form = formRef.current;
    const elements = [title, actions, form].filter(Boolean) as HTMLElement[];

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 pb-24 md:py-24 relative overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitle & Direct Actions */}
          <div ref={actionsRef} className="space-y-6 sm:space-y-8">
            <SectionHeader
              ref={titleRef}
              align="left"
              badgeIcon={PaperPlaneTilt}
              badgeText="Contact"
              titleNormal="Let's"
              titleAccent="talk."
              headingClassName="text-[clamp(2rem,6vw,3rem)] font-bold text-foreground mb-3 sm:mb-4 leading-tight"
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
