import { useRef } from 'react';
import { gsap } from 'gsap';
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ArrowSquareOut,
} from 'phosphor-react';
import { profile } from '@/data';
import { ContactForm } from './contact/ContactForm';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useSectionReveal(sectionRef, () => {
    const form = formRef.current;
    const title = titleRef.current;

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

    if (form) {
      gsap.fromTo(
        form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
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
          {/* Left Column: Heading, Subtitle & Direct Links */}
          <div className="space-y-8">
            <div>
              <SectionHeader
                ref={titleRef}
                align="left"
                badgeIcon={PaperPlaneTilt}
                badgeText="Contact"
                titleNormal="Let's"
                titleAccent="talk."
                headingClassName="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
                subtitle="I'm looking for DevOps and full-stack internships. Send me a message or find me on LinkedIn."
                hasDivider={false}
              />
            </div>

            <div className="space-y-4 pt-2">
              {/* 1. Visible LinkedIn Button First */}
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
                    <LinkedinLogo size={22} weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Connect on LinkedIn
                    </p>
                    <p className="text-sm font-bold text-foreground">{profile.name}</p>
                  </div>
                </div>
                <ArrowSquareOut
                  size={18}
                  className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform mr-2"
                />
              </a>

              {/* 2. Email Card */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white/5 text-white/80">
                  <EnvelopeSimple size={22} weight="duotone" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">Email me directly</p>
                  <p className="text-sm font-semibold text-foreground">{profile.email}</p>
                </div>
              </a>

              {/* 3. GitHub Card */}
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white/5 text-white/80">
                  <GithubLogo size={22} weight="duotone" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">Check my code</p>
                  <p className="text-sm font-semibold text-foreground">
                    {profile.githubUrl.replace('https://', '')}
                  </p>
                </div>
              </a>
            </div>
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
